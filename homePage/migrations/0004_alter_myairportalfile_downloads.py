# Generated by Django 3.2 on 2021-06-06 02:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homePage', '0003_myairportalfile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myairportalfile',
            name='downloads',
            field=models.IntegerField(),
        ),
    ]
