"use client";

import { signOut } from "next-auth/react";
import { ProfileSidebar } from "./profile-sidebar";

export function ProfileSidebarContainer({ session }) {
  return (
    <ProfileSidebar
      username={session?.user?.username}
      useravatar={session?.user?.image}
      role={session?.user?.role}
      signOutHandler={() => signOut({ callbackUrl: "/" })}
    />
  );
}
