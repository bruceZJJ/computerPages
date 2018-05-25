(function ($) {
    $.linkageMenu = function (options) {
        //默认参数
        var settings = $.extend({
            'selectOneId': 'selectOne',//一级菜单Id
            'selectTwoId': 'selectTwo',//二级菜单Id
            'selectOneVal': '',//一级菜单option值
            'selectTwoVal': '{"key1":"value2","key2":"value2"}',//预留字段，供插件以后扩展
            'paramName' : 'selectOneValue',//请求url的参数key
            'getSelectTwoValUrl': ''//得到二级菜单的value的url
        }, options);
        var $s1 = $("#" + settings.selectOneId);
        var $s2 = $("#" + settings.selectTwoId);
        var selectOneValJSON = $.parseJSON(settings.selectOneVal);
        //alert(selectOneValJSON.key1);
        //JSON.parse(options.selectOneVal); //由JSON字符串转换为JSON对象
        //一级菜单初始化
        $.each(selectOneValJSON, function (key, val) {
            appendOptionTo($s1, key, val);
        });
        //一级菜单改变的时候，二级菜单的变化
        $s1.change(function () {
            $s2.html("");
            var s1SelectedVal = $s1.val();
            //ajax异步获取二级菜单数据
            $.ajax({
                type: "GET",
                url: settings.getSelectTwoValUrl,
                data: settings.paramName + "=" + s1SelectedVal,
                success: function (select2Val) {
                    var selectTwoValJSON = $.parseJSON(select2Val);
                    $.each(selectTwoValJSON, function (key, val) {
                        appendOptionTo($s2, key, val);
                    });
                }
            });
        });
    }
})(jQuery);
/**
 * Tools Methods : appendOptionTo
 * @param $obj : The selected object jquery，一般为需要添加option的select对象
 * @param key : option的key，一般为设置的Id
 * @param val ; option的val，同时一般也作为显示的值，在这里我们默认为显示的value和option的value是同一个值
 * @param defaultSelectVal ; 设置默认选中的值，一般为初始化的情况下，默认选中的value
 */
function appendOptionTo($obj, key, val, defaultSelectVal) {
    var $opt = $("<option>").text(key).val(val);
    if (val == defaultSelectVal) {
        $opt.attr("selected", "selected");
    }
    $opt.appendTo($obj);
}