import NavBar from "./Navbar";

export const navItems = [
  { href: "/business-trips", label: "Business Trips" },
  { href: "/sourcing", label: "Sourcing" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return <NavBar items={navItems} />;
}