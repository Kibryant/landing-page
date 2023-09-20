import { Header } from "@/components/Clients/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page | CLIENT"
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Header />
      <main className="p-5"> {children}</main>
    </div>
  );
}
