import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import ptBRCommon from "@/messages/pt-br/common.json";
import { defaultLanguage, getHtmlLang, languageCookieName, normalizeLanguage } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: (ptBRCommon.metadata as Record<string, string>).title,
  description: (ptBRCommon.metadata as Record<string, string>).description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

async function getInitialLanguage() {
  const cookieStore = await cookies();
  const storedLanguage = cookieStore.get(languageCookieName)?.value;
  return normalizeLanguage(storedLanguage ?? defaultLanguage);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLanguage = await getInitialLanguage();

  return (
    <html lang={getHtmlLang(initialLanguage)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const before = document.documentElement.classList.contains('dark');
                const saved = localStorage.getItem('theme');
                let isDark;
                
                if (saved === 'dark' || saved === 'light') {
                  isDark = saved === 'dark';
                } else {
                  isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                }
                
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-white text-zinc-950 dark:bg-zinc-950 dark:bg-linear-to-b dark:from-zinc-950 dark:to-zinc-900 dark:text-white antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}