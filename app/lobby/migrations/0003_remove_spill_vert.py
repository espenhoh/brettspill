# Generated by Django 4.0.6 on 2022-12-24 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0002_alter_spillerispill_unique_together'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spill',
            name='vert',
        ),
    ]
