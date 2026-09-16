"use client";

import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/constants";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get("sort") ?? "popular";

  return (
    <label className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          if (e.target.value === "popular") params.delete("sort");
          else params.set("sort", e.target.value);
          const qs = params.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        }}
        className="cursor-pointer appearance-none rounded-full border border-ink/10 bg-ink/[0.03] py-2.5 pl-4 pr-10 text-sm font-semibold text-zinc-600 outline-none transition hover:border-ink/20 focus:border-accent-400/60"
        aria-label="Сортировка"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value} className="bg-white text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3.5 text-zinc-500" />
    </label>
  );
}
