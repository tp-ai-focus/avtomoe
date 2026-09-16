import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CreditCard, Store, Smartphone, MessageCircle, Send } from "lucide-react";
import { MAX_BOT_URL, TELEGRAM_URL, VK_CHAT_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Оплата — «Авто моё»",
  description: "Способы оплаты автозапчастей и услуг сервисного центра в сети АвтоМоё.",
};

export default function PaymentPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0076be]/10 text-[#0076be]">
          <CreditCard size={20} />
        </span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Способы оплаты
        </h1>
      </div>

      <div className="mt-8">
        <p className="text-base text-zinc-600 mb-6">
          Выберите удобный для вас способ оплаты заказа:
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Карточка "В магазине" */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0076be]/10 text-[#0076be]">
                <Store size={24} />
              </span>
              <h2 className="text-xl font-bold text-slate-900">В магазине</h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Оплачивайте покупки непосредственно на кассе любого из наших филиалов. Мы принимаем <strong>наличные</strong>, <strong>банковские карты</strong>, а также оплату по <strong>QR-коду</strong> (СБП).
            </p>
          </div>

          {/* Карточка "Онлайн" */}
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Smartphone size={24} />
              </span>
              <h2 className="text-xl font-bold text-slate-900">Онлайн-оплата</h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Предпочитаете онлайн? Без проблем! Напишите нашему менеджеру — он сформирует заказ и тут же вышлет вам <strong>QR-код для быстрой оплаты онлайн</strong>.
            </p>
            
            <div className="mt-auto flex flex-col sm:flex-row flex-wrap gap-2">
              <a
                href={MAX_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-[#7c3aed] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#6b28d9] active:scale-95"
              >
                <MessageCircle size={16} />
                MAX
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-[#2aabee] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2299d6] active:scale-95"
              >
                <Send size={16} />
                Telegram
              </a>
              <a
                href={VK_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:flex-1 items-center justify-center gap-2 rounded-xl bg-[#0077FF] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0066dd] active:scale-95"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.785 16.244s.27-.03.407-.177c.125-.134.121-.387.121-.387s-.017-1.18.53-1.354c.54-.17 1.233 1.141 1.968 1.646.556.382.978.298.978.298l1.964-.027s1.028-.064.54-0.871c-.04-.066-.285-.6-1.467-1.696-1.237-1.148-1.071-.962.419-2.951.907-1.211 1.27-1.95 1.157-2.264-.108-.299-.769-.22-.769-.22l-2.21.014s-.164-.023-.285.051c-.118.073-.194.24-.194.24s-.35.932-.816 1.725c-.984 1.674-1.378 1.763-1.539 1.659-.374-.242-.28-0.973-.28-1.492 0-1.622.246-2.298-.479-2.473-.241-.058-.418-.096-1.033-.102-.789-.008-1.458.003-1.837.189-.252.124-.447.4-.328.416.147.02.48.09.657.33.228.31.22 1.006.22 1.006s.13 1.91-.305 2.147c-.298.163-.707-.17-1.586-1.69-.45-.778-.79-1.638-.79-1.638s-.065-.16-.182-.246c-.141-.103-.339-.136-.339-.136l-2.102.014s-.316.009-.432.146c-.104.122-.008.375-.008.375s1.646 3.852 3.511 5.792c1.71 1.778 3.655 1.662 3.655 1.662h.878z" />
                </svg>
                VK
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
