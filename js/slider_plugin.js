/*
 * version 1.6
 * copyright 2016 liaojiao
 * update 10 21 2016, 可以对同一对象多次注册slider。
 * 功能：调用jQuery对象LJSlider方法创建一个或多个slider。
 * 使用说明：
 * 		1. 导入slider.css文件
 * 		2. 导入slider_plugin.js文件
 * 		3. 在需要轮播的地方插入模版：
			<div class="" id="">
				<ul class="slider-main float-fix">
					<li><a href="" title=""><img src="" alt=""/></a></li>
									.
									.
									.
					<li><a href="" title=""><img src="" alt=""/></a></li>
				</ul>
			</div>
 * 		4. 在js里写入参数设置对象： 例如(没写的参数会取默认值)
			 prop = {
				width: 300,       //轮播窗体宽体， 默认设置为500px
				height: 200,		//轮播窗体高体， 默认设置为300px
				showNav: true,		//是否开启轮播下部控制条，true开启（默认）， false关闭
				showOpt: true,		//是否开启轮播中部控制块，true开启（默认）， false关闭
				speed: 200,		//图片移动速度，默认100
				duration: 2000,	//图片切换间隔时间，默认2000
				optAutoHide: true,  //默认为TRUE自动隐藏
				navAutoHide: true,  //默认为TRUE自动隐藏
				optCustom: false, //默认为false使用默认样式。请通过CSS用class设置: slider-option slider-option-prev slider-option-next
				navCustom: false,  //默认为false使用默认样。请通过CSS用class设置: slider-nav-ul .current
				isOver: true	//nav栏是否是移动上去触发事件（默认），否则点击。
			};
 * 		5. 调用函数 $obj.LJSlider(prop)。
 * 		注： 可以开启多个轮播块，只需重复步骤3，步骤4，步骤5.
 * */
