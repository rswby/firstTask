$(function() {
    //刷微博图片效果
    if ($('#pic_tan .zx-pic-list').size() > 0) {
        $('#pic_tan .zx-pic-list').zx_pic({});
    }
});
//窗口大小改变时
$(window).resize(function() {
    if ($('.pic-box').size() > 0) {
        var winhei = $(window).height();
        var t = (winhei - 560) / 2;
        if (t < 0) t = 0;
        $('.pic-box .pic-content').css('top', t);
    }
});
//关闭全部弹窗
$(document).on('click', '.zx-box .zx-close,.zx-box .bg', function() {
    $(this).parents('.zx-box').fadeOut();
});
//弹窗图片
;
(function($) {
    var defaults = { classname: "#pic_tan" }
    var html = function(size, winhei) {
        var t = (winhei - 560) / 2;
        if (t < 0) t = 0;
        var str = "";
        str += '<div class="zx-box pic-box">';
        str += '<div class="pic-content" style="top:' + t + 'px">';
        str += '<a href="javascript:;" class="zx-close"></a>';
        str += '<a href="javascript:;" class="zx-left"></a>';
        str += '<a href="javascript:;" class="zx-right"></a>';
        str += '<div class="pic-item">';
        str += '<img src="" />';
        str += '</div>';
        str += '<div class="pic-title clearfix">';
        str += '<div class="title"></div>';
        str += '<div class="xuhao"><span class="now"></span>/<span class="all">' + size + '</span></div>';
        str += '</div></div><div class="bg"></div></div>';
        return str;
    }

    //改变大图
    var change_bigpic = function(div, ind) {
        var bigpicsrc = $(div).attr('data-href');
        var title = $(div).find('img').attr('alt');
        $('.pic-box .pic-content .pic-title .title').html(title);
        var tempind = Number(ind) + 1;
        $('.pic-box .pic-content .pic-title .now').html(tempind);
        $('.pic-box .pic-content .pic-item img').animate({ "-moz-opacity": 0, '-khtml-opacity': 0, '-o-opacity': 0, '-ms-opacity': 0, "opacity": 0 }, function() {
            var he = $(this);
            he.attr('src', "");
            loadImage(bigpicsrc, call, he);
        });
    }

    //加载图片函数
    var loadImage = function(url, callback, im) {
            im.animate({ "-moz-opacity": 1, '-khtml-opacity': 1, "opacity": 1 });
            im.css({ 'height': 198, 'width': 290, 'top': 141, "left": 185 });
            //im.parents('.bigpic').css({ 'height': 198, 'width': 290 });
            var winheight = 480;
            var winwidth = 660;
            var image = new Image();
            image.src = url;
            image.onload = function() {
                imgw = image.width;
                imgh = image.height;
                //console.log(imgw);
                if (imgw > winwidth | imgh > winheight) {
                    if (imgw / imgh > winwidth / winheight) {
                        imgh = imgh * winwidth / imgw;
                        imgw = winwidth;
                    } else {
                        imgw = imgw * winheight / imgh;
                        imgh = winheight;
                    }
                } else {}
                callback(imgh, imgw, image.src, im);
            }
        }
        //加载图片后的回调函数2
    function call(imgh, imgw, url, im) {
        var winheight = 480;
        var winwidth = 660;
        var im = im;
        var temp = "";
        var imgh = imgh;
        var imgw = imgw;
        im.attr('src', url);
        im.css({ 'height': imgh, 'width': imgw, 'top': (winheight - imgh) / 2, "left": (winwidth - imgw) / 2 });
    }

    //改变左右切换按钮状态
    function changeleftright(ind, size) {
        var left = $('.pic-box .pic-content .zx-left');
        var right = $('.pic-box .pic-content .zx-right');
        left.removeClass('no');
        right.removeClass('no');
        if (ind <= 0) {
            left.addClass('no');
        }
        if (ind >= size - 1) {
            right.addClass('no');
        }
    }
    $.fn.zx_pic = function(options) {
        var options = $.extend(defaults, options);
        var here = null;
        return this.each(function() {
            var o = options;
            here = this;
            var bigpicsrc = '';
            var ind = 0;
            var size = 0;
            var title = "";
            var url = "";

            size = $(here).find('li').size();
            //点击小图
            $(here).on('click', 'li a', function() {
                ind = $(this).parent().parent().index();
                var winhei = $(window).height();
                if ($('.pic-box').size() > 0) {
                    $('.pic-box').fadeIn();
                } else {
                    var temp = html(size, winhei);
                    $('body').append(temp);
                }
                url = $(this).attr('data-href');
                change_bigpic($(this), ind);
                changeleftright(ind, size);
            });
            //点击left
            $(document).on('click', '.pic-box .pic-content .zx-left', function() {
                if (ind <= 0) {} else {
                    ind--;
                    change_bigpic($(here).parents(o.classname).find('li').eq(ind).find('a'), ind);
                    changeleftright(ind, size);
                }
            });
            //点击right
            $(document).on('click', '.pic-box .pic-content .zx-right', function() {
                if (ind >= size - 1) {} else {
                    ind++;
                    change_bigpic($(here).parents(o.classname).find('li').eq(ind).find('a'), ind);
                    changeleftright(ind, size);
                }
            });
        });
    }
})(jQuery);
