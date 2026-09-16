import type { Metadata } from "next";
import ContactsClient from "./ContactsClient";

export const metadata: Metadata = {
  title: "Контакты — магазины и сервисный центр «АвтоМоё»",
  description:
    "Адреса 5 магазинов автозапчастей и сервисного центра АвтоМоё в Екатеринбурге и Берёзовском. Режим работы, маршруты на Яндекс Картах и 2ГИС, связь с менеджером в MAX и VK.",
};

export default function ContactsPage() {
  return <ContactsClient />;
}
