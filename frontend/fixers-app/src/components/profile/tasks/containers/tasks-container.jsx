"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getTaskFilterStatus, TaskFilters } from "./../filters/task-filters";
import { useForm, useWatch } from "react-hook-form";
import { TasksView } from "./../tasks-view";
import { getTasks } from "@/lib/api/tasks";
import debounce from "debounce";
import { mapFilters } from "@/lib/utils/map-filters";
import { DEBOUNCE_WAIT_MS } from "@/constants/api";

const fetchTasks = async (session, filters) => {
  try {
    const result = await getTasks(session.accessToken, filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export function TasksContainer({ session, initialTasks }) {
  const firstRender = useRef(true);

  const [tasks, setTasks] = useState(initialTasks);

  const { control: filtersControl } = useForm();
  const filterValues = useWatch({ control: filtersControl });

  const fitlerTasks = useCallback(
    debounce(async (filtersData) => {
      setTasks(await fetchTasks(session, filtersData));
    }, DEBOUNCE_WAIT_MS),
    [session]
  );

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const filtersData = mapFilters(filterValues);
    fitlerTasks(filtersData);

    console.log("update tasks");
  }, [filterValues]);

  return (
    <TasksView
      title="Мои заявки"
      description="На этой странице собрана информация информация о ваших заявках"
      filters={
        <TaskFilters
          filtersControl={filtersControl}
          taskFiltersList={[getTaskFilterStatus()]}
        />
      }
      tasks={tasks}
    />
  );
}
