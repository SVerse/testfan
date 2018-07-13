function drawBar(id,data,remark,titleName){
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(id));
        console.log(myChart)

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: titleName,
            },
            tooltip: {},
            legend: {
                data:remark
            },
            xAxis: {
                data: data.xAxisData
            },
            yAxis: {},
            series: [{
                name: remark,
                type: 'bar',
                data: data.seriesData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
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

function drawPie(id, data,remark,titleName) {
    var myChart = echarts.init(document.getElementById(id));

    var option = {
    title : {
        text: titleName,
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: data.legendData,
        selected: data.selected
    },
    series : [
        {
            name: remark,
            type: 'pie',
            radius : '55%',
            center: ['40%', '50%'],
            data: data.seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
    myChart.setOption(option);
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