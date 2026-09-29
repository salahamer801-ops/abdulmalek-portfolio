<div dir="rtl">

# عبدالملك عامر — الموقع الشخصي الاحترافي

موقع شخصي عربي (RTL) لمطوّر أنظمة وتطبيقات ويب وذكاء اصطناعي، موجَّه للزوّار وأصحاب العمل والعملاء:
رواية بصرية مستقبلية، **مشهد ثلاثي الأبعاد حقيقي (WebGL)**، **جولة حيّة** تشرح مكوّنات الأنظمة، و**كل المحتوى قابل للتعديل من الموقع نفسه** بلا لمس الكود.

**LinkedIn:** <https://www.linkedin.com/in/abdulmalek-saleh-amer-70057226b> · **البريد:** salahamer801@gmail.com · **واتساب:** +967 774 953 820

## أبرز المزايا

- **مشهد 3D حقيقي على مستوى الموقع كله:** نواة زجاجية، حلقات مدارية، ولوحات زجاجية تحمل أقسام الموقع وتدور مع تمرير الصفحة، مع كاميرا تتفاعل مع المؤشر — بدون أي مكتبة ثقيلة في الواجهة الابتدائية (`three` يُحمَّل بشكل منفصل بعد أول رسم).
- **جولة حيّة (Live tour):** شاشة تطبيق تعمل أمامك تلقائيًا (أرقام تُعدّ تصاعديًا، صفوف تتوالى، منحنيات تُرسَم، مهام تُنجَز) مقابل مخطّط ثلاثي الأبعاد لطبقات النظام (الواجهة · المنطق · الـAPI · قاعدة البيانات · التقارير) — بالنقر على أي طبقة تُشرح.
- **مكوّنات ثلاثية الأبعاد داخل المحتوى:** منصة عرض للصورة الشخصية، ميل البطاقات مع المؤشر، ومداخل بعمق ثلاثي الأبعاد لكل قسم.
- **تنقّل ثلاثي الأبعاد:** انتقال الصفحة عند التنقّل بين الأقسام أو إلى صفحة مشروع/السيرة الذاتية، وقائمة جوال تدخل بعناصر دوّارة.
- **لوحة تحرير مدمجة:** تعديل النصوص والأقسام والمشاريع والخدمات والألوان والصورة الشخصية من داخل الموقع، مع حفظ تلقائي في `localStorage`، ومفاتيح إخفاء/إظهار لكل قسم.
- **سيرة ذاتية جاهزة للطباعة:** صفحة `#resume` بتنسيق طباعة A4 مع الصورة والبيانات.
- **SEO ومشاركة اجتماعية:** وسوم Open Graph وTwitter، وبطاقة `Person` في `JSON-LD`، و`robots.txt`، وأيقونات، وصورة مشاركة `og-image.png`.
- **أداء واحترام للجهاز:** تقليل الحركة تلقائيًا (`prefers-reduced-motion` + مفتاح في اللوحة)، حدّ لإطارات الجوال، إيقاف الرسم عند إخفاء التبويب، وتخفيف تلقائي إذا كان الجهاز بطيئًا.

## التقنيات

| الطبقة | المستخدم |
| --- | --- |
| البناء | Vite 6 · TypeScript (strict) |
| الواجهة | React 19 |
| التنسيق | Tailwind CSS 4 (`@tailwindcss/vite`) · خطوط IBM Plex Sans Arabic |
| ثلاثي الأبعاد | three.js 0.186 (مشهد WebGL) + CSS 3D للمكوّنات |
| الحالة | سياق React (`src/store.tsx`) + `localStorage` — بلا خادم ولا قاعدة بيانات |
| النشر | موقع ثابت (static build) |

## التشغيل محليًا

```bash
npm install
npm run dev      # خادم تطوير على 5173
npm run build    # بناء الإنتاج إلى dist/
npm run preview  # معاينة البناء
```

## بنية المشروع

