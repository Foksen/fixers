from .models import Notification
from tasks.utils import translate_task_status


def create_task_status_notification(task, user, sender=None):
    status_display = translate_task_status(task.status)
    
    title = "Статус заявки изменён"
    message = f"Статус вашей заявки №{task.id} ({task.description[:30]}...) изменен на \"{status_display}\""
    
    if sender:
        if sender.role == 'MASTER':
            message = f"Мастер {sender.username} изменил статус вашей заявки №{task.id} ({task.description[:30]}...) на \"{status_display}\""
        elif sender.role == 'MODERATOR':
            message = f"Модератор {sender.username} изменил статус вашей заявки №{task.id} ({task.description[:30]}...) на \"{status_display}\""
    
    Notification.objects.create(
        task=task,
        user=user,
        sender=sender,
        title=title,
        message=message,
        is_new=True
    )


def create_task_master_notification(task, user, master, action_type):
    title = "Мастер назначен" if action_type == 'assigned' else "Мастер отказался от заявки"
    
    if action_type == 'assigned':
        message = f"Мастер {master.username} назначен на вашу заявку №{task.id} ({task.description[:30]}...)"
    else:
        message = f"Мастер {master.username} отказался от вашей заявки №{task.id} ({task.description[:30]}...)"
    
    Notification.objects.create(
        task=task,
        user=user,
        sender=master,
        title=title,
        message=message,
        is_new=True
    ) 