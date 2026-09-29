import { useRef, useState } from "react";
import { useStore } from "../store";
import type { CategoryKey, IconKey, Project, StatusKey } from "../content/types";
import { CATEGORY_KEYS, CATEGORY_LABEL, STATUS_KEYS, STATUS_LABEL } from "../i18n";
import { SERVICE_ICONS, Icon } from "./Icons";

/* ---------------- small building blocks ---------------- */

function Field({
  label,
  path,
  multiline,
  rows = 3,
}: {
  label: string;
  path: string;
  multiline?: boolean;
  rows?: number;
}) {
  const { get, set, lang } = useStore();
  const full = `${path}.${lang}`;
  const value: string = get(full) ?? "";
  return (
    <label className="block">
      <span className="panel-label">{label}</span>
      {multiline ? (
        <textarea
          className="panel-field mt-1"
          rows={rows}
          value={value}
          onChange={(event) => set(full, event.target.value)}
        />
      ) : (
        <input
          className="panel-field mt-1"
          value={value}
          onChange={(event) => set(full, event.target.value)}
        />
      )}
    </label>
  );
}

function RawField({
  label,
  path,
  dir,
  placeholder,
  type = "text",
}: {
  label: string;
  path: string;
  dir?: "ltr" | "rtl";
  placeholder?: string;
  type?: string;
}) {
  const { get, set } = useStore();
  const value: string = get(path) ?? "";
  return (
    <label className="block">
      <span className="panel-label">{label}</span>
      <input
        className="panel-field mt-1 mono"
        dir={dir}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => set(path, event.target.value)}
      />
    </label>
  );
}

