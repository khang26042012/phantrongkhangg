import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ngọc Anh — Creative Developer & 3D Artist",
  description: "Portfolio của Ngọc Anh. Creative Developer & 3D Artist. Từ những vì sao đến dòng code.",
  keywords: ["portfolio", "creative developer", "3D", "three.js", "webgl", "Ngọc Anh"],
  openGraph: {
    title: "Ngọc Anh — Creative Developer",
    description: "Từ những vì sao đến dòng code",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans antialiased bg-black text-white selection:bg-amber-200 selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}