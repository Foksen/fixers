"use client";

import { useEffect, useState } from "react";
import { ProfilePageView } from "../profile-page-view";
import { NotificationsList } from "./notifications-list";
import { getNotifications } from "@/lib/api/notifications";
import { Center, Spinner, Text } from "@chakra-ui/react";

export function NotificationsContainer({ initialNotifications, session }) {
  const [notifications, setNotifications] = useState(initialNotifications || []);
  const [isLoading, setIsLoading] = useState(!initialNotifications);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!initialNotifications) {
      fetchNotifications();
    }
  }, [initialNotifications]);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await getNotifications(session?.accessToken);
      setNotifications(response.results || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Не удалось загрузить уведомления");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Center h="200px">
          <Spinner size="lg" color="primary.500" />
        </Center>
      );
    }

    if (error) {
      return (
        <Center h="200px">
          <Text color="red.500">{error}</Text>
        </Center>
      );
    }

    if (notifications.length === 0) {
      return (
        <Center h="200px">
          <Text>У вас пока нет уведомлений</Text>
        </Center>
      );
    }

    return <NotificationsList notifications={notifications} />;
  };

  return (
    <ProfilePageView
      title="Уведомления"
      description="На этой странице отображены уведомления по вашим заявкам"
      content={renderContent()}
    />
  );
}
