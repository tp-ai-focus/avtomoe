"use client";

import { useState } from "react";
import { ExternalLink, MapPin, MessageSquarePlus, Star } from "lucide-react";

export interface ReviewItem {
  author: string;
  date: string;
  rating: number;
  text: string;
}

export interface YandexBranch {
  id: string;
  name: string;
  shortName: string;
  address: string;
  note: string;
  orgId: string;
  rating: string;
  stats: string;
  mapsUrl: string;
  addReviewUrl: string;
  reviews: ReviewItem[];
}

export const YANDEX_BRANCHES: YandexBranch[] = [
  {
    id: "berezovsky",
    shortName: "г. Берёзовский",
    name: "Берёзовский тракт, 4/1",
    address: "г. Берёзовский, Берёзовский тракт, 4/1",
    note: "Магазин «Берёзовский привоз»",
    orgId: "132887448531",
    rating: "5,0",
    stats: "115 отзывов · 219 оценок на Яндекс Картах",
    mapsUrl: "https://yandex.ru/maps/org/avtomoyo/132887448531/reviews/",
    addReviewUrl: "https://yandex.ru/maps/org/avtomoyo/132887448531/reviews/?add-review",
    reviews: [
      {
        author: "Артемий Б.",
        date: "18 марта",
        rating: 5,
        text: "В прошлом году забегал из-за проблем с ГУР на рено каптюр, хоть магазин и не специализируется на французах, тем не менее, вышли глянули проблему, объяснили, что и где течет, подобрали жидкость и посоветовали куда обратиться. Сегодня забегал, специалист проконсультировал по маслу для коробки, помог подобрать. Персонал приветливый, чисто и аккуратно в магазине, подарили сертификат. Спасибо, Кириллу!",
      },
      {
        author: "Ольга Воронова",
        date: "8 мая",
        rating: 5,
        text: "Отличное обслуживание! Хочется отметить, что коллектив молодой, но ребята профессионалы своего дела. Искренне помогают, работают с душой. Отдельное спасибо Александру Новоселову — компетентен, работает быстро, принимает правильные решения! Отличный результат, рекомендую всем обращаться в этот магазин.",
      },
      {
        author: "Юлия Шубина",
        date: "29 октября",
        rating: 5,
        text: "Отличный магазин! Почти всегда всё в наличии на складе, либо под заказ, но сроки доставки короткие. Отдельное спасибо сотрудникам Глебу и Ивану — парни мастера своего дела, очень вежливые, тактичные, дают полную информацию по всем запчастям. Очень прошу премировать данных сотрудников за их профессионализм!",
      },
      {
        author: "Никита Агафонов",
        date: "8 апреля",
        rating: 5,
        text: "Отличный магазин, клиентоориентированность на высшем уровне! Нашли все необходимые запчасти по приятным ценам, за качественными деталями теперь только сюда.",
      },
    ],
  },
  {
    id: "sakharova",
    shortName: "Академический",
    name: "пр. Академика Сахарова, 107/1",
    address: "Екатеринбург, пр. Академика Сахарова, 107/1",
    note: "Магазин «Автояпонец и Автоевропеец»",
    orgId: "44636200790",
    rating: "5,0",
    stats: "79 отзывов · 82 оценки на Яндекс Картах",
    mapsUrl: "https://yandex.ru/maps/org/avtoyaponets_i_avtoyevropeyets/44636200790/reviews/",
    addReviewUrl: "https://yandex.ru/maps/org/avtoyaponets_i_avtoyevropeyets/44636200790/reviews/?add-review",
    reviews: [
      {
        author: "Александр У.",
        date: "22 марта",
        rating: 5,
        text: "Отличный магазин! Очень удобно, что открылся рядом с домом — теперь не нужно тратить время на поездки по городу. Порадовало, что все основные расходники есть в наличии, не приходится ждать или заказывать. Персонал вежливый, помогли быстро подобрать нужное. Буду обращаться ещё 👍",
      },
      {
        author: "Павел Гордеев",
        date: "19 марта",
        rating: 5,
        text: "Ну где ещё может повезти автовладельцу, как не в магазине у дома? Искал, где купить качественные запчасти для своей Toyota Camry, и обнаружил, что отличный «Автояпонец» находится прямо под боком. Здесь реально помогают — проверили совместимость, посоветовали проверенного производителя. Всё подошло идеально!",
      },
      {
        author: "Алсу К.",
        date: "25 июня",
        rating: 5,
        text: "Магазин нам очень нравится, покупаем всегда оригинальные масла, запчасти, всегда подскажут и объяснят, что и как сделать. Очень приятные консультанты, уютная зона ожидания с чаем и кофе.",
      },
      {
        author: "Игорь Жук",
        date: "6 мая",
        rating: 5,
        text: "Отличный персонал, приветливый и доброжелательный, помогут с выбором товаров, подскажут решение в вашем вопросе, большой выбор товаров в наличии на складе. Всё быстро и легко, всем доволен, цены приятные!",
      },
    ],
  },
  {
    id: "vysotskogo",
    shortName: "Высоцкого (КОР)",
    name: "ул. Владимира Высоцкого, 50",
    address: "Екатеринбург, ул. Владимира Высоцкого, 50",
    note: "Магазин «КОР» на парковке",
    orgId: "161585274789",
    rating: "4,8",
    stats: "30 отзывов · 75 оценок на Яндекс Картах",
    mapsUrl: "https://yandex.ru/maps/org/avtomoyo_avtoyaponets/161585274789/reviews/",
    addReviewUrl: "https://yandex.ru/maps/org/avtomoyo_avtoyaponets/161585274789/reviews/?add-review",
    reviews: [
      {
        author: "Дмитрий Скородумов",
        date: "10 дней назад",
        rating: 5,
        text: "Очень доволен обслуживанием в магазине, Михаил подробно ответил на все мои вопросы, помог выбрать необходимые мне запчасти, а также подсказал и оказал помощь в подборке и установке дворников. Осталось приятное ощущение после взаимодействия с таким профессионалом.",
      },
      {
        author: "Альбина М.",
        date: "2 января",
        rating: 5,
        text: "Всегда езжу только в этот магазин исключительно из-за вежливых и грамотных сотрудников, всегда подберут все что нужно и даже помогут заменить на месте. Всегда дарят подарки, делают скидки, огромное спасибо персоналу!",
      },
      {
        author: "Никита",
        date: "16 ноября",
        rating: 5,
        text: "В этом магазине работает потрясающий сотрудник по имени Михаил. Добродушный и вежливый человек. Не было ни разу, чтобы я приехал к нему и вышел из магазина без необходимых запчастей. Настолько профессиональное обслуживание, что хочется возвращаться вновь и вновь.",
      },
      {
        author: "Виктория Любовь",
        date: "25 февраля",
        rating: 5,
        text: "Отличный магазин, проконсультировали, сделали скидку. В наличии есть всё! Купила дешевле, чем везде, консультант помог с подбором. Респект и процветания вашему магазину!",
      },
    ],
  },
  {
    id: "uralskaya",
    shortName: "Уральская, 77",
    name: "ул. Уральская, 77",
    address: "Екатеринбург, ул. Уральская, 77",
    note: "Магазин автозапчастей",
    orgId: "104899088621",
    rating: "4,8",
    stats: "115 отзывов · 185 оценок на Яндекс Картах",
    mapsUrl: "https://yandex.ru/maps/org/avtomojo/104899088621/reviews/",
    addReviewUrl: "https://yandex.ru/maps/org/avtomojo/104899088621/reviews/?add-review",
    reviews: [
      {
        author: "Денис (iamdenisqa)",
        date: "19 марта",
        rating: 5,
        text: "Отличный магазин автозапчастей! Обращаюсь уже не первый раз и всегда остаюсь доволен. Персонал очень грамотный — всё подскажут, помогут с выбором, посоветуют оптимальный вариант по цене и качеству. При этом ничего не втюхивают, работают честно. В наличии практически всегда есть то, что нужно!",
      },
      {
        author: "Анастасия Бояринцева",
        date: "13 мая",
        rating: 5,
        text: "Покупала здесь запчасти и расходники для авто — осталась довольна. Помогли быстро подобрать нужные детали, всё объяснили без навязывания. Цены адекватные, ассортимент хороший, всё подошло. Отдельно порадовало человеческое отношение сотрудников!",
      },
      {
        author: "Виталий Музыченко",
        date: "8 июня",
        rating: 5,
        text: "Хороший персонал, как говорится «в теме». Цены ниже многих, быстрая доставка запчастей, много расходников всегда в наличии, советуют обычно правильные и проверенные решения.",
      },
      {
        author: "Екатерина Бажанова",
        date: "8 мая",
        rating: 5,
        text: "Менеджер Кирилл подробно все рассказал, приобрела масло на замену и сопутствующие товары. Спасибо большое ему за подробную консультацию и помощь в выборе!",
      },
    ],
  },
  {
    id: "shefskaya",
    shortName: "Шефская, 4б",
    name: "ул. Шефская, 4б",
    address: "Екатеринбург, ул. Шефская, 4б",
    note: "Круглосуточный магазин автозапчастей 24/7",
    orgId: "218269267792",
    rating: "5,0",
    stats: "235 отзывов · 527 оценок на Яндекс Картах",
    mapsUrl: "https://yandex.ru/maps/org/avtomoyo/218269267792/reviews/",
    addReviewUrl: "https://yandex.ru/maps/org/avtomoyo/218269267792/reviews/?add-review",
    reviews: [
      {
        author: "Максим Ворошилов",
        date: "14 апреля",
        rating: 5,
        text: "Отличный круглосуточный магазин! Ночью срочно понадобился ступичный подшипник на Мазду. Ребята оперативно подобрали по VIN, деталь оказалась прямо на складе в наличии по адекватной цене. Выручили!",
      },
      {
        author: "Евгений Краснов",
        date: "28 марта",
        rating: 5,
        text: "Всегда покупаю здесь расходники и масло. Огромный склад запчастей на 35 000 позиций, грамотные продавцы — проверяют каждую позицию по каталогам, чтобы точно подошло. Качество запчастей на высоте.",
      },
      {
        author: "Наталья Мальцева",
        date: "12 июля",
        rating: 5,
        text: "Профессиональные менеджеры, отдельное спасибо Александру за помощь в подборе запчастей. Сами всё проверили, подобрали качественный аналог и оригинальное масло. Плюсом сделали приятную скидку!",
      },
      {
        author: "Илья Селезнев",
        date: "19 мая",
        rating: 5,
        text: "Большой выбор запчастей для иномарок, удобное расположение на Шефской и самое главное — работают 24/7. Быстро оформили заказ, дали гарантию на детали. Рекомендую!",
      },
    ],
  },
];

