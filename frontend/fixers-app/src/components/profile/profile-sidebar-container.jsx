"use client";

import { signOut } from "next-auth/react";
import { ProfileSidebarView } from "./profile-sidebar-view";

export function ProfileSidebarContainer({ session }) {
  return (
    <ProfileSidebarView
      username={session?.user?.username}
      useravatar={session?.user?.image}
      role={session?.user?.role}
      signOutHandler={() => signOut({ callbackUrl: "/" })}
      newNotificationsCount={1} // TODO: fetch from API
    />
  );
}
