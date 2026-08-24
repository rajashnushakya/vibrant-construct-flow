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

  "home.process.title": "How we build",
  "home.process.subtitle": "A clear, five-stage path from first conversation to final handover.",
  "home.process.s1.title": "Consultation",
  "home.process.s1.body": "We visit the site, understand your budget and map what is actually feasible.",
  "home.process.s2.title": "Design & estimate",
  "home.process.s2.body": "Drawings, material specification and a line-by-line cost sheet you can question.",
  "home.process.s3.title": "Approvals",
  "home.process.s3.body": "Structural engineering, municipal drawings and permits handled by our team.",
  "home.process.s4.title": "Construction",
  "home.process.s4.body": "Supervised execution with weekly photo updates and staged billing.",
  "home.process.s5.title": "Handover",
  "home.process.s5.body": "Snag list cleared, finishes checked and a one-year workmanship warranty.",
  "home.why.title": "Why owners choose us",
  "home.why.body": "One accountable team from foundation to final coat of paint — no subcontractor blame games.",
  "home.why.p1": "In-house engineers, masons and finishing crews",
  "home.why.p2": "Fixed-scope estimates with no hidden line items",
  "home.why.p3": "Weekly site reporting shared directly with you",
  "home.why.p4": "Earthquake-resilient detailing on every structure",
  "home.materials.title": "Materials we stand behind",
  "home.materials.body": "Graded rebar, tested concrete mixes and seasoned timber — sourced from suppliers we have used for over a decade and verified batch by batch.",
  "home.testi.title": "What clients say",
  "home.testi.t1": "They finished two weeks ahead of schedule and the billing matched the estimate to the rupee.",
  "home.testi.n1": "Anil Shrestha — Lalitpur residence",
  "home.testi.t2": "The site was clean every single visit. That told me everything about how they work.",
  "home.testi.n2": "Prabha Maharjan — Retail fit-out",
  "home.testi.t3": "Our old brick house feels new but still feels like ours. Careful, respectful work.",
  "home.testi.n3": "Deepak Rai — Bhaktapur renovation",
  "home.faq.title": "Common questions",
  "home.faq.q1": "How long does a typical home take?",
  "home.faq.a1": "A standard 3-storey residence runs 10 to 14 months from groundbreaking, depending on approvals and finishing scope.",
  "home.faq.q2": "How is payment staged?",
  "home.faq.a2": "Billing is tied to completed milestones — foundation, structure, masonry, finishing and handover. Nothing is billed in advance of work done.",
  "home.faq.q3": "Do you handle municipal approvals?",
  "home.faq.a3": "Yes. Structural drawings, submissions and permit follow-up are included in our scope.",
  "home.faq.q4": "Do you work outside Kathmandu Valley?",
  "home.faq.a4": "We take projects across Bagmati and Gandaki provinces, including Pokhara and Chitwan.",
  "portfolio.stats.title": "Delivered across Nepal",
  "portfolio.cta.title": "Want your project on this page?",
  "services.faq.title": "Good to know",
  "about.timeline.title": "Our story so far",
  "about.t1.year": "2012",
  "about.t1.body": "Founded in Lalitpur with a four-person masonry crew and a single residential contract.",
  "about.t2.year": "2016",
  "about.t2.body": "Added an in-house structural engineering desk and moved into commercial fit-outs.",
  "about.t3.year": "2020",
  "about.t3.body": "Launched the interiors studio so design and build stay under one roof.",
  "about.t4.year": "2026",
  "about.t4.body": "120+ delivered projects and a permanent team of 60 across engineering, site and finishing.",
  "about.team.title": "People on site, not just on paper",
  "about.team.body": "Every project is run by a named site engineer who is on the ground daily and reachable directly by the owner.",
  "about.craft.title": "Craft in the details",
  "about.craft.body": "Level checks on every slab, tested mixes on every pour and finishing crews who care what the corners look like.",

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

  "home.process.title": "हामी कसरी निर्माण गर्छौं",
  "home.process.subtitle": "पहिलो भेटदेखि अन्तिम हस्तान्तरणसम्म पाँच चरणको स्पष्ट प्रक्रिया।",
  "home.process.s1.title": "परामर्श",
  "home.process.s1.body": "हामी साइट हेर्छौं, बजेट बुझ्छौं र के सम्भव छ स्पष्ट भन्छौं।",
  "home.process.s2.title": "डिजाइन र अनुमान",
  "home.process.s2.body": "नक्सा, सामग्री विवरण र लाइन-बाई-लाइन लागत तालिका।",
  "home.process.s3.title": "स्वीकृति",
  "home.process.s3.body": "स्ट्रक्चरल इन्जिनियरिङ, नगरपालिका नक्सा र अनुमति हाम्रो टोलीले।",
  "home.process.s4.title": "निर्माण",
  "home.process.s4.body": "साप्ताहिक फोटो अपडेट र चरणबद्ध बिलिङसहित सुपरिवेक्षित काम।",
  "home.process.s5.title": "हस्तान्तरण",
  "home.process.s5.body": "स्न्याग सूची सफा, फिनिसिङ जाँच र एक वर्षको कारीगरी वारेन्टी।",
  "home.why.title": "किन घरधनीहरूले हामीलाई रोज्छन्",
  "home.why.body": "जग देखि अन्तिम रंगसम्म एउटै जिम्मेवार टोली — दोषारोपण छैन।",
  "home.why.p1": "आफ्नै इन्जिनियर, डकर्मी र फिनिसिङ टोली",
  "home.why.p2": "लुकेको शुल्क नभएको निश्चित अनुमान",
  "home.why.p3": "साप्ताहिक साइट रिपोर्ट सीधै तपाईंलाई",
  "home.why.p4": "हरेक संरचनामा भूकम्प-प्रतिरोधी विवरण",
  "home.materials.title": "हामीले विश्वास गर्ने सामग्री",
  "home.materials.body": "ग्रेडेड रड, परीक्षण गरिएको कंक्रिट मिश्रण र राम्रो काठ — दशकौंदेखि प्रयोग गरेका आपूर्तिकर्ताबाट।",
  "home.testi.title": "ग्राहकहरू के भन्छन्",
  "home.testi.t1": "दुई हप्ता अगावै काम सकियो र बिल अनुमानसँग मिल्यो।",
  "home.testi.n1": "अनिल श्रेष्ठ — ललितपुर निवास",
  "home.testi.t2": "हरेक पटक साइट सफा थियो। त्यसैले उनीहरूको काम बुझियो।",
  "home.testi.n2": "प्रभा महर्जन — रिटेल फिट-आउट",
  "home.testi.t3": "पुरानो इँटा घर नयाँ जस्तो भयो तर हाम्रै जस्तो छ।",
  "home.testi.n3": "दीपक राई — भक्तपुर नवीकरण",
  "home.faq.title": "प्राय: सोधिने प्रश्न",
  "home.faq.q1": "सामान्य घर बन्न कति समय लाग्छ?",
  "home.faq.a1": "तीन तले घर सामान्यतया १० देखि १४ महिनामा सम्पन्न हुन्छ।",
  "home.faq.q2": "भुक्तानी कसरी हुन्छ?",
  "home.faq.a2": "जग, संरचना, गारो, फिनिसिङ र हस्तान्तरण — काम सकिएपछि मात्र बिलिङ हुन्छ।",
  "home.faq.q3": "के तपाईंहरूले नगरपालिका स्वीकृति गर्नुहुन्छ?",
  "home.faq.a3": "हो। नक्सा, दर्ता र अनुमति हाम्रो दायरामा पर्छ।",
  "home.faq.q4": "काठमाडौं बाहिर पनि काम गर्नुहुन्छ?",
  "home.faq.a4": "पोखरा र चितवनसहित बागमती र गण्डकी प्रदेशभर काम गर्छौं।",
  "portfolio.stats.title": "नेपालभर सम्पन्न",
  "portfolio.cta.title": "तपाईंको परियोजना यहाँ राख्न चाहनुहुन्छ?",
  "services.faq.title": "जान्न राम्रो",
  "about.timeline.title": "हाम्रो यात्रा",
  "about.t1.year": "२०१२",
  "about.t1.body": "ललितपुरमा चार जनाको टोली र एउटै आवासीय ठेक्काबाट सुरु।",
  "about.t2.year": "२०१६",
  "about.t2.body": "आफ्नै स्ट्रक्चरल इन्जिनियरिङ डेस्क थपियो र व्यावसायिक कामतर्फ विस्तार।",
  "about.t3.year": "२०२०",
  "about.t3.body": "डिजाइन र निर्माण एकै ठाउँमा राख्न इन्टेरियर स्टुडियो सुरु।",
  "about.t4.year": "२०२६",
  "about.t4.body": "१२०+ परियोजना र ६० जनाको स्थायी टोली।",
  "about.team.title": "कागजमा मात्र होइन, साइटमा मान्छे",
  "about.team.body": "हरेक परियोजनामा तोकिएको साइट इन्जिनियर दैनिक उपस्थित र सीधै सम्पर्कयोग्य हुन्छन्।",
  "about.craft.title": "विवरणमा कारीगरी",
  "about.craft.body": "हरेक स्ल्याबमा लेभल जाँच, हरेक ढलानमा परीक्षण र ध्यान दिने फिनिसिङ टोली।",

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
