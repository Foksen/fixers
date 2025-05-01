import { ProfileSidebarContainer } from "@/components/profile/profiles-sidebar-container";
import { Box } from "@chakra-ui/react";

export default function ProfileLayout({ children }) {
  return (
    <Box minHeight="dvh">
      <Box pl="64">
        <ProfileSidebarContainer />
        {children}
      </Box>
    </Box>
  );
}
