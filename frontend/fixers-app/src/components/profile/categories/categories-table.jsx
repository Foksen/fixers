import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbDots } from "react-icons/tb";

function CategoryInfoStatusBadge(published) {
  const label = published ? "Доступен" : "Недоступен";
  const colorPalette = published ? "green" : "red";

  return (
    <Badge size="lg" colorPalette={colorPalette}>
      {label}
    </Badge>
  );
}

const CategoryInfoMenu = ({ published, isFree }) => (
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
            {published ? "Недоступен" : "Доступен"}
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

export function CategoriesTable({ categoriesInfos }) {
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
          {categoriesInfos.map((categoryInfo) => (
            <Table.Row key={categoryInfo.id} h="16">
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {categoryInfo.id}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
              >
                {categoryInfo.name}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
                fontWeight="medium"
                textAlign="center"
              >
                {categoryInfo.tasks_count}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                {CategoryInfoStatusBadge(categoryInfo.published)}
              </Table.Cell>
              <Table.Cell
                borderTopWidth="1px"
                borderBottomWidth="0"
                borderColor="border.muted"
              >
                <CategoryInfoMenu
                  isFree={categoryInfo.tasks_count == 0}
                  published={categoryInfo.published}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
