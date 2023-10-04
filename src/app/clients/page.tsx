"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Client() {
  const router = useRouter();
  const auth = window.localStorage.getItem("client-system");
  if (auth === null) {
    router.push("/accounts/sign-up");
  }
  const username = JSON.parse(auth!).username;

  return (
    <>
      <Section>
        <h1 className="text-black">Hi Clients!</h1>
        <h3 className="text-gray-600">
          <Link href={`clients/${username}`}>Go to your Area Client!</Link>
        </h3>
      </Section>
    </>
  );
}
