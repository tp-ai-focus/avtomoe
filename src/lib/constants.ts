// Настоящие контакты ГК «Авто моё» (с avtomoe-ekb.ru / avtomoe-96.ru)
export const PHONE_DISPLAY = "+7 (343) 227-27-72";
export const PHONE_HREF = "tel:+73432272772";
export const SERVICE_PHONE_DISPLAY = "+7 (343) 227-27-71";
export const SERVICE_PHONE_HREF = "tel:+73432272771";
export const TELEGRAM_URL = "https://t.me/amoe96_bot";
export const MAX_BOT_URL = "https://max.ru/id592010055363_bot";
export const MAX_SHOP_CHAT_URL = "https://max.ru/u/f9LHodD0cOJFKKXSNr71UKUQLTeRnDYf2TaVm9U1h3t8MBqHUYj3pw3abPU";
export const MAX_SERVICE_CHAT_URL = "https://max.ru/u/79995642042";
export const MAX_CHAT_URL = "https://max.ru/u/f9LHodD0cOJFKKXSNr71UKUQLTeRnDYf2TaVm9U1h3t8MBqHUYj3pw3abPU";
export const MAX_PHONE = "+7 996 171-26-27";
export const VK_GROUP_URL = "https://vk.ru/avtomoeekb96";
export const VK_CHAT_URL = "https://vk.me/avtomoeekb96";
export const WHATSAPP_URL = "https://wa.me/79961766420";
export const SHOP_ADDRESS = "Екатеринбург, ул. Шефская, 4б";

export const ADDRESSES: { name: string; address: string; note: string }[] = [
  { name: "Шефская", address: "ул. Шефская, 4б", note: "Магазин-склад и сервис-центр, 8 подъёмников (круглосуточно)" },
  { name: "Уральская", address: "ул. Уральская, 77", note: "Магазин запчастей" },
  { name: "КОР", address: "ул. Владимира Высоцкого, 50", note: "Магазин запчастей" },
  { name: "Сахарова", address: "пр. Академика Сахарова, 107/2", note: "Магазин запчастей" },
  { name: "Берёзовский", address: "Берёзовский тракт, 4/1", note: "Магазин «Берёзовский привоз», г. Берёзовский" },
];

export const SHOP_ADDRESSES = ADDRESSES.slice(1);

export const SERVICE_CENTER = {
  address: "ул. Шефская, 4б",
  note: "Сервис-центр и магазин-склад, 8 подъёмников",
};

export const SHOP_HOURS = "Пн–Сб 9:00–20:00 · Вс 10:00–19:00";
export const SERVICE_HOURS = "Пн–Сб 9:00–20:00";

export const DELIVERY = {
  FREE_FROM: 5000,
  COURIER: 300,
  RUSSIA: 500,
} as const;

export const MAKES: Record<string, string> = {
  toyota: "Toyota",
  lexus: "Lexus",
  nissan: "Nissan",
  honda: "Honda",
  mazda: "Mazda",
  mitsubishi: "Mitsubishi",
  subaru: "Subaru",
  suzuki: "Suzuki",
  bmw: "BMW",
  mercedes: "Mercedes-Benz",
  audi: "Audi",
  volkswagen: "Volkswagen",
  skoda: "Škoda",
  volvo: "Volvo",
  renault: "Renault",
  peugeot: "Peugeot",
  citroen: "Citroën",
  opel: "Opel",
  ford: "Ford",
  chevrolet: "Chevrolet",
};

export const MAKE_GROUPS: { label: string; makes: string[] }[] = [
  { label: "Японские марки", makes: ["toyota", "lexus", "nissan", "honda", "mazda", "mitsubishi", "subaru", "suzuki"] },
  { label: "Европейские марки", makes: ["bmw", "mercedes", "audi", "volkswagen", "skoda", "volvo", "renault", "peugeot", "citroen", "opel", "ford", "chevrolet"] },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Сначала популярные" },
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "rating", label: "По рейтингу" },
  { value: "new", label: "Новинки" },
] as const;
