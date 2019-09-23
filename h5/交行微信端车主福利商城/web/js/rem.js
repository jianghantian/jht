// 计算rem
(function (doc) {
    var obj = {};
    obj.size = 750;
    obj.ratio = (320 / obj.size).toFixed(2);
    obj.resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    obj.html = doc.getElementsByTagName("html")[0];
    obj.widthProportion = function () {
        var p = Number((doc.body && doc.body.clientWidth || obj.html.offsetWidth) / obj.size);
        return p > 1 ? 1 : p < obj.ratio ? obj.ratio : p;
    };
    obj.changePage = function () {
        obj.html.setAttribute('style', 'font-size:' + (obj.widthProportion() * 100).toFixed(2) + 'px;max-width:' + obj.size + 'px');
    };
    obj.changePage();
    if (!doc.addEventListener) return;
    window.addEventListener(obj.resizeEvt, obj.changePage, false);
    doc.addEventListener('DOMContentLoaded', obj.changePage, false);
})(document);