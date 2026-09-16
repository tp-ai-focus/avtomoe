"use client";

import { useState } from "react";
import { MapPin, Navigation, Clock, Phone, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface ShopLocation {
  id: string;
  shortName: string;
  fullName: string;
  address: string;
  orient: string;
  hours: string;
  phone: string;
  phoneHref: string;
  is24x7?: boolean;
  navUrl: string;
  mapEmbedUrl: string;
}

const shopLocations: ShopLocation[] = [
  {
    id: "shefskaya",
    shortName: "Шефская, 4б",
    fullName: "Флагманский магазин и автосервис",
    address: "г. Екатеринбург, ул. Шефская, 4б",
    orient: "Заезд с дублёра ул. Шефской. Большое синее здание с вывеской «АвтоМоё».",
    hours: "Ежедневно: Круглосуточно 24/7",
    phone: "+7 999 564 20 42",
    phoneHref: "tel:+79995642042",
    is24x7: true,
    navUrl:
      "https://yandex.ru/maps/54/yekaterinburg/search/%D0%A8%D0%B5%D1%84%D1%81%D0%BA%D0%B0%D1%8F%2C%204%D0%B1%20%D0%90%D0%B2%D1%82%D0%BE%D0%9C%D0%BE%D1%91/?ll=60.640270%2C56.889493&z=16.7",
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=60.640270,56.889493&z=16.5&pt=60.640270,56.889493,pm2blm",
  },
  {
    id: "sakharova",
    shortName: "Академика Сахарова, 107/1",
    fullName: "Магазин «АвтоЯпонец и АвтоЕвропеец»",
    address: "г. Екатеринбург, пр-т Академика Сахарова, 107/1",
    orient: "Академический район, удобная парковка перед входом со стороны проспекта.",
    hours: "Ежедневно: с 8:00 до 22:00",
    phone: "+7 999 564 20 42",
    phoneHref: "tel:+79995642042",
    navUrl:
      "https://yandex.ru/maps/org/avtoyaponets_i_avtoyevropeyets/44636200790/?ll=60.528405%2C56.786524&z=16",
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=60.528405,56.786524&z=16.5&pt=60.528405,56.786524,pm2blm",
  },
  {
    id: "vysotskogo",
    shortName: "Владимира Высоцкого, 50",
    fullName: "Магазин автозапчастей «КОР»",
    address: "г. Екатеринбург, ул. Владимира Высоцкого, 50",
    orient: "ТК «КОР», отдельный павильон автозапчастей прямо на главной парковке.",
    hours: "Пн — Сб: с 8:00 до 21:00, Вс: с 9:00 до 19:00",
    phone: "+7 999 564 20 42",
    phoneHref: "tel:+79995642042",
    navUrl:
      "https://yandex.ru/maps/org/avtomoyo_avtoyaponets/161585274789/?ll=60.686520%2C56.837850&z=16",
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=60.686520,56.837850&z=16.5&pt=60.686520,56.837850,pm2blm",
  },
  {
    id: "uralskaya",
    shortName: "Уральская, 77",
    fullName: "Магазин автозапчастей",
    address: "г. Екатеринбург, ул. Уральская, 77",
    orient: "Пионерский район, первая линия, отдельный вход с вывеской.",
    hours: "Ежедневно: с 9:00 до 19:00",
    phone: "+7 999 564 20 42",
    phoneHref: "tel:+79995642042",
    navUrl:
      "https://yandex.ru/maps/org/avtomojo/104899088621/?ll=60.638500%2C56.862200&z=16",
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=60.638500,56.862200&z=16.5&pt=60.638500,56.862200,pm2blm",
  },
  {
    id: "berezovsky",
    shortName: "Березовский тракт, 4/1",
    fullName: "Магазин «Берёзовский привоз»",
    address: "г. Берёзовский, Берёзовский тракт, 4/1",
    orient: "Авторынок «Берёзовский привоз», фирменный павильон с торца.",
    hours: "Пн — Сб: с 9:00 до 20:00, Вс: с 9:00 до 19:00",
    phone: "+7 999 564 20 42",
    phoneHref: "tel:+79995642042",
    navUrl:
      "https://yandex.ru/maps/org/avtomoyo/132887448531/?ll=60.776537%2C56.900037&z=16",
    mapEmbedUrl:
      "https://yandex.ru/map-widget/v1/?ll=60.776537,56.900037&z=16.5&pt=60.776537,56.900037,pm2blm",
  },
];

export function ShopMapSection() {
  const [activeId, setActiveId] = useState<string>("shefskaya");

  const activeShop =
    shopLocations.find((loc) => loc.id === activeId) || shopLocations[0];

  return (
    <section className="pt-20 md:pt-28">
      <div className="wrap mb-10">
        <Reveal>
          <div className="flex flex-col items-start gap-2.5">
            <p className="section-subtitle">Локация</p>
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
              Как к нам добраться
            </h2>
            <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-600 font-normal">
              Выберите ближайший к вам филиал, чтобы посмотреть точный маршрут и время работы.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="relative h-[600px] sm:h-[620px] w-full bg-slate-100 overflow-hidden">
          {/* Интерактивная карта Яндекс для выбранного филиала */}
          <iframe
            key={activeShop.id}
            src={activeShop.mapEmbedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title={`Карта проезда — ${activeShop.shortName}`}
            className="absolute inset-0 transition-opacity duration-500"
          ></iframe>

          {/* Плавающая аккуратная карточка с выбором филиалов (Glass Card) */}
          <div className="pointer-events-none absolute inset-0 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="pointer-events-auto absolute bottom-4 left-4 right-4 sm:bottom-auto sm:left-6 sm:right-auto sm:top-8 w-auto sm:w-[410px] rounded-[24px] bg-white/[0.96] backdrop-blur-xl p-5 sm:p-6 shadow-2xl border border-white/80 transition-all duration-300 max-h-[85vh] overflow-y-auto">
              {/* Верхняя панель: Переключатель филиалов (Табы) */}
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Выберите филиал магазина
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {shopLocations.map((loc) => {
                  const isActive = loc.id === activeId;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setActiveId(loc.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-[#0076be] text-white shadow-md shadow-[#0076be]/25 scale-[1.02]"
                          : "bg-slate-100/90 text-slate-700 hover:bg-slate-200/80"
                      }`}
                    >
                      <MapPin size={12} className={isActive ? "text-white" : "text-slate-400"} />
                      <span>{loc.shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Детали выбранного магазина */}
              <div className="border-t border-slate-100 pt-4 space-y-3.5">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {activeShop.fullName}
                  </h3>
                  <p className="mt-1 font-bold text-sm text-[#0076be]">
                    {activeShop.address}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 border border-slate-100/80">
                  <span className="font-bold text-slate-800">Ориентир: </span>
                  {activeShop.orient}
                </div>

                <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                  <Clock size={15} className="text-[#0076be] shrink-0" />
                  <span>{activeShop.hours}</span>
                </div>
              </div>

              {/* Кнопка навигатора под выбранную точку */}
              <div className="mt-5">
                <a
                  href={activeShop.navUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffcc00] py-3.5 text-xs font-extrabold uppercase tracking-wide text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:bg-[#ffe040] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Navigation size={16} className="shrink-0 text-slate-950" />
                  <span>Маршрут в Яндекс Навигаторе</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
