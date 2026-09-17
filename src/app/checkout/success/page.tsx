"use client";

import { ArrowRight, CheckCircle2, MapPin, Package, Phone, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { formatPrice } from "@/lib/format";

const methodMeta: Record<string, { label: string; icon: typeof MapPin }> = {
  pickup: { label: "Самовывоз · ул. Шефская, 4б", icon: MapPin },
  courier: { label: "Курьером по Екатеринбургу", icon: Truck },
  russia: { label: "Транспортной компанией по России", icon: Package },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "AM-00001";
  const method = methodMeta.pickup;

  return (
    <div className="wrap flex flex-col items-center pb-24 pt-16 text-center md:pt-24">
      <span className="grid h-24 w-24 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
        <CheckCircle2 size={44} className="text-emerald-400" />
      </span>
      <h1 className="mt-7 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
        Заказ {code} оформлен
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-500 md:text-base">
        Спасибо за заказ! Менеджер «Авто моё» свяжется с вами в течение 10 минут в рабочее время для подтверждения наличия и выдачи деталей.
      </p>

      <div className="card mt-10 w-full max-w-2xl p-6 text-left md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-ink/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Номер заказа</p>
            <p className="mt-1 font-display text-2xl font-extrabold text-[#0076be]">{code}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Статус</p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600">
              Ожидает подтверждения
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 pt-5 text-sm sm:grid-cols-2">
          <p className="flex items-center gap-2 text-zinc-500">
            <method.icon size={15} className="shrink-0 text-[#0076be]" /> {method.label}
          </p>
          <p className="flex items-center gap-2 text-zinc-500">
            <Phone size={15} className="shrink-0 text-[#0076be]" /> Консультация по заказу
          </p>
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="wrap py-24 text-center">Загрузка...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
