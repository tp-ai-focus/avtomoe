import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Юридические документы — АвтоМоё",
  description: "Юридическая информация, политика конфиденциальности, пользовательское соглашение и оферта компании АвтоМоё.",
};

export default function LegalPage() {
  return (
    <div className="bg-white text-slate-800">
      {/* Шапка раздела с хлебными крошками */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-6">
        <div className="wrap max-w-4xl">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 md:text-4xl">
            Юридические документы
          </h1>
          <nav className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0076be] transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-slate-700">Документы</span>
          </nav>
        </div>
      </div>

      <main className="wrap max-w-4xl py-10 md:py-14">
        <article className="space-y-6 text-base sm:text-[17px] leading-relaxed text-slate-700">
          <p className="mb-6">
            На этой странице собраны официальные документы, регулирующие правила использования сайта, обработку персональных данных и условия покупки товаров.
          </p>

          <ul className="space-y-6 list-none p-0 mt-8">
            <li>
              <Link href="/legal/privacy" className="font-semibold text-[#0076be] hover:underline underline-offset-4 text-lg">
                Политика конфиденциальности
              </Link>
              <p className="text-sm text-slate-500 mt-1">Правила обработки персональных данных</p>
            </li>
            <li>
              <Link href="/legal/terms" className="font-semibold text-[#0076be] hover:underline underline-offset-4 text-lg">
                Пользовательское соглашение
              </Link>
              <p className="text-sm text-slate-500 mt-1">Условия использования сайта и сервисов</p>
            </li>
            <li>
              <Link href="/legal/oferta" className="font-semibold text-[#0076be] hover:underline underline-offset-4 text-lg">
                Публичная оферта
              </Link>
              <p className="text-sm text-slate-500 mt-1">Договор купли-продажи товаров</p>
            </li>
          </ul>
        </article>
      </main>
    </div>
  );
}
