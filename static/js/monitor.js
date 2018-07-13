
function success(data) {
    console.log(data)
//    cpu = {
//        legendData:['used','idle'],
//        seriesData:[{'name':'used','value':data['data'][0]['cpu']['used']},{'name':'idle','value':data['data'][0]['cpu']['idle']}],
//        selected:[true,true],
//    }

    cpu = {
        xAxisData:['used','idle'],
        seriesData:[data['data'][0]['cpu']['used'],data['data'][0]['cpu']['idle']],
    }

    net={
        legendData:['receive','send'],
        seriesData:[{'name':'receive','value':data['data'][0]['net']['byte']['receive']},
        {'name':'send','value':data['data'][0]['net']['byte']['send']},],
        selected:[true,true],
    }

    memory = {
        legendData:['available','free','percent','total','used'],
        seriesData:[{'name':'available','value':data['data'][0]['memory']['available']},
        {'name':'free','value':data['data'][0]['memory']['free']},
        {'name':'percent','value':data['data'][0]['memory']['percent']},
        {'name':'total','value':data['data'][0]['memory']['total']},
        {'name':'used','value':data['data'][0]['memory']['used']}],
        selected:[true,true,true,true,true],
    }

    disk={
        legendData:['free','percent','total','used'],
        seriesData:[{'name':'free','value':data['data'][0]['disk']['free']},
        {'name':'percent','value':data['data'][0]['disk']['percent']},
        {'name':'total','value':data['data'][0]['disk']['total']},
        {'name':'used','value':data['data'][0]['disk']['used']}],
         selected:[true,true,true,true],
    }

//    memory = {
//        xAxisData:['available','free','percent','total','used'],
//        seriesData:[{'name':'available','value':data['data'][0]['memory']['available']},
//        {'name':'free','value':data['data'][0]['memory']['free']},
//        {'name':'percent','value':data['data'][0]['memory']['percent']},
//        {'name':'total','value':data['data'][0]['memory']['total']},
//        {'name':'used','value':data['data'][0]['memory']['used']}],
//
//    }
//
//    disk={
//        xAxisData:['free','percent','total','used'],
//        seriesData:[{'name':'free','value':data['data'][0]['disk']['free']},
//        {'name':'percent','value':data['data'][0]['disk']['percent']},
//        {'name':'total','value':data['data'][0]['disk']['total']},
//        {'name':'used','value':data['data'][0]['disk']['used']}],
//    }


    drawBar('cpu',cpu,'使用情况','CPU使用率统计');
//    drawPie('cpu',cpu,'CPU使用率统计');
    drawPie('net',net,'net','net统计');
    drawPie('memory',memory,'memory','memory统计');
    drawPie('disk',disk,'disk','disk统计');
//    drawBar('disk',disk,'使用情况','disk统计');
//    drawBar('memory',memory,'使用情况','memory统计');
//    drawBar('disk',disk,'使用情况','disk统计');


}


function search() {
    var data = {
        'collection': 'monitor',
        'limit': 10,
        'skip': 0
    }
    console.log(data)
    var url = 'http://192.168.89.128:8888/api/v1/search'
    http(url, data, 'GET', success, fail)
}

$(function () {
    search()
});