import type { Metadata } from "next";
import {Urbanist as FontSans} from "next/font/google";
import {Suspense} from "react";

import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Fleets",
  description: "All-in one solution for serious logistics companies",
};

const font = FontSans({ subsets: ["latin"] });

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html lang="en">
      <body className={font.className}>
      <Suspense>
        <main className="h-scree overflow-hidden">
          {children}
        </main>
          <Toaster />
      </Suspense>
      </body>
      </html>
  );
}
