//定义getList()函数来发送Ajax请求,传递的参数为后台给的接口文档中定义的参数
function getList(categoryId,pageid){
    //调用jQuery的Ajax()方法来发送Ajax请求
    $.ajax({
        type:'get',
        url:'http://182.254.146.100:3000/api/getproductlist',
        data:{
            pageid:pageid||1,
            categoryid:categoryId
        },
        success:function(data){
            //用zepto获取模板
            var tpl   =  $("#product-list-template").html();
            //预编译模板
            var template = Handlebars.compile(tpl);
            //匹配json内容
            var html = template(data);
            //插入模板,到ul中
            $('.product-list ul').html(html);
        }
    })
}

//入口函数
$(function(){
    //获取到查询字符串的id
    var categoryId = Number(GetQueryString("categoryid"));  //getQueryString()是获取上一步传递过来的查询字符串的方法
    //调用定义的getList()获取手机列表
    getList(categoryId);
})

//获取上一步传递过来的查询字符串的方法
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
