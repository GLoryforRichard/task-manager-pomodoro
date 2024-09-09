import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "🍅 Time Master 🍅",
  description: "🍅 Time Master 🍅",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
