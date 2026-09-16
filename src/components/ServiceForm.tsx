"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Phone, Mail, Car, Package } from "lucide-react";
import {
  MAX_BOT_URL,
  MAX_SERVICE_CHAT_URL,
  TELEGRAM_URL,
  SERVICE_PHONE_DISPLAY,
  SERVICE_PHONE_HREF,
} from "@/lib/constants";
import { PhoneCallButton } from "@/components/PhoneCallButton";

export function ServiceForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [description, setDescription] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

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

  if (done) {
    return (
      <div className="flex h-full min-h-[440px] flex-col items-center justify-center text-center p-6">
        <div className="mb-4 rounded-full bg-emerald-500/20 p-4">
          <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-white">Заявка отправлена!</h3>
        <p className="mt-2 text-sm text-white/70 max-w-xs">
          Мы свяжемся с вами в течение 15 минут для уточнения деталей и расчёта стоимости со скидкой 15%.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-6 rounded-xl bg-white/10 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
        >
          Отправить ещё
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border-none bg-white py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400";

  return (
    <form onSubmit={submit} className="flex flex-col gap-2.5">
      {/* Заголовок с выделением 15% */}
      <h2 className="mb-1 font-display text-xl font-bold text-white sm:text-2xl leading-tight">
        Получить скидку на ремонт <span className="font-bold text-white">15%</span>
      </h2>

      {/* Телефон + Имя */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="relative">
          <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ваш телефон"
            required
            className={`${inputClass} pl-9 pr-3`}
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

      {/* Email */}
      <div className="relative">
        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Укажите email"
          className={`${inputClass} pl-9 pr-3`}
        />
      </div>

      {/* Марка авто, год или VIN */}
      <div className="relative">
        <Car size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={carInfo}
          onChange={(e) => setCarInfo(e.target.value)}
          placeholder="Марка авто, год или VIN"
          className={`${inputClass} pl-9 pr-3`}
        />
      </div>

      {/* Опишите, что нужно сделать */}
      <div className="relative">
        <Package size={14} className="absolute left-3.5 top-3 text-slate-400" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опишите, что нужно сделать"
          rows={2}
          className={`${inputClass} resize-none pl-9 pr-3`}
        />
      </div>

      {error && <p className="text-xs font-semibold text-white">{error}</p>}

      {/* Красная кнопка: УЗНАТЬ СТОИМОСТЬ */}
      <button
        type="submit"
        disabled={pending || !agreed}
        className="mt-1 flex w-full items-center justify-center rounded-xl bg-red-500 py-3.5 text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-900/30 transition-all hover:bg-red-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? <Loader2 size={18} className="mr-2 animate-spin text-white" /> : null}
        Узнать стоимость
      </button>

      {/* Разделитель 1: ИЛИ ЗАКАЗАТЬ ЧЕРЕЗ БОТА */}
      <div className="flex items-center gap-3 my-0.5">
        <div className="h-px flex-1 bg-white/20"></div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
          или заказать через бота
        </span>
        <div className="h-px flex-1 bg-white/20"></div>
      </div>

      {/* 2 кнопки ботов: В МАХ-боте и В Телеграм-боте */}
      <div className="grid grid-cols-2 gap-2">
        <a
          href={MAX_BOT_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-xl bg-[#7c3aed] py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-purple-900/25 transition hover:brightness-110 hover:scale-[1.02]"
        >
          В МАХ-боте
        </a>

        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-xl bg-[#29A8E0] py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-[#29A8E0]/25 transition hover:brightness-110 hover:scale-[1.02]"
        >
          В Телеграм-боте
        </a>
      </div>

      {/* Разделитель 2: ИЛИ НАПИШИТЕ НАПРЯМУЮ */}
      <div className="flex items-center gap-3 my-0.5">
        <div className="h-px flex-1 bg-white/20"></div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
          или напишите напрямую
        </span>
        <div className="h-px flex-1 bg-white/20"></div>
      </div>

      {/* 3 иконки: MAX (чат сервиса), Telegram, Звонок */}
      <div className="grid grid-cols-3 gap-2">
        {/* MAX чат сервиса 8 999 564 20 42 */}
        <a
          href={MAX_SERVICE_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-xl bg-[#7c3aed] py-2.5 text-white shadow-md shadow-purple-900/25 transition hover:brightness-110 hover:scale-[1.02]"
          title="Написать в MAX сервисного центра"
        >
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 2C7.373 2 2 7.149 2 13.5c0 2.37.72 4.573 1.956 6.4L2.5 25l5.317-1.383A12.14 12.14 0 0014 25c6.627 0 12-5.149 12-11.5S20.627 2 14 2z"
              fill="white"
              fillOpacity="0.9"
            />
            <circle cx="14" cy="13.5" r="3.5" fill="#7c3aed" />
          </svg>
        </a>

        {/* Telegram */}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-xl bg-[#29A8E0] py-2.5 text-white shadow-md shadow-[#29A8E0]/25 transition hover:brightness-110 hover:scale-[1.02]"
          title="Telegram"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21.5 2L2 10.5l7 2.5 2.5 7 3-4 5 4 2-18z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Звонок мастеру */}
        <PhoneCallButton
          phoneDisplay={SERVICE_PHONE_DISPLAY}
          phoneHref={SERVICE_PHONE_HREF}
          title="Позвонить мастеру"
          subtitle="Сервисный центр «АвтоМоё»"
          className="flex items-center justify-center rounded-xl bg-[#f59e0b] py-2.5 text-white shadow-md shadow-amber-900/25 transition hover:brightness-110 hover:scale-[1.02] cursor-pointer"
        >
          <Phone size={17} className="text-white" />
        </PhoneCallButton>
      </div>

      {/* Чекбокс согласия */}
      <div className="mt-1 flex items-start gap-2.5">
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
  );
}
