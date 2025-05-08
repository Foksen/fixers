import { ProfilePageView } from "../profile-page-view";
import { NotificationsList } from "./notifications-list";

export function NotificationsContainer({ initialNotifications }) {
  return (
    <ProfilePageView
      title="Уведомления"
      description="На этой странице отображены уведомления по вашим заявкам"
      content={<NotificationsList notifications={initialNotifications} />}
    />
  );
}
