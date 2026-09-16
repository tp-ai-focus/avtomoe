"use client";

import { useState } from "react";
import { BadgePercent, CheckCircle2 } from "lucide-react";
import { DiscountModal } from "./DiscountModal";

interface PromoButtonProps {
  id: number;
  text: string;
}

export function PromoButton({ id, text }: PromoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0076be] px-2 py-3 text-[9px] font-bold uppercase text-white shadow-sm shadow-blue-900/10 transition hover:bg-blue-700"
      >
        {id === 1 ? <BadgePercent size={13} className="shrink-0" /> : <CheckCircle2 size={13} className="shrink-0" />}
        <span className="whitespace-nowrap tracking-tight xl:tracking-normal">{text}</span>
      </button>
      <DiscountModal isOpen={isOpen} onClose={() => setIsOpen(false)} type="service" />
    </>
  );
}
