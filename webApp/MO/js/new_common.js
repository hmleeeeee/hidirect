/**
 * [MO] 다이렉트 보험 서비스 플랫폼 구축
 * --------------------------------------
 * Modify: 2023/03/30
 */ 


(function(context) {
	"use strict";
	var Pub = Pub || {}
	Pub.version = "0330.0002"
	Pub.testFlag = true;
	Pub.pageLoadCnt = 0; //초기 Loaded 아닌  ajax Loaded 카운트 체크
	Pub.is_firstLoad = true;
	Pub.util = {
		isValid : function(variables) {
			if (variables == null || variables == undefined || variables === '' || variables == 'undefine') return false;
			else return true;
		}
		, browserCheck : function(){
			var userAgent = navigator.userAgent
				, $elem = $('html')
				, isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
				, isTablet = /iPad/i.test(userAgent)
				, isDesktop = !isMobile && !isTablet
				, isIOS = (/ip(ad|hone|od)/i).test(userAgent)
				, isAndroid = (/android/i).test(userAgent)
				, ieMode = !!document.documentMode || 0
			;
			//Device
			if(isMobile) $elem.addClass('mobile');
			if(isTablet) $elem.addClass('tablit');
			if(isDesktop) $elem.addClass('desktop');
			//OS
			if(isIOS) $elem.addClass('ios');
			if(isAndroid) $elem.addClass('android');
			//Browser
			if(ieMode) $elem.addClass('ie ie'+ieMode);
			if(userAgent.indexOf("Firefox") > 0) $elem.addClass('firefox');
			else if(userAgent.indexOf("Opera") > 0) $elem.addClass('opera');
			else if(userAgent.indexOf("Chrome") > 0) {
				$elem.addClass('chrome');
				if(userAgent.indexOf("Whale") > 0) $elem.addClass('whale');
				if(userAgent.indexOf("Edg") != -1) $elem.addClass('edge');
			}
			else if(userAgent.indexOf("Safari") > 0) $elem.addClass('safari');
		}
		,version : function(){
			var version = Pub.version;
			jQuery('html').attr('data-version', version);
			// jQuery('html').data('version', version);
		}
	}

	context.Pub = Pub;
})(window);




