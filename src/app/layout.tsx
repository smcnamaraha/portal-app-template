import type { Metadata } from "next";
import "@/styles/theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portal App",
  description: "Built by Portal v6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text-primary font-body">{children}</body>
    </html>
  );
}
