import {  CalendarCheck,
  ClipboardCheck,
  Clock,
  Cpu,
  CheckCircle2,
  BadgePercent, ArrowRight, MapPin, Navigation,
  Coffee, Wifi, Tv, UtensilsCrossed, Sparkles,
  Crosshair,
  CircleDot,
  Disc3,
  Droplets,
  Gauge,
  MessageCircle,
  Phone,
  ScanLine,
  Send,
  ShieldCheck,
  Snowflake,
  Star,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ServiceForm } from "@/components/ServiceForm";
import { Reveal } from "@/components/Reveal";
import { DiscountButton } from "@/components/DiscountButton";
import { PromoButton } from "@/components/PromoButton";
import { ShopCtaButton } from "@/components/ShopCtaButton";
import { YandexReviews } from "@/components/YandexReviews";
import { PhoneCallButton } from "@/components/PhoneCallButton";
import {
  SERVICE_CENTER,
  SERVICE_HOURS,
  SERVICE_PHONE_DISPLAY,
  SERVICE_PHONE_HREF,
  SHOP_ADDRESSES,
  TELEGRAM_URL,
} from "@/lib/constants";
import { getServices } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Автосервис в Екатеринбурге",
  description:
    "Сервис-центр «Авто моё» на ул. Шефской, 4б в Екатеринбурге: ТО по регламенту, диагностика и ремонт японских и европейских автомобилей. Тест-драйв автосервиса — скидка 15% на первый визит.",
};



const ICONS: Record<string, LucideIcon> = {
  Droplets,
  ScanLine,
  Disc3,
  Cpu,
  Crosshair,
  CircleDot,
  Snowflake,
  Wrench,
  Gauge,
  ClipboardCheck,
};

const whatWeDoServices = [
  { id: 1, title: 'Замена масла в ДВС', price: 'от 1 000 ₽', icon: Droplets, image: '/img/services/oil-change.jpg', hit: true },
  { id: 2, title: 'Техническое обслуживание', price: 'от 5 980 ₽', icon: ClipboardCheck, image: '/img/services/tech-maintenance.jpg', hit: true },
  { id: 3, title: 'Шиномонтаж с балансировкой', price: 'от 2 200 ₽', icon: Disc3, hit: true },
  { id: 4, title: 'Диагностика электрооборудования', price: 'от 2 000 ₽', icon: Cpu, hit: false },
  { id: 5, title: 'Развал / схождение', price: 'от 2 600 ₽', icon: Crosshair, hit: false },
  { id: 6, title: 'Ремонт подвески', price: 'от 1 000 ₽', icon: CircleDot, hit: false },
  { id: 7, title: 'Ремонт двигателей', price: 'от 28 000 ₽', icon: Wrench, hit: false },
  { id: 8, title: 'Полировка фар', price: 'от 1 500 ₽', icon: Sparkles, hit: false },
  { id: 9, title: 'Восстановление фар', price: 'от 3 000 ₽', icon: ShieldCheck, hit: false },
];

const promotions = [
  {
    id: 2,
    title: "Бесплатная замена масла",
    description: "При покупке моторного масла KHAMAKO и масляного фильтра АВТОМОЁ",
    btn1Text: "Записаться",
    image: "/img/promo/zamenamasla.jpg",
  },
  {
    id: 3,
    title: "Бесплатная диагностика ходовой",
    description: "По 49 параметрам. Действует в: пн, пт, сб и вс",
    btn1Text: "Записаться",
    image: "/img/promo/diagnostika.jpg",
  },
  {
    id: 1,
    title: "Гарантия лучшей цены",
    description: "Нашли товар дешевле, мы сделаем скидку!",
    btn1Text: "Получить скидку",
    image: "/img/promo/bestprice.jpg",
  },
  {
    id: 4,
    title: "Такси до дома",
    description: "Бесплатно отвезем вас домой на такси, пока ваш автомобиль находится в ремонте.",
    btn1Text: "Записаться",
    image: "/img/promo/taxi.jpg",
  }
];

