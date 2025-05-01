import { useState, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { TasksGrid } from "./tasks-grid";
import { getUserTasks } from "@/lib/api/tasks";
import { useSession } from "next-auth/react";

export function TaskContainer() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserTasks(session.accessToken);
        setTasks(result);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    })();
  }, []);

  const newCount = tasks.results?.filter((task) => task.status == "NEW").length;
  const inProgressCount = tasks.results?.filter(
    (task) => task.status == "IN_RPOGRESS"
  ).length;
  const finishedCount = tasks.results?.filter(
    (task) => task.status == "COMPLETED" || task.status == "CANCELED"
  ).length;

  console.log(tasks);

  return (
    <Box px="16" py="12">
      <Heading textStyle="2xl">Ваши заявки на ремонт</Heading>
      <Text mt="2" width="prose">
        На этой странице собрана информация информация о всех ваших заявках и
        статусах их выполнения
      </Text>
      <TasksGrid
        newCount={newCount}
        inProgressCount={inProgressCount}
        finishedCount={finishedCount}
        mt="6"
        tasks={tasks.results}
      />
    </Box>
  );
}
