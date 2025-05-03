import { createListCollection, HStack } from "@chakra-ui/react";
import { TaskFilter } from "./task-filter";
import { TaskFilterModel } from "./task-filter-model";
import { TASK_STATUS } from "@/constants/tasks-status";

export const getTaskFilterStatus = () =>
  new TaskFilterModel(
    "Статус",
    "status",
    createListCollection({
      items: [
        { value: TASK_STATUS.NEW.toUpperCase(), label: "Новые" },
        { value: TASK_STATUS.RECEIVED.toUpperCase(), label: "Принятые" },
        { value: TASK_STATUS.PROCESSING.toUpperCase(), label: "В работе" },
        { value: TASK_STATUS.COMPLETED.toUpperCase(), label: "Завершённые" },
        { value: TASK_STATUS.CANCELED.toUpperCase(), label: "Отменённые" },
        { value: TASK_STATUS.REJECTED.toUpperCase(), label: "Отклонённые" },
      ],
    })
  );

export const getTaskFilterMaster = () =>
  new TaskFilterModel(
    "Мастер",
    "master",
    createListCollection({
      items: [
        { value: "none", label: "Нет" },
        { value: "any", label: "Есть" },
        { value: "me", label: "Я" },
        { value: "notMe", label: "Не я" },
      ],
    })
  );

export const getTaskFilterCategory = (categoriesData) =>
  new TaskFilterModel(
    "Вид ремонта",
    "category",
    createListCollection({
      items: categoriesData.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    })
  );

export const getTaskFilterServiceCenter = (serviceCentersData) =>
  new TaskFilterModel(
    "Сервисный центр",
    "service_center",
    createListCollection({
      items: serviceCentersData.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    })
  );

export function TaskFilters({ filtersControl, taskFiltersList, ...props }) {
  return (
    <HStack gap="6" {...props}>
      {taskFiltersList?.map((taskFilter) => (
        <TaskFilter
          filterControl={filtersControl}
          taskFilter={taskFilter}
          key={taskFilter.name}
        />
      ))}
    </HStack>
  );
}
