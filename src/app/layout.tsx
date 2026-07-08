import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./tailwind.css";
import "./globals.scss";

export const metadata: Metadata = {
  title: "CWA React SSR",
  description: "Enterprise Next.js SSR template for create-wl-app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
