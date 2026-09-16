import {
  BadgeCheck,
  Car,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyPanel } from "@/components/product/BuyPanel";
import { Gallery } from "@/components/product/Gallery";
import { ReviewForm } from "@/components/product/ReviewForm";
import { ProductCard } from "@/components/ProductCard";
import { RatingStars } from "@/components/RatingStars";
import { Reveal } from "@/components/Reveal";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { discountPercent, formatDate, formatPrice, plural } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  return {
    title: product.name,
    description: `${product.name} — ${formatPrice(product.price)}. В наличии на складе «Авто моё» в Екатеринбурге. ${product.category.name} для японских и европейских автомобилей.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);
  const discount = discountPercent(product.price, product.oldPrice);
  const images = product.images.length > 0 ? product.images : [product.image];
  const maxBar = Math.max(1, ...product.ratingBars.map((b) => b.count));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: product.brand,
    image: images,
    description: product.description.slice(0, 220),
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(product.rating.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.avg.toFixed(1),
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };

  return (
    <div className="wrap pb-16 pt-8 md:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-500">
        <Link href="/" className="transition hover:text-accent-600">Главная</Link>
        <span>/</span>
        <Link href="/catalog" className="transition hover:text-accent-600">Каталог</Link>
        <span>/</span>
        <Link href={`/catalog?cat=${product.category.slug}`} className="transition hover:text-accent-600">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="truncate text-ink/70">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <Gallery
            images={images}
            name={product.name}
            badges={
              <>
                {discount && (
                  <span className="rounded-full bg-alert px-3 py-1.5 text-xs font-extrabold text-white">
                    −{discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-extrabold text-carbon-950">Новинка</span>
                )}
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <span className="chip">{product.category.name}</span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">{product.brand}</span>
          </div>

          <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight text-cream md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-xs font-semibold text-zinc-500">Артикул: {product.sku}</span>
            {product.rating.count > 0 && (
              <a href="#reviews" className="flex items-center gap-2 transition hover:opacity-80">
                <RatingStars value={product.rating.avg} />
                <span className="font-bold text-cream">{product.rating.avg.toFixed(1)}</span>
                <span className="text-zinc-500">
                  · {product.rating.count} {plural(product.rating.count, ["отзыв", "отзыва", "отзывов"])}
                </span>
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2 border-y border-ink/[0.07] py-6">
            <p className="font-display text-4xl font-extrabold text-cream">{formatPrice(product.price)}</p>
            {product.oldPrice && (
              <p className="pb-1 text-lg font-semibold text-zinc-600 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            <span
              className={`mb-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                product.stock > 5
                  ? "bg-emerald-500/10 text-emerald-600"
                  : product.stock > 0
                    ? "bg-amber-500/10 text-amber-600"
                    : "bg-red-500/10 text-red-600"
              }`}
            >
              <CheckCircle2 size={13} />
              {product.stock > 5
                ? `В наличии · ${product.stock} шт`
                : product.stock > 0
                  ? `Осталось ${product.stock} шт`
                  : "Уточняйте наличие"}
            </span>
          </div>

          <div className="mt-6">
            <BuyPanel
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                sku: product.sku,
                price: product.price,
                image: product.image,
              }}
            />
          </div>

          <div className="mt-8 space-y-3 text-sm">
            {[
              { icon: MapPin, title: "Самовывоз со склада", text: "ул. Шефская, 4б — сегодня, бесплатно" },
              { icon: Truck, title: "По Екатеринбургу", text: "сегодня–завтра · 300 ₽, от 5 000 ₽ — бесплатно" },
              { icon: Package, title: "По России", text: "СДЭК, Boxberry, ПЭК · 2–6 дней · от 500 ₽" },
            ].map((row) => (
              <div key={row.title} className="flex items-center gap-4 rounded-2xl border border-ink/[0.06] bg-ink/[0.02] px-4 py-3">
                <row.icon size={18} className="shrink-0 text-accent-400" />
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-bold text-cream">{row.title}</span>
                  <span className="text-zinc-500">{row.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-zinc-500">
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-accent-400" /> Сертифицированный товар</span>
            <span className="inline-flex items-center gap-1.5"><RotateCcw size={14} className="text-accent-400" /> Возврат 14 дней</span>
            <span className="inline-flex items-center gap-1.5"><CreditCard size={14} className="text-accent-400" /> Оплата при получении</span>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div className="min-w-0 space-y-14">
          <Reveal>
            <section>
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Описание</h2>
              <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-zinc-500">
                {product.description.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Характеристики</h2>
              <dl className="mt-4 overflow-hidden rounded-2xl border border-ink/[0.07]">
                <SpecRow k="Артикул" v={product.sku} />
                <SpecRow k="Производитель" v={product.brand} striped />
                {Object.entries(product.specs).map(([k, v], i) => (
                  <SpecRow key={k} k={k} v={v} striped={i % 2 === 0} />
                ))}
              </dl>
            </section>
          </Reveal>

          {product.compatibility.length > 0 && (
            <Reveal>
              <section>
                <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Подходит для</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.compatibility.map((c) => (
                    <span key={c} className="chip !py-2 !text-[13px]">
                      <Car size={14} className="text-accent-400" /> {c}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                  Не нашли свой автомобиль?{" "}
                  <Link href="/#vin" className="font-bold text-accent-600 underline-offset-4 hover:underline">
                    Подберём по VIN
                  </Link>{" "}
                  за 10 минут.
                </p>
              </section>
            </Reveal>
          )}

          <Reveal>
            <section id="reviews">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">
                  Отзывы{" "}
                  <span className="text-zinc-600">
                    {product.rating.count > 0 ? product.rating.count : ""}
                  </span>
                </h2>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[240px_1fr]">
                <div className="card p-6">
                  {product.rating.count > 0 ? (
                    <>
                      <p className="font-display text-5xl font-extrabold text-cream">
                        {product.rating.avg.toFixed(1)}
                      </p>
                      <RatingStars value={product.rating.avg} size={16} className="mt-3" />
                      <p className="mt-2 text-xs text-zinc-500">
                        {product.rating.count} {plural(product.rating.count, ["отзыв", "отзыва", "отзывов"])}
                      </p>
                      <div className="mt-4 space-y-2">
                        {product.ratingBars.map((b) => (
                          <div key={b.stars} className="flex items-center gap-2 text-[11px] text-zinc-500">
                            <span className="w-3 font-bold">{b.stars}</span>
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/[0.06]">
                              <div
                                className="h-full rounded-full bg-star"
                                style={{ width: `${(b.count / maxBar) * 100}%` }}
                              />
                            </div>
                            <span className="w-4 text-right">{b.count}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm leading-relaxed text-zinc-500">
                      Отзывов пока нет — станьте первым, кто оценит эту запчасть.
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  {product.reviewList.map((r) => (
                    <article key={r.id} className="rounded-2xl border border-ink/[0.06] bg-ink/[0.02] p-5">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-500/10 font-display text-sm font-bold text-accent-600">
                          {r.author.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="flex items-center gap-2 text-sm font-bold text-cream">
                            {r.author}
                            <BadgeCheck size={14} className="shrink-0 text-emerald-400" />
                          </p>
                          <p className="text-[11px] text-zinc-500">{formatDate(r.createdAt)} · покупка подтверждена</p>
                        </div>
                        <RatingStars value={r.rating} className="ml-auto" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink/70">{r.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-36 lg:self-start">
          <ReviewForm productId={product.id} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">
              Похожие запчасти
            </h2>
            <Link href={`/catalog?cat=${product.category.slug}`} className="link-underline text-sm font-bold text-accent-600">
              Вся категория
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SpecRow({ k, v, striped }: { k: string; v: string; striped?: boolean }) {
  return (
    <div className={`grid grid-cols-[160px_1fr] gap-4 px-5 py-3.5 text-sm sm:grid-cols-[220px_1fr] ${striped ? "bg-ink/[0.025]" : ""}`}>
      <dt className="text-zinc-500">{k}</dt>
      <dd className="font-medium text-ink">{v}</dd>
    </div>
  );
}