/**
* UI Setup
* -----------------------------------------
* @param loginFlag : true (로그인후), false(로그인전)
*/
var UI = (function(){
	var jMap = {}
	, vMap = {}
	, setMap = function(){
		jMap = {
			html : $('html')
			, body : $('body')
			, wrap : $('#wrap')
			, sidebar : $('#sidebar')
			, container : $('#container')
			, navbar  : $('.navbar ')
			// , gnb  : $('#gnb ')
			, content : $('#content')
			, contentWrap : $('#content .content_wrap')
			, contentFooter : $('#content .content_footer')
			, quick : $('.quick')
			, modal : $('.modal')
			, footer : $('#footer')
			, dimm : $('.dimm-layer.close-layer')
		}
		, vMap = {
			loginFlag : false
			, is_pop : false
			, layout : {
				round : 0 // fixedScroll 여부(.modal-body-top 있을때)
				, fixBtn : 0 // footerBtn fixed 여부
				, tab : 0 //상단 탭 있는지 여부
			} 
		};
	}
	, sidebar = {
		open : function(){
			jMap.sidebar.addClass('on');
			jMap.body.addClass('sidebar_open');
		}
		, close : function(){
			jMap.sidebar.removeClass('on');
			jMap.body.removeClass('sidebar_open');
		}
		, handler : function(){
			$('.btn_sidebar_open').off('click').on('click', function(){
				console.log('sidebar')
				UI.sidebar.open(); 
				$('.sidebar_content').scrollTop(0);
			});
			$('.btn_sidebar_close').off('click').on('click', function(){
				UI.sidebar.close();
			});
		}
	}
	, quick ={
		//[3/30] 사용안함
		init : function(){
			if(jMap.quick.length > 0){
				quick.handler();
			}
		}
		, handler : function(){
			var docH = $(document).height();
			var winH = $(window).height();
			var isFloating = jMap.quick.hasClass('floating') ? true : false ;
			var footerPos = (jMap.body.find('.content_footer').length > 0) ? $('.content_footer').position().top : false;
			var $btnTop = $('.btn_top', jMap.quick);

			var $scrollTarget = $(window);

			$scrollTarget.scroll(function(event) {
				var scrollTop = $(this).scrollTop();
				var thisPos = jMap.quick.position().top;

				//Top btn
				// var topFloatingPos = Math.ceil(winH/2);
				// if(jMap.container.data('layout-round')) topFloatingPos =500;
				var topFloatingPos = 200;

				//항상 떠있는 Case
				if(isFloating){
					jMap.quick.addClass('floating');
					if(footerPos) jMap.quick.addClass('floating_bottom');
				}

			}).scroll();

			//EventHandler
			$btnTop.on('click', function(){
				$scrollTarget.scrollTop(0);
				$('#container').focus();
				return false;
			});
		}
	}
	, scroll = {
		//Tab/Tag Scroll시 Width 계산
		setWidth: function($target){
			var $item = $target.find("li");
			var len = $item.length;
			var btnW = 0;
			var firstMargin = 20;
			var btnW_gap = 12; 

			$item.each(function(){
				btnW += $(this).outerWidth() + btnW_gap;
			});

			$target.css({width : firstMargin + btnW });
		}
	}
	, tag = {
		//[3/24] tag_wrap{width:max-content} 대체 - 사용안함
		scroll : function($tag){
			var $target = $tag.find('.tag_wrap');
			scroll.setWidth($target);
		}
	}
	, tab = {
		insertAttr: function($tabNav, $navItem, $tabCon){
			//insert Aria
			$tabNav.attr('role', 'tablist');
			$navItem.each(function(){
				$(this).attr('role', 'tab');
			})
			$tabCon.attr('role', 'tabpanel');

			//insert H Title
			// var $section = $tabNav.closest('.section');
			// var hcnt = 1;
			// if($section.find('h2').length) hcnt = 2;
			// if($section.find('h3').length) hcnt = 3;
			// if($section.find('h4').length) hcnt = 4;
			// if($section.find('h5').length) hcnt = 5;
			// hcnt++;

			$tabCon.each(function(i){
				// $(this).prepend('<h'+hcnt+' class="blind">'+$tabNav.find('li').eq(i).find('a').text()+'</h'+hcnt+'>')
				$(this).prepend('<div class="tab_con_title blind">'+$tabNav.find('li').eq(i).find('a').text()+'</div>')
			});
			//End insert H Title
		}
		, init: function(_tabID, _activeNum, _callback){
			var initActNum= Pub.util.isValid(_activeNum) ? _activeNum : 0;
			var $tabNav=$('.tab[data-tab="'+_tabID+'"]').find('.tab_wrap');
			var $tabCon=$('.tab_content[data-tab="'+_tabID+'"]');
			var $navItem = $tabNav.find("li");
			var isScrollTab = $tabNav.parent().hasClass('tab_scroll') ? true : false;

			//insert Aria & Htitle
			tab.insertAttr($tabNav, $navItem, $tabCon);

			//ScrollTab
			if(isScrollTab){
				//[3/24] tag_wrap{width:max-content} 대체 - 사용안함
				// scroll.setWidth($tabNav);
			}

			//init view
			var curTitle = $navItem.eq(initActNum).addClass("on").find('a').text();
			$navItem.eq(initActNum).addClass("on").find('a').attr('title', curTitle+' 탭 선택');
			$tabCon.hide();
			$tabCon.eq(initActNum).show();

			//-callback--------------
			if(_callback) _callback($tabNav, initActNum);
			//------------------------

			//EventHandler
			$tabNav.off('click').on('click','a',function(){
				//disabled
				if($(this).hasClass('disabled')) return false;

				var clickNum = $(this).parent().index();
				$navItem.removeClass("on").find('a').attr('title', '')
				var curTitle = $navItem.eq(clickNum).addClass("on").find('a').text();

				$navItem.eq(clickNum).addClass("on").find('a').attr('title', curTitle+' 탭 선택');
				$tabCon.hide();
				$tabCon.eq(clickNum).show();
				$(this).blur();

				//-callback--------------
				if(_callback) _callback($tabNav, clickNum);
				//------------------------

				return false;
			});
		}
	}
	, accordion ={
		// _openNum: 활성화 넘버, 0부터시작
		handler : function($target, _openNum){
			$target.find('> .item').each(function(i){
				var _this = $(this);
				var $head = (_this.find('.fold_header > a').length) ? _this.find('.fold_header > a') : _this.find('.fold_header .btn_accordion');
				var $body = _this.find('.fold_body');

				function open(){
					_this.addClass('on');
					$head.addClass('on')
					$head.attr('title','내용닫기');
					$head.find('.blind').text('내용닫기');
					$head.attr('aria-expanded', true)
				}
				function close(){
					_this.removeClass('on');
					$head.removeClass('on')
					$head.attr('title','내용보기');
					$head.find('.blind').text('내용보기');
					$head.attr('aria-expanded', false)
				}

				//init
				if(_openNum == i || _this.parent().hasClass('open') || _this.hasClass('open') || _this.hasClass('on')){
					open();
					$body.show();
				}else{
					close();
					$body.hide();
				}

				$head.off('click').on('click', function(){
					if(_this.hasClass('disabled') || $(this).hasClass('disabled')) return false;
					if(! _this.hasClass('on')) open();
					else close();

					// $body.stop().slideToggle(160);
					if(_this.hasClass('on')){
						if(_this.closest('.notice').length) $body.show();
						$body.stop().slideDown(160);
					}else{
						$body.stop().slideUp(160);
					}

					_this.siblings().find('.fold_body').stop().slideUp(160, function(){
						_this.siblings().removeClass('on');
						_this.siblings().find('.fold_header > a, .fold_header btn_accordion').removeClass('on');
						// _this.siblings().find('.fold_header > a')
					});
					_this.siblings().data('openFlag', false)
					_this.siblings().find('.fold_header > a, .fold_header .btn_accordion').attr('title','내용보기');
					_this.siblings().find('.fold_header > a, .fold_header .btn_accordion').find('.blind').text('내용보기');
					_this.siblings().find('.fold_header > a, .fold_header .btn_accordion').attr('aria-expanded', false);

					//유의 사항 (화면하단 고정케이스: 스크롤 높이 제어)
					function noticeGoTop($target){
						if(!!!$target.closest('.accordion').hasClass('notice')) return false;
						var isModal = (!!_this.closest('.modal_body').length) ? true : false;
						var $scrollTarget = (isModal) ? $target.closest('.wrapper') : $('html, body');
						var posY = (isModal) 
								? $target.closest('.wrapper').find('> .section').height() 
								: $head.offset().top - 52 - 12;

						$scrollTarget.stop().animate({scrollTop: posY }, 160);
					}
					noticeGoTop($(this));

					return false;
				});
			});
		}
	}
	, notice = {
		setPos : function($target){
			if(!$target) $target = jMap.contentWrap;
			var $sectionFix = $target.find('> .section.bottom_fix'); 
			if(!!$sectionFix.length){
				$target.addClass('bottom_fix');
				var winH = $(window).height();
				var headerH = (!!jMap.navbar.length) ? jMap.navbar.outerHeight() : 0;
				var conFooterH = (!!jMap.contentFooter.length) ? jMap.contentFooter.outerHeight() : 0;
				var contentWrap_elseH = Number(headerH + conFooterH);
				var contentWrapH = winH - contentWrap_elseH;

				// * 화면작을때 적용케이스 초기화: height_100 init
				$target.removeAttr('style');

				// * 높이연산: flex 수직정렬 위해 높이 계산
				$target.css({
					'min-height': contentWrapH
					, 'margin-bottom': conFooterH
				});

				return false;
			}
		}
	}
	, toast ={
		open : function(_msg, _time, _callback){
			var MSG = _msg ? _msg : '잠시만 기다려 주세요.'; 
			var TIME = _time ? _time : null; 
			var html_toast=''
				+'<div class="toast init" role="alert">'
				+'	<span class="msg">'+MSG+'</span>'
				+'</div>'
			;

			$('body').append(html_toast);
			var $this = $('.toast');

			setTimeout(function(){$this.addClass('init'); }, 100);
			setTimeout(function(){$this.addClass('animate'); }, 300);

			//Time null일때 toast.close 별도 호출
			if(!!TIME) setTimeout(function(){toast.close(_callback) }, TIME);
			else{
				if(!!_callback) _callback();
			}
		}
		, close : function(_callback){
			var $this = $('.toast');
			$this.addClass('end');
			setTimeout(function(){
				$this.empty().remove();
				if(!!_callback) _callback();
			}, 300);
		}
	}
	, form = {
		setFocus: function(){
			var $focusObj = ''
				+ '.form_wrap:not(.disabled):not(.readonly) > input'
				+ ', .form_wrap:not(.disabled):not(.readonly) > select'
				+ ', .form_wrap:not(.disabled):not(.readonly) > .btn_select'
			;

			$(document).on('focus', $focusObj ,function(e){
				$(this).parent().addClass('focus');
				$(this).parents('.card_wrap').addClass('focus');
			});
			
			$(document).on('blur', $focusObj ,function(e){
				$(this).parent().removeClass('focus');
				$(this).parents('.card_wrap').removeClass('focus');
			});
		}
		//input 삭제버튼
		, setClear: function(){
			$(document).on('keyup change focus','input[data-clear="true"]',function(){
				var val = $(this).val()
					, txt = $(this).text()
					, $append = $(this).next('.append');
				;

				if($(this).prop('readonly') || $(this).prop('disabled') ) return false;
				if(val != '' || txt != ''){
					// if(!$append.length) $(this).after('<div class="append"></div>');
					if(!$append.length) $(this).after('<div class="append"><span class="unit clear"><button type="button" class="btn_clear"><span class="blind">입력값 초기화</span></button></span></div>');
					else if(!$append.find('.unit.clear').length){
						$append.append('<span class="unit clear"><button type="button" class="btn_clear"><span class="blind">입력값 초기화</span></button></span>');
					}
				}else $append.find('.unit.clear').remove();
			});

			$(document).on('click','.btn_clear',function(){
				var $inp = $(this).closest('.form_wrap').find('input[data-clear="true"]');
				$inp.val('').change().focus();
				$(this).remove();
			});
		}
	}
	, focus ={
		save : function(){
			var $target = $(document).find(":focus").length > 0 ? $(document).find(":focus") : null;
			jMap.body.data('focus', $target);
			return false;
		}
		, set : function(){
			if(!!jMap.body.data('focus')){
				$(jMap.body.data('focus')).focus();
				jMap.body.data('focus', null);
			}
			return false;
		}
		, cycle : function($target){
			var $focusEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])'
				, $first =$target.attr('tabindex', 0).focus()
				, $last = $target.find($focusEl).last()
			;
			$first.on("keydown", function(e) {
				if(e.which == 9 && e.shiftKey) {
					e.preventDefault();
					$last.focus();
				}
			});
			$last.on("keydown", function(e) {
				if(e.which == 9 && !e.shiftKey) {
					e.preventDefault();
					$first.focus();
				}
			});
		}
	}
	, tooltip ={
		init : function(){
			if(!$('.tooltip').length) return false;
			tooltip.handler();
		}
		, hide : function(){
			$('.btn_tooltip').removeClass('active');
			$('.tooltip_clone').remove();
		}
		, position : function($target, $clone){
			var posTop = $target.offset().top
				posLeft = 20 //$target.offset().left
			;

			if($target.data('pos')==='top'){
				$target.addClass('top');
				var conH = $clone.find('.tooltip_wrap').outerHeight();
				posTop =  posTop - conH - 10;
			}else{
				//아이콘 Case
				posTop = posTop + 27;

				//Text Case
				if($target.hasClass('btn_tooltip_text')){
					posTop = posTop + 35;
				}

				//아이콘 없을때 Case
				if($target.data('icon') == false){
					//
				}
			}

			// console.log('tooltip:', posTop, posLeft)

			$clone.css({top : posTop , left : posLeft});
		}
		, clone : function($target, mode){
			var cloneClass = 'tooltip_clone';
			var cloneHtml=''
				+'<div class="'+cloneClass+' '+mode+'" role="tooltip">'
				+'	<div class="tooltip_wrap" role="tooltip">'
				+		$target.siblings('.tooltip_wrap').html()
				+'	</div>'
				+'</div>'
			;
			tooltip.hide();
			$target.addClass('active');
			jMap.body.append(cloneHtml);
			return $("."+cloneClass);
		}
		, handler : function(){
			$('.btn_tooltip').each(function(i){
				var mode = $(this).data('handler') == 'click' ? 'click' : 'hover';
				if(mode == 'click'){
					$(this).on('click', function(){
						var $cloneObj = tooltip.clone($(this), mode);
						tooltip.position($(this), $cloneObj);
						focus.save();
						focus.cycle($cloneObj);
						return false;
					});
				}else{
					$(this).on('mouseover focusin', function(){
						var $cloneObj = tooltip.clone($(this), mode);
						tooltip.position($(this), $cloneObj);
						return false;
					}).on('mouseout focusout', function(){
						tooltip.hide();
					});
				}
			});

			//Click Mode
			$(document).on('click', '.tooltip_clone .tooltip_close', function(){
				tooltip.hide();
				focus.set();
			});
			$(document).on('click', function(e){
				//클리시 재확인-- 오류 수정 예정
				if($(e.target).closest('.tooltip').length==0){
					if(!!jMap.body.data('focus')){
						focus.set();
						tooltip.hide();
						return false;
					}
				}
			});
			$(window).resize(function(){
				tooltip.hide();
				return false;
			});
			$(window).scroll(function(){
				focus.set();
				tooltip.hide();
				return false;
			});
			//모달
			$('.modal .wrapper').scroll(function(){
				focus.set();
				tooltip.hide();
				return false;
			});
		}
	}
	, page = {
		init : function(){
			//onLoad(초기 로드), cpLoad(contentPage 로드)
			if(jMap.html.hasClass('onLoad')) {
				Pub.is_firstLoad = false;
				jMap.html.removeClass('cpLoad'+Pub.pageLoadCnt);
				Pub.pageLoadCnt ++;
				jMap.html.addClass('cpLoad'+Pub.pageLoadCnt);
			} else {
				jMap.html.addClass('onLoad');
				Pub.util.browserCheck();
			}

			//바닥페이지 컨텐트 풋터 없을떄: no_footer
			if(!!!jMap.contentFooter.length){
				jMap.contentWrap.addClass('no_footer');
			}else if(jMap.contentFooter.hasClass('fix')){
				jMap.contentWrap.addClass('fix_footer');
			}

			//form
			form.setFocus();
			form.setClear();

			//tooltip
			tooltip.init();

			//Accordion
			UI.accordion($('.accordion'));
			UI.accordion($('.filter'));
			UI.accordion($('.amount_accordion'));
			UI.accordion($('.toggle_accordion'));
			UI.accordion($('.card_accordion'));

			//유의사항 및 배너 하단에 고정 Case
			notice.setPos(jMap.contentWrap);
		}
	}
	, init = function(_param){
		setMap();

		//페이지 로드할때마다...
		page.init();

		//공통 & 최초 로드시...
		if(Pub.is_firstLoad){
			Pub.util.version();
			//quick.init();
			// sidebar.handler(); //개발 호출가능으로 ui.pub.js로 이동
		}

		if(_param) {
			if(!!_param.callback){
				_param.callback();
			}
		}
	};

	return {
		init : init
		, sidebar : sidebar
		, tab : tab.init
		, accordion : accordion.handler
		, tooltip : tooltip.init
		, notice : notice.setPos //UI.notice();
	}
}());





