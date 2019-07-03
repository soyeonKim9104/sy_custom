var custom = function () {
	var common = {
		init: function () {
			common.autocomplete.init();
			common.scroll();
			common.input.init(); // placeholder, checkbox, radio, file, textarea, delete
			common.datepicker();
			common.select();
			common.tab.init();
			common.modal.init();
			common.accordion.init();
			common.tooltip();
			common.sticky.init();
			common.slider();
			common.topBtn();
			common.quantity();
			common.filter();
			common.formReset();
			common.location();
			common.cleave.init();
			etc.pageCtr();
		},
		cleave : {
			options : {
				"quantity" : {
					numeral:true,
					delimiter: ''
				},
				"datepicker" : {
					date: true,
					delimiter: '-',
					datePattern: ['Y', 'm', 'd']
				},
				"card" : {
					blocks: [4, 4, 4, 4],
					delimiter: '-'
				},
				"scratch" : {
					blocks: [6]
				}
			},
			init : function(){
				var _this = this;
				$("[data-cleave]").each(function(){
					var type = $(this).data("cleave");
					_this.bind(this, type);
				});
			},
			bind : function (selector, type) {
				var _this = this;
				var cleave = new Cleave(selector, _this.options[type]);
			}
		},
		location : function(){
			var target =".location > li";
			$(target).each(function(){
				var $this = $(this);
				if ($this.find("ul").length) {
					common.scroll($this.find("ul"));
					$this.addClass("location-drop");
					$this.find("> a").off("click.loc").on("click.loc", function(e){
						e.preventDefault();
						$this.toggleClass("active");
					});
				}
			});
			$(window).off("click.loc").on("click.loc", function(e){
				var $target = $(e.target).closest(target).length ? $(e.target).closest(target) : null;
				$(target).not($target).removeClass("active");
			});
		},
		autocomplete : {
			init : function(){
				var _this = this;
				$(".header-search").each(function(){
					var $search = $(this);
					var $btnClose = $(".btn-close", $search);
					var $btnTag = $(".btn-search-hash", $search);
					var $input = $("input", $search);
					$btnClose.off("click.close").on("click.close", function () {
						_this.close();
					});
					$btnTag.off("click.hash").on("click.hash", function () {
						if ($search.hasClass("hash")){
							$search.removeClass("hash");
							$(this).html("해시태그로 검색");
							$input.attr("title", "검색");
						} else {
							$search.addClass("hash");
							$(this).html("일반 검색");
							$input.attr("title", "해시태그 검색");
						}
					});
				});
			},
			open : function(selector){
				$(".search-layer-wrap").show();
				$(selector).show().siblings(".search-layer").hide();
			},
			close : function(){
				$(".search-layer-wrap").hide();
				$(".search-layer-wrap .search-layer").hide();
			}
		},
		formReset : function(){
			$("button[type=reset]").off("click.reset").on("click.reset", function(){
				var form = $(this).closest("form");
				setTimeout(function () {
					form.find("input[type='radio'], input[type='checkbox']").change();
				},1);
			});
		},
		input : {
			init : function(){
				var exceptArr = ['button', 'hidden', 'image', 'reset', 'submit']; // 제외 Type Array;
				$("input").each(function(){
					if ( !$(this).parent("[class^=input-]").length && exceptArr.indexOf($(this).attr("type")) === -1) {
						var className = this.tagName.toLowerCase() === "input" ? "input-"+$(this).attr('type') : "textarea";
						$(this).wrap("<span class='"+className+"'></span>");
						var $wrap = $(this).parent("[class^="+className+"]");
						$wrap.addClass($(this).attr("class"));
						$wrap.attr({style : $(this).attr("style")});
						$(this).removeAttr("class");
					}
					common.input.focus(this);
					common.input.state(this);
				});
				common.checkbox.init();
				common.radio();
				common.file.init();
				common.textarea.init();
				common.input.placeholder();
				common.input.delete();
			},
			focus: function (selector) {
				var $wrap = $(selector).parent("[class^=input-]");
				$(selector).off("focusin.inputFocus").on("focusin.inputFocus", function() {
					$wrap.addClass('focus');
				}).off("focusout.inputFocus").on("focusout.inputFocus", function() {
					$wrap.removeClass('focus');
				});
			},
			state: function (selector) {
				var $this = $(selector);
				var $wrap = $this.parent("[class^=input-]");
				if ($wrap.length){
					if ($this[0].hasAttribute("disabled")) {
						$wrap.addClass("disabled");
					} else {
						$wrap.removeClass("disabled");
					}
					if ($this[0].hasAttribute("readonly")) {
						$wrap.addClass("readonly");
					} else {
						$wrap.removeClass("readonly");
					}
				}
			},
			error : function(selector, text){
				var $parent = $(selector).parent("[class^=input-]");
				var classes = $(selector)[0].hasAttribute('data-error') ?  "input-error-"+$(selector).data('error') : 'input-error';
				if (typeof text === 'undefined'){
					$parent.removeClass(classes);
					$(selector).next(".error-txt").remove();
				} else {
					$parent.addClass(classes);
					if (!$(selector).next(".error-txt").length) {
						$(selector).after("<span class='error-txt'>"+text+"</span>");
					} else {
						$(selector).next(".error-txt").text(text);
					}
				}
			},
			placeholder : function(){
				if (Modernizr.placeholder) return; // todo : test 후 수정 필요
				$("[placeholder]").each(function(){
					if ( $(this).prev(".placeholder").length ) return;
					$(this).before("<span class='placeholder'>"+ $(this).attr("placeholder") +"</span>");
					var $this = $(this);
					var $placeholder = $this.prev(".placeholder");
					$placeholder.off("click.placeholder").on("click.placeholder", function(){
						$this.focus();
					});
					$this.off("keyup.placeholder input.placeholder").on("keyup.placeholder input.placeholder", function(){
						if ($this.val() !== "") {
							$placeholder.hide();
						} else {
							$placeholder.show();
						}
					}).keyup();
				});
			},
			delete : function(){
				$("[data-delete]").each(function() {
					if ( $(this).next(".btn-delete").length ) return;
					$(this).after("<button type='button' class='btn-delete'>입력 내용 삭제</button>");
					var $this = $(this);
					var $btnDelete = $this.next(".btn-delete");
					$btnDelete.off("click.delete").on("click.delete", function(){
						$this.val("");
					});
				});
			}
		},
		quantity : function (){
			$(".quantity").each(function(){
				var $btn = $(this).find("button");
				var $input = $(this).find("input");
				var max = $input.attr("max") ? $input.attr("max")*1 : 9999;
				var min = $input.attr("min") ? $input.attr("min")*1 : 0;
				var num = $input.attr("step") ? $input.attr("step")*1 : 1;
				$input.each(function(){
					common.cleave.bind(this, "quantity");
				}).off("keyup.quantity input.quantity").on("keyup.quantity input.quantity", function(){
					minMax($input);
				}).keyup();
				function minMax($input){
					var val = $input.val() * 1;
					if (val > max){
						$input.val(max);
					} else if (val < min) {
						$input.val(min);
					}
				}
				$btn.off("click.quantity").on("click.quantity", function () {
					var val = $input.val() * 1;
					if($(this).hasClass("btn-increase")){
						$input.val(val+num);
					}else{
						$input.val(val-num);
					}
					minMax($input);
				})
			});
		},
		checkbox: {
			init : function () {
				$('input[type=checkbox]').each(function(){
					var $perent = $(this).closest('.input-checkbox');
					$(this).off("change.checkbox").on("change.checkbox", function () {
						if($(this).prop("checked")) {
							$perent.addClass('active');
						}else{
							$perent.removeClass('active');
						}
						if($(this).prop("disabled")){
							$perent.addClass('disabled');
						}
					}).change();
				});
				this.checkAll();
			},
			checkAll : function(){
				$('input[type=checkbox][data-all-check]').off("change.allcheck").on("change.allcheck", function () {
					var all = $(this).attr('data-all-check');
					var $check = $('[data-child-check="' + all +'"]');
					$check.prop("checked", $(this).prop('checked')).change();
				}).change();
				$('input[type=checkbox][data-child-check]').each(function(){
					$(this).off("change.dataCheck").on("change.dataCheck", function(){
						allCheck($(this));
					}).change();
				});
				function allCheck($this){
					var thisData = $this.data("child-check");
					var $all = $('[data-all-check="'+ thisData +'"]');
					if ($all[0].hasAttribute("disabled")) return;
					var unCheckLength = $("[data-child-check='" + thisData + "']").not(":checked").length;
					if( unCheckLength > 0 ){
						$all.prop('checked', false).closest(".input-checkbox").removeClass("active");
					}else{
						$all.prop('checked', true).closest(".input-checkbox").addClass("active");
					}
					if ($all[0].hasAttribute("data-child-check")){
						allCheck($all);
					}
				}
			}
		},
		radio : function () {
			$('input[type=radio]').each(function() {
				var name = $(this).attr('name');
				var $perent = $(this).closest('.input-radio');
				$(this).off("change.radio").on("change.radio", function () {
					if($(this).prop("checked")) {
						$('[name="' + name + '"]').closest('.input-radio').removeClass('on');
						$perent.addClass('on');
					}
					if($(this).prop("disabled")){
						$perent.addClass('disabled');
					}
				}).change();
			});
		},
		select : function () {
			var defaults = {
				width : "auto",
				position: { my : "left top-1", at: "left bottom" },
				create : function(){
					common.scroll($(this).selectmenu("menuWidget"));
				},
				change : function() {
					$(this).change();
				},
				open : function() {
					if ($(this).closest(".modal").length) {
						$(this).selectmenu("menuWidget").closest(".ui-selectmenu-menu").css({"z-index":"15000"});
					}
					defaults.width = $(this).next(".ui-selectmenu-button").outerWidth();
					$(this).selectmenu("menuWidget").width("auto").parent().width(defaults.width - 2);
				}
			};
			$("select:visible").each(function(){
				var $this = $(this);
				if ( !$this.hasClass(".hasSelectMenu").length ) {
					var classes = this.hasAttribute("class") ? $this.attr("class") : null;
					defaults.width = $this.outerWidth();
					defaults.classes = {
						"ui-selectmenu-button": classes,
						"ui-selectmenu-menu" : classes
					};
					var options = $.extend(false, defaults, $this.data("select"));
					$this.selectmenu(options).addClass("hasSelectMenu");
					$this.selectmenu("menuWidget").width("auto").parent().width(defaults.width - 2);
				} else {
					$this.selectmenu("refresh");
				}
				$this.closest("[data-scroll]").off("scroll.select").on("scroll.select", function(){
					$(".hasSelectMenu").selectmenu("close");
				});
			});
			$(window).off("resize.select").on("resize.select", function(){
				$(".hasSelectMenu").selectmenu("close");
			});
		},
		file : {
			blink : '/image file upload',
			arr : [],
			init : function (){
				var _this = this;
				$("input[type='file']").each(function(idx){
					if ($(this).next('.file-thumb').length) return;
					var $this = $(this);
					$this.after('<div class="file-thumb"><img src="'+_this.blink+'" alt="첨부파일 이미지"><button type="button" class="file-delete">첨부파일 취소</button></div>');
					$this.attr('data-file-index', idx);
					_this.bind(this);
				});
			},
			bind : function(selector){
				var _this = this;
				var $this = $(selector);
				var $wrap = $this.closest('.input-file');
				var $thumbImg = $this.next('.file-thumb').find('img');
				var $btnDel = $wrap.find('.file-delete');
				var idx = $this.data('file-index');
				_this.arr[idx] = $this.val("").clone(true);
				$this.off('change.file').on('change.file',function(){
					if ($this.val() !== '') {
						if (window.FileReader) {
							var reader = new FileReader();
							reader.onload = function(e) {
								$thumbImg.attr('src', e.target.result);
							};
							reader.readAsDataURL(this.files[0]);
						} else {
							this.select();
							this.blur();
							var imgSrc = document.selection.createRange().text;
							$thumbImg[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enable='true',sizingMethod='scale',src='" + imgSrc + "')";
						}
						$wrap.addClass('active');
					} else {
						$wrap.removeClass('active');
					}
				}).change();
				$btnDel.off('click.file').on('click.file', function(){
					_this.reset($this[0]);
				});
			},
			reset : function(selector){
				var _this = this;
				$(selector).each(function(){
					var $this = $(selector);
					var idx = $this.data('file-index');
					var $wrap = $this.closest('.input-file');
					var $thumbImg = $this.next('.file-thumb').find('img');
					$this.remove();
					$wrap.prepend(_this.arr[idx]).removeClass('active');
					_this.bind($wrap.find("input[type='file']"));
					$thumbImg.removeAttr('style').attr('src', _this.blink);
				});
			}
		},
		textarea: {
			init : function () {
				$("textarea").each(function(){
					if ($(this).closest(".textarea").length) return;
					var $this = $(this);
					var total = $this.attr("maxlength");
					var height = $this.outerHeight();
					common.scroll($this);
					$this.closest(".scroll-textarea").wrap("<div class='textarea'></div>");
					$this.closest(".scroll-wrapper").height(height);

					if (typeof total !== 'undefined'){
						$this.closest(".textarea").append("<div class='textarea-count'>(<span class='current'>0</span>/<span class='total'>"+ total +"</span>)</div>");
						$this.off('keyup.textarea input.textarea').on('keyup.textarea input.textarea', function() {
							common.textarea.count($this);
						}).keyup();
					}
				});
			},
			count : function($this){
				var $current = $this.val().length;
				$this.closest(".textarea").find(".current").text($current);
			}
		},
		datepicker: function () {
			var defaults = {
				//minDate: "-10y",
				//maxDate: "10y",
				position: { my : "left top100", at: "left bottom" },
				dateFormat: 'yy-mm-dd',
				showMonthAfterYear: true,
				prevText: '이전 달',
				nextText: '다음 달',
				monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				dayNames: ['일', '월', '화', '수', '목', '금', '토'],
				dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
				dayNamesMin: ['S','M','T','W','T','F','S'],
				yearSuffix: '.',
				currentText: "오늘"
			};
			$("[data-calendar]").each(function(){
				if ($(this).hasClass("hasDatepicker")) return;
				var $this = $(this);
				var options = $.extend(false, defaults, $this.data("calendar"));
				$this.datepicker(options);
				common.cleave.bind(this, "datepicker");
				//var cleave = new Cleave(this,);
				var fromTo = options.from || options.to;
				if (fromTo) {
					$this.attr("data-from-to", fromTo);
					var minOrMax = options.from ? "minDate" : "maxDate";
					$this.off("change.datepicker").on("change.datepicker", function() {
						var $siblingsIpt = $("[data-from-to="+ fromTo +"]").not($this);
						var getDate = $(this).datepicker("getDate");
						$siblingsIpt.datepicker( "option", minOrMax, getDate );
					});
				}
			});
			$(".datepicker-btn").each(function() {
				var $this = $(this);
				$this.find("button").off("click.datepicker").on("click.datepicker", function(){
					$this.find("input").datepicker("show")
				});
			});
		},
		tab: {
			init : function () {
				$("[data-tab] a").off("click.tab").on("click.tab", function(e){
					var id = $(this).attr("href").split("#")[1];
					e.preventDefault();
					common.tab.open(id);
				});
				$("[data-tab] li.active a").trigger("click");
			},
			open : function(id){
				var $li = $('a[href="#' +id + '"]').parent();
				$li.addClass("active");
				$("#"+id).addClass("active");
				$li.siblings().each(function(){
					var href = $(this).find("a").attr("href");
					$(this).removeClass("active");
					$(href).removeClass("active");
				});
				common.select();
				common.modal.size();
			}
		},
		accordion: {
			init : function(){
				var speed = 300;
				$("[data-accordion]").each(function(){
					stateChk($(this), !$(this).hasClass("active"), 0);
					$(this).off("click.accordion").on("click.accordion", function(e){
						e.preventDefault();
						stateChk($(this), $(this).hasClass("active"), speed);
					});
				});
				function stateChk($anchor, state, speed){
					if (state) {
						common.accordion.close($anchor, speed);
					} else {
						common.accordion.open($anchor, speed);
					}
				}
			},
			open : function($anchor, speed){
				var $target = $($anchor.attr("href"));
				speed = (typeof speed !== "undefined") ? speed : 0;
				if ($anchor.data("accordion") !== ""){
					var group = $anchor.data("accordion");
					this.close(  $("[data-accordion="+group+"]").not($anchor)  , speed);
				}
				$anchor.addClass("active");
				$target.stop().slideDown(speed);
			},
			close : function($anchor, speed){
				$anchor.each(function(){
					var $this = $(this);
					var $target = $($this.attr("href"));
					speed = (typeof speed !== "undefined") ? speed : 0;
					$this.removeClass("active");
					$target.stop().slideUp(speed);
				});
			}
		},
		topBtn: function () {
			var btnTop = $('#btnTop');
			$(window).off('scroll.btnTop').on('scroll.btnTop',function() {
				var stop = $('html').height() - $('#footer').height() - $(window).height();
				var winTop = $(window).scrollTop();
				if (winTop > 300) {
					btnTop.addClass('active');
				} else {
					btnTop.removeClass('active');
				}
				if (winTop >= stop) {
					btnTop.addClass('end');
				} else {
					btnTop.removeClass('end');
				}
			}).scroll();
			btnTop.off('click.btnTop').on('click.btnTop', function(e) {
				e.preventDefault();
				$('html, body').animate({scrollTop:0}, '100');
			});
		},
		slider: function () {
			var defaults = {
				slidesToShow: 1,
				slidesToScroll:1,
				dots:true,
				infinite:false,
				speed:200,
				count: false
			};
			$("[data-slider]").each(function(){
				var itemLength = $(this).children().length;
				var options = $.extend(false, defaults, $(this).data("slider"));
				if (options.count && options.slidesToShow < itemLength){
					var $status;
					$(this).on('init', function () {
						$(this).append('<span class="slick-count"><strong>0</strong>/<span>0</span></span>');
					});
					$(this).on('init reInit afterChange', function (event, slick, currentSlide) {
						var dataScroll = options.slidesToScroll;
						var totalCount = slick.slideCount;
						totalCount = totalCount % dataScroll === 0 ?  totalCount/dataScroll  : parseInt(totalCount/dataScroll) + 1;
						var i = currentSlide ? currentSlide : 0;
						$status = $(this).find(".slick-count");
						$status.find("strong").html((i / dataScroll) + 1);
						$status.find("span").html(totalCount);
					});
				}
				$(this).not('.slick-initialized').slick(options);
			});
		},
		sticky : {
			arr : [],
			defaults : {
				start: 'top', // top or bottom
				top:0,
				zIndex : 10000
			},
			init : function(){
				var _this = this;
				$('[data-sticky], .nav-wrap').each(function(idx){
					var options = $.extend(false, _this.defaults, $(this).data("sticky"));
					var wrapClass = 'sticky-wrap';
					if (!$(this).parent('.'+wrapClass).length) {
						$(this).wrap('<div class="'+wrapClass+'"></div>');
					}
					var $this = $(this);
					var $parent = $this.closest('[data-sticky-parent]').length ? $this.closest('[data-sticky-parent]') : $('#wrap');
					var $wrap = $this.parent('.sticky-wrap');
					$this.parent(".sticky-wrap").height($this.outerHeight());
					_this.arr[idx] = {
						'prevIdx' : idx,
						'nextIdx' : idx,
						'idx' : idx,
						'parent' : $parent[0],
						'parentParent' : $parent.parent().closest('[data-sticky-parent], #wrap')[0],
						'obj' : $(this),
						'wrap' : $wrap,
						'height' : $wrap.outerHeight(),
						'posTop' : 0,
						'posBtm' : 0,
						'start' : $wrap.offset().top,
						'end' : $parent.offset().top + $parent.outerHeight() - $wrap.outerHeight(),
						'options' : options
					};
				});
				$.each(_this.arr, function (idx, item) {
					for (var i = idx-1; i > -1; i-- ) {
						if (item.parent === _this.arr[i].parent || item.parentParent === _this.arr[i].parent) {
							item.prevIdx = i;
							break;
						}
					}
					if (idx !== item.prevIdx){
						item.posTop = Math.round( _this.arr[item.prevIdx].posTop +  _this.arr[item.prevIdx].height);
					}
					item.posTop += item.options.top;
				});
				var reverseArr = _this.arr.slice().reverse();
				$.each(reverseArr, function (idx, item) {
					for (var x = idx-1; x > -1; x-- ) {
						if (item.parent === reverseArr[x].parent) {
							item.nextIdx = reverseArr[x].idx;
							break;
						}
					}
					if (item.idx !== item.nextIdx){
						item.posBtm = Math.round( _this.arr[item.nextIdx].posBtm + _this.arr[item.nextIdx].height);
					}
					item.obj.css("z-index", item.options.zIndex + idx);
				});
				reverseArr = null;
				this.set();
				this.bind();
			},
			set : function(){
				var _this = this;
				$.each(_this.arr, function (idx, item) {
					var end = $(item.parent).offset().top + $(item.parent).outerHeight() - item.wrap.outerHeight() - item.posTop - item.posBtm;
					item.start = Math.round(item.wrap.offset().top - item.posTop);
					item.end = Math.round( end );
				});
			},
			bind : function(){
				var _this = this;
				$(window).off('scroll.sticky resize.sticky').on('scroll.sticky resize.sticky', function () {
					var winSt = $(window).scrollTop();
					var winSl = $(window).scrollLeft();
					_this.set();
					$.each(_this.arr, function (idx, item) {
						if (winSt < item.start) { // sticky 이전
							item.obj.css({
								'position':'static',
								'top' : '0',
								'left' : '0',
								'bottom' : 'auto'
							});
						} else if ( winSt >= item.start && winSt < item.end ) { // sticky 시작
							item.obj.css({
								'position' : 'fixed',
								'top' : item.posTop,
								'left' : item.wrap.offset().left - winSl,
								'bottom' : 'auto'
							});
						} else { // sticky 끝
							item.obj.css({
								'position' : 'absolute',
								'top' : 'auto',
								'left' : item.wrap.position().left,
								'bottom' : item.posBtm
							});
						}
					});
				}).scroll();
			}
		},
		scroll: function (obj) {
			var $target = (typeof obj !== "undefined") ? obj : $('[data-scroll]');
			if ($target.parent(".scroll-wrapper").length) return;
			$target.scrollbar();
		},
		tooltip: function(){
			var speed = 200;
			$("[data-tooltip]").each(function(idx){
				var $this = $(this);
				var $anchor = $("[class*=tooltip-icon]", this);
				var $target = $(".tooltip-content", this);
				var $close = $(".btn-tooltip-close", $target);
				var wrapLeft = $("#wrap").offset().left;
				var wrapRight = wrapLeft + $("#wrap").outerWidth();
				$anchor.attr({
					"href": "#tooltip"+idx,
					"title": "툴팁 열기"
				});
				$target.attr({
					"id": "tooltip"+idx
					//"tabindex": "0",
				});
				$this.off("click.tooltip").on("click.tooltip", function(e){
					e.preventDefault();
					if ($(e.target).closest(".tooltip-content").length) return;
					$target.stop().fadeIn(speed);
					var icoLeft = $target.offset().left;
					var icoRight = icoLeft + $target.outerWidth();
					if ( wrapLeft > icoLeft ){
						$target.css("margin-left", Math.round(wrapLeft - icoLeft));
					} else if (wrapRight < icoRight) {
						$target.css("margin-left", Math.round(wrapRight - icoRight));
					}
					setTimeout(function () {
						$close.focus();
					},10);
				});
			});
			$(".tooltip-wrap").each(function(){
				var $anchor = $("[class*=tooltip-icon]", this);
				var $target = $(".tooltip-content", this);
				var $close = $(".btn-tooltip-close", $target);
				$close.off("click.tooltip").on("click.tooltip", function(e){
					e.preventDefault();
					$anchor.focus();
					$target.stop().fadeOut(speed);
				});
			});
			$(window).off("click.tooltip").on("click.tooltip", function(e){
				var $target = $(e.target).closest("[data-tooltip]").length ? $(e.target).closest("[data-tooltip]") : null;
				$("[data-tooltip]").not($target).find(".tooltip-content").fadeOut(300);
			});
		},
		modal : {
			arr : [],
			init : function(){
				$('[data-modal-open]').off("click.modalOpen").on("click.modalOpen", function(e){
					e.preventDefault();
					var id = $(this).attr("href");
					common.modal.open(id);
				});
				$('[data-modal-close]').off("click.modalClose").on("click.modalClose", function(){
					var id = $(this).closest(".modal").attr("id");
					common.modal.close("#"+id);
				});
				$(window).off("resize.modalClose").on("resize.modalClose", function(){
					common.modal.size();
				}).resize();
			},
			open :function(id, speed){
				speed = (typeof speed !== "undefined") ? speed : 300;
				var $target = $(id);
				var dim = "[data-dimmed='" + id + "']";
				if ($target.is(":visible") || !$target.length || $(dim).length) return;
				common.modal.arr.push(id);
				var top = $(window).scrollTop();
				var left = $(window).scrollLeft();
				var num = common.modal.arr.length;
				var $modalWrap = $("#modal-wrap");
				$modalWrap.prepend("<div class='dimmed' data-dimmed='"+ id +"'>");
				$("html").addClass("modal-open");
				if(num < 2) {
					$("#wrap").scrollTop(top).scrollLeft(left);
				}
				$(dim).stop().fadeIn(speed / 2, function(){
					$target.stop().fadeIn(speed).css("z-index", (99999 + num)).addClass("open");

					common.select();
					common.scroll($target.find("[data-scroll]"));
					common.modal.size();
				}).css("z-index", (99999 + num));
			},
			close :function(id, speed){
				speed = (typeof speed !== "undefined") ? speed : 300;
				var top = $("#wrap").scrollTop();
				var left = $("#wrap").scrollLeft();
				var $modal = $(id);
				var $dimmed = $("[data-dimmed='" + id +"']");
				$modal.stop().fadeOut(speed, function(){
					$modal.css("z-index","").removeClass("open");
				});
				$dimmed.stop().fadeOut(speed, function () {
					$dimmed.remove();
					if(common.modal.arr.length < 1){
						$("html").removeClass("modal-open");
						$(document).scrollTop(top).scrollLeft(left);
					}
				});
				common.modal.arr.pop();
			},
			size : function(){
				$(".modal.open").each(function () {
					var $this = $(this);
					var documentH = $(document).outerHeight();
					var $content = $(this).find(".modal-contents .scroll-wrapper");
					var heaaderH = $(this).find(".modal-header").outerHeight();
					var margin = 100;
					var maxHeight = 800;
					var height = Math.min(documentH - (heaaderH + margin) , maxHeight - heaaderH );
					$content.css("max-height" , height);
					if ( $this.outerHeight() % 2 !== 0){
						if ($this.css("padding-bottom") === "1px"){
							$this.css("padding-bottom", "0");
						} else {
							$this.css("padding-bottom", "1px");
						}
					}
				});
			}
		},
		filter: function (){
			$('.btn-filter-open').on('click',function(){
				$('.filter-wrap').addClass('open');
			});
			$('.btn-filter-fold').on('click',function(){
				$('.filter-wrap').removeClass('open');
			});
		}
	};
	var etc = {
		queryString: function () {
			var a = window.location.search.substr(1).split('&');
			if (a === "") return;
			var b = {};
			for (var i = 0; i < a.length; i++) {
				var p = a[i].split('=');
				if (p.length !== 2) continue;
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		},
		pageCtr: function () {
			if (!etc.queryString()) return;
			var pram = etc.queryString();
			if (pram['modal']) {
				var modal = pram['modal'].split(",");//.map(Number);
				modal.forEach(function(element) {
					common.modal.open("#"+element, 0);
					setTimeout(function(){
						common.modal.size();
					}, 10);
				});
			}
			if (pram['tab']) {
				var tab = pram['tab'].split(",");
				tab.forEach(function(element) {
					common.tab.open(element);
				});
			}
		}
	};
	return common;
}();
$(function () {
	custom.init();
	custom.init();
	custom.init();
	custom.init();
});
