import NavBar from "./NavBar";

export const navItems = [
  { href: "/business-trips", label: "Business Trips" },
  { href: "/sourcing", label: "Sourcing" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return <NavBar items={navItems} />;
}
