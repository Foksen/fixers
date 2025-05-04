import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbDots } from "react-icons/tb";

function ServiceInfoStatusBadge(published) {
  const label = published ? "Доступен" : "Недоступен";
  const colorPalette = published ? "green" : "red";

  return (
    <Badge size="lg" colorPalette={colorPalette}>
      {label}
    </Badge>
  );
}

const ServiceCenterInfoMenu = ({ published, isFree }) => (
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
            {published ? "Доступен" : "Недоступен"}
          </Menu.Item>
          <Menu.Item
            value="delete"
            cursor={isFree ? "pointer" : "default"}
            color="fg.error"
            _hover={{ bg: "bg.error", color: "fg.error" }}
            disabled={!isFree}
          >
            Удалить
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

export function ServiceCentersTable({ serviceCentersInfos }) {
  return (
    <Box mt="5">
      <Table.Root size="lg" maxW="2xl">
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
            >
              Название
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              textAlign="center"
              w="32"
            >
              Заявки
            </Table.ColumnHeader>
            <Table.ColumnHeader
              fontWeight="normal"
              color="fg.subtle"
              border="none"
              w="36"
            >
              Статус
            </Table.ColumnHeader>
            <Table.ColumnHeader border="none" w="12"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {serviceCentersInfos.map((serviceCenterInfo) => (
            <Table.Row key={serviceCenterInfo.id} h="16">
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {serviceCenterInfo.id}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {serviceCenterInfo.name}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
                textAlign="center"
              >
                {serviceCenterInfo.tasks_count}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {ServiceInfoStatusBadge(serviceCenterInfo.published)}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <ServiceCenterInfoMenu
                  isFree={serviceCenterInfo.tasks_count == 0}
                  published={serviceCenterInfo.published}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
