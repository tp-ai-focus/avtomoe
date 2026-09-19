import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Check,
  MapPin,
  Quote,
  ScanSearch,
  ShieldCheck,
  Star,
  Truck,
  Warehouse,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { VinForm } from "@/components/VinForm";
import { YandexReviews } from "@/components/YandexReviews";
import { HeroButtons } from "@/components/HeroButtons";
import { MAKE_GROUPS, MAKES, PHONE_DISPLAY, PHONE_HREF, TELEGRAM_URL } from "@/lib/constants";
import { getFacets, getFeaturedProducts } from "@/lib/data";





const MAKE_LOGOS: Record<string, string> = {
  toyota: "toyota-logo.svg",
  lexus: "lexus-logo.png",
  nissan: "nissan-logo.svg",
  honda: "honda-logo.png",
  mazda: "mazda-logo.svg",
  mitsubishi: "mitsubishi-logo.svg",
  subaru: "subaru-logo.png",
  suzuki: "suzuki-logo.svg",
  bmw: "bmw-logo.svg",
  mercedes: "mercedes-benz-logo.svg",
  audi: "audi-logo.svg",
  volkswagen: "volkswagen-logo.svg",
  skoda: "skoda-logo.svg",
  volvo: "volvo-logo.svg",
  renault: "renault-logo.svg",
  peugeot: "peugeot-logo.svg",
  citroen: "citroen-logo.svg",
  opel: "opel-logo.svg",
  ford: "ford-logo.png",
  chevrolet: "chevrolet-logo.png",
};

const PROMOS = [
  { img: "/img/promo/kashback.jpg", title: "Кэшбэк 5% бонусами", text: "Возвращаем 5% на накопительную карту — оплачивайте бонусами покупки в магазинах сети." },
  { img: "/img/promo/zamenamasla.jpg", title: "Бесплатная замена масла", text: "Купили масло у нас — заменим бесплатно в сервис-центре на Шефской, 4б." },
  { img: "/img/promo/bestprice.jpg", title: "Гарантия лучшей цены", text: "Нашли запчасть дешевле — сделаем цену ещё лучше. Просто покажите предложение." },
  { img: "/img/promo/dostavka.jpg", title: "Бесплатная доставка по городу", text: "Доставка 0 ₽ при любой сумме заказа. Привезём прямо до двери за 60–90 минут." },
];

