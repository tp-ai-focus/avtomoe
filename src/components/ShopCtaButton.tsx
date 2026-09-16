"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ServiceModal } from "./ServiceModal";

interface ShopCtaButtonProps {
  className?: string;
}

export function ShopCtaButton({ className }: ShopCtaButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className || "btn relative mt-8 inline-flex items-center gap-2 bg-white px-7 py-4 text-accent-700 shadow-xl transition-all hover:scale-105 hover:bg-slate-50 hover:shadow-2xl"}
      >
        <span>Отправить заявку</span>
        <ArrowRight size={18} />
      </button>

      <ServiceModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Заявка на запчасти и ремонт — Шефская, 4б"
      />
    </>
  );
}
