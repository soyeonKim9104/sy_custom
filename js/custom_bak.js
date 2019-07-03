
/*==================================================================================================================================
custom.js start
==================================================================================================================================*/
var test_sy = function($){
	var common = {
		init:function(){
			common.aside();
			common.sticky();
			common.modal;
			common.quantity();
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
		modal : function () {
			$.fn.mbModal = function(options) {
				var defaults = {
					animation: 'none', // slide, slideFade
					animationspeed: 300,
					overlayClose: true,
					escClose: true,
					closeModalClass: 'close-modal'
				};

				var options = $.extend({}, defaults, options);

				return this.each(function() {
					var modal = $(this),
						topMeasure = parseInt(modal.css('top')),
						topOffset = modal.height() + topMeasure,
						locked = false,
						modalBG = $('.modal-overlay'),
						marginLeft = Math.round(modal.outerWidth() / -2);

					if (modalBG.length == 0) {
						modalBG = $('<div class="mb-modal-overlay" />').insertAfter(modal);
					}

					modal.bind('mbModal:open', function() {
						modalBG.unbind('click.modalEvent');
						$('.' + options.closeModalClass).unbind('click.modalEvent');
						console.log('dd');
						if (!locked) {
							lockModal();
							if (options.animation == "slideFade") {
								modal.css({
									'top': $(document).scrollTop() - topOffset,
									'opacity': 0,
									'display': 'block',
									'margin-left': marginLeft
								});
								modalBG.fadeIn(options.animationspeed / 2);
								modal.delay(options.animationspeed / 2).animate({
									"top": $(document).scrollTop() + topMeasure + 'px',
									"opacity": 1
								}, options.animationspeed, unlockModal());
							}
							if (options.animation == "fade") {
								modal.css({
									'opacity': 0,
									'display': 'block',
									'top': $(document).scrollTop() + topMeasure,
									'margin-left': marginLeft
								});
								modalBG.fadeIn(options.animationspeed / 2);
								modal.delay(options.animationspeed / 2).animate({
									"opacity": 1
								}, options.animationspeed, unlockModal());
							}
							if (options.animation == "none") {
								modal.css({
									'display': 'block',
									'top': $(document).scrollTop() + topMeasure,
									'margin-left': marginLeft
								});
								modalBG.css({
									"display": "block"
								});
								unlockModal()
							}
						}
						modal.unbind('mbModal:open');
					});

					modal.bind('mbModal:close', function() {
						if (!locked) {
							lockModal();
							if (options.animation == "slideFade") {
								modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
								modal.animate({
									"top": $(document).scrollTop() - topOffset + 'px',
									"opacity": 0
								}, options.animationspeed / 2, function() {
									modal.css({
										'top': topMeasure,
										'opacity': 1,
										'display': 'none'
									});
									unlockModal();
								});
							}
							if (options.animation == "fade") {
								modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
								modal.animate({
									"opacity": 0
								}, options.animationspeed, function() {
									modal.css({
										'opacity': 1,
										'display': 'none',
										'top': topMeasure
									});
									unlockModal();
								});
							}
							if (options.animation == "none") {
								modal.css({
									'display': 'none',
									'top': topMeasure
								});
								modalBG.css({
									'display': 'none'
								});
							}
						}
						modal.unbind('mbModal:close');
					});

					modal.trigger('mbModal:open')
					var closeButton = $('.' + options.closeModalClass).bind('click.modalEvent', function() {
						modal.trigger('mbModal:close')
					});

					if (options.overlayClose) {
						modalBG.bind('click.modalEvent', function() {
							modal.trigger('mbModal:close')
						});
					}

					if (options.escClose) {
						$('body').keyup(function(e) {
							if (e.which === 27) {
								modal.trigger('mbModal:close');
							}
						});
					}

					function unlockModal() {
						locked = false;
					}

					function lockModal() {
						locked = true;
					}
				});
			}
		},//modal end
		quantity : function () {
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