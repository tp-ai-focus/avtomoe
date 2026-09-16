"use client";

import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

export function BuyPanel({
  product,
}: {
  product: { id: number; slug: string; name: string; sku: string; price: number; image: string };
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const setOpen = useCart((s) => s.setOpen);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-ink/12">
        <button
          onClick={() => setQty((v) => Math.max(1, v - 1))}
          className="grid h-12 w-11 place-items-center text-zinc-500 transition hover:text-cream"
          aria-label="Уменьшить количество"
        >
          <Minus size={15} />
        </button>
        <span className="w-8 text-center font-display text-base font-bold">{qty}</span>
        <button
          onClick={() => setQty((v) => Math.min(99, v + 1))}
          className="grid h-12 w-11 place-items-center text-zinc-500 transition hover:text-cream"
          aria-label="Увеличить количество"
        >
          <Plus size={15} />
        </button>
      </div>

      <button
        onClick={() => {
          add(product, qty);
          setAdded(true);
        }}
        className="btn-accent min-w-52 flex-1 sm:flex-none"
      >
        {added ? <Check size={17} /> : <ShoppingCart size={17} />}
        {added ? "В корзине" : "В корзину"}
      </button>

      <button
        onClick={() => {
          add(product, qty);
          setOpen(true);
        }}
        className="btn-outline"
      >
        Купить в 1 клик
      </button>
    </div>
  );
}
