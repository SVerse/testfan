#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2018/6/21 13:24
# @Author  : zxh
# @Site    : 
# @File    : util.py


import subprocess

def command(cmd):
    # result = os.system(cmd)
    # if result == 0:
    #     return True
    # else:
    #     return False
    # status, output = commands.getstatusoutput(cmd)
    # return status, output
    process = subprocess.Popen(cmd)
    process.wait()
    return process.returncode#, process.communicate()