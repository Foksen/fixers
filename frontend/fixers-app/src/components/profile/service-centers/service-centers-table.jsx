import { Badge, Box, IconButton, Menu, Portal, Table } from "@chakra-ui/react";
import { TbDots } from "react-icons/tb";
import { useState } from "react";
import { ServiceCentersDialogEdit } from "./dialogs/service-centers-dialog-edit";

function ServiceInfoStatusBadge(published) {
  const label = published ? "Доступен" : "Недоступен";
  const colorPalette = published ? "green" : "red";

  return (
    <Badge size="lg" colorPalette={colorPalette}>
      {label}
    </Badge>
  );
}

const ServiceCenterInfoMenu = ({
  serviceCenter,
  isFree,
  setEditDialogOpen,
  setSelectedServiceCenter,
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
              setSelectedServiceCenter(serviceCenter);
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
          >
            Удалить
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);

export function ServiceCentersTable({
  session,
  serviceCentersInfos,
  updateServiceCenterInfo,
}) {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedServiceCenter, setSelectedServiceCenter] = useState(null);

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
          {serviceCentersInfos.map((serviceCenterInfo, index) => (
            <Table.Row key={index} h="16">
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
                  serviceCenter={serviceCenterInfo}
                  setEditDialogOpen={setEditDialogOpen}
                  setSelectedServiceCenter={setSelectedServiceCenter}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <ServiceCentersDialogEdit
        isEditDialogOpen={isEditDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
        serviceCenterInfo={selectedServiceCenter}
        updateServiceCenterInfo={updateServiceCenterInfo}
        session={session}
      />
    </Box>
  );
}
