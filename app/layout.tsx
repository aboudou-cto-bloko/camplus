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

const BASE_URL = "https://camplus-bj.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Campus+ — Le campus en mieux.",
  description:
    "Le média étudiant nouvelle génération pour les campus béninois. Actualités, talents, opportunités et vie étudiante — par les étudiants, pour les étudiants.",
  keywords: [
    "Campus+",
    "campus bénin",
    "étudiants bénin",
    "ENEAM",
    "EPAC",
    "UAC",
    "FASEG",
    "média étudiant",
    "Cotonou",
    "université bénin",
    "actualités campus",
    "Club Entrepreneuriat ENEAM",
  ],
  authors: [{ name: "Campus+", url: BASE_URL }],
  creator: "Campus+",
  publisher: "Campus+",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Campus+",
    title: "Campus+ — Le campus en mieux.",
    description:
      "Le média étudiant nouvelle génération pour les campus béninois. Actualités, talents, opportunités et vie étudiante.",
    locale: "fr_BJ",
    images: [
      {
        url: `${BASE_URL}/assets/logo-dark.jpeg`,
        width: 1600,
        height: 1600,
        alt: "Campus+ — Le campus en mieux.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus+ — Le campus en mieux.",
    description:
      "Le média étudiant nouvelle génération pour les campus béninois. Actualités, talents, opportunités et vie étudiante.",
    images: [`${BASE_URL}/assets/logo-dark.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Campus+",
  url: BASE_URL,
  description:
    "Le média étudiant nouvelle génération pour les campus béninois.",
  logo: `${BASE_URL}/assets/icon-dark.jpeg`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="min-h-full antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollToTop />
        <CursorGlow />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
