from django.db import models

# Create your models here.

class Notification(models.Model):
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE, related_name='notifications')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='sent_notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_new = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification {self.id}: {self.title}"
    
    class Meta:
        ordering = ['-created_at']
