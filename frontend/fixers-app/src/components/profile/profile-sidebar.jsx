import { pickPalette } from "@/util/pick-palette";
import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  HStack,
  Icon,
  SkeletonCircle,
  SkeletonText,
  StackSeparator,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiOutlineDocumentText } from "react-icons/hi";
import { PiSignOut } from "react-icons/pi";
import { TbMessageDots, TbSettings, TbUserSearch } from "react-icons/tb";

const SidebarLink = ({ title, icon, href, ...props }) => (
  <Button
    variant="ghost"
    borderRadius="none"
    w="full"
    px="3"
    justifyContent="flex-start"
    rounded="md"
    asChild
    {...props}
  >
    <Link href={href || "/"}>
      {icon && <Icon size="md">{icon}</Icon>} {title}
    </Link>
  </Button>
);

const SidebarProfile = ({ username, useravatar, role, ...props }) => (
  <HStack gap="3" {...props}>
    {username ? (
      <AvatarGroup size="sm">
        <Avatar.Root colorPalette={pickPalette(username)}>
          <Avatar.Fallback name={username} />
          {useravatar && <Avatar.Image src={useravatar} />}
        </Avatar.Root>
      </AvatarGroup>
    ) : (
      <SkeletonCircle size="9" />
    )}

    <VStack align="start" gap="0" w="full">
      {username ? (
        <Text fontWeight="medium">{username}</Text>
      ) : (
        <SkeletonText noOfLines="1" />
      )}
      <Text textStyle="sm">{role}</Text>
    </VStack>
  </HStack>
);

export function ProfileSidebar({ username, useravatar, signOutHandler }) {
  return (
    <Flex
      direction="column"
      left="0"
      w="64"
      h="full"
      position="absolute"
      borderWidth="1px"
      bg="bg.subtle"
    >
      <SidebarProfile
        name=""
        py="4"
        px="3"
        borderBottomWidth="1px"
        username={username}
        useravatar={useravatar}
      />
      <VStack w="full" mt="2" gap="1" separator={<StackSeparator />}>
        <VStack w="full" gap="1" px="1">
          <SidebarLink
            title="Мои заявки"
            icon={<HiOutlineDocumentText />}
            href="/profile/tasks"
          />
          <SidebarLink title="Мастеры" icon={<TbUserSearch />} disabled />
          <SidebarLink title="Сообщения" icon={<TbMessageDots />} disabled />
        </VStack>

        <VStack w="full" gap="1" px="1">
          <SidebarLink
            title="Настройки"
            icon={<TbSettings />}
            href="/profile/settings"
          />
          <SidebarLink
            title="Выйти"
            icon={<PiSignOut />}
            onClick={signOutHandler}
          />
        </VStack>
      </VStack>
    </Flex>
  );
}
