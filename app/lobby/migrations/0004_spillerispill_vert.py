# Generated by Django 4.0.6 on 2022-12-24 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0003_remove_spill_vert'),
    ]

    operations = [
        migrations.AddField(
            model_name='spillerispill',
            name='vert',
            field=models.BooleanField(default=False),
        ),
    ]
