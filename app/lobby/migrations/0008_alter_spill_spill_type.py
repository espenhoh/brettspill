# Generated by Django 4.1.7 on 2023-12-29 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lobby', '0007_alter_spill_slutt_tid_alter_spill_start_tid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spill',
            name='spill_type',
            field=models.CharField(choices=[('MPOL', 'Monopol'), ('4PRA', 'Fire på rad')], default='MPOL', help_text='Type spill', max_length=4),
        ),
    ]
