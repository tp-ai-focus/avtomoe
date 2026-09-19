import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { MAX_SHOP_CHAT_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { Reveal } from "@/components/Reveal";
import { PhoneCallButton } from "@/components/PhoneCallButton";

interface ShopPromo {
  id: number;
  title: string;
  description: string;
  image?: string;
}

const shopPromotions: ShopPromo[] = [
  {
    id: 1,
    title: "Гарантия лучшей цены",
    description: "Нашли деталь дешевле? Сообщите нам, и мы сделаем цену ещё выгоднее!",
    image: "/img/promo/bestprice.jpg",
  },
  {
    id: 2,
    title: "Кэшбэк 5% бонусами",
    description: "Возвращаем 5% от суммы каждой покупки на накопительную карту магазина.",
    image: "/img/promo/kashback.jpg",
  },
  {
    id: 3,
    title: "Бесплатная доставка по городу",
    description: "Доставка 0 ₽ при любой сумме заказа. Быстро доставим нужные запчасти прямо до двери или сервиса.",
    image: "/img/promo/dostavka.jpg",
  },
];

export function ShopPromotions() {
  return (
    <section className="mt-16 md:mt-24">
      <Reveal>
        <div className="flex flex-col items-start gap-2.5">
          <p className="section-subtitle">Акции и скидки</p>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl text-slate-900">
            Наши акции
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shopPromotions.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-sm transition-all hover:border-slate-200 hover:shadow-xl">
              {/* Место под макет / баннер */}
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50 text-center">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 opacity-60">
                    Место под баннер
                  </span>
                )}
              </div>

              {/* Текстовый контент */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold leading-snug text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm font-medium leading-relaxed text-slate-600">
                    {p.description}
                  </p>
                </div>

                {/* Кнопки: Узнать подробнее (MAX-чат магазина +7 996 171 26 27) и Позвонить */}
                <div className="mt-6 flex items-stretch gap-2.5">
                  <a
                    href={MAX_SHOP_CHAT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#7c3aed] px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-md shadow-purple-900/25 transition hover:bg-[#6d28d9] hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
                    title="Написать в MAX магазина (+7 996 171-26-27)"
                  >
                    <MessageCircle size={15} className="shrink-0 text-white" />
                    <span>Узнать подробнее</span>
                  </a>

                  <PhoneCallButton
                    phoneDisplay={PHONE_DISPLAY}
                    phoneHref={PHONE_HREF}
                    title="Позвонить в магазин автозапчастей"
                    subtitle="Единая справочная служба «АвтоМоё»"
                    className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-700 transition hover:border-[#0076be] hover:bg-white hover:text-[#0076be] cursor-pointer"
                  >
                    <Phone size={14} className="shrink-0" />
                    <span>Позвонить</span>
                  </PhoneCallButton>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
