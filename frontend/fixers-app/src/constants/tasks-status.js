export const TASK_STATUS = {
  NEW: "NEW",
  RECEIVED: "RECEIVED",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
  REJECTED: "REJECTED",
};

export const TASK_STATUS_TRANSLATIONS = {
  NEW: "Новая",
  RECEIVED: "Принята",
  PROCESSING: "В обработке",
  COMPLETED: "Завершена",
  CANCELED: "Отменена",
  REJECTED: "Отклонена",
};

export function translateTaskStatus(status) {
  return TASK_STATUS_TRANSLATIONS[status] || status;
}
