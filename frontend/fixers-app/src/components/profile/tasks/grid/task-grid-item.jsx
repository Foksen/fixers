import { TASK_STATUS } from "@/constants/tasks-status";
import { USER_ROLE } from "@/constants/user-roles";
import {
  Badge,
  IconButton,
  Menu,
  Portal,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { TbDots, TbChevronRight } from "react-icons/tb";
import { putTask } from "@/lib/api/tasks";
import { useState } from "react";

const TaskGridItemMenu = ({
  role,
  taskInfo,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  session,
}) => {
  const isModerator = role === USER_ROLE.MODERATOR;
  const isMaster = role === USER_ROLE.MASTER;
  const currentMasterId = session?.user?.id;
  const isTaskAssignedToCurrentMaster = isMaster && taskInfo.master === currentMasterId;
  const isTaskUnassigned = !taskInfo.master;
  
  const canChangeStatus = isModerator || isTaskAssignedToCurrentMaster;
  
  const handleStatusChange = async (status) => {
    if (status === taskInfo.status) return;
    
    try {
      if (!canChangeStatus) return;
      
      let submitData = isModerator
        ? {
            description: taskInfo.description,
            status: status,
            category: taskInfo.category,
            service_center: taskInfo.service_center,
            master_id: taskInfo.master ? taskInfo.master.toString() : "null"
          }
        : {
            description: taskInfo.description,
            status: status,
            category: taskInfo.category,
            service_center: taskInfo.service_center
          };

      const response = await putTask(session.accessToken, taskInfo.id, submitData);
      
      if (response) {
        const updatedTask = {
          ...taskInfo,
          status: response.status,
          modified_at: response.modified_at,
          created_at: response.created_at
        };
        
        onStatusChange(updatedTask);
      }
    } catch (error) {}
  };
  
  const handleTakeTask = async () => {
    try {
      if (!isModerator && !isMaster) return;

      let submitData = {
        description: taskInfo.description,
        status: taskInfo.status,
        category: taskInfo.category,
        service_center: taskInfo.service_center,
        master_id: currentMasterId
      };

      const response = await putTask(session.accessToken, taskInfo.id, submitData);
      
      if (response) {
        const updatedTask = {
          ...taskInfo,
          master: response.master,
          master_username: response.master_username,
          modified_at: response.modified_at,
          created_at: response.created_at
        };
        
        onStatusChange(updatedTask);
      }
    } catch (error) {}
  };

  const handleDetachFromTask = async () => {
    try {
      if (!isModerator && !isTaskAssignedToCurrentMaster) return;
      
      let submitData = {
        description: taskInfo.description,
        status: taskInfo.status,
        category: taskInfo.category,
        service_center: taskInfo.service_center,
        master_id: "null"
      };

      const response = await putTask(session.accessToken, taskInfo.id, submitData);
      
      if (response) {
        const updatedTask = {
          ...taskInfo,
          master: response.master,
          master_username: response.master_username,
          modified_at: response.modified_at,
          created_at: response.created_at
        };
        
        onStatusChange(updatedTask, true);
      }
    } catch (error) {}
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <IconButton
          position="absolute"
          right="4"
          top="4"
          variant="ghost"
          size="sm"
          outline="none"
        >
          <TbDots />
        </IconButton>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {canChangeStatus && (
              <Menu.Root positioning={{ placement: "right-start", gutter: 2 }}>
                <Menu.TriggerItem>
                  Статус <TbChevronRight style={{ marginLeft: "auto" }} />
                </Menu.TriggerItem>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      {Object.values(TASK_STATUS).map((status) => (
                        <Menu.Item 
                          key={status}
                          value={status.toLowerCase()} 
                          onClick={() => handleStatusChange(status)}
                          disabled={taskInfo.status === status}
                        >
                          {mapTaskStatusTitle(status)}
                        </Menu.Item>
                      ))}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )}

            {isMaster && !isTaskAssignedToCurrentMaster && (
              <Menu.Item
                value="take-task"
                cursor="pointer"
                onClick={handleTakeTask}
              >
                Взять в работу
              </Menu.Item>
            )}

            {isTaskAssignedToCurrentMaster && (
              <Menu.Item
                value="detach"
                cursor="pointer"
                onClick={handleDetachFromTask}
              >
                Отказаться от заявки
              </Menu.Item>
            )}

            {isModerator && (
              <Menu.Item
                value="edit"
                cursor="pointer"
                onClick={() => onEditTask(taskInfo)}
              >
                Изменить
              </Menu.Item>
            )}

            {isModerator && (
              <Menu.Item
                value="delete"
                cursor="pointer"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={() => onDeleteTask(taskInfo)}
              >
                Удалить
              </Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

function mapTaskStatusTitle(status) {
  switch (status) {
    case TASK_STATUS.NEW:
      return "Новая";
    case TASK_STATUS.RECEIVED:
      return "Принята";
    case TASK_STATUS.PROCESSING:
      return "В работе";
    case TASK_STATUS.COMPLETED:
      return "Завершена";
    case TASK_STATUS.CANCELED:
      return "Отменена";
    case TASK_STATUS.REJECTED:
      return "Отклонена";
    default:
      return "Неизвестно";
  }
}

function mapTaskStatusColor(status) {
  switch (status) {
    case TASK_STATUS.NEW:
      return null;
    case TASK_STATUS.RECEIVED:
    case TASK_STATUS.PROCESSING:
      return "yellow";
    case TASK_STATUS.COMPLETED:
      return "green";
    case TASK_STATUS.CANCELED:
    case TASK_STATUS.REJECTED:
      return "red";
    default:
      return "pink";
  }
}

const TaskInfo = ({ title, isLast, isValue }) => (
  <Table.Cell
    px="0"
    borderBottomWidth={isLast ? "0" : null}
    textAlign={isValue ? "end" : "start"}
    fontWeight={isValue ? "medium" : null}
    borderColor="border.muted"
  >
    {title}
  </Table.Cell>
);

export function TaskGridItem({ session, task, onEditTask, onDeleteTask, onStatusChange }) {
  const created_at = moment(task.created_at).format("DD.MM.YYYY HH:mm");
  const modified_at = moment(task.modified_at).format("DD.MM.YYYY HH:mm");
  const userRole = session?.user?.role;
  const isModerator = userRole === USER_ROLE.MODERATOR;
  const isMaster = userRole === USER_ROLE.MASTER;
  const canAccessMenu = isModerator || isMaster;

  return (
    <VStack
      position="relative"
      px="7"
      py="6"
      borderWidth="1px"
      align="start"
      rounded="sm"
    >
      <Text fontWeight="medium" textStyle="2xl">
        {`${task.description}`}
      </Text>
      <Table.Root mt="1" size="sm">
        <Table.Body>
          <Table.Row>
            <TaskInfo title="Номер заявки" />
            <TaskInfo isValue title={task.id} />
          </Table.Row>

          <Table.Row>
            <TaskInfo title="Вид ремонта" />
            <TaskInfo isValue title={task.category_name} />
          </Table.Row>

          <Table.Row>
            <TaskInfo title="Сервисный центр" />
            <TaskInfo isValue title={task.service_center_name} />
          </Table.Row>

          <Table.Row>
            <TaskInfo title="Мастер" />
            <TaskInfo isValue title={task.master_username || "—"} />
          </Table.Row>

          <Table.Row>
            <TaskInfo title="Создана" />
            <TaskInfo isValue title={created_at} />
          </Table.Row>

          <Table.Row>
            <TaskInfo title="Обновлена" />
            <TaskInfo isValue title={modified_at} />
          </Table.Row>

          <Table.Row>
            <TaskInfo isLast title="Статус" />
            <TaskInfo
              isLast
              isValue
              title={
                <Badge
                  py="1"
                  px="3"
                  borderWidth="1px"
                  colorPalette={mapTaskStatusColor(task.status)}
                >
                  {mapTaskStatusTitle(task.status)}
                </Badge>
              }
            />
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {canAccessMenu && (
        <TaskGridItemMenu 
          role={userRole} 
          taskInfo={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
          session={session}
        />
      )}
    </VStack>
  );
}
