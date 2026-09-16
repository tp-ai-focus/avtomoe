export const CATEGORIES = [
  { id: 1, slug: "filtry", name: "Фильтры", description: "Масляные, воздушные и салонные фильтры.", image: "/img/p-air-filter.jpg", sort: 1 },
  { id: 2, slug: "tormoza", name: "Тормозная система", description: "Колодки, диски и жидкости.", image: "/img/p-brake-disc.jpg", sort: 2 },
  { id: 3, slug: "masla", name: "Масла и жидкости", description: "Моторные и трансмиссионные масла.", image: "/img/p-motor-oil.jpg", sort: 3 },
  { id: 4, slug: "podveska", name: "Подвеска и рулевое", description: "Амортизаторы, стойки.", image: "/img/p-shock.jpg", sort: 4 },
  { id: 5, slug: "dvigatel", name: "Двигатель", description: "Свечи, ремни ГРМ, ролики.", image: "/img/p-spark-plugs.jpg", sort: 5 },
  { id: 6, slug: "elektrika", name: "Электрика", description: "Аккумуляторы, генераторы.", image: "/img/catalog/electrics.png", sort: 6 },
];

export const PRODUCTS = [
  { id:1, slug:"filtr-maslyanyy-mann-w-712-95", sku:"W 712/95", name:"Масляный фильтр MANN-FILTER W 712/95", brand:"MANN-FILTER", categoryId:1, price:620, oldPrice:780, stock:34, image:"/img/p-oil-filter.jpg", images:["/img/p-oil-filter.jpg"], description:"Резьбовой масляный фильтр для VAG 1.2–1.4 TSI.", specs:{"Тип":"Резьбовой","Страна":"Германия"}, compatibility:["VW Golf VII 1.4 TSI","Audi A3 1.4 TFSI","Škoda Octavia A7 1.4 TSI"], makes:["volkswagen","audi","skoda"], isFeatured:true, isNew:false, createdAt:new Date() },
  { id:2, slug:"filtr-vozdushnyy-filtron-ap-032-1", sku:"AP 032/1", name:"Воздушный фильтр Filtron AP 032/1", brand:"Filtron", categoryId:1, price:890, oldPrice:null, stock:21, image:"/img/p-air-filter.jpg", images:["/img/p-air-filter.jpg"], description:"Панельный воздушный фильтр для Toyota и Lexus.", specs:{"Тип":"Панельный","Страна":"Польша"}, compatibility:["Toyota Camry XV70","Lexus ES 250"], makes:["toyota","lexus"], isFeatured:true, isNew:false, createdAt:new Date() },
  { id:3, slug:"filtr-salonnyy-corteco-80004321", sku:"80004321", name:"Салонный фильтр угольный Corteco", brand:"Corteco", categoryId:1, price:1150, oldPrice:null, stock:18, image:"/img/p-cabin-filter.jpg", images:["/img/p-cabin-filter.jpg"], description:"Угольный салонный фильтр.", specs:{"Тип":"Угольный","Страна":"Германия"}, compatibility:["BMW 3 (F30)","BMW X3 (G01)"], makes:["bmw","mercedes"], isFeatured:false, isNew:false, createdAt:new Date() },
  { id:4, slug:"kolodki-tormoznye-brembo-p-50-087", sku:"P 50 087", name:"Тормозные колодки Brembo P 50 087", brand:"Brembo", categoryId:2, price:3450, oldPrice:4200, stock:12, image:"/img/p-brake-pads.jpg", images:["/img/p-brake-pads.jpg"], description:"Передние колодки Brembo.", specs:{"Ось":"Передняя","Страна":"Италия"}, compatibility:["Toyota Camry XV70","Lexus NX"], makes:["toyota","lexus"], isFeatured:true, isNew:false, createdAt:new Date() },
  { id:5, slug:"disk-tormoznoy-trw-df4352", sku:"DF4352", name:"Тормозной диск TRW DF4352", brand:"TRW", categoryId:2, price:4150, oldPrice:null, stock:9, image:"/img/p-brake-disc.jpg", images:["/img/p-brake-disc.jpg"], description:"Вентилируемый передний диск TRW.", specs:{"Ось":"Передняя","Страна":"Германия"}, compatibility:["VW Tiguan II","Škoda Kodiaq"], makes:["volkswagen","audi","skoda"], isFeatured:true, isNew:false, createdAt:new Date() },
  { id:6, slug:"maslo-motul-8100-x-clean-5w30", sku:"109210", name:"Моторное масло Motul 8100 X-clean 5W-30, 4 л", brand:"Motul", categoryId:3, price:5450, oldPrice:6200, stock:26, image:"/img/p-motor-oil.jpg", images:["/img/p-motor-oil.jpg"], description:"Низкозольная синтетика Motul.", specs:{"Объём":"4 л","Вязкость":"5W-30"}, compatibility:["MB 229.52","BMW LL-04","VW 504.00/507.00"], makes:["toyota","bmw","mercedes","volkswagen","audi"], isFeatured:true, isNew:false, createdAt:new Date() },
  { id:7, slug:"amortizator-kyb-excel-g-339254", sku:"339254", name:"Амортизатор KYB Excel-G 339254", brand:"KYB", categoryId:4, price:4850, oldPrice:null, stock:14, image:"/img/p-shock.jpg", images:["/img/p-shock.jpg"], description:"Газомасляный амортизатор KYB.", specs:{"Тип":"Газомасляный","Страна":"Япония"}, compatibility:["Toyota Camry XV50/XV70","Lexus ES 250"], makes:["toyota","lexus"], isFeatured:true, isNew:false, createdAt:new Date() },
  { id:8, slug:"akkumulyator-varta-blue-dynamic-d24", sku:"560 408 054", name:"Аккумулятор Varta Blue Dynamic D24, 60 Ач", brand:"Varta", categoryId:6, price:9790, oldPrice:11400, stock:8, image:"/img/catalog/electrics.png", images:["/img/catalog/electrics.png"], description:"Varta Blue Dynamic 60 Ач.", specs:{"Ёмкость":"60 Ач","Страна":"Германия"}, compatibility:["Подходит большинству авто"], makes:["toyota","nissan","bmw","volkswagen"], isFeatured:true, isNew:false, createdAt:new Date() },
];

