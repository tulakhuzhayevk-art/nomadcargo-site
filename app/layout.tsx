import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nomad Cargo | From China to the World",

  description:
    "Премиальные контейнерные и грузовые перевозки из Китая в 97 стран мира. Морем, воздухом, ЖД.",

  keywords: [
    "грузоперевозки из китая",
    "контейнерные перевозки",
    "доставка из китая",
    "cargo china",
    "nomad cargo",
  ],

  icons: {
    icon: [{ url: "/icon.ico?v=10", type: "image/x-icon" }],
    shortcut: ["/icon.ico?v=10"],
    apple: ["/icon.ico?v=10"],
  },

  openGraph: {
    title: "Nomad Cargo | From China to the World",
    description: "Международные грузовые перевозки из Китая",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}