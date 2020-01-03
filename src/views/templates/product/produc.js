//getList()
function getList(categoryId,pageid){
    //jQuery-Ajax
    $.ajax({
        type:'get',
        url:'http://182.254.146.100:3000/api/getproductlist',
        data:{
            pageid:pageid||1,
            categoryid:categoryId
        },
        success:function(data){
            var tpl   =  $("#product-list-template").html();
            var template = Handlebars.compile(tpl);
            var html = template(data);
            $('.product-list ul').html(html);
        }
    })
}

$(function(){
    var categoryId = Number(GetQueryString("categoryid"));  //getQueryString()
    getList(categoryId);
})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
