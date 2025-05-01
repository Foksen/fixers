"use client";

import { Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Text>Привет, {session?.user.username || "незнакомец"}</Text>
      <Link href="/auth">Авторизация</Link>
      <br />
      <Link href="/profile">Профиль</Link>
    </main>
  );
}
