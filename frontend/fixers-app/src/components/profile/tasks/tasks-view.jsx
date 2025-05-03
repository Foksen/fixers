import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { TaskGrid } from "./grid/task-grid";

export function TasksView({ title, description, filters, actions, tasks }) {
  return (
    <Box px="16" py="12">
      <Heading textStyle="2xl">{title}</Heading>
      <Text mt="2" width="prose">
        {description}
      </Text>

      <HStack mt="4" justufyContent="space-between">
        {filters}
        {actions}
      </HStack>

      <TaskGrid mt="8" tasks={tasks} />
    </Box>
  );
}
