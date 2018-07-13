#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/5/29 10:12
# @Author  : zxh
# @Site    : 
# @File    : testacb.py

import random

def getrand(num, many):# num 是位数；many：是个数
    for x in range(many):
        s = ""
        for i in range(num):
            n = random.randint(1, 2) #n = 1  生成数字  n=2  生成字母
            if n == 1:
                numb = random.randint(0, 9)
                s += str(numb)
            else:
                nn = random.randint(1, 2)
                cc = random.randint(1, 26)
                if nn == 1:
                    numb = chr(64+cc)
                    s += numb
                else:
                    numb = chr(96+cc)
                    s += numb

        print(s)


if __name__ == '__main__':
    print getrand(20,10000)