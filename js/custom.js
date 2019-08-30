
/*==================================================================================================================================
custom.js start
==================================================================================================================================*/
var test_sy = function($){
	var common = {
		init:function(){
			common.aside();
			common.groupCate();
			common.sticky();
			common.quantity();
			common.modal();
			common.accordion();
			common.register();
			common.cssAni_1();
			common.fixnav();
			common.slide_option();
		},
		aside : function(){
			var menu = $(".aside a");
			menu.click(function(e){
				e.preventDefault();
				$("#someFrame").attr("src", $(this).attr("href"));
				$(".aside li").removeClass('open');
				$(this).parents().addClass('open');
			});
		},
		groupCate : function(){
			$('.group_cate .list>li>span').on('click',function(){
				$(this).next().toggleClass('on');
			});
		},
		sticky : function(){
			if($('#sticky').length){
				var el = $('#sticky');
				var stickyTop = $('#sticky').offset().top;
				var stickyHeight = $('#sticky').height();

				$(window).scroll(function(){
					var limit = $('.st-bottom').offset().top - stickyHeight - 10;
					var windowTop = $(window).scrollTop();

					if(stickyTop < windowTop){
						el.css({
							position:'fixed',
							top:10
						});
					}else{
						el.css('position','static');
					}

					if(limit < windowTop){
						var diff = limit - windowTop;
						el.css({
							top: diff
						});
					}
				});
			}
		},
		quantity : function (e) {
			$('#decreaseQuantity').click(function(e){
				e.preventDefault();
				var stat = $('#numberUpDown').text();
				var num = parseInt(stat,10);
				num--;
				if(num<=0){
					alert('더이상 줄일수 없습니다.');
					num =1;
				}
				$('#numberUpDown').text(num);
			});
			$('#increaseQuantity').click(function(e){
				e.preventDefault();
				var stat = $('#numberUpDown').text();
				var num = parseInt(stat,10);
				num++;

				if(num>5){
					alert('더이상 늘릴수 없습니다.');
					num=5;
				}
				$('#numberUpDown').text(num);
			});
		},
		modal : function (e) {
			$('.js-modal-open').click(function (e) {
				$($(this).data('target')).addClass('open');
			});
			$('.js-modal-close').click(function (e){
				$($(this).data('target')).removeClass('open');
			});
		},
		accordion: function (e) {
			$('.acc-toggle').click(function(e) {
				e.preventDefault();

				var $this = $(this);

				if ($this.next().hasClass('acc-show')) {
					$this.next().removeClass('acc-show');
					$this.next().slideUp(350);
				} else {
					$this.parent().parent().find('li .inner').removeClass('acc-show');
					$this.parent().parent().find('li .inner').slideUp(350);
					$this.next().toggleClass('acc-show');
					$this.next().slideToggle(350);
				}
			});
		},
		register:function(e){
			var register1 = $('.account-body');
			var register2 = $('.c-btn');

			register2.click(function(e) {
				e.preventDefault();
				var nextID = $(this).attr('data-target');
				var next = $(nextID);
				console.log(next);
				if(!next){
					bg_change(nextID);
					view_change(next);
					return false;
				};

				//$($(this).data('target')).addClass('open');
				function bg_change(next) {
					document.body.className = '';
					document.body.classList.add('is-'+next);
					//addClass('is-'+next);
				};

				function view_change(next) {
					cards.forEach((card) => { card.classList.remove('is-show'); });
					next.classList.add('is-show');
				};

			});
		},
		cssAni_1:function (e) {
			$('.search_wrap .map_result').click(function(e){
				e.preventDefault();
				$(this).parent().addClass('search_toggle');
			});

			$('.search_wrap .route_close').click(function(e){
				e.preventDefault();
				$(this).parents().removeClass('search_toggle mid_toggle');
			});

			$('.search_wrap .route_switch').click(function(e){
				e.preventDefault();
				$('.search_wrap').addClass('mid_toggle');
			});

			$('.search_wrap .route_add').click(function(e){
				e.preventDefault();
				$('.search_wrap').removeClass('mid_toggle');
			});

			function space_tab(e, num){
				var num = num || 0;
				var menu = $(e).children();
				var con = $(e+'_con').children();
				var select = $(menu).eq(num);
				var i = num;

				select.addClass('on');
				con.eq(num).show();

				menu.click(function(){
					if(select!==null){
						select.removeClass("on");
						con.eq(i).hide();
					}
					select = $(this);
					i = $(this).index();

					select.addClass('on');
					con.eq(i).show();
				});
			}
			space_tab('#traffic_tab',0);
		},
		fixnav:function (e) {
			function fix_nav(e, nm) {
				var nm = nm || 0;
				var navbar = $(e).find('.menu-con');
				var con = navbar.children();
				var select = $(navbar).eq(nm);
				var i = nm;

				console.log(select);

				//select.addClass('active');
				//con.eq(nm).show();

				navbar.click(function(){
					if(select!==null){
						select.removeClass("active");
						//con.eq(i).hide();
					}
					select = $(this);
					i = $(this).index();

					select.addClass('active');
					//con.eq(i).show();
				});

			}

			fix_nav('#fix-navbar',0);
		},
		slide_option:function () {
			var swiper = new Swiper('.slide1, .slide2, .slide3, .slide4', {
				slidesPerView: 4,
				spaceBetween: 50,
				centeredSlides: false,
				pagination: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
					el: '.swiper-pagination',
					clickable: true,
				},
			});
		}
	};
	return common;
}(jQuery);

$(function($){
	test_sy.init();
});
/*==================================================================================================================================
custom.js end
==================================================================================================================================*/