import { Box, HStack } from "@chakra-ui/react";
import { TaskGrid } from "./grid/task-grid";

export function TasksContent({ filters, actionsContainer, tasks }) {
  return (
    <Box>
      <HStack w="full" justifyContent="space-between" align="end" mt="4">
        {filters}
        {actionsContainer}
      </HStack>

      <TaskGrid mt="8" tasks={tasks} />
    </Box>
  );
}
