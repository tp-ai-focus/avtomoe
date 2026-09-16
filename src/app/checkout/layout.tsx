import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформление заказа в магазине «Авто моё»: самовывоз в Екатеринбурге, доставка по городу и России.",
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
