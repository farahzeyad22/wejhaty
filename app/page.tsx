"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent } from "react";
import { touristDestinations } from "./tourist-data";
import { foodPlaces } from "./food-data";

type Facility = {
  name: string;
  icon: string;
  description: string;
  category?: string;
  googleQuery?: string;
};

type Review = {
  rating: number;
  message: string;
};

type Language = "ar" | "en";

const englishTranslations: Record<string, string> = {
  "وجهتك": "Your Destination",
  "من الداخل": "From Within",
  "الرئيسية": "Home",
  "استكشف": "Explore",
  "الخدمات": "Services",
  "المعالم": "Landmarks",
  "عن وجهتك": "About",
  "التنقل الرئيسي": "Main navigation",
  "التبديل إلى الإنجليزية": "Switch to English",
  "التبديل إلى العربية": "Switch to Arabic",
  "تفعيل الوضع النهاري": "Enable light mode",
  "تفعيل الوضع الليلي": "Enable dark mode",
  "تسجيل الدخول": "Sign in",
  "تسجيل الدخول غير متاح دون خدمة حسابات.": "Sign-in is unavailable without an account service.",
  "ابحث عن موقع أو خدمة ...": "Search for a place or service...",
  "ابحث عن موقع أو خدمة": "Search for a place or service",
  "تصنيفات الخدمات": "Service categories",
  "الكل": "All",
  "المطاعم": "Restaurants",
  "المطاعم والمقاهي": "Restaurants & Cafes",
  "المقاهي": "Cafes",
  "المواقف": "Parking",
  "دورات المياه": "Restrooms",
  "أماكن الجلوس": "Seating",
  "سهولة الوصول": "Accessibility",
  "المشي والتنقل": "Walking and mobility",
  "أماكن دينية": "Main landmarks",
  "المناطق السياحية": "Tourist areas",
  "الخدمات الأخرى": "Other services",
  "تجارب حقيقية": "Real experiences",
  "تجربة هادئة، وأنصح بزيارتها": "A calm experience, I recommend visiting",
  "جلسات جميلة والخدمة ممتازة": "Beautiful seating and excellent service",
  "وش قالوا الناس؟": "What did people say?",
  "شوف المكان بعيون زواره.": "See the place through visitors' eyes.",
  "REAL REVIEWS, REAL PLACES": "REAL REVIEWS, REAL PLACES",
  "تجارب حقيقية من داخل المدينة.": "Real experiences from inside the city.",
  "استكشف تجارب الزوار": "Explore visitor experiences",
  "المدينة المنورة، المملكة العربية السعودية": "Madinah, Saudi Arabia",
  "استكشف مرافق المدينة وخدماتها وتقييمات الزوار من الداخل.": "Explore Madinah's facilities, services, and visitor reviews from within.",
  "اكتشف المدينة": "Discover Madinah",
  "اكتشف المدينة من الداخل": "Discover the city from within",
  "هناك أكثر من وجهة سياحية في المدينة": "There is more than one tourist destination in the city",
  "خريطتك معك": "Your map is with you",
  "قم باكتشاف المدينة": "Discover the city",
  "تفاصيل صغيرة تصنع زيارة أجمل. استكشف المرافق والخدمات كما يراها أهل المكان.": "Small details make for a better visit. Explore facilities and services through the eyes of local visitors.",
  "المنطقة المركزية": "Central Area",
  "المدينة المنورة": "Madinah",
  "تقييم المكان": "Place rating",
  "استكشف الخدمات على الخريطة": "Explore services on the map",
  "مرفق داخل المنطقة": "Facility in this area",
  "المنطقة المركزية · المدينة المنورة": "Central Area · Madinah",
  "إغلاق التفاصيل": "Close details",
  "الاتجاهات": "Directions",
  "إزالة من المفضلة": "Remove from favorites",
  "أضف إلى المفضلة": "Add to favorites",
  "في المفضلة": "Saved to favorites",
  "أضف للمفضلة": "Add to favorites",
  "متوسط التقييم": "Average rating",
  "تقييم": "reviews",
  "أضف تقييمك": "Add your review",
  "كيف كانت تجربتك في هذا المرفق؟": "How was your experience with this facility?",
  "اختر تقييمًا من خمس نجوم": "Choose a rating from one to five stars",
  "من 5": "of 5",
  "اكتب تجربتك هنا...": "Write about your experience...",
  "اكتب تجربتك": "Write your experience",
  "نشر التقييم": "Submit review",
  "تجارب الزوار": "Visitor reviews",
  "كن أول من يشارك تجربته في هذا المرفق.": "Be the first to share your experience with this facility.",
  "مساحتك لاكتشاف التفاصيل": "Your space to discover the details",
  "كل شيء": "Everything",
  "على خريطتك.": "On your map.",
  "اختر إحدى نقاط الخدمة على الخريطة لتتعرف على تفاصيلها وتقييمات الزوار.": "Choose a service pin on the map to view its details and visitor reviews.",
  "مرافق متاحة للاستكشاف": "facilities to explore",
  "٦": "6",
  "استكشف المنطقة المركزية": "Explore the Central Area",
  "اعرف المكان قبل ما تروح": "Know the place before you go",
  "من الداخل، مو بس على الخريطة": "From within, not just on the map",
  "وش موجود؟": "What is there?",
  "تعرف على الخدمات والمرافق الموجودة داخل المكان.": "Discover the services and facilities inside the place.",
  "وش يقولون الزوار؟": "What do visitors say?",
  "اقرأ تجارب الزوار مصنفة حسب المكان والخدمة.": "Read visitor experiences organized by place and service.",
  "كيف أوصل؟": "How do I get there?",
  "اعرف أقرب المرافق وكيف تصل إليها من داخل الموقع.": "Find nearby facilities and how to reach them from inside the site.",
  "اكتشف حسب احتياجك": "Discover by what you need",
  "المكان أولًا، ثم التفاصيل التي تهمك.": "The place first, then the details that matter to you.",
  "الوصول إلى خريطة المدينة": "Access the city map",
  "توسيط الخريطة": "Center map",
  "إعادة التوسيط": "Recenter",
  "خريطة الخدمات": "Service map",
  "حديقة": "Park",
  "طريق الملك فهد": "King Fahd Road",
  "مسجد قباء": "Quba Mosque",
  "معلم المدينة": "Madinah landmark",
  "عرض": "View",
  "لا توجد مرافق مسجلة ضمن هذا التصنيف حاليًا": "No facilities are listed in this category yet.",
  "نتائج البحث": "Search results",
  "لا توجد نتائج مطابقة.": "No matching results.",
  "موقعك التقريبي": "Your approximate location",
  "تحديد موقعي": "Find my location",
  "جارٍ تحديد موقعك...": "Finding your location...",
  "تم تحديد موقعك. موضع العلامة تقريبي على الخريطة التوضيحية.": "Your location was found. Its marker is approximate on this illustrative map.",
  "تعذر قراءة موقع الجهاز؛ عُرض مركز الخريطة كموقع تقريبي.": "Device location is unavailable; the map center is shown as an approximate location.",
  "تحديد الموقع غير متاح؛ عُرض مركز الخريطة كموقع تقريبي.": "Location is unavailable; the map center is shown as an approximate location.",
  "تكبير الخريطة": "Zoom in",
  "تصغير الخريطة": "Zoom out",
  "الطقس الآن": "Current weather",
  "بيانات الطقس غير متاحة": "Weather data unavailable",
  "خريطة توضيحية · المنطقة المركزية": "Illustrative map · Central Area",
  "مرافق وخدمات": "Facilities and services",
  "تقييمات الزوار": "Visitor ratings",
  "اختر نقطة لعرض التفاصيل": "Select a pin to view details",
  "حولك في المنطقة": "Around you",
  "أقرب الخدمات لك": "Nearby services",
  "استكشف جميع الخدمات": "Explore all services",
  "خيارات الطعام والمشروبات": "Food and drink options",
  "أماكن القهوة والضيافة": "Coffee and hospitality",
  "لا توجد تقييمات": "No reviews yet",
  "الموقع غير محدد": "Location not specified",
  "اعرف المكان من الداخل.": "Know the place from within.",
  "المملكة العربية السعودية": "Saudi Arabia",
  "تجربة بدون تعليق": "Experience without a comment",
  "أُضيف المرفق إلى المفضلة.": "Facility added to favorites.",
  "أُزيل المرفق من المفضلة.": "Facility removed from favorites.",
  "الواجهة متاحة بالعربية حاليًا.": "The interface is currently available in English.",
  "نظافة دورات المياه وسهولة الوصول إليها": "Clean restrooms and easy access",
  "توفر المواقف وسهولة الدخول والخروج": "Parking availability and easy entry and exit",
  "توفر أماكن مريحة للجلوس والانتظار": "Comfortable places to sit and wait",
  "توفر خيارات الطعام والمشروبات": "Food and drink options",
  "سهولة الوصول والتنقل لجميع الزوار": "Easy access and navigation for all visitors",
  "سهولة الحركة والتنقل داخل المكان": "Easy movement around the area",
};

