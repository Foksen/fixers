from .models import TaskStatus

def translate_task_status(status):
    status_translations = {
        TaskStatus.NEW: "Новая",
        TaskStatus.RECEIVED: "Принята",
        TaskStatus.PROCESSING: "В обработке",
        TaskStatus.COMPLETED: "Завершена",
        TaskStatus.CANCELED: "Отменена",
        TaskStatus.REJECTED: "Отклонена",
    }
    return status_translations.get(status, status) 