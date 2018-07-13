#!/usr/bin/python
# coding=utf-8
import json
from receiver import Receiver
import time
import random


class Performance(Receiver):

    def callback(self, ch, method, properties, body):
        #进行压测
        data = json.loads(body)
        print data
        time.sleep(random.randint(2,5))

        ch.basic_ack(delivery_tag=method.delivery_tag)

if __name__ == '__main__':
    performance = Performance()
    performance.receive()
