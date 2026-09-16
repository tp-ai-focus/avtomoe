"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { discountPercent, formatPrice } from "@/lib/format";
import type { ProductCard as ProductCardType } from "@/lib/data";
import { useCart } from "@/store/cart";
import { RatingStars } from "./RatingStars";

export function ProductCard({ product }: { product: ProductCardType }) {
  const add = useCart((s) => s.add);
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <article className="group card relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/25 hover:shadow-[0_24px_50px_-24px_rgba(22,28,46,0.2)]">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-carbon-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/45 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount && (
            <span className="rounded-full bg-alert px-2.5 py-1 text-[11px] font-extrabold text-white">
              −{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-extrabold text-carbon-950">
              Новинка
            </span>
          )}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-night/85 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur">
            Осталось {product.stock} шт.
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">{product.brand}</p>
          {product.rating.count > 0 ? (
            <span className="flex items-center gap-1.5">
              <RatingStars value={product.rating.avg} size={11} />
              <span className="text-[11px] font-semibold text-zinc-500">{product.rating.count}</span>
            </span>
          ) : null}
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-[15px] font-semibold leading-snug text-cream transition group-hover:text-accent-600"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="leading-none">
            {product.oldPrice && (
              <p className="mb-1.5 text-xs font-semibold text-zinc-600 line-through">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            <p className="font-display text-lg font-extrabold text-cream">{formatPrice(product.price)}</p>
          </div>
          <button
            onClick={() =>
              add({
                id: product.id,
                slug: product.slug,
                name: product.name,
                sku: product.sku,
                price: product.price,
                image: product.image,
              })
            }
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/12 text-cream transition-all duration-200 hover:border-accent-500 hover:bg-accent-500 hover:text-white active:scale-90"
            aria-label={`Добавить в корзину: ${product.name}`}
          >
            <ShoppingCart size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