const landmarks: Facility[] = [
  { name: "المنطقة المركزية", icon: "📍", description: "المعالم الرئيسية في المنطقة المركزية", category: "أماكن دينية", googleQuery: "المنطقة المركزية المدينة المنورة" },
  { name: "مسجد قباء", icon: "🕌", description: "مسجد قباء في المدينة المنورة", category: "أماكن دينية", googleQuery: "مسجد قباء المدينة المنورة" },
  { name: "جبل أحد", icon: "⛰️", description: "جبل أحد في المدينة المنورة", category: "أماكن دينية", googleQuery: "جبل أحد المدينة المنورة" },
];

const facilities: Facility[] = [
  {
    name: "دورات المياه",
    category: "الخدمات الأخرى",
    icon: "🚻",
    description: "نظافة دورات المياه وسهولة الوصول إليها",
  },
  {
    name: "المواقف",
    category: "الخدمات الأخرى",
    icon: "🅿️",
    description: "توفر المواقف وسهولة الدخول والخروج",
  },
  {
    name: "أماكن الجلوس",
    category: "الخدمات الأخرى",
    icon: "🪑",
    description: "توفر أماكن مريحة للجلوس والانتظار",
  },
  {
    name: "المطاعم",
    category: "المطاعم والمقاهي",
    icon: "🍽️",
    description: "توفر خيارات الطعام والمشروبات",
  },
  {
    name: "سهولة الوصول",
    category: "الخدمات الأخرى",
    icon: "♿",
    description: "سهولة الوصول والتنقل لجميع الزوار",
  },
  {
    name: "المشي والتنقل",
    category: "المشي والتنقل",
    icon: "🚶",
    description: "سهولة الحركة والتنقل داخل المكان",
  },
];

