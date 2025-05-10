import {
  PROFILE_COMMON_PAGE,
  PROFILE_PAGE,
  PROFILE_PAGE_AUTHORITIES,
} from "@/constants/profile-pages";
import { ACCENT_COLOR, RAINBOW_AVATAR_COLORS } from "@/constants/ui";
import { roleToView, USER_ROLE } from "@/constants/user-roles";
import { pickPalette } from "@/util/pick-palette";
import {
  Avatar,
  AvatarGroup,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  SkeletonCircle,
  SkeletonText,
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
} from "react-icons/tb";

function mapNotificationsLinkLabel(newNotificationsCount) {
  if (!(newNotificationsCount > 0)) {
    return "Уведомления";
  }

  return (
    <HStack position="relative" w="full" justifyContent="space-between">
      <Text>Уведомления</Text>
      <Center
        position="absolute"
        w="6"
        h="6"
        right="0"
        align="center"
        bg={`${ACCENT_COLOR}.solid`}
        color={`${ACCENT_COLOR}.contrast`}
        rounded="full"
        textStyle="xs"
        fontWeight="semibold"
      >
        {newNotificationsCount}
      </Center>
    </HStack>
  );
}

const SidebarLink = ({ title, icon, href, ...props }) => (
  <Button
    variant="ghost"
    borderRadius="none"
    w="full"
    px="3"
    py="5"
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

export const SidebarProfile = ({
  size,
  username,
  useravatar,
  role,
  ...props
}) => (
  <HStack gap="3" {...props}>
    {username ? (
      <AvatarGroup size={size}>
        <Avatar.Root
          colorPalette={
            RAINBOW_AVATAR_COLORS ? pickPalette(username) : ACCENT_COLOR
          }
        >
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

    case PROFILE_PAGE.USERS:
      return (
        <SidebarLink
          title="Пользователи"
          icon={<TbUsers />}
          href={href}
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
          href={href}
          key={key}
        />
      );

    case PROFILE_PAGE.SERVICE_CENTERS:
      return (
        <SidebarLink
          title="Сервисные центры"
          icon={<TbBuildings />}
          href={href}
          key={key}
        />
      );
  }
}

export function ProfileSidebarView({
  username,
  useravatar,
  role,
  newNotificationsCount,
  signOutHandler,
}) {
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
        size="sm"
        py="4"
        px="3"
        username={username}
        useravatar={useravatar}
        role={role}
      />
      <VStack w="full" gap="1" px="1">
        {availableRolePages.map((page, index) =>
          createSidebarLink(page, index)
        )}

        <SidebarLink
          title={mapNotificationsLinkLabel(newNotificationsCount)}
          icon={<TbBell />}
          href={`/profile/${PROFILE_COMMON_PAGE.NOTIFICATIONS}`}
        />

        <SidebarLink
          title="Настройки"
          icon={<TbSettings />}
          href={`/profile/${PROFILE_COMMON_PAGE.SETTINGS}`}
        />

        <SidebarLink
          title="Выйти"
          icon={<PiSignOut />}
          onClick={signOutHandler}
          _hover={{ bg: "bg.error", color: "fg.error" }}
        />
      </VStack>
    </Flex>
  );
}