/**
* 레이어 팝업
* -----------------------------------------
* [수정예정]
* 2 aria-hidden구분 : 모달별, 바닥페이지별 , 팝업위 팝업일경우
*/

var $modalFocusBtn;

var layerPop = (function($){
	var jMap = {}
	var vMap = {}
	var setMap = function(){
		jMap = {
			body : $('body')
			, wrap : $('#wrap')
		}
		, vMap ={
			layout : {

			}
		}
	}
	, init = function(layer){
		var $layer = $(layer);
		var $header = $layer.find('.modal_header');
		var headerH = (!!$header.length) ? $header.outerHeight(true) : 0;
		var $bodyWrap = $layer.find('.modal_body').find('.wrapper');
		var $footer = $layer.find('.modal_footer');
		var footerH = (!!$footer.length) ? $footer.outerHeight(true) : 0;

		//헤더 없는경우
		if($layer.hasClass('bottom')){
			if(headerH < 1)	{
				var marginTop = 40;
				headerH = headerH + marginTop;
				$bodyWrap.css({'margin-top' : marginTop});
			}
		}

		if(footerH < 1) $bodyWrap.addClass('no_footer');

		function setPos(){
			var winH = $(window).outerHeight();
			var bodyWrap_elseH = Number(headerH + footerH);
			var contentWrapH = winH - bodyWrap_elseH;


			if($layer.hasClass('bottom')){
				$bodyWrap.css({'max-height': contentWrapH});
			}else if($layer.hasClass('md') || $layer.hasClass('alert')){
				$bodyWrap.css({'max-height': (contentWrapH - 40)});//40 = 위아래 20여백
			}else if($layer.hasClass('full')){
				$bodyWrap.css({'height': contentWrapH});
			}

			//유의사항 및 배너 하단에 고정 Case
			var $sectionFix = $bodyWrap.find('.section.bottom_fix'); 
			if(!!$sectionFix.length) $bodyWrap.addClass('bottom_fix');
		}

		//안드로이드 주소창 올라갔을때 바닥페이지 보이는 부분 대응
		$(window).resize(function(){
			setTimeout(function(){setPos();}, 10);//[3/28] 모달에서 사이즈 초기 높이 못 잡는 버그 대응
		}).resize();
	}
	, open = function(layer, openCallBack) {
		setMap();

		// 팝업실행시 누른버튼 저장. 화면로드와 동시에 호출시 null )
		$modalFocusBtn = $(document).find(":focus").length > 0 ? $(document).find(":focus") : null;

		var $layer = $(layer);

		// var $accessBtn = "<span class=\"helper_a11y\" tabindex=\"0\"></span>";
		var $tmpFocus = "<a href='javascript:void(0);' class='helper_a11y' tabindex='0'><span class='blind'>팝업의 처음입니다.</span></a>";

		// $layer.data('data-prev-focus', $(button));
		// $layer.data('data-prev-focus', $modalFocusBtn);

		$layer.show();

		init(layer);

		jMap.wrap.attr('aria-hidden', true);

		//popup++ zindex 설정
		var zindex = jMap.body.attr('data-modal-cnt') ? Number(jMap.body.attr('data-modal-cnt')) + 1 : 8010;
		jMap.body.attr('data-modal-cnt', Number(zindex));
		$layer.css('z-index' , zindex);

		//팝업 위 팝업

		if(jMap.body.hasClass('modal_open')){
			if(jMap.body.hasClass('modal_inIframe')) {
				$layer.before('<div class="modal_backdrop"></div>');
				$('.modal_backdrop').css({'z-index' : zindex}) // backdroup z-index
			} else {
				$('.modal_backdrop').css({'z-index' : zindex - 1}) // backdroup z-index
			}
		}else{
			jMap.body.addClass('modal_open');
			//[3/28] full modal 에서 backdrop 제거
			if(!$layer.hasClass('full')) jMap.wrap.append('<div class="modal_backdrop"></div>');
		}

		setTimeout(function(){
			$layer.addClass('show')
				.attr('aria-hidden', false)
				.prepend($tmpFocus)
			;

			var focus_first = $layer.find('.helper_a11y').focus();
			var focus_last = $layer.find('.btn_modal_close')

			focus_first.on("keydown", function(e) {
				if(e.which == 9 && e.shiftKey) {
					e.preventDefault();
					focus_last.focus();
				}
			});

			focus_last.on("keydown", function(e) {
				if(e.which == 9 && !e.shiftKey) {
					e.preventDefault();
					focus_first.focus();
				}
			});
			// $layer.prepend($accessBtn)

			//IE9 수직 중앙정렬
			/*if(Pub.browser =='ie9'){
				var winH = $(window).height();
				var layerH = $layer.find('.modal_content').outerHeight();
				var Pos = Math.ceil((winH - layerH)/2);
				$layer.css({'top' : Pos +'px'});
			}*/

			//EX case
			//A_CO_40001_P9 : 내부스크롤
			// if($layer.find('.case_scroll').length > 0){
			// 	$layer.find('.case_scroll').scrollTop(1);
			// }

			//Callback
			if(openCallBack) openCallBack();
		}, 100);
	}
	, close = function(layer, focusBtn, closeCallBack) {
		setMap();

		var $body = jMap.body;
		var $layer = $(layer);

		$layer.removeClass('show').attr('tabindex', '-1').find('.helper_a11y').remove();
		$layer.hide().attr('aria-hidden', true);

		//***********************************
		// * 모달별, 바닥페이지별 , 팝업위 팝업일경우
		var zindex = $body.attr('data-modal-cnt');

		var openModalNum = jMap.body.find('.modal.show').length //size();
		if(openModalNum < 1){
			$body.removeAttr('data-modal-cnt').removeClass('modal_open');
			$('.modal_backdrop').remove();
			jMap.wrap.attr('aria-hidden', false);
		} else {
			if(jMap.body.hasClass('modal_inIframe')) {
				$('.modal_backdrop').remove();//개발용
			 } else {
				$body.attr('data-modal-cnt', Number(zindex - 1));
				$('.modal_backdrop').css({'z-index' : zindex - 2}) // backdroup z-index
			 }
		}

		if(!!focusBtn) $modalFocusBtn = focusBtn;

		if($modalFocusBtn) {
			$modalFocusBtn.focus();
		}else {
			if($(document).find("body>div[tabindex='0']").first().length == 0) {
				$(document).find("body").prepend("<div tabindex='0' onblur='javascript:this.remove();'/>");
				$(document).find("body>div[tabindex='0']").first().focus();
			}
		};

		if(closeCallBack) closeCallBack();
	}
	, alert = function(layer, obj, openCallBack){
		$modalFocusBtn = $(document).find(":focus").length > 0 ? $(document).find(":focus") : null;

		var obj = obj || {}
		var $layer = $(layer);
		var $modalContent = $layer.find('.modal_content');
		var $header = $layer.find('.modal_header');
		var $wrap = $layer.find('.sc_comp');
		var $btnArea = $layer.find('.modal_footer .btn_area');

		var $align = obj.align ? obj.align : 'center';
		var $isCloseBtn = obj.isCloseBtn ? obj.isCloseBtn : false;
		var $width = obj.width ? obj.width : '300px';
		var $title = obj.title ? obj.title : 'test';
		var $msg = obj.msg;
		var $icon = obj.icon;
		var $btn_cancel = obj.buttonTitle['cancel'];
		var $btn_ok = obj.buttonTitle['ok'];

		var $FN_cancel = obj.calllBack['cancel'];
		var $FN_ok = obj.calllBack['ok'];
		
		$layer.removeClass('alert_md');
		$modalContent.removeAttr('style');
		$header.children().remove();
		$wrap.children().empty();
		$btnArea.children().empty();
		$wrap.children().remove();
		$btnArea.children().remove();

		if(!!$icon){
			$wrap.append('<div class="icon '+obj.icon+'"></div>');
		}

		if($align === 'left'){
			$layer.addClass('alert_md');
		}

		if(!!$isCloseBtn){
			$layer.find('.btn_modal_close').show();
		}else{
			$layer.find('.btn_modal_close').hide();
		}
		
		$modalContent.css({'max-width': $width})

		if(!!$title){
			$header.prepend('<div class="wrapper"><h2 class="modal_title"></h2></div>');
			$header.find('.modal_title').html(obj.title);
		}

		if(!!$msg){
			$wrap.append('<div class="alert_msg"></div>');
			$wrap.find('.alert_msg').html(obj.msg);
		}

		if(!!$btn_cancel){
			$btnArea.append('<button type="button" class="btn btn_cancel">'+$btn_cancel+'</button>');
			if(!!$FN_cancel){
				$('.btn_cancel', $layer).on('click', function(){$FN_cancel();});
			}
		}

		if(!!$btn_ok){
			$btnArea.append('<button type="button" class="btn btn_ok">'+$btn_ok+'</button>');
			if(!!$FN_ok){
				$('.btn_ok', $layer).on('click', function(){$FN_ok();});
			}
		}

		// setTimeout(function(){
		this.open(layer, openCallBack);
		// }, 300)
	}
	return{
		open : open
		, close : close
		, alert : alert
	};
})(jQuery);




// jQuery(document).ready(function($) {
// 	UI.init({
// 		callback : function(){
// 			console.log('end=1')
// 		}
// 	})
// });
