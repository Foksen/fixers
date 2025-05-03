"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  getTaskFilterCategory,
  getTaskFilterServiceCenter,
  getTaskFilterStatus,
  TaskFilters,
} from "./../filters/task-filters";
import { TasksView } from "./../tasks-view";
import { getTasks } from "@/lib/api/tasks";
import debounce from "debounce";
import { mapFilters } from "@/lib/utils/map-filters";
import { DEBOUNCE_WAIT_MS } from "@/constants/api";

const fetchMasterTasks = async (session, filters) => {
  try {
    const masterId = session?.user?.id;
    if (!masterId) {
      throw new Error("Cannot get master id from session");
    }
    if (!filters) {
      filters = {};
    }
    filters.master = masterId;
    const result = await getTasks(session.accessToken, filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export function WorkingTasksContainer({
  session,
  initialTasks,
  initialCategories,
  initialServiceCenters,
}) {
  const firstRender = useRef(true);

  const [tasks, setTasks] = useState(initialTasks);

  const { control: filtersControl } = useForm();
  const filterValues = useWatch({ control: filtersControl });

  const fitlerTasks = useCallback(
    debounce(async (filtersData) => {
      setTasks(await fetchMasterTasks(session, filtersData));
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
      title="Заявки в работе"
      description="На этой странице собрана информация информация о заявках, за которыми закреплены вы"
      filters={
        <TaskFilters
          filtersControl={filtersControl}
          taskFiltersList={[
            getTaskFilterStatus(),
            getTaskFilterCategory(initialCategories),
            getTaskFilterServiceCenter(initialServiceCenters),
          ]}
        />
      }
      tasks={tasks}
    />
  );
}
