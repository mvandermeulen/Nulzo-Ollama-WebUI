# Generated by Django 5.0.4 on 2024-10-02 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_message_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="assistant",
            name="icon",
            field=models.TextField(blank=True, null=True),
        ),
    ]