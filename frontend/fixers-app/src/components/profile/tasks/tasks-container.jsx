"use client";

import { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { TasksGrid } from "./tasks-grid";
import { getUserTasks } from "@/lib/api/tasks";

export function TaskContainer({ session }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserTasks(session.accessToken);
        setTasks(result.results);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();
  }, []);

  const appendTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const newCount = tasks.filter((task) => task.status == "NEW").length;
  const inProgressCount = tasks.filter(
    (task) => task.status == "IN_RPOGRESS"
  ).length;
  const finishedCount = tasks.filter(
    (task) => task.status == "COMPLETED" || task.status == "CANCELED"
  ).length;

  return (
    <Box px="16" py="12">
      <Heading textStyle="2xl">Ваши заявки на ремонт</Heading>
      <Text mt="2" width="prose">
        На этой странице собрана информация информация о всех ваших заявках и
        статусах их выполнения
      </Text>
      <TasksGrid
        mt="6"
        accessToken={session?.accessToken}
        newCount={newCount}
        inProgressCount={inProgressCount}
        finishedCount={finishedCount}
        tasks={tasks}
        appendTask={appendTask}
      />
    </Box>
  );
}
