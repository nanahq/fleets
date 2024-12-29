import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { Suspense } from "react";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
// import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/app/dashboard/components/header";
// import { Footer } from "@/components/footer";

const fontSans = Urbanist({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "Fleets | All-in-one Logistics Solution",
        template: "%s | Fleets",
    },
    description: "All-in-one solution for serious logistics companies",
    keywords: ["logistics", "fleet management", "transportation", "supply chain"],
    authors: [{ name: "Fleets" }],
    creator: "Fleets",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://fleet.trynanaapp.com",
        title: "Fleets | All-in-one Logistics Solution",
        description: "All-in-one solution for serious logistics companies",
        siteName: "Fleets",
    },
    twitter: {
        card: "summary_large_image",
        title: "Fleets | All-in-one Logistics Solution",
        description: "All-in-one solution for serious logistics companies",
        creator: "@fleets",
    },
    icons: {
        icon: "/favicon-16x16.png",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                fontSans.variable
            )}
        >

            <div className="overflow-hidden relative flex flex-col min-h-screen">
                    <main className="flex flex-col flex-1">{children}</main>
                {/*<Footer />*/}
            </div>
            <Toaster position="bottom-right" />
        </body>
        </html>
    );
}
