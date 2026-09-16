import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О нас — «Авто моё»",
  description: "О компании «Авто-Японец» и «Авто-Европеец» — запчасти, сервис и помощь 24/7 в Екатеринбурге и Берёзовском.",
};

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-800">
      {/* Шапка раздела с хлебными крошками */}
      <div className="border-b border-slate-100 bg-slate-50/60 py-6">
        <div className="wrap max-w-4xl">
          <h1 className="font-display text-3xl font-extrabold text-slate-900 md:text-4xl">
            О нас
          </h1>
          <nav className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#0076be] transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span className="text-slate-700">О нас</span>
          </nav>
        </div>
      </div>

      {/* Основной контент страницы */}
      <main className="wrap max-w-4xl py-10 md:py-14">
        <article className="space-y-5 text-base sm:text-[17px] leading-relaxed text-slate-700">
          <p>
            Привет! Мы — «Авто-Японец» и «Авто-Европеец» — надёжные помощники в мире автозапчастей и обслуживания автомобилей.
          </p>

          <p>
            Уже 15 лет работаем в Екатеринбурге и Берёзовском и знаем, как важно быстро найти нужную деталь, получить квалифицированную помощь и решить вопрос с автомобилем без лишней головной боли.
          </p>

          <p>
            Наша история началась в Перми в 2009 году. Сегодня мы — часть международной группы{" "}
            <strong className="text-slate-900 font-bold">АвтоМоё</strong>, представлены в 43 регионах и объединяем более{" "}
            <strong className="text-slate-900 font-bold">128 магазинов</strong> по всей России. Нам доверяют тысячи автолюбителей по всей стране.
          </p>

          <p>
            На собственном складе у нас более <strong className="text-slate-900 font-bold">35 000</strong> запчастей в наличии. А ещё мы выпускаем надёжные запчасти под собственным брендом{" "}
            <strong className="text-slate-900 font-bold">AVTOMOE</strong>, контролируя качество на каждом этапе производства.
          </p>

          <p>
            Мы не только продаём запчасти, но и помогаем с их установкой и обслуживанием автомобиля — у нас есть собственный сервисный центр. А благодаря работе 24/7 мы готовы помочь тогда, когда это действительно нужно.
          </p>

          <p>
            Для удобного заказа запчастей и записи в сервисный центр у нас работают чат-боты в{" "}
            <a
              href="https://max.ru/id592010055363_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#7c3aed] underline hover:no-underline"
            >
              MAX
            </a>{" "}
            и{" "}
            <a
              href="https://t.me/amoe96_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#0076be] underline hover:no-underline"
            >
              Telegram
            </a>
            . Через них можно быстро связаться с нами, оформить заказ или записаться на обслуживание.
          </p>

          <p>
            Мы стараемся сделать всё, чтобы обслуживание автомобиля было простым, понятным и удобным: от подбора нужной запчасти до её установки.
          </p>

          <p className="font-semibold text-slate-900 pt-2">
            «Авто-Японец» и «Авто-Европеец» — запчасти, сервис и помощь 24/7.
          </p>
        </article>

        {/* Реквизиты */}
        <div className="mt-10 border-t border-slate-200 pt-8">
          <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl mb-4">
            Реквизиты
          </h2>

          <div className="space-y-1.5 text-sm sm:text-base leading-relaxed text-slate-700">
            <p className="font-semibold text-slate-900">ИП Семьянинова Екатерина Владимировна</p>
            <p>ИНН 592010055363 (выд. 30.09.2009)</p>
            <p>ОГРНИП 305592016100012 (выд. 10.06.2005)</p>
            <p>БИК 046577674</p>
            <p>р/с 40802810716540007217</p>
            <p>к/с 30101810500000000674</p>
            <p>Банк: Уральский банк ПАО Сбербанк</p>
            <p className="pt-2">
              <strong className="text-slate-900 font-semibold">Юр. адрес:</strong> 620016, Свердловская область, г. Екатеринбург, ул. Краснолесья, д. 10, кв. 270
            </p>
            <div className="pt-2">
              <strong className="text-slate-900 font-semibold">Факт. адреса:</strong>
              <ul className="mt-1 space-y-1 pl-1">
                <li>— 620000, г. Берёзовский, Берёзовский тракт, 4/1</li>
                <li>— 620000, г. Екатеринбург, ул. Уральская, 77</li>
                <li>— 620000, г. Екатеринбург, ул. В. Высоцкого, 45б</li>
              </ul>
            </div>
            <p className="pt-2">
              <strong className="text-slate-900 font-semibold">Тел.:</strong>{" "}
              <a href="tel:+73432068502" className="text-[#0076be] font-bold hover:underline">
                8 (343) 206-85-02
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
