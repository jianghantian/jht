// 全局调用
$(function () {
	$.topback();
});

// 扩展$.extend
(function ($) {
	$.extend({

		// 置顶
		topback : function(){
			$('#top-back').click(function(e){
				e.preventDefault();
			$('html,body').animate({
					scrollTop : 0  
			},500) 
			return false;
			})
		},

		// loading
		loading: function () {
			var $target = $('.loading-box');
			if (!$target.length) {
				$target = $('<div class="loading-box"><i></i></div>').appendTo(document.body);
			}
		},

		// 关闭loading
		unloading: function () {
			$('.loading-box').remove();
		},

		// 遮罩层
		mask: function (opt) {
			var def = {
				top: 0,
				left: 0,
				background: "#000",
				opacity: .5,
				zIndex: 999
			};
			var set = $.extend({}, def, opt);

			if (!$.maskDiv) {
				$.maskDiv = $('<div id="jq-mask"></div>').appendTo(document.body);
			}

			$(window).bind("scroll resize",
				function () {
					$.maskDiv.css({
						width: $(window).width(),
						height: $(document).height()
					})
				}
			);
			$("#jq-mask").show();
			$.maskDiv.css({
				position: "absolute",
				top: set.top,
				left: set.left,
				backgroundColor: set.background,
				width: $(window).width(),
				height: $(document).height(),
				opacity: set.opacity,
				zIndex: set.zIndex
			});
			return $.maskDiv;
		},

		// 关闭遮罩层
		unmask: function () {
			$("#jq-mask").hide();
			$(window).unbind("scroll resize");
		}

	});
})(jQuery);

// 扩展$.fn.extend
(function ($) {
	$.fn.extend({

		// 选项卡
		tab: function (opt) {
			var def = {
				tabBd: ".tab-list",
				cls: "cur"
			};
			var set = $.extend({}, def, opt);
			$(this).bind("click", fn).eq(0).trigger("click");

			function fn() {
				var index = $(this).index();
				$(this).addClass(set.cls).siblings().removeClass(set.cls);
				$(set.tabBd).eq(index).show().siblings().hide();
			};
		},

		// 切换
		tabCur: function (opt) {
			var def = {
				tabBd: "",
				cls: "cur"
			};
			var set = $.extend({}, def, opt);
			$(this).bind("click", fn).eq(0).trigger("click");

			function fn() {
				$(this).addClass(set.cls).siblings().removeClass(set.cls);
			};
		},

		// 焦点图
		slideFocus: function () {
			var that = $(this);
			var aSlideCon = that.find('.slide-con li');
			var aSlidePage = that.find('.slide-nav a');
			var btnPrev = that.find('.prev');
			var btnNext = that.find('.next');
			var iSize = aSlideCon.size();
			var iNow = 0;
			var timer = null;
			aSlideCon.eq(0).addClass('cur');
			aSlidePage.each(function (index) {
				$(this).eq(index).addClass('cur');
				$(this).mouseover(function () {
					iNow = index;
					slideRun();
				});
			});

			autoRun();

			function slideRun() {
				aSlidePage.removeClass('cur');
				aSlidePage.eq(iNow).addClass('cur');
				aSlideCon.stop();
				aSlideCon.eq(iNow).siblings().css('z-index', '0').animate({
					opacity: 0
				}, 600);
				aSlideCon.eq(iNow).css('z-index', '10').animate({
					opacity: 1
				}, 600);
			}

			function autoRun() {
				clearInterval(timer);
				timer = setInterval(function () {
					iNow++;
					if (iNow > iSize - 1) iNow = 0;
					slideRun();
				}, 4000);
			}

			btnNext.click(function () {
				iNow++;
				if (iNow == iSize) {
					iNow = 0
				}
				slideRun();
			});

			btnPrev.click(function () {
				iNow--;
				if (iNow == -1) {
					iNow = iSize - 1
				}
				slideRun();
			});

			that.hover(function () {
				clearInterval(timer);
			}, function () {
				autoRun();
			});
		},

		// 轮播图
		play: function (opt) {
			var that = $(this);
			var def = {
				movePx: 1380,
				picList: ".pic-list",
				navList: ".nav-list",
				pre: ".prev",
				next: ".next",
				cur: "cur",
				times: 4000
			};
			var set = $.extend({}, def, opt);
			var index = 0,
				timer,
				liArrLen = that.find(set.picList).children().length;
			that.find(set.picList).css({
				"position": "absolute",
				"width": 99999
			});
			var navList = function () {
				var b = "<div class='nav-list'>";
				for (var i = 1; i <= liArrLen; i++) {
					b += "<a href='javascript:;'></a>";
				};
				b += "</div>";
				that.append(b);
			}();

			that.find(set.navList).children().mouseenter(function () {
				index = that.find(set.navList).children().index(this);
				showPics(index);
			}).eq(0).trigger("mouseenter");
			that.hover(clearTime, Time).trigger("mouseleave");

			that.find(set.next).click(function () {
				index += 1;
				if (index == liArrLen) {
					index = 0
				}
				showPics(index);
			});

			that.find(set.pre).click(function () {
				index -= 1;
				if (index == -1) {
					index = liArrLen - 1
				}
				showPics(index);
			});

			function showPics(index) {
				var leftPx = set.movePx * -index;
				that.find(set.picList).stop(true, false).animate({
					left: leftPx
				}, 500);
				that.find(set.navList).children().eq(index).addClass(set.cur).siblings().removeClass(set.cur);
			};

			function Time() {
				clearInterval(timer);
				timer = setInterval(function () {
					index++;
					if (index > liArrLen - 1) {
						showPics(index);
						index = 0;
					}
					showPics(index);
				}, set.times)
			};

			function clearTime() {
				clearInterval(timer);
			};
		},

		//弹窗局中
		center: function () {
			var that = $(this);
			var oWidth = that.width() / 2;
			var oHeight = that.height() / 2;
			var winh = $(window).height() / 2;
			var css = {
				position: "fixed",
				left: "50%",
				top: "50%",
				marginLeft: -oWidth,
				marginTop: -oHeight,
				zIndex: 1000
			};
			
			if (!window.XMLHttpRequest) {
				css.position = "absolute";  
				var scolIE6Fun = function(){
					var st = $(document).scrollTop(); 				
					that.css({
						top : $(window).height()/2 + st
					})								
				};
				$(window).bind("scroll resize", scolIE6Fun);
			}
			
			that.css(css);
			that.show();
			return that;
		},

		//弹窗alert
		winOpen: function (callback) {
			var that = this;
			that.center();
			$.mask();
			var closeEvent = function () {
				that.hide();
				if (!$(".glo-win-wips").is(":visible")) {
					$.unmask()
				};

				callback && callback();
			};
			$(that).find(".close, .btn").unbind("click").click(function () {
				closeEvent();
			});
			$("body").unbind("keydown").bind("keydown", function (e) {
				if (e.keyCode == 27) {
					closeEvent();
				}
			});
		}

	});
})(jQuery);