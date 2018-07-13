
# -*- coding: utf-8 -*-


import json
import pika

class Sender(object):

    def __init__(self):
        parameters = pika.ConnectionParameters(host='localhost')
        self.connection = pika.BlockingConnection(parameters)
        self.channel = self.connection.channel()

    def send(self,message,exchange='testfan',queue='performance'):
        self.channel.exchange_declare(exchange=exchange,exchange_type='direct')
        self.channel.queue_declare(queue=queue)
        self.channel.queue_bind(exchange=exchange,queue=queue)
        self.channel.basic_publish(exchange=exchange,routing_key=queue,body=json.dumps(message))

    def colse(self):
        self.__del__()

    def __del__(self):
        self.connection.close()

if __name__ == '__main__':
    sender = Sender()
    # sender.send("damao")
    # sender.send("ermao")
    # sender.send("aaaaa")
    # sender.send("bbbbb")
    # sender.send("ccccc")

    liststr={"damao","ermao","aaaaa","bbbbb","ccccc","ddddd"}

    for ele in liststr:
        # print ele
        sender.send(ele)



