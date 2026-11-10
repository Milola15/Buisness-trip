import Link from "next/link";
import { btnDark } from "@/lib/ui";

export const navItems = [
  { href: "/business-trips", label: "Business Trips" },
  { href: "/sourcing", label: "Sourcing" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-marine/10 bg-white/95 backdrop-blur">
      <div className="wrap flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-marine">
          N&amp;K <span className="ml-1 font-sans text-sm font-medium text-or-fonce">Global Business</span>
        </Link>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 text-sm font-medium text-marine md:flex">
          {navItems.map((n) => <Link key={n.href} href={n.href} className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-or after:transition-all after:duration-300 hover:after:w-full">{n.label}</Link>)}
          <Link href="/sourcing/devis" className={btnDark}>Demander un devis</Link>
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-sm border border-marine/20 px-3 py-2 text-sm font-semibold text-marine [&::-webkit-details-marker]:hidden">Menu</summary>
          <nav aria-label="Navigation mobile" className="absolute right-0 mt-3 flex w-64 flex-col gap-4 border border-marine/10 bg-white p-5 text-marine shadow-lg">
            {navItems.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
            <Link href="/sourcing/devis" className={btnDark}>Demander un devis</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
