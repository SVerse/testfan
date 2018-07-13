var editor = null;

function ace_editor() {
    //初始化对象
    var editor = ace.edit("editor");
    //设置风格和语言（更多风格和语言，请到github上相应目录查看）
    editor.setTheme("ace/theme/clouds");
    editor.getSession().setMode("ace/mode/python");
    return editor;
}

function success(data) {
    console.log(data)
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

function start(){
    var data={
        'code':editor.getValue(),
        'host':$('#host').val(),
        'user':$('#user').val(),
        'qps':$('#qps').val(),
        'number':$('#number').val(),
    }
    url =  "http://192.168.89.128:8888/performance/api";
    http(url, data, 'POST', success, fail)
}


$(function(){
    editor=ace_editor();
    $('#send').click(start);
});



