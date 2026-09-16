"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const exactAddresses = [
  "Академика Сахарова, 107/1",
  "Владимира Высоцкого, 50",
  "Уральская, 77",
  "Березовский тракт, 4/1",
  "Шефская, 4б",
];

const shopPhotos = [
  {
    src: "/img/shop-exact-1.jpg",
    alt: "Стойка консультации и выдачи заказов в магазине",
  },
  {
    src: "/img/shop-exact-2.jpg",
    alt: "Специализированный магазин АвтоЕвропеец и АвтоЯпонец",
  },
  {
    src: "/img/shop-exact-3.jpg",
    alt: "Склад автозапчастей и расходных материалов",
  },
  {
    src: "/img/shop-exact-4.jpg",
    alt: "Команда менеджеров и консультантов магазина АвтоМоё",
  },
  {
    src: "/img/shop-exact-5.jpg",
    alt: "Фирменный магазин автозапчастей АвтоЯпонец",
  },
];

export function ShopGallery() {
  return (
    <section className="mt-16 md:mt-24">
      {/* Заголовок и адреса в одну строчку с иконкой гео */}
      <Reveal>
        <div className="flex flex-col items-start gap-3">
          <p className="section-subtitle">Сеть магазинов</p>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
            Наши магазины
          </h2>

          {/* Строка адресов с иконкой Гео через палочку / */}
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm sm:text-base font-semibold text-slate-700">
            <div className="inline-flex items-center gap-1.5 text-[#0076be] shrink-0">
              <MapPin size={18} className="text-[#0076be]" />
              <span className="font-bold text-slate-900">Адреса:</span>
            </div>
            
            {exactAddresses.map((addr, idx) => (
              <span key={idx} className="inline-flex items-center gap-2.5">
                <span className="text-slate-800 font-medium">
                  {addr}
                </span>
                {idx < exactAddresses.length - 1 && (
                  <span className="text-slate-300 select-none">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Динамическая фотолента с 5 фотографиями пользователя */}
      <div className="mt-8 overflow-hidden border-y border-slate-100 bg-slate-50/60 py-6 mask-fade-x">
        <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
          {[1, 2].map((group) => (
            <div key={group} className="flex shrink-0 items-center gap-5 pr-5">
              {shopPhotos.map((photo, i) => (
                <div
                  key={i}
                  className="group relative h-64 md:h-80 w-80 md:w-[440px] shrink-0 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 320px, 440px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
