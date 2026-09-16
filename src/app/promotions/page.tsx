import type { Metadata } from "next";
import { PromotionsClient } from "./PromotionsClient";

export const metadata: Metadata = {
  title: "Акции и скидки — Автосервис и Магазин АвтоМоё в Екатеринбурге",
  description:
    "Все действующие акции, скидки и спецпредложения сети «АвтоМоё» в Екатеринбурге и Берёзовском: бесплатная замена масла, диагностика ходовой по 49 параметрам, кэшбэк 5%, такси до дома и гарантия лучшей цены.",
};

export default function PromotionsPage() {
  return <PromotionsClient />;
}
