/**
 * Created by Jerry on 2017/5/23.
 */
$(function () {
    var $nav = $('.wrapper nav li');
    var $content = $('#content ul');
    $nav.on('click', function (e) {
        $nav.removeClass('current-position-nav');
        $(this).addClass('current-position-nav');
        $content.removeClass('content-now').eq($(this).index()).addClass('content-now');
    });
});