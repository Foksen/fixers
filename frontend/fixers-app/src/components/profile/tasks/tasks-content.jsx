import { Box, HStack } from "@chakra-ui/react";
import { TaskGrid } from "./grid/task-grid";

export function TasksContent({ 
  filters, 
  actionsContainer, 
  tasks, 
  session, 
  initialCategories, 
  initialServiceCenters, 
  initialMasters, 
  updateTaskInList 
}) {
  return (
    <Box>
      <HStack w="full" justifyContent="space-between" align="end" mt="4">
        {filters}
        {actionsContainer}
      </HStack>

      <TaskGrid 
        mt="8" 
        tasks={tasks} 
        session={session} 
        initialCategories={initialCategories}
        initialServiceCenters={initialServiceCenters}
        initialMasters={initialMasters}
        updateTaskInList={updateTaskInList}
      />
    </Box>
  );
}
