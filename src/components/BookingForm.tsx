"use client";

import { CalendarCheck, ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { bookService } from "@/app/actions";

export function BookingForm({ services }: { services: { id: number; name: string }[] }) {
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await bookService({ name, phone, car, serviceId, message });
    setPending(false);
    if (!res.ok) {
      setError(res.error ?? "Не удалось записаться");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
        <CalendarCheck size={44} className="text-accent-400" />
        <p className="font-display text-xl font-bold">Вы записаны!</p>
        <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
          Сервис-менеджер перезвонит, подтвердит время и подготовит подъёмник.
        </p>
        <button onClick={() => setDone(false)} className="btn-outline mt-2 !py-2.5 text-xs">
          Записаться ещё раз
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="relative block">
        <select
          value={serviceId ?? ""}
          onChange={(e) => setServiceId(e.target.value ? Number(e.target.value) : null)}
          className="field w-full cursor-pointer appearance-none pr-10"
        >
          <option value="" className="bg-white">Услуга (необязательно)</option>
          {services.map((s) => (
            <option key={s.id} value={s.id} className="bg-white">
              {s.name}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" className="field" maxLength={60} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" type="tel" className="field" maxLength={24} />
      </div>
      <input value={car} onChange={(e) => setCar(e.target.value)} placeholder="Автомобиль: например, Toyota Camry 2018, 2.5" className="field" maxLength={160} />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Что беспокоит? Стук, вибрация, горит лампочка…" rows={3} className="field resize-none" maxLength={800} />
      {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
      <button type="submit" disabled={pending} className="btn-accent w-full disabled:opacity-60">
        {pending ? <Loader2 size={16} className="animate-spin" /> : <CalendarCheck size={16} />}
        Записаться на сервис
      </button>
      <p className="text-[11px] leading-relaxed text-zinc-500">
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
      </p>
    </form>
  );
}
