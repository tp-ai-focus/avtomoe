import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowLeft, 
  Briefcase, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Users, 
  Award, 
  TrendingUp, 
  ShieldCheck 
} from "lucide-react";
import { 
  PHONE_DISPLAY, 
  PHONE_HREF, 
  MAX_CHAT_URL, 
  TELEGRAM_URL, 
  VK_GROUP_URL 
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Вакансии и работа в компании — «АвтоМоё» Екатеринбург",
  description: "Работа в автосервисе и магазинах запчастей АвтоМоё в Екатеринбурге. Открытые вакансии, достойная оплата труда, дружный коллектив.",
};

const vacancies = [
  {
    id: "mechanic",
    title: "Автомеханик / Автослесарь",
    location: "ул. Шефская, 4б (Автосервис)",
    salary: "от 90 000 до 160 000 ₽",
    type: "Полная занятость · Сменный график",
    description: "Техническое обслуживание и ремонт легковых автомобилей иностранного и отечественного производства (ходовка, ГРМ, ТО, замена агрегатов).",
    requirements: [
      "Опыт работы в автосервисе от 1 года",
      "Знание устройства современных автомобилей",
      "Аккуратность, ответственность и соблюдение стандартов чистоты на посту",
    ],
  },
  {
    id: "parts-manager",
    title: "Менеджер по подбору и продаже автозапчастей",
    location: "Шефская, 4б / Уральская, 77 / Высоцкого, 50 / Сахарова, 107/1",
    salary: "от 75 000 до 130 000 ₽",
    type: "Полная занятость · График 4/2 или 5/2",
    description: "Консультирование клиентов в торговом зале, подбор оригинальных запчастей и дубликатов по электронным каталогам (EPC, TecDoc), оформление продаж.",
    requirements: [
      "Опыт подбора автозапчастей по VIN-коду",
      "Грамотная речь и клиентоориентированность",
      "Желание развиваться и зарабатывать",
    ],
  },
  {
    id: "service-master",
    title: "Мастер-приёмщик сервисного центра",
    location: "ул. Шефская, 4б",
    salary: "от 85 000 до 140 000 ₽",
    type: "Полная занятость · График 2/2 или 3/3",
    description: "Приёмка автомобилей в ремонт, согласование перечня работ и запчастей с клиентом, распределение нагрузки по постам, выдача готового авто.",
    requirements: [
      "Опыт работы мастером-приёмщиком или мастером-консультантом от 1 года",
      "Отличное понимание технологий и нормативов ремонта",
      "Умение находить общий язык с автовладельцами",
    ],
  },
  {
    id: "storekeeper",
    title: "Кладовщик / Комплектовщик склада запчастей",
    location: "ул. Шефская, 4б (Центральный склад)",
    salary: "от 55 000 до 80 000 ₽",
    type: "Полная занятость · Сменный график",
    description: "Приёмка товара от поставщиков, размещение на складе по ячейкам, сборка и комплектация заказов для филиалов и клиентов.",
    requirements: [
      "Внимательность к деталям и ответственность",
      "Опыт работы со складским учетом (1С/WMS) приветствуется",
    ],
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Стабильный высокий доход",
    desc: "Своевременные выплаты 2 раза в месяц без задержек + понятная система премий и бонусов.",
  },
  {
    icon: ShieldCheck,
    title: "Официальное трудоустройство",
    desc: "Оформление по ТК РФ с первого дня, оплачиваемые отпуска и больничные.",
  },
  {
    icon: Award,
    title: "Скидки для сотрудников",
    desc: "Специальные цены на все автозапчасти и бесплатный сервис для личного автомобиля.",
  },
  {
    icon: Users,
    title: "Дружная команда и комфорт",
    desc: "Современный специнструмент, тёплые боксы, удобная спецодежда, комната отдыха и чай/кофе.",
  },
];

export default function VacanciesPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="wrap max-w-5xl space-y-12">
        
        {/* Хлебные крошки и заголовок */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0076be] hover:underline"
          >
            <ArrowLeft size={14} /> На главную
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0076be]/10 text-[#0076be]">
              <Briefcase size={24} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Карьера в «АвтоМоё»
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Вакансии компании
              </h1>
            </div>
          </div>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Мы постоянно растём и развиваемся в Екатеринбурге и Берёзовском. Ищем ответственных профессионалов и увлеченных людей, готовых расти вместе с нами.
          </p>
        </div>

        {/* Преимущества работы */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl mb-5">
            Почему выбирают работу у нас
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:shadow-md"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0076be]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-sm font-bold text-slate-900">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Список вакансий */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
              Открытые позиции
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {vacancies.length} активных вакансий
            </span>
          </div>

          <div className="space-y-4">
            {vacancies.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs transition hover:border-[#0076be]/40 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                      {v.location} · <span className="text-slate-700 font-semibold">{v.type}</span>
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-block rounded-xl bg-emerald-50 px-3.5 py-1.5 text-sm font-black text-emerald-700 border border-emerald-100">
                      {v.salary}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {v.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Что мы ждем от кандидата:
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    {v.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Контакты отдела кадров */}
        <section className="rounded-3xl bg-gradient-to-r from-[#0094e0] to-[#004b7a] p-8 sm:p-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Хотите работать в нашей команде?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
                Отправьте резюме или просто напишите нам в мессенджер / позвоните. Мы с удовольствием ответим на все вопросы и пригласим на собеседование!
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-md transition hover:bg-slate-100 hover:scale-[1.02]"
              >
                <Phone size={15} className="text-[#0076be]" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#29A8E0] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:brightness-110 hover:scale-[1.02]"
              >
                <Send size={15} />
                <span>Telegram</span>
              </a>
              <a
                href={MAX_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c3aed] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:brightness-110 hover:scale-[1.02]"
              >
                <MessageCircle size={15} />
                <span>MAX</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
