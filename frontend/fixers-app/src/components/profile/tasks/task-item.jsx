import { Badge, Table, Text, VStack } from "@chakra-ui/react";
import moment from "moment";

function mapTaskStatusTitle(title) {
  switch (title) {
    case "NEW":
      return "Новая";
    case "IN_PROGRESS":
      return "Выполняется";
    case "COMPLETED":
      return "Выполнена";
    case "CANCELED":
      return "Отменена";
    default:
      return "Неизвестно";
  }
}

function mapTaskStatusColor(title) {
  switch (title) {
    case "NEW":
      return null;
    case "IN_PROGRESS":
      return "yellow";
    case "COMPLETED":
      return "green";
    case "CANCELED":
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
  >
    {title}
  </Table.Cell>
);

export function TaskItem({ task }) {
  console.log(task);
  const created_at = moment(task.modified_at).format("DD.MM.YYYY HH:mm");
  const modified_at = moment(task.modified_at).format("DD.MM.YYYY HH:mm");
  return (
    <VStack px="6" py="4" borderWidth="1px" align="start" rounded="sm">
      <Text fontWeight="medium" textStyle="lg">
        {`Заявка №${task.id}`}
      </Text>
      <Table.Root>
        <Table.Body>
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
