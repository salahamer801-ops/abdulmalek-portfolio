import { useState } from "react";
import { useStore } from "../store";
import { E } from "./Editable";
import { Icon } from "./Icons";
import { SectionHead } from "./common";

function waLink(raw: string, text: string): string {
  const digits = (raw || "").replace(/[^\d]/g, "");
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : "";
}

export function Contact() {
  const { t, lang, content, editing } = useStore();
  const [copied, setCopied] = useState(false);
  const { email, whatsapp, linkedin, github, name } = content.profile;

  const copyEmail = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const wa = waLink(
    whatsapp,
    lang === "ar"
      ? `مرحبًا ${name.ar}، شاهدت موقعك وأود التحدث عن مشروع.`
      : `Hi ${name.en}, I saw your portfolio and would like to talk about a project.`,
  );

  return (
    <section className="dark-band section" id="contact">
      <div className="wrap">
        <SectionHead
          index="09"
          eyebrow="CONTACT"
          titlePath="labels.contact"
          subPath="labels.contactSub"
          tone="dark"
        />

        <div className="mt-10 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          {email ? (
            <div className="reveal card card-hover flex flex-col justify-between p-5">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#8fd3f4]">
                  <Icon name="mail" size={20} />
                </span>
                <div className="mt-3.5 text-[15px] font-bold text-white">{t("sendEmail")}</div>
                <a
                  href={`mailto:${email}`}
                  className="mono mt-1 block break-all text-[12.5px] text-white/65 transition hover:text-white"
                  dir="ltr"
                >
                  {email}
                </a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a className="btn btn-primary btn-sm" href={`mailto:${email}`}>
                  <Icon name="mail" size={15} />
                  {t("sendEmail")}
                </a>
                <button type="button" className="btn btn-ghost btn-sm" onClick={copyEmail}>
                  <Icon name={copied ? "check" : "copy"} size={15} />
                  {copied ? t("copied") : t("copyEmail")}
                </button>
              </div>
            </div>
          ) : null}

          {wa ? (
            <a
              className="reveal card card-hover p-5"
              href={wa}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#7ee2a8]">
                <Icon name="whatsapp" size={20} />
              </span>
              <div className="mt-3.5 text-[15px] font-bold text-white">{t("whatsapp")}</div>
              <div className="mono mt-1 text-[12.5px] text-white/65" dir="ltr">
                {whatsapp}
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8fd3f4]">
                {lang === "ar" ? "محادثة سريعة" : "Quick chat"}
                <Icon name="external" size={14} />
              </div>
            </a>
          ) : null}

          {linkedin ? (
            <a
              className="reveal card card-hover p-5"
              href={linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#79b8ff]">
                <Icon name="linkedin" size={20} />
              </span>
              <div className="mt-3.5 text-[15px] font-bold text-white">{t("linkedin")}</div>
              <div className="mono mt-1 break-all text-[12.5px] text-white/65" dir="ltr">
                {linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, "in/").replace(/\/$/, "")}
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8fd3f4]">
                {lang === "ar" ? "الملف المهني" : "Professional profile"}
                <Icon name="external" size={14} />
              </div>
            </a>
          ) : null}

          {github ? (
            <a
              className="reveal card card-hover p-5"
              href={github}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                <Icon name="github" size={20} />
              </span>
              <div className="mt-3.5 text-[15px] font-bold text-white">{t("github")}</div>
              <div className="mono mt-1 break-all text-[12.5px] text-white/65" dir="ltr">
                {github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8fd3f4]">
                {lang === "ar" ? "الكود والمشاريع" : "Code & projects"}
                <Icon name="external" size={14} />
              </div>
            </a>
          ) : null}

          {!email ? (
            <div className="reveal card border-dashed p-5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#8fd3f4]">
                <Icon name="plus" size={20} />
              </span>
              <div className="mt-3.5 text-[15px] font-bold text-white">{t("emailMissing")}</div>
            </div>
          ) : null}
        </div>

        <div className="reveal mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-[13px] text-white/65">
          <span className="inline-flex items-center gap-2">
            <span className="dot-live" />
            <E path="profile.availability" as="span" />
          </span>
          <span className="inline-flex items-center gap-2">
            <Icon name="globe" size={15} />
            <E path="profile.location" as="span" />
          </span>
          {editing ? <span className="text-[12.5px]">{t("editHint")}</span> : null}
        </div>
      </div>
    </section>
  );
}
