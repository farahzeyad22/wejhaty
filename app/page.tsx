"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

type Facility = {
  name: string;
  icon: string;
  description: string;
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
  "المقاهي": "Cafes",
  "المواقف": "Parking",
  "دورات المياه": "Restrooms",
  "أماكن الجلوس": "Seating",
  "سهولة الوصول": "Accessibility",
  "المشي والتنقل": "Walking and mobility",
  "المعالم الرئيسية": "Main landmarks",
  "الخدمات الأخرى": "Other services",
  "تجارب حقيقية": "Real experiences",
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
  "الوصول من الداخل": "Getting around from within",
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

const facilities: Facility[] = [
  {
    name: "دورات المياه",
    icon: "🚻",
    description: "نظافة دورات المياه وسهولة الوصول إليها",
  },
  {
    name: "المواقف",
    icon: "🅿️",
    description: "توفر المواقف وسهولة الدخول والخروج",
  },
  {
    name: "أماكن الجلوس",
    icon: "🪑",
    description: "توفر أماكن مريحة للجلوس والانتظار",
  },
  {
    name: "المطاعم",
    icon: "🍽️",
    description: "توفر خيارات الطعام والمشروبات",
  },
  {
    name: "سهولة الوصول",
    icon: "♿",
    description: "سهولة الوصول والتنقل لجميع الزوار",
  },
  {
    name: "المشي والتنقل",
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
    { name: "المطاعم", icon: "♨" },
    { name: "المقاهي", icon: "☕" },
    { name: "المواقف", icon: "P" },
    { name: "دورات المياه", icon: "♧" },
    { name: "أماكن الجلوس", icon: "⌑" },
    { name: "سهولة الوصول", icon: "↗" },
    { name: "المشي والتنقل", icon: "⌁" },
    { name: "المعالم الرئيسية", icon: "◇" },
    { name: "الخدمات الأخرى", icon: "＋" },
  ];

  const visibleFacilities = facilities.filter((facility) => {
    const matchesCategory =
      activeCategory === "الكل" || facility.name === activeCategory;
    const searchableText = normalizeSearchTerm([
      facility.name,
      facility.description,
      t(facility.name),
      t(facility.description),
      "المنطقة المركزية المدينة المنورة Central Area Madinah",
      ...facilitySearchAliases[facility.name],
      ...generalServiceTerms,
    ].join(" "));
    const queryWords = normalizeSearchTerm(searchQuery).split(" ").filter(Boolean);
    const matchesSearch = queryWords.every((word) => searchableText.includes(word));

    return matchesCategory && matchesSearch;
  });

  const chooseSearchResult = (facility: Facility) => {
    setActiveCategory("الكل");
    setSearchQuery("");
    selectFacility(facility);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (visibleFacilities[0]) {
        chooseSearchResult(visibleFacilities[0]);
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

  return (
    <main className={`app-shell${darkMode ? " theme-dark" : ""}`} dir={language === "ar" ? "rtl" : "ltr"} lang={language}>
      <div className="roshan-edge roshan-edge-top" aria-hidden="true" />
      <div className="roshan-edge roshan-edge-right" aria-hidden="true" />
      <div className="roshan-edge roshan-edge-bottom" aria-hidden="true" />
      <div className="roshan-edge roshan-edge-left" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#home" aria-label={`${t("وجهتك")} ${t("من الداخل")}`}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 3 45 24 24 45 3 24 24 3Z" />
              <path d="m24 10 14 14-14 14-14-14 14-14Z" />
              <path d="M24 10v28M10 24h28M14 14l20 20m0-20L14 34" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>{t("وجهتك")}</strong>
            <span>{t("من الداخل")}</span>
          </span>
        </a>

        <nav className="main-nav" aria-label={t("التنقل الرئيسي")}>
          <a className="nav-active" href="#home">{t("الرئيسية")}</a>
          <a href="#explore">{t("استكشف")}</a>
          <a href="#services">{t("الخدمات")}</a>
          <a href="#landmarks">{t("المعالم")}</a>
          <a href="#about">{t("عن وجهتك")}</a>
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
                {t("نتائج البحث")} <span>{visibleFacilities.length}</span>
              </div>
              {visibleFacilities.length > 0 ? visibleFacilities.map((facility) => {
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
                      <small>{t(facility.description)}</small>
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

      <section className="service-strip" id="services" aria-label={t("تصنيفات الخدمات")}>
        <div className="service-strip-inner">{categories.map((category) => (
            <button
              className={`category-chip${activeCategory === category.name ? " category-active" : ""}`}
              key={category.name}
              type="button"
              onClick={() => {
                setActiveCategory(category.name);
                closeModal();
              }}
              aria-pressed={activeCategory === category.name}
            >
              <span className="category-icon" aria-hidden="true">{category.icon}</span>
              {t(category.name)}
            </button>
          ))}
        </div>
      </section>

      <div className="page-content" id="home">
        <section className="dashboard-intro" id="explore">
          <div className="dashboard-title">
            <span className="dashboard-kicker"><i /> وجهتك · من الداخل</span>
            <h1>{t("اكتشف المدينة من الداخل")}</h1>
            <p>{t("من الداخل، مو بس على الخريطة")}</p>
            <strong>{t("اعرف المكان قبل ما تروح")}</strong>
          </div>
          <div className="dashboard-locations" aria-label="اختيار المنطقة">
            <div className="location-summary">
              <span className="location-icon">⌖</span>
              <span className="location-copy"><strong>{t("المنطقة المركزية")} <em className="reviews-status">(لم يتم رفع الريفيوز بعد)</em></strong><small>{t("المدينة المنورة")}</small></span>
              <span className="location-rating"><b>4.8</b> <i>★</i><small>{t("تقييم المكان")}</small></span>
            </div>
            <Link className="location-summary location-summary-link" href="/quba" aria-label="فتح مقصد قباء">
              <span className="location-icon location-icon-quba">⌖</span>
              <span className="location-copy"><strong>مقصد قباء</strong><small>المدينة المنورة</small></span>
              <span className="location-rating"><b>4.7</b> <i>★</i><small>{t("تقييم المكان")}</small></span>
            </Link>
          </div>
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
              <div className="detail-empty review-hero-panel">
                <div className="review-hero-art" aria-hidden="true">
                  <div className="sunset-sun" />
                  <div className="sunset-mountain sunset-mountain-back" />
                  <div className="sunset-mountain sunset-mountain-front" />
                  <div className="sunset-mosque">
                    <span className="dome dome-main" />
                    <span className="minaret minaret-one" />
                    <span className="minaret minaret-two" />
                    <span className="minaret minaret-three" />
                    <span className="mosque-body" />
                  </div>
                </div>
                <div className="review-hero-copy">
                  <span className="eyebrow">{t("تجارب حقيقية")}</span>
                  <h2>{t("وش قالوا الناس؟")}</h2>
                  <p className="review-hero-lead">{t("شوف المكان بعيون زواره.")}</p>
                  <div className="review-hero-english">REAL REVIEWS, REAL PLACES</div>
                  <p>{t("تجارب حقيقية من داخل المدينة.")}</p>
                  <button className="review-hero-button" type="button" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                    {t("استكشف تجارب الزوار")} <span aria-hidden="true">←</span>
                  </button>
                </div>
              </div>
            )}
          </aside>

          <div className="map-column">
            <div className="map-toolbar">
              <div><span className="live-dot" /><span>{t("الوصول من الداخل")}</span><small>{t("المدينة المنورة")}</small></div>
              <button type="button" className="map-control" aria-label={t("توسيط الخريطة")} onClick={centerMap}>⌖ <span>{t("إعادة التوسيط")}</span></button>
            </div>
            <div
              className={`map-canvas${isDraggingMap ? " map-canvas-dragging" : ""}`}
              role="region"
              aria-label={t("خريطة الخدمات")}
              onPointerDown={handleMapPointerDown}
              onPointerMove={handleMapPointerMove}
              onPointerUp={handleMapPointerUp}
              onPointerCancel={handleMapPointerUp}
            >
              <div
                className="map-layer"
                style={{ transform: `translate3d(${mapOffset.x}px, ${mapOffset.y}px, 0) scale(${mapZoom})` }}
              >
                <div className="map-pattern" />
                <div className="map-mountain mountain-one" aria-hidden="true" />
                <div className="map-mountain mountain-two" aria-hidden="true" />
                <div className="map-mosque mosque-one" aria-hidden="true"><span>مسجد</span></div>
                <div className="map-mosque mosque-two" aria-hidden="true"><span>معلم</span></div>
                <div className="map-palm palm-one" aria-hidden="true">🌴</div>
                <div className="map-palm palm-two" aria-hidden="true">🌴</div>
                <svg className="map-roads" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true">
                <path className="road-main" d="M-40 520 C150 455 185 370 360 385S590 460 740 365 900 270 1040 290" />
                <path className="road-main" d="M120 -30 C180 120 265 160 270 300S230 500 340 680" />
                <path className="road-main" d="M690 -20 C610 110 640 210 735 285S890 420 1030 470" />
                <path className="road-minor" d="M-20 180 C190 250 390 150 560 205S830 165 1020 90" />
                <path className="road-minor" d="M20 610 C230 530 410 580 530 485S790 530 980 590" />
                <path className="road-minor" d="M425 -20 C380 140 470 230 420 350S475 530 440 680" />
                <path className="road-minor" d="M820 -20 C760 120 835 215 800 330S720 515 790 680" />
                </svg>
                <div className="map-park park-one"><span>{t("حديقة")}</span><i>✳</i></div>
                <div className="map-park park-two"><i>✳</i></div>
                <div className="map-block block-one" />
                <div className="map-block block-two" />
                <div className="map-block block-three" />
                <span className="map-label label-one">{t("طريق الملك فهد")}</span>
                <span className="map-label label-two">{t("المنطقة المركزية")}</span>
                <span className="map-label label-three">{t("مسجد قباء")}</span>
                <div className="map-landmark"><span>{language === "ar" ? "م" : "M"}</span><small>{t("معلم المدينة")}</small></div>
                {visibleFacilities.map((facility, index) => {
                const facilityReviews = reviews[facility.name] || [];
                const facilityAverage = facilityReviews.length
                  ? (facilityReviews.reduce((sum, review) => sum + review.rating, 0) / facilityReviews.length).toFixed(1)
                  : null;
                const positions = [
                  { left: "24%", top: "28%" },
                  { left: "62%", top: "25%" },
                  { left: "44%", top: "48%" },
                  { left: "76%", top: "58%" },
                  { left: "24%", top: "68%" },
                  { left: "57%", top: "77%" },
                ];

                  return (
                    <button
                      key={facility.name}
                      type="button"
                      className={`map-pin pin-${index % 4}${selected?.name === facility.name ? " pin-active" : ""}`}
                      style={positions[index % positions.length]}
                      onClick={() => selectFacility(facility)}
                      aria-label={`${t("عرض")} ${t(facility.name)}`}
                      title={t(facility.name)}
                    >
                      <span>{facility.icon}</span>
                      <small>{t(facility.name)}</small>
                      {facilityAverage && <b>{facilityAverage} ★</b>}
                    </button>
                  );
                })}
                {visibleFacilities.length === 0 && (
                  <div className="map-no-results">{t("لا توجد مرافق مسجلة ضمن هذا التصنيف حاليًا")}</div>
                )}
                {userLocated && (
                  <div className="user-location-marker" style={{ left: "50%", top: "50%" }}>
                    <span />
                    <small>{t("موقعك التقريبي")}</small>
                  </div>
                )}
              </div>
              <button className="map-compass" type="button" onClick={locateUser} aria-label={t("تحديد موقعي")} title={t("تحديد موقعي")}><span>N</span>↑</button>
              <div className="map-zoom">
                <button type="button" onClick={() => zoomMap(0.25)} aria-label={t("تكبير الخريطة")} disabled={mapZoom >= 2.5}>+</button>
                <button type="button" onClick={() => zoomMap(-0.25)} aria-label={t("تصغير الخريطة")} disabled={mapZoom <= 1}>−</button>
              </div>
              <div className="map-weather"><span className="weather-icon">☼</span><span><small>{t("الطقس الآن")}</small><strong>{t("بيانات الطقس غير متاحة")}</strong></span></div>
              <div className="map-credit">{t("خريطة توضيحية · المنطقة المركزية")}</div>
            </div>
            <div className="map-legend">
              <span><i className="legend-olive" /> {t("مرافق وخدمات")}</span>
              <span><i className="legend-mauve" /> {t("تقييمات الزوار")}</span>
              <span className="legend-note">{t("اختر نقطة لعرض التفاصيل")}</span>
            </div>
          </div>
        </section>

        <section className="nearby-section" id="landmarks">
          <div className="section-heading">
            <div><span className="eyebrow">{t("حولك في المنطقة")}</span><h2>{t("أقرب الخدمات لك")}</h2></div>
            <a href="#services">{t("استكشف جميع الخدمات")} <span>{language === "ar" ? "←" : "→"}</span></a>
          </div>
          <div className="nearby-grid">
            {matchingNearbyFacilities.map((facility, index) => {
              const actualFacility = facilities.find((item) => item.name === facility.name);
              const itemReviews = actualFacility ? reviews[actualFacility.name] || [] : [];
              const itemAverage = itemReviews.length
                ? (itemReviews.reduce((sum, review) => sum + review.rating, 0) / itemReviews.length).toFixed(1)
                : null;

              return (
                <button
                  className="nearby-card"
                  key={`${facility.name}-${index}`}
                  type="button"
                  onClick={() => {
                    if (actualFacility) {
                      selectFacility(actualFacility);
                      setActiveCategory("الكل");
                    } else {
                      closeModal();
                      setActiveCategory(facility.name);
                    }
                    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className={`nearby-photo photo-${index}`}><span>{facility.icon}</span></span>
                  <span className="nearby-info"><strong>{t(facility.name)}</strong><small>{t(facility.description)}</small><span className="nearby-meta"><b>{itemAverage ? `${itemAverage} ★` : t("لا توجد تقييمات")}</b><i />{t(actualFacility ? "المنطقة المركزية" : "الموقع غير محدد")}</span></span>
                  <span className="nearby-arrow" aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="site-footer" id="about">
          <a className="brand footer-brand" href="#home" aria-label={`${t("وجهتك")} ${t("من الداخل")}`}><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M24 3 45 24 24 45 3 24 24 3Z" /><path d="m24 10 14 14-14 14-14-14 14-14Z" /><path d="M24 10v28M10 24h28M14 14l20 20m0-20L14 34" /></svg></span><span className="brand-copy"><strong>{t("وجهتك")}</strong><span>{t("من الداخل")}</span></span></a>
          <p>{t("اعرف المكان من الداخل.")}</p>
          <span>{t("المدينة المنورة")} · {t("المملكة العربية السعودية")}</span>
        </footer>
      </div>
      {statusMessage && <div className="status-toast" role="status" aria-live="polite">{t(statusMessage)}</div>}
    </main>
  );
}