import type { Metadata } from "next";
import "@/styles/theme.css";
import "./globals.css";
import { initEcosystem } from "@/lib/ecosystem-init";
import { ECOSYSTEM_MANIFEST } from "@/lib/ecosystem-manifest";

export const metadata: Metadata = {
  title: "Portal App",
  description: "Built by Portal v6",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Registers published streams and subscribes to consumed streams on startup.
  // No-ops if ECOSYSTEM_API_URL / ECOSYSTEM_API_KEY are not set (safe for local dev).
  // Phase 0 of the BUILD_PLAN fills in ECOSYSTEM_MANIFEST with this app's streams.
  await initEcosystem(ECOSYSTEM_MANIFEST);

  return (
    <html lang="en">
      <body className="bg-bg text-text-primary font-body">{children}</body>
    </html>
  );
}
