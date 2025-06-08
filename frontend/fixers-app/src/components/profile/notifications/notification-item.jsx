import { formatDateTime } from "@/util/date-time-format";
import { Badge, Flex, Stack, Text } from "@chakra-ui/react";

export function NotificationItem({ 
  id, 
  title, 
  message, 
  is_new, 
  created_at, 
  task_id 
}) {
  return (
    <Stack
      py="4"
      px="6"
      maxW="lg"
      gap="1"
      borderWidth="1px"
      rounded="md"
      borderColor={is_new ? "blue.400" : "border.muted"}
      bg={is_new ? "blue.50" : "white"}
      position="relative"
    >
      {is_new && (
        <Badge 
          position="absolute" 
          top="2" 
          right="2" 
          colorScheme="blue"
          fontSize="xs"
        >
          Новое
        </Badge>
      )}
      <Flex w="full">
        <Text flexGrow="1" fontWeight="medium" textStyle="lg">
          {title}
        </Text>
        <Text
          mt="5px"
          minW="36"
          textAlign="end"
          textStyle="sm"
          color="fg.subtle"
        >
          {formatDateTime(created_at)}
        </Text>
      </Flex>
      <Text>{message}</Text>
      {task_id && (
        <Text fontSize="sm" color="gray.600" mt="1">
          Заявка №{task_id}
        </Text>
      )}
    </Stack>
  );
}
