"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  getTaskFilterCategory,
  getTaskFilterServiceCenter,
  getTaskFilterStatus,
  TaskFilters,
} from "./../filters/task-filters";
import { mapFilters } from "@/lib/utils/map-filters";
import { getTasks } from "@/lib/api/tasks";
import debounce from "debounce";
import { DEBOUNCE_WAIT_MS } from "@/constants/api";
import { TasksContent } from "../tasks-content";
import { ProfilePageView } from "../../profile-page-view";

const fetchTasks = async (session, filters) => {
  try {
    const result = await getTasks(session.accessToken, filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export function ClientTasksContainer({
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
  }, [filterValues]);

  return (
    <ProfilePageView
      title="Заявки клиентов"
      description="На этой странице собрана информация информация о всех заявках клиентов"
      content={TasksContent({
        filters: TaskFilters({
          filtersControl: filtersControl,
          taskFiltersList: [
            getTaskFilterStatus(),
            getTaskFilterCategory(initialCategories),
            getTaskFilterServiceCenter(initialServiceCenters),
          ],
        }),
        tasks: tasks,
      })}
    />
  );
}
