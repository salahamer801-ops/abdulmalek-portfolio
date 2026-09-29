import type { Content } from "./types";

/**
 * كل المحتوى الافتراضي للموقع — عربي/إنجليزي.
 * يمكن تعديل كل شيء من «وضع التحرير» داخل الموقع، أو من هنا مباشرة.
 */
export const defaultContent: Content = {
  settings: {
    accent: "#2aa3e0",
    navy: "#123a76",
    ink: "#1b2a46",
    muted: "#5c6d8a",
    pageTitle: {
      ar: "عبدالملك عامر | مطوّر أنظمة وتطبيقات ويب",
      en: "Abdulmalek Saleh Amer | Systems & Web Developer",
    },
    motion: "full",
    showStats: true,
    showTimeline: true,
    showTestimonials: false,
    showResume: true,
    showGallery: true,
    showPortrait: true,
    show3d: true,
  },

  labels: {
    tour: { ar: "جولة حيّة في المكوّنات", en: "A live tour of the parts" },
    tourSub: {
      ar: "شاشات تعمل أمامك الآن — وكل طبقة في الرسم ثلاثي الأبعاد جزء حقيقي من النظام.",
      en: "Screens playing in front of you now — every layer in the 3D diagram is a real part of the system.",
    },
    about: { ar: "عنّي", en: "About" },
    skills: { ar: "القدرات والمهارات", en: "Capabilities" },
    skillsSub: {
      ar: "من الواجهة العربية إلى قاعدة البيانات — التقنيات التي أبني بها الأنظمة.",
      en: "From the Arabic interface to the database — the tools I build systems with.",
    },
    work: { ar: "المشاريع", en: "Projects" },
    workSub: {
      ar: "أنظمة حقيقية قيد الاستخدام: تشغيل، محاسبة، إدارة، وأدوات رقمية.",
      en: "Real systems in real use: operations, accounting, management and digital tools.",
    },
    services: { ar: "كيف أستطيع مساعدتك", en: "How I can help" },
    servicesSub: {
      ar: "من فكرة في ورقة إلى نظام يعمل يوميًا على الهاتف.",
      en: "From an idea on paper to a system that runs daily on a phone.",
    },
    timeline: { ar: "المسار", en: "Journey" },
    gallery: { ar: "لقطات من العمل", en: "Inside the work" },
    gallerySub: {
      ar: "شاشات وهويات من الأنظمة التي أبنيها — اضغط أي صورة لعرضها بحجم كامل.",
      en: "Screens and identities from the systems I build — tap any image to view it full size.",
    },
    testimonials: { ar: "توصيات", en: "Recommendations" },
    contact: { ar: "لنعمل معًا", en: "Let's work together" },
    contactSub: {
      ar: "متاح للوظائف عن بُعد والمشاريع الحرّة — أسرع طريقة هي البريد أو واتساب.",
      en: "Open to remote roles and freelance projects — email or WhatsApp is fastest.",
    },
  },

  profile: {
    name: { ar: "عبدالملك عامر", en: "Abdulmalek Saleh Amer" },
    title: { ar: "مطوّر أنظمة وتطبيقات ويب", en: "Systems & Web Developer" },
    subtitle: {
      ar: "Full-stack · Backend · API · قواعد بيانات",
      en: "Full-stack · Backend · API · Databases",
    },
    roles: {
      ar: [
        "أنظمة تشغيل ومحاسبة",
        "تطبيقات ويب كاملة",
        "واجهات عربية RTL",
        "تطبيقات موبايل",
        "منصات أدوات رقمية",
      ],
      en: [
        "operations & accounting systems",
        "complete web applications",
        "Arabic RTL interfaces",
        "cross-platform mobile apps",
        "digital tools platforms",
      ],
    },
    tagline: {
      ar: "أبني أنظمة تعمل بلا انقطاع — من الفكرة إلى قاعدة البيانات إلى يد المستخدم.",
      en: "I build systems that keep running — from the idea to the database to the user's hands.",
    },
    availability: { ar: "متاح للعمل عن بُعد", en: "Available for remote work" },
    location: { ar: "اليمن — عن بُعد", en: "Yemen — remote" },
    aboutLead: {
      ar: "أبني أنظمة كاملة، من الواجهة إلى قاعدة البيانات.",
      en: "I build complete systems, from the interface to the database.",
    },
    about: {
      ar: "أعمل على تطوير أنظمة وتطبيقات تحلّ مشاكل تشغيلية ومحاسبية حقيقية: تنظيم مضخات المياه والمساهمين، حسابات مزارع القات، إدارة المشاريع والفرق، ومنصات الأدوات الرقمية. أُتقن بناء الواجهات العربية باتجاه RTL، وتصميم قواعد البيانات، وبناء APIs موثوقة، وربط كل ذلك بتجربة استخدام بسيطة تعمل على الهاتف قبل الكمبيوتر.",
      en: "I build systems and apps that solve real operational and accounting problems: water pump and shareholder management, qat farm accounting, project and team management, and digital tools platforms. I design Arabic RTL interfaces, database schemas and reliable APIs — and connect them through a simple experience that works on phones first.",
    },
    email: "salahamer801@gmail.com",
    whatsapp: "+967 774 953 820",
    linkedin: "https://www.linkedin.com/in/abdulmalek-saleh-amer-70057226b",
    github: "",
    avatar: "/profile/avatar.webp",
    portrait: "/profile/portrait.webp",
  },

  strengths: [
    {
      title: { ar: "من الواجهة إلى قاعدة البيانات", en: "Interface to database" },
      text: {
        ar: "أنظمة متكاملة: واجهة، Backend، API، قاعدة بيانات، ونظام صلاحيات.",
        en: "End-to-end systems: UI, backend, API, database and a permission model.",
      },
    },
    {
      title: { ar: "عربي أولًا (RTL)", en: "Arabic-first (RTL)" },
      text: {
        ar: "واجهات عربية سليمة الاتجاه، سريعة، ومريحة للاستخدام اليومي من الهاتف.",
        en: "Proper right-to-left Arabic interfaces — fast and comfortable on a phone.",
      },
    },
    {
      title: { ar: "فهم ميداني للتشغيل والمحاسبة", en: "Field-level insight" },
      text: {
        ar: "خبرة عملية في قطاع الزراعة والتشغيل: مضخات، ديالة، مساهمون، ديون، تحصيل، وتقارير.",
        en: "Hands-on experience in agriculture and operations: pumps, shifts, shareholders, debts, collections and reports.",
      },
    },
  ],

  tour: [
    {
      title: { ar: "واجهة عربية RTL تعمل على الهاتف أولًا", en: "Arabic RTL interface, phone first" },
      text: {
        ar: "الشاشة تُبنى باتجاه عربي صحيح: الأرقام، الجداول، والنماذج كلها تُقرأ من اليمين، وتعمل بيد واحدة على الهاتف. كل زر وكل قائمة يظهران بترتيب منطقي، بلا حشو وبلا خطوات زائدة.",
        en: "Screens are built right-to-left from the ground up: numbers, tables and forms read naturally, and everything works one-handed on a phone. Every control appears in a logical order, with no filler steps.",
      },
    },
    {
      title: { ar: "منطق التشغيل وقواعد البيانات", en: "Business logic and databases" },
      text: {
        ar: "خلف الواجهة منطق مكتوب بعناية: سجلات، أرصدة، ديون، حصص مساهمين، وسجل تعديلات. كل رقم في الشاشة محسوب من قاعدة بيانات منظّمة، فلا تكرار بيانات ولا نتائج متناقضة.",
        en: "Behind the interface sits deliberate logic: records, balances, debts, shareholder shares and an audit trail. Every number on screen comes from a structured database, so nothing is duplicated and nothing contradicts.",
      },
    },
    {
      title: { ar: "لوحات ومؤشرات وتقارير", en: "Dashboards, indicators and reports" },
      text: {
        ar: "المؤشرات تُعرض لحظيًا: مبيعات، مصروفات، تحصيل، وصافي الحساب، مع رسوم بيانية بسيطة وتقارير قابلة للتصدير — ليقرأ صاحب العمل حالته في ثوانٍ لا في صفحات.",
        en: "Indicators are live: sales, expenses, collection and net balance, with simple charts and exportable reports — so an owner reads their position in seconds, not pages.",
      },
    },
    {
      title: { ar: "استمرارية التشغيل والصيانة", en: "Uptime and maintenance" },
      text: {
        ar: "النظام يبقى صالحًا للاستخدام اليومي: نسخ احتياطي، صلاحيات لكل مستخدم، وسجل يوضح من عدّل ماذا ومتى. أُسلّم مع شرح واضح، وأتابع التحسين بعد التشغيل.",
        en: "The system stays usable day after day: backups, per-user permissions, and a log of who changed what and when. I hand it over with clear documentation and keep improving it after launch.",
      },
    },
  ],
  stats: [
    { value: "4", label: { ar: "مشاريع مبنية", en: "Projects built" } },
    { value: "3", label: { ar: "قطاعات: تشغيل، زراعة، إدارة", en: "Sectors: ops, agri, management" } },
    { value: "Web + API + DB", label: { ar: "بنية كل نظام أبنيه", en: "The stack behind each system" } },
  ],

  skills: [
    {
      title: { ar: "تطبيقات الويب والواجهات", en: "Web apps & interfaces" },
      items: ["TypeScript", "JavaScript", "HTML", "CSS", "RTL interfaces", "Responsive design"],
    },
    {
      title: { ar: "الخادم وواجهات البرمجة", en: "Backend & APIs" },
      items: ["Backend APIs", "REST", "Authentication", "Roles & permissions"],
    },
    {
      title: { ar: "قواعد البيانات والحسابات", en: "Databases & accounting logic" },
      items: ["MySQL", "Drizzle ORM", "Data modeling", "Reports & exports"],
    },
    {
      title: { ar: "تطبيقات الموبايل", en: "Mobile apps" },
      items: ["React Native", "Expo", "Expo Router", "NativeWind", "tRPC"],
    },
    {
      title: { ar: "أنظمة التشغيل والمحاسبة", en: "Operations & accounting systems" },
      items: [
        "Pump operations",
        "Shift tracking (Dayala)",
        "Shareholders & shares",
        "Fuel & payments",
        "Debts & collections",
        "Multi-currency records",
        "Archiving",
      ],
    },
    {
      title: { ar: "الأدوات وسير العمل", en: "Tools & workflow" },
      items: ["Git", "GitHub", "Digital tools platforms", "AI-assisted development"],
    },
  ],

  services: [
    {
      icon: "layers",
      title: { ar: "تطبيق أو نظام مخصّص", en: "Custom app or system" },
      text: {
        ar: "من التحليل إلى نظام يعمل: واجهة عربية، Backend، API، قاعدة بيانات، وصلاحيات.",
        en: "From analysis to a working system: Arabic UI, backend, API, database and permissions.",
      },
    },
    {
      icon: "calculator",
      title: { ar: "نظام حسابات وتقارير", en: "Accounting & reporting system" },
      text: {
        ar: "سجلات، مصروفات، ديون، تحصيل، عملات متعددة، تقارير وتصدير بيانات.",
        en: "Records, expenses, debts, collections, multi-currency, reports and data export.",
      },
    },
    {
      icon: "gauge",
      title: { ar: "أتمتة تشغيل ميداني", en: "Operations automation" },
      text: {
        ar: "جدولة وتشغيل ومتابعة استهلاك وصيانة، مع لوحات تحكم ومؤشرات لحظية.",
        en: "Scheduling, consumption and maintenance tracking, with dashboards and live indicators.",
      },
    },
    {
      icon: "globe",
      title: { ar: "موقع احترافي", en: "Professional website" },
      text: {
        ar: "موقع سريع بالعربية والإنجليزية، سليم على الهاتف، وجاهز للظهور في محركات البحث.",
        en: "A fast Arabic/English website that works on phones and is ready for search engines.",
      },
    },
    {
      icon: "phone",
      title: { ar: "تطبيق موبايل متعدد المنصات", en: "Cross-platform mobile app" },
      text: {
        ar: "React Native و Expo مع واجهة عربية سليمة وتجربة سلسة.",
        en: "React Native and Expo with a proper Arabic interface and a smooth experience.",
      },
    },
    {
      icon: "sparkles",
      title: { ar: "منصات أدوات ودمج الذكاء الاصطناعي", en: "Tools platforms & AI integration" },
      text: {
        ar: "منصات أدوات رقمية قابلة للتوسع، ودمج الذكاء الاصطناعي في سير العمل.",
        en: "Scalable digital tools platforms, and AI woven into everyday workflows.",
      },
    },
  ],

  timeline: [
    {
      period: { ar: "الآن", en: "Now" },
      role: { ar: "تنظيم المضخات — المشروع الرئيسي", en: "Pump Management — flagship project" },
      place: { ar: "Web · Backend · Database · API", en: "Web · Backend · Database · API" },
      text: {
        ar: "تطوير نظام تشغيل المضخات (الديالة، المساهمون، الوقود، المدفوعات، الصلاحيات)، مع اتجاه لتحويله إلى تطبيق Android.",
        en: "Building the pump operations system (shifts, shareholders, fuel, payments, permissions), with an Android app in progress.",
      },
    },
    {
      period: { ar: "2024 — الآن", en: "2024 — Present" },
      role: { ar: "مطوّر مستقل — أنظمة وتطبيقات", en: "Independent developer — systems & apps" },
      place: { ar: "عن بُعد", en: "Remote" },
      text: {
        ar: "تطوير أنظمة تشغيلية ومحاسبية، ومواقع، وتطبيقات موبايل لاحتياجات حقيقية في السوق المحلي.",
        en: "Building operational and accounting systems, websites and mobile apps for real local market needs.",
      },
    },
    {
      period: { ar: "مستمر", en: "Ongoing" },
      role: { ar: "تعلّم ذاتي ومشاريع عملية", en: "Self-taught, project-driven learning" },
      place: { ar: "Web · Mobile · AI", en: "Web · Mobile · AI" },
      text: {
        ar: "تعلّم مستمر عبر بناء مشاريع حقيقية: React Native وTypescript، تصميم قواعد البيانات، وبناء APIs.",
        en: "Continuous learning through real projects: React Native and TypeScript, database design, and API building.",
      },
    },
  ],

  testimonials: [],

  gallery: [
    {
      image: "/projects/qat-accounts-mobile.webp",
      fit: "contain",
      tone: "#2aa3e0",
      visible: true,
      caption: { ar: "حسابات القات — على الهاتف", en: "Qat Accounts on mobile" },
      note: { ar: "مبيعات، مصروفات، ديون، تحصيل، وصافي الحساب", en: "Sales, expenses, debts, collection and net account" },
    },
    {
      image: "/projects/qat-accounts.webp",
      fit: "cover",
      tone: "#16a34a",
      visible: true,
      caption: { ar: "لوحة حسابات مزارع القات", en: "Qat farm accounts dashboard" },
      note: { ar: "المؤشرات المالية والتقارير في شاشة واحدة", en: "Financial indicators and reports in one screen" },
    },
    {
      image: "/projects/pump-management.webp",
      fit: "contain",
      tone: "#2aa3e0",
      visible: true,
      caption: { ar: "هوية نظام إدارة المضخات", en: "Pump Management identity" },
      note: { ar: "التطبيق الرئيسي — تشغيل، ديانة، مساهمون، مدفوعات", en: "Flagship app — operations, shareholders, payments" },
    },
    {
      image: "/projects/project-hub.webp",
      fit: "cover",
      tone: "#7c3aed",
      visible: true,
      caption: { ar: "لوحة تحكم Project Hub", en: "Project Hub dashboard" },
      note: { ar: "واجهة إدارة المهام والمشاريع", en: "Tasks and projects board" },
    },
    {
      image: "/gallery/data-screens.webp",
      fit: "cover",
      tone: "#0891b2",
      visible: false,
      caption: { ar: "شاشات البيانات والتقارير", en: "Data & reports screens" },
      note: { ar: "مؤشرات لحظية وتقارير قابلة للتصدير", en: "Live indicators and exportable reports" },
    },
    {
      image: "/gallery/monitoring.webp",
      fit: "cover",
      tone: "#d97706",
      visible: false,
      caption: { ar: "المراقبة والاستهلاك", en: "Monitoring & consumption" },
      note: { ar: "متابعة التشغيل والوقود والصيانة", en: "Operations, fuel and maintenance" },
    },
    {
      image: "/gallery/workspace.webp",
      fit: "cover",
      tone: "#e11d48",
      visible: true,
      caption: { ar: "مساحة البناء", en: "Where it gets built" },
      note: { ar: "تخطيط، تصميم، ثم كود يشتغل", en: "Plan, design, then code that runs" },
    },
    {
      image: "/projects/toolnest.webp",
      fit: "cover",
      tone: "#d97706",
      visible: true,
      caption: { ar: "منصّة الأدوات ToolNest", en: "ToolNest tools platform" },
      note: { ar: "ثمانية أقسام أدوات رقمية بواجهة عربية", en: "Eight tool categories in an Arabic interface" },
    },
    {
      image: "/gallery/colors.webp",
      fit: "cover",
      tone: "#7c3aed",
      visible: false,
      caption: { ar: "الألوان والهوية البصرية", en: "Colour & visual identity" },
      note: { ar: "لوحة لونية لكل نظام", en: "A palette tuned for every system" },
    },
  ],

  projects: [
    {
      slug: "pump-management",
      name: { ar: "تنظيم المضخات", en: "Pump Management" },
      category: "ops",
      status: "live",
      featured: true,
      visible: true,
      tone: "#2aa3e0",
      image: "/projects/pump-management.webp",
      imageFit: "contain",
      link: "",
      tagline: {
        ar: "إدارة كاملة للمضخة — من الديالة والمساهمين إلى الوقود والمدفوعات — بصلاحيات دقيقة.",
        en: "Complete pump operations — from shifts and shareholders to fuel and payments, with precise permissions.",
      },
      summary: {
        ar: "نظام لتشغيل وإدارة مضخات المياه: متابعة الديالة، وتوضيح حصة كل مساهم، وتسجيل الوقود والمدفوعات، مع صلاحيات تحدد ما يراه كل مستخدم ويعدّله.",
        en: "A system for running water pumps: shift tracking, clear shares for each partner, fuel and payment records — with permissions deciding what each user sees and changes.",
      },
      role: {
        ar: "تصميم وتطوير كامل: الواجهة، الـBackend، الـAPI، وقاعدة البيانات.",
        en: "Full design & development: interface, backend, API and database.",
      },
      idea: {
        ar: "إدارة المضخات تعتمد عادةً على دفاتر ورقية وتفاهمات شفهية بين مساهمين متعددين، فتتكرر الأخطاء ويصعب معرفة نصيب كل مساهم. بنيت نظامًا يجمع المضخة والديالة والمساهمين والحسابات والوقود والمدفوعات في مسار واحد واضح، مع صلاحيات تمنع الفوضى وتمنح كل مستخدم ما يحتاجه فقط.",
        en: "Pump operations usually live in paper ledgers and verbal agreements between several shareholders — mistakes pile up and each share becomes unclear. I built a system that keeps the pump, its shifts, shareholders, accounts, fuel and payments in one clear flow, with permissions that keep control and give each user exactly what they need.",
      },
      features: {
        ar: [
          "إدارة المضخة وبياناتها الأساسية",
          "الديالة: متابعة دورات التشغيل والري",
          "المساهمون: حصص ونسب واضحة لكل مساهم",
          "الحسابات: تسجيل ومراجعة كل الحركات المالية",
          "الوقود: متابعة الاستهلاك والتكاليف",
          "المدفوعات: تسجيل الدفعات والمستحقات",
          "الصلاحيات: أدوار مستخدمين تحدد الوصول والتعديل",
        ],
        en: [
          "Pump profile and core settings",
          "Shifts (Dayala): tracking operating and irrigation cycles",
          "Shareholders: clear shares for every partner",
          "Accounts: record and review every financial movement",
          "Fuel: consumption and cost tracking",
          "Payments: dues and paid amounts",
          "Permissions: roles that limit access and editing",
        ],
      },
      tech: ["Web", "Backend", "REST API", "Database", "Permissions & roles", "Android (planned)"],
      goal: {
        ar: "تشغيل منظّم يمنع الفوضى الحسابية، ويعطي كل مساهم وضوحًا في حصته واستهلاكه، ويحوّل السجل الورقي إلى بيانات يمكن الرجوع إليها في أي وقت.",
        en: "Orderly operations that end accounting chaos: every shareholder sees their share and consumption clearly, and paper records become data you can recall at any time.",
      },
      future: {
        ar: "التحويل إلى تطبيق Android ليكون التشغيل الميداني من الجوال مباشرة، مع تقارير ولوحات مؤشرات أوسع.",
        en: "Moving to an Android app so field operators work directly from the phone, plus wider reporting and dashboards.",
      },
    },

    {
      slug: "qat-accounts",
      name: { ar: "حسابات القات", en: "Qat Accounts" },
      category: "agri",
      status: "improve",
      featured: false,
      visible: true,
      tone: "#16a34a",
      image: "/projects/qat-accounts-mobile.webp",
      imageFit: "contain",
      link: "",
      tagline: {
        ar: "حسابات مزارع القات والمزارع والمبيعات والمصروفات والديون والتحصيل في مكان واحد.",
        en: "Qat farm accounts — farms, sales, expenses, debts and collections in one place.",
      },
      summary: {
        ar: "نظام رقمي لإدارة الحسابات المرتبطة بمزارع القات، يساعد أصحاب المزارع على تنظيم العمليات المالية اليومية والاستغناء قدر الإمكان عن الدفاتر والحسابات المتفرقة.",
        en: "A digital system for qat farm accounts, helping owners organise daily financial work and leave scattered paper ledgers behind as much as possible.",
      },
      role: {
        ar: "تصميم وتطوير: بنية البيانات، الواجهة، والمعالجة الحسابية.",
        en: "Design & development: data model, interface and accounting logic.",
      },
      idea: {
        ar: "العمل الزراعي في القات يقوم على عمليات يومية متكررة: مبيعات ومصروفات وديون وتحصيل من عدة أطراف، وغالبًا بعملات مختلفة. جمعت ذلك في نظام واحد يربط كل سجل بمزرعته، ويحفظ تاريخ الحركة بدل الاعتماد على الورق.",
        en: "Qat farming runs on repeated daily operations — sales, expenses, debts and collections from several parties, often in different currencies. I brought all of it into one system where every record belongs to its farm and the history is kept instead of paper.",
      },
      features: {
        ar: [
          "إدارة عدة مزارع وسجلاتها",
          "تسجيل العمليات المالية اليومية",
          "إدارة المصروفات وتوزيعها",
          "متابعة الديون والمبالغ المستحقة",
          "تسجيل عمليات التحصيل والسداد",
          "دعم العملات المختلفة حسب السجل",
          "أرشفة المزارع والسجلات بدل حذفها نهائيًا",
          "تعديل البيانات مع المحافظة على تنظيم الحسابات",
          "تقارير وتصدير للبيانات",
          "واجهة مناسبة للاستخدام اليومي من الهاتف",
        ],
        en: [
          "Manage several farms and their records",
          "Log daily financial transactions",
          "Manage and allocate expenses",
          "Track debts and outstanding amounts",
          "Record collections and repayments",
          "Support different currencies per record",
          "Archive farms and records instead of deleting them",
          "Edit data while keeping accounts organised",
          "Reports and data export",
          "A phone-first interface for daily use",
        ],
      },
      tech: ["Web", "Database", "Accounting logic", "Reports & export", "Archiving"],
      goal: {
        ar: "أداة محاسبية عملية وبسيطة تناسب طبيعة العمل الزراعي، وتُظهر لصاحب المزرعة وضعه المالي الحقيقي بدل الحسابات الورقية المتفرقة.",
        en: "A practical, simple accounting tool that fits agricultural work and shows the owner their real financial position instead of scattered paper.",
      },
      future: {
        ar: "تحسين التقارير والتحليلات، وتوسيع التجربة على الجوال، وإضافة أدوار مستخدمين عند الحاجة.",
        en: "Stronger reports and analytics, a wider mobile experience, and user roles when needed.",
      },
    },

    {
      slug: "project-hub",
      name: { ar: "مركز المشاريع", en: "Project Hub" },
      category: "pm",
      status: "dev",
      featured: false,
      visible: true,
      tone: "#7c3aed",
      image: "/projects/project-hub.webp",
      imageFit: "cover",
      link: "",
      tagline: {
        ar: "طريقة واضحة لمتابعة المشاريع بدل الملاحظات والملفات المتفرقة.",
        en: "One clear way to follow projects instead of scattered notes and files.",
      },
      summary: {
        ar: "منصة لإدارة وتنظيم المشاريع والمهام ومراحل التنفيذ في مكان واحد، تركّز على تنظيم دورة العمل من إنشاء المشروع إلى رؤية واضحة عن تقدّمه.",
        en: "A platform to manage projects, tasks and execution phases in one place — organising the cycle from creating a project to a clear view of its progress.",
      },
      role: {
        ar: "تصميم وتطوير التطبيق: الواجهة العربية، إدارة الحالة، والربط مع الخادم وقاعدة البيانات.",
        en: "App design & development: Arabic interface, state management, and server/database integration.",
      },
      idea: {
        ar: "المتابعة عبر الملاحظات المتفرقة تُفقد المشروع مساره: من أنجز ماذا، وأين وصل العمل. بنيت مركز مشاريع يمنح كل مشروع مساحة واحدة فيها المهام والمراحل والحالة، بواجهة عربية سليمة تعمل من الجوال أينما كان صاحب المشروع.",
        en: "Scattered notes lose the thread: who did what, and where things stand. Project Hub gives every project one space holding its tasks, phases and status, in a proper Arabic interface that works from the phone wherever the owner is.",
      },
      features: {
        ar: [
          "إنشاء وإدارة المشاريع",
          "تنظيم المهام والأنشطة",
          "متابعة حالة المشاريع والمهام",
          "تقسيم العمل إلى مراحل",
          "واجهة مهيأة للاستخدام على الهواتف",
          "دعم اللغة العربية واتجاه RTL",
          "بنية قابلة للتوسع مستقبلًا",
          "إمكانية التطوير لتشمل فرق العمل والصلاحيات والتعاون",
        ],
        en: [
          "Create and manage projects",
          "Organise tasks and activities",
          "Track project and task status",
          "Split work into phases",
          "Phone-first interface",
          "Arabic and RTL support",
          "Scalable architecture",
          "Planned teams, permissions and collaboration",
        ],
      },
      tech: [
        "React Native",
        "Expo",
        "TypeScript",
        "Expo Router",
        "NativeWind",
        "tRPC",
        "Drizzle ORM",
        "MySQL",
      ],
      goal: {
        ar: "بناء مساحة مركزية تساعد أصحاب المشاريع والمطورين والفرق الصغيرة على تنظيم أعمالهم ومتابعة تقدّمها بطريقة واضحة وبسيطة.",
        en: "Give project owners, developers and small teams one central space to organise work and follow progress simply and clearly.",
      },
      future: {
        ar: "إضافة فرق العمل والصلاحيات والتعاون بين المستخدمين.",
        en: "Team workspaces, permissions and collaboration between users.",
      },
    },

    {
      slug: "toolnest",
      name: { ar: "ToolNest", en: "ToolNest" },
      category: "tools",
      status: "plan",
      featured: false,
      visible: true,
      tone: "#d97706",
      image: "/projects/toolnest.webp",
      imageFit: "cover",
      link: "",
      tagline: {
        ar: "أدواتك الصغيرة في مكان واحد — مباشرة من المتصفح، بلا تثبيت برامج.",
        en: "All your small tools in one place — right in the browser, nothing to install.",
      },
      summary: {
        ar: "منصة Web تجمع أدوات رقمية مجانية متنوعة، لينفّذ المستخدم المهام الصغيرة والمتكررة من المتصفح مباشرة، مع إضافة أدوات جديدة باستمرار.",
        en: "A web platform gathering a variety of free digital tools so users can handle small, repeated tasks straight from the browser — with new tools added continuously.",
      },
      role: {
        ar: "الفكرة، التصميم، وتطوير المنصة وهيكلة الأدوات.",
        en: "Concept, design, and building the platform and its tool structure.",
      },
      idea: {
        ar: "كان كل احتياج صغير يفرض البحث عن موقع مختلف: ضغط صورة، دمج ملف، حساب سريع… فبنيت منصة واحدة تجمع هذه الأدوات بفئات واضحة، تعمل في المتصفح بلا تثبيت، ويمكن إضافة أدوات جديدة تدريجيًا كلٌّ بشكل مستقل.",
        en: "Every small need meant hunting for a different website — compress an image, merge a file, do a quick calculation. ToolNest gathers those tools in one platform with clear categories, running in the browser with nothing to install, so new tools can be added gradually and independently.",
      },
      features: {
        ar: [
          "أدوات PDF",
          "أدوات معالجة وتحويل الصور",
          "أدوات للمطورين والمبرمجين",
          "أدوات النصوص",
          "أدوات الحساب والتحويل",
          "أدوات الطلاب",
          "أدوات تحويل الملفات",
          "أدوات يومية سريعة",
          "تعمل من المتصفح بلا تثبيت برامج",
          "منصة قابلة للتوسع: كل أداة تُطوَّر مستقلة وتُضاف تدريجيًا",
        ],
        en: [
          "PDF tools",
          "Image processing and conversion",
          "Tools for developers",
          "Text tools",
          "Calculators and converters",
          "Student tools",
          "File conversion",
          "Quick daily utilities",
          "Runs in the browser, nothing to install",
          "Scalable: every tool is built and added independently",
        ],
      },
      tech: ["Web", "Browser-based tools", "Modular structure", "Responsive UI"],
      goal: {
        ar: "منصة أدوات عملية وسريعة تجمع الخدمات الصغيرة التي يحتاجها المستخدمون والطلاب والمطورون في مكان واحد.",
        en: "A fast, practical platform collecting the small services users, students and developers need in one place.",
      },
      future: {
        ar: "إضافة أدوات وخدمات جديدة تدريجيًا، وتحسين تجربة المستخدم، ودعم الوصول من الهاتف والكمبيوتر.",
        en: "Adding new tools and services gradually, refining the experience, and supporting both phone and desktop.",
      },
    },
  ],
};
