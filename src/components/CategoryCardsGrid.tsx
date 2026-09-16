"use client";

import { useState } from "react";
import Image from "next/image";
import { ShopOrderModal } from "@/components/ShopOrderModal";

interface CategoryItem {
  name: string;
  slug: string;
  image: string;
  count: number;
}

interface CategoryCardsGridProps {
  categories: CategoryItem[];
}

export function CategoryCardsGrid({ categories }: CategoryCardsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div
            key={c.slug}
            onClick={() => setSelectedCategory(c.name)}
            className="group relative flex flex-col justify-end h-72 sm:h-80 overflow-hidden rounded-[24px] border border-sky-400/30 bg-gradient-to-br from-[#0076be] via-[#005a92] to-[#0a1e3b] p-6 shadow-xl shadow-sky-950/20 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/25 hover:border-sky-300/60 hover:-translate-y-1.5 cursor-pointer"
          >
            {/* Фоновое изображение со стильным режимом наложения */}
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.08] mix-blend-luminosity opacity-90 group-hover:opacity-100"
            />
            
            {/* Красивый фирменный сине-голубой градиент и мягкое свечение */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003865] via-[#005a92]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400/25 via-transparent to-transparent pointer-events-none" />

            {/* Нижняя часть: Название категории + Кнопка «Подобрать со скидкой 15%» */}
            <div className="relative z-10 flex flex-col gap-3.5">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white transition group-hover:text-sky-300">
                  {c.name}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-300/85">
                  В наличии на складе · Оригинал и аналоги
                </p>
              </div>

              {/* Кнопка подбора со скидкой 15% (чистая, без иконки) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(c.name);
                }}
                className="flex w-full items-center justify-center rounded-xl border border-white/40 bg-white/[0.95] py-2.5 px-4 text-xs sm:text-sm font-bold text-slate-900 shadow-lg shadow-black/25 backdrop-blur-md transition-all duration-200 hover:bg-white hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Подобрать со скидкой <strong className="text-red-600 font-extrabold">15%</strong></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно заявки магазина (точно такое же как на скриншоте) */}
      {selectedCategory && (
        <ShopOrderModal
          isOpen={true}
          onClose={() => setSelectedCategory(null)}
          categoryName={selectedCategory}
        />
      )}
    </>
  );
}
