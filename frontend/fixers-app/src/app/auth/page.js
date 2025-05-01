"use client";

import { AuthContainer } from "@/components/auth/auth-cointainer";
import { Toaster } from "@/components/ui/toaster";
import { Center } from "@chakra-ui/react";

export default function AuthPage() {
  return (
    <Center minHeight="dvh">
      <Toaster />
      <AuthContainer />
    </Center>
  );
}
