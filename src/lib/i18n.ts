import ptBRCommon from "@/messages/pt-br/common.json";
import enUSCommon from "@/messages/en-us/common.json";

export const languages = ["pt-br", "en-us"] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "pt-br";
export const languageCookieName = "language";

export type Namespace = "common";
export const defaultNamespace: Namespace = "common";

export type Messages = Record<string, unknown>;
export type TranslateParams = Record<string, string | number>;
export type Translator = (key: string, params?: TranslateParams) => string;

const preloadedMessages: Partial<Record<Language, Partial<Record<Namespace, Messages>>>> = {
  "pt-br": {
    common: ptBRCommon as unknown as Messages,
  },
  "en-us": {
    common: enUSCommon as unknown as Messages,
  },
};

export function getPreloadedMessages(
  language: Language,
  namespace: Namespace = defaultNamespace
): Messages | undefined {
  return preloadedMessages[language]?.[namespace];
}

const languageMeta = {
  "pt-br": { htmlLang: "pt-BR" },
  "en-us": { htmlLang: "en-US" },
} as const satisfies Record<Language, { htmlLang: string }>;

export function getHtmlLang(language: Language): string {
  return languageMeta[language].htmlLang;
}

export function isLanguage(value: unknown): value is Language {
  return value === "pt-br" || value === "en-us";
}

export function normalizeLanguage(input: string | null | undefined): Language {
  const normalized = (input ?? "").trim().toLowerCase().replaceAll("_", "-");

  if (normalized === "pt" || normalized.startsWith("pt-")) return "pt-br";
  if (normalized === "en" || normalized.startsWith("en-")) return "en-us";
  if (isLanguage(normalized)) return normalized;
  return defaultLanguage;
}

type Loader = () => Promise<Messages>;

const messageLoaders = {
  "pt-br": {
    common: () => Promise.resolve(preloadedMessages["pt-br"]?.common ?? ({} as Messages)),
  },
  "en-us": {
    common: () => Promise.resolve(preloadedMessages["en-us"]?.common ?? ({} as Messages)),
  },
} as const satisfies Record<Language, Record<Namespace, Loader>>;

const messageCache = new Map<string, Promise<Messages>>();

messageCache.set(
  `${defaultLanguage}:${defaultNamespace}`,
  Promise.resolve(preloadedMessages[defaultLanguage]?.[defaultNamespace] ?? ({} as Messages))
);

export async function loadMessages(
  language: Language,
  namespace: Namespace = defaultNamespace
): Promise<Messages> {
  const cacheKey = `${language}:${namespace}`;
  const cached = messageCache.get(cacheKey);
  if (cached) return cached;

  const loader = messageLoaders[language]?.[namespace];
  if (!loader) {
    const empty = Promise.resolve({} as Messages);
    messageCache.set(cacheKey, empty);
    return empty;
  }

  const promise = loader();
  messageCache.set(cacheKey, promise);
  return promise;
}

function getNestedValue(messages: Messages | undefined, path: string[]): unknown {
  if (!messages) return undefined;

  let current: unknown = messages;
  for (const part of path) {
    if (!current || typeof current !== "object") return undefined;
    const record = current as Record<string, unknown>;
    if (!(part in record)) return undefined;
    current = record[part];
  }

  return current;
}

function interpolate(text: string, params?: TranslateParams): string {
  if (!params) return text;

  return text.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = params[key];
    return value === undefined ? match : String(value);
  });
}

function parseKey(rawKey: string): { namespace: Namespace; path: string[] } {
  const [maybeNamespace, maybeKey] = rawKey.split(":", 2);

  if (maybeKey && maybeNamespace === "common") {
    return { namespace: maybeNamespace, path: maybeKey.split(".") };
  }

  return { namespace: defaultNamespace, path: rawKey.split(".") };
}

function asString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value;
}

export function createTranslator(
  primary: Partial<Record<Namespace, Messages>>,
  fallback: Partial<Record<Namespace, Messages>> = {}
): Translator {
  return (rawKey, params) => {
    const { namespace, path } = parseKey(rawKey);

    const value =
      getNestedValue(primary[namespace], path) ??
      getNestedValue(fallback[namespace], path);

    const text = asString(value) ?? rawKey;
    return interpolate(text, params);
  };
}

export async function getTranslations(
  language: Language,
  namespaces: Namespace[] = [defaultNamespace]
): Promise<{ t: Translator }> {
  const [primaryEntries, fallbackEntries] = await Promise.all([
    Promise.all(
      namespaces.map(async (ns) => [ns, await loadMessages(language, ns)] as const)
    ),
    Promise.all(
      namespaces.map(async (ns) =>
        [ns, await loadMessages(defaultLanguage, ns)] as const
      )
    ),
  ]);

  const primary: Partial<Record<Namespace, Messages>> = {};
  for (const [ns, messages] of primaryEntries) primary[ns] = messages;

  const fallback: Partial<Record<Namespace, Messages>> = {};
  for (const [ns, messages] of fallbackEntries) fallback[ns] = messages;

  return { t: createTranslator(primary, fallback) };
}
