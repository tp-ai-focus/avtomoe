import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — АвтоМоё",
  description: "Политика в отношении обработки персональных данных сети АвтоМоё.",
};

export default function PrivacyPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
        Политика конфиденциальности
      </h1>
      <p className="mt-2 text-sm text-zinc-500">Последнее обновление: 2026 год</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900">1. Общие положения</h2>
          <p className="mt-2">
            Настоящая Политика обработки персональных данных определяет порядок сбора, хранения и защиты
            информации о пользователях сайта «АвтоМоё» в соответствии с Федеральным законом РФ № 152-ФЗ «О персональных данных».
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">2. Собираемые данные</h2>
          <p className="mt-2">
            Мы собираем данные, которые вы предоставляете при заполнении форм на сайте: имя, номер телефона,
            VIN-код или номер кузова автомобиля, а также технические данные (cookies, IP-адрес) для корректной работы сервиса.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">3. Цели обработки</h2>
          <p className="mt-2">
            Данные используются исключительно для обратной связи с клиентом, точного подбора автозапчастей по VIN,
            оформления и доставки заказов, записи на услуги сервисного центра и информирования о статусе обращения.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900">4. Защита информации</h2>
          <p className="mt-2">
            Мы принимаем необходимые организационные и технические меры для защиты ваших персональных данных от
            несанкционированного доступа, изменения, раскрытия или уничтожения.
          </p>
        </section>
      </div>
    </main>
  );
}
