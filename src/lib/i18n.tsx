import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ne";

type Dict = Record<string, string>;

const en: Dict = {
  "brand.name": "Shree Infra Builders",
  "brand.full": "Shree Infra Builders Pvt Ltd",
  "nav.home": "Home",
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.about": "About",
  "nav.contact": "Contact",

  "hero.eyebrow": "Construction & Design",
  "hero.title": "We build spaces that outlive trends.",
  "hero.subtitle":
    "Structural precision, honest materials and modern design — delivered end to end across Nepal.",
  "hero.cta": "Explore Our Work",
  "hero.scroll": "Scroll",

  "home.stat1": "Projects delivered",
  "home.stat2": "Years building",
  "home.stat3": "On-time handover",
  "home.highlights.title": "What we do",
  "home.highlights.cta": "See all services",
  "home.cta.title": "Have a site, an idea or a blueprint?",
  "home.cta.body": "Tell us the scope and we will send a clear estimate.",
  "home.cta.button": "Request an estimate",

  "services.title": "Services",
  "services.subtitle":
    "Four disciplines, one accountable team — from foundation to final finish.",
  "svc.res.name": "Residential Construction",
  "svc.res.desc":
    "Custom home builds and turn-key modern housing, engineered for the site and the family that will live in it.",
  "svc.res.p1": "Custom home builds",
  "svc.res.p2": "Turn-key modern housing",
  "svc.res.p3": "Structural engineering & approvals",
  "svc.com.name": "Commercial Projects",
  "svc.com.desc":
    "Office spaces, retail hubs and commercial builds delivered on schedule and to specification.",
  "svc.com.p1": "Office fit-outs",
  "svc.com.p2": "Retail hubs",
  "svc.com.p3": "Mixed-use commercial builds",
  "svc.int.name": "Interior Design",
  "svc.int.desc":
    "Space planning, luxury finishings and modern aesthetic styling that make a building feel finished.",
  "svc.int.p1": "Space planning",
  "svc.int.p2": "Luxury finishings",
  "svc.int.p3": "Furniture & lighting design",
  "svc.ren.name": "Renovation & Upgrades",
  "svc.ren.desc":
    "Modernizing older homes and complete structural revamps, including retrofitting and reinforcement.",
  "svc.ren.p1": "Full home modernization",
  "svc.ren.p2": "Structural revamps",
  "svc.ren.p3": "Seismic retrofitting",

  "portfolio.title": "Projects",
  "portfolio.subtitle": "A selection of completed work across Kathmandu Valley and beyond.",
  "filter.all": "All",
  "filter.residential": "Residential",
  "filter.commercial": "Commercial",
  "filter.renovation": "Renovation",
  "filter.interiors": "Interiors",
  "ba.title": "Before & After",
  "ba.subtitle": "Drag the handle to see a full renovation transformation.",
  "ba.before": "Before",
  "ba.after": "After",

  "about.title": "Built on craftsmanship",
  "about.lead":
    "Shree Infra Builders Pvt Ltd is a construction and design firm delivering residential, commercial and interior projects with a single standard: build it as if we will live in it.",
  "about.p1":
    "We keep engineering, execution and finishing under one roof, so quality is never lost between contractors. Every project runs on a fixed scope, a transparent estimate and a schedule you can hold us to.",
  "about.p2":
    "From foundation and structure to the last light fitting, our teams work with tested materials, licensed engineers and a site supervisor accountable for the details.",
  "about.value1.title": "Quality first",
  "about.value1.body": "Tested materials, licensed engineers, documented checks at every stage.",
  "about.value2.title": "Transparent pricing",
  "about.value2.body": "Line-item estimates with no surprise variations mid-project.",
  "about.value3.title": "On schedule",
  "about.value3.body": "Planned milestones and weekly site reporting until handover.",

  "contact.title": "Request an estimate",
  "contact.subtitle": "Three short steps. We reply within one working day.",
  "contact.step": "Step",
  "contact.of": "of",
  "contact.step1": "Project type",
  "contact.step2": "Project details",
  "contact.step3": "Your details",
  "contact.next": "Continue",
  "contact.back": "Back",
  "contact.submit": "Send inquiry",
  "contact.sending": "Sending…",
  "contact.budget": "Estimated budget",
  "contact.location": "Project location",
  "contact.message": "Tell us about the project",
  "contact.name": "Full name",
  "contact.phone": "Phone number",
  "contact.email": "Email (optional)",
  "contact.success": "Thank you — your inquiry has been received.",
  "contact.error": "Something went wrong. Please try again or call us.",
  "contact.required": "Please fill in the required fields.",
  "contact.whatsapp": "WhatsApp",
  "contact.call": "Call us",
  "contact.direct": "Prefer to talk?",
  "budget.a": "Under NPR 25 lakh",
  "budget.b": "NPR 25 – 75 lakh",
  "budget.c": "NPR 75 lakh – 2 crore",
  "budget.d": "Above NPR 2 crore",
  "budget.e": "Not sure yet",

  "footer.tagline": "Construction, interiors and renovation across Nepal.",
  "footer.rights": "All rights reserved.",
  "lang.toggle": "नेपाली",
  "theme.toggle": "Toggle theme",
};

