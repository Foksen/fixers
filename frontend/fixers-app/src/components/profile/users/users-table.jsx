import { USER_ROLE } from "@/constants/user-roles";
import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbCrown, TbDots, TbEyeglass } from "react-icons/tb";

function mapUserRoleLabel(role) {
  switch (role) {
    case USER_ROLE.CLIENT:
      return "Клиент";
    case USER_ROLE.MASTER:
      return "Мастер";
    case USER_ROLE.MODERATOR:
      return "Администратор";
    default:
      return "Неизвестно";
  }
}

function mapUserRoleColor(role) {
  switch (role) {
    case USER_ROLE.CLIENT:
      return "gray";
    case USER_ROLE.MASTER:
      return "orange";
    case USER_ROLE.MODERATOR:
      return "pink";
    default:
      return "red";
  }
}

function mapUserRoleIcon(role) {
  switch (role) {
    case USER_ROLE.MASTER:
      return <TbEyeglass />;
    case USER_ROLE.MODERATOR:
      return <TbCrown />;
    default:
      return null;
  }
}

function userRoleBadge(role) {
  return (
    <Badge size="lg" gap="6px" colorPalette={mapUserRoleColor(role)}>
      {mapUserRoleIcon(role)}
      {mapUserRoleLabel(role)}
    </Badge>
  );
}

const UserInfoMenu = () => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <IconButton variant="ghost" size="sm">
        <TbDots />
      </IconButton>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="edit" cursor="pointer">
            Изменить
          </Menu.Item>
          <Menu.Item value="password" cursor="pointer">
            Пароль
          </Menu.Item>
          <Menu.Item
            value="delete"
            cursor="pointer"
            color="fg.error"
            _hover={{ bg: "bg.error", color: "fg.error" }}
          >
            Удалить
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

export function UsersTable({ usersInfos }) {
  return (
    <Box mt="6">
      <Table.Root size="lg" maxW="5xl">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader border="none">Id</Table.ColumnHeader>
            <Table.ColumnHeader border="none">Имя</Table.ColumnHeader>
            <Table.ColumnHeader border="none">Почта</Table.ColumnHeader>
            <Table.ColumnHeader border="none">Роль</Table.ColumnHeader>
            <Table.ColumnHeader border="none"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersInfos.map((userInfo) => (
            <Table.Row key={userInfo.id} h="16">
              <Table.Cell border="none">{userInfo.id}</Table.Cell>
              <Table.Cell border="none">{userInfo.username}</Table.Cell>
              <Table.Cell border="none">{userInfo.email}</Table.Cell>
              <Table.Cell border="none">
                {userRoleBadge(userInfo.role)}
              </Table.Cell>
              <Table.Cell border="none">
                <UserInfoMenu />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
