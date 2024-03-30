import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@descope/nextjs-sdk";
import Providers from "@/components/layout/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Descope SSO Applications",
  description: "Tenant-specific easy-to-use SSO application tiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}>
      <html lang="en" suppressHydrationWarning>
        <Providers>
          <body className={inter.className}>{children}</body>
        </Providers>
      </html>
    </AuthProvider>
  );
}