export default async function ServicePage() {
  const services = await getServices();

  return (
    <div>
      {/* HERO: BANNER + FORM + STATS GRID */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003b73] to-[#0076be] pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Фото сервиса с фирменным синим наложением */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/service-real.jpg"
            alt="Автосервис АвтоМоё Шефская 4б"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 mix-blend-overlay"
          />
          {/* Фирменный градиент от глубокого синего к прозрачному */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002855]/95 via-[#003b73]/75 to-[#0076be]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002855]/80 via-transparent to-transparent" />
        </div>

        <div className="wrap relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[460px]">
            {/* Левая часть: Оффер */}
            <Reveal className="lg:col-span-7">
              <div className="pt-2 lg:pt-0">
                {/* Бейдж со статусом и пульсирующей точкой */}
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-1.5 backdrop-blur-md mb-6 sm:mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="font-display text-[11px] font-bold uppercase tracking-wider text-white">
                    Сервисный центр 24/7
                  </span>
                </div>
                
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-extrabold leading-[1.04] tracking-tight text-white mb-6">
                  Сломались ночью? <br />
                  <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-[#29A8E0] bg-clip-text text-transparent">
                    Мы работаем.
                  </span>
                </h1>
                
                <p className="max-w-xl text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
                  Круглосуточный автосервис и склад на <strong className="text-white font-semibold">35 000+ запчастей</strong> на Шефской, 4б. Диагностика, ремонт и замена деталей без ожидания до утра.
                </p>

                {/* Быстрые фичи */}
                <div className="mt-8 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-sky-400" />
                    <span>Без скрытых работ</span>
                  </div>
                  <div className="h-4 w-px bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-sky-400" />
                    <span>Согласование сметы</span>
                  </div>
                  <div className="h-4 w-px bg-white/20 hidden sm:block" />
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-sky-400" />
                    <span>Приём авто в любое время</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Правая часть: Форма заявки */}
            <Reveal delay={0.15} className="lg:col-span-5 h-full">
              <div className="h-full w-full rounded-[28px] border border-white/15 bg-gradient-to-b from-[#0076be] to-[#005a92] p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur-sm relative overflow-hidden">
                <ServiceForm />
              </div>
            </Reveal>
          </div>

          {/* СЕТКА ИЗ 4 ЖИВЫХ ЦИФР ВНИЗУ БЛОКА */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                value: "8",
                unit: "постов",
                label: "подъёмников",
                desc: "Быстрый заезд без очередей",
                badge: "Без ожидания",
              },
              {
                value: "24/7",
                unit: "",
                label: "круглосуточно",
                desc: "Приём авто днём и ночью",
                badge: "Всегда открыты",
              },
              {
                value: "−15%",
                unit: "",
                label: "на первый визит",
                desc: "Тест-драйв автосервиса",
                badge: "Выгода",
              },
              {
                value: "12",
                unit: "мес",
                label: "гарантия",
                desc: "На все работы и детали",
                badge: "По договору",
              },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={0.2 + idx * 0.06}>
                <div className="group relative h-full rounded-2xl border border-white/[0.12] bg-white/[0.06] p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.10] hover:-translate-y-1 shadow-lg shadow-black/20">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-sm">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="font-display text-sm sm:text-base font-bold text-sky-300 uppercase">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2.5 font-display text-sm sm:text-base font-extrabold uppercase tracking-wide text-white">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300/90 leading-relaxed font-normal">
                    {stat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="wrap pt-20 md:pt-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-subtitle">Услуги и цены</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
                Что мы делаем
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whatWeDoServices.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.07}>
              <div className="group relative flex h-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:border-slate-200">
                {/* ХИТ Badge */}
                {s.hit && (
                  <div className="absolute right-0 top-0 z-10 flex items-center justify-center rounded-bl-xl bg-red-500 px-3 py-1 font-display text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                    Хит
                  </div>
                )}

                {/* Image or Placeholder (Left) */}
                {s.image ? (
                  <div className="relative w-[130px] shrink-0 overflow-hidden bg-slate-950 border-r border-slate-100/50">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="130px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="relative w-[130px] shrink-0 bg-slate-50 flex items-center justify-center p-3 text-center border-r border-slate-100/50">
                    <span className="text-slate-300 font-bold text-[9px] uppercase tracking-widest opacity-60">
                      Место под фото
                    </span>
                  </div>
                )}

                {/* Content (Right) */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-sm font-extrabold leading-snug text-slate-900 pr-4 line-clamp-2 min-h-[40px]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-slate-600">{s.price}</p>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <DiscountButton />
                    <PhoneCallButton
                      phoneDisplay={SERVICE_PHONE_DISPLAY}
                      phoneHref={SERVICE_PHONE_HREF}
                      title="Позвонить в автосервис"
                      subtitle="Екатеринбург, ул. Шефская, 4б (24/7)"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition hover:border-[#0076be] hover:text-[#0076be] hover:bg-slate-50 cursor-pointer"
                    >
                      <Phone size={14} /> <span>Позвонить</span>
                    </PhoneCallButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="wrap pt-20 md:pt-28">
        <Reveal>
          <p className="section-subtitle">Как это работает</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
            Три шага до исправного авто
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { n: "01", t: "Заявка", d: "Оставьте заявку на сайте или позвоните — подберём удобное время в сервис-центре на Шефской, 4б." },
            { n: "02", t: "Диагностика и смета", d: "Проверяем автомобиль, фиксируем работы и стоимость. Без согласования с вами — никаких допов." },
            { n: "03", t: "Ремонт и гарантия", d: "Выполняем работы, выдаём заказ-наряд и гарантию 12 месяцев на работы и запчасти." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-gradient-to-br from-[#29A8E0] to-[#0076be] p-7 shadow-lg shadow-blue-900/10 text-white relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-10 transition-transform duration-500 group-hover:scale-110">
                  <span className="font-display text-[120px] font-extrabold">{s.n}</span>
                </div>
                
                <p className="font-display text-5xl font-extrabold text-white/30" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}>
                  {s.n}
                </p>
                <h3 className="mt-5 font-display text-base font-extrabold uppercase tracking-wide">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROMOTIONS */}
      <section className="wrap pt-20 md:pt-24">
        <Reveal>
          <div className="flex flex-col items-start gap-2.5">
            <p className="section-subtitle">Акции и скидки</p>
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
              Наши акции
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {promotions.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-100 bg-white shadow-sm transition-all hover:border-slate-200 hover:shadow-xl">
                {/* Image Placeholder */}
                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50 text-center">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 opacity-60">
                      Место под баннер
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-display text-lg font-extrabold leading-snug text-slate-900">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-600">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-stretch gap-2">
                    <PromoButton id={p.id} text={p.btn1Text} />
                    <PhoneCallButton
                      phoneDisplay={SERVICE_PHONE_DISPLAY}
                      phoneHref={SERVICE_PHONE_HREF}
                      title="Позвонить по акции"
                      subtitle="Сервисный центр «АвтоМоё»"
                      className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-3 text-[9px] font-bold uppercase text-slate-700 transition hover:border-[#0076be] hover:bg-slate-50 hover:text-[#0076be] cursor-pointer"
                    >
                      <Phone size={13} className="shrink-0" />
                      <span className="whitespace-nowrap tracking-tight xl:tracking-normal">Позвонить</span>
                    </PhoneCallButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {/* SHOP CTA */}
      <section className="wrap pt-20 md:pt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003b73] to-[#0076be] p-8 md:p-14">
            <Image
              src="/img/hero-shop-new.jpg"
              alt="Магазин запчастей «Авто моё»"
              fill
              sizes="100vw"
              className="object-cover object-center opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#002855]/90 via-[#003b73]/60 to-transparent" />
            
            {/* Outline 24/7 Text Background */}
            <div 
              className="pointer-events-none absolute -right-6 top-4 select-none font-display text-[120px] font-black leading-none text-transparent opacity-30 md:-right-10 md:-top-10 md:text-[280px]"
              style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)' }}
            >
              24/7
            </div>

            <div className="relative">
              <h2 className="max-w-xl font-display text-2xl font-extrabold uppercase leading-tight text-white md:text-4xl">
                ЗАПЧАСТИ НУЖНЫ СЕЙЧАС? ОНИ УЖЕ НА ШЕФСКОЙ, 4Б
              </h2>
              <div className="mt-5 max-w-md space-y-4 text-base leading-relaxed text-white/90">
                <p>
                  35 000+ наименований для японских и европейских автомобилей — от расходников до деталей для ремонта.
                </p>
                <p>
                  Приезжайте в магазин, подберём нужную запчасть.<br />
                  А если нужен ремонт — сразу установим её в нашем сервисном центре.
                </p>
                <p className="flex items-center gap-2.5 text-lg md:text-xl font-extrabold text-red-400 mt-3 drop-shadow-sm">
                  <Clock size={22} className="text-red-400 shrink-0 stroke-[2.5]" />
                  <span>Работаем 24/7</span>
                </p>
              </div>
              <ShopCtaButton />
            </div>
          </div>
        </Reveal>
      </section>

      {/* LOUNGE AREA */}
      <section className="pt-20 md:pt-28">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-col items-start gap-2">
              <p className="section-subtitle">Для клиентов</p>
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
                Комфортная зона ожидания
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-slate-600">
              <p>
                Пока мы занимаемся вашим автомобилем, вы можете отдохнуть или поработать с комфортом. Бесплатный зерновой кофе и чай, Wi-Fi и телевизор — всё, чтобы ожидание прошло приятно. При желании можно купить сэндвич и перекусить. И да, туалет тоже есть — позаботились о мелочах.
              </p>
            </div>
          </Reveal>

          {/* Quick amenity badges */}
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Coffee, label: "Бесплатный зерновой кофе и чай" },
                { icon: Wifi, label: "Быстрый Wi-Fi" },
                { icon: Tv, label: "Телевизор" },
                { icon: UtensilsCrossed, label: "Снеки и сэндвичи" },
                { icon: Sparkles, label: "Чистый санузел" },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-2.5 text-xs md:text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    <IconComponent size={16} className="text-[#0076be]" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Slow Marquee Ribbon */}
        <div className="mt-12 overflow-hidden border-y border-slate-100 bg-slate-50/60 py-6 mask-fade-x">
          <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
            {[1, 2].map((group) => (
              <div key={group} className="flex shrink-0 items-center gap-5 pr-5">
                {[
                  { src: "/images/lounge/lounge-3.png", alt: "Кофемашина с бесплатным кофе" },
                  { src: "/images/lounge/lounge-2-new.png", alt: "Удобные кожаные диваны" },
                  { src: "/images/lounge/lounge-4.jpg", alt: "Снековый автомат со свежими сэндвичами" },
                  { src: "/images/lounge/lounge-5.png", alt: "Зона кофе и напитков" },
                  { src: "/images/lounge/lounge-1.jpg", alt: "Большой выбор снеков и напитков" },
                ].map((photo, i) => (
                  <div
                    key={i}
                    className="group relative h-64 md:h-80 w-72 md:w-96 shrink-0 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 288px, 384px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 left-4 right-4 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {photo.alt}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* MAP & DIRECTIONS */}
      <section className="pt-20 md:pt-28">
        <div className="wrap mb-10">
          <Reveal>
            <p className="section-subtitle">Локация</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
              Как к нам добраться
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative h-[550px] w-full bg-slate-100">
            {/* Iframe Background */}
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=60.627914,56.883713&z=16.7&pt=60.627914,56.883713,pm2blm"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Как к нам добраться — Сервис АвтоМоё"
              className="absolute inset-0"
            ></iframe>

            {/* Floating Card Aligned to Grid */}
            <div className="pointer-events-none absolute inset-0 mx-auto w-full max-w-7xl px-5 md:px-8">
              <div className="pointer-events-auto absolute bottom-4 left-5 right-5 md:bottom-auto md:left-8 md:right-auto md:top-8 w-auto md:w-[380px] rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-2xl border border-white">
                <p className="section-subtitle mb-2">Как к нам добраться</p>
              <h3 className="font-display text-2xl font-extrabold text-slate-900">
                Сервисный центр
              </h3>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-[#0076be] shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800">Екатеринбург, ул. Шефская, 4б</p>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Заезд с дублера ул. Шефской. Ориентир — большое синее здание с вывеской «АвтоМоё».
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a 
                  href="https://yandex.ru/maps/54/yekaterinburg/search/%D0%A8%D0%B5%D1%84%D1%81%D0%BA%D0%B0%D1%8F%2C%204%D0%B1%20%D0%90%D0%B2%D1%82%D0%BE%D0%9C%D0%BE%D0%B5/?ll=60.640270%2C56.889493&sll=60.597636%2C56.837435&sspn=0.315857%2C0.123824&z=16.72"
                  target="_blank"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffcc00] py-3.5 text-[10px] font-bold uppercase tracking-wide text-black transition hover:bg-[#ffe040]"
                >
                  <Navigation size={16} />
                  Яндекс Навигатор
                </a>
              </div>
            </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* REVIEWS / НАМ ДОВЕРЯЮТ */}
      <section id="reviews" className="wrap scroll-mt-24 pt-20 md:pt-28">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="section-subtitle">Отзывы</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
                Нам доверяют
              </h2>
            </div>

            <a
              href="https://yandex.ru/maps/org/avtomoyo/218269267792/reviews/?ll=60.642771%2C56.889493&mode=search&sll=60.640270%2C56.889493&sspn=0.019741%2C0.007728&tab=reviews&text=%D0%90%D0%B2%D1%82%D0%BE%D0%9C%D0%BE%D1%91%20%D0%A8%D0%B5%D1%84%D1%81%D0%BA%D0%B0%D1%8F%2C%204%D0%B1&z=16.72"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
              title="Хорошее место на Яндекс Картах"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M3 15c0 0-2-6 3-8 0 0-3 5-1 8 0 0-1 1-2 0z" fill="#ffcc00"/>
                <path d="M4.5 18c0 0-1-4 2-5 0 0-2 3-1 4.5 0 0-.5.5-1 .5z" fill="#ffcc00"/>
                <path d="M21 15c0 0 2-6-3-8 0 0 3 5 1 8 0 0 1 1 2 0z" fill="#ffcc00"/>
                <path d="M19.5 18c0 0 1-4-2-5 0 0 2 3 1 4.5 0 0 .5.5 1 .5z" fill="#ffcc00"/>
                <path d="M12 22s-6-7-6-12.5C6 6.46 8.69 4 12 4s6 2.46 6 5.5S12 22 12 22z" fill="#ff3333"/>
                <circle cx="12" cy="9.5" r="3" fill="white"/>
              </svg>
              <span className="text-sm font-semibold text-slate-800">
                Хорошее место
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8">
            <YandexReviews defaultBranchId="shefskaya" singleBranchOnly={true} />
          </div>
        </Reveal>
      </section>


    </div>
  );
}
