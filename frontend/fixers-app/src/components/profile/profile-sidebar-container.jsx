"use client";

import { signOut } from "next-auth/react";
import { ProfileSidebarView } from "./profile-sidebar-view";
import { useEffect, useState } from "react";
import { getNewNotificationsCount } from "@/lib/api/notifications";

export function ProfileSidebarContainer({ session }) {
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  useEffect(() => {
    if (session?.accessToken) {
      fetchNewNotificationsCount();
      
      const intervalId = setInterval(() => {
        fetchNewNotificationsCount();
      }, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [session]);

  const fetchNewNotificationsCount = async () => {
    try {
      const result = await getNewNotificationsCount(session.accessToken);
      setNewNotificationsCount(result.count);
    } catch (error) {
      console.error("Error fetching new notifications count:", error);
    }
  };

  return (
    <ProfileSidebarView
      username={session?.user?.username}
      useravatar={session?.user?.image}
      role={session?.user?.role}
      signOutHandler={() => signOut({ callbackUrl: "/" })}
      newNotificationsCount={newNotificationsCount}
    />
  );
}
