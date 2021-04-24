# Generated by Django 3.2 on 2021-04-24 07:23

from django.db import migrations

def createText(apps, schema_editor):
    Text = apps.get_model('homePage', 'MyText')
    tmp=Text(text="Hello World!")
    tmp.save()

class Migration(migrations.Migration):

    dependencies = [
        ('homePage', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(createText)
    ]
