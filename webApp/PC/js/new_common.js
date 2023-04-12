/**
 * [PC] 다이렉트 보험 서비스 플랫폼 구축
 * --------------------------------------
 * Modify: 2023/02/02
 */ 

// console.log('ui.common.js')


(function(context) {
	"use strict";
	var Pub = Pub || {}
	Pub.version = "0309.0001"
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
			// jQuery('html').attr('data-version', version);
			jQuery('html').data('version', version);
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
			, sidebar : $('.sidebar')
			, container : $('#container')
			, gnb  : $('#gnb ')
			, content : $('#content')
			, quickArea : $('.quick')
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
	
	, tab = {
		/**
		* Tab
		* --------------------------------------
		* @param _tabID : tab Name
		* @param _activeNum : 활성화 Index(Default : 0)
		* @param _callback :
		* 일반탭과 스크롤 탭의 data-tab="_tabID" 위치가 다름에 주의
		*/
		handler : function(_tabID, _activeNum, _callback){
			var initActNum= Pub.util.isValid(_activeNum) ? _activeNum : 0;
			var $tabNav=$('.tab-nav[data-tab="'+_tabID+'"]');
			var $tabCon=$('.tab-content[data-tab="'+_tabID+'"]');
			var $navItem = $tabNav.find("li");

			var len = $tabNav.find('> li').length;
			if(len <=2) {
				if(len <=1) $tabNav.addClass('len1'); //탭 갯수 2개일 경우 양쪽 여백 15
				else $tabNav.addClass('len2'); //탭 갯수 2개일 경우 양쪽 여백 15
			}

			//tab-br : 한줄 또는 두줄일경우 min-높이값 설정
			// ex : HFACC02001000, HFACC02001000_01
			if($tabNav.hasClass('tab-br')){
				var titleH_init = 45;
				$tabNav.find('a').each(function(){
					var titleH = $(this).height();
					if(titleH_init < titleH) titleH_init = titleH;
				});
				$tabNav.find('a').css({
					'min-height' : titleH_init + 28
				});
			}

			//tap-top : make circle
			if($tabNav.hasClass('tab-top')){
				$tabNav.find('a span').wrapInner('<em class="txt">').append('<i class="circle"></i>')
			}

			var curTitle = $navItem.eq(initActNum).addClass("on").find('a').text();
			$navItem.eq(initActNum).addClass("on").find('a').attr('title', curTitle+' 탭 선택');
			$tabCon.hide();
			$tabCon.eq(initActNum).show();

			//EventHandler
			$tabNav.on('click','a',function(){
				//disabled
				if($(this).hasClass('disabled')){
					return false;
				}

				var clickNum = $(this).parent().index();
				$navItem.removeClass("on").find('a').attr('title', '')
				var curTitle = $navItem.eq(clickNum).addClass("on").find('a').text();
				$navItem.eq(clickNum).addClass("on").find('a').attr('title', curTitle+' 탭 선택');
				$tabCon.hide();
				$tabCon.eq(clickNum).show();
				$(this).blur();

				//-callback--------------
				if(_callback) _callback(clickNum);
				//------------------------
				return false;
			});
		}
		//HFACC02001000_01(보장분석 SubTab)
		//HFPEN00004200(SFP 정주행 학습)
		// HFACO02000100(아치트)
		, scroll : function(_tabID, _activeNum, _callback){
			var initActNum= Pub.util.isValid(_activeNum) ? _activeNum : -999;
			var btnW = 0;
			var $tabNav=$('[data-tab="'+_tabID+'"]').find('.scroll-wrap');
			var $tabCon=$('.tab-content[data-tab="'+_tabID+'"]');
			var $navItem = $tabNav.children();

			//Gradient
			$('.tab-scroll[data-tab="'+_tabID+'"]').wrap('<div class="tab-gradient"></div>');


			//보장분석 title 있는 	케이스
			var $title = $('[data-tab="'+_tabID+'"]').find('.title');
			var titleW = 0;
			var titleMargin = 10;
			if($title.length > 0){
				titleW = $title.outerWidth();
				titleMargin = 10;
				$tabNav.css('margin-left', (titleW + titleMargin));
			}

			$navItem.each(function(){
				btnW += $(this).outerWidth();
			});

			$tabNav.width(btnW +20);
			$navItem.eq(initActNum).addClass("on").siblings().removeClass('on');
			var activePos = $navItem.eq(initActNum).position().left;
			$tabNav.parent().scrollLeft(activePos - (titleW + titleMargin));

			var curTitle = $navItem.eq(initActNum).addClass("on").find('a').text();
			$navItem.eq(initActNum).addClass("on").find('a').attr('title', curTitle+' 탭 선택');
			$tabCon.hide();
			$tabCon.eq(initActNum).show();

			//-callback--------------
			if(_callback) _callback(initActNum);
			//------------------------

			//EventHandler
			$tabNav.on('click','a',function(){
				//disabled
				if($(this).hasClass('disabled')){
					return false;
				}

				var clickNum = $(this).parent().index();
				$navItem.removeClass("on").find('a').attr('title', '')
				var curTitle = $navItem.eq(clickNum).addClass("on").find('a').text();
				$navItem.eq(clickNum).addClass("on").find('a').attr('title', curTitle+' 탭 선택');
				$tabCon.hide();
				$tabCon.eq(clickNum).show();
				$(this).blur();

				//-callback--------------
				if(_callback) _callback(clickNum);
				//------------------------
				return false;
			});
		}
	}
	, accordion ={
		// _openNum : (활성화 넘버 (0부터시작))
		handler : function($target, _openNum){
			$target.find('> .item').each(function(i){
				var _this=$(this);
				var $head=_this.find('.fold_header >a');
				var $body=_this.find('.fold_body');

				function open(){
					_this.addClass('on');
					$head.attr('title','접기');
					$head.find('.hidden').text('접기');
				}
				function close(){
					_this.removeClass('on');
					$head.attr('title','펼치기');
					$head.find('.hidden').text('펼치기');
				}

				//init
				if(_openNum==i){
					open();
					$body.show();
				}else{
					close();
					$body.hide();
				}

				//event
				$head.on('click', function(){
					if($(this).hasClass('disabled')) {
						return false;
					}

					if(! _this.hasClass('on')) open();
					else close();
					$body.stop().slideToggle();

					_this.siblings().find('.fold_body').stop().slideUp(function(){
						_this.siblings().removeClass('on');
					});
					_this.siblings().data('openFlag', false)
					_this.siblings().find('.fold_header > a').attr('title','펼치기');
					_this.siblings().find('.fold_header > a').find('.hidden').text('펼치기');
					return false;
				});
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
		}
	}
	, init = function(_param){
		setMap();
		page.init();

		//공통 & 최초 로드시
		if(Pub.is_firstLoad){
			// Pub.util.browserCheck();
			
			//is_sidebar
			if($('.sidebar').length) {
				sidebar.init();
			}else{
				// console.log('no sidebar')
			}
		}

		if(_param) {
			if(!!_param.callback){
				_param.callback();
			}
		}
	};

	return {
		init : init
		, tab : tab.handler
		, accordion : accordion.handler
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
	, open = function(layer, openCallBack) {
		setMap();
		// 팝업실행시 누른버튼 저장. 화면로드와 동시에 호출시 null )
		$modalFocusBtn = $(document).find(":focus").length > 0 ? $(document).find(":focus") : null;

		var $layer = $(layer);

		// var $accessBtn = "<span class=\"helper_a11y\" tabindex=\"0\"></span>";
		var $tmpFocus = "<a href='javascript:void(0);' class='helper_a11y' tabindex='0'><span class='blind'>팝업의 처음입니다.</span></a>";

		// $layer.data('data-prev-focus', $(button));
		// $layer.data('data-prev-focus', $modalFocusBtn);

		$layer.show() ;

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
			// jMap.body.addClass('modal_open').append('<div class="modal_backdrop"></div>');
			jMap.body.addClass('modal_open');
			jMap.wrap.append('<div class="modal_backdrop"></div>');
		}

		setTimeout(function(){
			$layer.addClass('show')
				.attr('aria-hidden', false)
				.prepend($tmpFocus)
			;

			var focus_first = $layer.find('.helper_a11y').focus();
			var focus_last = $layer.find('.btn_close')

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
			if($layer.find('.case_scroll').length > 0){
				$layer.find('.case_scroll').scrollTop(1);
			}

			//Callback
			if(openCallBack) openCallBack();
		},100);
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
		if(openModalNum <1){
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
		var $wrap = $layer.find('.sc_wrap');
		var $btnArea = $layer.find('.modal_footer .btn_area');

		var $title = obj.title ? obj.title :'test' ;
		var $msg = obj.msg;
		var $btn_cancel = obj.buttonTitle['cancel'];
		var $btn_ok = obj.buttonTitle['ok'];

		var $FN_cancel = obj.calllBack['cancel'];
		var $FN_ok = obj.calllBack['ok'];

		$wrap.children().empty();
		$btnArea.children().empty();
		$wrap.children().remove();
		$btnArea.children().remove();

		if(!!$title){
			$wrap.append('<h2 class="title"></h2>');
			$wrap.find('.title').html(obj.title);
		}

		if(!!$msg){
			$wrap.append('<div class="msg"></div>');
			$wrap.find('.msg').html(obj.msg);
		}

		if(!!$btn_cancel){
			$btnArea.append('<button type="button" class="btn btn_cancel">'+$btn_cancel+'</button>');
			if(!!$FN_cancel){
				$('.btn_cancel', $layer).on('click', function(){
					$FN_cancel();
				})
			}
		}

		if(!!$btn_ok){
			$btnArea.append('<button type="button" class="btn btn_ok btn_close">'+$btn_ok+'</button>');
			if(!!$FN_ok){
				$('.btn_ok', $layer).on('click', function(){
					$FN_ok();
				})
			}
		}

		this.open(layer, openCallBack);
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