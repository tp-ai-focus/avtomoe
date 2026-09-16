"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { cartCount, cartSubtotal, useCart } from "@/store/cart";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const subtotal = cartSubtotal(items);
  const count = cartCount(items);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-night/60 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-ink/[0.07] bg-carbon-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/[0.07] px-6 py-5">
              <p className="font-display text-lg font-bold">
                  Корзина{" "}
                  <span className="ml-1 text-sm font-medium text-zinc-500">
                    {count > 0 ? `${count}` : ""}
                  </span>
              </p>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-zinc-500 transition hover:border-ink/30 hover:text-cream"
                aria-label="Закрыть корзину"
              >
                <X size={17} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full border border-dashed border-ink/15 text-zinc-500">
                  <ShoppingCart size={28} />
                </span>
                <p className="font-display text-lg font-bold">Корзина пуста</p>
                <p className="text-sm leading-relaxed text-zinc-500">
                  Добавьте запчасти из каталога — на складе более 30 000 наименований.
                </p>
                <Link href="/catalog" onClick={() => setOpen(false)} className="btn-accent mt-2">
                  Перейти в каталог <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 rounded-2xl border border-ink/[0.06] bg-ink/[0.02] p-3"
                    >
                      <Link href={`/product/${item.slug}`} onClick={() => setOpen(false)} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-carbon-800">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] uppercase tracking-wider text-zinc-500">{item.sku}</p>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="mt-0.5 block truncate text-sm font-semibold text-cream hover:text-accent-600"
                        >
                          {item.name}
                        </Link>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center rounded-full border border-ink/10">
                            <button
                              onClick={() => setQty(item.id, item.qty - 1)}
                              className="grid h-7 w-7 place-items-center text-zinc-500 transition hover:text-cream"
                              aria-label="Уменьшить"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                            <button
                              onClick={() => setQty(item.id, item.qty + 1)}
                              className="grid h-7 w-7 place-items-center text-zinc-500 transition hover:text-cream"
                              aria-label="Увеличить"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="text-sm font-extrabold text-cream">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="self-start text-zinc-600 transition hover:text-accent-400"
                        aria-label="Удалить из корзины"
                      >
                        <Trash2 size={15} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-ink/[0.07] px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Подытог</span>
                    <span className="font-display text-xl font-extrabold text-cream">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    Доставка рассчитывается на оформлении: самовывоз с Шефской — бесплатно, по Екатеринбургу — от 300 ₽.
                  </p>
                  <Link href="/checkout" onClick={() => setOpen(false)} className="btn-accent w-full">
                    Оформить заказ <ArrowRight size={16} />
                  </Link>
                  <button onClick={() => setOpen(false)} className="btn-ghost w-full text-xs">
                    Продолжить покупки
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
