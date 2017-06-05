/**
 * Created by Jerry on 2017/5/23.
 */
$(function () {
    var $lists = $('.wrapper .content .list');
    $('.wrapper nav li').on('click', function (e) {
        $('.wrapper nav li').removeClass('current-position-nav');
        $(this).addClass('current-position-nav');
        $lists.removeClass('content-now').eq($(this).index()).addClass('content-now');
    });
});