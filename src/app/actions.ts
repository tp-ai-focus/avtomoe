
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
  const address = clean(input.address, 300);
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

  const code = `AM-${Math.floor(10000 + Math.random() * 90000)}`;
  return { ok: true, code };
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

  if (name.length < 2) return { ok: false, error: "Укажите имя" };
  if (!phoneOk(phone)) return { ok: false, error: "Укажите корректный телефон" };

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

  if (name.length < 2) return { ok: false, error: "Укажите имя" };
  if (!phoneOk(phone)) return { ok: false, error: "Укажите корректный телефон" };
  if (vin.length < 8) return { ok: false, error: "Укажите VIN или номер кузова (от 8 символов)" };

  return { ok: true };
}
