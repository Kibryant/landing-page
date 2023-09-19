import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "..."
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b bg-no-repeat bg-brandPurple  overflow-x-hidden`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
