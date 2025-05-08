import { TASK_STATUS } from "@/constants/tasks-status";
import { Badge, Table, Text, VStack } from "@chakra-ui/react";
import moment from "moment";

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

export function TaskGridItem({ task }) {
  const created_at = moment(task.modified_at).format("DD.MM.YYYY HH:mm");
  const modified_at = moment(task.modified_at).format("DD.MM.YYYY HH:mm");
  return (
    <VStack px="7" py="6" borderWidth="1px" align="start" rounded="sm">
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
    </VStack>
  );
}