;(function ($) {
	$.fn.extend({
		LJSlider: function (confs) {
//					var defaults = {
//						width: 500,
//						height: 300,
//						showNav: true,
//						showOpt: true,
//						speed: 100,
//						duration: 2000
//					};
//					confs = $.extend({}, defaults, confs);
//					console.log(confs);

					var width = confs.width || 500;
					var height =  confs.height || 300;
					var showNav = (confs.showNav == undefined)?true:confs.showNav;
					var showOpt = (confs.showOpt == undefined)?true:confs.showOpt;
					var speed = confs.speed || 100;
					var duration = confs.duration || 2000;
					var optAutoHide = (confs.optAutoHide == undefined)?true:confs.optAutoHide;
					var navAutoHide = (confs.navAutoHide == undefined)?true:confs.navAutoHide;
					var optCustom = confs.optCustom;
					var navCustom = confs.navCustom;
					var isOver = (confs.isOver == undefined)?true:confs.isOver;

					this.each(function (index, item) {
						var currentIndex = 1;
						var startSlider;
						var timeId;
						var go;
						var direction;
						var sdirection = true;

						slider();

						function slider () {
							if ($(item).data('goId')) {
								clearInterval($(item).data('goId'));
								$('.slider-nav, .slider-option, .slider-main .li-temp').remove();
								$(item).off('mouseenter').off('mouseleave');
							}
							var opt = setOpt();
							if (!showOpt) {
								opt.hide();
							}
							var nav = setNav();
							if (!showNav) {
								nav.hide();
							}
							setCss(width, height);
							setEvents();
							startSlider = function () {
								var id = setInterval(function () {
                                    direction = true;
									go(++currentIndex);
								}, duration);
								$(item).data('goId', id);
								return id;
							};
                            var howMuch = $(item).find('.slider-main li:not(li-temp)').length;
							go = function (index) {
                                var distance;
                                if (index == -1) {
                                    index = howMuch - 1;
                                    $(item).find('.slider-main').css('left', -(width + 2) * (howMuch + 1));
                                    distance = -(width+2)*(index+1);
                                } else if (index == howMuch + 2) {
                                    index = 2;
                                    $(item).find('.slider-main').css('left', -(width + 2) * 2);
                                } else if (direction && index == howMuch) {
                                    distance = -(width + 2) * (index + 1);
                                    index = 0;
                                } else if (!sdirection && direction && index == howMuch+1){
                                    $(item).find('.slider-main').css('left', -(width + 2));
                                    index = 1;
                                    distance = -(width + 2) * (index + 1);
                            	} else if(!direction && index == 0) {
                                    distance = -(width+2);
                                    index = howMuch;
                                } else {
                                    distance = -(width+2)*(index+1);
								}
								currentIndex = index;
								$(item).find('.slider-main').animate({'left' : distance}, speed, function () {
									if (direction && distance == -(width+2)*(howMuch+1)) {
                                        $(item).find('.slider-main').css('left', -(width+2));
									} else if (!direction && distance == -(width+2)) {
                                        $(item).find('.slider-main').css('left', -(width+2)*(howMuch+1));
                                    }
									$(item).find('.slider-nav li').removeClass('current').eq(index-1).addClass('current');
									sdirection = direction;
								});
                            };

							var theLast = $(item).find('.slider-main li:last-child').clone();
							var theFirst = $(item).find('.slider-main li:first-child').clone();
                            var the2th = $(item).find('.slider-main li:nth-child(2)').clone();
                            var theLast2th = $(item).find('.slider-main li:nth-last-child(2)').clone();

                            theLast.addClass('li-temp');
							theFirst.addClass('li-temp');
                            the2th.addClass('li-temp');
                            theLast2th.addClass('li-temp');
							$(item).find('.slider-main').append(theFirst).prepend(theLast);
                            the2th.insertAfter(theFirst)
                            theLast2th.insertBefore(theLast);


							timeId = startSlider();
						}

						function setEvents () {
							$(item).find('.slider-option-next').on('click', function (e) {
								if (!$(item).find('.slider-main').is(':animated')) {
									direction = true;
									go(++currentIndex);
								}
							});
							$(item).find('.slider-option-prev').on('click', function () {
								if (!$(item).find('.slider-main').is(':animated')) {
                                    direction = false;
									go(--currentIndex);
								}
							});

							$(item).hover(function () {
								clearInterval(timeId);
								if(showOpt && optAutoHide) {
									$(item).find('.slider-option').show();
								}
								if(showNav && navAutoHide) {
									$(item).find('.slider-nav').show();
								}
							}, function () {
								timeId = startSlider();
								if(showOpt && optAutoHide) {
									$(item).find('.slider-option').hide();
								}
								if(showNav && navAutoHide) {
									$(item).find('.slider-nav').hide();
								}
							});

							// function navEvent() {
							// 	var p = $(item).find('.slider-nav li').index(this)+1;
							// 	if (index == currentIndex == p) return;
							// 	console.log(index, currentIndex, p);
							// 	$(item).find('.slider-main').stop(true, false);
							// 	go(p);
							// }
                            //
							// if (isOver) {
							// 	$(item).find('.slider-nav li').on('mouseover', navEvent);
							// } else {
							// 	$(item).find('.slider-nav li').on('click', navEvent);
							// }
							//防止选中内容
							$(item).find('.slider-nav li').on('mousedown', function (e) {
								e.preventDefault();
							});
						}

						function setCss (width, height) {
							if(!$(item).hasClass('slider')){$(item).addClass('slider');}
							$(item).css({'width': (width+2)*3, 'height': height});
							$(item).find('.slider-main').css({'height': height});
							var howMuch = $(item).find('.slider-main li').length;
							$(item).find('.slider-main').css({'width': (width+2)*(howMuch+4), 'left': -(width+2)*2});
							$(item).find('.slider-main li').css({'width': width, 'height': height});
							$(item).find('.slider-main li a img').css({'width': width, 'height': height});
							if (!optCustom) {
								$(item).find('.slider-option-next, .slider-option-prev').css({'top': (height-36)/2})
							} else {
								$(item).find('.slider-option-next, .slider-option-prev').addClass('cover-content');
							}
							if (!navCustom) {
								$(item).find('.slider-nav').css({'width': 13*howMuch, 'left': (width-13*howMuch)/2});
							}
							if(optAutoHide) {
								$(item).find('.slider-option').hide();
							}
							if (navAutoHide) {
								$(item).find('.slider-nav').hide();
							}
						}

						function setOpt () {
							var $ul = $('<ul class="slider-option">' +
											'<li class="slider-option-prev"><a href="javascript:;">prev</a></li>' +
											'<li class="slider-option-next"><a href="javascript:;">next</a></li>' +
										'</ul>');
							$(item).append($ul);
							return $ul;
						}

						function setNav () {
							var howMuch = $(item).find('.slider-main li').length;
							var $ul = $('<ul class="slider-nav slider-nav-ul"></ul>');
							for (var i = 1; i <= howMuch; i++) {
								$ul.append('<li>' + i + '</li>');
							}
							$ul.children().first().addClass('current');
							$(item).append($ul);
							return $ul;
						}
					});
				}
	});
})(jQuery);
