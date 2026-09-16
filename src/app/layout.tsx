import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "«Авто моё» — запчасти для японских и европейских авто в Екатеринбурге",
    template: "%s — «Авто моё»",
  },
  description:
    "Магазин автозапчастей «Авто моё»: более 30 000 наименований для японских и европейских автомобилей на складе в Екатеринбурге. Оригинал и проверенные аналоги, доставка, собственный сервисный центр.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col bg-carbon-950 text-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
