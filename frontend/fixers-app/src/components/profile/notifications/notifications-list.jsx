import { Stack } from "@chakra-ui/react";
import { NotificationItem } from "./notification-item";

export function NotificationsList({ notifications }) {
  return (
    <Stack mt="6" gap="5">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          title={notification.title}
          message={notification.message}
          isNew={notification.is_new}
          createdAt={notification.created_at}
          taskId={notification.task_id}
          senderId={notification.sender_id}
          senderUsername={notification.sender_username}
        />
      ))}
    </Stack>
  );
}
