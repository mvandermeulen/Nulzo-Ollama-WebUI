# Generated by Django 5.0.4 on 2024-08-27 01:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="conversation",
            name="created_by",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
    ]
