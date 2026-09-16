"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Wrench, 
  ShoppingBag, 
  MapPin, 
  Phone, 
  MessageCircle, 
  BadgePercent,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PhoneCallButton } from "@/components/PhoneCallButton";
import { PromoButton } from "@/components/PromoButton";
import { 
  SERVICE_PHONE_DISPLAY, 
  SERVICE_PHONE_HREF, 
  PHONE_DISPLAY, 
  PHONE_HREF, 
  MAX_SHOP_CHAT_URL 
} from "@/lib/constants";
import { DiscountModal } from "@/components/DiscountModal";

interface ServicePromotion {
  id: number;
  title: string;
  description: string;
  btn1Text: string;
}

interface ShopPromotion {
  id: number;
  title: string;
  description: string;
}

const servicePromotions: ServicePromotion[] = [
  {
    id: 2,
    title: "Бесплатная замена масла",
    description: "При покупке моторного масла KHAMAKO и масляного фильтра АВТОМОЁ",
    btn1Text: "Записаться",
  },
  {
    id: 3,
    title: "Бесплатная диагностика ходовой",
    description: "По 49 параметрам. Действует в: пн, пт, сб и вс",
    btn1Text: "Записаться",
  },
  {
    id: 1,
    title: "Гарантия лучшей цены",
    description: "Нашли товар дешевле, мы сделаем скидку!",
    btn1Text: "Получить скидку",
  },
  {
    id: 4,
    title: "Такси до дома",
    description: "Бесплатно отвезем вас домой на такси, пока ваш автомобиль находится в ремонте.",
    btn1Text: "Записаться",
  },
];

const shopPromotions: ShopPromotion[] = [
  {
    id: 1,
    title: "Гарантия лучшей цены",
    description: "Нашли деталь дешевле? Сообщите нам, и мы сделаем цену ещё выгоднее!",
  },
  {
    id: 2,
    title: "Кэшбэк 5% бонусами",
    description: "Возвращаем 5% от суммы каждой покупки на накопительную карту магазина.",
  },
  {
    id: 3,
    title: "Бесплатная доставка",
    description: "Быстро доставим нужные запчасти по городу прямо до двери или сервиса.",
  },
];

export function PromotionsClient() {
  const [modalType, setModalType] = useState<"parts" | "service" | null>(null);

  return (
    <div className="bg-white min-h-screen pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="wrap space-y-16 md:space-y-24">
        
        {/* ======================================================== */}
        {/* БЛОК 1: АКЦИИ СЕРВИСНОГО ЦЕНТРА НА ШЕФСКОЙ, 4Б */}
        {/* ======================================================== */}
        <section id="service-promos">
          <Reveal>
            <div className="flex flex-col items-start gap-1.5">
              <p className="section-subtitle">Акции и скидки</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slate-900">
                Акции сервисного центра
              </h1>
              <p className="mt-1 text-sm sm:text-base text-slate-600 font-medium">
                г. Екатеринбург, ул. Шефская, 4б
              </p>
            </div>
          </Reveal>

          {/* Сетка акций сервиса (4 карточки) */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicePromotions.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1">
                  {/* Место под баннер */}
                  <div className="relative flex aspect-[16/9] w-full items-center justify-center border-b border-slate-100 bg-slate-50 p-4 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 opacity-60">
                      Место под баннер
                    </span>
                  </div>

                  {/* Текстовая часть */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-lg font-extrabold leading-snug text-slate-900">
                        {p.title}
                      </h3>
                      <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-600">
                        {p.description}
                      </p>
                    </div>

                    {/* Кнопки: Записаться / Получить скидку + Позвонить */}
                    <div className="mt-6 flex items-stretch gap-2">
                      <button
                        type="button"
                        onClick={() => setModalType("service")}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0076be] px-2 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white shadow-sm shadow-blue-900/10 transition hover:bg-blue-700 cursor-pointer"
                      >
                        {p.id === 1 ? <BadgePercent size={14} className="shrink-0" /> : <CheckCircle2 size={14} className="shrink-0" />}
                        <span className="whitespace-nowrap">{p.btn1Text}</span>
                      </button>

                      <PhoneCallButton
                        phoneDisplay={SERVICE_PHONE_DISPLAY}
                        phoneHref={SERVICE_PHONE_HREF}
                        title="Позвонить по акции"
                        subtitle="Сервисный центр «АвтоМоё»"
                        className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 transition hover:border-[#0076be] hover:bg-white hover:text-[#0076be] cursor-pointer"
                      >
                        <Phone size={13} className="shrink-0" />
                        <span className="whitespace-nowrap">Позвонить</span>
                      </PhoneCallButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* БЛОК 2: АКЦИИ МАГАЗИНА + АДРЕСА В ОДНУ ЛИНИЮ */}
        {/* ======================================================== */}
        <section id="shop-promos">
          <Reveal>
            <div className="flex flex-col items-start gap-1.5">
              <p className="section-subtitle">Акции и скидки</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-slate-900">
                Акции магазина
              </h2>
              {/* Адреса магазинов обычным текстом в одну линию */}
              <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                ул. Шефская, 4б &nbsp;/&nbsp; Берёзовский тракт, 4/1 &nbsp;/&nbsp; ул. Владимира Высоцкого, 50 &nbsp;/&nbsp; ул. Уральская, 77 &nbsp;/&nbsp; пр-т Академика Сахарова, 107/1
              </p>
            </div>
          </Reveal>

          {/* Сетка акций магазина (3 карточки) */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shopPromotions.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1">
                  {/* Место под баннер */}
                  <div className="relative flex aspect-[16/9] w-full items-center justify-center border-b border-slate-100 bg-slate-50 p-4 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 opacity-60">
                      Место под баннер
                    </span>
                  </div>

                  {/* Текстовая часть */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-extrabold leading-snug text-slate-900">
                        {p.title}
                      </h3>
                      <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-600">
                        {p.description}
                      </p>
                    </div>

                    {/* Кнопки: Узнать подробнее (MAX) + Позвонить */}
                    <div className="mt-6 flex items-stretch gap-2.5">
                      <a
                        href={MAX_SHOP_CHAT_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#7c3aed] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md shadow-purple-900/25 transition hover:bg-[#6d28d9] hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
                        title="Написать в MAX магазина (+7 996 171-26-27)"
                      >
                        <MessageCircle size={15} className="shrink-0 text-white" />
                        <span>Узнать подробнее</span>
                      </a>

                      <PhoneCallButton
                        phoneDisplay={PHONE_DISPLAY}
                        phoneHref={PHONE_HREF}
                        title="Позвонить по акции"
                        subtitle="Магазин автозапчастей «АвтоМоё»"
                        className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-700 transition hover:border-[#0076be] hover:bg-white hover:text-[#0076be] cursor-pointer"
                      >
                        <Phone size={14} className="shrink-0" />
                        <span>Позвонить</span>
                      </PhoneCallButton>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

      </div>

      {/* Единое модальное окно заявки */}
      <DiscountModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || "service"}
      />
    </div>
  );
}
