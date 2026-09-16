import { ArrowRight, CheckCircle2, MapPin, Package, Phone, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOrderByCode } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Заказ оформлен" };

export const dynamic = "force-dynamic";

const methodMeta: Record<string, { label: string; icon: typeof MapPin }> = {
  pickup: { label: "Самовывоз · ул. Шефская, 4б", icon: MapPin },
  courier: { label: "Курьером по Екатеринбургу", icon: Truck },
  russia: { label: "Транспортной компанией по России", icon: Package },
};

const paymentLabel: Record<string, string> = {
  online: "Картой онлайн",
  receipt: "При получении",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const code = Array.isArray(sp.code) ? sp.code[0] : sp.code;
  if (!code) redirect("/catalog");

  const data = await getOrderByCode(code);
  if (!data) notFound();

  const { order, items } = data;
  const method = methodMeta[order.deliveryMethod] ?? methodMeta.pickup;

  return (
    <div className="wrap flex flex-col items-center pb-24 pt-16 text-center md:pt-24">
      <span className="grid h-24 w-24 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
        <CheckCircle2 size={44} className="text-emerald-400" />
      </span>
      <h1 className="mt-7 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
        Заказ {order.code} оформлен
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-500 md:text-base">
        Спасибо, {order.customerName}! Менеджер «Авто моё» перезвонит на{" "}
        <span className="font-bold text-cream">{order.phone}</span> в течение 10 минут в рабочее время,
        чтобы подтвердить наличие и выдать детали.
      </p>

      <div className="card mt-10 w-full max-w-2xl p-6 text-left md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-ink/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Номер заказа</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-accent-600">{order.code}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Статус</p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-bold text-accent-600">
              Ожидает подтверждения
            </p>
          </div>
        </div>

        <ul className="space-y-4 py-5">
          {items.map((i) => (
            <li key={i.id} className="flex items-center gap-3">
              <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-ink/[0.06] bg-carbon-800">
                {i.image ? <Image src={i.image} alt={i.name} fill sizes="48px" className="object-cover" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-cream">{i.name}</span>
                <span className="text-xs text-zinc-500">{i.qty} × {formatPrice(i.price)}</span>
              </span>
              <span className="text-sm font-bold text-cream">{formatPrice(i.qty * i.price)}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 border-t border-dashed border-ink/10 pt-5 text-sm">
          <div className="flex justify-between text-zinc-500">
            <span>Товары</span>
            <span className="text-cream">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Доставка</span>
            <span className="text-cream">{order.delivery === 0 ? "Бесплатно" : formatPrice(order.delivery)}</span>
          </div>
          <div className="flex items-baseline justify-between pt-2">
            <span className="font-bold">Итого</span>
            <span className="font-display text-2xl font-extrabold">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-3 border-t border-dashed border-ink/10 pt-5 text-sm sm:grid-cols-2">
          <p className="flex items-center gap-2 text-zinc-500">
            <method.icon size={15} className="shrink-0 text-accent-400" /> {method.label}
          </p>
          <p className="flex items-center gap-2 text-zinc-500">
            <Phone size={15} className="shrink-0 text-accent-400" /> {paymentLabel[order.payment] ?? order.payment}
          </p>
          {order.address && (
            <p className="flex items-start gap-2 text-zinc-500 sm:col-span-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-accent-400" /> {order.address}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/catalog" className="btn-accent">
          Продолжить покупки <ArrowRight size={16} />
        </Link>
        <Link href="/" className="btn-outline">На главную</Link>
      </div>
    </div>
  );
}
