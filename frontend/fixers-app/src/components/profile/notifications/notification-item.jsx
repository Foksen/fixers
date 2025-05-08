import { formatDateTime } from "@/util/date-time-format";
import { Flex, Stack, Text } from "@chakra-ui/react";

export function NotificationItem({ title, message, createdAt }) {
  return (
    <Stack
      py="4"
      px="6"
      maxW="lg"
      gap="1"
      borderWidth="1px"
      rounded="md"
      borderColor="border.muted"
    >
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
          {formatDateTime(createdAt)}
        </Text>
      </Flex>
      <Text>{message}</Text>
    </Stack>
  );
}
