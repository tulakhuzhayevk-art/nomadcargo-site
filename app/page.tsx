"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Factory,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Plane,
  Search,
  Send,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

type CalcMode = "transport" | "air" | "sea";

type CalcCountry =
  | "russia"
  | "uzbekistan"
  | "kazakhstan"
  | "kyrgyzstan"
  | "tajikistan"
  | "other";

type CalcCurrency = "usd" | "uzs" | "rub";

type Lang = "ru" | "en";

const copy = {
  ru: {
    navWhy: "Почему мы",
    navServices: "Услуги",
    navHow: "Как работаем",
    navCases: "Кейсы",
    navContact: "Оставить заявку",

    heroLabel: "International Shipping & Cargo",
    heroTitle1: "ИЗ КИТАЯ",
    heroTitle2: "ПО ВСЕМУ",
    heroTitleGold: "МИРУ",
    heroSub:
      "Премиальные контейнерные и грузовые перевозки из Китая. Морем, воздухом, по железной дороге. Для бизнеса, импортёров и продавцов маркетплейсов.",
    heroBtnCalc: "Рассчитать стоимость",
    heroBtnServices: "Смотреть услуги",
    heroCountries: "Стран доставки",
    heroSupport: "Поддержка клиентов",
    heroYears: "Лет в логистике",

    whyLabel: "Почему Nomad Cargo",
    whyTitleA: "ПОЧЕМУ",
    whyTitleB: "NOMAD",
    whySub:
      "Мы не просто перевозим груз. Мы строим надёжную логистическую систему, в которой важны скорость, прозрачность, контроль и репутация.",

    whyItems: [
      {
        num: "01",
        title: "Прозрачность на каждом этапе",
        desc: "Полный контроль движения груза, понятные условия и честная коммуникация без скрытых сюрпризов.",
      },
      {
        num: "02",
        title: "Работаем напрямую с Китаем",
        desc: "Поиск фабрик, проверка поставщиков, организация выкупа, консолидация и отправка под ключ.",
      },
      {
        num: "03",
        title: "Скорость и предсказуемость",
        desc: "Подбираем оптимальный маршрут под срочность, бюджет и тип товара, а не по шаблону.",
      },
      {
        num: "04",
        title: "Премиальный сервис для бизнеса",
        desc: "Надёжный партнёр для предпринимателей, брендов, маркетплейсов и корпоративных клиентов.",
      },
    ],

    servicesLabel: "Услуги",
    servicesTitleA: "НАШИ",
    servicesTitleB: "УСЛУГИ",
    servicesSub:
      "Полный цикл логистики и снабжения для бизнеса: от поиска товара в Китае до доставки в вашу страну.",

    services: [
      {
        n: "01",
        name: "Авиадоставка",
        desc: "Для срочных поставок, когда время критично и нужно быстрое прибытие груза.",
        tags: ["Экспресс", "Быстро", "Срочно"],
      },
      {
        n: "02",
        name: "Морские перевозки",
        desc: "Оптимальное решение для крупных партий, контейнеров и стабильных международных поставок.",
        tags: ["FCL", "LCL", "Контейнеры"],
      },
      {
        n: "03",
        name: "Транспортная доставка",
        desc: "Баланс между скоростью и ценой для многих направлений из Китая в СНГ и не только.",
        tags: ["Баланс", "Надёжно", "Средний бюджет"],
      },
      {
        n: "04",
        name: "Поиск фабрик",
        desc: "Подбор проверенных фабрик и поставщиков под ваш продукт, объём и требования.",
        tags: ["Sourcing", "B2B", "Audit"],
      },
      {
        n: "05",
        name: "Консолидация",
        desc: "Сбор товара от разных поставщиков на складе, переупаковка и подготовка к отправке.",
        tags: ["Склад", "Контроль", "Упаковка"],
      },
      {
        n: "06",
        name: "Таможенное оформление",
        desc: "Сопровождение документов и прохождение таможенных процедур без лишней головной боли.",
        tags: ["Документы", "Импорт", "Compliance"],
      },
    ],

    calcLabel: "Быстрый расчёт",
    calcTitleA: "КАЛЬКУЛЯТОР",
    calcTitleB: "СТОИМОСТИ",
    calcSub: "Получите предварительную стоимость перевозки за пару секунд.",
    calcType: "Тип доставки",
    calcCountry: "Страна назначения",
    calcUrgency: "Срочность",
    calcWeight: "Вес (кг)",
    calcVolume: "Объём (м³)",
    calcWeightPh: "Например: 120",
    calcVolumePh: "Например: 0.85",
    calcRun: "Рассчитать",
    calcLeave: "Оставить заявку",
    calcExact: "Получить точный расчёт",
    calcNote:
      "Предварительная оценка. Точная стоимость зависит от типа груза, маршрута и документов.",
    standard: "Стандарт",
    priority: "Приоритет",
    express: "Экспресс",
    otherCountry: "Другая страна",

    howLabel: "Процесс",
    howTitleA: "КАК МЫ",
    howTitleB: "РАБОТАЕМ",
    howSub:
      "Понятный, прозрачный и управляемый процесс от первого запроса до финальной доставки.",
    howCircle: "ШАГОВ ДО РЕЗУЛЬТАТА",
    howSteps: [
      [
        "Шаг 01",
        "Запрос и консультация",
        "Вы описываете задачу, объём, сроки и направление. Мы подбираем рабочую модель доставки.",
      ],
      [
        "Шаг 02",
        "Поиск и проверка",
        "При необходимости находим фабрику, проверяем поставщика и согласовываем детали закупки.",
      ],
      [
        "Шаг 03",
        "Консолидация и подготовка",
        "Принимаем товар на склад, объединяем партии, проверяем упаковку и документы.",
      ],
      [
        "Шаг 04",
        "Отправка груза",
        "Выбираем оптимальный маршрут: море, воздух или железная дорога.",
      ],
      [
        "Шаг 05",
        "Доставка и сопровождение",
        "Контролируем движение груза и держим вас в курсе до самого получения.",
      ],
    ],

    casesLabel: "Кейсы",
    casesTitleA: "РЕАЛЬНЫЕ",
    casesTitleB: "КЕЙСЫ",
    casesSub:
      "Примеры маршрутов и логистических задач, которые мы решаем для клиентов.",
    cases: [
      {
        route: "Гуанчжоу → Ташкент",
        client: "Ташкентский импортёр электроники",
        product: "Компьютерная периферия и аксессуары",
        title: "Срочная поставка электроники для маркетплейса",
        desc: "Собрали товар от нескольких поставщиков, проверили упаковку, объединили партии на складе в Китае и отправили быстрым маршрутом под запуск продаж.",
        result: "Клиент получил партию до старта рекламной кампании и избежал простой склада.",
        stats: [
          ["8 дней", "Срок"],
          ["420 кг", "Вес"],
        ],
      },
      {
        route: "Иу → Алматы",
        client: "Розничная сеть в Казахстане",
        product: "Товары для дома и сезонный ассортимент",
        title: "Регулярная доставка товаров для розницы",
        desc: "Подобрали транспортный маршрут с балансом сроков и стоимости, настроили консолидацию и понятную коммуникацию по статусам груза.",
        result: "Поставка стала предсказуемой: клиент планирует закупки без хаоса и срочных переплат.",
        stats: [
          ["16 дней", "Срок"],
          ["2.4 м³", "Объём"],
        ],
      },
      {
        route: "Шэньчжэнь → Дубай",
        client: "B2B бренд электроники",
        product: "Контейнерная партия под private label",
        title: "Контейнерная отправка под бренд",
        desc: "Проверили маркировку, упаковку и документы, согласовали загрузку контейнера и сопровождали груз до коммерческого импорта.",
        result: "Груз прошёл без критичных задержек, клиент сохранил график поставок для партнёров.",
        stats: [
          ["1 x 40HC", "Контейнер"],
          ["100%", "Контроль"],
        ],
      },
    ],

    testimonialsLabel: "Отзывы",
    testimonialsTitleA: "ДОВЕРИЕ",
    testimonialsTitleB: "КЛИЕНТОВ",
    testimonialsSub:
      "Когда логистика влияет на бизнес, люди выбирают не просто цену, а надёжность.",
    reviews: [
      {
        text: "Работают быстро, чётко и без суеты. Самое главное — всегда есть ощущение контроля над поставкой.",
        name: "Aziz",
        company: "Ecommerce Seller",
      },
      {
        text: "Закрыли нам поиск поставщика и доставку в одной связке. Это сэкономило время, нервы и деньги.",
        name: "Timur",
        company: "Import Business",
      },
      {
        text: "Понравился уровень коммуникации. Всё по делу, без пустых обещаний. Видно, что понимают B2B логистику.",
        name: "Sardor",
        company: "Retail Brand",
      },
    ],

    faqLabel: "FAQ",
    faqTitleA: "ЧАСТЫЕ",
    faqTitleB: "ВОПРОСЫ",
    faqSub: "Короткие ответы на вопросы, которые чаще всего задают по доставке из Китая.",
    faqItems: [
      ["Сколько стоит доставка 1 кг из Китая?", "Цена зависит от страны, типа доставки, веса, объёма и плотности груза. Калькулятор даёт ориентир, а точный расчёт менеджер подтверждает после деталей по товару."],
      ["Что нельзя перевозить?", "Ограничения зависят от маршрута и законодательства страны назначения. Обычно сложнее перевозить опасные грузы, жидкости, батареи, брендовую продукцию без документов и товары с ограничениями."],
      ["Как отслеживать груз?", "После оформления мы держим вас в курсе по ключевым этапам: принятие на склад, консолидация, отправка, транзит и прибытие."],
      ["Можно ли найти поставщика в Китае?", "Да. Мы можем помочь с поиском фабрики, проверкой поставщика, выкупом, консолидацией и отправкой под ключ."],
      ["Какие документы нужны для доставки?", "Зависит от типа груза и формата импорта. Обычно нужны инвойс, упаковочный лист, данные получателя и документы по товару."],
    ],

    aboutLabel: "О компании",
    aboutTitleA: "СОЗДАНО ДЛЯ",
    aboutTitleB: "СЕРЬЁЗНОГО БИЗНЕСА",
    aboutSub:
      "Nomad Cargo — это логистический партнёр для компаний, которым нужен не хаос в поставках, а система. Мы помогаем бизнесу выстраивать поставки из Китая уверенно, предсказуемо и с сильным сервисом.",
    aboutCountries: "СТРАН",
    aboutShipments: "ОТПРАВОК",
    aboutSupport: "ПОДДЕРЖКА",
    aboutFocus: "ФОКУС НА РЕЗУЛЬТАТ",

    trustText: "Нам доверяют импортёры, бренды и продавцы маркетплейсов",

    contactLabel: "Контакты",
    contactTitleA: "ДАВАЙТЕ ДВИГАТЬ",
    contactTitleB: "ВАШ ГРУЗ",
    contactSub:
      "Оставьте заявку, и мы подберём для вас оптимальный маршрут, сроки и формат доставки.",
    phone: "Телефон",
    email: "Email",
    office: "Офис",
    officeVal: "Ташкент / Китай / Worldwide",
    name: "Ваше имя",
    phoneTg: "Телефон / Telegram",
    cargoType: "Тип груза",
    direction: "Направление",
    comment: "Комментарий",
    namePh: "Имя",
    phonePh: "+998...",
    cargoPh: "Например: электроника",
    directionPh: "China → Uzbekistan",
    commentPh: "Опишите задачу...",
    submit: "Отправить заявку",

    footerNav: "Навигация",
    footerServices: "Услуги",
    footerContacts: "Контакты",
    footerDesc:
      "Международная логистика, поиск поставщиков, контейнерные и грузовые перевозки для бизнеса.",
    privacy: "Политика конфиденциальности",
    terms: "Условия",

    floatQuote: "Расчёт",
    floatTelegram: "Telegram",
    floatWhatsapp: "WhatsApp",

    popupLabel: "Перед уходом",
    popupTitleA: "ПОЛУЧИТЕ БЫСТРЫЙ",
    popupTitleB: "РАСЧЁТ",
    popupDesc:
      "Оставьте контакт, и мы быстро свяжемся с вами по вашей доставке из Китая.",
    popupBtn: "Получить расчёт",
  },

  en: {
    navWhy: "Why us",
    navServices: "Services",
    navHow: "How we work",
    navCases: "Cases",
    navContact: "Get quote",

    heroLabel: "International Shipping & Cargo",
    heroTitle1: "FROM CHINA",
    heroTitle2: "TO THE",
    heroTitleGold: "WORLD",
    heroSub:
      "Premium container and cargo shipping from China by sea, air, and rail for businesses, importers, and marketplace sellers.",
    heroBtnCalc: "Calculate cost",
    heroBtnServices: "View services",
    heroCountries: "Countries served",
    heroSupport: "Client support",
    heroYears: "Years in logistics",

    whyLabel: "Why Nomad Cargo",
    whyTitleA: "WHY",
    whyTitleB: "NOMAD",
    whySub:
      "We do more than move cargo. We build a reliable logistics system where speed, transparency, control, and reputation matter.",
    whyItems: [
      {
        num: "01",
        title: "Transparency at every stage",
        desc: "Full shipment control, clear terms, and honest communication with no hidden surprises.",
      },
      {
        num: "02",
        title: "Direct work with China",
        desc: "Factory search, supplier checks, purchasing, consolidation, and turnkey shipping.",
      },
      {
        num: "03",
        title: "Speed and predictability",
        desc: "We choose the right route based on urgency, budget, and cargo type, not a generic template.",
      },
      {
        num: "04",
        title: "Premium service for business",
        desc: "A reliable partner for entrepreneurs, brands, marketplaces, and corporate clients.",
      },
    ],

    servicesLabel: "Services",
    servicesTitleA: "OUR",
    servicesTitleB: "SERVICES",
    servicesSub:
      "A full logistics and sourcing cycle for business: from finding products in China to final delivery.",
    services: [
      {
        n: "01",
        name: "Air Cargo",
        desc: "For urgent shipments when time is critical and fast arrival matters.",
        tags: ["Express", "Fast", "Urgent"],
      },
      {
        n: "02",
        name: "Sea Freight",
        desc: "The right solution for large batches, containers, and stable international supply chains.",
        tags: ["FCL", "LCL", "Containers"],
      },
      {
        n: "03",
        name: "Ground Transport",
        desc: "A balance between speed and cost for many routes from China to CIS and beyond.",
        tags: ["Balanced", "Reliable", "Mid-Cost"],
      },
      {
        n: "04",
        name: "Factory Search",
        desc: "Finding verified factories and suppliers for your product, volume, and requirements.",
        tags: ["Sourcing", "B2B", "Audit"],
      },
      {
        n: "05",
        name: "Consolidation",
        desc: "Collecting goods from multiple suppliers, repacking, and preparing for shipment.",
        tags: ["Warehouse", "Control", "Packing"],
      },
      {
        n: "06",
        name: "Customs Clearance",
        desc: "Document support and customs handling without unnecessary headaches.",
        tags: ["Docs", "Import", "Compliance"],
      },
    ],

    calcLabel: "Quick estimate",
    calcTitleA: "COST",
    calcTitleB: "CALCULATOR",
    calcSub: "Get an estimated shipping cost in just a few seconds.",
    calcType: "Shipping type",
    calcCountry: "Destination country",
    calcUrgency: "Urgency",
    calcWeight: "Weight (kg)",
    calcVolume: "Volume (m³)",
    calcWeightPh: "For example: 120",
    calcVolumePh: "For example: 0.85",
    calcRun: "Calculate",
    calcLeave: "Leave request",
    calcExact: "Get exact quote",
    calcNote:
      "Preliminary estimate. Final cost depends on cargo type, route, and documentation.",
    standard: "Standard",
    priority: "Priority",
    express: "Express",
    otherCountry: "Other country",

    howLabel: "Process",
    howTitleA: "HOW WE",
    howTitleB: "WORK",
    howSub:
      "A clear, transparent, and manageable process from the first request to final delivery.",
    howCircle: "STEPS TO RESULT",
    howSteps: [
      [
        "Step 01",
        "Request and consultation",
        "You describe the task, volume, timing, and route. We choose the right shipping model.",
      ],
      [
        "Step 02",
        "Search and verification",
        "If needed, we find the factory, verify the supplier, and align all procurement details.",
      ],
      [
        "Step 03",
        "Consolidation and preparation",
        "We receive goods at the warehouse, combine shipments, and check packaging and documents.",
      ],
      [
        "Step 04",
        "Cargo dispatch",
        "We select the best route: sea, air, or rail.",
      ],
      [
        "Step 05",
        "Delivery and support",
        "We monitor the cargo movement and keep you updated until final receipt.",
      ],
    ],

    casesLabel: "Cases",
    casesTitleA: "REAL",
    casesTitleB: "CASES",
    casesSub:
      "Examples of routes and logistics tasks we solve for clients.",
    cases: [
      {
        route: "Guangzhou → Tashkent",
        client: "Tashkent electronics importer",
        product: "Computer peripherals and accessories",
        title: "Urgent electronics shipment for marketplace launch",
        desc: "We collected goods from several suppliers, checked packaging, consolidated the batch in China, and shipped it via a fast route for a sales launch.",
        result: "The client received the shipment before the ad campaign started and avoided warehouse downtime.",
        stats: [
          ["8 days", "Timing"],
          ["420 kg", "Weight"],
        ],
      },
      {
        route: "Yiwu → Almaty",
        client: "Retail chain in Kazakhstan",
        product: "Home goods and seasonal assortment",
        title: "Regular transport delivery for retail goods",
        desc: "We selected a transport route with a strong balance of timing and cost, built consolidation flow, and set clear shipment status communication.",
        result: "The supply became predictable, helping the client plan purchasing without chaos or urgent overpaying.",
        stats: [
          ["16 days", "Timing"],
          ["2.4 m³", "Volume"],
        ],
      },
      {
        route: "Shenzhen → Dubai",
        client: "B2B electronics brand",
        product: "Private-label container batch",
        title: "Container shipment for private label brand",
        desc: "We checked labeling, packaging, and documents, aligned container loading, and supported the shipment through commercial import.",
        result: "The cargo moved without critical delays and the client kept the supply schedule for partners.",
        stats: [
          ["1 x 40HC", "Container"],
          ["100%", "Control"],
        ],
      },
    ],

    testimonialsLabel: "Testimonials",
    testimonialsTitleA: "CLIENT",
    testimonialsTitleB: "TRUST",
    testimonialsSub:
      "When logistics impacts business, people choose more than price. They choose reliability.",
    reviews: [
      {
        text: "Fast, structured, and clean execution. Most importantly, we always felt in control of the shipment.",
        name: "Aziz",
        company: "Ecommerce Seller",
      },
      {
        text: "They handled supplier search and delivery as one system. It saved us time, energy, and money.",
        name: "Timur",
        company: "Import Business",
      },
      {
        text: "The communication level stood out. No empty promises, only clear business-focused logistics.",
        name: "Sardor",
        company: "Retail Brand",
      },
    ],

    faqLabel: "FAQ",
    faqTitleA: "FREQUENT",
    faqTitleB: "QUESTIONS",
    faqSub: "Clear answers to the questions clients ask most often about shipping from China.",
    faqItems: [
      ["How much does 1 kg shipping from China cost?", "The price depends on destination, shipping type, weight, volume, and cargo density. The calculator gives an estimate, while the manager confirms the final quote after cargo details."],
      ["What items cannot be shipped?", "Restrictions depend on the route and destination-country rules. Dangerous goods, liquids, batteries, branded goods without documents, and restricted items need extra checks."],
      ["How do I track my cargo?", "We keep you updated at key stages: warehouse receipt, consolidation, dispatch, transit, and arrival."],
      ["Can you find a supplier in China?", "Yes. We can help with factory search, supplier verification, purchasing, consolidation, and turnkey delivery."],
      ["What documents are needed?", "It depends on cargo type and import format. Usually invoice, packing list, recipient details, and product documents are required."],
    ],

    aboutLabel: "About company",
    aboutTitleA: "BUILT FOR",
    aboutTitleB: "SERIOUS BUSINESS",
    aboutSub:
      "Nomad Cargo is a logistics partner for companies that need a system, not chaos. We help businesses build supply chains from China with confidence, predictability, and strong service.",
    aboutCountries: "COUNTRIES",
    aboutShipments: "SHIPMENTS",
    aboutSupport: "SUPPORT",
    aboutFocus: "FOCUS ON RESULT",

    trustText: "Trusted by importers, brands & marketplace sellers",

    contactLabel: "Contact",
    contactTitleA: "LET’S MOVE",
    contactTitleB: "YOUR CARGO",
    contactSub:
      "Leave a request and we will choose the best route, timing, and shipping format for you.",
    phone: "Phone",
    email: "Email",
    office: "Office",
    officeVal: "Tashkent / China / Worldwide",
    name: "Your name",
    phoneTg: "Phone / Telegram",
    cargoType: "Cargo type",
    direction: "Direction",
    comment: "Comment",
    namePh: "Name",
    phonePh: "+998...",
    cargoPh: "For example: electronics",
    directionPh: "China → Uzbekistan",
    commentPh: "Describe your task...",
    submit: "Send request",

    footerNav: "Navigation",
    footerServices: "Services",
    footerContacts: "Contacts",
    footerDesc:
      "International logistics, supplier sourcing, container and cargo shipping for business.",
    privacy: "Privacy Policy",
    terms: "Terms",

    floatQuote: "Quote",
    floatTelegram: "Telegram",
    floatWhatsapp: "WhatsApp",

    popupLabel: "Before you go",
    popupTitleA: "GET A FAST",
    popupTitleB: "QUOTE",
    popupDesc:
      "Leave your contact details and we will quickly get back to you about your China shipment.",
    popupBtn: "Get quote",
  },
} as const;

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ru");
  const [scrolled, setScrolled] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const [calcMode, setCalcMode] = useState<CalcMode>("transport");
  const [calcCountry, setCalcCountry] = useState<CalcCountry>("uzbekistan");
  const [calcCurrency, setCalcCurrency] = useState<CalcCurrency>("usd");
  const [calcWeight, setCalcWeight] = useState("");
  const [calcVolume, setCalcVolume] = useState("");
  const [calcPrice, setCalcPrice] = useState<number | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactCargoType, setContactCargoType] = useState("");
  const [contactDirection, setContactDirection] = useState("");
  const [contactComment, setContactComment] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");
  const [contactTouched, setContactTouched] = useState({ name: false, phone: false });
  const [calcFeedback, setCalcFeedback] = useState("");
  const [heroScramble, setHeroScramble] = useState(false);
  const t = copy[lang];
  const contactNameError =
    contactTouched.name && contactName.trim().length < 2
      ? lang === "ru"
        ? "Введите имя — минимум 2 символа"
        : "Enter your name — at least 2 characters"
      : "";
  const contactPhoneError =
    contactTouched.phone && contactPhone.trim().length < 4
      ? lang === "ru"
        ? "Укажите телефон или Telegram"
        : "Enter phone or Telegram"
      : "";
  const isContactValid = contactName.trim().length >= 2 && contactPhone.trim().length >= 4;

  const getDeliveryTypeLabel = () => {
  if (calcMode === "transport") {
    return lang === "ru" ? "Транспортная доставка" : "Ground transport";
  }

  if (calcMode === "air") {
    return lang === "ru" ? "Авиадоставка" : "Air cargo";
  }

  return lang === "ru" ? "Морская доставка" : "Sea freight";
};

