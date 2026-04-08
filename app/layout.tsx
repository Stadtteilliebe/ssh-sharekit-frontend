import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const rubik = localFont({
  src: "../public/fonts/rubik-variable-font.ttf",
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hub:disrupt Sharekit",
  description:
    "Erstelle dein persönliches Share-Visual und zeig, dass du am 30.09.2026 mit dabei bist!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${rubik.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}