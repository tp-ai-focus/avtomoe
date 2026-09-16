"use client";

import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { MAKE_GROUPS, MAKES } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import type { Facets } from "@/lib/data";

export function Filters({ facets }: { facets: Facets }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [minP, setMinP] = useState(searchParams.get("min") ?? "");
  const [maxP, setMaxP] = useState(searchParams.get("max") ?? "");

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setMinP(searchParams.get("min") ?? "");
    setMaxP(searchParams.get("max") ?? "");
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const replaceWith = (mutate: (p: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggleMulti = (key: string, value: string) => {
    replaceWith((p) => {
      const list = (p.get(key) ?? "").split(",").filter(Boolean);
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      if (next.length > 0) p.set(key, next.join(","));
      else p.delete(key);
    });
  };

  const isChecked = (key: string, value: string) =>
    (searchParams.get(key) ?? "").split(",").includes(value);

  const applyPrice = () =>
    replaceWith((p) => {
      if (minP) p.set("min", minP);
      else p.delete("min");
      if (maxP) p.set("max", maxP);
      else p.delete("max");
    });

  const applySearch = () =>
    replaceWith((p) => {
      if (q.trim()) p.set("q", q.trim());
      else p.delete("q");
    });

  const reset = () => router.replace(pathname, { scroll: false });

  const hasFilters =
    ["cat", "q", "min", "max", "brand", "make"].some((k) => searchParams.get(k) != null);

  const presentMakes = new Set(facets.makes.map((m) => m.key));
  const makeCount = (key: string) => facets.makes.find((m) => m.key === key)?.count ?? 0;

  const body = (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Поиск</p>
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            placeholder="Название, бренд, артикул…"
            className="field pr-11"
          />
          <button
            onClick={applySearch}
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-zinc-500 transition hover:bg-ink/5 hover:text-accent-600"
            aria-label="Найти"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Категории</p>
        <ul className="space-y-1">
          <CategoryRow
            href={buildHref(searchParams, null)}
            active={!searchParams.get("cat")}
            label="Все товары"
            count={facets.categories.reduce((s, c) => s + c.count, 0)}
          />
          {facets.categories.map((c) => (
            <CategoryRow
              key={c.slug}
              href={buildHref(searchParams, c.slug)}
              active={searchParams.get("cat") === c.slug}
              label={c.name}
              count={c.count}
            />
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Цена, ₽</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            value={minP}
            onChange={(e) => setMinP(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            placeholder={`от ${facets.price.min}`}
            className="field !px-3"
          />
          <span className="text-zinc-600">—</span>
          <input
            type="number"
            inputMode="numeric"
            value={maxP}
            onChange={(e) => setMaxP(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyPrice()}
            placeholder={`до ${formatPrice(facets.price.max).replace(" ₽", "")}`}
            className="field !px-3"
          />
        </div>
        <button onClick={applyPrice} className="btn-outline mt-3 w-full !py-2.5 text-xs">
          Применить
        </button>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Марка авто</p>
        <div className="space-y-5">
          {MAKE_GROUPS.map((group) => {
            const makes = group.makes.filter((m) => presentMakes.has(m));
            if (makes.length === 0) return null;
            return (
              <div key={group.label}>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-accent-600">
                  {group.label}
                </p>
                <ul className="space-y-1.5">
                  {makes.map((m) => (
                    <CheckRow
                      key={m}
                      checked={isChecked("make", m)}
                      onToggle={() => toggleMulti("make", m)}
                      label={MAKES[m] ?? m}
                      count={makeCount(m)}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Бренд запчасти</p>
        <ul className="space-y-1.5">
          {facets.brands.map((b) => (
            <CheckRow
              key={b.name}
              checked={isChecked("brand", b.name)}
              onToggle={() => toggleMulti("brand", b.name)}
              label={b.name}
              count={b.count}
            />
          ))}
        </ul>
      </div>

      {hasFilters && (
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:text-accent-600"
        >
          <RotateCcw size={13} /> Сбросить фильтры
        </button>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">{body}</div>
      </aside>

      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="fixed inset-x-5 bottom-5 z-30 flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#1f5bff,#3250d2,#0124c9)] px-6 py-4 text-sm font-extrabold text-white shadow-[0_16px_50px_-10px_rgba(50,80,210,0.65)]"
        >
          <SlidersHorizontal size={16} /> Фильтры и поиск
        </button>

        {open && (
          <div className="fixed inset-0 z-50 flex flex-col bg-carbon-950">
            <div className="flex items-center justify-between border-b border-ink/[0.07] px-5 py-4">
              <p className="font-display text-base font-bold">Фильтры</p>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-zinc-500"
                aria-label="Закрыть фильтры"
              >
                <X size={17} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{body}</div>
            <div className="border-t border-ink/[0.07] p-4">
              <button onClick={() => setOpen(false)} className="btn-accent w-full">
                Показать товары
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function buildHref(searchParams: URLSearchParams | ReturnType<typeof useSearchParams>, cat: string | null) {
  const params = new URLSearchParams(searchParams.toString());
  if (cat) params.set("cat", cat);
  else params.delete("cat");
  const qs = params.toString();
  return `/catalog${qs ? `?${qs}` : ""}`;
}

function Row({ children, onClick, active }: { children: ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
        active ? "bg-ink/[0.06] font-bold text-cream" : "text-zinc-500 hover:bg-ink/[0.03] hover:text-zinc-600"
      }`}
    >
      {children}
    </button>
  );
}

function CategoryRow({ href, active, label, count }: { href: string; active: boolean; label: string; count: number }) {
  return (
    <li>
      <Link
        href={href}
        scroll={false}
        className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
          active ? "bg-ink/[0.06] font-bold text-cream" : "text-zinc-500 hover:bg-ink/[0.03] hover:text-zinc-600"
        }`}
      >
        <span>{label}</span>
        <span className="text-[11px] font-semibold text-zinc-600">{count}</span>
      </Link>
    </li>
  );
}

function CheckRow({
  checked,
  onToggle,
  label,
  count,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  count: number;
}) {
  return (
    <li>
      <Row onClick={onToggle} active={checked}>
        <span className="flex items-center gap-2.5">
          <span
            className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-[5px] border transition ${
              checked ? "border-accent-500 bg-accent-500" : "border-ink/20"
            }`}
          >
            {checked && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          {label}
        </span>
        <span className="text-[11px] font-semibold text-zinc-600">{count}</span>
      </Row>
    </li>
  );
}
