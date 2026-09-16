"use client";

import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { placeOrder } from "@/app/actions";
import { DELIVERY } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { cartSubtotal, useCart } from "@/store/cart";

type Method = "pickup" | "courier" | "russia";
type Payment = "online" | "receipt";

const METHODS: { key: Method; icon: typeof MapPin; title: string; text: string }[] = [
  { key: "pickup", icon: MapPin, title: "Самовывоз со склада", text: "ул. Шефская, 4б · сегодня с 15:00" },
  { key: "courier", icon: Truck, title: "Курьером по Екатеринбургу", text: "сегодня–завтра · 300 ₽, от 5 000 ₽ — бесплатно" },
  { key: "russia", icon: Package, title: "ТК по России", text: "СДЭК, Boxberry, ПЭК · 2–6 дней · 500 ₽" },
];

const PAYMENTS: { key: Payment; icon: typeof CreditCard; title: string; text: string }[] = [
  { key: "online", icon: CreditCard, title: "Картой онлайн", text: "Visa, Mastercard, МИР — защищённая оплата" },
  { key: "receipt", icon: Wallet, title: "При получении", text: "Наличными или картой на складе / курьеру" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear, setOpen } = useCart((s) => ({ items: s.items, clear: s.clear, setOpen: s.setOpen }));
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<Method>("pickup");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<Payment>("online");
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const subtotal = cartSubtotal(items);
  const deliveryCost =
    method === "pickup" ? 0 : method === "courier" ? (subtotal >= DELIVERY.FREE_FROM ? 0 : DELIVERY.COURIER) : DELIVERY.RUSSIA;
  const total = subtotal + deliveryCost;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);
    const res = await placeOrder({
      items: items.map((i) => ({ id: i.id, qty: i.qty })),
      name,
      phone,
      email: email || undefined,
      deliveryMethod: method,
      address: address || undefined,
      payment,
      comment: comment || undefined,
    });
    if (res.ok && res.code) {
      const code = res.code;
      clear();
      router.push(`/checkout/success?code=${code}`);
      return;
    }
    setPending(false);
    setError(res.error ?? "Не удалось оформить заказ. Попробуйте ещё раз.");
  };

  if (!mounted) {
    return (
      <div className="wrap flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-accent-400" size={32} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="wrap flex min-h-[70vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-ink/15 text-zinc-500">
          <ShoppingBag size={28} />
        </span>
        <h1 className="font-display text-2xl font-extrabold uppercase">Корзина пуста</h1>
        <p className="max-w-md text-sm leading-relaxed text-zinc-500">
          Добавьте запчасти из каталога, чтобы оформить заказ. Если нужной позиции нет на сайте — подберём по VIN.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/catalog" className="btn-accent">В каталог</Link>
          <Link href="/#vin" className="btn-outline">Подбор по VIN</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap pb-24 pt-10 md:pt-14">
      <Link href="/catalog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:text-accent-600">
        <ArrowLeft size={14} /> Продолжить покупки
      </Link>

      <h1 className="mt-5 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
        Оформление заказа
      </h1>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold">
        {["Корзина", "Оформление", "Готово"].map((s, i) => (
          <span key={s} className="flex items-center gap-3">
            <span
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 ${
                i === 1
                  ? "border-accent-500/60 bg-accent-500/10 text-accent-600"
                  : i < 1
                    ? "border-ink/10 text-zinc-500"
                    : "border-ink/10 text-zinc-600"
              }`}
            >
              <span className={`grid h-4.5 w-4.5 place-items-center rounded-full text-[10px] ${i < 1 ? "bg-emerald-500 text-carbon-950" : "bg-ink/10"}`}>
                {i < 1 ? <Check size={11} strokeWidth={3} /> : i + 1}
              </span>
              {s}
            </span>
            {i < 2 && <span className="h-px w-6 bg-ink/15" />}
          </span>
        ))}
      </div>

      <form onSubmit={submit} className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="card p-6 md:p-7">
            <h2 className="font-display text-base font-extrabold uppercase tracking-tight">
              <span className="mr-3 text-accent-400">01</span>Контакты
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя *" className="field" maxLength={120} required />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон *" type="tel" className="field" maxLength={24} required />
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (для чека)" type="email" className="field sm:col-span-2" maxLength={120} />
            </div>
          </section>

          <section className="card p-6 md:p-7">
            <h2 className="font-display text-base font-extrabold uppercase tracking-tight">
              <span className="mr-3 text-accent-400">02</span>Получение
            </h2>
            <div className="mt-5 grid gap-3">
              {METHODS.map((m) => (
                <button
                  type="button"
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    method === m.key
                      ? "border-accent-500/70 bg-accent-500/[0.07]"
                      : "border-ink/10 bg-ink/[0.02] hover:border-ink/25"
                  }`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${method === m.key ? "bg-accent-500 text-white" : "bg-ink/[0.05] text-zinc-500"}`}>
                    <m.icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-cream">{m.title}</span>
                    <span className="mt-0.5 block text-xs text-zinc-500">{m.text}</span>
                  </span>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${method === m.key ? "border-accent-500 bg-accent-500" : "border-ink/25"}`}>
                    {method === m.key && <Check size={12} strokeWidth={3.5} className="text-white" />}
                  </span>
                </button>
              ))}
            </div>
            {(method === "courier" || method === "russia") && (
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={method === "courier" ? "Адрес доставки в Екатеринбурге *" : "Город и адрес / пункт выдачи ТК *"}
                className="field mt-4"
                maxLength={300}
              />
            )}
          </section>

          <section className="card p-6 md:p-7">
            <h2 className="font-display text-base font-extrabold uppercase tracking-tight">
              <span className="mr-3 text-accent-400">03</span>Оплата
            </h2>
            <div className="mt-5 grid gap-3">
              {PAYMENTS.map((p) => (
                <button
                  type="button"
                  key={p.key}
                  onClick={() => setPayment(p.key)}
                  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    payment === p.key
                      ? "border-accent-500/70 bg-accent-500/[0.07]"
                      : "border-ink/10 bg-ink/[0.02] hover:border-ink/25"
                  }`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${payment === p.key ? "bg-accent-500 text-white" : "bg-ink/[0.05] text-zinc-500"}`}>
                    <p.icon size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-cream">{p.title}</span>
                    <span className="mt-0.5 block text-xs text-zinc-500">{p.text}</span>
                  </span>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${payment === p.key ? "border-accent-500 bg-accent-500" : "border-ink/25"}`}>
                    {payment === p.key && <Check size={12} strokeWidth={3.5} className="text-white" />}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="card p-6 md:p-7">
            <h2 className="font-display text-base font-extrabold uppercase tracking-tight">
              <span className="mr-3 text-accent-400">04</span>Комментарий
            </h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Удобное время звонка, госномер авто, пожелания по комплектации…"
              rows={3}
              className="field mt-5 resize-none"
              maxLength={600}
            />
          </section>
        </div>

        <aside className="card p-6 md:p-7 lg:sticky lg:top-36">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-extrabold uppercase">Ваш заказ</h2>
            <button type="button" onClick={() => setOpen(true)} className="text-xs font-bold text-accent-600 hover:underline">
              Изменить
            </button>
          </div>

          <ul className="mt-5 space-y-4">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-ink/[0.06] bg-carbon-800">
                  <Image src={i.image} alt={i.name} fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-cream">{i.name}</span>
                  <span className="text-xs text-zinc-500">{i.qty} × {formatPrice(i.price)}</span>
                </span>
                <span className="text-sm font-bold text-cream">{formatPrice(i.qty * i.price)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2.5 border-t border-ink/[0.07] pt-5 text-sm">
            <div className="flex justify-between text-zinc-500">
              <span>Товары ({items.reduce((s, i) => s + i.qty, 0)})</span>
              <span className="font-semibold text-cream">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Доставка</span>
              <span className={`font-semibold ${deliveryCost === 0 ? "text-emerald-600" : "text-cream"}`}>
                {deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost)}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-ink/[0.07] pt-4">
              <span className="font-bold text-cream">Итого</span>
              <span className="font-display text-2xl font-extrabold text-cream">{formatPrice(total)}</span>
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-accent mt-6 w-full disabled:opacity-60">
            {pending ? <Loader2 size={17} className="animate-spin" /> : null}
            Подтвердить заказ · {formatPrice(total)}
          </button>

          <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-zinc-500">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent-400" />
            Менеджер перезвонит для подтверждения в течение 10 минут в рабочее время. Оплата — только после подтверждения наличия.
          </p>
        </aside>
      </form>
    </div>
  );
}
