"use client";

import { useState } from "react";
import { Loader2, Send, MessageCircle, Phone, PhoneCall, Mail, Car, Package } from "lucide-react";
import Link from "next/link";
import { MAX_BOT_URL, TELEGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { PhoneCallButton } from "@/components/PhoneCallButton";

export function ShopHeroForm() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carInfo, setCarInfo] = useState("");
  const [parts, setParts] = useState("");
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
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center p-6">
        <div className="mb-4 rounded-full bg-emerald-500/20 p-4">
          <svg className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-white">Заявка отправлена!</h3>
        <p className="mt-2 text-sm text-white/70 max-w-xs">
          Мы свяжемся с вами в течение 15 минут, подберём нужные запчасти и назовём точную цену со скидкой.
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

  const inputClass = "w-full rounded-xl border-none bg-white py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400";

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      {/* Title with highlighted 15% */}
      <h2 className="mb-1 font-display text-xl font-bold text-white sm:text-2xl">
        Получить скидку на запчасти{" "}
        <span className="font-black text-amber-400">15%</span>
      </h2>

      {/* Phone + Name */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="relative">
          <PhoneCall size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
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

      {/* Car info */}
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

      {/* Parts description */}
      <div className="relative">
        <Package size={14} className="absolute left-3.5 top-3 text-slate-400" />
        <textarea
          value={parts}
          onChange={(e) => setParts(e.target.value)}
          placeholder="Нужные запчасти (например, колодки, фильтры, свечи)"
          rows={2}
          className={`${inputClass} resize-none pl-9 pr-3`}
        />
      </div>

      {error && <p className="text-xs font-semibold text-white">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending || !agreed}
        className="mt-1 flex w-full items-center justify-center rounded-xl bg-red-500 py-3.5 text-[14px] sm:text-[15px] font-extrabold uppercase tracking-wide text-white shadow-lg shadow-red-900/30 transition-all hover:bg-red-600 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? <Loader2 size={18} className="mr-2 animate-spin text-white" /> : null}
        Подобрать запчасти со скидкой 15%
      </button>

      {/* Alternative Contacts Divider */}
      <div className="flex items-center gap-3 my-2">
        <div className="h-px flex-1 bg-white/20"></div>
        <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">или через мессенджеры</span>
        <div className="h-px flex-1 bg-white/20"></div>
      </div>

      {/* Branded Instant Bot Buttons */}
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

      {/* Checkbox */}
      <div className="mt-1 flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-none bg-white text-[#0076be] focus:ring-0 focus:ring-offset-0"
        />
        <p className="text-[10px] leading-tight text-white/80">
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <Link href="/privacy" className="text-white font-bold hover:underline">
            Политикой конфиденциальности
          </Link>{" "}
          и{" "}
          <Link href="/terms" className="text-white font-bold hover:underline">
            Пользовательским соглашением
          </Link>.
        </p>
      </div>
    </form>
  );
}
