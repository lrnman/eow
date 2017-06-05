;(function(){
    window.addEvent = function (el, type, cb) {
        if (document.addEventListener){
            el.addEventListener(type, cb, false);
            window.rmEvent =  function(){
                return arguments[0].removeEventListener(arguments[1], arguments[2]);
            };
        } else {
            el.attachEvent("on" + type, cb);
            window.rmEvent =  function(){
                return arguments[0].detachEvent('on'+arguments[1], arguments[2]);
            };
        }
    };

	window.addEvent(window, 'load', function() {
        var $sidebar = $('#sidebar');
        var scrlFn = function() {
            var howLang = document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (howLang >= 300) {
                $sidebar.stop(true);
                $sidebar.fadeIn();
            } else {
                $sidebar.stop(true);
                $sidebar.fadeOut();
            }
        };
        scrlFn();
        window.addEvent(window, 'scroll', scrlFn);

        (function () {
            var go = document.getElementById('to-top');
            if(!go) return;
            go.onclick = function() {
                var howLang = document.documentElement.scrollTop || document.body.scrollTop || 0;
                var durative = 200;
                howLang = Math.floor(howLang/durative)*durative;
                var speed = (howLang / durative) * 40;
                var timerId = setInterval(function() {
                    howLang -= speed;
                    document.documentElement.scrollTop = document.body.scrollTop = howLang;
                    if (howLang <= 0) {
                        clearInterval(timerId);
                    }
                }, 10);
            };
        })();

        var $sentence = $('#sentence');
        var $mask = $('#mask');
        var halfWidth = window.innerWidth/2;
        var xRatio = 0.03;
        var yRatio = 0.06;

        $('.header .bar').mousemove(function (e) {
            var halfHigh = $mask.outerHeight();
            if ($sentence.is(':animated')) {
                $sentence.stop(true);
            }
            $sentence.animate({'margin-left': (halfWidth - e.pageX)*xRatio, 'margin-top': (200 - e.offsetY)*yRatio}, 100, 'linear');
            // $sentence.css({'margin-left': (halfWidth - e.pageX)*xRatio, 'margin-top': (200 - e.offsetY)*yRatio});

        });
        $('.header .bar').mouseleave(function (e) {
            $sentence.animate({'margin-left': 0, 'margin-top': 0}, 100, 'linear');
        });
    });


})();
