import {
  PROFILE_COMMON_PAGE,
  PROFILE_PAGE,
  PROFILE_PAGE_AUTHORITIES,
} from "@/constants/profile-pages";
import { roleToView, USER_ROLE } from "@/constants/user-roles";
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
import {
  HiOutlineDocumentDuplicate,
  HiOutlineDocumentSearch,
  HiOutlineDocumentText,
} from "react-icons/hi";
import { PiSignOut } from "react-icons/pi";
import {
  TbBell,
  TbBuildings,
  TbCategory2,
  TbSettings,
  TbUsers,
  TbUserSearch,
} from "react-icons/tb";

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
      <Text textStyle="sm">{role != USER_ROLE.CLIENT && roleToView(role)}</Text>
    </VStack>
  </HStack>
);

function createSidebarLink(profilePage, key) {
  const href = `/profile/${profilePage}`;
  switch (profilePage) {
    case PROFILE_PAGE.TASKS:
      return (
        <SidebarLink
          title="Мои заявки"
          icon={<HiOutlineDocumentText />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.NOTIFICATIONS:
      return (
        <SidebarLink title="Уведомления" icon={<TbBell />} disabled key={key} />
      );

    case PROFILE_PAGE.MASTERS:
      return (
        <SidebarLink
          title="Мастеры"
          icon={<TbUserSearch />}
          disabled
          key={key}
        />
      );

    case PROFILE_PAGE.USERS:
      return (
        <SidebarLink
          title="Пользователи"
          icon={<TbUsers />}
          disabled
          key={key}
        />
      );

    case PROFILE_PAGE.CLIENT_TASKS:
      return (
        <SidebarLink
          title="Все заявки"
          icon={<HiOutlineDocumentSearch />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.WORKING_TASTS:
      return (
        <SidebarLink
          title="Заявки в работе"
          icon={<HiOutlineDocumentDuplicate />}
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.CATEGORIES:
      return (
        <SidebarLink
          title="Виды ремонта"
          icon={<TbCategory2 />}
          disabled
          key={key}
        />
      );

    case PROFILE_PAGE.SERVICE_CENTERS:
      return (
        <SidebarLink
          title="Сервисные центры"
          icon={<TbBuildings />}
          disabled
          key={key}
        />
      );

    case PROFILE_COMMON_PAGE.SETTINGS:
      return (
        <SidebarLink
          title="Настройки"
          icon={<TbSettings />}
          href={href}
          key={key}
        />
      );
  }
}

export function ProfileSidebar({ username, useravatar, role, signOutHandler }) {
  const availableRolePages = PROFILE_PAGE_AUTHORITIES[role];

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
        role={role}
      />
      <VStack w="full" mt="2" gap="1" separator={<StackSeparator />}>
        <VStack w="full" gap="1" px="1">
          {availableRolePages.map((page, index) =>
            createSidebarLink(page, index)
          )}
        </VStack>

        <VStack w="full" gap="1" px="1">
          {Object.values(PROFILE_COMMON_PAGE).map((page, index) =>
            createSidebarLink(page, index)
          )}
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
