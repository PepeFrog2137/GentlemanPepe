import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pepe Gentleman",
  description: "In the refined aura of a gentleman's demeanor, Pepe epitomizes elegance with every graceful gesture and eloquent word he utters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
  );
}