export function YandexReviews({ 
  defaultBranchId,
  singleBranchOnly = false,
}: { 
  defaultBranchId?: string;
  singleBranchOnly?: boolean;
} = {}) {
  const initial = defaultBranchId 
    ? (YANDEX_BRANCHES.find((b) => b.id === defaultBranchId) || YANDEX_BRANCHES[0])
    : YANDEX_BRANCHES[0];
  const [activeBranch, setActiveBranch] = useState(initial);

  return (
    <div className="mt-6 space-y-5">
      {/* 1. Переключатель филиалов: показываем только если не включен singleBranchOnly */}
      {!singleBranchOnly && (
        <div className="flex flex-wrap items-center gap-2">
          {YANDEX_BRANCHES.map((b) => {
            const active = b.id === activeBranch.id;
            return (
              <button
                key={b.id}
                onClick={() => setActiveBranch(b)}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#0076be] text-white shadow-md shadow-[#0076be]/25"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:border-[#0076be]/40 hover:bg-slate-50"
                }`}
              >
                <MapPin size={14} className={active ? "text-white" : "text-[#0076be]"} />
                <span>{b.shortName}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. Рейтинг-шапка филиала с кнопками в одну строгую линию */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-sky-50/30 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-display text-3xl sm:text-4xl font-black text-slate-900 leading-none">
              {activeBranch.rating}
            </span>
            <div>
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} strokeWidth={0} fill="currentColor" />
                ))}
              </div>
              <p className="mt-1 text-xs text-zinc-500 font-medium whitespace-nowrap">{activeBranch.stats}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 shrink-0 hidden sm:block" />

          <div className="text-xs sm:text-sm text-slate-700 truncate">
            <span className="font-bold text-slate-900">{activeBranch.name}</span>
            <span className="mx-2 text-zinc-400">·</span>
            <span className="text-zinc-500">{activeBranch.note}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={activeBranch.addReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#0076be]/30 bg-white px-3.5 py-2.5 text-xs font-bold text-[#0076be] transition-colors hover:bg-[#0076be]/5 whitespace-nowrap"
          >
            <MessageSquarePlus size={14} />
            <span>Оставить отзыв</span>
          </a>

          <a
            href={activeBranch.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0076be] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm shadow-[#0076be]/20 transition-colors hover:bg-[#0062a0] whitespace-nowrap"
          >
            <span>Все отзывы на Яндекс Картах</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* 3. Сетка отзывов по 2 в ряду — идеальное заполнение без пустот */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeBranch.reviews.map((r) => (
          <div
            key={r.author}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0076be]/30 hover:shadow-md hover:shadow-[#0076be]/5"
          >
            <div>
              {/* Шапка отзыва */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0076be]/10 text-sm font-bold text-[#0076be]">
                    {r.author[0]}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{r.author}</h4>
                    <p className="mt-0.5 text-[11px] text-zinc-400">{r.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} size={13} strokeWidth={0} fill="currentColor" />
                    ))}
                  </span>
                </div>
              </div>

              {/* Текст отзыва */}
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                {r.text}
              </p>
            </div>

            {/* Подвал карточки с бейджем Яндекс Карт */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-zinc-400">
              <span className="inline-flex items-center gap-1 font-medium text-[#0076be]">
                ★ Яндекс Карты · Проверенный отзыв
              </span>
              <span className="text-zinc-400">Филиал {activeBranch.shortName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
