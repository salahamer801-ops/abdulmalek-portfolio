import type { CategoryKey, Lang, StatusKey } from "./content/types";

export const CATEGORY_KEYS: CategoryKey[] = ["ops", "agri", "pm", "tools"];
export const STATUS_KEYS: StatusKey[] = ["live", "dev", "improve", "plan"];

type Dict = Record<string, { ar: string; en: string }>;

export const UI: Dict = {
  navWork: { ar: "المشاريع", en: "Work" },
  navTour: { ar: "جولة حيّة", en: "Live tour" },
  navAbout: { ar: "عنّي", en: "About" },
  navSkills: { ar: "القدرات", en: "Capabilities" },
  navServices: { ar: "الخدمات", en: "Services" },
  navTimeline: { ar: "المسار", en: "Journey" },
  navContact: { ar: "تواصل", en: "Contact" },

  available: { ar: "متاح للعمل عن بُعد", en: "Available for remote work" },
  heroCtaWork: { ar: "استعرض المشاريع", en: "Explore my work" },
  heroLead: { ar: "متخصّص في", en: "Specialising in" },
  liveTelemetry: { ar: "قياس حيّ", en: "Live telemetry" },
  heroCtaResume: { ar: "السيرة الذاتية", en: "Download CV" },
  heroCtaContact: { ar: "تواصل معي", en: "Get in touch" },
  role: { ar: "الوظيفة", en: "Role" },
  localTime: { ar: "توقيت اليمن الآن", en: "Local time in Yemen" },
  systemOnline: { ar: "الأنظمة تعمل", en: "Systems online" },
  projectsBuilt: { ar: "مشاريع مبنية", en: "Projects built" },
  handshake: { ar: "جاهز للتوظيف أو العمل الحر", en: "Open to roles & freelance" },

  aboutTitle: { ar: "عنّي", en: "About" },
  strengthsTitle: { ar: "كيف أعمل", en: "How I work" },
  photoSlot: { ar: "مكان الصورة الشخصية", en: "Profile photo" },
  photoHint: {
    ar: "أرسل صورتك وسأضعها هنا بمقاس مناسب للطباعة والشاشة",
    en: "Send your photo and it will sit here, sized for web and print",
  },
  stageFullstack: { ar: "تطوير كامل", en: "Full-stack" },
  stageApi: { ar: "APIs وقواعد بيانات", en: "APIs & databases" },
  stageRtl: { ar: "واجهات عربية RTL", en: "Arabic RTL UIs" },
  stageDb: { ar: "أنظمة تشغيل ومحاسبة", en: "Operations & accounting" },
  projectSceneHint: { ar: "مشهد ثلاثي الأبعاد — حرّك المؤشر", en: "3D scene — move your pointer" },
  tourTitle: { ar: "جولة حيّة في المكوّنات", en: "A live tour of the parts" },
  tourSub: {
    ar: "شاشات تعمل أمامك الآن — وكل طبقة في الرسم ثلاثي الأبعاد هي جزء حقيقي من النظام.",
    en: "Screens playing in front of you right now — and every layer in the 3D diagram is a real part of the system.",
  },
  tourPlay: { ar: "تشغيل تلقائي", en: "Auto play" },
  tourPause: { ar: "إيقاف مؤقت", en: "Pause" },
  tourHint: { ar: "انقر على أي طبقة لتشرحها", en: "Tap a layer to see it explained" },
  tourLive: { ar: "عرض حيّ", en: "Live" },
  layerUi: { ar: "الواجهة العربية", en: "Arabic interface" },
  layerLogic: { ar: "منطق التشغيل", en: "Business logic" },
  layerApi: { ar: "الـ API", en: "API layer" },
  layerDb: { ar: "قاعدة البيانات", en: "Database" },
  layerReports: { ar: "التقارير", en: "Reports" },
  screenSales: { ar: "المبيعات اليوم", en: "Today's sales" },
  screenExpenses: { ar: "المصروفات", en: "Expenses" },
  screenCollected: { ar: "المحصّل", en: "Collected" },
  screenNet: { ar: "صافي الحساب", en: "Net account" },
  screenRows: { ar: "سجلات المزارع", en: "Farm records" },
  screenWriting: { ar: "جارٍ الحفظ…", en: "Saving…" },
  screenSaved: { ar: "تم الحفظ", en: "Saved" },
  screenTasks: { ar: "مهام التشغيل", en: "Operations" },
  screenBackup: { ar: "نسخة احتياطية", en: "Backup" },

  skillsTitle: { ar: "القدرات والمهارات", en: "Capabilities" },
  skillsSub: {
    ar: "من الواجهة العربية إلى قاعدة البيانات — التقنيات التي أبني بها الأنظمة.",
    en: "From the Arabic interface to the database — the tools I build systems with.",
  },

  workTitle: { ar: "المشاريع", en: "Projects" },
  workSub: {
    ar: "أنظمة حقيقية تُستخدم فعليًا: تشغيل، محاسبة، إدارة، وأدوات رقمية.",
    en: "Real systems in real use: operations, accounting, management and digital tools.",
  },
  filterAll: { ar: "الكل", en: "All" },
  catOps: { ar: "أنظمة وتشغيل", en: "Operations & systems" },
  catAgri: { ar: "محاسبة وزراعة", en: "Accounting & agriculture" },
  catPm: { ar: "إدارة ومهام", en: "Management & tasks" },
  catTools: { ar: "أدوات ويب", en: "Web tools" },
  statusLive: { ar: "مُشغَّل", en: "In use" },
  statusDev: { ar: "قيد التطوير", en: "In development" },
  statusImprove: { ar: "قيد التحسين", en: "Being improved" },
  statusPlan: { ar: "قيد التخطيط", en: "Planned" },
  featured: { ar: "المشروع الرئيسي", en: "Flagship project" },
  searchProjects: { ar: "ابحث في المشاريع أو التقنيات…", en: "Search projects or tech…" },
  details: { ar: "تفاصيل المشروع", en: "Case study" },
  liveDemo: { ar: "تجربة مباشرة", en: "Live demo" },
  noResults: { ar: "لا نتائج مطابقة.", en: "No matching projects." },
  backToWork: { ar: "كل المشاريع", en: "All projects" },
  theIdea: { ar: "الفكرة", en: "The idea" },
  highlights: { ar: "أبرز المميزات", en: "What it does" },
  techStack: { ar: "التقنيات والبنية", en: "Tech & architecture" },
  theGoal: { ar: "الهدف", en: "The goal" },
  futurePlans: { ar: "الاتجاه المستقبلي", en: "What's next" },
  relatedProjects: { ar: "مشاريع ذات صلة", en: "Related projects" },
  askAbout: { ar: "راسلني عن هذا المشروع", en: "Ask me about this project" },
  printProject: { ar: "طباعة / PDF", en: "Print / PDF" },
  screenshotsSoon: {
    ar: "لقطات المشروع تُضاف قريبًا — أرسل صورك وسأضعها هنا.",
    en: "Screenshots coming soon — send yours and they will appear here.",
  },

  servicesTitle: { ar: "كيف أستطيع مساعدتك", en: "How I can help" },
  servicesSub: {
    ar: "من فكرة في ورقة إلى نظام يعمل يوميًا على الهاتف.",
    en: "From an idea on paper to a system that runs daily on a phone.",
  },

  timelineTitle: { ar: "المسار", en: "Journey" },
  testimonialsTitle: { ar: "توصيات", en: "Recommendations" },

  contactTitle: { ar: "لنعمل معًا", en: "Let's work together" },
  contactSub: {
    ar: "متاح للوظائف عن بُعد والمشاريع الحرّة — أسرع طريقة هي البريد أو واتساب.",
    en: "Open to remote roles and freelance projects — email or WhatsApp is fastest.",
  },
  copyEmail: { ar: "نسخ البريد", en: "Copy email" },
  copied: { ar: "تم النسخ ✓", en: "Copied ✓" },
  sendEmail: { ar: "أرسل بريدًا", en: "Send an email" },
  whatsapp: { ar: "واتساب", en: "WhatsApp" },
  linkedin: { ar: "لينكدإن", en: "LinkedIn" },
  github: { ar: "جيت هاب", en: "GitHub" },
  emailMissing: {
    ar: "أضف بريدك من لوحة التحرير ليظهر هنا",
    en: "Add your email in the editor to show it here",
  },

  resume: { ar: "السيرة الذاتية", en: "Résumé" },
  printCv: { ar: "حمّل PDF / اطبع", en: "Download PDF / Print" },
  close: { ar: "إغلاق", en: "Close" },
  next: { ar: "التالي", en: "Next" },
  previous: { ar: "السابق", en: "Previous" },
  zoomIn: { ar: "اضغط للتكبير", en: "Tap to zoom" },
  zoomOut: { ar: "اضغط للتصغير", en: "Tap to zoom out" },
  viewAll: { ar: "عرض الكل", en: "View all" },
  skipIntro: { ar: "تخطّي", en: "Skip" },
  scrollCue: { ar: "اكتشف المزيد", en: "Scroll to explore" },
  loadingLabel: { ar: "جارٍ تحضير الملف", en: "Preparing the file" },
  summary: { ar: "نبذة", en: "Summary" },
  keyProjects: { ar: "مشاريع مختارة", en: "Selected projects" },
  languagesLabel: { ar: "اللغات", en: "Languages" },
  arabicNative: { ar: "العربية — اللغة الأم", en: "Arabic — native" },
  englishPro: { ar: "الإنجليزية — احترافية عملية", en: "English — professional working" },

  footerRights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  editToggle: { ar: "وضع التحرير", en: "Edit mode" },
  editHint: { ar: "تعديل مباشر — انقر أي نص", en: "Click any text to edit it" },
  langName: { ar: "العربية", en: "English" },
};

export function tr(key: string, lang: Lang): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang];
}

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  ops: "catOps",
  agri: "catAgri",
  pm: "catPm",
  tools: "catTools",
};

export const STATUS_LABEL: Record<StatusKey, string> = {
  live: "statusLive",
  dev: "statusDev",
  improve: "statusImprove",
  plan: "statusPlan",
};

export const STATUS_TONE: Record<StatusKey, string> = {
  live: "#16a34a",
  dev: "#2aa3e0",
  improve: "#d97706",
  plan: "#7c3aed",
};
