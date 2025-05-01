"use client";

import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { TasksGrid } from "./tasks-grid";

export function TaskContainer({ session, initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  const appendTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const newCount = tasks?.filter((task) => task.status == "NEW").length || 0;
  const inProgressCount =
    tasks?.filter((task) => task.status == "IN_PROGRESS").length || 0;
  const finishedCount =
    tasks?.filter(
      (task) => task.status == "COMPLETED" || task.status == "CANCELED"
    ).length || 0;

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
