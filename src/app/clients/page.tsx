"use client";
import { Section } from "@/components/Section";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Client() {
  const router = useRouter();
  const auth: string | null = window.localStorage.getItem("arthur-system");
  if (auth === null) {
    router.push("/signin");
  }

  return (
    <main>
      <Section>
        <h1 className="text-white">Hi Clients!</h1>
        <h3 className="text-zinc-300">
          <Link href={`clients/${auth}`}>Go to your Area Client!</Link>
        </h3>
      </Section>
    </main>
  );
}
