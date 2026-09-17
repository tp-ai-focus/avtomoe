import { ArrowRight, ArrowUpRight, PackageSearch, ShieldCheck, CheckCircle2, Clock, Truck, Layers, Sparkles, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Filters } from "@/components/catalog/Filters";
import { SortSelect } from "@/components/catalog/SortSelect";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";
import { getCatalog, getFacets, getFeaturedProducts, type CatalogQuery } from "@/lib/data";
import { plural } from "@/lib/format";
import { ShopHeroForm } from "@/components/ShopHeroForm";
import { CategoryCardsGrid } from "@/components/CategoryCardsGrid";
import { ShopPromotions } from "@/components/ShopPromotions";
import { ShopGallery } from "@/components/ShopGallery";
import { ShopMapSection } from "@/components/ShopMapSection";
import { YandexReviews } from "@/components/YandexReviews";

export const metadata: Metadata = {
  title: "Каталог запчастей — Магазин АвтоМоё",
  description:
    "35 000+ запчастей в наличии, собственный бренд, работа 24/7 и бесплатная доставка. Подберём подходящую деталь по VIN, быстро оформим заказ и дадим гарантию.",
};



const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function CatalogPage() {
  const query: CatalogQuery = {};

  const [{ items, category }, facets, featured] = await Promise.all([getCatalog(query), getFacets(), getFeaturedProducts(8)]);

  return (
    <div>
      {/* -------------------- HERO: УТП СЛЕВА + ФОРМА СПРАВА -------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003b73] to-[#0076be] pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Фото склада запчастей на фоне с эффектом наложения */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/catalog-hero-bg.jpg"
            alt="Склад автозапчастей АвтоМоё"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-35 mix-blend-overlay"
          />
          {/* Градиентные слои для идеальной глубины и читаемости */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002855]/95 via-[#003b73]/75 to-[#0076be]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002855]/80 via-transparent to-transparent" />
        </div>

        <div className="wrap relative z-10">
          {/* Хлебные крошки */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-white/60">
            <Link href="/" className="transition hover:text-white">Главная</Link>
            <span>/</span>
            <span className="text-white">Магазин запчастей</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[460px]">
            {/* Левая часть: УТП */}
            <Reveal className="lg:col-span-7">
              <div className="pt-2 lg:pt-0">
                {/* Бейджи: 24/7 + 5 звёзд на Яндекс Картах */}
                <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-4 py-1.5 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="font-display text-[11px] font-bold uppercase tracking-wider text-white">
                      Магазин запчастей 24/7
                    </span>
                  </div>

                  <a
                    href="https://yandex.ru/maps/org/avtomoyo/132887448531/?ll=60.776537%2C56.900037&mode=search&sll=60.769089%2C56.899720&sspn=0.019741%2C0.007937&text=%D0%90%D0%B2%D1%82%D0%BE%D0%AF%D0%BF%D0%BE%D0%BD%D0%B5%D1%86%20%D0%B1%D0%B5%D1%80%D0%B5%D0%B7%D0%BE%D0%B2%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BF%D1%80%D0%B8%D0%B2%D0%BE%D0%B7&z=15.13"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 backdrop-blur-md transition hover:bg-white/[0.16] hover:border-white/25"
                    title="Рейтинг 5,0 на Яндекс Картах"
                  >
                    <div className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={12} strokeWidth={0} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white">
                      5 звёзд на Яндекс Картах
                    </span>
                  </a>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[54px] font-extrabold leading-[1.08] tracking-tight text-white mb-6">
                  Нужна запчасть? <br />
                  <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-[#29A8E0] bg-clip-text text-transparent">
                    Найдём. Подберём. Доставим.
                  </span>
                </h1>

                <div className="space-y-3 max-w-xl">
                  {/* Ключевые тезисы строками */}
                  <div className="flex flex-col gap-1.5 text-base sm:text-lg text-white font-medium">
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span><strong className="text-white font-bold">35 000</strong> деталей в наличии</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span>Собственный бренд запчастей <strong className="text-sky-300 font-semibold">«АвтоМоё»</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span>Работаем <strong className="text-white font-bold">24/7</strong></span>
                    </div>
                  </div>

                  {/* Поясняющая строка */}
                  <p className="pt-1 text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
                    Подберём запчасть по VIN, бесплатно доставим и предоставим гарантию.
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/40 bg-white/[0.92] px-4 py-2.5 shadow-xl shadow-black/25 backdrop-blur-md">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                    <CheckCircle2 size={16} strokeWidth={2.5} />
                  </div>
                  <div className="text-sm sm:text-base font-medium text-slate-800">
                    <span className="font-bold text-slate-950">Оставьте заявку</span>
                    <span className="text-slate-600"> — остальное возьмём на себя.</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Правая часть: Форма заявки */}
            <Reveal delay={0.15} className="lg:col-span-5 h-full">
              <div className="h-full w-full rounded-[28px] border border-white/15 bg-gradient-to-b from-[#0076be] to-[#005a92] p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur-sm relative overflow-hidden">
                <ShopHeroForm />
              </div>
            </Reveal>
          </div>

          {/* Сетка ключевых цифр магазина */}
          <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                value: "35 000+",
                unit: "",
                label: "запчастей на складе",
                desc: "Для японцев и европейцев",
              },
              {
                value: "24/7",
                unit: "",
                label: "круглосуточно",
                desc: "Магазин и выдача заказов",
              },
              {
                value: "−15%",
                unit: "",
                label: "скидка на запчасти",
                desc: "При оформлении заявки",
              },
              {
                value: "15 мин",
                unit: "",
                label: "подбор по VIN",
                desc: "Точно под ваш автомобиль",
              },
            ].map((stat, idx) => (
              <Reveal key={idx} delay={0.2 + idx * 0.06}>
                <div className="group relative h-full rounded-2xl border border-white/[0.12] bg-white/[0.06] p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.10] hover:-translate-y-1 shadow-lg shadow-black/20">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-sm">
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

      {/* ---------------------------- КАТАЛОГ ТОВАРОВ И КАТЕГОРИИ ---------------------------- */}
      <div className="wrap pb-16 pt-12 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-subtitle">Категории</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-slate-900 md:text-4xl">
              {category ? category.name : "Популярные категории запчастей"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
              {category?.description ||
                "Оригинальные детали и проверенные аналоги с гарантией — в наличии на складе в Екатеринбурге."}
            </p>
          </div>
        </div>

      {/* ---------------------------- CATEGORIES ---------------------------- */}
      <section className="mt-10">
        <CategoryCardsGrid categories={facets.categories} />
      </section>

      {/* ---------------------------- АКЦИИ МАГАЗИНА ---------------------------- */}
      <ShopPromotions />

      {/* ---------------------------- ГАЛЕРЕЯ И СЕТЬ МАГАЗИНОВ ---------------------------- */}
      <ShopGallery />
      </div>

      {/* ---------------------------- КАК К НАМ ДОБРАТЬСЯ (КАРТА) ---------------------------- */}
      <ShopMapSection />

      {/* ---------------------------- НАМ ДОВЕРЯЮТ (ОТЗЫВЫ ПО МАГАЗИНАМ) ---------------------------- */}
      <section id="reviews" className="wrap scroll-mt-24 pt-20 pb-20 md:pt-28 md:pb-28">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="section-subtitle">Отзывы</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
                Нам доверяют
              </h2>
            </div>

            <a
              href="https://yandex.ru/maps/org/avtomoyo/132887448531/reviews/"
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
          <YandexReviews />
        </Reveal>
      </section>
    </div>
  );
}
