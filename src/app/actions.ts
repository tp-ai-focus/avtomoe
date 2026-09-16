"use server";

import { eq, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { orderItems, orders, products, reviews, serviceRequests } from "@/db/schema";
import { DELIVERY } from "@/lib/constants";

export type ActionResult = { ok: boolean; error?: string };

const phoneOk = (p: string) => /^[+]?[\d\s()-]{10,18}$/.test(p.trim());
const clean = (s: unknown, max: number) =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

/* ---------------------------------- reviews --------------------------------- */

export async function addReview(input: {
  productId: number;
  author: string;
  rating: number;
  text: string;
}): Promise<ActionResult> {
  const author = clean(input.author, 60);
  const text = clean(input.text, 1200);
  const rating = Math.round(Number(input.rating));
  const productId = Math.round(Number(input.productId));

  if (!productId || Number.isNaN(productId)) return { ok: false, error: "Товар не найден" };
  if (author.length < 2) return { ok: false, error: "Укажите имя" };
  if (rating < 1 || rating > 5) return { ok: false, error: "Оцените товар от 1 до 5" };
  if (text.length < 10) return { ok: false, error: "Отзыв должен быть чуть подробнее (от 10 символов)" };

  if (!process.env.DATABASE_URL) return { ok: true };

  const found = await db.select({ slug: products.slug }).from(products).where(eq(products.id, productId)).limit(1);
  if (!found[0]) return { ok: false, error: "Товар не найден" };

  await db.insert(reviews).values({ productId, author, rating, text });
  revalidatePath(`/product/${found[0].slug}`);
  return { ok: true };
}

/* ---------------------------------- orders ---------------------------------- */

export type PlaceOrderInput = {
  items: { id: number; qty: number }[];
  name: string;
  phone: string;
  email?: string;
  deliveryMethod: "pickup" | "courier" | "russia";
  address?: string;
  payment: "online" | "receipt";
  comment?: string;
};

export async function placeOrder(
  input: PlaceOrderInput,
): Promise<{ ok: boolean; code?: string; error?: string }> {
  const name = clean(input.name, 120);
  const phone = clean(input.phone, 24);
  const email = clean(input.email, 120) || null;
  const address = clean(input.address, 300);
  const comment = clean(input.comment, 600);
  const method = input.deliveryMethod;
  const payment = input.payment;

  if (name.length < 2) return { ok: false, error: "Укажите имя" };
  if (!phoneOk(phone)) return { ok: false, error: "Укажите корректный телефон" };
  if (!["pickup", "courier", "russia"].includes(method))
    return { ok: false, error: "Выберите способ получения" };
  if (!["online", "receipt"].includes(payment))
    return { ok: false, error: "Выберите способ оплаты" };
  if ((method === "courier" || method === "russia") && address.length < 5)
    return { ok: false, error: "Укажите адрес доставки" };

  const wanted = (input.items ?? [])
    .map((i) => ({ id: Math.round(Number(i.id)), qty: Math.round(Number(i.qty)) }))
    .filter((i) => i.id > 0 && i.qty >= 1)
    .slice(0, 50);
  if (wanted.length === 0) return { ok: false, error: "Корзина пуста" };

  if (!process.env.DATABASE_URL) return { ok: true, code: "AM-LOCAL" };

  const rows = await db
    .select()
    .from(products)
    .where(inArray(products.id, wanted.map((i) => i.id)));

  if (rows.length !== wanted.length)
    return { ok: false, error: "Часть товаров уже недоступна. Обновите корзину." };

  const lines = wanted.map((w) => {
    const p = rows.find((r) => r.id === w.id)!;
    return { product: p, qty: Math.min(w.qty, 99) };
  });

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const delivery =
    method === "pickup" ? 0 : method === "courier" ? (subtotal >= DELIVERY.FREE_FROM ? 0 : DELIVERY.COURIER) : DELIVERY.RUSSIA;
  const total = subtotal + delivery;

  try {
    const code = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(orders)
        .values({
          code: "TMP",
          customerName: name,
          phone,
          email,
          deliveryMethod: method,
          address: address || null,
          comment: comment || null,
          payment,
          subtotal,
          delivery,
          total,
        })
        .returning({ id: orders.id });

      const orderCode = `AM-${String(inserted.id).padStart(5, "0")}`;
      await tx.update(orders).set({ code: orderCode }).where(eq(orders.id, inserted.id));

      await tx.insert(orderItems).values(
        lines.map((l) => ({
          orderId: inserted.id,
          productId: l.product.id,
          name: l.product.name,
          sku: l.product.sku,
          price: l.product.price,
          qty: l.qty,
          image: l.product.image,
        })),
      );

      for (const l of lines) {
        await tx
          .update(products)
          .set({ stock: sql`greatest(0, ${products.stock} - ${l.qty})` })
          .where(eq(products.id, l.product.id));
      }

      return orderCode;
    });

    return { ok: true, code };
  } catch (e) {
    console.error("placeOrder failed", e);
    return { ok: false, error: "Не удалось оформить заказ. Попробуйте ещё раз." };
  }
}

/* ------------------------- service / VIN requests --------------------------- */

export async function bookService(input: {
  name: string;
  phone: string;
  car?: string;
  serviceId?: number | null;
  message?: string;
}): Promise<ActionResult> {
  const name = clean(input.name, 120);
  const phone = clean(input.phone, 24);
  const car = clean(input.car, 160) || null;
  const message = clean(input.message, 800) || null;
  const serviceId =
    typeof input.serviceId === "number" && input.serviceId > 0 ? input.serviceId : null;

  if (name.length < 2) return { ok: false, error: "Укажите имя" };
  if (!phoneOk(phone)) return { ok: false, error: "Укажите корректный телефон" };

  if (!process.env.DATABASE_URL) return { ok: true };

  await db
    .insert(serviceRequests)
    .values({ name, phone, car, message, serviceId, source: "booking" });
  return { ok: true };
}

export async function requestVin(input: {
  name: string;
  phone: string;
  vin: string;
  contactMethod?: string;
  email?: string;
}): Promise<ActionResult> {
  const name = clean(input.name, 120);
  const phone = clean(input.phone, 24);
  const vin = clean(input.vin, 32).toUpperCase();
  const contactMethod = clean(input.contactMethod, 60);
  const email = clean(input.email, 120);

  if (name.length < 2) return { ok: false, error: "Укажите имя" };
  if (!phoneOk(phone)) return { ok: false, error: "Укажите корректный телефон" };
  if (vin.length < 8) return { ok: false, error: "Укажите VIN или номер кузова (от 8 символов)" };

  if (!process.env.DATABASE_URL) return { ok: true };

  const details = [
    `Подбор по VIN: ${vin}`,
    contactMethod ? `Способ связи: ${contactMethod}` : "",
    email ? `Email: ${email}` : "",
  ].filter(Boolean).join(" | ");

  await db
    .insert(serviceRequests)
    .values({ name, phone, vin, message: details, source: "vin" });
  return { ok: true };
}
