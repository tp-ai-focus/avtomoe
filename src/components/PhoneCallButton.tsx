"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Phone, Copy, Check, X } from "lucide-react";

interface PhoneCallButtonProps {
  phoneDisplay: string;
  phoneHref: string;
  title?: string;
  subtitle?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}

export function PhoneCallButton({
  phoneDisplay,
  phoneHref,
  title = "Позвонить по акции",
  subtitle = "Сервисный центр «АвтоМоё»",
  className,
  style,
  children,
}: PhoneCallButtonProps) {
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        typeof navigator !== "undefined" ? navigator.userAgent : ""
      ) ||
      (typeof window !== "undefined" && window.innerWidth < 768);

    if (!isMobile) {
      e.preventDefault();
      setIsDesktopModalOpen(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneDisplay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    if (!isDesktopModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDesktopModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDesktopModalOpen]);

  const modalContent = isDesktopModalOpen && mounted && (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-md"
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) setIsDesktopModalOpen(false);
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-[28px] border border-white/60 bg-white p-6 sm:p-7 shadow-2xl text-slate-900"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDesktopModalOpen(false);
          }}
          aria-label="Закрыть"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-slate-100/80 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
        >
          <X size={16} />
        </button>

        {/* Иконка и заголовок */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0076be] text-white shadow-lg shadow-[#0076be]/25">
            <Phone size={24} />
          </div>

          <h3 className="font-display text-xl font-bold text-slate-900">
            {title}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            {subtitle}
          </p>

          {/* Крупный номер телефона */}
          <div className="my-5 w-full rounded-2xl border border-slate-200/90 bg-white p-4 text-center">
            <p className="font-display text-2xl sm:text-[26px] font-black tracking-tight text-slate-900">
              {phoneDisplay}
            </p>
            <p className="mt-1.5 text-[11px] font-semibold text-emerald-600 flex items-center justify-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Работаем круглосуточно 24/7
            </p>
          </div>

          {/* Кнопка копирования */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              copied
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                : "bg-[#0076be] text-white shadow-md shadow-[#0076be]/25 hover:bg-[#005a92] active:scale-[0.99]"
            }`}
          >
            {copied ? (
              <>
                <Check size={16} />
                <span>Номер скопирован!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Скопировать номер</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <a
        href={phoneHref}
        onClick={handleClick}
        className={className}
        style={style}
        title={title}
      >
        {children}
      </a>

      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
