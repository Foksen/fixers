import { Stack } from "@chakra-ui/react";
import { NotificationItem } from "./notification-item";

export function NotificationsList({ notifications }) {
  return (
    <Stack mt="6" gap="5">
      {notifications.map((notification, index) => (
        <NotificationItem
          title={notification.title}
          message={notification.message}
          createdAt={notification.created_at}
          key={index}
        />
      ))}
    </Stack>
  );
}
