import { Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="grid h-24 w-24 place-items-center rounded-full border border-dashed border-ink/15 text-zinc-500">
        <Compass size={36} />
      </span>
      <p className="font-display text-6xl font-extrabold text-outline">404</p>
      <p className="max-w-md text-sm leading-relaxed text-zinc-500">
        Такой страницы нет — возможно, запчасть уже продана или ссылка устарела. Загляните в каталог: там более 30 000 позиций в наличии.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/catalog" className="btn-accent">В каталог</Link>
        <Link href="/" className="btn-outline">На главную</Link>
      </div>
    </div>
  );
}
