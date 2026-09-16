"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Wrench,
} from "lucide-react";
import {
  MAX_CHAT_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICE_PHONE_DISPLAY,
  SERVICE_PHONE_HREF,
  VK_CHAT_URL,
} from "@/lib/constants";
import { PhoneCallButton } from "@/components/PhoneCallButton";

interface BranchSchedule {
  // Store hours: [monSat, sun] or daily
  monSatOpen?: number;
  monSatClose?: number;
  sunOpen?: number;
  sunClose?: number;
  dailyOpen?: number;
  dailyClose?: number;
}

interface BranchInfo {
  id: string;
  name: string;
  address: string;
  subtitle: string;
  city: "ekb" | "berezovsky";
  hasService: boolean;
  scheduleRaw: {
    store: string[];
    service?: string[];
  };
  scheduleTimes: BranchSchedule;
  serviceScheduleTimes?: BranchSchedule;
  phone?: string;
  phoneHref?: string;
  yandexMapUrl: string;
  gisUrl: string;
  serviceGisUrl?: string;
}

const BRANCHES: BranchInfo[] = [
  {
    id: "shefskaya",
    name: "г. Екатеринбург, ул. Шефская, 4б",
    address: "ул. Шефская, 4б",
    subtitle: "Магазин автозапчастей и сервисный центр",
    city: "ekb",
    hasService: true,
    scheduleRaw: {
      store: ["Ежедневно: Круглосуточно"],
      service: [
        "Сервисный центр (8 подъёмников):",
        "Ежедневно: Круглосуточно",
      ],
    },
    scheduleTimes: {
      dailyOpen: 0,
      dailyClose: 24,
    },
    serviceScheduleTimes: {
      dailyOpen: 0,
      dailyClose: 24,
    },
    phone: "+7 (343) 227-27-71",
    phoneHref: "tel:+73432272771",
    yandexMapUrl:
      "https://yandex.ru/maps/org/avtomoyo/218269267792/?ll=60.640270%2C56.889493&z=16",
    gisUrl: "https://2gis.ru/ekaterinburg/geo/70000001041200807",
    serviceGisUrl: "https://2gis.ru/ekaterinburg/geo/70000001041174936",
  },
  {
    id: "berezovsky",
    name: "г. Берёзовский, Берёзовский тракт, 4/1",
    address: "Берёзовский тракт, 4/1",
    subtitle: "Магазин «Берёзовский привоз»",
    city: "berezovsky",
    hasService: false,
    scheduleRaw: {
      store: ["Пн — Сб: с 9:00 до 20:00", "Вс: с 9:00 до 19:00"],
    },
    scheduleTimes: {
      monSatOpen: 9,
      monSatClose: 20,
      sunOpen: 9,
      sunClose: 19,
    },
    yandexMapUrl:
      "https://yandex.ru/maps/org/avtomoyo/132887448531/?ll=60.776537%2C56.900037&z=15",
    gisUrl: "https://2gis.ru/ekaterinburg/search/АвтоЯпонец%20Берёзовский%20тракт%204%2F1",
  },
  {
    id: "uralskaya",
    name: "г. Екатеринбург, ул. Уральская, 77",
    address: "ул. Уральская, 77",
    subtitle: "Магазин автозапчастей",
    city: "ekb",
    hasService: false,
    scheduleRaw: {
      store: ["Ежедневно: с 9:00 до 19:00"],
    },
    scheduleTimes: {
      dailyOpen: 9,
      dailyClose: 19,
    },
    yandexMapUrl: "https://yandex.ru/maps/org/avtomojo/104899088621/",
    gisUrl: "https://2gis.ru/ekaterinburg/geo/70000001038393884",
  },
  {
    id: "vysotskogo",
    name: "г. Екатеринбург, ул. Владимира Высоцкого, 50",
    address: "КОР, ул. Владимира Высоцкого, 50",
    subtitle: "Магазин автозапчастей «КОР» на парковке",
    city: "ekb",
    hasService: false,
    scheduleRaw: {
      store: ["Пн — Сб: с 8:00 до 21:00", "Вс: с 9:00 до 19:00"],
    },
    scheduleTimes: {
      monSatOpen: 8,
      monSatClose: 21,
      sunOpen: 9,
      sunClose: 19,
    },
    yandexMapUrl:
      "https://yandex.ru/maps/org/avtomoyo_avtoyaponets/161585274789/",
    gisUrl: "https://2gis.ru/ekaterinburg/search/Высоцкого%2050",
  },
  {
    id: "sakharova",
    name: "г. Екатеринбург, пр. Академика Сахарова, 107/1",
    address: "проспект Академика Сахарова, 107/1",
    subtitle: "Магазин «Автояпонец и Автоевропеец» (Академический)",
    city: "ekb",
    hasService: false,
    scheduleRaw: {
      store: ["Ежедневно: с 8:00 до 22:00"],
    },
    scheduleTimes: {
      dailyOpen: 8,
      dailyClose: 22,
    },
    yandexMapUrl:
      "https://yandex.ru/maps/org/avtoyaponets_i_avtoyevropeyets/44636200790/",
    gisUrl: "https://2gis.ru/ekaterinburg/search/Сахарова%20107%2F1",
  },
];

