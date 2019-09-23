// 模拟通用html，后台开发时直接删除include.js

// 模拟头部 
function includeHeader() { 
    document.write('<div class="kk-header"> <div class="layout clearfix"> <div class="logo fl"><img src="images/icons/logo.png"></div> <div class="nav fl"> <a href="#" class="cur">全部课程</a> <a href="#">软件入门</a> <a href="#">VIP课程</a> <a href="#">大师课</a> <a href="#">图文课程</a> <a href="#">资源下载</a> <a href="#">直播课</a> <a href="#">专题学习</a> </div> <div class="search fl"> <input type="text" class="ipt" placeholder="搜索课程"> <i class="icon"></i> </div> <ul class="link fr"> <li><i class="icon1"></i><a href="#">招聘</a>/<a href="#">任务</a></li> <li><i class="icon2"></i><a href="#">登录</a>/<a href="#">注册</a></li> <li><i class="icon3"></i><a href="#">入驻合作</a></li> </ul> </div> </div>') 
} 

// 模拟尾部 
function includeFooter() {
    document.write('<div class="kk-footer"> <div class="layout clearfix"> <div class="link fl"> <dl class="fl w70"> <dt>关于我们</dt> <dd> <a href="#">资讯频道</a> <a href="#">网站地图</a> </dd> </dl> <dl class="fl w320"> <dt>友情链接</dt> <dd> <a href="#">中国设计网</a> <a href="#">图片素材网</a> <a href="#">设计帝国</a> <a href="#">素材中国</a> <a href="#">直线网</a> <a href="#">创意设计</a> <a href="#">培训网红动中国设计网</a> <a href="#">PS家园</a> </dd> </dl> <dl class="fl w120"> <dt></dt> <dd> <a href="#">经营性网站备案信息</a> <a href="#">中国互联网举报中心</a> <a href="#">网络110报警服务</a> </dd> </dl> </div> <div class="qrcode fr tc"> <img src="images/local/qrcode.jpg"> <p class="fs12 col-666">微信公众号</p> </div> </div> <div class="copy-right tc">Copyright © 2011-2019 广州＊＊＊＊＊版权所有粤ICP备＊＊＊号 粤＊＊＊号粤公网安备＊＊＊号</div> </div>')
}

// 模拟客服和置顶
function includeTopback() {
    document.write('<div class="service-topback"> <div class="wrap"> <a class="item wx" href="javascript:;"> <i></i> <p>公众号</p> </a> <span class="line"></span> <a class="item qq" href="http://wpa.qq.com/msgrd?v=3&uin=29547157&site=qq&menu=yes"> <i></i> <p>在线联系</p> </a> </div> <div class="wrap mt10"> <a class="item top" href="javascript:;" id="top-back"> <i></i> <p>回到顶部</p> </a> </div> </div>')
}