import { useEffect, useRef, type ElementType } from "react";
import { useStore } from "../store";

type Props = {
  /** dot path to a bilingual value, e.g. "profile.name" */
  path: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
};

/**
 * Renders a bilingual text from the content store.
 * In edit mode it becomes directly editable in place (click and type).
 */
export function E({ path, as = "span", className, multiline = false, placeholder }: Props) {
  const { editing, lang, get, set } = useStore();
  const Tag = as as ElementType;
  const full = `${path}.${lang}`;
  const value: string = get(full) ?? "";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (document.activeElement === node) return;
    if (node.innerText !== value) node.innerText = value;
  }, [value, editing, lang]);

  if (!editing) {
    return (
      <Tag className={className}>
        {value || (placeholder ? <span className="opacity-50">{placeholder}</span> : null)}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      className={`${className ?? ""} transition-colors`}
      data-edit=""
      data-edit-path={path}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(event: React.FocusEvent<HTMLElement>) => {
        const next = event.currentTarget.innerText.replace(/\u00a0/g, " ").trim();
        if (next !== value) set(full, next);
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" && !multiline) {
          event.preventDefault();
          (event.currentTarget as HTMLElement).blur();
        }
        if (event.key === "Escape") (event.currentTarget as HTMLElement).blur();
      }}
    />
  );
}
