type Language = "pt" | "en";

const translations = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    header: {
      menu: "Menu",
      navigation: "Navegação",
      closeMenu: "Fechar menu lateral",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    header: {
      menu: "Menu",
      navigation: "Navigation",
      closeMenu: "Close side menu",
    },
  },
};

export const defaultLanguage: Language = "pt";

export function getTranslation(language: Language = defaultLanguage) {
  return translations[language];
}

export function useI18n(language: Language = defaultLanguage) {
  return getTranslation(language);
}

export type { Language };
