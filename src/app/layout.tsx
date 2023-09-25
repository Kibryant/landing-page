import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "..."
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} min-h-screen bg-white overflow-x-hidden`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
