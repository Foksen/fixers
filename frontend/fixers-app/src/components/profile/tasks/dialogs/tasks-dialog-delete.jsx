import { deleteTask } from "@/lib/api/tasks";
import { Button, Dialog, Portal, Text } from "@chakra-ui/react";
import { useRef } from "react";

export function TasksDialogDelete({
  isDeleteDialogOpen,
  setDeleteDialogOpen,
  taskInfo,
  removeTaskInfo,
  session,
}) {
  const headerRef = useRef(null);

  const handleDeleteClick = async () => {
    try {
      const result = await deleteTask(session.accessToken, taskInfo.id);
      removeTaskInfo(taskInfo.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog.Root
      role="alertdialog"
      lazyMount
      open={isDeleteDialogOpen}
      onOpenChange={(e) => setDeleteDialogOpen(e.open)}
      initialFocusEl={() => headerRef.current}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header pb="3" ref={headerRef} tabIndex="-1" outline="none">
              <Dialog.Title textStyle="2xl">Удаление заявки</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Вы уверены, что хотите удалить заявку №{taskInfo?.id}? После
                удаления её будет невозможно восстановить
              </Text>
            </Dialog.Body>
            <Dialog.Footer pb="6">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Отменить</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleDeleteClick}>
                Удалить
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
} 