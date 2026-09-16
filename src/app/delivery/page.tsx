import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, Calendar, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Доставка — АвтоМоё",
  description: "Условия и сроки доставки автозапчастей по Екатеринбургу и всей России.",
};

export default function DeliveryPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0076be]/10 text-[#0076be]">
          <Truck size={20} />
        </span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Доставка
        </h1>
      </div>

      <div className="mt-6 max-w-xl">
        {/* Яркий заголовок */}
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-[#0076be]">
            <Gift size={22} />
          </span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Бесплатная доставка
          </h2>
        </div>
        <p className="text-zinc-700 leading-relaxed text-sm sm:text-base mb-6">
          Для клиентов нашего магазина данную услугу мы осуществляем абсолютно бесплатно.
        </p>
        
        {/* Структурированные условия */}
        <div>
          <h3 className="font-bold text-slate-900 mb-3 text-base">Как это работает:</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-[#0076be]">
                <Clock size={18} />
              </span>
              <p className="text-sm sm:text-base text-zinc-700">
                <strong className="font-semibold text-slate-900">Время:</strong> В период с 9:00 до 21:00.
              </p>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#0076be]">
                <Calendar size={18} />
              </span>
              <p className="text-sm sm:text-base text-zinc-700">
                <strong className="font-semibold text-slate-900">Сроки:</strong> На следующий рабочий день после оплаты заказа.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
