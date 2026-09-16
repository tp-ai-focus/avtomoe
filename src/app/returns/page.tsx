import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RotateCcw, CheckCircle2, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Возврат и обмен — АвтоМоё",
  description: "Правила и условия возврата и обмена автозапчастей в сети АвтоМоё.",
};

export default function ReturnsPage() {
  return (
    <main className="wrap py-12 md:py-20 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0076be] hover:underline mb-8">
        <ArrowLeft size={16} /> На главную
      </Link>
      <div className="flex items-center gap-3 mb-12">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0076be]/10 text-[#0076be]">
          <RotateCcw size={20} />
        </span>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Возврат и обмен
        </h1>
      </div>
      
      <div className="space-y-16 text-base leading-relaxed text-zinc-700 max-w-3xl">
        
        {/* Вступление */}
        <p className="text-lg text-slate-800">
          Наша цель — чтобы вы остались довольны покупкой. Если что-то пошло не так, мы поможем оформить возврат или обмен максимально просто и быстро.
        </p>

        {/* Блок 1: Если обнаружен брак */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Если обнаружен брак</h2>
          
          <div className="space-y-8">
            <div className="border-l-2 border-slate-200 pl-5">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Товар не устанавливался</h3>
              <p className="mb-2 text-sm text-zinc-500">Понадобится:</p>
              <ul className="list-none space-y-1.5 text-zinc-700">
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> акт дефектовки из сервиса (с датой, пробегом, VIN и сутью дефекта);</li>
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> сертификат сервиса на право проведения таких работ.</li>
              </ul>
            </div>

            <div className="border-l-2 border-slate-200 pl-5">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Устанавливался в стороннем сервисе</h3>
              <p className="mb-2 text-sm text-zinc-500">Понадобится:</p>
              <ul className="list-none space-y-1.5 text-zinc-700">
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> заказ-наряд на установку (с датой, пробегом, VIN);</li>
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> акт дефектовки с описанием неисправности;</li>
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> сертификат сервиса.</li>
              </ul>
            </div>

            <div className="border-l-2 border-[#0076be] pl-5 bg-gradient-to-r from-[#0076be]/5 to-transparent py-2">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Устанавливался в сервисе «АВТОМОЁ»</h3>
              <p className="mb-2 text-sm text-zinc-500">Всё проще. Подготовьте только:</p>
              <ul className="list-none space-y-1.5 text-zinc-700">
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> акт дефектовки;</li>
                <li className="flex items-start gap-2"><span className="text-[#0076be] mt-0.5">—</span> сертификат сервиса.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Блок 2: Возврат просто так */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Если деталь не понадобилась</h2>
          <p className="mb-4">
            Вы можете вернуть товар <strong className="font-semibold text-slate-900">в течение 7 дней</strong> после покупки, при соблюдении простых условий:
          </p>
          <ul className="list-none space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#0076be] mt-0.5 shrink-0" />
              <span>Деталь не использовалась и не устанавливалась;</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#0076be] mt-0.5 shrink-0" />
              <span>Сохранены товарный вид, заводская упаковка, комплектность и наши фирменные стикеры;</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-[#0076be] mt-0.5 shrink-0" />
              <span>Есть документ, подтверждающий покупку у нас.</span>
            </li>
          </ul>
          <p className="text-sm text-zinc-500 italic">
            Если вы потеряли чек — ничего страшного. Можно приложить другие доказательства покупки в нашей сети. Мы рассматриваем претензии в течение 10 рабочих дней.
          </p>
        </section>

        {/* Блок 3: Позже 14 дней */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Возврат спустя 14 дней</h2>
          <p className="mb-4">
            Это возможно. Мы идем навстречу и рассматриваем такие случаи, если деталь не устанавливалась, упаковка цела, и это не сложное техническое изделие.
          </p>
          <p className="text-sm text-zinc-500 italic">
            * Для деталей, которые можно проверить без установки, потребуется акт диагностики, подтверждающий исправность.
          </p>
        </section>

        {/* Через интернет */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Покупки в интернет-магазине</h2>
          <p className="mb-4">
            Для онлайн-заказов действуют те же <strong className="font-semibold text-slate-900">7 дней на возврат</strong> без объяснения причин (ст. 26.1 ЗоЗПП).
          </p>
          <p className="text-sm text-zinc-500 italic">
            В случае брака правила аналогичны покупкам в физическом магазине (потребуется акт дефектовки).
          </p>
        </section>

        {/* Документы */}
        <section className="pt-8 border-t border-slate-100 mt-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Документы для скачивания</h2>
          <a
            href="/Документы/Заявление_на_возврат_денежных_средств.docx"
            download
            className="inline-flex items-center gap-4 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:border-[#0076be] hover:shadow-sm transition-all group w-fit"
          >
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-50 text-slate-400 group-hover:bg-[#0076be]/10 group-hover:text-[#0076be] transition-colors">
              <Download size={20} />
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 group-hover:text-[#0076be] transition-colors">Шаблон заявления на возврат</span>
              <span className="text-xs text-zinc-500">Скачать документ (Word)</span>
            </div>
          </a>
        </section>

      </div>
    </main>
  );
}
