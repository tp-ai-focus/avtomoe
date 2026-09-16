"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Phone, Mail, Car, Package, Send, MessageCircle } from "lucide-react";
import { MAX_BOT_URL, MAX_SERVICE_CHAT_URL, TELEGRAM_URL, PHONE_DISPLAY, PHONE_HREF, SERVICE_PHONE_DISPLAY, SERVICE_PHONE_HREF } from "@/lib/constants";
import { PhoneCallButton } from "@/components/PhoneCallButton";

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "parts" | "service";
}

export function DiscountModal({ isOpen, onClose, type }: DiscountModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [description, setDescription] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const title = type === "parts" ? "Получить скидку на запчасти" : "Получить скидку на ремонт";
  const textareaPlaceholder = type === "parts" ? "Нужные запчасти" : "Опишите, что нужно сделать";

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    if (!agreed) return; 
    setSubmitted(true); 
  };

  const handleOverlayClick = (e: React.MouseEvent) => { 
    if (e.target === overlayRef.current) onClose(); 
  };

  const inputStyle = { background: "#ffffff", border: "1px solid #e2e8f0", color: "#1a2744" };
  const inputClass = "w-full rounded-xl py-3 text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400 text-slate-800";

  const modalContent = (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-[28px] shadow-2xl border border-white/20"
        style={{ 
          background: "linear-gradient(160deg, #0b3268 0%, #0e4590 100%)",
          maxHeight: "calc(100vh - 2rem)"
        }}
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 z-20 rounded-full p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white" 
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-7 overflow-y-auto max-h-[calc(100vh-2.5rem)]">
          {submitted ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Заявка отправлена!</h3>
              <p className="mt-2 text-sm text-white/70">Мы свяжемся с вами в ближайшее время</p>
              <button 
                onClick={onClose} 
                className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              {/* Заголовок с акцентом на 15% */}
              <div className="mb-5 pr-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {title}{" "}
                  <span className="font-bold text-white">15%</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">

                {/* Телефон + Имя */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ваш телефон" 
                      required 
                      className={`${inputClass} pl-9 pr-3`} 
                      style={inputStyle} 
                    />
                  </div>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя, Фамилия" 
                    required 
                    className={`${inputClass} px-3`} 
                    style={inputStyle} 
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Укажите email" 
                    className={`${inputClass} pl-9 pr-3`} 
                    style={inputStyle} 
                  />
                </div>

                {/* Марка авто */}
                <div className="relative">
                  <Car size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={carInfo}
                    onChange={(e) => setCarInfo(e.target.value)}
                    placeholder="Марка авто, год или VIN" 
                    className={`${inputClass} pl-9 pr-3`} 
                    style={inputStyle} 
                  />
                </div>

                {/* Запчасти / описание */}
                <div className="relative">
                  <Package size={14} className="absolute left-3 top-3.5 text-slate-400" />
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={textareaPlaceholder} 
                    rows={3} 
                    className={`${inputClass} resize-none pl-9 pr-3`} 
                    style={inputStyle} 
                  />
                </div>

                {/* Разделитель */}
                <div className="my-1 h-px bg-white/10" />

                {/* Бордовая кнопка Узнать стоимость */}
                <button
                  type="submit"
                  disabled={!agreed}
                  className="w-full rounded-xl py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition duration-200 disabled:opacity-50 hover:brightness-110 shadow-lg shadow-black/20"
                  style={{ background: "linear-gradient(135deg, #a63155 0%, #8b2241 100%)" }}
                >
                  Узнать стоимость
                </button>

                {/* Разделитель с текстом */}
                <div className="flex items-center gap-3 py-0.5">
                  <div className="h-px flex-1 bg-white/15" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">или заказать через бота</span>
                  <div className="h-px flex-1 bg-white/15" />
                </div>

                {/* Две кнопки ботов */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={type === "service" ? MAX_SERVICE_CHAT_URL : MAX_BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl py-3 text-[11px] font-bold uppercase tracking-wider text-white transition hover:brightness-110 shadow-md shadow-purple-900/20"
                    style={{ background: "#6B3AC2" }}
                  >
                    В МАХ-чате
                  </a>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl py-3 text-[11px] font-bold uppercase tracking-wider text-white transition hover:brightness-110 shadow-md shadow-sky-900/20"
                    style={{ background: "#29A8E0" }}
                  >
                    В Телеграм-боте
                  </a>
                </div>

                {/* Разделитель с текстом */}
                <div className="flex items-center gap-3 py-0.5">
                  <div className="h-px flex-1 bg-white/15" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">или напишите напрямую</span>
                  <div className="h-px flex-1 bg-white/15" />
                </div>

                {/* Три иконки мессенджеров */}
                <div className="grid grid-cols-3 gap-2.5">
                  {/* MAX */}
                  <a 
                    href={type === "service" ? MAX_SERVICE_CHAT_URL : MAX_BOT_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl py-3 transition hover:brightness-110 shadow-md"
                    style={{ background: "#6B3AC2" }} 
                    title="MAX"
                  >
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                      <path d="M14 2C7.373 2 2 7.149 2 13.5c0 2.37.72 4.573 1.956 6.4L2.5 25l5.317-1.383A12.14 12.14 0 0014 25c6.627 0 12-5.149 12-11.5S20.627 2 14 2z" fill="white" fillOpacity="0.9"/>
                      <circle cx="14" cy="13.5" r="3.5" fill="#6B3AC2"/>
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a 
                    href={TELEGRAM_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl py-3 transition hover:brightness-110 shadow-md"
                    style={{ background: "#29A8E0" }} 
                    title="Telegram"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21.5 4.5L2.5 11.5l6 2 2 6 3-4 5 4 3-15z" fill="white"/>
                    </svg>
                  </a>

                  {/* Позвонить */}
                  <PhoneCallButton
                    phoneDisplay={type === "service" ? SERVICE_PHONE_DISPLAY : PHONE_DISPLAY}
                    phoneHref={type === "service" ? SERVICE_PHONE_HREF : PHONE_HREF}
                    title="Позвонить по акции"
                    subtitle={type === "service" ? "Сервисный центр «АвтоМоё»" : "Магазин автозапчастей «АвтоМоё»"}
                    className="flex items-center justify-center rounded-xl py-3 transition hover:brightness-110 cursor-pointer shadow-md"
                    style={{ background: "#F5A623" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.01L6.6 10.8z"/>
                    </svg>
                  </PhoneCallButton>
                </div>

                {/* Согласие */}
                <label className="mt-1 flex cursor-pointer items-start gap-2.5 pb-1 select-none">
                  <div
                    onClick={() => setAgreed(!agreed)}
                    className="mt-0.5 flex h-4 w-4 flex-shrink-0 cursor-pointer items-center justify-center rounded transition"
                    style={{ borderWidth: "1px", borderStyle: "solid", borderColor: agreed ? "#38bdf8" : "rgba(255,255,255,0.25)", background: agreed ? "#38bdf8" : "transparent" }}
                  >
                    {agreed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] leading-relaxed text-white/50">
                    Я даю согласие на обработку персональных данных в соответствии с{" "}
                    <a href="/privacy" target="_blank" className="text-sky-300 underline hover:text-white">Политикой конфиденциальности</a>{" "}
                    и{" "}
                    <a href="/terms" target="_blank" className="text-sky-300 underline hover:text-white">Пользовательским соглашением</a>.
                  </span>
                </label>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}
