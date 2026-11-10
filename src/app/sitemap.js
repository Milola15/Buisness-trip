import { site } from "@/lib/site";
import { destinations } from "@/lib/data";

export default function sitemap() {
  const routes = ["", "/business-trips", ...destinations.map((d) => `/business-trips/${d.slug}`), "/sourcing", "/sourcing/devis", "/a-propos", "/contact"];
  return routes.map((r) => ({ url: `${site.url}${r}`, lastModified: new Date() }));
}
