import { Box, HStack } from "@chakra-ui/react";
import { TaskGrid } from "./grid/task-grid";

export function TasksContent({ filters, actions, tasks }) {
  console.log("content");
  return (
    <Box>
      <HStack mt="4" justufyContent="space-between">
        {filters}
        {actions}
      </HStack>

      <TaskGrid mt="8" tasks={tasks} />
    </Box>
  );
}
