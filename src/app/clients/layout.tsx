import { Header } from "@/components/Clients/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page | CLIENT"
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Header />
      <main className="flex flex-col w-full">
        <div className="w-full p-2 border-b">
          <p>Clients</p>
        </div>
        <div className="px-5">{children}</div>
      </main>
    </div>
  );
}
