"use client";

import { AuthContainer } from "@/components/auth/auth-cointainer";
import { Center } from "@chakra-ui/react";

export default function AuthPage() {
  return (
    <Center minHeight="dvh">
      <AuthContainer />
    </Center>
  );
}
