import { clsx } from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Button({ children, variant = "primary", href, className, onClick }: ButtonProps) {
  const base = "inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-bold tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-gradient-to-r from-gold to-gold-light text-bg clip-cut-all hover:opacity-90 hover:-translate-y-0.5",
    ghost:   "border border-white/20 text-steel hover:border-gold hover:text-gold-light",
  };

  const cls = clsx(base, variants[variant], className);

  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}