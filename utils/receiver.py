
# -*- coding: utf-8 -*-


import pika
import json

class Receiver(object):

    def __init__(self):
        parameters = pika.ConnectionParameters(host='localhost')
        self.connection = pika.BlockingConnection(parameters)
        self.channel = self.connection.channel()

    def callback(self, ch, method, properties, body):

        data = json.loads(body)
        print data
        ch.basic_ack(delivery_tag=method.delivery_tag)

        # raise NotImplementedError

    def receive(self, exchange='testfan', queue='performance'):
        self.channel.exchange_declare(exchange=exchange, exchange_type='direct')
        self.channel.queue_declare(queue=queue)
        self.channel.basic_consume(self.callback, queue=queue, no_ack=False)
        self.channel.start_consuming()

    def close(self):
        self.__del__()

    def __del__(self):
        self.connection.close()

if __name__ == '__main__':
    receiver = Receiver()
    receiver.receive()