import { Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Text>Привет, {session?.user?.username || "незнакомец"}</Text>
      <Link href="/auth">Авторизация</Link>
      <br />
      <Link href="/profile">Профиль</Link>
    </main>
  );
}
