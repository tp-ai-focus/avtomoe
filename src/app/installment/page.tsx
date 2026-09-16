import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Percent } from "lucide-react";

export const metadata: Metadata = {
  title: "Рассрочка — «Авто моё»",
  description: "Покупка автозапчастей и оплата услуг сервисного центра в рассрочку и долями в сети «АвтоМоё».",
};

export default function InstallmentPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0076be]/10 text-[#0076be]">
          <Percent size={20} />
        </span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Рассрочка и оплата долями
        </h1>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600">
        Раздел находится в процессе наполнения. В сети «АвтоМоё» доступна покупка автозапчастей и оплата ремонта в рассрочку без переплат или сервисами оплаты частями. Подробные условия и партнёры будут опубликованы здесь в ближайшее время.
      </p>
    </main>
  );
}