const facilitySearchAliases: Record<string, string[]> = {
  "دورات المياه": ["حمام", "حمامات", "دورة مياه", "restroom", "restrooms", "toilet", "toilets", "bathroom"],
  "المواقف": ["موقف", "مواقف سيارات", "parking", "car park", "parking lot"],
  "أماكن الجلوس": ["جلسات", "جلوس", "مقاعد", "seating", "seats", "waiting area"],
  "المطاعم": ["مطعم", "مطاعم", "restaurant", "restaurants", "food", "dining"],
  "سهولة الوصول": ["إمكانية الوصول", "ذوي الإعاقة", "accessible", "accessibility", "wheelchair"],
  "المشي والتنقل": ["مشي", "التنقل", "حركة", "walking", "mobility", "walk"],
};

const generalServiceTerms = ["خدمة", "خدمات", "الخدمات", "مرفق", "مرافق", "service", "services", "facility", "facilities"];

const normalizeSearchTerm = (value: string) =>
  value
    .normalize("NFKC")
    .toLocaleLowerCase("ar")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u065F\u0670ـ]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function Home() {
  const [selected, setSelected] = useState<Facility | null>(null);
  const [reviews, setReviews] = useState<Record<string, Review[]>>({});
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [showTouristCategories, setShowTouristCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("ar");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [mapZoom, setMapZoom] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const [userLocated, setUserLocated] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mapDragStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const statusTimer = useRef<number | null>(null);
  const t = (arabicText: string) =>
    language === "ar" ? arabicText : englishTranslations[arabicText] || arabicText;

  useEffect(() => {
    const saved = localStorage.getItem("inside-the-box-reviews");
    const savedFavorites = localStorage.getItem("inside-the-box-favorites");

    const frame = window.requestAnimationFrame(() => {
      if (saved) {
        setReviews(JSON.parse(saved));
      }

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

    });

  return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("inside-the-box-language");
    if (savedLanguage !== "en") return;

    const timer = window.setTimeout(() => setLanguage("en"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    const localizedTitle = language === "ar" ? "وجهتك | من الداخل" : "Your Destination | From Within";
    const titleTimer = window.setTimeout(() => {
      document.title = localizedTitle;
    }, 100);
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      const descriptionKey = "استكشف مرافق المدينة وخدماتها وتقييمات الزوار من الداخل.";
      description.content = language === "ar" ? descriptionKey : englishTranslations[descriptionKey];
    }

    return () => window.clearTimeout(titleTimer);
  }, [language]);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleSearchShortcut);
    return () => window.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  useEffect(() => () => {
    if (statusTimer.current) window.clearTimeout(statusTimer.current);
  }, []);

  const notify = (messageText: string, duration = 3200) => {
    setStatusMessage(messageText);
    if (statusTimer.current) window.clearTimeout(statusTimer.current);
    statusTimer.current = window.setTimeout(() => setStatusMessage(""), duration);
  };

  const toggleLanguage = () => {
    const nextLanguage: Language = language === "ar" ? "en" : "ar";
    setLanguage(nextLanguage);
    localStorage.setItem("inside-the-box-language", nextLanguage);
  };

  const currentReviews = selected
    ? reviews[selected.name] || []
    : [];

  const average =
    currentReviews.length > 0
      ? (
          currentReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / currentReviews.length
        ).toFixed(1)
      : "—";

  const directionsDestination = selected
    ? language === "ar"
      ? `${selected.name}, المنطقة المركزية، المدينة المنورة`
      : `${t(selected.name)}, Central Area, Madinah`
    : "";
  const directionsUrl = selected
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(directionsDestination)}`
    : "";

  const submitRating = () => {
    if (!selected || rating === 0) return;

    const newReview: Review = {
      rating,
      message: message.trim() || t("تجربة بدون تعليق"),
    };

    const updatedReviews = {
      ...reviews,
      [selected.name]: [
        ...(reviews[selected.name] || []),
        newReview,
      ],
    };

    setReviews(updatedReviews);

    localStorage.setItem(
      "inside-the-box-reviews",
      JSON.stringify(updatedReviews)
    );

    setRating(0);
    setMessage("");
  };

  const closeModal = () => {
    setSelected(null);
    setRating(0);
    setMessage("");
  };

  const selectFacility = (facility: Facility) => {
    setSelected(facility);
    setRating(0);
    setMessage("");
  };

  const resetMap = () => {
    setMapZoom(1);
    setMapOffset({ x: 0, y: 0 });
  };

  const centerMap = () => {
    resetMap();
    setActiveCategory("الكل");
    setSearchQuery("");
    closeModal();
  };

  const zoomMap = (change: number) => {
    setMapZoom((currentZoom) =>
      Math.min(2.5, Math.max(1, Number((currentZoom + change).toFixed(2))))
    );
  };

  const handleMapPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    if ((event.target as Element).closest("button")) return;

    mapDragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: mapOffset.x,
      offsetY: mapOffset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDraggingMap(true);
  };

  const handleMapPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = mapDragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    setMapOffset({
      x: start.offsetX + event.clientX - start.x,
      y: start.offsetY + event.clientY - start.y,
    });
  };

  const handleMapPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (mapDragStart.current?.pointerId !== event.pointerId) return;
    mapDragStart.current = null;
    setIsDraggingMap(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const locateUser = () => {
    if (!navigator.geolocation) {
      resetMap();
      setUserLocated(true);
      notify("تحديد الموقع غير متاح؛ عُرض مركز الخريطة كموقع تقريبي.");
      return;
    }

    notify("جارٍ تحديد موقعك...", 6000);
    navigator.geolocation.getCurrentPosition(
      () => {
        resetMap();
        setUserLocated(true);
        notify("تم تحديد موقعك. موضع العلامة تقريبي على الخريطة التوضيحية.");
      },
      () => {
        resetMap();
        setUserLocated(true);
        notify("تعذر قراءة موقع الجهاز؛ عُرض مركز الخريطة كموقع تقريبي.");
      },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 5_000 }
    );
  };

  const toggleFavorite = (facilityName: string) => {
    const updatedFavorites = favorites.includes(facilityName)
      ? favorites.filter((favorite) => favorite !== facilityName)
      : [...favorites, facilityName];

    setFavorites(updatedFavorites);
    localStorage.setItem("inside-the-box-favorites", JSON.stringify(updatedFavorites));
    notify(
      updatedFavorites.includes(facilityName)
        ? "أُضيف المرفق إلى المفضلة."
        : "أُزيل المرفق من المفضلة."
    );
  };

  const categories = [
    { name: "الكل", icon: "⌘" },
    { name: "المناطق السياحية", icon: "⌖" },
    { name: "المطاعم والمقاهي", icon: "☕" },
    { name: "المشي والتنقل", icon: "🚶" },
    { name: "أماكن دينية", icon: "🕌" },
    { name: "الخدمات الأخرى", icon: "＋" },
  ];

  const proposedPlaces: Facility[] = [
    {
      name: "مقصد قباء",
      icon: "📍",
      description: "مكان مقترح في المدينة المنورة",
      category: "الكل",
      googleQuery: "مقصد قباء المدينة المنورة",
    },
    {
      name: "المنطقة المركزية",
      icon: "📍",
      description: "المنطقة المركزية في المدينة المنورة",
      category: "الكل",
      googleQuery: "المنطقة المركزية المدينة المنورة",
    },
  ];

  // Search is intentionally limited to the site's six top-level categories
  // and the places that belong to them. As new places are added, they are
  // added to the corresponding category and become searchable automatically.
  const searchCategories: Facility[] = [
    { name: "الكل", icon: "⌘", description: "الأماكن المقترحة", category: "الكل" },
    { name: "المناطق السياحية", icon: "⌖", description: "المناطق السياحية في المدينة المنورة", category: "المناطق السياحية" },
    { name: "المطاعم والمقاهي", icon: "☕", description: "المطاعم والمقاهي في المدينة المنورة", category: "المطاعم والمقاهي" },
    { name: "المشي والتنقل", icon: "🚶", description: "المشي والتنقل في المدينة المنورة", category: "المشي والتنقل" },
    { name: "أماكن دينية", icon: "🕌", description: "الأماكن الدينية في المدينة المنورة", category: "أماكن دينية" },
    { name: "الخدمات الأخرى", icon: "＋", description: "الخدمات الأخرى في المدينة المنورة", category: "الخدمات الأخرى" },
  ];

  const searchItems: Facility[] = [
    ...searchCategories,
    ...proposedPlaces,
    ...landmarks.map((landmark) => ({ ...landmark, category: landmark.category || "أماكن دينية" })),
    ...foodPlaces.map((place) => ({
      name: place.name,
      icon: place.type === "مقهى" ? "☕" : "🍽️",
      description: place.type,
      category: "المطاعم والمقاهي",
      googleQuery: place.name + ", المدينة المنورة",
    })),
    ...touristDestinations.map((destination) => ({
      name: destination.name,
      icon: "⌖",
      description: "وجهة سياحية في المدينة المنورة",
      category: destination.category === "المعالم الرئيسية" ? "أماكن دينية" : destination.category,
      googleQuery: destination.name + ", المدينة المنورة",
    })),
  ];

  const visibleFacilities = facilities.filter((facility) => {
    const matchesCategory =
      activeCategory === "الكل" ||
      activeCategory === "المناطق السياحية" ||
      facility.category === activeCategory ||
      facility.name === activeCategory;
    const searchableText = normalizeSearchTerm([
      facility.name, facility.description, t(facility.name), t(facility.description),
      "المنطقة المركزية المدينة المنورة Central Area Madinah",
      ...(facilitySearchAliases[facility.name] || []),
      ...generalServiceTerms,
    ].join(" "));
    const queryWords = normalizeSearchTerm(searchQuery).split(" ").filter(Boolean);
    return matchesCategory && queryWords.every((word) => searchableText.includes(word));
  });

  const searchResults = searchQuery.trim()
    ? searchItems.filter((item) => {
        const query = normalizeSearchTerm(searchQuery);
        const words = query.split(" ").filter(Boolean);
        const searchableText = normalizeSearchTerm([
          item.name,
          item.description,
          t(item.name),
          t(item.description),
          item.category || "",
          item.name === "مقصد قباء" ? "مقصد قباء Quba Destination" : "",
          item.name === "المنطقة المركزية" ? "المنطقة المركزية Central Area" : "",
        ].join(" "));

        // Category searches return the category itself. Place searches return
        // only places belonging to the requested/top-level category.
        if (item.category && item.name !== item.category) {
          // Keep places discoverable by their exact/partial name.
          return words.every((word) => searchableText.includes(word));
        }

        return words.every((word) => searchableText.includes(word));
      })
    : [];

  const chooseSearchResult = (item: Facility) => {
    setActiveCategory(item.category || "الكل");
    setSearchQuery(item.name);
    closeModal();

    // Category results are navigation/filter results, not places to send to Google Maps.
    if (item.name === item.category) {
      setActiveCategory(item.name);
      setSearchQuery("");
      return;
    }

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.googleQuery || item.name + ", المدينة المنورة")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery + " المدينة المنورة")}`;

  const handleSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (searchResults[0]) {
        chooseSearchResult(searchResults[0]);
      } else {
        notify("لا توجد نتائج مطابقة.");
      }
    }

    if (event.key === "Escape") {
      setSearchQuery("");
      closeModal();
    }
  };

  const nearbyFacilities = [
    facilities[2],
    { name: "المطاعم", icon: "♨", description: "خيارات الطعام والمشروبات" },
    facilities[1],
    { name: "المقاهي", icon: "☕", description: "أماكن القهوة والضيافة" },
  ];

  const matchingNearbyFacilities = searchQuery.trim()
    ? nearbyFacilities.filter((nearbyFacility) =>
        visibleFacilities.some((facility) => facility.name === nearbyFacility.name)
      )
    : nearbyFacilities;

  const categoryPlaces: { name: string; type: string; reviewCount: number }[] =
    activeCategory === "المناطق السياحية" || activeCategory === "أماكن دينية" || activeCategory === "المشي والتنقل"
      ? touristDestinations
          .filter((place) => place.category === activeCategory)
          .map((place) => ({
            name: place.name,
            type: "وجهة",
            reviewCount: place.reviewCount,
          }))
      : activeCategory === "المطاعم والمقاهي"
        ? foodPlaces.map((place) => ({
            name: place.name,
            type: place.type,
            reviewCount: place.reviewCount,
          }))
        : [];

  return (
    <main className={`app-shell${darkMode ? " theme-dark" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>
      <div className="roshan-edge roshan-edge-top" aria-hidden="true" />
      <div className="roshan-edge roshan-edge-right" aria-hidden="true" />
      <div className="roshan-edge roshan-edge-bottom" aria-hidden="true" />
      <div className="roshan-edge roshan-edge-left" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label={t("وجهتك")}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 3 45 24 24 45 3 24 24 3Z" />
              <path d="m24 10 14 14-14 14-14-14 14-14Z" />
              <path d="M24 10v28M10 24h28M14 14l20 20m0-20L14 34" />
            </svg>
          </span>
          <span className="brand-copy">
            <span>وش قالوا عن</span>
            <strong>{t("وجهتك")}</strong>
          </span>
        </a>

        <nav className="main-nav" aria-label={t("التنقل الرئيسي")}>
          <a className="nav-active" href="#home">{t("الرئيسية")}</a>
          <Link href="/tourist">{t("استكشف")}</Link>
          
        </nav>

        <div className="search-control">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                closeModal();
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder={t("ابحث عن موقع أو خدمة ...")}
              aria-label={t("ابحث عن موقع أو خدمة")}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={Boolean(searchQuery.trim())}
              aria-controls="search-results"
            />
            <kbd>⌘ K</kbd>
          </label>
          {searchQuery.trim() && (
            <div className="search-results" id="search-results" role="listbox" aria-label={t("نتائج البحث")}>
              <div className="search-results-heading">
                {t("نتائج البحث")} <span>{searchResults.length}</span>
              </div>
              {searchResults.length > 0 ? searchResults.map((facility) => {
                const facilityReviews = reviews[facility.name] || [];
                const facilityAverage = facilityReviews.length
                  ? (facilityReviews.reduce((sum, review) => sum + review.rating, 0) / facilityReviews.length).toFixed(1)
                  : null;

                return (
                  <button
                    className="search-result"
                    key={facility.name}
                    type="button"
                    role="option"
                    aria-selected={selected?.name === facility.name}
                    onClick={() => chooseSearchResult(facility)}
                  >
                    <span className="search-result-icon" aria-hidden="true">{facility.icon}</span>
                    <span className="search-result-copy">
                      <strong>{t(facility.name)}</strong>
                      <small>{facility.name !== facility.category && facility.category ? t(facility.category) + " · " : ""}{t(facility.description)}</small>
                    </span>
                    <span className="search-result-rating">{facilityAverage ? `${facilityAverage} ★` : ""}</span>
                  </button>
                );
              }) : (
                <p className="search-empty" role="status">{t("لا توجد نتائج مطابقة.")}</p>
              )}
            </div>
          )}
        </div>

        <div className="header-actions">
          <button
            className="language-button"
            type="button"
            aria-label={language === "ar" ? t("التبديل إلى الإنجليزية") : t("التبديل إلى العربية")}
            onClick={toggleLanguage}
          >
            {language === "ar" ? "EN" : "AR"}
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? t("تفعيل الوضع النهاري") : t("تفعيل الوضع الليلي")}
            title={darkMode ? t("تفعيل الوضع النهاري") : t("تفعيل الوضع الليلي")}
          >
            {darkMode ? "☼" : "◐"}
          </button>
          <button className="user-button" type="button" aria-label={t("تسجيل الدخول")} title={t("تسجيل الدخول")} onClick={() => notify("تسجيل الدخول غير متاح دون خدمة حسابات.")}>
            <span>◉</span>
          </button>
        </div>
      </header>

      <div className="page-content" id="home">
        <section className="dashboard-intro" id="explore">
          <div className="dashboard-title">
            <span className="dashboard-kicker"><i /> وجهتك</span>
            <h1>وش قالوا عن وجهتك</h1>
            <p>شوف المكان بعيون زواره.</p>
            <strong>{t("اعرف المكان قبل ما تروح")}</strong>
          </div>

          <div className="home-categories" aria-label={t("تصنيفات الخدمات")}>
            {categories.map((category) => (
              <button
                className={`home-category-card${activeCategory === category.name ? " home-category-active" : ""}`}
                key={category.name}
                type="button"
                onClick={() => { setActiveCategory(category.name); setSearchQuery(""); closeModal(); }}
              >
                <span className="home-category-icon" aria-hidden="true">{category.icon}</span>
                <span>{t(category.name)}</span>
              </button>
            ))}
          </div>

          {activeCategory === "الكل" ? (
            <div className="suggested-places">
              <div className="suggested-heading"><h2>أماكن مقترحة</h2></div>
              <div className="suggested-place-grid">
                <Link className="location-summary location-summary-link suggested-place-card" href="/quba" aria-label="فتح مقصد قباء">
                  <span className="location-icon location-icon-quba">⌖</span>
                  <span className="location-copy"><strong>مقصد قباء</strong><small>{t("المدينة المنورة")}</small></span>
                  <span className="location-rating"><b>4.7</b> <i>★</i><small>{t("تقييم المكان")}</small></span>
                </Link>
                <Link className="location-summary location-summary-link suggested-place-card" href="/tourist?name=%D9%85%D8%AA%D8%AD%D9%81%20%D8%AE%D9%8A%D8%B1%20%D8%A7%D9%84%D8%AE%D9%84%D9%82" aria-label="فتح متحف خير الخلق">
                  <span className="location-icon">⌖</span>
                  <span className="location-copy"><strong>متحف خير الخلق</strong><small>معلم رئيسي · 133 تعليق</small></span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="suggested-places category-place-section">
              <div className="suggested-heading">
                <h2>{t(activeCategory)}</h2>
                <span className="category-place-count">
                  {activeCategory === "الخدمات الأخرى"
                    ? ""
                    : activeCategory === "المناطق السياحية" || activeCategory === "أماكن دينية" || activeCategory === "المشي والتنقل"
                      ? touristDestinations.filter((place) => place.category === activeCategory).length + " مكان"
                      : activeCategory === "المطاعم والمقاهي"
                        ? foodPlaces.length + " مكان"
                        : ""}
                </span>
              </div>

              {activeCategory === "الخدمات الأخرى" ? (
                <div className="category-empty-state" role="status">
                  <span className="category-empty-icon" aria-hidden="true">＋</span>
                  <strong>لم يتم إدراج خدمات بعد</strong>
                </div>
              ) : (
                <div className="suggested-place-grid">
                  {categoryPlaces.map((place) => {
                    const name = place.name;
                    const count = place.reviewCount;
                    return (
                      <Link
                        key={name}
                        className="location-summary location-summary-link suggested-place-card tourist-home-card"
                        href={`/tourist?name=${encodeURIComponent(name)}`}
                        aria-label={`فتح تفاصيل ${name}`}
                      >
                        <span className="location-icon">{place.type === "وجهة" ? "⌖" : place.type === "مقهى" ? "☕" : "🍽️"}</span>
                        <span className="location-copy">
                          <strong>{name}</strong>
                          <small>{place.type} · {count.toLocaleString("ar-SA")} تعليق</small>
                        </span>
                        <span className="location-rating"><b>{count.toLocaleString("ar-SA")}</b><small>تعليق</small></span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="explorer-layout" style={{ direction: language === "ar" ? "rtl" : "ltr" }} aria-label={t("استكشف الخدمات على الخريطة")}>
          <aside className="details-panel" aria-live="polite">
            {selected ? (
              <>
                <div className="detail-cover">
                  <div className="cover-arch"><span>{selected.icon}</span></div>
                  <span className="cover-label">{t("المنطقة المركزية · المدينة المنورة")}</span>
                  <button className="close-detail" onClick={closeModal} type="button" aria-label={t("إغلاق التفاصيل")}>×</button>
                </div>
                <div className="detail-content">
                  <div className="detail-title-row">
                    <div><span className="eyebrow">{t("مرفق داخل المنطقة")}</span><h2>{t(selected.name)}</h2></div>
                    <span className="detail-symbol">{selected.icon}</span>
                  </div>
                  <p className="detail-description">{t(selected.description)}</p>
                  <div className="detail-actions">
                    <a className="detail-action route-action" href={directionsUrl} target="_blank" rel="noreferrer">
                      {t("الاتجاهات")} <span aria-hidden="true">↗</span>
                    </a>
                    <button
                      className="detail-action favorite-action"
                      type="button"
                      onClick={() => toggleFavorite(selected.name)}
                      aria-pressed={favorites.includes(selected.name)}
                      aria-label={t(favorites.includes(selected.name) ? "إزالة من المفضلة" : "أضف إلى المفضلة")}
                    >
                      <span aria-hidden="true">{favorites.includes(selected.name) ? "♥" : "♡"}</span>
                      {t(favorites.includes(selected.name) ? "في المفضلة" : "أضف للمفضلة")}
                    </button>
                  </div>
                  <div className="rating-summary">
                    <span className="rating-star">★</span>
                    <strong>{average}</strong>
                    <span>{t("متوسط التقييم")}</span>
                    <i />
                    <span><b>{currentReviews.length}</b> {t("تقييم")}</span>
                  </div>
                  <div className="review-form">
                    <h3>{t("أضف تقييمك")}</h3>
                    <p>{t("كيف كانت تجربتك في هذا المرفق؟")}</p>
                    <div className="star-picker" dir="ltr" aria-label={t("اختر تقييمًا من خمس نجوم")}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={star <= rating ? "star-selected" : ""}
                          aria-label={`${star} ${t("من 5")}`}
                          aria-pressed={rating === star}
                        >★</button>
                      ))}
                    </div>
                    <textarea
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={t("اكتب تجربتك هنا...")}
                      aria-label={t("اكتب تجربتك")}
                    />
                    <button className="submit-review" type="button" onClick={submitRating} disabled={rating === 0}>
                      {t("نشر التقييم")} <span aria-hidden="true">{language === "ar" ? "←" : "→"}</span>
                    </button>
                  </div>
                  <div className="reviews-list">
                    <div className="reviews-heading"><h3>{t("تجارب الزوار")}</h3><span>{currentReviews.length}</span></div>
                    {currentReviews.length > 0 ? currentReviews.map((review, index) => (
                      <article className="review-item" key={`${selected.name}-${index}`}>
                        <div className="review-stars" dir="ltr">
                          {"★".repeat(review.rating)}<span>{"★".repeat(5 - review.rating)}</span>
                        </div>
                        <p>{review.message}</p>
                      </article>
                    )) : <p className="empty-reviews">{t("كن أول من يشارك تجربته في هذا المرفق.")}</p>}
                  </div>
                </div>
              </>
            ) : (
              <div className="detail-empty desktop-explore-panel">
                <div className="desktop-explore-heading">
                  <span>استكشف حسب احتياجك</span>
                  <h2>وش تبي تعرف؟</h2>
                  <p>اختر الشيء اللي يهمك، ونوصلك للمكان المناسب.</p>
                </div>

                <div className="desktop-explore-categories">
                  {categories.filter((category) => category.name !== "الكل").map((category) => (
                    <button
                      key={category.name}
                      type="button"
                      className="desktop-explore-category"
                      onClick={() => {
                        setActiveCategory(category.name);
                        setSearchQuery("");
                      }}
                    >
                      <span aria-hidden="true">{category.icon}</span>
                      <strong>{t(category.name)}</strong>
                      <small>استكشف</small>
                    </button>
                  ))}
                </div>

                <div className="desktop-explore-divider" />

                <div className="desktop-suggested-heading">
                  <h3>أماكن مقترحة</h3>
                  <span>ابدأ من هنا</span>
                </div>

                <div className="desktop-suggested-list">
                  <Link className="desktop-suggested-item" href="/quba">
                    <span className="desktop-suggested-icon">⌖</span>
                    <span>
                      <strong>مقصد قباء</strong>
                      <small>المدينة المنورة · تجارب الزوار</small>
                    </span>
                    <b aria-hidden="true">←</b>
                  </Link>

                  <div className="desktop-suggested-item desktop-suggested-disabled">
                    <span className="desktop-suggested-icon">⌖</span>
                    <span>
                      <strong>المنطقة المركزية</strong>
                      <small>المدينة المنورة · لم يتم رفع الريفيوز بعد</small>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </aside>

          <div className="map-column">
            <div className="map-toolbar">
              <div><span className="live-dot" /><span>{t("الوصول إلى خريطة المدينة")}</span><small>{t("المدينة المنورة")}</small></div>
              <button type="button" className="map-control" aria-label={t("توسيط الخريطة")} onClick={centerMap}>⌖ <span>{t("إعادة التوسيط")}</span></button>
            </div>
            <div className="map-canvas map-reference-canvas" role="region" aria-label={t("خريطة الخدمات")}>
              <img
                className="map-reference-image"
                src="/madinah-map.svg"
                alt="خريطة توضيحية للمدينة المنورة"
                draggable={false}
              />
              <a
                className="map-google-button"
                href="https://www.google.com/maps/search/?api=1&query=Al%20Madinah%20Al%20Munawwarah"
                target="_blank"
                rel="noreferrer"
              >
                <span>انتقل للخارطة</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="map-legend">
              <span><i className="legend-olive" /> {t("مرافق وخدمات")}</span>
              <span><i className="legend-mauve" /> {t("تقييمات الزوار")}</span>
              <span className="legend-note">{t("اختر نقطة لعرض التفاصيل")}</span>
            </div>
          </div>
        </section>

        <footer className="site-footer" id="about">
          <a className="brand footer-brand" href="#home" aria-label={t("وجهتك")}><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M24 3 45 24 24 45 3 24 24 3Z" /><path d="m24 10 14 14-14 14-14-14 14-14Z" /><path d="M24 10v28M10 24h28M14 14l20 20m0-20L14 34" /></svg></span><span className="brand-copy"><span>وش قالوا عن</span><strong>{t("وجهتك")}</strong></span></a>
          <p>وش قالوا عن وجهتك</p>
          <span>المدينة المنورة · المملكة العربية السعودية</span>
        </footer>
      </div>
      {statusMessage && <div className="status-toast" role="status" aria-live="polite">{t(statusMessage)}</div>}
    </main>
  );
}