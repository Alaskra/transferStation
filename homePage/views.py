import os, random
from django.shortcuts import render, redirect
from homePage.models import MyText, MyFile, MyAirportalFile
from django.http import FileResponse, HttpResponse
from transferStation.settings import MEDIA_ROOT
from django.utils import timezone


def homePage(request):
    def getData():
        context = {}
        text = MyText.objects.all()[0].text
        file_list = MyFile.objects.all()
        context['text'] = text
        context['file_list'] = file_list
        return context

    if request.method == 'GET':
        return render(request, 'homePage/homePage.html', getData())
    elif request.method == 'POST':
        obj = MyText.objects.get(id=1)
        obj.text = request.POST['text']
        obj.save()
        return redirect('/')


def upload(request):
    if request.method == 'POST':
        f = request.FILES['file']
        tmp = MyFile(content=f)
        ## 如果文件名中包含中文括号，save之后文件名会改变。所以save之后再修改name字段再save
        tmp.save()
        tmp.name = tmp.content.name
        tmp.save()
        return redirect('/')


def download(request, fileName):
    if request.method == 'GET':
        path = os.path.join(MEDIA_ROOT, fileName)
        response = FileResponse(open(path, 'rb'), as_attachment=True, filename=fileName)
        return response


def delete(request, fileName):
    if request.method == 'POST':
        print("delete: " + fileName)
        obj = MyFile.objects.get(name=fileName)
        obj.delete()
        # 从数据库删除并不会自动删除实际文件，需要自己处理
        path = os.path.join(MEDIA_ROOT, fileName)
        os.remove(path)
        return redirect('/')


def airportal(request):
    def getPickupCode():
        while True:
            code = ''
            for i in range(6):
                code += str(int(random.random() * 10))
            if len(MyAirportalFile.objects.filter(pickupCode=code)) == 0:
                return code

    if request.method == 'GET':
        # 主页面
        return render(request, 'homePage/airportal.html')
    if request.method == 'POST':
        # 上传airportal
        f = request.FILES['file']
        tmp = MyAirportalFile(content=f)
        tmp.createTime = timezone.now()
        tmp.hours = timezone.timedelta(hours=int(request.POST['hours']))
        tmp.downloads = request.POST['downloads']
        tmp.pickupCode = getPickupCode()
        tmp.save()
        # 如果文件名中包含中文括号，save之后文件名会改变。所以save之后再修改name字段再save
        tmp.name = tmp.content.name
        tmp.save()
        return HttpResponse('上传成功，取件码为：' + str(tmp.pickupCode))


def airportalDownload(request):
    if request.method == 'GET':
        code = request.GET['code']
        tmp = MyAirportalFile.objects.filter(pickupCode=code)
        if len(tmp) == 0:
            # 取件码不存在
            return render(request, 'homePage/aFail.html')
        else:
            obj = tmp[0]
            filePath = obj.name
            path = os.path.join(MEDIA_ROOT, filePath)
            _, fileName = os.path.split(filePath)
            response = FileResponse(open(path, 'rb'), as_attachment=True, filename=fileName)
            counts = int(obj.downloads)
            if counts <= 0:
                return render(request, 'homePage/aFail.html')
            else:
                obj.downloads = str(counts - 1);
                obj.save()
                return response