const getCountryLabel = () => {
  const labels: Record<CalcCountry, string> = {
    russia: lang === "ru" ? "Россия" : "Russia",
    uzbekistan: lang === "ru" ? "Узбекистан" : "Uzbekistan",
    kazakhstan: lang === "ru" ? "Казахстан" : "Kazakhstan",
    kyrgyzstan: lang === "ru" ? "Кыргызстан" : "Kyrgyzstan",
    tajikistan: lang === "ru" ? "Таджикистан" : "Tajikistan",
    other: lang === "ru" ? "Другая страна" : "Other country",
  };

  return labels[calcCountry];
};

const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setContactTouched({ name: true, phone: true });
  setContactSuccess("");
  setContactError("");

  if (!isContactValid) {
    setContactError(lang === "ru" ? "Заполните имя и контакт" : "Please fill in name and contact");
    return;
  }

  setContactLoading(true);

  const weight = Number(calcWeight);
  const volume = Number(calcVolume);
  const density = weight > 0 && volume > 0 ? weight / volume : null;

  const deliveryType =
    calcMode === "transport"
      ? lang === "ru"
        ? "Транспортная доставка"
        : "Ground transport"
      : calcMode === "air"
      ? lang === "ru"
        ? "Авиадоставка"
        : "Air cargo"
      : lang === "ru"
      ? "Морская доставка"
      : "Sea freight";

  const country =
    calcCountry === "russia"
      ? lang === "ru"
        ? "Россия"
        : "Russia"
      : calcCountry === "uzbekistan"
      ? lang === "ru"
        ? "Узбекистан"
        : "Uzbekistan"
      : calcCountry === "kazakhstan"
      ? lang === "ru"
        ? "Казахстан"
        : "Kazakhstan"
      : calcCountry === "kyrgyzstan"
      ? lang === "ru"
        ? "Кыргызстан"
        : "Kyrgyzstan"
      : calcCountry === "tajikistan"
      ? lang === "ru"
        ? "Таджикистан"
        : "Tajikistan"
      : lang === "ru"
      ? "Другая страна"
      : "Other country";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contactName,
        phone: contactPhone,
        cargoType: contactCargoType,
        direction: contactDirection,
        comment: contactComment,

        deliveryType,
        country,
        weight: calcWeight,
        volume: calcVolume,
        density: density ? density.toFixed(1) : "",

        language: lang,
        sourceForm:
          calcWeight || calcVolume ? "calculator_contact_form" : "contact_form",
        pageUrl: window.location.href,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setContactSuccess(lang === "ru" ? "Спасибо, заявка отправлена. Мы свяжемся скоро." : "Thank you, your request is sent. We will contact you soon.");
      setContactName("");
      setContactPhone("");
      setContactCargoType("");
      setContactDirection("");
      setContactComment("");
      setContactTouched({ name: false, phone: false });
    } else {
      setContactError(lang === "ru" ? "Ошибка отправки" : "Send error");
    }
  } catch (error) {
    setContactError(lang === "ru" ? "Ошибка соединения" : "Connection error");
  } finally {
    setContactLoading(false);
  }
};
  useEffect(() => {
    const saved = localStorage.getItem("nomad-lang");
    if (saved === "ru" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("nomad-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaderHidden(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroScramble(true), 2450);
    return () => window.clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    const magneticItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".btn, .nav-cta, .float-btn, .services-featured-btn, .why-premium-bottom-btn, .calc-v2-result-cta"
      )
    );

    const handleMove = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      target.style.setProperty("--magnet-x", `${x * 0.16}px`);
      target.style.setProperty("--magnet-y", `${y * 0.16}px`);
    };

    const handleLeave = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.setProperty("--magnet-x", "0px");
      target.style.setProperty("--magnet-y", "0px");
    };

    magneticItems.forEach((item) => {
      item.classList.add("magnetic");
      item.addEventListener("mousemove", handleMove);
      item.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      magneticItems.forEach((item) => {
        item.removeEventListener("mousemove", handleMove);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [lang]);

  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      raf = requestAnimationFrame(animate);
    };

    const addHover = () => ring.classList.add("hovered");
    const removeHover = () => ring.classList.remove("hovered");

    const hoverTargets = Array.from(
      document.querySelectorAll("a, button, input, select, textarea, .service-card, .case-card, .review-card")
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    document.addEventListener("mousemove", move);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", move);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.add("visible");
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    const parallaxItems = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const onScroll = () => {
      const y = window.scrollY;
      parallaxItems.forEach((el) => {
        const speed = Number(el.dataset.parallax || "0.12");
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let shown = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        shown = true;
        setQuoteOpen(true);
      }
    };
    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".counter");
    const animateCounter = (el: HTMLElement) => {
      const rawTarget = Number(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * rawTarget);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && !el.dataset.done) {
            el.dataset.done = "true";
            animateCounter(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, [lang]);

  const tickerItems = useMemo(
    () =>
      lang === "ru"
        ? [
            "Контейнерные перевозки",
            "Авиадоставка",
            "ЖД логистика",
            "Поиск фабрик",
            "Таможенное оформление",
            "Доставка по миру",
            "Снабжение из Китая",
            "FCL / LCL",
          ]
        : [
            "Container Shipping",
            "Air Cargo",
            "Ground Transport",
            "Factory Search",
            "Customs Clearance",
            "Worldwide Delivery",
            "China Sourcing",
            "FCL / LCL",
          ],
    [lang]
  );

  const serviceIcons = [<Plane />, <Ship />, <Truck />, <Search />, <Warehouse />, <CheckCircle2 />];
  const whyIcons = [<ShieldCheck />, <Factory />, <Clock3 />, <BadgeCheck />];

  const convertFromUsd = (amount: number, currency: CalcCurrency) => {
    if (currency === "usd") return amount;
    if (currency === "uzs") return amount * 12700;
    if (currency === "rub") return amount * 92;
    return amount;
  };

  const handleCalc = () => {
    const weight = Number(calcWeight);
    const volume = Number(calcVolume);
    setCalcFeedback("");

    if (!weight || !volume || weight <= 0 || volume <= 0) {
      setCalcPrice(null);
      setCalcFeedback(lang === "ru" ? "Введите вес и объём, чтобы получить расчёт." : "Enter weight and volume to get an estimate.");
      return;
    }

    type RateRow = {
      min: number;
      max?: number;
      transport: number;
      air: number;
      sea: number;
    };

    const tariffs: Record<
      CalcCountry,
      {
        lowDensityM3: Record<CalcMode, number>;
        rates: RateRow[];
      }
    > = {
      russia: {
        lowDensityM3: { transport: 330, air: 260, sea: 120 },
        rates: [
          { min: 400, transport: 1.8, air: 8.5, sea: 1.9 },
          { min: 351, max: 400, transport: 1.9, air: 8.7, sea: 2.0 },
          { min: 301, max: 350, transport: 2.0, air: 8.9, sea: 2.1 },
          { min: 251, max: 300, transport: 2.1, air: 9.1, sea: 2.2 },
          { min: 201, max: 250, transport: 2.2, air: 9.3, sea: 2.3 },
          { min: 180, max: 200, transport: 2.3, air: 9.5, sea: 2.4 },
          { min: 170, max: 180, transport: 2.4, air: 9.7, sea: 2.5 },
          { min: 160, max: 170, transport: 2.5, air: 9.9, sea: 2.6 },
          { min: 150, max: 160, transport: 2.6, air: 10.1, sea: 2.7 },
          { min: 140, max: 150, transport: 2.7, air: 10.3, sea: 2.8 },
          { min: 130, max: 140, transport: 2.8, air: 10.5, sea: 2.9 },
          { min: 120, max: 130, transport: 2.9, air: 10.7, sea: 3.0 },
          { min: 110, max: 120, transport: 3.0, air: 10.9, sea: 3.1 },
          { min: 100, max: 110, transport: 3.1, air: 11.1, sea: 3.2 },
        ],
      },
      uzbekistan: {
        lowDensityM3: { transport: 300, air: 220, sea: 110 },
        rates: [
          { min: 400, transport: 1.7, air: 7.5, sea: 1.7 },
          { min: 300, max: 400, transport: 1.9, air: 7.8, sea: 1.8 },
          { min: 200, max: 300, transport: 2.2, air: 8.2, sea: 2.0 },
          { min: 100, max: 200, transport: 2.6, air: 8.8, sea: 2.3 },
        ],
      },
      kazakhstan: {
        lowDensityM3: { transport: 310, air: 230, sea: 115 },
        rates: [
          { min: 400, transport: 1.75, air: 7.8, sea: 1.8 },
          { min: 300, max: 400, transport: 1.95, air: 8.1, sea: 1.9 },
          { min: 200, max: 300, transport: 2.25, air: 8.5, sea: 2.1 },
          { min: 100, max: 200, transport: 2.65, air: 9.0, sea: 2.4 },
        ],
      },
      kyrgyzstan: {
        lowDensityM3: { transport: 315, air: 240, sea: 118 },
        rates: [
          { min: 400, transport: 1.8, air: 8.2, sea: 1.85 },
          { min: 300, max: 400, transport: 2.0, air: 8.5, sea: 1.95 },
          { min: 200, max: 300, transport: 2.3, air: 8.9, sea: 2.15 },
          { min: 100, max: 200, transport: 2.7, air: 9.4, sea: 2.45 },
        ],
      },
      tajikistan: {
        lowDensityM3: { transport: 320, air: 245, sea: 120 },
        rates: [
          { min: 400, transport: 1.85, air: 8.4, sea: 1.9 },
          { min: 300, max: 400, transport: 2.05, air: 8.7, sea: 2.0 },
          { min: 200, max: 300, transport: 2.35, air: 9.1, sea: 2.2 },
          { min: 100, max: 200, transport: 2.75, air: 9.6, sea: 2.5 },
        ],
      },
      other: {
        lowDensityM3: { transport: 350, air: 280, sea: 135 },
        rates: [
          { min: 400, transport: 2.2, air: 9.5, sea: 2.3 },
          { min: 300, max: 400, transport: 2.5, air: 9.9, sea: 2.5 },
          { min: 200, max: 300, transport: 2.8, air: 10.4, sea: 2.8 },
          { min: 100, max: 200, transport: 3.2, air: 11.0, sea: 3.1 },
        ],
      },
    };

    const density = weight / volume;
    const countryTariff = tariffs[calcCountry];

    let finalUsd = 0;

    if (density < 100) {
      finalUsd = volume * countryTariff.lowDensityM3[calcMode];
    } else {
      const rateRow = countryTariff.rates.find((row) => {
        if (row.max) return density >= row.min && density < row.max;
        return density >= row.min;
      });

      const rate = rateRow
        ? rateRow[calcMode]
        : countryTariff.rates[countryTariff.rates.length - 1][calcMode];

      finalUsd = weight * rate;
    }

    const converted = convertFromUsd(finalUsd, calcCurrency);
    setCalcPrice(Math.round(converted));
  };

  const handlePopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
  
    if (!name || !phone) {
      alert(lang === "ru" ? "Заполните имя и телефон." : "Please enter your name and phone.");
      return;
    }
  
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          cargoType:
  calcWeight || calcVolume
    ? `${getDeliveryTypeLabel()} / ${calcWeight || "?"} кг / ${calcVolume || "?"} м³`
    : lang === "ru"
    ? "Быстрый расчёт"
    : "Fast quote",

direction: `China → ${getCountryLabel()}`,

comment:
  calcWeight || calcVolume
    ? `Заявка из exit-popup. Данные калькулятора: тип доставки — ${getDeliveryTypeLabel()}, страна — ${getCountryLabel()}, вес — ${calcWeight || "не указан"} кг, объём — ${calcVolume || "не указан"} м³, валюта — ${calcCurrency.toUpperCase()}, предварительная цена — ${calcPrice ? calcPrice.toLocaleString("ru-RU") : "не рассчитана"}.`
    : "Заявка из exit-popup без данных калькулятора",

deliveryType: getDeliveryTypeLabel(),
country: getCountryLabel(),
weight: calcWeight,
volume: calcVolume,
density:
  Number(calcWeight) > 0 && Number(calcVolume) > 0
    ? (Number(calcWeight) / Number(calcVolume)).toFixed(1)
    : "",

language: lang,
sourceForm: calcWeight || calcVolume ? "exit_popup_with_calculator" : "exit_popup",
pageUrl: window.location.href,
        }),
      });
  
      if (!res.ok) throw new Error("Request failed");
  
      alert(lang === "ru" ? "Спасибо, свяжемся скоро." : "Thank you, we will contact you soon.");
      form.reset();
      setQuoteOpen(false);
    } catch {
      alert(lang === "ru" ? "Ошибка отправки. Напишите нам в Telegram или WhatsApp." : "Sending error. Please contact us on Telegram or WhatsApp.");
    }
  };

  return (
    <>
      <style jsx global>{`
        .contact-premium-section {
          position: relative;
          overflow: hidden;
        }

        .contact-premium-section::before,
        .contact-premium-section::after {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(70px);
          opacity: 0.22;
          animation: nomadGlowDrift 9s ease-in-out infinite alternate;
        }

        .contact-premium-section::before {
          left: -120px;
          top: 8%;
          background: rgba(212, 175, 119, 0.42);
        }

        .contact-premium-section::after {
          right: -160px;
          bottom: 4%;
          background: rgba(255, 226, 148, 0.26);
          animation-delay: 1.8s;
        }

        .contact-premium-link-card {
          text-decoration: none;
          color: inherit;
          transform: translateZ(0);
        }

        .contact-premium-item,
        .service-card,
        .case-card,
        .review-card,
        .about-premium-card,
        .why-premium-card {
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
        }

        .contact-premium-item:hover,
        .service-card:hover,
        .case-card:hover,
        .review-card:hover,
        .about-premium-card:hover,
        .why-premium-card:hover {
          transform: translateY(-7px) scale(1.015);
          border-color: rgba(212, 175, 119, 0.38);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.38), 0 0 34px rgba(212, 175, 119, 0.12);
        }

        .contact-premium-social,
        .float-btn,
        .nav-cta,
        .btn-primary {
          transition:
            transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.28s ease,
            filter 0.28s ease;
        }

        .contact-premium-social:hover,
        .float-btn:hover,
        .nav-cta:hover,
        .btn-primary:hover {
          transform: translateY(-3px);
          filter: brightness(1.08);
          box-shadow: 0 18px 48px rgba(212, 175, 119, 0.22);
        }

        .wechat-qr-card {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          margin-top: 20px;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 22px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025));
          overflow: hidden;
          box-shadow: 0 22px 65px rgba(0, 0, 0, 0.28);
        }

        .wechat-qr-glow {
          position: absolute;
          inset: auto -30px -50px auto;
          width: 110px;
          height: 110px;
          background: rgba(212, 175, 119, 0.34);
          filter: blur(32px);
          border-radius: 999px;
          animation: nomadPulse 2.8s ease-in-out infinite;
        }

        .wechat-qr-img {
          position: relative;
          z-index: 1;
          width: 132px;
          height: 132px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.13);
        }

        .wechat-qr-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: rgba(255, 255, 255, 0.86);
        }

        .wechat-qr-text span {
          color: #d4af77;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .wechat-qr-text small {
          color: rgba(255, 255, 255, 0.58);
          font-size: 13px;
        }

        .contact-route-core {
          animation: nomadFloat 5.5s ease-in-out infinite;
        }

        .contact-route-ring {
          animation: nomadSpin 12s linear infinite;
        }

        .contact-route-ring.ring-b {
          animation-duration: 17s;
          animation-direction: reverse;
        }

        .contact-route-ring.ring-c {
          animation-duration: 22s;
        }

        .contact-route-dot {
          animation: nomadPulse 2s ease-in-out infinite;
        }

        .contact-route-badge {
          animation: nomadFloat 4.6s ease-in-out infinite;
        }

        .contact-route-badge.badge-bottom {
          animation-delay: 1s;
        }

        .hero-glow,
        .calc-v2-result-glow {
          animation: nomadGlowDrift 7s ease-in-out infinite alternate;
        }

        .ticker-inner {
          animation-duration: 28s;
        }

        .float-cta {
          animation: nomadFloatSmall 4s ease-in-out infinite;
        }

        @keyframes nomadFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }

        @keyframes nomadFloatSmall {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -6px, 0); }
        }

        @keyframes nomadPulse {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        @keyframes nomadSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes nomadGlowDrift {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.18; }
          100% { transform: translate3d(32px, -24px, 0) scale(1.12); opacity: 0.34; }
        }

        @media (max-width: 760px) {
          .wechat-qr-card {
            width: 100%;
            justify-content: flex-start;
          }

          .wechat-qr-img {
            width: 118px;
            height: 118px;
          }
        }
      `}</style>

      <div className="cursor-dot" />
      <div className="cursor-ring" />

      <div id="loader" className={loaderHidden ? "hidden" : ""}>
        <div className="loader-logo">
          NOMAD <span>CARGO</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
        <div className="loader-text">From China to the World</div>
      </div>

      <nav className={scrolled ? "scrolled" : ""}>
  <div className="nav-inner">
  <a href="#hero" className="nav-logo">
  <img src="/brand/logo.png" alt="Nomad Cargo" className="nav-logo-img" />
  <span className="nav-logo-text">
    NOMAD <span>CARGO</span>
  </span>
</a>

    <div className="nav-center">
      <ul className="nav-links">
        <li><a href="#why">{t.navWhy}</a></li>
        <li><a href="#services">{t.navServices}</a></li>
        <li><a href="#how">{t.navHow}</a></li>
        <li><a href="#cases">{t.navCases}</a></li>
      </ul>
    </div>

    <div className="nav-actions">
      <a href="#contact" className="nav-cta">{t.navContact}</a>

      <div className="lang-switch">
        <button
          className={lang === "ru" ? "active" : ""}
          onClick={() => setLang("ru")}
          type="button"
        >
          RU
        </button>
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => setLang("en")}
          type="button"
        >
          EN
        </button>
      </div>
    </div>
  </div>
