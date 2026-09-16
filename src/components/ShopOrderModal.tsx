"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Loader2, Send, MessageCircle, Phone, PhoneCall, Car, Package } from "lucide-react";
import { MAX_BOT_URL, TELEGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { PhoneCallButton } from "@/components/PhoneCallButton";

interface ShopOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export function ShopOrderModal({ isOpen, onClose, categoryName }: ShopOrderModalProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [parts, setParts] = useState(categoryName ? `Категория: ${categoryName}` : "");
  const [agreed, setAgreed] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryName) {
      setParts(`Категория: ${categoryName}`);
    }
  }, [categoryName]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError("Необходимо согласие на обработку персональных данных");
      return;
    }
    setPending(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPending(false);
    setDone(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const inputClass =
    "w-full rounded-xl border-none bg-white py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400 shadow-sm";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-lg rounded-[28px] border border-white/20 bg-gradient-to-b from-[#0076be] to-[#005a92] p-6 sm:p-8 text-white shadow-2xl shadow-black/60 backdrop-blur-xl">
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
        >
          <X size={18} />
        </button>

        {done ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-emerald-500/20 p-4 text-emerald-400">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Заявка отправлена!</h3>
            <p className="mt-2 text-sm text-white/80 max-w-xs">
              Мы свяжемся с вами в течение 15 минут, подберём нужные запчасти и назовём точную цену со скидкой 15%.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-white/90"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3.5">
            {/* Title */}
            <h2 className="pr-6 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
              Получить скидку на запчасти{" "}
              <span className="font-black text-amber-400">15%</span>
            </h2>

            {/* Phone + Name */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div className="relative">
                <PhoneCall size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ваш телефон"
                  required
                  className={`${inputClass} pl-10 pr-3`}
                />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя, Фамилия"
                required
                className={`${inputClass} px-3.5`}
              />
            </div>

            {/* Car info */}
            <div className="relative">
              <Car size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={carInfo}
                onChange={(e) => setCarInfo(e.target.value)}
                placeholder="Марка авто, год или VIN"
                className={`${inputClass} pl-10 pr-3`}
              />
            </div>

            {/* Parts */}
            <div className="relative">
              <Package size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
              <textarea
                value={parts}
                onChange={(e) => setParts(e.target.value)}
                placeholder="Нужные запчасти (например, колодки, фильтры, свечи)"
                rows={2}
                className={`${inputClass} resize-none pl-10 pr-3`}
              />
            </div>

            {error && <p className="text-xs font-semibold text-white">{error}</p>}

            {/* Main red CTA button */}
            <button
              type="submit"
              disabled={pending || !agreed}
              className="mt-1 flex w-full items-center justify-center rounded-xl bg-red-500 py-3.5 text-[14px] sm:text-[15px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red-900/30 transition-all hover:bg-red-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
            >
              {pending ? <Loader2 size={18} className="mr-2 animate-spin text-white" /> : null}
              Подобрать запчасти со скидкой 15%
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="h-px flex-1 bg-white/20"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                или через мессенджеры
              </span>
              <div className="h-px flex-1 bg-white/20"></div>
            </div>

            {/* Branded Messenger buttons */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#29A8E0] py-2.5 text-xs font-bold text-white shadow-md shadow-[#29A8E0]/25 transition hover:brightness-110 hover:scale-[1.02]"
                title="Заказать в Telegram"
              >
                <Send size={15} className="text-white shrink-0" />
                <span className="text-[11px] font-bold">Telegram</span>
              </a>

              <a
                href={MAX_BOT_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#7c3aed] py-2.5 text-xs font-bold text-white shadow-md shadow-purple-900/25 transition hover:brightness-110 hover:scale-[1.02]"
                title="Заказать в MAX-боте"
              >
                <MessageCircle size={15} className="text-white shrink-0" />
                <span className="text-[11px] font-bold">MAX-бот</span>
              </a>

              <PhoneCallButton
                phoneDisplay={PHONE_DISPLAY}
                phoneHref={PHONE_HREF}
                title="Позвонить в магазин автозапчастей"
                subtitle="Единая справочная служба «АвтоМоё»"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#f59e0b] py-2.5 text-xs font-bold text-white shadow-md shadow-amber-900/25 transition hover:brightness-110 hover:scale-[1.02] cursor-pointer"
              >
                <Phone size={14} className="text-white shrink-0" />
                <span className="text-[11px] font-bold">Звонок</span>
              </PhoneCallButton>
            </div>

            {/* Agreement Checkbox */}
            <div className="mt-1 flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-none bg-white text-[#0076be] focus:ring-0"
              />
              <p className="text-[10px] leading-tight text-white/80">
                Я даю согласие на обработку персональных данных в соответствии с{" "}
                <Link href="/legal/privacy" className="text-white font-bold hover:underline">
                  Политикой конфиденциальности
                </Link>{" "}
                и{" "}
                <Link href="/legal/terms" className="text-white font-bold hover:underline">
                  Пользовательским соглашением
                </Link>.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
