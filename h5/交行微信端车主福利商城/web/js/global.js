// 扩展$.extend
(function ($) {
    $.extend({

        // 弹框验证
        showTip: function (opt) {
            var def = {
                time: 800,
                content: '',
                callback: null
            };
            var set = $.extend({}, def, opt);
            var $target = $('.show-tip');

            if (!$target.length) {
                $target = $('<section class="show-tip flex flex-jc-c flex-ai-fe"><div class="text"></div></section>').appendTo(document.body);
            }

            $target.find('.text').text(set.content);

            $target.fadeIn(function () {
                setTimeout(function () {
                    $target.hide();
                    set.callback && set.callback();
                }, set.time);
            });

            $target.css({
                'position': 'fixed',
                'left': 0,
                'top': 0,
                'z-index': 100,
                'width': '100%',
                'height': '100%'
            });

            $target.find('.text').css({
                'max-width': '80%',
                'background': 'rgba(0, 0, 0, 0.7)',
                'margin-bottom': '2rem',
                'padding': '.1rem .2rem',
                'color': '#fff',
                'font-size': '.28rem',
                'text-align': 'center',
                'border-radius': '.1rem'
            });

        },

         // loading
         loading: function () {
            var $target = $('.loading-box');
            if (!$target.length) {
                $target = $('<section class="loading-box"><div class="load-center flex flex-jc-c flex-ai-c"><div class="spinner"><div class="spinner-list container1"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div><div class="circle circle4"></div></div><div class="spinner-list container2"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div><div class="circle circle4"></div></div><div class="spinner-list container3"><div class="circle circle1"></div><div class="circle circle2"></div><div class="circle circle3"></div><div class="circle circle4"></div></div></div></div></section>').appendTo(document.body);
            }
        },

        // 关闭loading
        unloading: function () {
            $('.loading-box').remove();
        },

    });
})(jQuery);

// 扩展$.fn.extend
(function ($) {
    $.fn.extend({

        // 数量+-
        totalNumber: function (opt) {
            var def = {
                addCls: '.add',
                subCls: '.sub',
                numCls: '.num',
                min: 1, // 最小值
                max: 99, // 最大值
                callback: null // 回调函数
            };
            var that = $(this);
            var set = $.extend({}, def, opt);
            var $ipt = that.find(set.numCls);

            $ipt.val(set.min);

            that.find(set.addCls).on('click', fnAdd);
            that.find(set.subCls).on('click', fnSub);
            that.find(set.numCls).on('input', fnInput);
            that.find(set.numCls).on('blur', fnBlur);

            // +函数
            function fnAdd() {
                var val = $ipt.val();
                $ipt.val(parseInt(val) + 1);
                fnMax();
                set.callback && set.callback();
            }

            // -函数
            function fnSub() {
                var val = $ipt.val();
                val > set.min ? $ipt.val(parseInt(val) - 1) : $ipt.val(set.min);
                if (val == set.min) {
                    $.showTip({
                        content: '亲，不能再减少了哦~'
                    });
                    return;
                }
                set.callback && set.callback();                
            }

            // input事件限制只能输入数字
            function fnInput() {
                var val = $ipt.val();
                $(this).val(val.replace(/^0|[^\d]/, ''));
                fnMax();
            }

            // blur事件为空时设置为最小值
            function fnBlur() {
                var val = $ipt.val();
                if (val == '' || val < set.min) {
                    $ipt.val(set.min);
                }
                set.callback && set.callback();                
            }

            // 最大值限制
            function fnMax() {
                var val = $ipt.val();
                if (val > set.max) {
                    $ipt.val(set.max);
                    $.showTip({
                        content: '亲，不能再增加了哦~'
                    });
                    return;
                }
            }
        }

    });
})(jQuery);