const ne: Dict = {
  "brand.name": "श्री इन्फ्रा बिल्डर्स",
  "brand.full": "श्री इन्फ्रा बिल्डर्स प्रा. लि.",
  "nav.home": "गृहपृष्ठ",
  "nav.services": "सेवाहरू",
  "nav.portfolio": "परियोजनाहरू",
  "nav.about": "हाम्रोबारे",
  "nav.contact": "सम्पर्क",

  "hero.eyebrow": "निर्माण तथा डिजाइन",
  "hero.title": "समयसँगै टिक्ने संरचना निर्माण गर्छौं।",
  "hero.subtitle":
    "संरचनात्मक शुद्धता, गुणस्तरीय सामग्री र आधुनिक डिजाइन — नेपालभर सुरुदेखि अन्त्यसम्म।",
  "hero.cta": "हाम्रा कामहरू हेर्नुहोस्",
  "hero.scroll": "स्क्रोल",

  "home.stat1": "सम्पन्न परियोजना",
  "home.stat2": "वर्षको अनुभव",
  "home.stat3": "समयमै हस्तान्तरण",
  "home.highlights.title": "हामी के गर्छौं",
  "home.highlights.cta": "सबै सेवा हेर्नुहोस्",
  "home.cta.title": "जग्गा, योजना वा नक्सा तयार छ?",
  "home.cta.body": "कामको विवरण पठाउनुहोस्, हामी स्पष्ट लागत अनुमान दिनेछौं।",
  "home.cta.button": "लागत अनुमान लिनुहोस्",

  "services.title": "सेवाहरू",
  "services.subtitle": "चार विधा, एउटै जिम्मेवार टोली — जगदेखि अन्तिम फिनिसिङसम्म।",
  "svc.res.name": "आवासीय निर्माण",
  "svc.res.desc":
    "आफ्नै रुचि अनुसारको घर तथा टर्न-की आधुनिक आवास, जग्गा र परिवार सुहाउँदो इन्जिनियरिङसहित।",
  "svc.res.p1": "व्यक्तिगत घर निर्माण",
  "svc.res.p2": "टर्न-की आधुनिक आवास",
  "svc.res.p3": "स्ट्रक्चरल इन्जिनियरिङ र स्वीकृति",
  "svc.com.name": "व्यावसायिक परियोजना",
  "svc.com.desc": "अफिस स्पेस, रिटेल हब र व्यावसायिक भवन — तोकिएको समय र गुणस्तरमा।",
  "svc.com.p1": "अफिस फिट-आउट",
  "svc.com.p2": "रिटेल हब",
  "svc.com.p3": "मिश्रित व्यावसायिक भवन",
  "svc.int.name": "इन्टेरियर डिजाइन",
  "svc.int.desc": "स्पेस प्लानिङ, लक्जरी फिनिसिङ र आधुनिक सजावट — भवनलाई पूर्णता दिने काम।",
  "svc.int.p1": "स्पेस प्लानिङ",
  "svc.int.p2": "लक्जरी फिनिसिङ",
  "svc.int.p3": "फर्निचर र लाइटिङ डिजाइन",
  "svc.ren.name": "मर्मत तथा स्तरोन्नति",
  "svc.ren.desc": "पुराना घरको आधुनिकीकरण र पूर्ण संरचनात्मक सुधार, रेट्रोफिटिङसहित।",
  "svc.ren.p1": "पूर्ण घर आधुनिकीकरण",
  "svc.ren.p2": "संरचनात्मक सुधार",
  "svc.ren.p3": "भूकम्प प्रतिरोधी रेट्रोफिटिङ",

  "portfolio.title": "परियोजनाहरू",
  "portfolio.subtitle": "काठमाडौं उपत्यका र बाहिर सम्पन्न भएका केही कामहरू।",
  "filter.all": "सबै",
  "filter.residential": "आवासीय",
  "filter.commercial": "व्यावसायिक",
  "filter.renovation": "मर्मत",
  "filter.interiors": "इन्टेरियर",
  "ba.title": "पहिले र पछि",
  "ba.subtitle": "ह्यान्डल तान्नुहोस् र पूर्ण परिवर्तन हेर्नुहोस्।",
  "ba.before": "पहिले",
  "ba.after": "पछि",

  "about.title": "गुणस्तरमा आधारित निर्माण",
  "about.lead":
    "श्री इन्फ्रा बिल्डर्स प्रा. लि. आवासीय, व्यावसायिक र इन्टेरियर परियोजनाहरू एउटै मापदण्डमा सम्पन्न गर्ने निर्माण तथा डिजाइन कम्पनी हो — आफैं बस्ने घर जसरी बनाउने।",
  "about.p1":
    "इन्जिनियरिङ, निर्माण र फिनिसिङ एउटै छानामुनि राख्छौं, त्यसैले गुणस्तर कतै हराउँदैन। हरेक परियोजना स्पष्ट दायरा, पारदर्शी लागत र तोकिएको तालिकामा चल्छ।",
  "about.p2":
    "जग र संरचनादेखि अन्तिम लाइट फिटिङसम्म, हाम्रा टोलीले परीक्षण गरिएका सामग्री, इजाजतप्राप्त इन्जिनियर र जिम्मेवार साइट सुपरभाइजरसँग काम गर्छन्।",
  "about.value1.title": "गुणस्तर पहिलो",
  "about.value1.body": "परीक्षण गरिएका सामग्री, इजाजतप्राप्त इन्जिनियर, हरेक चरणमा जाँच।",
  "about.value2.title": "पारदर्शी मूल्य",
  "about.value2.body": "विस्तृत लागत अनुमान, बीचमा लुकेको खर्च छैन।",
  "about.value3.title": "समयमै सम्पन्न",
  "about.value3.body": "योजनाबद्ध माइलस्टोन र साप्ताहिक साइट रिपोर्ट।",

  "contact.title": "लागत अनुमान माग्नुहोस्",
  "contact.subtitle": "तीन छोटा चरण। एक कार्य दिनभित्र जवाफ दिन्छौं।",
  "contact.step": "चरण",
  "contact.of": "/",
  "contact.step1": "परियोजनाको प्रकार",
  "contact.step2": "परियोजना विवरण",
  "contact.step3": "तपाईंको विवरण",
  "contact.next": "अगाडि बढ्नुहोस्",
  "contact.back": "पछाडि",
  "contact.submit": "पठाउनुहोस्",
  "contact.sending": "पठाइँदै…",
  "contact.budget": "अनुमानित बजेट",
  "contact.location": "परियोजना स्थान",
  "contact.message": "परियोजनाबारे लेख्नुहोस्",
  "contact.name": "पूरा नाम",
  "contact.phone": "फोन नम्बर",
  "contact.email": "इमेल (वैकल्पिक)",
  "contact.success": "धन्यवाद — तपाईंको अनुरोध प्राप्त भयो।",
  "contact.error": "केही गडबड भयो। पुनः प्रयास गर्नुहोस् वा फोन गर्नुहोस्।",
  "contact.required": "कृपया आवश्यक विवरण भर्नुहोस्।",
  "contact.whatsapp": "ह्वाट्सएप",
  "contact.call": "फोन गर्नुहोस्",
  "contact.direct": "सीधै कुरा गर्न चाहनुहुन्छ?",
  "budget.a": "रु. २५ लाख भन्दा कम",
  "budget.b": "रु. २५ – ७५ लाख",
  "budget.c": "रु. ७५ लाख – २ करोड",
  "budget.d": "रु. २ करोड भन्दा माथि",
  "budget.e": "अझै निश्चित छैन",

  "footer.tagline": "नेपालभर निर्माण, इन्टेरियर र मर्मत सेवा।",
  "footer.rights": "सर्वाधिकार सुरक्षित।",
  "lang.toggle": "English",
  "theme.toggle": "थिम परिवर्तन",
};

const dicts: Record<Lang, Dict> = { en, ne };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void; t: (k: string) => string };

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "sib-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ne" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "en" ? "ne" : "en"),
      t: (k: string) => dicts[lang][k] ?? dicts.en[k] ?? k,
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
