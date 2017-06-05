/**
 * Created by Jerry on 2017/5/22.
 */
;window.addEvent(window, 'load', function () {
    var $img = $('#right img');
    var imgCb = function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollTop > 200) {
            window.rmEvent(window, 'scroll', imgCb);
            $img.css({'left': '0px'});
        }
    };
    imgCb();
    window.addEvent(window, 'scroll', imgCb);
});