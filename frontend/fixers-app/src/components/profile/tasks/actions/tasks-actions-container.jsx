import { HStack } from "@chakra-ui/react";

export function TasksActionsContainer({ children }) {
  return <HStack gap="4">{children}</HStack>;
}
