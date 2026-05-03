import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eskereski | Full Stack Developer",
  description: "Portfolio showcasing backend-focused projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col text-zinc-950 dark:text-white">
        <div className="bg-linear-to-b dark:from-zinc-950 dark:to-zinc-900 w-full h-full absolute top-0 left-0 -z-10"></div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              const isDark = document.documentElement.classList.contains('dark');
              console.log('Theme detected:', isDark ? 'dark' : 'light');
            } catch (e) {
              console.log('Theme detection error', e);
            }
          })();
        ` }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}