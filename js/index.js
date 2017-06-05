window.addEvent(window, 'load', function () {
    //刷新浏览器前先定位回顶部（IE不支持）
    window.addEvent(window, 'unload', unload);
    function unload (e){
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    //设置头部bar的动画
    (function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;

        var $arrow = $('#arrow_bottom');
        aarrowFn = function () {
            $arrow.css('top', window.innerHeight-50);
        };

        if (scrollTop < 880)  {
            aarrowFn();
            console.log('A');
            $arrow.show();
            window.addEvent(window, 'resize', aarrowFn);
        }

        var beforeImg = document.getElementById('head_bar_b_img');
        var afterImg = document.getElementById('head_bar_a_img');
        var mask = document.getElementById('mask');
        var sentence = document.getElementById('sentence');
        var div = beforeImg.parentNode;
        var styleFn = function styleFn (e) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (scrollTop > 10) {
                window.rmEvent(window, 'resize', aarrowFn);
                $arrow.remove();

                window.rmEvent(window, 'scroll', styleFn);

                var heigth = '400px'
                beforeImg.style.opacity = '0';
                afterImg.style.opacity = '1';
                beforeImg.style.height = afterImg.style.height = mask.style.height =
                    div.style.height = heigth;
                sentence.style.top = '125px';
                sentence.style.fontSize = '50px';
                sentence.style.letterSpacing = '5px';

                setTimeout(function () {
                    sentence.style.transition = 'none';
                }, 900);
            }
        };
        window.addEvent(window, 'scroll', styleFn);
    })();


    //设置information的label点击事件
    (function () {
        var label = document.getElementById('label');
        window.addEvent(label, 'click', show);

        var objs = [document.getElementById('civilization'), document.getElementById('team'),
            document.getElementById('recent'), document.getElementById('info')];
        var infos = [document.getElementById('info_civilization'), document.getElementById('info_team'),
            document.getElementById('info_recent')];

        function show(e) {
            var target = e.target || e.srcElement;

            for (var i = 0; i < 3; i++) {
                objs[i].style.backgroundColor = '#626262';
                objs[i].style.borderBottomColor = '#c0c0c0';
                objs[i].style.color = '#FFFFFF';

                infos[i].style.display = 'none';
            }

            target.style.backgroundColor = '#ffffff';
            target.style.borderBottomColor = '#ffffff';
            target.style.color = '#d43b33';

            infos[objs.indexOf(target)].style.display = 'block';
        }
    })();

    setTimeout(function () {
        var prop = {
            width: 310,       //轮播窗体宽体， 默认设置为500px
            height: 150,		//轮播窗体高体， 默认设置为300px
            showNav: false,		//是否开启轮播下部控制条，true开启（默认）， false关闭
            showOpt: true,		//是否开启轮播中部控制块，true开启（默认）， false关闭
            speed: 200,		//图片移动速度，默认100
            duration: 1000,	//图片切换间隔时间，默认2000
            optAutoHide: false,  //默认为TRUE自动隐藏
            navAutoHide: false,  //默认为TRUE自动隐藏
            optCustom: false, //默认为false使用默认样式。请通过CSS用class设置: slider-option slider-option-prev slider-option-next
            navCustom: false,  //默认为false使用默认样。请通过CSS用class设置: slider-nav-ul .current
        };
        $('#photo').LJSlider(prop);
    }, 1);

    //表单
    setTimeout(function() {
        //生成验证码图
        var canvas = document.getElementById("canvas");
        var vdcode = document.getElementById('vdcode');
        var outlineDef = vdcode.style.outline;
        var txtCode = '';
        var isPass = false;
        /**生成一个随机数**/
        function randomNum(min,max){
            return Math.floor( Math.random()*(max-min)+min);
        }
        /**生成一个随机色**/
        function randomColor(min,max){
            var r = randomNum(min,max);
            var g = randomNum(min,max);
            var b = randomNum(min,max);
            return "rgb("+r+","+g+","+b+")";
        }
        drawPic();
        window.addEvent(canvas, 'click', function(e){
            e.preventDefault();
            drawPic();
            vdcode.value = '';
        });
        /**绘制验证码图片**/
        function drawPic(){
            var width=canvas.width;
            var height=canvas.height;
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';

            /**绘制背景色**/
            ctx.fillStyle = 'white'; //颜色若太深可能导致看不清
            ctx.fillRect(0,0,width,height);
            /**绘制文字**/
            var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
            for(var i=0; i<4; i++){
                txt = str[randomNum(0,str.length)];
                txtCode = i == 0 ? '':txtCode;
                txtCode += txt;
                ctx.fillStyle = randomColor(50,160);  //随机生成字体颜色
                ctx.font = randomNum(25,40)+'px SimHei'; //随机生成字体大小
                var x = 10+i*24;
                var y = randomNum(30,40);
                var deg = randomNum(-45, 45);
                //修改坐标原点和旋转角度
                ctx.translate(x,y);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(txt, 0,0);
                //恢复坐标原点和旋转角度
                ctx.rotate(-deg*Math.PI/180);
                ctx.translate(-x,-y);
            }
            /**绘制干扰线**/
            for(var i=0; i<5; i++){
                ctx.strokeStyle = randomColor(40,180);
                ctx.beginPath();
                ctx.moveTo( randomNum(0,width), randomNum(0,height) );
                ctx.lineTo( randomNum(0,width), randomNum(0,height) );
                ctx.stroke();
            }
            /**绘制干扰点**/
            for(var i=0; i<30; i++){
                ctx.fillStyle = randomColor(0,255);
                ctx.beginPath();
                ctx.arc(randomNum(0,width),randomNum(0,height), 1, 0, 2*Math.PI);
                ctx.fill();
            }
        }

    //    输入验证用户输入
        window.addEvent(vdcode, 'keyup', function (e) {
            var val = vdcode.value;
           if(val.toUpperCase() == txtCode) {
                vdcode.style.outline = '2px solid greenyellow';
               isPass = true;
               return;
           } else {
               vdcode.style.outline = '1px solid red';
           }
           isPass = false;
        });

    //    提交验证
        var $submit = $('#msg-submit');
        var form = document.getElementById('form');

        window.addEvent(form, 'submit', function (e) {
            if (!isPass) {
                e.preventDefault();
                vdcode.style.outline = '1px solid red';
                return false;
            }
            reset();
            $submit.css({
                'backgroundColor': 'greenyellow',
                'color': '#745ad8'
            });
            $submit.val('成功送达');
        });
        
        function reset() {
            isPass = false;
            txtCode = '';
            vdcode.value = '';
            vdcode.style.outline = outlineDef;
            drawPic();
        }
    }, 1);
});

