// ==UserScript==
// @name         shadowsocks qrcode for arukas
// @namespace    https://github.com/App1905/qrcode-for-arukas-shadowsocks
// @version      0.1
// @description  generate qrcode for arukas.io shadowsocks
// @author       app1905
// @match        https://app.arukas.io/*
// @grant        none
// @require      https://cdn.bootcss.com/jquery/2.1.4/jquery.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js
// ==/UserScript==

var init = function () {
    console.info('strat job');
    var cmdArray = $('#contents .c-info__data pre').html().split(' ');
    var password = cmdArray[cmdArray.indexOf('-k') + 1];
    var method = cmdArray[cmdArray.indexOf('-m') + 1];
    $('#contents .c-list-compact a').each(function (index, item) {
        var httpUrl = $(item).html();
        var ip = httpUrl.replace(/-/g, '.').split('.').slice(1, 5).join('.');
        var port = httpUrl.split(':')[2];
        var ssstring = method + ':' + password + '@' + ip + ':' + port;
        $(item).attr('title', '点我显示二维码');
        $(item).attr('href', 'javascript:(function(){$("#as_tip").html("二维码[' + (index + 1) + ']");$("#as_qcode").html("");$("#as_qcode").qrcode("ss://' + btoa(ssstring) + '");})();');
    });
    $('#as_tip').html('点击链接显示二维码');
    console.info('done');
};

var t = window.setInterval(function () {
    console.info(document.querySelector("#contents .c-list-compact a"));
    if (document.querySelector("#contents .c-list-compact a") !== null) {
        window.clearInterval(t);
        $('#contents .u-mgb34').append('<div class="c-info__row"><div class="c-info__title" id="as_tip"><a>请等待5秒后再点击链接显示二维码</a></div><div class="c-info__data" id="as_qcode"></div></div>');
        window.setTimeout(init, 5000);
    }
    console.log('waiting');
}, 200);

