import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbDots } from "react-icons/tb";
import { useState } from "react";
import { CategoriesDialogEdit } from "./dialogs/categories-dialog-edit";
import { CategoriesDialogDelete } from "./dialogs/categories-dialog-delete";

const CategoryInfoStatusBadge = (published) => {
  const label = published ? "Доступен" : "Недоступен";
  const colorPalette = published ? "green" : "red";

  return (
    <Badge size="lg" colorPalette={colorPalette}>
      {label}
    </Badge>
  );
};

const CategoryInfoMenu = ({
  categoryInfo,
  isFree,
  setEditDialogOpen,
  setDeleteDialogOpen,
  setSelectedCategory,
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
              setSelectedCategory(categoryInfo);
              setEditDialogOpen(true);
            }}
          >
            Изменить
          </Menu.Item>
          <Menu.Item
            value="delete"
            cursor={isFree ? "pointer" : "default"}
            color="fg.error"
            _hover={{ bg: "bg.error", color: "fg.error" }}
            disabled={!isFree}
            onClick={() => {
              setSelectedCategory(categoryInfo);
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

export function CategoriesTable({
  session,
  categoriesInfos,
  updateCategoryInfo,
  removeCategoryInfo,
}) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Box mt="5">
      <Table.Root size="lg" maxW="3xl">
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
          {categoriesInfos.map((categoryInfo, index) => (
            <Table.Row key={index} h="16">
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
                  categoryInfo={categoryInfo}
                  setEditDialogOpen={setEditDialogOpen}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  setSelectedCategory={setSelectedCategory}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <CategoriesDialogEdit
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        categoryInfo={selectedCategory}
        updateCategoryInfo={updateCategoryInfo}
        session={session}
      />

      <CategoriesDialogDelete
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        categoryInfo={selectedCategory}
        removeCategoryInfo={removeCategoryInfo}
        session={session}
      />
    </Box>
  );
}