export const SERVICES = [
  { id:1, name:"Замена масла и фильтров ДВС", description:"Масло и фильтры со склада магазина или ваши.", priceFrom:900, free:false, durationMin:40, icon:"Droplets", sort:1 },
  { id:2, name:"Диагностика подвески", description:"Люфтомер и осмотр на подъёмнике.", priceFrom:0, free:true, durationMin:30, icon:"ScanLine", sort:2 },
  { id:3, name:"Компьютерная диагностика", description:"Считывание ошибок всех блоков.", priceFrom:1290, free:false, durationMin:45, icon:"Cpu", sort:3 },
  { id:4, name:"Тормозная система", description:"Замена колодок, дисков и шлангов.", priceFrom:1200, free:false, durationMin:60, icon:"Disc3", sort:4 },
  { id:5, name:"Развал-схождение 3D", description:"Стенд Hunter: регулировка углов.", priceFrom:2200, free:false, durationMin:50, icon:"Crosshair", sort:5 },
  { id:6, name:"Шиномонтаж и балансировка", description:"Комплект R13–R21, ремонт проколов.", priceFrom:1800, free:false, durationMin:60, icon:"CircleDot", sort:6 },
  { id:7, name:"Заправка кондиционера", description:"Поиск утечек, заправка с маслом.", priceFrom:1900, free:false, durationMin:60, icon:"Snowflake", sort:7 },
  { id:8, name:"Ремонт двигателя", description:"От замены прокладок до капремонта.", priceFrom:5000, free:false, durationMin:null, icon:"Wrench", sort:8 },
  { id:9, name:"Ремонт АКПП / МКПП", description:"Частичная и полная переборка.", priceFrom:6500, free:false, durationMin:null, icon:"Gauge", sort:9 },
  { id:10, name:"ТО по регламенту", description:"Обслуживание по карте производителя.", priceFrom:5500, free:false, durationMin:120, icon:"ClipboardCheck", sort:10 },
];

export const REVIEWS = [
  { id:1, productId:1, author:"Игорь С.", rating:5, text:"Беру только MANN на Октавию. Цена ниже, чем в сетевых магазинах.", createdAt:new Date() },
  { id:2, productId:1, author:"Павел", rating:5, text:"Проверил код подлинности — оригинал. Холодный пуск мягче.", createdAt:new Date() },
  { id:3, productId:1, author:"Антон", rating:4, text:"Фильтр хороший, к качеству вопросов нет.", createdAt:new Date() },
  { id:4, productId:2, author:"Марина", rating:5, text:"Встал в Камри как родной.", createdAt:new Date() },
  { id:5, productId:4, author:"Андрей В.", rating:5, text:"Тормозят лучше стоковых и не свистят.", createdAt:new Date() },
  { id:6, productId:5, author:"Максим", rating:5, text:"Покрытие реально работает, биения нет.", createdAt:new Date() },
  { id:7, productId:6, author:"Наталья", rating:5, text:"Лью в Мерседес уже четвёртую замену.", createdAt:new Date() },
  { id:8, productId:7, author:"Константин", rating:5, text:"Камри перестала клевать на торможении.", createdAt:new Date() },
  { id:9, productId:8, author:"Александр П.", rating:5, text:"В −32 завёлся с полпинка.", createdAt:new Date() },
];
