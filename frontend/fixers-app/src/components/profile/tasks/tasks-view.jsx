import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { TaskGrid } from "./grid/task-grid";

export function TasksView({ title, description, filters, actions, tasks }) {
  return (
    <Box px="16" py="12">
      <Heading textStyle="2xl">{title}</Heading>
      <Text mt="2" width="prose">
        {description}
      </Text>

      <HStack justufyContent="space-between">
        {filters}
        {actions}
      </HStack>

      {/* <TaskFilters
        mt="6"
        filtersControl={filtersControl}
        taskFiltersList={[getTaskFilterStatus(), getTaskFilterMaster()]}
      /> */}

      <TaskGrid mt="10" tasks={tasks} />
    </Box>
  );
}
