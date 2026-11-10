import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Business Trips et sourcing international`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "./" },
  openGraph: { type: "website", locale: "fr_FR", siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary_large_image" },
};

const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  parentOrganization: { "@type": "Organization", name: "N&K Group" },
  founder: { "@type": "Person", name: "Eve Konan" },
  address: { "@type": "PostalAddress", addressCountry: "CI" },
  areaServed: ["Chine", "Turquie", "Émirats arabes unis", "Afrique", "Europe"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-white font-sans leading-relaxed text-encre antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollReveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />
      </body>
    </html>
  );
}
