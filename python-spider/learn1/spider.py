# -*- coding: utf-8 -*-
__author__ = 'hanfeng'
# 模仿网上一个人的教程写的,主要是练习
import urllib.request
import re

class QiuShiBaiKe:
    def __init__(self, url, headers):
        self.url = url
        self.headers = headers

    def getHTML(self):
        request = urllib.request.Request(self.url, headers=self.headers)
        response = urllib.request.urlopen(request)
        return response.read().decode('utf-8')

    def getData(self):
        html = self.getHTML()
        pattern = re.compile('<div.*?class="author.*?>.*?<span>(.*?)</span>.*?</div>', re.S)
        data = re.findall(pattern, html)
        for item in data:
             print(item + '\n')
page = 1
url = 'http://www.qiushibaike.com/8hr/page/' + str(page)
user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
headers = {'User-Agent': user_agent}

spider = QiuShiBaiKe(url, headers)
spider.getData()
