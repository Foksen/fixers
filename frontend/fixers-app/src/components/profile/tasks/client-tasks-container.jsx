"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getTaskFilterMaster,
  getTaskFilterStatus,
  TaskFilters,
} from "./filters/task-filters";
import { TasksView } from "./tasks-view";

export function ClientTasksContainer({ session, initialTasks }) {
  const { control: filtersControl, watch: filtersWatch } = useForm();
  const [tasks, setTasks] = useState(initialTasks);
  const filterValues = filtersWatch();

  useEffect(() => {
    // console.log(filterValues);
    // console.log(session);
    // const updateTasks = async () => {
    //   const newTasks = await fetchTasks(session, filterValues);
    //   setTasks(newTasks);
    // };
    // updateTasks();
  }, [filterValues]);

  return (
    <TasksView
      title="Заявки клиентов"
      description="На этой странице собрана информация информация о всех заявках клиентов"
      filters={
        <TaskFilters
          mt="6"
          filtersControl={filtersControl}
          taskFiltersList={[getTaskFilterStatus(), getTaskFilterMaster()]}
        />
      }
      tasks={tasks}
    />
  );
}
