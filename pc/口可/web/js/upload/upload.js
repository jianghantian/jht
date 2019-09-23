//扩展$.extend
(function ($) {
    $.fn.extend({

        //图片上传
        upload: function (opt) {
            var def = {
                fileName: '', //图片上传成功后页面会创建一个隐藏文本域对象用来存储路径
                swf: '', //用于兼容IE本地文件
                server: '', //储存图片上传的空间
                successFn: '' //上传成功后的回调函数
            };

            var set = $.extend({}, def, opt);

            var that = this;

            //优化retina, 在retina下这个值是2
            var ratio = window.devicePixelRatio || 1;

            //缩略图大小
            var thumbnailWidth = 260 * ratio;
            var thumbnailHeight = 200 * ratio;

            //初始化Web Uploader
            var uploader = WebUploader.create({

                //自动上传。
                auto: true,

                //swf文件路径
                swf: set.swf,

                //文件接收服务端。
                server: set.server,

                //选择文件的按钮。可选。
                //内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: that,

                //只允许选择文件，可选。
                accept: {
                    title: '只能选择图片文件',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },

                disableGlobalDnd: true,
                chunked: false,
                compress: false,
                thumb: {

                    //图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 100,

                    //是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: false,

                    //是否允许裁剪。
                    crop: false,

                    //是否保留头部meta信息。
                    preserveHeaders: true,

                    //如果发现压缩后文件大小比原来还大，则使用原来图片
                    //此属性可能会影响图片自动纠正功能
                    noCompressIfLarger: false,

                    //单位字节，如果图片大小小于此值，不会采用压缩。
                    compressSize: 200
                },

                //fileNumLimit: 10, //最大上传图片个数

                //fileSizeLimit: 20 * 1024 * 1024,  //20 M

                fileSingleSizeLimit: 10 * 1024 * 1024 //10 M
            });

            //当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
				
                // 先隐藏提示尺寸
                that.find('.tip').hide(); 

                var $img = that.find('.creatde-img');

                // 创建img
                if(!$img.length){
                    var $img = $('<img class="creatde-img">');
                    that.find('.webuploader-pick').append($img);
                }
                
                uploader.makeThumb(file, function (error, src) {
                    if (error) {
                        $img.replaceWith('<span>不能预览</span>');
                        return;
                    }
                    $img.attr('src', src);
                }, thumbnailWidth, thumbnailHeight);
            });

            //文件上传过程中创建进度条实时显示。
            uploader.on('uploadProgress', function (file, percentage) {
                var $li = $('#' + file.id);
                var $percent = $li.find('.progress span');

                //避免重复创建
                if (!$percent.length) {
                    $percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span');
                }

                $percent.css('width', percentage * 100 + '%');
            });

            //文件上传成功，给item添加成功class, 用样式标记上传成功。
            uploader.on('uploadSuccess', function (file, response) {
                var $li = $('#' + file.id);
                $li.addClass('upload-state-done');

                // result这里是后台返回过来的参数，到时候设置对应的参数
                var result = eval('(' + response._raw + ')');

                // 图片上传成功后页面会创建一个隐藏文本域对象用来存储路径
                $li.append('<input type="hidden" id="' + set.fileName + '" name="' + set.fileName + '" value="' + result.imgUrl + '" />');

                //上传成功后的回调函数
                if (set.successFn) set.successFn();
            });

            //文件上传失败，现实上传出错。
            uploader.on('uploadError', function (file) {
                var $li = $('#' + file.id);
                var $error = $li.find('div.error');

                //避免重复创建
                if (!$error.length) {
                    $error = $('<div class="error"></div>').appendTo($li);
                }

                $error.text('上传失败');
            });

            //完成上传完了，成功或者失败，先删除进度条。
            uploader.on('uploadComplete', function (file) {
                $('#' + file.id).find('.progress').remove();
            });

            //上传错误时触发
            uploader.on('error', function (type) {
                if (type == 'Q_EXCEED_NUM_LIMIT') {
                    alert('图片上传个数超出限制！');
                } else if (type == 'Q_TYPE_DENIED') {
                    alert('图片格式不正确！');
                } else if (type == 'F_DUPLICATE') {
                    alert('该图片已经上传！');
                } else if (type == 'Q_EXCEED_SIZE_LIMIT') {
                    alert('图片文件大小超出限制！');
                } else {
                    alert(type);
                }
            });
        }

    });
})(jQuery);