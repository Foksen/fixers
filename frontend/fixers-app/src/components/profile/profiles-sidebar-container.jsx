"use client";

import { signOut, useSession } from "next-auth/react";
import { ProfileSidebar } from "./profile-sidebar";

export function ProfileSidebarContainer() {
  const { data: session } = useSession();
  return (
    <ProfileSidebar
      username={session?.user?.username}
      useravatar={session?.user?.image}
      signOutHandler={() => signOut({ callbackUrl: "/" })}
    />
  );
}