```
index.html                 وسوم SEO/OG/JSON-LD وخطوط الويب
src/
  main.tsx                 نقطة الدخول
  App.tsx                  التخطيط: التنقّل ← الجولة ← عنّي ← القدرات ← المشاريع ← الخدمات ← المسار ← المعرض ← التوصيات ← تواصل
  index.css                نظام التصميم: الرموز، الطبقات، 3D، حركات الجولة، أنماط الطباعة
  store.tsx                مصدر الحقيقة للمحتوى: تحميل/حفظ/ترحيل/استيراد + اللغة ومفتاح التحرير
  i18n.ts                  نصوص الواجهة (عربي/إنجليزي)
  content/
    types.ts               أنواع نموذج المحتوى
    defaultContent.ts      كل محتوى الموقع الافتراضي (نصوص، مشاريع، خدمات، مسار، معرض) بالعربية والإنجليزية
  lib/dom.ts               التوجيه بالهاش، كشف الظهور، انتقالات التنقّل، ساعة عدن
  components/
    Scene3D.tsx            مشهد WebGL (three.js) + جزيئات + لوحات الأقسام
    Tour.tsx               الجولة الحيّة: الشاشات المتحركة + مكدّس الطبقات 3D
    Interactive.tsx        Stage3D / SpotlightFrame (تفاعل المؤشر)
    Hero · About · Skills · Projects · ProjectDetail · Services · Timeline · Gallery · Contact · Resume · Nav · Footer · Intro · Motion · EditPanel · Editable · Icons · common
public/                    الصور والأيقونات (WebP/PNG/SVG) و robots.txt
```

## التعديل بدون كود

1. افتح الموقع واضغط **«وضع التحرير»** في الشريط العلوي (أو `Ctrl+Shift+E`).
2. من اللوحة: البيانات · المشاريع · الأقسام · المظهر · البيانات (تصدير/استيراد/إعادة الافتراضي).
3. كل تعديل يُحفظ في متصفحك تلقائيًا؛ ونصوص الجولة الحيّة والخدمات والمشاريع قابلة للإضافة والحذف والترتيب.

## الأصول (الصور)

صور المشاريع والصورة الشخصية في `public/` بصيغة WebP محسّنة (حجمها الكلي ≈ 1.2MB) وليست جزءًا من أول دفعة رفع؛ عند تشغيل المشروع أعد وضعها في `public/projects` و`public/gallery` و`public/profile`، وإن غابت فسيظهر الموقع ببديل نصي أنيق.

## الحقوق

جميع الحقوق محفوظة © عبدالملك عامر. الكود منشور للاطلاع والمراجعة، وليس للاستخدام التجاري أو إعادة النشر.

</div>

---

# Abdulmalek Saleh Amer — Professional Personal Portfolio

Arabic-first (RTL) portfolio for an applications, systems and AI developer, built for visitors, recruiters and clients:
a futuristic visual narrative, a **real WebGL 3D scene**, a **live tour** that explains the systems' parts, and **every piece of content editable from the site itself**.

**Highlights**

- **Site-wide real 3D:** glass core, orbit rings and glass panels carrying the site's own sections, rotating with scroll, with a pointer-driven camera. `three` is code-split and loads after first paint, so the initial bundle stays light.
- **Live tour:** a self-playing app screen (counting KPIs, streaming rows, drawing charts, completing tasks) next to a 3D isometric stack of the system layers (interface · logic · API · database · reports) — tap a layer to read its explanation.
- **3D inside the content:** portrait exhibit stage, pointer-tilted cards, depth-based section entrances, plus 3D page transitions on navigation.
- **Built-in editor:** edit texts, sections, projects, services, colours and the personal photo from inside the site; saved to `localStorage`, with show/hide switches per section.
- **Print-ready CV** at `#resume`, full SEO/Open Graph/JSON-LD metadata, and careful performance work (reduced-motion support, mobile frame cap, rendering paused on hidden tabs, automatic quality downgrade).

**Stack:** Vite 6 · React 19 · TypeScript (strict) · Tailwind CSS 4 · three.js 0.186 · no server, no database (client-only static site).

```bash
npm install
npm run dev      # dev server on 5173
npm run build    # production build into dist/
```

© Abdulmalek Saleh Amer — all rights reserved.
