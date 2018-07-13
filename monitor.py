#coding=utf-8

import time
import socket

import psutil
import requests

from mongo import Mongo


class Monitor(object):

    def cpu(self):
        info = psutil.cpu_percent(percpu=True)
        percent = sum(info) / len(info)
        cpu = {
            'used': percent,
            'idle': 100 - percent,
        }
        return cpu

    def memory(self):
        info = psutil.virtual_memory()
        memory = {
            'total': info.total,
            'available': info.available,
            'used': info.used,
            'free': info.free,
            'percent': info.percent,
        }
        return memory

    def disk(self):
        info = psutil.disk_usage('/')
        disk = {
            'total': info.total,
            'used': info.used,
            'free': info.free,
            'percent': info.percent,
        }
        return disk

    def net(self):
        info = psutil.net_io_counters() #pernic=True
        net = {
            'byte': {
                'send': info.bytes_sent,
                'receive': info.bytes_recv,
            },
            'packet': {
                'send': info.packets_sent,
                'receive': info.packets_recv,
            }
        }
        return net

    def record(self, data):
        """
        :param data: 记录到数据库里机器的性能数据。
        :param host: 数据库地址
        :param port: 数据库端口
        :return:
        """
        print data
        mongo = Mongo()
        mongo.insert("testfan", "monitor", data)
        mongo.close()

    def collect(self):
        data = {
            'cpu': self.cpu(),
            'memory': self.memory(),
            'disk': self.disk(),
            'net': self.net(),
        }
        return data

    def monitor(self, sample=10):
        while True:
            start = time.time()
            data = self.collect()
            self.record(data)
            wait = sample - (time.time() - start)
            wait = wait if wait > 0 else 0
            time.sleep(wait)

if __name__ == '__main__':
    monitor = Monitor()
    monitor.monitor()