import { backendFetch } from './fetcher';

export async function getNotifications(accessToken, params = {}) {
  return backendFetch("/notifications/", {
    method: "GET",
    accessToken,
    params,
  });
}

export async function getNewNotificationsCount(accessToken) {
  return backendFetch("/notifications/count_new/", {
    method: "GET",
    accessToken,
  });
}

export async function markAllNotificationsAsRead(accessToken) {
  return backendFetch("/notifications/mark_all_as_read/", {
    method: "POST",
    accessToken,
  });
}

export async function markNotificationAsRead(accessToken, notificationId) {
  return backendFetch(`/notifications/${notificationId}/mark_as_read/`, {
    method: "POST",
    accessToken,
  });
} 