function StringList({ label, path, placeholder }: { label: string; path: string; placeholder?: string }) {
  const { get, set, insert, remove, move } = useStore();
  const list: string[] = get(path) ?? [];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="panel-label">{label}</span>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => insert(path, list.length, "")}
          aria-label="add"
        >
          <Icon name="plus" size={14} />
        </button>
      </div>
      <div className="mt-1.5 space-y-1.5">
        {list.map((item, index) => (
          <div key={index} className="flex items-start gap-1">
            <input
              className="panel-field"
              value={item}
              placeholder={placeholder}
              onChange={(event) => set(`${path}.${index}`, event.target.value)}
            />
            <button
              type="button"
              className="btn btn-ghost btn-sm px-2"
              onClick={() => move(path, index, -1)}
              aria-label="up"
            >
              <Icon name="up" size={13} />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm px-2"
              onClick={() => move(path, index, 1)}
              aria-label="down"
            >
              <Icon name="down" size={13} />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm px-2 text-[#b91c1c]"
              onClick={() => remove(path, index)}
              aria-label="delete"
            >
              <Icon name="trash" size={13} />
            </button>
          </div>
        ))}
        {!list.length ? <p className="text-[12px] text-[color:var(--color-muted)]">لا عناصر بعد.</p> : null}
      </div>
    </div>
  );
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between rounded-xl border border-[color:var(--color-line)] px-3 py-2 text-start text-[13px]"
      aria-pressed={value}
    >
      <span className="text-[color:var(--color-navy)]">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition ${value ? "bg-[color:var(--color-brand)]" : "bg-[#cbd5e1]"}`}
      >
        <span
          className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
          style={{ insetInlineStart: value ? "18px" : "3px" }}
        />
      </span>
    </button>
  );
}

function Card({
  title,
  children,
  onRemove,
  onUp,
  onDown,
}: {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[color:var(--color-line)] bg-white">
      <div className="flex items-center gap-1 px-3 py-2">
        <button type="button" className="flex-1 text-start text-[13px] font-bold text-[color:var(--color-navy)]" onClick={() => setOpen((v) => !v)}>
          {title}
        </button>
        {onUp ? (
          <button type="button" className="btn btn-ghost btn-sm px-2" onClick={onUp} aria-label="up">
            <Icon name="up" size={13} />
          </button>
        ) : null}
        {onDown ? (
          <button type="button" className="btn btn-ghost btn-sm px-2" onClick={onDown} aria-label="down">
            <Icon name="down" size={13} />
          </button>
        ) : null}
        {onRemove ? (
          <button type="button" className="btn btn-ghost btn-sm px-2 text-[#b91c1c]" onClick={onRemove} aria-label="delete">
            <Icon name="trash" size={13} />
          </button>
        ) : null}
        <button type="button" className="btn btn-ghost btn-sm px-2" onClick={() => setOpen((v) => !v)} aria-label="toggle">
          <Icon name={open ? "up" : "down"} size={13} />
        </button>
      </div>
      {open ? <div className="space-y-2.5 border-t border-[color:var(--color-line)] p-3">{children}</div> : null}
    </div>
  );
}

/* ---------------- factories ---------------- */

const BLANK: Project = {
  slug: "new-project",
  name: { ar: "مشروع جديد", en: "New project" },
  category: "tools",
  status: "plan",
  featured: false,
  visible: true,
  tone: "#2aa3e0",
  image: "",
  imageFit: "cover",
  link: "",
  tagline: { ar: "جملة واحدة تشرح قيمة المشروع.", en: "One line describing the project's value." },
  summary: { ar: "", en: "" },
  role: { ar: "", en: "" },
  idea: { ar: "", en: "" },
  features: { ar: [""], en: [""] },
  tech: [],
  goal: { ar: "", en: "" },
  future: { ar: "", en: "" },
};

const blankStrength = () => ({ title: { ar: "نقطة قوة", en: "Strength" }, text: { ar: "", en: "" } });
const blankStat = () => ({ value: "0", label: { ar: "وصف", en: "Label" } });
const blankService = () => ({
  icon: "layers" as IconKey,
  title: { ar: "خدمة", en: "Service" },
  text: { ar: "", en: "" },
});
const blankTimeline = () => ({
  period: { ar: "السنة", en: "Year" },
  role: { ar: "", en: "" },
  place: { ar: "", en: "" },
  text: { ar: "", en: "" },
});
const blankTestimonial = () => ({
  name: { ar: "الاسم", en: "Name" },
  role: { ar: "", en: "" },
  text: { ar: "", en: "" },
});

const blankGallery = () => ({
  image: "/gallery/colors.webp",
  fit: "cover" as const,
  tone: "#2aa3e0",
  visible: true,
  caption: { ar: "عنوان الصورة", en: "Image title" },
  note: { ar: "سطر توضيحي قصير", en: "A short caption" },
});

/* ---------------- panel ---------------- */

const TABS = [
  { key: "general", label: "عام" },
  { key: "projects", label: "المشاريع" },
  { key: "sections", label: "الأقسام" },
  { key: "look", label: "المظهر" },
  { key: "data", label: "البيانات" },
] as const;

/** One-click colour schemes for the whole page. */
const PALETTES = [
  { label: "نيلي عميق", accent: "#2aa3e0", navy: "#123a76", ink: "#1b2a46", muted: "#5c6d8a" },
  { label: "بنفسجي حديث", accent: "#7c3aed", navy: "#2a1e63", ink: "#241f45", muted: "#6b6390" },
  { label: "فحمي عصري", accent: "#0ea5e9", navy: "#1f2937", ink: "#111827", muted: "#6b7280" },
  { label: "زمردي فاخر", accent: "#10b981", navy: "#123f36", ink: "#14261f", muted: "#5f7d74" },
];

export function EditPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const store = useStore();
  const { content, lang, setLang, set, insert, remove, move, exportJson, importJson, reset, hasLocal, editing, setEditing } =
    store;
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("general");
  const [status, setStatus] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const bump = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 2200);
  };

  return (
    <>
      {open ? (
        <div
          className="no-print fixed inset-0 z-50 bg-[color:var(--color-navy)]/25 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className="no-print fixed inset-y-0 end-0 z-50 flex w-full max-w-[440px] flex-col border-s border-[color:var(--color-line)] bg-white shadow-2xl transition-transform duration-300"
        style={{
          transform: open ? "none" : `translateX(${lang === "ar" ? "-110%" : "110%"})`,
          visibility: open ? "visible" : "hidden",
        }}
        aria-hidden={!open}
        aria-label="لوحة التحرير"
      >
        <div className="flex items-start justify-between gap-2 border-b border-[color:var(--color-line)] p-4">
          <div>
            <h3 className="text-[15px] font-bold text-[color:var(--color-navy)]">لوحة التحرير</h3>
            <p className="mt-0.5 text-[12px] leading-relaxed text-[color:var(--color-muted)]">
              كل تغيير يُحفظ تلقائيًا في هذا المتصفح. انقر أي نص في الصفحة لتعديله مباشرة.
            </p>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose} aria-label="close">
            <Icon name="close" size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 border-b border-[color:var(--color-line)] bg-[color:var(--color-brand-soft)]/60 px-4 py-2.5">
          <span className="text-[12px] font-semibold text-[color:var(--color-navy)]">تحرّر النسخة:</span>
          <div className="flex gap-1 rounded-xl bg-white p-1">
            {(["ar", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-lg px-2.5 py-1 text-[12px] font-semibold transition ${
                  lang === code ? "bg-[color:var(--color-navy)] text-white" : "text-[color:var(--color-navy)]/70"
                }`}
              >
                {code === "ar" ? "العربية" : "English"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto border-b border-[color:var(--color-line)] px-2 py-2">
          {TABS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-[12.5px] font-semibold transition ${
                tab === item.key
                  ? "bg-[color:var(--color-brand)]/12 text-[color:var(--color-brand-deep)]"
                  : "text-[color:var(--color-muted)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {tab === "general" ? (
            <>
              <Field label="الاسم" path="profile.name" />
              <Field label="المسمّى الوظيفي" path="profile.title" />
              <Field label="سطر فرعي (التقنيات)" path="profile.subtitle" />
              <StringList
                label="الأدوار المتحرّكة تحت الاسم"
                path={`profile.roles.${lang}`}
                placeholder="أنظمة تشغيل ومحاسبة"
              />
              <Field label="الجملة التعريفية" path="profile.tagline" multiline rows={2} />
              <Field label="حالة التوفر" path="profile.availability" />
              <Field label="الموقع" path="profile.location" />
              <div className="h-px bg-[color:var(--color-line)]" />
              <Field label="السطر الكبير في «عنّي»" path="profile.aboutLead" multiline rows={2} />
              <Field label="نص «عنّي»" path="profile.about" multiline rows={6} />
              <div className="h-px bg-[color:var(--color-line)]" />
              <RawField label="البريد الإلكتروني" path="profile.email" dir="ltr" placeholder="you@example.com" />
              <RawField label="واتساب (رقم دولي بدون +)" path="profile.whatsapp" dir="ltr" placeholder="967xxxxxxxxx" />
              <RawField label="رابط LinkedIn" path="profile.linkedin" dir="ltr" />
              <RawField label="رابط GitHub" path="profile.github" dir="ltr" />
              <RawField label="رابط الصورة الشخصية (اختياري)" path="profile.avatar" dir="ltr" />
              <RawField label="رابط صورة العرض الكبيرة (اختياري)" path="profile.portrait" dir="ltr" />
              <div className="h-px bg-[color:var(--color-line)]" />
              <div>
                <span className="panel-label">عناوين الأقسام (بالنسخة الحالية)</span>
                <div className="mt-1.5 space-y-2.5">
                  <Field label="عنوان: عنّي" path="labels.about" />
                  <Field label="عنوان: القدرات" path="labels.skills" />
                  <Field label="وصف: القدرات" path="labels.skillsSub" multiline rows={2} />
                  <Field label="عنوان: المشاريع" path="labels.work" />
                  <Field label="وصف: المشاريع" path="labels.workSub" multiline rows={2} />
                  <Field label="عنوان: الخدمات" path="labels.services" />
                  <Field label="وصف: الخدمات" path="labels.servicesSub" multiline rows={2} />
                  <Field label="عنوان: المسار" path="labels.timeline" />
                  <Field label="عنوان: تواصل" path="labels.contact" />
                  <Field label="وصف: تواصل" path="labels.contactSub" multiline rows={2} />
                </div>
              </div>
            </>
          ) : null}

          {tab === "projects" ? (
            <>
              <button
                type="button"
                className="btn btn-primary btn-sm w-full"
                onClick={() => insert("projects", content.projects.length, { ...BLANK, slug: `project-${content.projects.length + 1}` })}
              >
                <Icon name="plus" size={15} />
                إضافة مشروع
              </button>

              {content.projects.map((project, index) => (
                <Card
                  key={index}
                  title={`${index + 1}. ${project.name[lang] || project.slug}`}
                  onUp={() => move("projects", index, -1)}
                  onDown={() => move("projects", index, 1)}
                  onRemove={() => remove("projects", index)}
                >
                  <Field label="اسم المشروع" path={`projects.${index}.name`} />
                  <RawField label="المعرّف (رابط المشاركة)" path={`projects.${index}.slug`} dir="ltr" />
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="panel-label">الفئة</span>
                      <select
                        className="panel-field mt-1"
                        value={project.category}
                        onChange={(event) => set(`projects.${index}.category`, event.target.value as CategoryKey)}
                      >
                        {CATEGORY_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {CATEGORY_LABEL[key] === "catOps"
                              ? "أنظمة وتشغيل"
                              : CATEGORY_LABEL[key] === "catAgri"
                                ? "محاسبة وزراعة"
                                : CATEGORY_LABEL[key] === "catPm"
                                  ? "إدارة ومهام"
                                  : "أدوات ويب"}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="panel-label">الحالة</span>
                      <select
                        className="panel-field mt-1"
                        value={project.status}
                        onChange={(event) => set(`projects.${index}.status`, event.target.value as StatusKey)}
                      >
                        {STATUS_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {STATUS_LABEL[key] === "statusLive"
                              ? "مُشغَّل"
                              : STATUS_LABEL[key] === "statusDev"
                                ? "قيد التطوير"
                                : STATUS_LABEL[key] === "statusImprove"
                                  ? "قيد التحسين"
                                  : "قيد التخطيط"}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Toggle
                      label="مشروع رئيسي"
                      value={project.featured}
                      onChange={(next) => set(`projects.${index}.featured`, next)}
                    />
                    <Toggle
                      label="ظاهر في الموقع"
                      value={project.visible}
                      onChange={(next) => set(`projects.${index}.visible`, next)}
                    />
                  </div>
                  <Field label="جملة الوعد" path={`projects.${index}.tagline`} multiline rows={2} />
                  <Field label="وصف مختصر" path={`projects.${index}.summary`} multiline rows={3} />
                  <Field label="دورك في المشروع" path={`projects.${index}.role`} multiline rows={2} />
                  <Field label="الفكرة" path={`projects.${index}.idea`} multiline rows={4} />
                  <StringList label="أبرز المميزات" path={`projects.${index}.features.${lang}`} />
                  <StringList label="التقنيات والبنية" path={`projects.${index}.tech`} placeholder="React Native" />
                  <Field label="الهدف" path={`projects.${index}.goal`} multiline rows={3} />
                  <Field label="الاتجاه المستقبلي" path={`projects.${index}.future`} multiline rows={2} />
                  <RawField label="رابط تجربة مباشرة (اختياري)" path={`projects.${index}.link`} dir="ltr" />
                  <RawField label="رابط الصورة" path={`projects.${index}.image`} dir="ltr" placeholder="/projects/name.webp" />
                  <label className="block">
                    <span className="panel-label">طريقة عرض الصورة</span>
                    <select
                      className="panel-field mt-1"
                      value={project.imageFit}
                      onChange={(event) => set(`projects.${index}.imageFit`, event.target.value)}
                    >
                      <option value="cover">تغطية كاملة (صورة عريضة)</option>
                      <option value="contain">إظهار كاملة (شعار مربّع)</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="panel-label">لون المشروع</span>
                    <input
                      type="color"
                      className="mt-1 h-9 w-full rounded-xl border border-[color:var(--color-line)]"
                      value={project.tone}
                      onChange={(event) => set(`projects.${index}.tone`, event.target.value)}
                    />
                  </label>
                </Card>
              ))}
            </>
          ) : null}

          {tab === "sections" ? (
            <>
              <div className="flex items-center justify-between">
                <span className="panel-label">نقاط القوة</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => insert("strengths", content.strengths.length, blankStrength())}
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {content.strengths.map((_, index) => (
                <Card
                  key={index}
                  title={`نقطة ${index + 1}`}
                  onUp={() => move("strengths", index, -1)}
                  onDown={() => move("strengths", index, 1)}
                  onRemove={() => remove("strengths", index)}
                >
                  <Field label="العنوان" path={`strengths.${index}.title`} />
                  <Field label="النص" path={`strengths.${index}.text`} multiline rows={3} />
                </Card>
              ))}

              <div className="mt-2 flex items-center justify-between">
                <span className="panel-label">الأرقام (إحصائيات)</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => insert("stats", content.stats.length, blankStat())}
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {content.stats.map((_, index) => (
                <Card
                  key={index}
                  title={`رقم ${index + 1}`}
                  onUp={() => move("stats", index, -1)}
                  onDown={() => move("stats", index, 1)}
                  onRemove={() => remove("stats", index)}
                >
                  <RawField label="القيمة" path={`stats.${index}.value`} dir="ltr" />
                  <Field label="الوصف" path={`stats.${index}.label`} />
                </Card>
              ))}

              <div className="mt-2 flex items-center justify-between">
                <span className="panel-label">الخدمات</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => insert("services", content.services.length, blankService())}
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {content.services.map((service, index) => (
                <Card
                  key={index}
                  title={`خدمة ${index + 1}`}
                  onUp={() => move("services", index, -1)}
                  onDown={() => move("services", index, 1)}
                  onRemove={() => remove("services", index)}
                >
                  <Field label="العنوان" path={`services.${index}.title`} />
                  <Field label="الوصف" path={`services.${index}.text`} multiline rows={3} />
                  <label className="block">
                    <span className="panel-label">الأيقونة</span>
                    <select
                      className="panel-field mt-1"
                      value={service.icon}
                      onChange={(event) => set(`services.${index}.icon`, event.target.value as IconKey)}
                    >
                      {SERVICE_ICONS.map((icon) => (
                        <option key={icon.key} value={icon.key}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </Card>
              ))}

              <div className="mt-2 flex items-center justify-between">
                <span className="panel-label">المسار الزمني</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => insert("timeline", content.timeline.length, blankTimeline())}
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {content.timeline.map((_, index) => (
                <Card
                  key={index}
                  title={`مرحلة ${index + 1}`}
                  onUp={() => move("timeline", index, -1)}
                  onDown={() => move("timeline", index, 1)}
                  onRemove={() => remove("timeline", index)}
                >
                  <Field label="الفترة" path={`timeline.${index}.period`} />
                  <Field label="الدور/العنوان" path={`timeline.${index}.role`} />
                  <Field label="المكان/التقنيات" path={`timeline.${index}.place`} />
                  <Field label="الوصف" path={`timeline.${index}.text`} multiline rows={3} />
                </Card>
              ))}

              <div className="mt-2 flex items-center justify-between">
                <span className="panel-label">معرض الصور (لقطات من العمل)</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => insert("gallery", content.gallery.length, blankGallery())}
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {content.gallery.map((shot, index) => (
                <Card
                  key={index}
                  title={`صورة ${index + 1}`}
                  onUp={() => move("gallery", index, -1)}
                  onDown={() => move("gallery", index, 1)}
                  onRemove={() => remove("gallery", index)}
                >
                  <RawField label="مسار الصورة (مثال: /gallery/colors.webp)" path={`gallery.${index}.image`} dir="ltr" />
                  <Field label="العنوان" path={`gallery.${index}.caption`} />
                  <Field label="سطر توضيحي" path={`gallery.${index}.note`} multiline rows={2} />
                  <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                      <span className="panel-label">طريقة العرض</span>
                      <select
                        className="panel-field mt-1"
                        value={shot.fit}
                        onChange={(event) => set(`gallery.${index}.fit`, event.target.value)}
                      >
                        <option value="cover">ملء الإطار</option>
                        <option value="contain">كامل الصورة</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="panel-label">اللون المميّز</span>
                      <input
                        type="color"
                        className="mt-1 h-10 w-full rounded-xl border border-[color:var(--color-line)]"
                        value={shot.tone}
                        onChange={(event) => set(`gallery.${index}.tone`, event.target.value)}
                      />
                    </label>
                  </div>
                  <Toggle
                    label="ظاهرة في الموقع"
                    value={shot.visible}
                    onChange={(next) => set(`gallery.${index}.visible`, next)}
                  />
                </Card>
              ))}

              <div className="mt-2 flex items-center justify-between">
                <span className="panel-label">توصيات</span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => insert("testimonials", content.testimonials.length, blankTestimonial())}
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
              {content.testimonials.map((_, index) => (
                <Card
                  key={index}
                  title={`توصية ${index + 1}`}
                  onRemove={() => remove("testimonials", index)}
                >
                  <Field label="الاسم" path={`testimonials.${index}.name`} />
                  <Field label="الصفة" path={`testimonials.${index}.role`} />
                  <Field label="النص" path={`testimonials.${index}.text`} multiline rows={3} />
                </Card>
              ))}

              <div className="h-px bg-[color:var(--color-line)]" />
              <div className="panel-label">نصوص الجولة الحيّة (٤ خطوات) — قسم «جولة حيّة»</div>
              {content.tour.map((_, index) => (
                <Card key={index} title={`الخطوة ${index + 1}`}>
                  <Field label="العنوان" path={`tour.${index}.title`} />
                  <Field label="الشرح" path={`tour.${index}.text`} multiline rows={4} />
                </Card>
              ))}
            </>
          ) : null}

          {tab === "look" ? (
            <>
              <div>
                <span className="panel-label">لوحات لونية جاهزة (بنقرة واحدة)</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {PALETTES.map((palette) => (
                    <button
                      key={palette.label}
                      type="button"
                      className="flex items-center gap-2 rounded-xl border border-[color:var(--color-line)] bg-white p-2 text-start transition hover:border-[color:var(--color-brand)]/60"
                      onClick={() => {
                        set("settings.accent", palette.accent);
                        set("settings.navy", palette.navy);
                        set("settings.ink", palette.ink);
                        set("settings.muted", palette.muted);
                      }}
                    >
                      <span className="flex shrink-0">
                        {[palette.accent, palette.navy, palette.ink].map((tone, dotIndex) => (
                          <span
                            key={tone + dotIndex}
                            className="h-4 w-4 rounded-full border border-white"
                            style={{ background: tone, marginInlineStart: dotIndex ? -5 : 0 }}
                          />
                        ))}
                      </span>
                      <span className="text-[12px] font-semibold text-[color:var(--color-navy)]">
                        {palette.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="block">
                  <span className="panel-label">اللون الأساسي (التمييز)</span>
                  <input
                    type="color"
                    className="mt-1 h-10 w-full rounded-xl border border-[color:var(--color-line)]"
                    value={content.settings.accent}
                    onChange={(event) => set("settings.accent", event.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="panel-label">لون العناوين</span>
                  <input
                    type="color"
                    className="mt-1 h-10 w-full rounded-xl border border-[color:var(--color-line)]"
                    value={content.settings.navy}
                    onChange={(event) => set("settings.navy", event.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="panel-label">لون النصوص الأساسية</span>
                  <input
                    type="color"
                    className="mt-1 h-10 w-full rounded-xl border border-[color:var(--color-line)]"
                    value={content.settings.ink}
                    onChange={(event) => set("settings.ink", event.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="panel-label">لون النصوص الثانوية</span>
                  <input
                    type="color"
                    className="mt-1 h-10 w-full rounded-xl border border-[color:var(--color-line)]"
                    value={content.settings.muted}
                    onChange={(event) => set("settings.muted", event.target.value)}
                  />
                </label>
              </div>

              <div className="h-px bg-[color:var(--color-line)]" />
              <div>
                <span className="panel-label">عنوان الصفحة (يظهر في تبويب المتصفح ونتائج البحث)</span>
                <div className="mt-2 space-y-2">
                  <RawField label="بالعربية" path="settings.pageTitle.ar" />
                  <RawField label="بالإنجليزية" path="settings.pageTitle.en" dir="ltr" />
                </div>
              </div>
              <div className="h-px bg-[color:var(--color-line)]" />

              <label className="block">
                <span className="panel-label">شدة الحركة</span>
                <select
                  className="panel-field mt-1"
                  value={content.settings.motion}
                  onChange={(event) => set("settings.motion", event.target.value)}
                >
                  <option value="full">كاملة</option>
                  <option value="soft">هادئة</option>
                  <option value="off">بدون حركة</option>
                </select>
              </label>
              <Toggle
                label="إظهار الأرقام في «عنّي»"
                value={content.settings.showStats}
                onChange={(next) => set("settings.showStats", next)}
              />
              <Toggle
                label="إظهار المسار الزمني"
                value={content.settings.showTimeline}
                onChange={(next) => set("settings.showTimeline", next)}
              />
              <Toggle
                label="إظهار معرض الصور"
                value={content.settings.showGallery}
                onChange={(next) => set("settings.showGallery", next)}
              />
              <Toggle
                label="إظهار الصورة الشخصية في «عنّي»"
                value={content.settings.showPortrait}
                onChange={(next) => set("settings.showPortrait", next)}
              />
              <Toggle
                label="العرض ثلاثي الأبعاد (مشهد WebGL)"
                value={content.settings.show3d !== false}
                onChange={(next) => set("settings.show3d", next)}
              />
              <Toggle
                label="إظهار التوصيات"
                value={content.settings.showTestimonials}
                onChange={(next) => set("settings.showTestimonials", next)}
              />
              <Toggle
                label="إظهار السيرة الذاتية"
                value={content.settings.showResume}
                onChange={(next) => set("settings.showResume", next)}
              />
              <div className="h-px bg-[color:var(--color-line)]" />
              <Toggle label="وضع التحرير مفعّل" value={editing} onChange={setEditing} />
            </>
          ) : null}

          {tab === "data" ? (
            <>
              <p className="text-[12.5px] leading-relaxed text-[color:var(--color-muted)]">
                {hasLocal
                  ? "تعديلاتك محفوظة في هذا المتصفح. لنشرها لكل الزوار: صدّر الملف وأرسله لي لأثبّته داخل الموقع."
                  : "لا تعديلات محفوظة بعد — كل ما تراه هو المحتوى الأصلي."}
              </p>
              <button type="button" className="btn btn-primary w-full" onClick={exportJson}>
                <Icon name="download" size={16} />
                تصدير JSON
              </button>
              <button type="button" className="btn btn-ghost w-full" onClick={() => fileRef.current?.click()}>
                <Icon name="up" size={16} />
                استيراد JSON
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const text = await file.text();
                  bump(importJson(text) ? "تم الاستيراد ✓" : "ملف غير صالح");
                  event.target.value = "";
                }}
              />
              <button
                type="button"
                className="btn btn-ghost w-full text-[#b91c1c]"
                onClick={() => {
                  reset();
                  bump("تمت إعادة المحتوى الافتراضي");
                }}
              >
                <Icon name="trash" size={16} />
                إعادة الافتراضي
              </button>
              <div className="rounded-xl bg-[color:var(--color-brand-soft)]/70 p-3 text-[12px] leading-relaxed text-[color:var(--color-navy)]">
                اختصار لوحة المفاتيح: <span className="mono">Ctrl + Shift + E</span> لفتح/إغلاق وضع التحرير.
              </div>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-[color:var(--color-line)] p-3">
          <span className="text-[12px] font-semibold text-[color:var(--color-brand-deep)]">{status}</span>
          <div className="flex gap-2">
            <button type="button" className="btn btn-ghost btn-sm" onClick={exportJson}>
              <Icon name="download" size={14} />
              تصدير
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
              <Icon name="check" size={14} />
              تم
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
