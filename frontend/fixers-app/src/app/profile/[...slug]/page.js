"use client";

import { ProfilePageContainer } from "@/components/profile/profile-page-container";
import { PROFILE_PAGES_ALL } from "@/constants/profile-pages";
import { notFound, useParams } from "next/navigation";

export default function ProfilePage() {
  const params = useParams();
  const slug = params.slug;

  const pageParam = Array.isArray(slug) ? slug[0] : slug;

  if (!pageParam || !PROFILE_PAGES_ALL.includes(pageParam)) {
    return notFound();
  }

  return <ProfilePageContainer profilePage={pageParam} />;
}
