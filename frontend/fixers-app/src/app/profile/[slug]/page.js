import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProfilePageContainer } from "@/components/profile/profile-page-container";
import { ProfileSidebarContainer } from "@/components/profile/profile-sidebar-container";
import { Box } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

export default async function ProfilePage({ params }) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);

  return (
    <Box pl="64">
      <ProfileSidebarContainer session={session} />
      <ProfilePageContainer profilePage={slug} session={session} />
    </Box>
  );
}
