# web端文件中转站

自己练手的web项目，使用django框架作为后端, bootstrap美化UI，jquery编写js。

## 部署方法

- 安装python3.9, 最好使用虚拟环境
- 导入包：`pip install -r packages.txt`
- 创建数据库：`python manage.py migrate`
- 运行：`python manage.py runserver 0.0.0.0:8080`

## 项目特点

- web端支持全平台
- 支持多种传输方式
  - 一般的文件传输
  - 直接传文本
  - 电脑截图后ctrl-v
  - 手机拍照上传
  - airportal的方式

## 待实现的功能

- [x] 一般的文件传输
- [x] 直接传文本
- [ ] 电脑截图后ctrl-v
- [ ] 手机拍照上传
- [ ] airportal的方式
