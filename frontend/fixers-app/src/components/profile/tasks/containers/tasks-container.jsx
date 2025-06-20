"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getTaskFilterStatus, TaskFilters } from "./../filters/task-filters";
import { useForm, useWatch } from "react-hook-form";
import { getTasks } from "@/lib/api/tasks";
import debounce from "debounce";
import { mapFilters } from "@/lib/utils/map-filters";
import { DEBOUNCE_WAIT_MS } from "@/constants/api";
import { TasksContent } from "../tasks-content";
import { ProfilePageView } from "../../profile-page-view";
import { TasksActionsContainer } from "../actions/tasks-actions-container";
import { TasksActionCreate } from "../actions/tasks-action-create";

const fetchTasks = async (session, filters) => {
  try {
    const result = await getTasks(session.accessToken, filters);
    return result.results;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export function TasksContainer({
  session,
  initialTasks,
  initialCategories,
  initialServiceCenters,
  initialMasters,
  publishedCategories,
  publishedServiceCenters,
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
  
  const updateTaskInList = useCallback((taskId, updatedTask, shouldRemove = false) => {
    setTasks(prevTasks => {
      if (shouldRemove) {
        return prevTasks.filter(task => task.id !== taskId);
      }
      return prevTasks.map(task => task.id === taskId ? updatedTask : task);
    });
  }, []);

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
      title="Мои заявки"
      description="На этой странице собрана информация информация о ваших заявках"
      content={TasksContent({
        filters: TaskFilters({
          filtersControl: filtersControl,
          taskFiltersList: [getTaskFilterStatus()],
        }),
        actionsContainer: (
          <TasksActionsContainer>
            <TasksActionCreate
              session={session}
              initialCategories={publishedCategories}
              initialServiceCenters={publishedServiceCenters}
              filterTasks={() => {
                const filtersData = mapFilters(filterValues);
                fitlerTasks(filtersData);
              }}
            />
          </TasksActionsContainer>
        ),
        tasks: tasks,
        session: session,
        initialCategories: initialCategories,
        initialServiceCenters: initialServiceCenters,
        initialMasters: initialMasters,
        updateTaskInList: updateTaskInList,
      })}
    />
  );
}
