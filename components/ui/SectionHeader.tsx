import { clsx } from "clsx";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow, title, titleHighlight, description, align = "center", className,
}: SectionHeaderProps) {
  return (
    <div className={clsx("mb-16", align === "center" && "text-center", className)}>
      <div className={clsx(
        "inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-gold mb-4",
        align === "center" && "mx-auto"
      )}>
        <span className="block w-6 h-px bg-gold" />
        {eyebrow}
        {align === "center" && <span className="block w-6 h-px bg-gold" />}
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight text-steel-chrome leading-none">
        {title}{" "}
        {titleHighlight && (
          <em className="not-italic text-gradient-gold">{titleHighlight}</em>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base font-light text-steel-dark leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}