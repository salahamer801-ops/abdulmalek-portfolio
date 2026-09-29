import type { ReactNode } from "react";
import { E } from "./Editable";

export function SectionHead({
  id,
  index,
  eyebrow,
  titlePath,
  subPath,
  aside,
  tone = "light",
}: {
  id?: string;
  index?: string;
  eyebrow?: string;
  titlePath: string;
  subPath?: string;
  aside?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div id={id} className="reveal scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            {index ? <span className={`sec-num ${dark ? "!text-white/55" : ""}`}>{index}</span> : null}
            <span className={`h-px w-6 ${dark ? "bg-white/30" : "bg-[color:var(--color-brand)]/50"}`} />
            {eyebrow ? (
              <span
                className={`eyebrow ${dark ? "text-white/70" : "text-[color:var(--color-brand-deep)]"}`}
              >
                {eyebrow}
              </span>
            ) : null}
          </div>
          <E
            path={titlePath}
            as="h2"
            className={`head-grad balance text-[27px] font-bold leading-tight md:text-[40px] ${
              dark ? "" : "text-[color:var(--color-navy)]"
            }`}
          />
          {subPath ? (
            <E
              path={subPath}
              as="p"
              multiline
              className={`pretty mt-3 text-[15px] leading-relaxed md:text-[16px] ${
                dark ? "text-white/70" : "text-[color:var(--color-muted)]"
              }`}
            />
          ) : null}
        </div>
        {aside}
      </div>
    </div>
  );
}

export function Monogram({ name, size = 44 }: { name: string; size?: number }) {
  const letters = (name || "؟")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-[color:var(--color-navy)] font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {letters}
    </span>
  );
}
