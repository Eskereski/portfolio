import type { Translator } from "./i18n";

const navLinkDefs = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.projects", href: "/projects" },
  { key: "nav.contact", href: "/contact" },
] as const;

export function getNavLinks(t: Translator) {
  return navLinkDefs.map((link) => ({
    label: t(link.key),
    href: link.href,
  }));
}

export const socialLinks = [
  { labelKey: "footer.social.github", href: "https://github.com/Eskereski", icon: "github" },
  { labelKey: "footer.social.linkedin", href: "https://linkedin.com/in/demétrius-eskereski/", icon: "linkedin" },
  { labelKey: "footer.social.email", href: "mailto:d.eskereski@hotmail.com", icon: "email" },
];