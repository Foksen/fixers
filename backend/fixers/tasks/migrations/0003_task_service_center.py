# Generated by Django 5.2 on 2025-05-03 10:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_servicecenter_alter_task_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='service_center',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='tasks.servicecenter'),
            preserve_default=False,
        ),
    ]
