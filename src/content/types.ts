export type Lang = "ar" | "en";

/** A bilingual text value. */
export type L = { ar: string; en: string };

/** A bilingual list of texts (features, bullets…). */
export type LList = { ar: string[]; en: string[] };

export type StatusKey = "live" | "dev" | "improve" | "plan";

export type CategoryKey = "ops" | "agri" | "pm" | "tools";

export type IconKey = "layers" | "calculator" | "gauge" | "globe" | "phone" | "sparkles";

export type Project = {
  slug: string;
  name: L;
  category: CategoryKey;
  status: StatusKey;
  featured: boolean;
  visible: boolean;
  tagline: L;
  summary: L;
  role: L;
  idea: L;
  features: LList;
  tech: string[];
  goal: L;
  future: L;
  link: string;
  image: string;
  imageFit: "cover" | "contain";
  tone: string;
};

export type SkillGroup = { title: L; items: string[] };

export type Service = { title: L; text: L; icon: IconKey };

export type TimelineItem = { period: L; role: L; place: L; text: L };

export type Strength = { title: L; text: L };

export type Stat = { value: string; label: L };

export type Testimonial = { name: L; role: L; text: L };

export type GalleryItem = {
  image: string;
  caption: L;
  note: L;
  tone: string;
  fit: "cover" | "contain";
  visible: boolean;
};

export type TourStep = {
  title: L;
  text: L;
};

export type Content = {
  settings: {
    accent: string;
    navy: string;
    ink: string;
    muted: string;
    pageTitle: L;
    motion: "full" | "soft" | "off";
    showStats: boolean;
    showTimeline: boolean;
    showTestimonials: boolean;
    showResume: boolean;
    showGallery: boolean;
    showPortrait: boolean;
    show3d: boolean;
  };
  labels: {
    tour: L;
    tourSub: L;
    about: L;
    skills: L;
    skillsSub: L;
    work: L;
    workSub: L;
    services: L;
    servicesSub: L;
    timeline: L;
    testimonials: L;
    gallery: L;
    gallerySub: L;
    contact: L;
    contactSub: L;
  };
  profile: {
    name: L;
    title: L;
    subtitle: L;
    roles: LList;
    tagline: L;
    availability: L;
    location: L;
    aboutLead: L;
    about: L;
    email: string;
    whatsapp: string;
    linkedin: string;
    github: string;
    avatar: string;
    portrait: string;
  };
  strengths: Strength[];
  tour: TourStep[];
  stats: Stat[];
  skills: SkillGroup[];
  services: Service[];
  timeline: TimelineItem[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  projects: Project[];
};
