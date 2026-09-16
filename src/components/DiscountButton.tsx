"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { DiscountModal } from "./DiscountModal";

export function DiscountButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0076be] py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-blue-700 shadow-sm shadow-blue-900/10"
      >
        <Calculator size={14} /> Узнать цену
      </button>
      <DiscountModal isOpen={isOpen} onClose={() => setIsOpen(false)} type="service" />
    </>
  );
}