type FilterType = "all" | "service" | "ekb" | "berezovsky";

function computeOpenStatus(times: BranchSchedule) {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Yekaterinburg",
      hour12: false,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });
    const parts = formatter.formatToParts(new Date());
    const weekday = parts.find((p) => p.type === "weekday")?.value || "";
    const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    const isSunday = weekday === "Sun";

    let openH = 9;
    let closeH = 20;

    if (times.dailyOpen !== undefined && times.dailyClose !== undefined) {
      openH = times.dailyOpen;
      closeH = times.dailyClose;
    } else if (isSunday) {
      openH = times.sunOpen ?? 9;
      closeH = times.sunClose ?? 19;
    } else {
      openH = times.monSatOpen ?? 9;
      closeH = times.monSatClose ?? 20;
    }

    const isOpen = hour >= openH && hour < closeH;
    return {
      isOpen,
      text: isOpen ? `Открыто до ${closeH}:00` : `Закрыто (с ${openH}:00)`,
    };
  } catch {
    return { isOpen: true, text: "Работает сегодня" };
  }
}

export default function ContactsClient() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [nowStatus, setNowStatus] = useState<Record<string, { isOpen: boolean; text: string }>>({});

  // Вычисляем время на клиенте во избежание hydration mismatch
  useEffect(() => {
    const statuses: Record<string, { isOpen: boolean; text: string }> = {};
    BRANCHES.forEach((b) => {
      statuses[b.id] = computeOpenStatus(b.scheduleTimes);
    });
    setNowStatus(statuses);

    const interval = setInterval(() => {
      const refreshed: Record<string, { isOpen: boolean; text: string }> = {};
      BRANCHES.forEach((b) => {
        refreshed[b.id] = computeOpenStatus(b.scheduleTimes);
      });
      setNowStatus(refreshed);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const filteredBranches = BRANCHES.filter((b) => {
    if (filter === "service") return b.hasService;
    if (filter === "ekb") return b.city === "ekb";
    if (filter === "berezovsky") return b.city === "berezovsky";
    return true;
  });

  return (
    <div className="bg-white text-slate-800">
      {/* Хлебные крошки и заголовок */}
      <div className="border-b border-slate-100 bg-slate-50/70 py-7">
        <div className="wrap max-w-7xl">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                Контакты и магазины
              </h1>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                5 филиалов сети «АвтоМоё» («Авто-Японец» и «Авто-Европеец») в Екатеринбурге и Берёзовском, собственный сервисный центр и оперативная служба поддержки.
              </p>
            </div>
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/" className="transition hover:text-[#0076be]">
                Главная
              </Link>
              <span>/</span>
              <span className="text-slate-800">Контакты</span>
            </nav>
          </div>
        </div>
      </div>

      <main className="wrap max-w-7xl py-10 md:py-14">
        {/* 3 верхние карточки связи: телефон, мессенджеры, почта */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1. Телефон */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0076be]">
                  <Phone size={15} /> Позвонить нам
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Звонки принимаем
                </span>
              </div>
              <PhoneCallButton
                phoneDisplay={PHONE_DISPLAY}
                phoneHref={PHONE_HREF}
                title="Позвонить в магазин автозапчастей"
                subtitle="Единая справочная служба «АвтоМоё»"
                className="mt-3.5 block font-display text-2xl font-black text-slate-900 transition hover:text-[#0076be] cursor-pointer"
              >
                {PHONE_DISPLAY}
              </PhoneCallButton>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Моб.:</span>
                <a
                  href="tel:+79961712627"
                  className="text-sm font-bold text-slate-700 transition hover:text-[#0076be]"
                >
                  +7 996 171-26-27
                </a>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Ежедневно с 9:00 до 21:00 (время Екатеринбурга). Подбор деталей по VIN.
              </p>
            </div>
          </div>

          {/* 2. Мессенджеры */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0076be]">
                  <MessageCircle size={15} /> Написать нам
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Менеджер онлайн
                </span>
              </div>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                Будем рады ответить на ваши вопросы в MAX и ВКонтакте ежедневно с 9:00 до 21:00.
              </p>
              <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-1">
                <Clock size={12} className="text-slate-400" />
                Среднее время ответа: 3–5 минут
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={MAX_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#6b28d9] active:scale-95"
              >
                <MessageCircle size={15} /> Написать в MAX
              </a>
              <a
                href={VK_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0077FF] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#0066dd] active:scale-95"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.785 16.244s.27-.03.407-.177c.125-.134.121-.387.121-.387s-.017-1.18.53-1.354c.54-.17 1.233 1.141 1.968 1.646.556.382.978.298.978.298l1.964-.027s1.028-.064.54-0.871c-.04-.066-.285-.6-1.467-1.696-1.237-1.148-1.071-.962.419-2.951.907-1.211 1.27-1.95 1.157-2.264-.108-.299-.769-.22-.769-.22l-2.21.014s-.164-.023-.285.051c-.118.073-.194.24-.194.24s-.35.932-.816 1.725c-.984 1.674-1.378 1.763-1.539 1.659-.374-.242-.28-0.973-.28-1.492 0-1.622.246-2.298-.479-2.473-.241-.058-.418-.096-1.033-.102-.789-.008-1.458.003-1.837.189-.252.124-.447.4-.328.416.147.02.48.09.657.33.228.31.22 1.006.22 1.006s.13 1.91-.305 2.147c-.298.163-.707-.17-1.586-1.69-.45-.778-.79-1.638-.79-1.638s-.065-.16-.182-.246c-.141-.103-.339-.136-.339-.136l-2.102.014s-.316.009-.432.146c-.104.122-.008.375-.008.375s1.646 3.852 3.511 5.792c1.71 1.778 3.655 1.662 3.655 1.662h.878z" />
                </svg>
                Написать в VK
              </a>
            </div>
          </div>

          {/* 3. Почта */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0076be]">
                  <Mail size={15} /> Электронная почта
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      "avtomoe-96-berezov-418568-qp6x@yandex.ru",
                      "email"
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-200 active:scale-95"
                  title="Скопировать email"
                >
                  {copiedKey === "email" ? (
                    <>
                      <Check size={12} className="text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} /> Скопировать
                    </>
                  )}
                </button>
              </div>
              <a
                href="mailto:avtomoe-96-berezov-418568-qp6x@yandex.ru"
                className="mt-3.5 block whitespace-nowrap text-[12.5px] sm:text-[13px] xl:text-[14px] font-bold tracking-tight text-slate-900 transition hover:text-[#0076be]"
                title="avtomoe-96-berezov-418568-qp6x@yandex.ru"
              >
                avtomoe-96-berezov-418568-qp6x@yandex.ru
              </a>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Запросы на оптовый подбор автозапчастей, коммерческие предложения, акты сверки и документооборот.
              </p>
            </div>
          </div>
        </div>

        {/* Заголовок блока адресов и фильтры-табы */}
        <div className="mt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Адреса наших магазинов и сервисного центра
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Выберите филиал, чтобы посмотреть расписание, маршрут или скопировать адрес в навигатор.
              </p>
            </div>

            {/* Быстрые фильтры */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 p-1">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === "all"
                    ? "bg-white text-[#0076be] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Все (5)
              </button>
              <button
                type="button"
                onClick={() => setFilter("service")}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === "service"
                    ? "bg-white text-[#0076be] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Wrench size={12} /> Сервисный центр (1)
              </button>
              <button
                type="button"
                onClick={() => setFilter("ekb")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === "ekb"
                    ? "bg-white text-[#0076be] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Екатеринбург (4)
              </button>
              <button
                type="button"
                onClick={() => setFilter("berezovsky")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  filter === "berezovsky"
                    ? "bg-white text-[#0076be] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Берёзовский (1)
              </button>
            </div>
          </div>
        </div>

        {/* Сетка: список филиалов слева + интерактивная Яндекс Карта справа */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          {/* Список филиалов */}
          <div className="space-y-4 lg:col-span-6">
            {filteredBranches.map((b) => {
              const status = nowStatus[b.id];
              const isShefskaya = b.id === "shefskaya";

              return (
                <div
                  key={b.id}
                  className={`rounded-2xl border bg-white p-5 sm:p-6 transition-all ${
                    isShefskaya
                      ? "border-[#0076be]/40 bg-gradient-to-br from-white to-blue-50/30 shadow-md ring-1 ring-[#0076be]/20"
                      : "border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          isShefskaya
                            ? "bg-[#0076be] text-white shadow-xs"
                            : "bg-[#0076be]/10 text-[#0076be]"
                        }`}
                      >
                        {isShefskaya ? <Wrench size={20} /> : <MapPin size={20} />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                            {b.name}
                          </h3>
                          {isShefskaya && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#0076be] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                              Сервисный центр + Магазин · 8 постов
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-medium">
                          {b.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Бейдж Сейчас открыто / закрыто */}
                    {status && (
                      <span
                        className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                          status.isOpen
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                          }`}
                        ></span>
                        {status.text}
                      </span>
                    )}
                  </div>

                  {/* Расписание работы */}
                  <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs sm:text-sm text-slate-700">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                      <Clock size={14} className="text-[#0076be]" />
                      <span>Режим работы магазина:</span>
                    </div>
                    <ul className="space-y-0.5 pl-5">
                      {b.scheduleRaw.store.map((line, idx) => (
                        <li key={idx}>— {line}</li>
                      ))}
                    </ul>

                    {b.scheduleRaw.service && (
                      <div className="mt-3 pt-3 border-t border-slate-200/60">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                          <Wrench size={14} className="text-[#0076be]" />
                          <span>Режим работы сервисного центра (8 подъёмников):</span>
                        </div>
                        <ul className="space-y-0.5 pl-5 text-slate-700">
                          {b.scheduleRaw.service.map((line, idx) => (
                            <li key={idx}>— {line}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Действия: Скопировать адрес, Яндекс Карты, 2ГИС, Звонок в сервис */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                    {/* Кнопка на Яндекс Карты */}
                    <a
                      href={b.yandexMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#0076be]/30 bg-white px-3.5 py-2 text-xs font-bold text-[#0076be] shadow-2xs transition hover:bg-[#0076be] hover:text-white"
                    >
                      <MapPin size={14} />
                      Яндекс Карты
                      <ExternalLink size={12} className="opacity-70" />
                    </a>



                    {/* Скопировать адрес для навигатора */}
                    <button
                      type="button"
                      onClick={() => handleCopy(b.name, `addr-${b.id}`)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 active:scale-95"
                      title="Скопировать точный адрес"
                    >
                      {copiedKey === `addr-${b.id}` ? (
                        <>
                          <Check size={13} className="text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Скопировано!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          Скопировать адрес
                        </>
                      )}
                    </button>

                    {/* Если Шефская — прямая кнопка в сервис */}
                    {isShefskaya && b.phone && (
                      <PhoneCallButton
                        phoneDisplay={SERVICE_PHONE_DISPLAY}
                        phoneHref={SERVICE_PHONE_HREF}
                        title="Позвонить в сервисный центр"
                        subtitle="Шефская, 4б · 8 постов"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition hover:bg-emerald-700 active:scale-95 ml-auto cursor-pointer"
                      >
                        <Phone size={13} />
                        Записаться в сервисный центр ({b.phone})
                      </PhoneCallButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Интерактивная карта Yandex справа */}
          <div className="lg:col-span-6">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <div className="border-b border-slate-200 bg-white px-5 py-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                  <MapPin size={16} className="text-[#0076be]" /> Карта филиалов в Екатеринбурге и Берёзовском
                </span>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-md px-2 py-0.5">
                  5 точек сети
                </span>
              </div>
              <div className="relative h-[480px] sm:h-[620px] w-full bg-slate-100">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A80d103346c643b397526ee272532cf039b420389343937ec46815e8b0e26a5a0&source=constructor"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта филиалов АвтоМоё"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
