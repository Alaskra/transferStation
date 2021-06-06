from homePage.models import MyAirportalFile
from django.utils import timezone
from django.db.models import Q, F
import os
from transferStation.settings import MEDIA_ROOT

import logging
from django.conf import settings
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django.core.management.base import BaseCommand
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution

logger = logging.getLogger(__name__)


def my_job():
    #deletExpiredFile():
    print(timezone.now())
    print('start crontab')
    l = MyAirportalFile.objects.filter(Q(downloads__lte=0) | Q(hours__lte=timezone.now() - F('createTime')))
    for i in l:
        filePath = i.name  # 相对MEDIA_ROOT路径
        _, fileName = os.path.split(filePath)
        print("delete: " + fileName)
        i.delete()
        # 从数据库删除并不会自动删除实际文件，需要自己处理
        path = os.path.join(MEDIA_ROOT, filePath)
        os.remove(path)
    print('complete crontab')


def delete_old_job_executions(max_age=604_800):
    """This job deletes all apscheduler job executions older than `max_age` from the database."""
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


class Command(BaseCommand):
    help = "Runs apscheduler."

    def handle(self, *args, **options):
        scheduler = BlockingScheduler(timezone=settings.TIME_ZONE)
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            my_job,
            trigger=CronTrigger(hour="*/1"),  # Every 1 hour
            id="my_job",  # The `id` assigned to each job MUST be unique
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Added job 'my_job'.")

        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(
                day_of_week="mon", hour="00", minute="00"
            ),  # Midnight on Monday, before start of the next work week.
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        logger.info(
            "Added weekly job: 'delete_old_job_executions'."
        )

        try:
            logger.info("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            logger.info("Stopping scheduler...")
            scheduler.shutdown()
            logger.info("Scheduler shut down successfully!")