/** Читаем SVG-файл с диска и возвращаем его содержимое как строку (только для .svg). */
function readSvgFile(filename: string): string | null {
  if (!filename.endsWith(".svg")) return null;
  try {
    const filePath = path.join(process.cwd(), "public", "img", "makes", filename);
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [featured, facets] = await Promise.all([getFeaturedProducts(8), getFacets()]);

  const marqueeMakes = MAKE_GROUPS.flatMap((g) => g.makes).map((m) => ({ key: m, label: MAKES[m] }));


  return (
    <div>
      {/* ------------------------------- HERO ------------------------------- */}
      <section className="relative overflow-hidden bg-[#0076be]">
        <div className="absolute inset-0">
          <Image
            src="/img/hero-car.png"
            alt="Магазин автозапчастей «Авто моё»"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 mix-blend-overlay drop-shadow-[25px_0_20px_rgba(0,0,0,0.65)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00578a]/80 to-transparent" />
        </div>

        <div className="wrap relative flex min-h-[92svh] flex-col justify-center py-24">
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-[7vw] font-extrabold uppercase leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
              ЗАПЧАСТИ ДЛЯ <span className="text-[#89d7fb]">ЯПОНСКИХ</span><br />
              <span className="text-[5vw] sm:text-4xl lg:text-5xl font-semibold text-white/90 normal-case tracking-normal">и европейских авто</span>
            </h1>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-1.5 w-10 bg-[#89d7fb] rounded-full"></div>
              <p className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                Собственный сервисный центр
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Магазин, склад и сервисный центр АвтоМоё. Оригинал и аналоги с гарантией, 
              в наличии сегодня с доставкой по городу.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <HeroButtons />
          </Reveal>

          <Reveal delay={0.34}>
            <div className="mt-8 flex flex-col items-center gap-6 border-t border-white/15 pt-7 sm:flex-row sm:justify-center xl:gap-10">

              {/* 35 000+ */}
              <div className="text-center">
                <dt className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  35 000+
                </dt>
                <dd className="mt-1 text-[11px] font-normal leading-snug text-white/50 uppercase tracking-widest">запчастей в наличии</dd>
              </div>

              {/* Разделитель */}
              <div className="hidden h-10 w-px bg-white/20 sm:block" />

              {/* Рейтинги */}
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">

                {/* 2ГИС 4,9 — кликабельно */}
                <a
                  href="https://2gis.ru/ekaterinburg/search/Автояпонец%20Сахарова%2C%20107%2F2/firm/70000001110998814?m=60.500637%2C56.792667%2F16.87%2Fp%2F0.36%2Fr%2F-129.05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  title="Наш рейтинг на 2ГИС"
                >
                  <Star size={16} strokeWidth={0} fill="#ffcc00" className="text-[#ffcc00]" />
                  <span className="font-display text-xl font-semibold text-white md:text-2xl">4,9</span>
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 overflow-hidden rounded-md">
                    <rect width="32" height="32" fill="#FFB700" />
                    <path d="M0 20L32 15V32H0V20Z" fill="#58C22E" />
                    <path d="M-2 21L34 14" stroke="white" strokeWidth="2.5" />
                    <path d="M16 26s-5.5-6-5.5-10.5C10.5 11.46 12.96 9 16 9s5.5 2.46 5.5 6.5S16 26 16 26z" fill="#1b82f6" stroke="white" strokeWidth="2.5"/>
                  </svg>
                </a>

                {/* Яндекс 5,0 — кликабельно */}
                <a
                  href="https://yandex.ru/maps/org/avtomoyo/132887448531/?ll=60.776537%2C56.900037&mode=search&sll=60.769089%2C56.899720&sspn=0.019741%2C0.007937&text=%D0%90%D0%B2%D1%82%D0%BE%D0%AF%D0%BF%D0%BE%D0%BD%D0%B5%D1%86%20%D0%B1%D0%B5%D1%80%D0%B5%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%B8%D0%B2%D0%BE%D0%B7&z=15.13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  title="Наш рейтинг на Яндекс Картах"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} strokeWidth={0} fill="#ffcc00" className="text-[#ffcc00]" />
                    ))}
                  </div>
                  <span className="font-display text-xl font-semibold text-white md:text-2xl">5,0</span>
                </a>

                {/* Яндекс — Хорошее место — кликабельно */}
                <a
                  href="https://yandex.ru/maps/org/avtomoyo/218269267792/?ll=60.640270%2C56.889493&z=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                  title="Хорошее место 2026 на Яндекс Картах"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M3 15c0 0-2-6 3-8 0 0-3 5-1 8 0 0-1 1-2 0z" fill="#ffcc00"/>
                    <path d="M4.5 18c0 0-1-4 2-5 0 0-2 3-1 4.5 0 0-.5.5-1 .5z" fill="#ffcc00"/>
                    <path d="M21 15c0 0 2-6-3-8 0 0 3 5 1 8 0 0 1 1 2 0z" fill="#ffcc00"/>
                    <path d="M19.5 18c0 0 1-4-2-5 0 0 2 3 1 4.5 0 0 .5.5 1 .5z" fill="#ffcc00"/>
                    <path d="M12 22s-6-7-6-12.5C6 6.46 8.69 4 12 4s6 2.46 6 5.5S12 22 12 22z" fill="#ff3333"/>
                    <circle cx="12" cy="9.5" r="3" fill="white"/>
                  </svg>
                  <span className="text-sm font-medium text-white/75">
                    Хорошее место 2026
                  </span>
                </a>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- MARQUEE ------------------------------ */}
      <section className="flex h-20 items-center border-y border-gray-100 bg-white md:h-24">
        <div
          className="w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...marqueeMakes, ...marqueeMakes].map((m, i) => {
              const filename = MAKE_LOGOS[m.key];
              const svgContent = filename ? readSvgFile(filename) : null;
              return (
                <span key={i} className="flex items-center" aria-hidden={i >= marqueeMakes.length} title={m.label}>
                  {svgContent ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: svgContent }}
                      className="block h-7 w-auto opacity-45 grayscale transition duration-300 hover:opacity-85 hover:grayscale-0 md:h-9 [&_svg]:h-full [&_svg]:w-auto [&_svg]:max-w-[80px]"
                      aria-label={m.label}
                    />
                  ) : filename ? (
                    <Image
                      src={`/img/makes/${filename}`}
                      alt={m.label}
                      width={80}
                      height={36}
                      className="h-7 w-auto max-w-[80px] opacity-45 grayscale transition duration-300 hover:opacity-85 hover:grayscale-0 md:h-9"
                    />
                  ) : null}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------- PORTAL SPLIT -------------------------- */}
      <section className="relative overflow-hidden" style={{background: "linear-gradient(160deg, #0076be 0%, #0062a8 40%, #004f92 100%)"}}>
        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute inset-0 opacity-15" style={{backgroundImage: "radial-gradient(circle at 15% 60%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(0,120,200,0.3) 0%, transparent 55%)"}} />
        
        <div className="wrap relative py-20 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400/80">Магазин · Сервис</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Одна команда —{" "}
              <span className="italic font-light text-sky-300">два направления</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                href: "/catalog",
                img: "/img/shop-real.jpg",
                tag: "Магазин",
                title: "Магазин запчастей",
                text: "30 000+ наименований на складе: фильтры, тормоза, подвеска, масла и электрика. 5 магазинов — заберите заказ в удобном районе.",
                cta: "Перейти в каталог",
                accent: "#38bdf8",
              },
              {
                href: "/service",
                img: "/img/service-real.jpg",
                tag: "Сервис",
                title: "Сервисный центр",
                text: "Сервис-центр на Шефской, 4б: 8 подъёмников, ТО по регламенту, диагностика и ремонт любой сложности с гарантией 12 месяцев.",
                cta: "Записаться",
                accent: "#38bdf8",
              },
            ].map((card, i) => (
              <Reveal key={card.href} delay={i * 0.12}>
                <Link
                  href={card.href}
                  className="group relative block h-[400px] overflow-hidden rounded-2xl md:h-[460px]"
                  style={{boxShadow: "0 20px 60px rgba(0,0,0,0.5)"}}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
                    style={{filter: "brightness(0.75) contrast(1.1) saturate(0.9)"}}
                  />
                  {/* Blue cinematic overlay */}
                  <div className="absolute inset-0 mix-blend-multiply" style={{background: "linear-gradient(160deg, rgba(14,42,102,0.35) 0%, transparent 60%)"}} />
                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05152e]/95 via-[#05152e]/30 to-transparent transition group-hover:via-[#05152e]/20" />
                  
                  {/* Tag */}
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {card.tag}
                  </span>
                  
                  {/* Arrow button */}
                  <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 group-hover:rotate-45 group-hover:border-sky-400 group-hover:bg-sky-500">
                    <ArrowUpRight size={18} />
                  </span>
                  
                  {/* Bottom content */}
                  <div className="absolute inset-x-6 bottom-6">
                    <h3 className="font-display text-2xl font-bold text-white md:text-[1.7rem]">{card.title}</h3>
                    <p className="mt-2.5 max-w-md text-sm leading-relaxed text-white/70">{card.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition-all duration-200 group-hover:gap-3">
                      {card.cta} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>




      {/* ---------------------------- PAYMENT SPLIT -------------------------- */}
      <section className="border-y border-gray-100 bg-[#eff3f8] overflow-hidden">
        <div className="wrap">
          <div className="flex flex-col items-center gap-8 py-8 md:flex-row md:justify-between md:py-12">
            
            {/* Левая часть: текст */}
            <div className="flex-1 md:max-w-lg lg:max-w-xl">
              <Reveal>
                <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
                  Оплачивай покупку запчастей и услуги сервиса{" "}
                  <span className="text-sky-500">частями</span>
                </h2>
                <p className="mt-4 max-w-md text-base text-slate-600 md:text-lg">
                  Без переплат и скрытых комиссий. Ремонтируйте сегодня — платите потом через Яндекс Сплит или Халву.
                </p>
                <div className="mt-6">
                  <Link
                    href="/installment"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    Подробнее
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Правая часть: картинка без фона (mix-blend-multiply) */}
            <div className="relative w-full max-w-[280px] md:max-w-[400px] lg:max-w-[500px]">
              <Reveal delay={0.2}>
                <div className="relative aspect-[16/9] w-full lg:scale-125 lg:origin-right">
                  <Image
                    src="/img/payment_split_banner.jpg"
                    alt="Оплата частями: Яндекс Сплит и Халва"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-contain mix-blend-multiply"
                    priority
                  />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------ PROMOS ---------------------------- */}
      <section className="bg-[#0076be] py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Акции и скидки «АвтоМоё»
                </p>
              </div>
            </div>
          </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PROMOS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.07}>
              <div className="group card h-full overflow-hidden transition hover:border-accent-500/25">
                {/* Место под макет */}
                <div className="relative aspect-square overflow-hidden bg-[#0076be]/10">
                  {p.img && (
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-display text-[13px] font-extrabold uppercase leading-snug md:text-sm">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>



      {/* ---------------------------- ADVANTAGES ---------------------------- */}
      <section className="wrap pt-20 md:pt-28">
        <Reveal>
          <div className="flex flex-col items-start gap-2.5">
            <p className="section-subtitle">Преимущества сети</p>
            <h2 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
              Почему возвращаются <span className="text-[#0076be]">к нам</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Star,
              t: "Собственный бренд",
              d: "Выпускаем надёжные запчасти под собственным брендом AVTOMOE с контролем на каждом этапе.",
              stat: "AVTOMOE",
              statLabel: "бренд сети",
              isHero: true,
            },
            {
              icon: Warehouse,
              t: "35 000 +",
              d: "35 000+ наименований на складе в Екатеринбурге — 92% заказов выдаём в день обращения.",
              stat: "в наличии",
              statLabel: "на складе",
            },
            {
              icon: Truck,
              t: "Быстрая доставка",
              d: "Курьером по городу от 60 минут. По всей России отправляем через СДЭК, Boxberry и ПЭК.",
              stat: "60–90 мин",
              statLabel: "по городу",
            },
            {
              icon: ShieldCheck,
              t: "Гарантия качества",
              d: "Только официальные поставки. Гарантия на запчасти до 12 месяцев, обмен и возврат — 14 дней.",
              stat: "до 12 мес",
              statLabel: "гарантия",
            },
            {
              icon: Wrench,
              t: "Свой сервисный центр",
              d: "Сертифицированный сервис с 8 подъёмниками: купили запчасть — сразу установили с гарантией на работы.",
              stat: "8 подъёмников",
              statLabel: "",
            },
            {
              icon: ScanSearch,
              t: "Подбор по VIN",
              d: "Точный подбор оригинала и проверенных аналогов по VIN или номеру кузова до 15 минут. Бесплатно.",
              stat: "до 15 минут",
              statLabel: "",
            },
          ].map((a, i) => (
            <Reveal key={a.t} delay={(i % 3) * 0.08}>
              <div
                className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 ${
                  a.isHero
                    ? "bg-gradient-to-br from-[#0076be] to-[#00578d] text-white shadow-lg shadow-[#0076be]/20 hover:shadow-xl hover:shadow-[#0076be]/35"
                    : "border border-slate-200/80 bg-white text-slate-900 shadow-sm hover:border-[#0076be]/40 hover:shadow-xl hover:shadow-[#0076be]/10"
                }`}
              >
                {/* Фоновый порядковый номер */}
                <span
                  className={`pointer-events-none absolute -bottom-3 -right-1 select-none font-display text-6xl font-black leading-none ${
                    a.isHero ? "text-white/10" : "text-slate-900/[0.04]"
                  }`}
                >
                  0{i + 1}
                </span>

                <div>
                  {/* Верхний ряд: иконка + метрика-бейдж */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl transition-all duration-300 ${
                        a.isHero
                          ? "bg-white/20 text-white group-hover:scale-105 group-hover:bg-white group-hover:text-[#0076be]"
                          : "border border-[#0076be]/20 bg-[#0076be]/10 text-[#0076be] group-hover:scale-105 group-hover:bg-[#0076be] group-hover:text-white"
                      }`}
                    >
                      <a.icon size={19} />
                    </span>

                    <span
                      className={`inline-flex items-baseline gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                        a.isHero
                          ? "bg-white/20 text-white backdrop-blur-xs"
                          : "bg-slate-100 text-[#0076be] transition-colors group-hover:bg-[#0076be]/10"
                      }`}
                    >
                      <span className="font-extrabold">{a.stat}</span>
                      <span
                        className={`text-[10px] font-medium ${
                          a.isHero ? "text-white/80" : "text-slate-500"
                        }`}
                      >
                        {a.statLabel}
                      </span>
                    </span>
                  </div>

                  {/* Заголовок карточки */}
                  <h3
                    className={`mt-3.5 font-display text-sm font-extrabold uppercase tracking-tight ${
                      a.isHero ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {a.t}
                  </h3>

                  {/* Описание */}
                  <p
                    className={`mt-1.5 text-xs leading-relaxed ${
                      a.isHero ? "text-white/85" : "text-zinc-500"
                    }`}
                  >
                    {a.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------- PROMO ------------------------------ */}
      <section className="wrap pt-20 md:pt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-8 md:p-14">
            <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-accent-400/25 blur-[120px]" />
            <p className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[160px] font-extrabold leading-none text-outline-light opacity-40 md:text-[240px]">
              −15%
            </p>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white">Акция</p>
            <h2 className="relative mt-5 max-w-lg font-display text-3xl font-extrabold uppercase leading-tight text-white md:text-4xl">
              Тест-драйв сервисного центра
            </h2>
            <p className="relative mt-4 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
              Первый визит в сервис-центр на Шефской — со скидкой 15%: ТО по регламенту, диагностика и ремонт.
              Оцените сервис изнутри, как в Перми на Героева Хасана.
            </p>
            <Link href="/service" className="btn relative mt-7 bg-white px-6 py-3.5 text-accent-700 hover:bg-carbon-800">
              Записаться со скидкой <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* -------------------------------- VIN ------------------------------- */}
      <section id="vin" className="wrap scroll-mt-28 pt-12 md:pt-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-[#f4f7fb] p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
              {/* Левая сторона: Текст ровно в 2 строчки */}
              <div className="lg:col-span-6">
                <h2 className="font-display tracking-tight">
                  <span className="block text-2xl font-extrabold leading-tight text-slate-900 sm:text-[26px] md:text-[28px]">
                    Нужна конкретная запчасть?
                  </span>
                  <span className="mt-1.5 block text-base font-medium text-[#0076be] sm:text-lg md:text-xl">
                    Подберем по VIN за 15 минут
                  </span>
                </h2>
              </div>

              {/* Правая сторона: Заполнение данных */}
              <div className="lg:col-span-6">
                <VinForm />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------- TESTIMONIALS --------------------------- */}
      <section id="reviews" className="wrap scroll-mt-24 pt-20 md:pt-28">
        <Reveal>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
              Нам доверяют
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <YandexReviews />
        </Reveal>
      </section>
    </div>
  );
}
