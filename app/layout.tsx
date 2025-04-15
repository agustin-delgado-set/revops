import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/SessionProvider";

const geistSans = localFont({
  src: "./fonts/Sora-VariableFont_wght.ttf",
  variable: "--font-sora-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RevOps Onboarding Tool",
  description: "RevOps Onboarding Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-[#002B89]`}
      >
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
