import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CursorGlow } from "@/components/cursor-glow";
import { ConvexClientProvider } from "@/components/convex-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Campus+ — Le campus en mieux.",
  description:
    "Le média étudiant nouvelle génération pour les campus béninois. Actualités, talents, opportunités, vie étudiante.",
  keywords: ["campus bénin", "étudiants", "ENEAM", "média étudiant", "Cotonou"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="min-h-full antialiased">
        <ScrollToTop />
        <CursorGlow />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
