
# -*- coding: utf-8 -*-

import json
import csv

from utils.util import command
from utils.receiver import Receiver

from mongo import Mongo

class Performance(Receiver):

    def callback(self, ch, method, properties, body):
        #进行压测
        data = json.loads(body)

        code = data.get('code')
        host = data.get('host')
        user = data.get('user')
        qps = data.get('qps')
        number = data.get('number')

        with open("locustfile.py","w") as file:
            file.write(code)

        cmd = "locust -f locustfile.py --host={0} --csv=testfan --no-web -c{1} -r{2} -t{3}".format(host,user,qps,number)
        print cmd
        status = command(cmd)
        print status

        file = open("D:/workspace_py/testfan_623/testfan_requests.csv")

        reader = csv.reader(file)
        result = list(reader)
        file.close()
        data.setdefault('result',result)

        mongo = Mongo()
        mongo.insert('testfan','performance',data)
        ch.basic_ack(delivery_tag=method.delivery_tag)

if __name__ == '__main__':
    performance = Performance()
    performance.receive()




