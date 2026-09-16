"use client";

import { ArrowRight, CheckCircle2, Loader2, ScanSearch } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { requestVin } from "@/app/actions";

export function VinForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vin, setVin] = useState("");
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
    const res = await requestVin({ name, phone, vin });
    setPending(false);
    if (!res.ok) {
      setError(res.error ?? "Не удалось отправить заявку");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-4 text-center sm:text-left">
        <CheckCircle2 size={36} className="text-[#0076be] shrink-0" />
        <div>
          <p className="font-display text-lg font-bold text-slate-900">Заявка принята!</p>
          <p className="text-xs text-zinc-600">
            Менеджер подберёт запчасти по VIN <span className="font-semibold text-slate-900">{vin.toUpperCase()}</span> и перезвонит в течение 15 минут.
          </p>
        </div>
        <button
          onClick={() => {
            setDone(false);
            setVin("");
          }}
          className="btn-outline sm:ml-4 !py-2 text-xs font-semibold"
        >
          Новая заявка
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя и фамилия"
            required
            className="field !rounded-xl !border-slate-300/80 !bg-white !py-3 shadow-xs transition-all focus:!border-[#0076be] focus:!ring-2 focus:!ring-[#0076be]/15"
            maxLength={60}
          />
        </div>

        <div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Номер телефона"
            type="tel"
            required
            className="field !rounded-xl !border-slate-300/80 !bg-white !py-3 shadow-xs transition-all focus:!border-[#0076be] focus:!ring-2 focus:!ring-[#0076be]/15"
            maxLength={24}
          />
        </div>

        <div className="relative">
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            placeholder="VIN или номер кузова"
            required
            className={`field !rounded-xl !border-slate-300/80 !bg-white !py-3 pr-9 shadow-xs transition-all focus:!border-[#0076be] focus:!ring-2 focus:!ring-[#0076be]/15 ${
              vin ? "font-mono uppercase tracking-wider" : ""
            }`}
            maxLength={32}
          />
          <ScanSearch size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        </div>

        <div>
          <button
            type="submit"
            disabled={pending || !agreed}
            className="group inline-flex w-full items-center justify-center gap-2 !rounded-xl !bg-[#0076be] hover:!bg-[#0062a0] active:scale-[0.99] !py-3 text-sm font-bold text-white shadow-md shadow-[#0076be]/20 hover:shadow-lg hover:shadow-[#0076be]/30 transition-all disabled:opacity-60 whitespace-nowrap"
          >
            {pending ? <Loader2 size={16} className="animate-spin" /> : null}
            <span>Подобрать запчасти</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

      <div className="pt-1">
        <label className="flex items-start gap-2 text-[11px] leading-tight text-slate-500 select-none cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-zinc-300 text-[#0076be] focus:ring-[#0076be]/20 accent-[#0076be]"
          />
          <span>
            Я даю согласие на обработку персональных данных в соответствии с{" "}
            <Link href="/privacy" className="underline hover:text-[#0076be] transition-colors">
              Политикой конфиденциальности
            </Link>{" "}
            и{" "}
            <Link href="/terms" className="underline hover:text-[#0076be] transition-colors">
              Пользовательским соглашением
            </Link>
          </span>
        </label>
      </div>
    </form>
  );
}
