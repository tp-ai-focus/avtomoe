import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Пользовательское соглашение — АвтоМоё",
  description: "Условия использования сайта и сервисов сети АвтоМоё.",
};

export default function TermsPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
        Пользовательское соглашение
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Последнее обновление: 2026 год</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900">1. Предмет соглашения</h2>
          <p className="mt-2">
            Настоящее Пользовательское соглашение регулирует отношения между сетью автомагазинов и автосервисов «АвтоМоё»
            и пользователем сайта при использовании сервисов поиска, подбора и заказа автозапчастей.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">2. Заказ и подбор по VIN</h2>
          <p className="mt-2">
            Отправка заявки на подбор по VIN не является публичной офертой. Информация о наличии, стоимости и сроках поставки
            запчастей уточняется менеджером и согласуется с клиентом перед оформлением заказа.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">3. Гарантии и возврат</h2>
          <p className="mt-2">
            На все реализуемые запчасти предоставляется гарантия производителя или сети «АвтоМоё». Возврат и обмен товара
            надлежащего качества осуществляется в соответствии с законодательством РФ в течение 14 дней.
          </p>
        </section>
      </div>
    </main>
  );
}
