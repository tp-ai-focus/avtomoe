"use client";

import { Loader2, Send, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addReview } from "@/app/actions";

export function ReviewForm({ productId }: { productId: number }) {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);
    const res = await addReview({ productId, author, text, rating });
    setPending(false);
    if (!res.ok) {
      setError(res.error ?? "Не удалось отправить отзыв");
      return;
    }
    setDone(true);
    setAuthor("");
    setText("");
    setRating(5);
    router.refresh();
  };

  if (done) {
    return (
      <div className="card p-6 text-center">
        <p className="font-display text-base font-bold text-cream">Спасибо за отзыв!</p>
        <p className="mt-2 text-sm text-zinc-500">Он уже появился на странице товара.</p>
        <button onClick={() => setDone(false)} className="btn-outline mt-5 !py-2.5 text-xs">
          Оставить ещё один
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-4 p-6">
      <p className="font-display text-base font-bold">Оставить отзыв</p>

      <div>
        <p className="mb-2 text-xs font-semibold text-zinc-500">Ваша оценка</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((v) => (
            <button
              key={v}
              type="button"
              onMouseEnter={() => setHover(v)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(v)}
              className="transition active:scale-90"
              aria-label={`Оценка ${v}`}
            >
              <Star
                size={22}
                strokeWidth={0}
                fill="currentColor"
                className={(hover || rating) >= v ? "text-star" : "text-ink/10"}
              />
            </button>
          ))}
        </div>
      </div>

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Имя"
        className="field"
        maxLength={60}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Расскажите о качестве запчасти, упаковке и скорости выдачи…"
        rows={4}
        className="field resize-none"
        maxLength={1200}
      />

      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

      <button type="submit" disabled={pending} className="btn-accent w-full disabled:opacity-60">
        {pending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
        Отправить отзыв
      </button>
    </form>
  );
}
