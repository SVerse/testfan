
function success(data) {
    console.log(data)
    line = []
    branch = []
    data = data['data']
    for (var i=0; i<data.length; i++) {
        line.push(data[i]['line']['rate'])
        branch.push(data[i]['branch']['rate'])
    }
    drawLine('line', line)
    drawLine('branch', branch)
}

function fail(data) {
    console.log(data)
}

function http(url, data, method, success, fail) {
    data = method == 'GET' ? data : JSON.stringify(data)
    $.ajax({
        url: url,
        type: method,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: data,
        success: success,
        error: fail
    });
}

function drawLine(id, data) {
    var myChart = echarts.init(document.getElementById(id));
    console.log(myChart)
    var option = {
        xAxis: {
            type: 'category',
            data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: data,
            type: 'line',
            smooth: true
        }]
    };
    myChart.setOption(option);
}

function search() {
    var data = {
        'collection': 'coverage',
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