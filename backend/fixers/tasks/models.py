from django.db import models

class TaskStatus(models.TextChoices):
    NEW = 'NEW', 'New'
    IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
    COMPLETED = 'COMPLETED', 'Completed'
    CANCELED = 'CANCELED', 'Canceled'

class TaskCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Task(models.Model):
    client = models.ForeignKey('users.User', related_name='client_tasks', on_delete=models.CASCADE)
    master = models.ForeignKey('users.User', related_name='master_tasks', on_delete=models.SET_NULL, null=True, blank=True)
    category = models.ForeignKey(TaskCategory, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=TaskStatus.choices,
        default=TaskStatus.NEW
    )
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Заявка №{self.id}: {self.description[:50]}"