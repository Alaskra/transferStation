from django.shortcuts import render, redirect
from homePage.models import MyText, MyFile
from django.http import FileResponse
import os
from transferStation.settings import MEDIA_ROOT


def getData():
    context = {}
    text = MyText.objects.all()[0].text
    file_list = MyFile.objects.all()
    context['text'] = text
    context['file_list'] = file_list
    return context


def homePage(request):
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
