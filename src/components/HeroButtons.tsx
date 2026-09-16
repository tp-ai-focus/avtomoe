"use client";

import { useState } from "react";
import { BadgePercent, Wrench } from "lucide-react";
import { DiscountModal } from "@/components/DiscountModal";

export function HeroButtons() {
  const [modalType, setModalType] = useState<"parts" | "service" | null>(null);

  return (
    <>
      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-10">
        <button
          onClick={() => setModalType("parts")}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-[15px] font-bold tracking-wide text-slate-900 transition hover:-translate-y-1 hover:bg-slate-50 hover:shadow-lg sm:w-auto sm:min-w-[340px]"
        >
          <BadgePercent size={22} className="text-[#0076be]" />
          <span className="flex items-center gap-3">
            Получить скидку на запчасти
            <span className="text-2xl font-black text-[#0076be]">15%</span>
          </span>
        </button>
        <button
          onClick={() => setModalType("service")}
          className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#b91c1c] px-6 py-4 text-[15px] font-bold tracking-wide text-white transition hover:-translate-y-1 hover:bg-[#991b1b] hover:shadow-lg sm:w-auto sm:min-w-[340px]"
        >
          <Wrench size={22} className="text-white/80" />
          <span className="flex items-center gap-3">
            Получить скидку на ремонт
            <span className="text-2xl font-black text-white">15%</span>
          </span>
        </button>
      </div>

      <DiscountModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType ?? "parts"}
      />
    </>
  );
}
