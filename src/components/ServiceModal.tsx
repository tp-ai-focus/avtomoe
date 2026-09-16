"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Phone, PhoneCall, Car, Wrench, Loader2, Send, MessageCircle } from "lucide-react";
import {
  MAX_SERVICE_CHAT_URL,
  TELEGRAM_URL,
  SERVICE_PHONE_DISPLAY,
  SERVICE_PHONE_HREF,
} from "@/lib/constants";
import { PhoneCallButton } from "@/components/PhoneCallButton";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ServiceModal({ isOpen, onClose, title = "Заявка на сервис — скидка 15%" }: ServiceModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [description, setDescription] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
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

  const inputClass = "w-full rounded-xl border-none bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 20, 50, 0.82)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-lg overflow-y-auto rounded-[28px] border border-white/20 bg-gradient-to-b from-[#0076be] to-[#005a92] p-6 sm:p-8 shadow-2xl shadow-black/60"
        style={{ maxHeight: "95vh" }}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        {done ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="mb-4 rounded-full bg-emerald-500/20 p-4">
              <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Заявка отправлена!</h3>
            <p className="mt-2 text-sm text-white/70">
              Мы свяжемся с вами в течение 15 минут для уточнения деталей.
            </p>
            <button
              onClick={() => {
                setDone(false);
                onClose();
              }}
              className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3">
            {/* Title */}
            <h2 className="mb-1 pr-6 font-display text-xl font-bold text-white sm:text-2xl">
              {title}
            </h2>

            {/* Phone + Name */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ваш телефон"
                required
                className={inputClass}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя, Фамилия"
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Укажите email"
              className={inputClass}
            />

            {/* Car info */}
            <input
              type="text"
              value={carInfo}
              onChange={(e) => setCarInfo(e.target.value)}
              placeholder="Марка авто, год или VIN"
              className={inputClass}
            />

            {/* Description */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишите, что нужно сделать (или нужные запчасти)"
              required
              rows={2}
              className={`${inputClass} resize-none`}
            />

            {error && <p className="text-xs font-semibold text-white">{error}</p>}

            {/* Main submit - яркая красная кнопка */}
            <button
              type="submit"
              disabled={pending || !agreed}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-red-500 py-3.5 text-[14px] sm:text-[15px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red-900/30 transition-all hover:bg-red-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
            >
              {pending ? <Loader2 size={18} className="mr-2 animate-spin text-white" /> : null}
              Отправить заявку
            </button>

            {/* Dividers & Bots */}
            <div className="flex items-center gap-3 my-2.5">
              <div className="h-px flex-1 bg-white/20"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">или через мессенджеры</span>
              <div className="h-px flex-1 bg-white/20"></div>
            </div>

            {/* Яркие фирменные кнопки с иконками */}
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
                href={MAX_SERVICE_CHAT_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#7c3aed] py-2.5 text-xs font-bold text-white shadow-md shadow-purple-900/25 transition hover:brightness-110 hover:scale-[1.02]"
                title="Написать в MAX сервисного центра"
              >
                <MessageCircle size={15} className="text-white shrink-0" />
                <span className="text-[11px] font-bold">MAX-чат</span>
              </a>

              <PhoneCallButton
                phoneDisplay={SERVICE_PHONE_DISPLAY}
                phoneHref={SERVICE_PHONE_HREF}
                title="Позвонить мастеру"
                subtitle="Сервисный центр «АвтоМоё»"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#f59e0b] py-2.5 text-xs font-bold text-white shadow-md shadow-amber-900/25 transition hover:brightness-110 hover:scale-[1.02] cursor-pointer"
              >
                <Phone size={14} className="text-white shrink-0" />
                <span className="text-[11px] font-bold">Звонок</span>
              </PhoneCallButton>
            </div>

            {/* Checkbox */}
            <div className="mt-1.5 flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-none bg-white text-[#0076be] focus:ring-0 focus:ring-offset-0"
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
