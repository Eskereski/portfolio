import { getTranslation, Language, defaultLanguage } from "./i18n";

export function getNavLinks(language: Language = defaultLanguage) {
  const t = getTranslation(language);
  return [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.contact, href: "/contact" },
  ];
}

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Eskereski", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/demétrius-eskereski/", icon: "linkedin" },
  { label: "Email", href: "mailto:d.eskereski@hotmail.com", icon: "email" },
];