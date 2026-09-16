"use client";

import { VK_GROUP_URL, VK_CHAT_URL } from "@/lib/constants";
import { Plus, MessageSquare, Star, Gift, Sparkles, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function VkBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-12 md:py-16">
      <div className="wrap max-w-5xl">
        <Reveal>
          {/* Главная карточка: минималистичный премиальный блок */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 md:p-12 shadow-xl shadow-slate-900/[0.04]">
            
            {/* Мягкое фоновое синее свечение (минималистичный градиент) */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#0077FF]/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              
              {/* Левая часть: Иконка + Заголовок + Описание */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 flex-1">
                
                {/* Стильная минималистичная иконка VK с пульсирующей точкой онлайна */}
                <div className="relative shrink-0">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0077FF] to-[#0055cc] text-white shadow-lg shadow-[#0077FF]/25">
                    <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.785 16.244s.27-.03.407-.177c.125-.134.121-.387.121-.387s-.017-1.18.53-1.354c.54-.17 1.233 1.141 1.968 1.646.556.382.978.298.978.298l1.964-.027s1.028-.064.54-0.871c-.04-.066-.285-.6-1.467-1.696-1.237-1.148-1.071-.962.419-2.951.907-1.211 1.27-1.95 1.157-2.264-.108-.299-.769-.22-.769-.22l-2.21.014s-.164-.023-.285.051c-.118.073-.194.24-.194.24s-.35.932-.816 1.725c-.984 1.674-1.378 1.763-1.539 1.659-.374-.242-.28-0.973-.28-1.492 0-1.622.246-2.298-.479-2.473-.241-.058-.418-.096-1.033-.102-.789-.008-1.458.003-1.837.189-.252.124-.447.4-.328.416.147.02.48.09.657.33.228.31.22 1.006.22 1.006s.13 1.91-.305 2.147c-.298.163-.707-.17-1.586-1.69-.45-.778-.79-1.638-.79-1.638s-.065-.16-.182-.246c-.141-.103-.339-.136-.339-.136l-2.102.014s-.316.009-.432.146c-.104.122-.008.375-.008.375s1.646 3.852 3.511 5.792c1.71 1.778 3.655 1.662 3.655 1.662h.878z" />
                    </svg>
                  </div>
                  {/* Статус онлайн */}
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-xs">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                </div>

                {/* Текст: Заголовок и выгоды */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#0077FF]/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0077FF]">
                      <CheckCircle2 size={12} />
                      Официальная группа
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star size={13} fill="currentColor" strokeWidth={0} />
                      <span>5,0</span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Мы ВКонтакте · ГК «АвтоМоё»
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
                    Закрытые акции, розыгрыши призов, живые видеоотчёты с постов сервиса и оперативный подбор запчастей по VIN.
                  </p>

                  {/* Микро-тезисы строкой */}
                  <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-4 text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Gift size={14} className="text-[#0077FF]" />
                      <span>Бонусы и розыгрыши</span>
                    </div>
                    <span className="hidden sm:inline text-slate-300">·</span>
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#0077FF]" />
                      <span>Скидки для подписчиков</span>
                    </div>
                    <span className="hidden sm:inline text-slate-300">·</span>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span>Ответ в чате за 1 мин</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая часть: Акцентные кнопки взаимодействия */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0 justify-center">
                {/* Главная кнопка: ПОДПИСАТЬСЯ */}
                <a
                  href={VK_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0077FF] px-8 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-[#0077FF]/30 transition-all duration-200 hover:bg-[#0066dd] hover:shadow-xl hover:shadow-[#0077FF]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  title="Подписаться на группу ВКонтакте"
                >
                  <Plus size={18} strokeWidth={3} className="transition-transform group-hover:rotate-90" />
                  <span>Подписаться</span>
                </a>

                {/* Второстепенная кнопка: Написать сообщение */}
                <a
                  href={VK_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/80 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-700 transition-all duration-200 hover:border-[#0077FF] hover:bg-white hover:text-[#0077FF] active:scale-[0.98]"
                  title="Написать в сообщения группы"
                >
                  <MessageSquare size={15} />
                  <span>Написать в VK</span>
                </a>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
