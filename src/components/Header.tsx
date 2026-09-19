"use client";

import { Clock, MapPin, Menu, Phone, Search, ShoppingCart, Wrench, X, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  SHOP_HOURS,
  TELEGRAM_URL,
  MAX_BOT_URL,
} from "@/lib/constants";
import { cartCount, useCart } from "@/store/cart";
import { DiscountModal } from "@/components/DiscountModal";
import { PhoneCallButton } from "@/components/PhoneCallButton";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Магазин" },
  { href: "/promotions", label: "Акции" },
  { href: "/service", label: "Услуги сервисного центра" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const count = mounted ? cartCount(items) : 0;

  return (
    <>
      <header className="sticky top-0 z-40 shadow-[0_4px_24px_rgba(0,80,140,0.35)]">


        {/* ── 2. Основная полоса шапки ── */}
        <div className="bg-[#0076be] text-white">
          <div className="mx-auto flex h-20 w-full max-w-[1700px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-12">

            {/* Логотипы и локация */}
            <div className="flex items-center gap-5">
              <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-85" aria-label="Авто Моё">
                <Image
                  src="/img/brand/avtomoe-logo-flags.png"
                  alt="Авто Моё"
                  width={200}
                  height={44}
                  className="h-9 w-auto object-contain md:h-11"
                />
              </Link>
              
              <div className="hidden h-9 items-center gap-5 xl:flex">
                <div className="h-7 w-px bg-white/20" />
                <Link href="/" aria-label="Авто Японец" className="transition-opacity hover:opacity-85">
                  <Image
                    src="/img/brand/logo-japonec.svg"
                    alt="Авто Японец"
                    width={150}
                    height={36}
                    className="h-7 w-auto object-contain md:h-9"
                  />
                </Link>
                <div className="h-7 w-px bg-white/20" />
                <Link href="/" aria-label="Авто Европеец" className="transition-opacity hover:opacity-85">
                  <Image
                    src="/img/brand/logo-evropeets.svg"
                    alt="Авто Европеец"
                    width={150}
                    height={36}
                    className="h-7 w-auto object-contain md:h-9"
                  />
                </Link>
              </div>

            </div>

            {/* Контакты и действия */}
            <div className="hidden items-center gap-8 lg:flex xl:gap-12">

              {/* Мессенджеры */}
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8cc63f] opacity-60"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8cc63f]"></span>
                  </span>
                  Всегда на связи:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={MAX_BOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm transition hover:-translate-y-px hover:bg-zinc-100"
                  >
                    <MessageCircle size={15} fill="#7c3aed" className="text-[#7c3aed]" /> Max
                  </a>
                  <a
                    href={TELEGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-zinc-700 shadow-sm transition hover:-translate-y-px hover:bg-zinc-100"
                  >
                    <Send size={15} fill="#2aabee" className="text-[#2aabee]" /> Telegram
                  </a>
                </div>
              </div>

              {/* Телефон */}
              <div className="flex flex-col whitespace-nowrap">
                <PhoneCallButton
                  phoneDisplay={PHONE_DISPLAY}
                  phoneHref={PHONE_HREF}
                  title="Позвонить в магазин автозапчастей"
                  subtitle="Единая справочная служба «АвтоМоё»"
                  className="text-[20px] font-extrabold tracking-wide text-white transition hover:text-white/85 cursor-pointer"
                >
                  {PHONE_DISPLAY}
                </PhoneCallButton>
                <span className="flex items-center gap-1 text-[11px] text-white/75">
                  <Clock size={11} className="text-[#8cc63f]" />
                  Без выходных {SHOP_HOURS.replace("·", "·")}
                </span>
              </div>

              {/* CTA-кнопка */}
              <button onClick={() => setIsModalOpen(true)} className="flex flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[#e8291c] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(232,41,28,0.45)] transition hover:-translate-y-0.5 hover:bg-[#d62415] hover:shadow-[0_6px_20px_rgba(232,41,28,0.55)] active:translate-y-0">
                <Search size={14} />
                Подобрать запчасть
              </button>
            </div>

            {/* Мобильные кнопки */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Меню"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. Нижняя навигационная полоса ── */}
        <div className="hidden bg-[#0076be] lg:block border-t border-white/10">
          <div className="mx-auto flex h-[46px] w-full max-w-[1700px] items-center justify-between px-4 sm:px-6 lg:px-12">
            <nav className="flex flex-1 items-center justify-center gap-8">
              {NAV.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="group relative px-4 py-3 text-[13px] font-semibold text-white/85 transition hover:text-white"
                >
                  {item.label}
                  {/* анимированное подчёркивание */}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] origin-left scale-x-0 rounded-full bg-white transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#0076be] pt-4 lg:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="wrap flex flex-col gap-2 pt-24">
            {NAV.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="rounded-xl bg-white/10 px-5 py-4 text-lg font-bold text-white transition hover:bg-white/20"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3 px-1">
              <PhoneCallButton
                phoneDisplay={PHONE_DISPLAY}
                phoneHref={PHONE_HREF}
                title="Позвонить в магазин автозапчастей"
                subtitle="Единая справочная служба «АвтоМоё»"
                className="flex items-center gap-2 text-xl font-bold text-white cursor-pointer"
              >
                <Phone size={20} /> <span>{PHONE_DISPLAY}</span>
              </PhoneCallButton>
              <div className="flex gap-3">
                <a
                  href={MAX_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7c3aed] px-4 py-3 font-bold text-white"
                >
                  <MessageCircle size={18} /> Max
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2aabee] px-4 py-3 font-bold text-white"
                >
                  <Send size={18} /> Telegram
                </a>
              </div>
              <button onClick={() => { setMenuOpen(false); setIsModalOpen(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-[#e8291c] px-5 py-4 text-lg font-bold uppercase text-white shadow-[0_4px_14px_rgba(232,41,28,0.45)]">
                <Search size={20} /> Подобрать запчасть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно заявки */}
      <DiscountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="parts"
      />
    </>
  );
}