</nav>

      <main>
        <div className="cargo-motion-layer" aria-hidden="true">
          <div className="cargo-motion-object cargo-plane" data-parallax="-0.035"><Plane /></div>
          <div className="cargo-motion-object cargo-truck" data-parallax="0.055"><Truck /></div>
          <div className="cargo-motion-object cargo-box" data-parallax="0.025"><Package /></div>
          <div className="cargo-motion-route route-one" />
          <div className="cargo-motion-route route-two" />
        </div>

        <section id="hero">
          <div className="hero-video-wrap">
            <video autoPlay muted loop playsInline preload="auto">
              <source src="/hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="hero-overlay" />
          <div className="hero-noise" />
          <div className="hero-glow hero-glow-1" data-parallax="0.05" />
          <div className="hero-glow hero-glow-2" data-parallax="0.09" />

          <div className="hero-content">
            <div className="hero-label">{t.heroLabel}</div>
            <h1 className={`hero-title ${heroScramble ? "scramble-ready" : "scramble-loading"}`}>
              <span className="scramble-line">{t.heroTitle1}</span> <br />
              <span className="scramble-line">{t.heroTitle2}</span> <span className="gold scramble-line">{t.heroTitleGold}</span>
            </h1>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="hero-btns">
              <a href="#calculator" className="btn btn-primary">
                {t.heroBtnCalc} <ArrowRight size={18} />
              </a>
              <a href="#services" className="btn btn-outline">
                {t.heroBtnServices}
              </a>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-item">
              <div className="hero-stat-num"><span className="counter" data-target="97">0</span></div>
              <div className="hero-stat-label">{t.heroCountries}</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num"><span className="counter" data-target="24" data-suffix="/7">0</span></div>
              <div className="hero-stat-label">{t.heroSupport}</div>
            </div>
            <div className="hero-stat-item">
              <div className="hero-stat-num"><span className="counter" data-target="11" data-suffix="+">0</span></div>
              <div className="hero-stat-label">{t.heroYears}</div>
            </div>
          </div>

          <div className="hero-scroll-hint">
            <div className="scroll-line" />
            <div className="scroll-text">Scroll</div>
          </div>
        </section>

        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div className="ticker-item" key={`${item}-${index}`}>
                {item} <span className="ticker-dot">•</span>
              </div>
            ))}
          </div>
        </div>

        <section id="why" className="section why-section-premium">
  <div className="why-premium-layout">
    <div className="why-premium-left reveal" data-reveal="left">
      <div className="section-label">{t.whyLabel}</div>
      <div className="gold-line" />
      <h2 className="why-premium-title">
        {t.whyTitleA}
        <br />
        <span>{t.whyTitleB}</span>
      </h2>

      <p className="why-premium-sub">
        {lang === "ru"
          ? "Мы не просто двигаем груз. Мы выстраиваем логистическую систему, на которую можно опереться: с прозрачностью, контролем и премиальным уровнем сервиса."
          : "We do more than move cargo. We build a logistics system you can rely on, with transparency, control, and premium-level service."}
      </p>

      <div className="why-premium-stats">
        <div className="why-premium-stat">
          <div className="why-premium-stat-num">
            <span className="counter" data-target="10" data-suffix="+">0</span>
          </div>
          <div className="why-premium-stat-text">
            {lang === "ru" ? "лет опыта" : "years of experience"}
          </div>
        </div>

        <div className="why-premium-stat">
          <div className="why-premium-stat-num">
            <span className="counter" data-target="97" data-suffix="+">0</span>
          </div>
          <div className="why-premium-stat-text">
            {lang === "ru" ? "стран мира" : "countries worldwide"}
          </div>
        </div>

        <div className="why-premium-stat">
          <div className="why-premium-stat-num">
            <span className="counter" data-target="5000" data-suffix="+">0</span>
          </div>
          <div className="why-premium-stat-text">
            {lang === "ru" ? "успешных отправок" : "successful shipments"}
          </div>
        </div>

        <div className="why-premium-stat">
          <div className="why-premium-stat-num">
            <span className="counter" data-target="24" data-suffix="/7">0</span>
          </div>
          <div className="why-premium-stat-text">
            {lang === "ru" ? "поддержка и контроль" : "support and tracking"}
          </div>
        </div>
      </div>
    </div>

    <div className="why-premium-right">
      {t.whyItems.map((item, index) => (
        <div
          key={item.num}
          className={`why-premium-card reveal reveal-delay-${(index % 4) + 1}`}
          data-reveal={index % 2 === 0 ? "up" : "zoom"}
        >
          <div className="why-premium-card-top">
            <div className="why-premium-icon">
              {whyIcons[index]}
            </div>
            <div className="why-premium-number">{item.num}</div>
          </div>

          <h3 className="why-premium-card-title">{item.title}</h3>
          <p className="why-premium-card-desc">{item.desc}</p>

          <div className="why-premium-arrow">→</div>
        </div>
      ))}
    </div>
  </div>

  <div className="why-premium-bottom reveal" data-reveal="up">
    <div className="why-premium-bottom-left">
      <div className="why-premium-bottom-icon">◌</div>
      <div>
        <div className="why-premium-bottom-title">
          {lang === "ru" ? "Есть задача по доставке?" : "Need a shipping solution?"}
        </div>
        <div className="why-premium-bottom-text">
          {lang === "ru"
            ? "Наша команда поможет подобрать оптимальный маршрут, формат и стоимость."
            : "Our team will help you choose the best route, format, and shipping cost."}
        </div>
      </div>
    </div>

    <a href="#contact" className="why-premium-bottom-btn">
      {lang === "ru" ? "Получить расчёт" : "Get a quote"}
      <span>→</span>
    </a>
  </div>
