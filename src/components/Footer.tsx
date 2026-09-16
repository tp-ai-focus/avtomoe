import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import { MAX_BOT_URL, TELEGRAM_URL, VK_GROUP_URL, MAX_CHAT_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer id="contacts" className="relative mt-20 overflow-hidden bg-gradient-to-r from-[#0094e0] to-[#004b7a] text-white">
      <div className="wrap grid grid-cols-1 gap-10 py-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        {/* Колонка 1: ПОКУПАТЕЛЯМ */}
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-white/50">
            Покупателям
          </h3>
          <ul className="mt-6 space-y-4 text-sm sm:text-[15px]">
            <li>
              <Link href="/payment" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Оплата
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Доставка
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Возврат
              </Link>
            </li>
            <li>
              <Link href="/installment" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Рассрочка
              </Link>
            </li>
            <li>
              <Link href="/loyalty" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Программа лояльности
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка 2: О КОМПАНИИ */}
        <div>
          <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-white/50">
            О компании
          </h3>
          <ul className="mt-6 space-y-4 text-sm sm:text-[15px]">
            <li>
              <Link href="/contacts" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Контакты
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                О нас
              </Link>
            </li>
            <li>
              <Link href="/vacancies" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Вакансии
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Отзывы
              </Link>
            </li>
            <li>
              <a
                href={VK_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all"
              >
                Группа ВКонтакте
              </a>
            </li>
            <li>
              <a
                href={MAX_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all"
              >
                Канал в MAX
              </a>
            </li>
            <li>
              <Link href="/legal" className="text-white/85 hover:text-white hover:underline underline-offset-4 transition-all">
                Юридические документы
              </Link>
            </li>
          </ul>
        </div>

        {/* Колонка 3: ЧАТ-БОТ И АКТИВНЫЕ КНОПКИ */}
        <div className="flex flex-col items-start justify-start">
          <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-white/50">
            ОНЛАЙН-ПОМОЩНИК
          </h3>
          <p className="mt-6 font-display text-lg sm:text-xl leading-snug text-white">
            <span className="font-black text-yellow-400">Чат-бот</span> уже греет мотор, <br className="hidden sm:inline" />
            чтобы помочь вам!
          </p>
          <p className="mt-3 text-sm sm:text-[15px] text-white/70">
            Задайте вопрос — он ответит
          </p>

          <div className="mt-6 flex flex-col gap-3 w-full sm:w-auto">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-bold tracking-wide text-slate-900 shadow-sm transition-all hover:bg-slate-100 hover:text-[#0076be] active:scale-[0.98]"
            >
              <Send size={16} />
              <span>Бот в Telegram</span>
            </a>
            <a
              href={MAX_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-bold tracking-wide text-slate-900 shadow-sm transition-all hover:bg-slate-100 hover:text-[#7c3aed] active:scale-[0.98]"
            >
              <MessageCircle size={16} />
              <span>Бот в MAX</span>
            </a>
          </div>
        </div>
      </div>

      {/* Нижняя информационная полоса */}
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-8 text-[13px] text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} ГК «АвтоМоё», Екатеринбург.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <span className="hidden sm:inline text-white/20">·</span>
            <Link href="/legal/terms" className="hover:text-white transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
          
          <p>Цены не являются офертой.</p>
        </div>
      </div>
    </footer>
  );
}
