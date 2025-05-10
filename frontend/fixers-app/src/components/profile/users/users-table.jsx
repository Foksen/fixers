"use client";

import { USER_ROLE } from "@/constants/user-roles";
import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbCrown, TbDots, TbEyeglass } from "react-icons/tb";
import { useState } from "react";
import { UsersDialogEdit } from "./dialogs/users-dialog-edit";
import { UsersDialogDelete } from "./dialogs/users-dialog-delete";

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

function UserRoleBadge({ role }) {
  return (
    <Badge size="lg" gap="6px" colorPalette={mapUserRoleColor(role)}>
      {mapUserRoleIcon(role)}
      {mapUserRoleLabel(role)}
    </Badge>
  );
}

const UserInfoMenu = ({
  userInfo,
  setEditDialogOpen,
  setDeleteDialogOpen,
  setSelectedUser,
}) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <IconButton variant="ghost" size="sm">
        <TbDots />
      </IconButton>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item
            value="edit"
            cursor="pointer"
            onClick={() => {
              setSelectedUser(userInfo);
              setEditDialogOpen(true);
            }}
          >
            Изменить
          </Menu.Item>
          <Menu.Item
            value="delete"
            cursor="pointer"
            color="fg.error"
            _hover={{ bg: "bg.error", color: "fg.error" }}
            onClick={() => {
              setSelectedUser(userInfo);
              setDeleteDialogOpen(true);
            }}
          >
            Удалить
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

export function UsersTable({ initialUserInfos, session }) {
  const [userInfos, setUserInfos] = useState(initialUserInfos);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const updateUserInfos = (id, newUserInfo) => {
    setUserInfos((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...newUserInfo } : cat))
    );
  };

  const removeUserInfo = (id) => {
    setUserInfos((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <Box mt="6">
      <Table.Root size="lg" maxW="5xl">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              w="20"
            >
              Id
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              w="60"
            >
              Имя
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
            >
              Почта
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              w="48"
            >
              Роль
            </Table.ColumnHeader>
            <Table.ColumnHeader border="none" w="12"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userInfos.map((userInfo) => (
            <Table.Row key={userInfo.id} h="16">
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {userInfo.id}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {userInfo.username}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {userInfo.email}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <UserRoleBadge role={userInfo.role} />
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <UserInfoMenu
                  userInfo={userInfo}
                  setSelectedUser={setSelectedUser}
                  setEditDialogOpen={setEditDialogOpen}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <UsersDialogEdit
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        userInfo={selectedUser}
        updateUserInfo={updateUserInfos}
        session={session}
      />

      <UsersDialogDelete
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        userInfo={selectedUser}
        removeUserInfo={removeUserInfo}
        session={session}
      />
    </Box>
  );
}