</section>

<section id="services" className="section services-premium-section">
  <div className="services-premium-head reveal" data-reveal="up">
    <div className="services-premium-head-left">
      <div className="section-label">{lang === "ru" ? "Услуги" : "Services"}</div>
      <div className="gold-line" />
      <h2 className="section-title services-premium-title">
        {lang === "ru" ? "НАШИ " : "OUR "}
        <span className="gold">{lang === "ru" ? "УСЛУГИ" : "SERVICES"}</span>
      </h2>
    </div>

    <div className="services-premium-head-right">
      <p className="section-sub services-premium-sub">
        {lang === "ru"
          ? "Полный цикл работы с Китаем: от поиска товара и выкупа до проверки качества и доставки под ключ."
          : "A full China sourcing cycle: from supplier search and purchasing to inspection and turnkey delivery."}
      </p>
    </div>
  </div>

  <div className="services-premium-grid">
    {[
      {
        n: "01",
        icon: <Search />,
        name: lang === "ru" ? "Поиск товара и поставщика" : "Product & Supplier Search",
        desc:
          lang === "ru"
            ? "Найдём нужный товар, проверим поставщика и согласуем лучшие условия сотрудничества."
            : "We find the right product, verify the supplier, and negotiate the best cooperation terms.",
        tags: lang === "ru" ? ["Поиск", "Проверка", "Согласование"] : ["Search", "Verification", "Terms"],
      },
      {
        n: "02",
        icon: <MessageCircle />,
        name: lang === "ru" ? "Выкуп и переговоры" : "Purchasing & Negotiation",
        desc:
          lang === "ru"
            ? "Организуем выкуп без переплат, рисков и языкового барьера."
            : "We handle purchasing without overpaying, hidden risks, or language barriers.",
        tags: lang === "ru" ? ["Выкуп", "Переговоры", "Контроль"] : ["Purchase", "Negotiation", "Control"],
      },
      {
        n: "03",
        icon: <BadgeCheck />,
        name: lang === "ru" ? "Проверка качества" : "Quality Inspection",
        desc:
          lang === "ru"
            ? "Фото, видео и инспекция товара перед отправкой, чтобы избежать неприятных сюрпризов."
            : "Photo, video, and pre-shipment inspection to avoid unpleasant surprises.",
        tags: lang === "ru" ? ["Фото", "Видео", "Инспекция"] : ["Photo", "Video", "Inspection"],
      },
      {
        n: "04",
        icon: <Ship />,
        name: lang === "ru" ? "Доставка под ключ" : "Turnkey Delivery",
        desc:
          lang === "ru"
            ? "Авиа, авто и море — под ваш бюджет, сроки и формат груза."
            : "Air, auto, and sea shipping tailored to your budget, timing, and cargo type.",
        tags: lang === "ru" ? ["Авиа", "Авто", "Море"] : ["Air", "Auto", "Sea"],
      },
      {
        n: "05",
        icon: <Package />,
        name: lang === "ru" ? "Выкуп с маркетплейсов Китая" : "Chinese Marketplace Purchasing",
        desc:
          lang === "ru"
            ? "Организуем выкуп товаров с 1688, Alibaba, Taobao, Poizon и других платформ."
            : "We arrange purchasing from 1688, Alibaba, Taobao, Poizon, and other platforms.",
        tags: ["1688", "Alibaba", "Taobao", "Poizon"],
      },
    ].map((service, index) => (
      <div
        key={service.n}
        className={`service-card service-card-premium reveal-scale reveal-delay-${(index % 4) + 1}`}
        data-reveal={index % 2 === 0 ? "up" : "zoom"}
      >
        <div className="service-number">{service.n}</div>
        <div className="service-icon-wrap">{service.icon}</div>
        <h3 className="service-name">{service.name}</h3>
        <p className="service-desc">{service.desc}</p>
        <div className="service-tags">
          {service.tags.map((tag) => (
            <span className="service-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>

  <div className="services-featured reveal" data-reveal="up">
    <div className="services-featured-left">
      <div className="services-featured-label">
        {lang === "ru" ? "ПОЛНЫЙ ЦИКЛ" : "FULL CYCLE"}
      </div>

      <h3 className="services-featured-title">
        {lang === "ru"
          ? "КИТАЙ ПОД КЛЮЧ ДЛЯ ВАШЕГО БИЗНЕСА"
          : "CHINA TURNKEY SOLUTIONS FOR YOUR BUSINESS"}
      </h3>

      <p className="services-featured-desc">
        {lang === "ru"
          ? "Мы можем закрыть весь путь целиком: найти товар, проверить поставщика, договориться, выкупить, проверить качество и организовать доставку до вашей страны."
          : "We can handle the entire process: find the product, verify the supplier, negotiate, purchase, inspect quality, and arrange delivery to your country."}
      </p>

      <div className="services-featured-points">
        <div className="services-featured-point">
          <span>01</span>
          {lang === "ru" ? "Поиск и проверка" : "Search & verification"}
        </div>
        <div className="services-featured-point">
          <span>02</span>
          {lang === "ru" ? "Выкуп и контроль" : "Purchase & control"}
        </div>
        <div className="services-featured-point">
          <span>03</span>
          {lang === "ru" ? "Доставка до вас" : "Delivery to you"}
        </div>
      </div>
    </div>

    <div className="services-featured-right">
      <div className="services-featured-mini">
        <div className="services-featured-mini-num">1688+</div>
        <div className="services-featured-mini-text">
          {lang === "ru" ? "платформы и поставщики" : "platforms & suppliers"}
        </div>
      </div>

      <div className="services-featured-mini">
        <div className="services-featured-mini-num">24/7</div>
        <div className="services-featured-mini-text">
          {lang === "ru" ? "сопровождение сделки" : "deal support"}
        </div>
      </div>

      <a href="#contact" className="services-featured-btn">
        {lang === "ru" ? "Получить консультацию" : "Get consultation"}
        <span>→</span>
      </a>
    </div>
  </div>
</section>


<section id="calculator" className="section">
  <div className="calc-v2">
    <div className="calc-v2-left reveal" data-reveal="left">
      <div className="section-label">
        {lang === "ru" ? "Калькулятор" : "Calculator"}
      </div>
      <div className="gold-line" />

      <h2 className="calc-v2-title">
        {lang === "ru" ? "РАССЧИТАЙТЕ " : "CALCULATE "}
        <span>{lang === "ru" ? "СТОИМОСТЬ" : "COST"}</span>
      </h2>

      <p className="calc-v2-sub">
        {lang === "ru"
          ? "Быстрый ориентировочный расчёт доставки из Китая. Укажите тип доставки, страну, вес и объём, чтобы получить предварительную стоимость."
          : "A fast preliminary shipping estimate from China. Select delivery type, country, weight, and volume to get an estimated cost."}
      </p>

      <div className="calc-v2-points">
        <div className="calc-v2-point">
          <span>01</span>
          {lang === "ru"
            ? "Предварительная стоимость за несколько секунд"
            : "Estimated cost in a few seconds"}
        </div>
        <div className="calc-v2-point">
          <span>02</span>
          {lang === "ru"
            ? "Учитываются направление, вес и объём"
            : "Direction, weight, and volume are included"}
        </div>
        <div className="calc-v2-point">
          <span>03</span>
          {lang === "ru"
            ? "Точный расчёт уточняется менеджером"
            : "Final quote is confirmed by manager"}
        </div>
      </div>

      <div className="calc-v2-mini-stats">
        <div className="calc-v2-mini-card">
          <div className="calc-v2-mini-num">24/7</div>
          <div className="calc-v2-mini-text">
            {lang === "ru" ? "быстрый ответ" : "fast response"}
          </div>
        </div>

        <div className="calc-v2-mini-card">
          <div className="calc-v2-mini-num">B2B</div>
          <div className="calc-v2-mini-text">
            {lang === "ru" ? "премиум сервис" : "premium service"}
          </div>
        </div>
      </div>
    </div>

    <div className="calc-v2-right reveal-scale" data-reveal="zoom">
      <div className="calc-v2-form">
        <div className="calc-v2-form-head">
          <div className="calc-v2-form-label">
            {lang === "ru" ? "Параметры расчёта" : "Quote details"}
          </div>
          <div className="calc-v2-form-line" />
        </div>

        <div className="calc-row calc-row-3">
          <div className="form-group">
            <label className="form-label">
              {lang === "ru" ? "Тип доставки" : "Delivery type"}
            </label>
            <select
              className="form-control"
              value={calcMode}
              onChange={(e) => setCalcMode(e.target.value as CalcMode)}
            >
              <option value="transport">
                {lang === "ru" ? "Транспортная" : "Ground transport"}
              </option>
              <option value="air">
                {lang === "ru" ? "Авиадоставка" : "Air cargo"}
              </option>
              <option value="sea">
                {lang === "ru" ? "Море" : "Sea freight"}
              </option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === "ru" ? "Страна" : "Country"}
            </label>
            <select
              className="form-control"
              value={calcCountry}
              onChange={(e) => setCalcCountry(e.target.value as CalcCountry)}
            >
              <option value="russia">{lang === "ru" ? "Россия" : "Russia"}</option>
              <option value="uzbekistan">
                {lang === "ru" ? "Узбекистан" : "Uzbekistan"}
              </option>
              <option value="kazakhstan">
                {lang === "ru" ? "Казахстан" : "Kazakhstan"}
              </option>
              <option value="kyrgyzstan">
                {lang === "ru" ? "Кыргызстан" : "Kyrgyzstan"}
              </option>
              <option value="tajikistan">
                {lang === "ru" ? "Таджикистан" : "Tajikistan"}
              </option>
              <option value="other">
                {lang === "ru" ? "Другая страна" : "Other country"}
              </option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === "ru" ? "Валюта" : "Currency"}
            </label>
            <select
              className="form-control"
              value={calcCurrency}
              onChange={(e) => setCalcCurrency(e.target.value as CalcCurrency)}
            >
              <option value="usd">USD</option>
              <option value="uzs">UZS</option>
              <option value="rub">RUB</option>
            </select>
          </div>
        </div>

        <div className="calc-row">
          <div className="form-group">
            <label className="form-label">
              {lang === "ru" ? "Вес (кг)" : "Weight (kg)"}
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              step="0.1"
              placeholder={lang === "ru" ? "Например: 120" : "For example: 120"}
              value={calcWeight}
              onChange={(e) => setCalcWeight(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              {lang === "ru" ? "Объём (м³)" : "Volume (m³)"}
            </label>
            <input
              className="form-control"
              type="number"
              min="0"
              step="0.01"
              placeholder={lang === "ru" ? "Например: 2.5" : "For example: 2.5"}
              value={calcVolume}
              onChange={(e) => setCalcVolume(e.target.value)}
            />
          </div>
        </div>

        <div className="calc-v2-actions">
          <button
            type="button"
            className="btn btn-primary calc-v2-btn"
            onClick={handleCalc}
          >
            {lang === "ru" ? "Рассчитать стоимость" : "Calculate cost"}
          </button>

          <div className="calc-v2-helper">
            {lang === "ru"
              ? "Это предварительный расчёт, чтобы быстро сориентироваться по доставке."
              : "This is a preliminary estimate to quickly understand the shipping cost."}
          </div>
        </div>

        {calcFeedback && (
          <div className="calc-v2-feedback">{calcFeedback}</div>
        )}

        {calcPrice !== null && (
          <div className="calc-v2-result visible">
            <div className="calc-v2-result-glow" />

            <div className="calc-v2-result-head">
              <div>
                <div className="calc-v2-result-label">
                  {lang === "ru" ? "Предварительный расчёт" : "Preliminary quote"}
                </div>

                <div className="calc-v2-result-price">
                  {calcPrice.toLocaleString("ru-RU")}{" "}
                  {calcCurrency === "usd"
                    ? "USD"
                    : calcCurrency === "uzs"
                    ? "UZS"
                    : "RUB"}
                </div>
              </div>

              <div className="calc-v2-result-badge">
                {lang === "ru" ? "≈ ориентир" : "≈ estimate"}
              </div>
            </div>

            <div className="calc-v2-result-meta">
              <div className="calc-v2-result-chip">
                {calcMode === "transport"
                  ? lang === "ru"
                    ? "Транспортная доставка"
                    : "Ground transport"
                  : calcMode === "air"
                  ? lang === "ru"
                    ? "Авиадоставка"
                    : "Air cargo"
                  : lang === "ru"
                  ? "Морская доставка"
                  : "Sea freight"}
              </div>

              <div className="calc-v2-result-chip">
                {lang === "ru" ? "Китай → " : "China → "}
                {calcCountry === "russia"
                  ? lang === "ru"
                    ? "Россия"
                    : "Russia"
                  : calcCountry === "uzbekistan"
                  ? lang === "ru"
                    ? "Узбекистан"
                    : "Uzbekistan"
                  : calcCountry === "kazakhstan"
                  ? lang === "ru"
                    ? "Казахстан"
                    : "Kazakhstan"
                  : calcCountry === "kyrgyzstan"
                  ? lang === "ru"
                    ? "Кыргызстан"
                    : "Kyrgyzstan"
                  : calcCountry === "tajikistan"
                  ? lang === "ru"
                    ? "Таджикистан"
                    : "Tajikistan"
                  : lang === "ru"
                  ? "другая страна"
                  : "other country"}
              </div>
            </div>

            <div className="calc-v2-result-note">
              {lang === "ru"
                ? "Финальная цена зависит от типа груза, упаковки, плотности, маршрута и документов. Оставьте заявку — менеджер уточнит точную стоимость."
                : "Final cost depends on cargo type, packaging, density, route, and documents. Submit a request and our manager will confirm the exact quote."}
            </div>

            <div className="calc-v2-result-bottom">
              <a href="#contact" className="calc-v2-result-cta">
                {lang === "ru" ? "Получить точный расчёт" : "Get exact quote"}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

<section id="how" className="section how-premium-section">
  <div className="how-premium-top reveal" data-reveal="up">
    <div className="how-premium-top-left">
      <div className="section-label">{lang === "ru" ? "Процесс" : "Process"}</div>
      <div className="gold-line" />
      <h2 className="section-title how-premium-title">
        {lang === "ru" ? "КАК МЫ " : "HOW WE "}
        <span className="gold">{lang === "ru" ? "РАБОТАЕМ" : "WORK"}</span>
      </h2>
    </div>

    <div className="how-premium-top-right">
      <p className="section-sub how-premium-sub">
        {lang === "ru"
          ? "Понятный, прозрачный и управляемый процесс от первого запроса до финальной доставки."
          : "A clear, transparent, and manageable process from the first request to final delivery."}
      </p>
    </div>
  </div>

  <div className="how-premium-layout">
    <div className="how-premium-steps">
      {[
        {
          step: lang === "ru" ? "Шаг 01" : "Step 01",
          title: lang === "ru" ? "Запрос и консультация" : "Request & Consultation",
          desc:
            lang === "ru"
              ? "Вы описываете задачу, объём, сроки и направление. Мы подбираем рабочую модель доставки."
              : "You describe the task, volume, timing, and route. We choose the right shipping model.",
        },
        {
          step: lang === "ru" ? "Шаг 02" : "Step 02",
          title: lang === "ru" ? "Поиск и проверка" : "Search & Verification",
          desc:
            lang === "ru"
              ? "При необходимости находим поставщика, проверяем фабрику и согласовываем детали закупки."
              : "If needed, we find the supplier, verify the factory, and align all procurement details.",
        },
        {
          step: lang === "ru" ? "Шаг 03" : "Step 03",
          title: lang === "ru" ? "Выкуп и консолидация" : "Purchase & Consolidation",
          desc:
            lang === "ru"
              ? "Организуем выкуп, принимаем товар на склад, объединяем партии и готовим к отправке."
              : "We arrange purchasing, receive goods at the warehouse, consolidate shipments, and prepare dispatch.",
        },
        {
          step: lang === "ru" ? "Шаг 04" : "Step 04",
          title: lang === "ru" ? "Проверка и отправка" : "Inspection & Dispatch",
          desc:
            lang === "ru"
              ? "Проверяем товар, упаковку и документы, после чего отправляем оптимальным маршрутом."
              : "We inspect the goods, packaging, and documents, then dispatch via the optimal route.",
        },
        {
          step: lang === "ru" ? "Шаг 05" : "Step 05",
          title: lang === "ru" ? "Доставка и сопровождение" : "Delivery & Support",
          desc:
            lang === "ru"
              ? "Контролируем движение груза и держим вас в курсе до самого получения."
              : "We monitor cargo movement and keep you updated until final receipt.",
        },
      ].map((item, index) => (
        <div
          key={item.step}
          className={`how-premium-step reveal reveal-delay-${(index % 4) + 1}`}
          data-reveal={index % 2 === 0 ? "left" : "up"}
        >
          <div className="how-premium-step-line" />
          <div className="how-premium-step-dot" />
          <div className="how-premium-step-inner">
            <div className="how-premium-step-label">{item.step}</div>
            <h3 className="how-premium-step-title">{item.title}</h3>
            <p className="how-premium-step-desc">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="how-premium-visual reveal-scale" data-reveal="zoom">
      <div className="how-premium-orbit">
        <div className="how-premium-orbit-ring ring-1" />
        <div className="how-premium-orbit-ring ring-2" />
        <div className="how-premium-orbit-ring ring-3" />
        <div className="how-premium-orbit-ring ring-4" />

        <div className="how-premium-core">
          <div className="how-premium-core-glow" />
          <div className="how-premium-core-content">
            <div className="how-premium-core-number">5</div>
            <div className="how-premium-core-text">
              {lang === "ru" ? "ШАГОВ ДО РЕЗУЛЬТАТА" : "STEPS TO RESULT"}
            </div>
          </div>
        </div>

        <div className="how-premium-orbit-dot orbit-dot-1" />
        <div className="how-premium-orbit-dot orbit-dot-2" />
        <div className="how-premium-orbit-dot orbit-dot-3" />

        <div className="how-premium-mini-card mini-card-1">
          <div className="how-premium-mini-num">24/7</div>
          <div className="how-premium-mini-text">
            {lang === "ru" ? "контроль движения" : "shipment tracking"}
          </div>
        </div>

        <div className="how-premium-mini-card mini-card-2">
          <div className="how-premium-mini-num">100%</div>
          <div className="how-premium-mini-text">
            {lang === "ru" ? "прозрачность этапов" : "process visibility"}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="cases" className="section cases-premium-section">
  <div className="cases-premium-head reveal" data-reveal="up">
    <div>
      <div className="section-label">{t.casesLabel}</div>
      <div className="gold-line" />
      <h2 className="section-title">
        {t.casesTitleA} <span className="gold">{t.casesTitleB}</span>
      </h2>
    </div>
    <p className="section-sub">{t.casesSub}</p>
  </div>

  <div className="cases-premium-grid">
    {t.cases.map((item, index) => {
      const icons = [<Plane key="plane" />, <Truck key="truck" />, <Ship key="ship" />];
      const labels =
        lang === "ru"
          ? ["AIR / EXPRESS", "TRUCK / ROUTE", "SEA / CONTAINER"]
          : ["AIR / EXPRESS", "TRUCK / ROUTE", "SEA / CONTAINER"];

      return (
        <div
          className={`case-premium-card reveal-scale reveal-delay-${(index % 4) + 1}`}
          data-reveal={index % 2 === 0 ? "left" : "right"}
          key={item.title}
        >
          <div className="case-premium-top">
            <div className="case-premium-num">CASE 0{index + 1}</div>
            <div className="case-premium-type">{labels[index]}</div>
          </div>

          <div className="case-premium-route-map">
            <div className="case-premium-grid-bg" />
            <div className="case-premium-route-line">
              <span className="route-dot start" />
              <span className="route-dot moving" />
              <span className="route-dot end" />
            </div>

            <div className="case-premium-route-label left">CHINA</div>
            <div className="case-premium-route-label right">
              {item.route.split("→")[1]?.trim() || "WORLD"}
            </div>

            <div className="case-premium-icon">
              {icons[index]}
            </div>
          </div>

          <div className="case-premium-body">
            <div className="case-route">{item.route}</div>
            <div className="case-client">{item.client}</div>

            <h3 className="case-title">{item.title}</h3>

            <div className="case-premium-row">
              <span>{lang === "ru" ? "Груз" : "Cargo"}</span>
              <p>{item.product}</p>
            </div>

            <div className="case-premium-row">
              <span>{lang === "ru" ? "Задача" : "Task"}</span>
              <p>{item.desc}</p>
            </div>

            <div className="case-premium-result">
              <span>{lang === "ru" ? "Результат" : "Result"}</span>
              <p>{item.result}</p>
            </div>

            <div className="case-stats">
              {item.stats.map(([val, label]) => (
                <div key={label}>
                  <div className="case-stat-val">{val}</div>
                  <div className="case-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    })}
  </div>
</section>

        <section id="testimonials" className="section">
          <div className="reveal" data-reveal="up">
            <div className="section-label">{t.testimonialsLabel}</div>
            <div className="gold-line" />
            <h2 className="section-title">
              {t.testimonialsTitleA} <span className="gold">{t.testimonialsTitleB}</span>
            </h2>
            <p className="section-sub">{t.testimonialsSub}</p>
          </div>

          <div className="reviews-grid">
            {t.reviews.map((item, index) => (
              <div
                className={`review-card reveal reveal-delay-${(index % 4) + 1}`}
                data-reveal={index % 2 === 0 ? "left" : "right"}
                key={item.name}
              >
                <div className="review-quote">“</div>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{item.text}</p>
                <div className="review-author">
                  <div className="review-avatar"><span>{item.name[0]}</span></div>
                  <div>
                    <div className="review-name">{item.name}</div>
                    <div className="review-company">{item.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="section faq-premium-section">
          <div className="faq-premium-head reveal" data-reveal="up">
            <div>
              <div className="section-label">{t.faqLabel}</div>
              <div className="gold-line" />
              <h2 className="section-title">
                {t.faqTitleA} <span className="gold">{t.faqTitleB}</span>
              </h2>
            </div>
            <p className="section-sub">{t.faqSub}</p>
          </div>

          <div className="faq-premium-grid">
            {t.faqItems.map(([question, answer], index) => (
              <details
                className={`faq-premium-item reveal reveal-delay-${(index % 4) + 1}`}
                data-reveal="up"
                key={question}
                open={index === 0}
              >
                <summary>
                  <span>{question}</span>
                  <ChevronRight size={20} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="about" className="section about-premium-section">
  <div className="about-premium-layout">
    <div className="about-premium-left reveal" data-reveal="left">
      <div className="section-label">{lang === "ru" ? "О компании" : "About"}</div>
      <div className="gold-line" />
      <h2 className="about-premium-title">
        {lang === "ru" ? "СОЗДАНО ДЛЯ" : "BUILT FOR"} <br />
        <span>{lang === "ru" ? "СЕРЬЁЗНОГО БИЗНЕСА" : "SERIOUS BUSINESS"}</span>
      </h2>

      <p className="about-premium-sub">
        {lang === "ru"
          ? "Nomad Cargo — логистический партнёр для компаний, которым нужен не хаос в поставках, а система. Мы помогаем бизнесу выстраивать поставки из Китая уверенно, предсказуемо и с сильным сервисом."
          : "Nomad Cargo is a logistics partner for companies that need structure instead of chaos. We help businesses build supply from China with confidence, predictability, and strong service."}
      </p>

      <div className="about-premium-note">
        {lang === "ru"
          ? "Мы не просто доставляем груз — мы выстраиваем рабочую модель поставок."
          : "We do more than ship cargo — we build a reliable supply model."}
      </div>
    </div>

    <div className="about-premium-right reveal-scale" data-reveal="zoom">
      <div className="about-premium-bg-number">11+</div>

      <div className="about-premium-cards">
        <div className="about-premium-card">
          <div className="about-premium-card-value">
            <span className="counter" data-target="97" data-suffix="+">0</span>
          </div>
          <div className="about-premium-card-label">
            {lang === "ru" ? "стран" : "countries"}
          </div>
        </div>

        <div className="about-premium-card">
          <div className="about-premium-card-value">
            <span className="counter" data-target="250" data-suffix="+">0</span>
          </div>
          <div className="about-premium-card-label">
            {lang === "ru" ? "отправок" : "shipments"}
          </div>
        </div>

        <div className="about-premium-card">
          <div className="about-premium-card-value">24/7</div>
          <div className="about-premium-card-label">
            {lang === "ru" ? "поддержка" : "support"}
          </div>
        </div>

        <div className="about-premium-card">
          <div className="about-premium-card-value">100%</div>
          <div className="about-premium-card-label">
            {lang === "ru" ? "фокус на результат" : "focus on result"}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="about-premium-strip reveal" data-reveal="up">
    <div className="about-premium-strip-label">
      {lang === "ru"
        ? "Нам доверяют импортёры, бренды и продавцы маркетплейсов"
        : "Trusted by importers, brands, and marketplace sellers"}
    </div>

    <div className="about-premium-strip-items">
      <span>B2B IMPORT</span>
      <span>E-COMMERCE</span>
      <span>RETAIL</span>
      <span>WHOLESALE</span>
      <span>MARKETPLACES</span>
    </div>
  </div>
</section>

<section id="contact" className="section contact-premium-section">
  <div className="contact-premium-layout">
    <div className="contact-premium-left reveal" data-reveal="left">
      <div className="section-label">{t.contactLabel}</div>
      <div className="gold-line" />
      <h2 className="contact-premium-title">
        {lang === "ru" ? "ДАВАЙТЕ ДВИГАТЬ" : "LET’S MOVE"} <br />
        <span>{lang === "ru" ? "ВАШ ГРУЗ" : "YOUR CARGO"}</span>
      </h2>

      <p className="contact-premium-sub">
        {lang === "ru"
          ? "Оставьте заявку, и мы подберём оптимальный маршрут, сроки и формат доставки под задачу бизнеса."
          : "Leave a request and we will choose the best route, timing, and shipping format for your business needs."}
      </p>

      <div className="contact-premium-info contact-premium-info-upgraded">
        <a className="contact-premium-item contact-premium-link-card" href="https://wa.me/8619878638724" target="_blank" rel="noreferrer">
          <div className="contact-premium-icon"><MessageCircle size={18} /></div>
          <div>
            <div className="contact-premium-item-label">WhatsApp</div>
            <div className="contact-premium-item-value">+86 198 7863 8724</div>
          </div>
        </a>

        <a className="contact-premium-item contact-premium-link-card" href="https://t.me/kamronnomad" target="_blank" rel="noreferrer">
          <div className="contact-premium-icon"><Send size={18} /></div>
          <div>
            <div className="contact-premium-item-label">Telegram</div>
            <div className="contact-premium-item-value">@kamronnomad</div>
          </div>
        </a>

        <div className="contact-premium-item">
          <div className="contact-premium-icon"><Phone size={18} /></div>
          <div>
            <div className="contact-premium-item-label">WeChat</div>
            <div className="contact-premium-item-value">+86 198 7863 8724</div>
          </div>
        </div>
      </div>

      <div className="contact-premium-socials">
        <a className="contact-premium-social" href="https://t.me/kamronnomad" target="_blank" rel="noreferrer">
          <Send size={16} />
          Telegram
        </a>

        <a className="contact-premium-social" href="https://wa.me/8619878638724" target="_blank" rel="noreferrer">
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>

      <div
  className="wechat-qr-card reveal-scale"
  data-reveal="zoom"
  style={{
    marginTop: 34,
    padding: "28px",
    borderRadius: "34px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(212,175,55,0.08))",
    border: "1px solid rgba(212,175,55,0.14)",
    backdropFilter: "blur(18px)",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    maxWidth: "620px",
    position: "relative",
    overflow: "hidden",
  }}
>
  <div className="wechat-qr-glow" />

  <img
    src="/brand/wechat-qr.jpg"
    alt="WeChat QR"
    style={{
      width: "260px",
      borderRadius: "28px",
      border: "1px solid rgba(212,175,55,0.22)",
      boxShadow: `
        0 0 60px rgba(212,175,55,0.18),
        0 20px 80px rgba(0,0,0,0.45)
      `,
      transition: "all 0.5s ease",
      position: "relative",
      zIndex: 2,
    }}
  />

  <div style={{ position: "relative", zIndex: 2 }}>
    <div
      style={{
        color: "#d4af77",
        fontSize: "32px",
        letterSpacing: "4px",
        marginBottom: "12px",
        fontWeight: 700,
      }}
    >
      WECHAT QR
    </div>

    <div
      style={{
        color: "rgba(255,255,255,0.72)",
        fontSize: "22px",
        lineHeight: 1.7,
        maxWidth: "240px",
      }}
    >
      {lang === "ru"
        ? "Сканируйте для быстрой связи"
        : "Scan to connect instantly"}
    </div>
  </div>
</div>
    </div>

    <div className="contact-premium-center reveal-scale" data-reveal="zoom">
      <div className="contact-route-core">
        <div className="contact-route-ring ring-a" />
        <div className="contact-route-ring ring-b" />
        <div className="contact-route-ring ring-c" />

        <div className="contact-route-line">
          <div className="contact-route-dot dot-left" />
          <div className="contact-route-dot dot-center" />
          <div className="contact-route-dot dot-right" />
        </div>

        <div className="contact-route-label label-left">CHINA</div>
        <div className="contact-route-label label-right">WORLDWIDE</div>
        <div className="contact-route-glow" />

        <div className="contact-route-badge badge-top">
          <div className="contact-route-badge-num">24/7</div>
          <div className="contact-route-badge-text">
            {lang === "ru" ? "быстрый ответ" : "fast response"}
          </div>
        </div>

        <div className="contact-route-badge badge-bottom">
          <div className="contact-route-badge-num">B2B</div>
          <div className="contact-route-badge-text">
            {lang === "ru" ? "премиум сервис" : "premium service"}
          </div>
        </div>
      </div>
    </div>

    <div className="contact-premium-form-wrap reveal" data-reveal="right">
      <form className="contact-premium-form-panel" onSubmit={handleContactSubmit}>
        <div className="contact-premium-form-grid">
          <div className="form-group">
            <label className="form-label">{lang === "ru" ? "Ваше имя" : "Your name"}</label>
            <input
              className={`form-control ${contactNameError ? "form-control-error" : ""}`}
              placeholder={lang === "ru" ? "Имя" : "Name"}
              value={contactName}
              required
              aria-invalid={Boolean(contactNameError)}
              onBlur={() => setContactTouched((prev) => ({ ...prev, name: true }))}
              onChange={(e) => setContactName(e.target.value)}
            />
            {contactNameError && <div className="form-field-error">{contactNameError}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">{lang === "ru" ? "Телефон / Telegram" : "Phone / Telegram"}</label>
            <input
              className={`form-control ${contactPhoneError ? "form-control-error" : ""}`}
              placeholder="+998..."
              value={contactPhone}
              required
              aria-invalid={Boolean(contactPhoneError)}
              onBlur={() => setContactTouched((prev) => ({ ...prev, phone: true }))}
              onChange={(e) => setContactPhone(e.target.value)}
            />
            {contactPhoneError && <div className="form-field-error">{contactPhoneError}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">{lang === "ru" ? "Тип груза" : "Cargo type"}</label>
            <input
              className="form-control"
              placeholder={lang === "ru" ? "Например: электроника" : "For example: electronics"}
              value={contactCargoType}
              onChange={(e) => setContactCargoType(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{lang === "ru" ? "Направление" : "Route"}</label>
            <input
              className="form-control"
              placeholder="China → Uzbekistan"
              value={contactDirection}
              onChange={(e) => setContactDirection(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{lang === "ru" ? "Комментарий" : "Comment"}</label>
          <textarea
            className="form-control form-textarea"
            placeholder={lang === "ru" ? "Опишите задачу..." : "Describe your request..."}
            value={contactComment}
            onChange={(e) => setContactComment(e.target.value)}
          />
        </div>

        <div className="contact-premium-form-bottom">
          <button type="submit" className="btn btn-primary contact-premium-submit" disabled={contactLoading}>
            {contactLoading
              ? lang === "ru"
                ? "Отправка..."
                : "Sending..."
              : lang === "ru"
              ? "Отправить заявку"
              : "Send request"}
            <ArrowRight size={18} />
          </button>

          <div className="contact-premium-form-note">
            {lang === "ru"
              ? "Ответим быстро и предложим оптимальный вариант."
              : "We reply fast and propose the best option."}
          </div>
        </div>

        {contactSuccess && (
          <div className="contact-status contact-status-success">
            <CheckCircle2 size={18} />
            <span>{contactSuccess}</span>
          </div>
        )}

        {contactError && (
          <div className="contact-status contact-status-error">
            <span>{contactError}</span>
          </div>
        )}
      </form>
    </div>
  </div>
</section>

</main>

      <footer>
        <div className="footer-top">
        <div className="footer-brand">
  <img src="/brand/logo.png" alt="Nomad Cargo" className="footer-logo-img" />

  <div>
    <div className="footer-brand-text">
      NOMAD <span>CARGO</span>
    </div>

    <div className="footer-tagline">From China to the World</div>

    <p className="footer-brand-desc">{t.footerDesc}</p>
  </div>
</div>

          <div>
            <div className="footer-col-title">{t.footerNav}</div>
            <ul className="footer-links">
              <li><a href="#why">{t.navWhy}</a></li>
              <li><a href="#services">{t.navServices}</a></li>
              <li><a href="#cases">{t.navCases}</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">{t.contactLabel}</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">{t.footerServices}</div>
            <ul className="footer-links">
              <li><a href="#services">{lang === "ru" ? "Авиадоставка" : "Air Cargo"}</a></li>
              <li><a href="#services">{lang === "ru" ? "Морские перевозки" : "Sea Freight"}</a></li>
              <li><a href="#services">{lang === "ru" ? "Транспортная доставка" : "Ground Transport"}</a></li>
              <li><a href="#services">{lang === "ru" ? "Поиск фабрик" : "Factory Search"}</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">{t.footerContacts}</div>
            <ul className="footer-links">
              <li><a href="https://wa.me/8619878638724" target="_blank" rel="noreferrer">WhatsApp: +86 198 7863 8724</a></li>
              <li><a href="https://t.me/kamronnomad" target="_blank" rel="noreferrer">Telegram: @kamronnomad</a></li>
              <li><span>WeChat: +86 198 7863 8724</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 NOMAD CARGO. All rights reserved.</div>
          <div className="footer-bottom-links">
            <a href="#">{t.privacy}</a>
            <a href="#">{t.terms}</a>
          </div>
        </div>
      </footer>

      <div className="float-cta">
        <a href="#contact" className="float-btn">
          <Phone />
          <span>{t.floatQuote}</span>
        </a>
        <a href="https://t.me/kamronnomad" target="_blank" rel="noreferrer" className="float-btn float-btn-tg">
          <Send />
          <span>{t.floatTelegram}</span>
        </a>
        <a href="https://wa.me/8619878638724" target="_blank" rel="noreferrer" className="float-btn float-btn-wa">
          <MessageCircle />
          <span>{t.floatWhatsapp}</span>
        </a>
      </div>

      <div className={`popup-overlay ${quoteOpen ? "open" : ""}`}>
        <div className="popup-box">``
          <button className="popup-close" onClick={() => setQuoteOpen(false)} aria-label="Close">
            <X />
          </button>
          <div className="popup-label">{t.popupLabel}</div>
          <h3 className="popup-title">
            {t.popupTitleA} <span>{t.popupTitleB}</span>
          </h3>
          <p className="popup-desc">{t.popupDesc}</p>

          <form className="popup-form" onSubmit={handlePopupSubmit}>
          <input
  name="name"
  className="form-control"
  type="text"
  placeholder={t.namePh}
  required
/>

<input
  name="phone"
  className="form-control"
  type="text"
  placeholder={t.phonePh}
  required
/>
            <button type="submit" className="btn btn-primary">
              {t.popupBtn}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}