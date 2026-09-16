import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Программа лояльности — АвтоМоё",
  description: "Бонусная система и программа лояльности для постоянных клиентов АвтоМоё.",
};

export default function LoyaltyPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Программа лояльности
        </h1>
      </div>

      <div className="space-y-8 max-w-3xl">
        
        {/* Вступление */}
        <p className="text-lg text-slate-900 font-medium leading-snug max-w-2xl">
          Приятный бонус за каждую покупку — просто и по делу.
        </p>

        {/* Зачем нужна */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">Зачем нужна карта лояльности?</h2>
          <p className="text-base text-zinc-600 leading-snug max-w-2xl">
            Оформляя нашу карту, вы становитесь участником клуба «Авто-Японец» и «Авто-Европеец» — и начинаете получать кешбэк за все покупки в магазинах.
          </p>
        </section>

        {/* Какой кешбэк (Крупная инфографика) */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Какой кешбэк вы получаете?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Блок 1 */}
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#0076be] mb-2 tracking-tight">
                5%
              </div>
              <p className="text-base text-slate-900 font-semibold mb-1">Возвращается бонусами</p>
              <p className="text-sm text-zinc-600 leading-snug">
                С каждой вашей покупки на карту будут начисляться баллы.
              </p>
            </div>
            
            {/* Блок 2 */}
            <div>
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">
                <span className="text-2xl text-zinc-400 font-medium mr-1.5 tracking-normal">до</span>50%
              </div>
              <p className="text-base text-slate-900 font-semibold mb-1">Оплата следующего заказа</p>
              <p className="text-sm text-zinc-600 leading-snug">
                Копите бонусы и оплачивайте ими до половины стоимости новых покупок. Очень удобно!
              </p>
            </div>
          </div>
        </section>

        {/* Ссылки / CTA */}
        <section className="pt-4 border-t border-slate-100">
          <Link href="/contacts" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-[#0076be] transition-colors group">
            <span className="border-b border-slate-300 group-hover:border-[#0076be] transition-colors pb-0.5">Смотреть адреса магазинов</span>
            <ArrowRight size={16} className="text-zinc-400 group-hover:text-[#0076be] transition-all group-hover:translate-x-1 duration-300" />
          </Link>
        </section>
        
      </div>
    </main>
  );
}
