// height 100% 
//$(document).ready(sizeContent);
//$(window).resize(sizeContent);
//$(document).ready(layerPosition);
//$(window).resize(layerPosition);
//function sizeContent() {
	//var deviceH = screen.availHeight;
	//var newHeight=$("html").height() - $("header").height() + "px";
	//$('#popContent').css("height", newHeight);
	//console.log("deviceH==>"+deviceH+"   header==>"+$("header").height());
	//$('#popContent').css("height", newHeight);

	//layerPosition(); // fuz 업무지원 추가 스크립트
//}

/* fuz 업무지원 추가 스크립트*/

//레이어 가운데 정렬
function layerPosition(){
	var deviceH = window.screen.availHeight;
	var deviceH1 = window.screen.height;
	var layerH = '';
	var layerWrapH = '';
	var layerMt = '';
	var layertop = 10;
	var scrollH = '';
	var headerH=$("header").height();
	//var index = $('.layerCont').length;
	
	if($('.layerPopup').length){
		//$('body').css('height', deviceH + 'px');
		$(".layerPopup").each(function(i) {
			layerH = $(this).children('.layerWrap').outerHeight();

			if( deviceH > deviceH1 ) {deviceH=window.screen.height;}
			layerMt = (deviceH - layerH - headerH)

			if((layerH + 100) < deviceH) {
				layertop = (layerMt/2);
				$(this).children('.layerWrap').css({top:layertop+'px'});
			} else {
				scrollH = (deviceH - 300);
				layertop = 45;
				$(this).children('.layerWrap').css({top:layertop+'px'}).find('.layerCont').attr({'tabindex': '0'}).addClass('scroll').css("height", scrollH+'px');
			}
		})
	}
} 


$(function(){
	/*
	if($('.toggleWrap').length){
		$('.toggleWrap .toggleTitle a').click(function(e){
			if($(this).parent().parent().hasClass('open') == true) {
				$(this).parent().parent().removeClass('open');
			} else {
				$(this).parent().parent().parent().find('div').removeClass('open');
				$(this).parent().parent().addClass('open');
			}
		});
	}
	*/
	if($('.carBaner .basic').length || $('.certifiBanner .basic').length){
		if(!$('.carBaner .basic , .certifiBanner .basic').hasClass('stop')) {
			//console.log('b');
			$('.carBaner .basic , .certifiBanner .basic').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: false
			});
		}
	}
})
function heightResize() {
	
	var maxHeight = -1;
	var maxHeight2 = -1;
	if ($('.heightResize').length > 0) {
		$('.noCheckList').each(function() {
			$('.noCheckList > a').each(function() {
				maxHeight = maxHeight > $(this).removeAttr('style').height() ? maxHeight : $(this).removeAttr('style').height(); 
				$(this).parent('.noCheckList').find('a').each(function() {
					$(this).height(maxHeight);
				});
			});
			
		});
	}
	if ($('.tabBtnList').length > 0) {
		$('.tabBtnList').each(function() {
			$('.tabBtnList > a').each(function() {

				maxHeight = Math.max(maxHeight, $(this).removeAttr('style').height());
				$(this).parent('.tabBtnList').find('a').each(function() {
					$(this).height(maxHeight);
				});
			});
		});
	}
	if ($('.heightResize').length > 0) {
		$('.heightResize').each(function() {
			//console.log('start')
			$('.heightResize > a').each(function() {
				maxHeight = Math.max(maxHeight, $(this).removeAttr('style').height());
				//console.log("maxHeight>>>>"+maxHeight)
				$(this).parent('.heightResize').find('a').each(function() {
					$(this).height(maxHeight);
				});
			});
		});
	}
}
// device neme 
function check_device() {
	var mobileKeyWords = new Array('iPhone','iPad','iPod','BlackBerry','Android','Windows OE','LG','MOT','SAMSUNG')
	var device_name = '';
	for (var word in mobileKeyWords) {
		if (navigator.userAgent.match(mobileKeyWords[word]) != null ) {
			device_name = mobileKeyWords[word];
			break;
		}
	}
	return device_name
}
$(document).ready(function() {

	//디바이스 체크
	var ua = navigator.userAgent;
	var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
	var _deviceChk = '';
	var _device = check_device();

	if ( android ) {
		_deviceChk = 'android';
	} else if (ipad || ipod || iphone){
		_deviceChk = 'ios';
	} else {
		_deviceChk = '';
	}

	if (_device !='') {
		console.log(_device);
	}

	/* 웹접근성으로 aria 추가*/
	var _accessbility = '<span class="hide"> 선택됨</span>';
	var _accessbilityup = '<span class="hide"> 하위콘텐츠 열기</span>';
	var _accessbilitydown = '<span class="hide"> 하위콘텐츠 열기</span>';
	/*
	$('.tabOpen').each(function () {
		var _this = $(this);
		_this.attr('aria-hidden' , true);
	});
	$('a').click(function() {
		var _this = $(this);
		var _idx;
		if (_this.siblings('a')){
			_idx = _this.index();
			_this.attr('aria-hidden' , false).siblings('a').attr('aria-hidden' , true);
		} else if (!_this.siblings('a') && _this.parent().children('a')) {
			_idx = _this.parent().index();
			_this.attr('aria-hidden' , false).parent().children('a').attr('aria-hidden' , true);
		} else if (!_this.siblings('a') && !_this.parent().children('a')) {
			_this.attr('aria-hidden' , false);
		}
	});
	*/
	/* 웹접근성 추가 */
	$('.tabOpen, .dataDetail').each(function () {
		if($(this).hasClass('on') || $(this).css('display')=='block' ) {
			$(this).attr('aria-hidden' , false);
		} else {
			$(this).attr('aria-hidden' , true);
		}
	});
	$('.tabBox > .toggleTitle').each(function () {
		if(!$(this).parent('.tabBox').hasClass('open')) {
			$(this).find('a.toggleBtn').append('<span class="hide"> 하위콘텐츠 열기</span>');
		} else {
			$(this).find('a.toggleBtn').append('<span class="hide"> 하위콘텐츠 닫기</span>');
		}
	});
	$('.itemContWrap > div').each(function () {
		if($(this).css('display')=='block') {
			//alert($(this).css('display'))
			$(this).attr('aria-hidden' , false);
		} else {
			$(this).attr('aria-hidden' , true);
		}
	});
	$(".tabChois > a").each(function() {
		if($(this).hasClass('on') ) {
			if (!$(this).children().hasClass('hide')) {
				$(this).append(_accessbility);
			}
		} else {
			$(this).children('span.hide').remove();
		}
	});
	$(".layerWrap a.layerClose").each(function() {
		$(this).remove('role').attr('role','button');
	});
	$(".layerWrap .layerBtn > a").each(function() {
		$(this).remove('role').attr('role','button');
	});
	$(".btnWrap > a, .btnWrap span > a").each(function() {
		$(this).remove('role').attr('role','button');
	});
	$(".toggleTitle > a").each(function() {
		$(this).remove('role').attr('role','button');
	});

	$('.faqAccordion .tabBox > .toggleTitle > a, .noti .tabBox > .toggleTitle > a').each(function() {
		var _this = $(this);
		var _thisparent = $(this).parent();
		var _parents = $(this).parent().parent();
		
		if (!_parents.hasClass('open')) {
			_this.append('<span class="hide"> 하위콘텐츠 열기</span>');
		} else {
			_this.append('<span class="hide"> 하위콘텐츠 열기</span>');
		}
	});

	if($('.tabOpen').hasClass('open').length || $('.tabOpen').hasClass('on').length){
		$('.tabOpen').attr('aria-hidden' , false).show();
	}

	$("a").each(function() {
		var _thisText, _thisTitle, _url;
		//var _url = $(this).attr('href')
		if(_deviceChk == 'android') {
			_thisText = $(this).text();
			if($(this).children('div').length || $(this).children('dl').length || $(this).children('ul').length || $(this).children('p').length) {
				$(this).attr('aria-label',_thisText +' 선택됨');
			}
		}
		if($(this).hasClass('counDel') || $(this).hasClass('btnHome') || $(this).hasClass('btnBack') || $(this).hasClass('btnMenu')) {
			$(this).attr('role','button');
		}
		//console.log(_url);
	});

	$(".radioChois li > a").each(function() {
		var _this = $(this);
		if(_this.parent().hasClass('on')) {
			_this.append(_accessbility);
		}
	});
	if($('.slick-dots > li').hasClass('slick-active')) {
		$('.slick-dots > li.slick-active').find('button').append(_accessbility).parent().siblings('li').children('button').find('> .hide').remove();
	} 
	$('.slick-dots li > button').click(function() {
		$('.slick-dots li > button').children('.hide').remove();
		$(this).append(_accessbility);
	});
	$('.slick .slick-prev').text('이전 베너');
	$('.slick .slick-prev').focus(function(){$(this).text('이전 베너 선택');});
	$('.slick .slick-prev').focusout(function(){$(this).text('이전 베너');});
	$('.slick .slick-next').text('다음 베너');
	$('.slick .slick-next').focus(function(){$(this).text('다음 베너 선택');});
	$('.slick .slick-next').focusout(function(){$(this).text('다음 베너');});
	/*
	$('.slick .slick-dots > li > button').focus(function(){
		if(!$(this).parent().hasClass('slick-active')) {
			$(this).append(_accessbility);
		}
	});
	$('.slick .slick-dots > li > button').focusout(function(){
		if(!$(this).parent().hasClass('slick-active')) {
			$(this).children('.hide').remove();
		}
	});
	*/
	//디바이스 포커스후 하위컨텐츠 못읽어 임시 주석 처리
	//$('.toggleDetail , .agrBox > div, .popContent section > pre').attr({'tabindex': '0'});


	//접근성 테이블 summary를 caption에 추가
	$('table').filter(function() {
		return !$(this).is('.etc')
	}).each(function(idx) {
		var $table = $(this);
		var autoCaption = $table.data('autoCaption');
		
		//if(typeof autoCaption === 'undefind' || autoCaption) {
			var summary = '';
			$('>thead>tr>th, >tbody>tr>th', $table).each(function(idx) {
				var strTh='';
				strTh = $(this).text().replace(/<br[^>]*>/g,'').replace(/&nbsp;/g, '');
				if (strTh.indexOf('<') !== -1) strTh = strTh.substring(0, strTh.indexOf('<'));
				if (idx !== 0) summary += ', ';
				summary += strTh;
			});
			//if (!$(this).children('caption').find('span')) {
				//console.log('aa');
				$(this).find('caption').append('<span>'+ summary + " 순으로 제공 </span>");
			//}
		//}
	})
	/* 웹접근성 추가 끝 */
	/*
	$('.noCheckList > a').each(function () {
		if($(this).hasClass('on')) {
			console.log('a');
			$(this).append(_accessbility);
		} 
	});
	*/
	if ($('.noCheckList').length > 0 || $('.tabBtnList').length > 0 || $('.heightResize').length > 0) {heightResize (); }
	$(window).resize(function() {
		heightResize();
	});


	/* 높이 통일 */
	/*
	var maxHeight = 0;
	$('.noCheckList > li').each(function() {
		maxHeight = Math.max(maxHeight, $(this).children('a').height());
	});
	$('.noCheckList > li > a').css({height:maxHeight + "px"})
	*/

	/* 높이 통일 끝*/

	/* tab선택 */
	$(".tabMenu a").click(function() {
		var _this = $(this);
		var _idx = $(this).index();
		var _accessbility = '<span class="hide"> 선택됨</span>';

		if(!_this.hasClass('on')) {
			_this.addClass('on').siblings().removeClass('on');
			_this.append(_accessbility).siblings().children('span.hide').remove();
			if($('.tabOpen').length){
				$('.tabOpen').eq(_idx).attr('aria-hidden' , false).show().siblings('.tabOpen').attr('aria-hidden' , true).hide();
			}
		}
	});
	/* on, off button 활성 */
	$(".onbtn a").click(function() {
		var _this = $(this);
		var _idx = $(this).index();
		var _accessbility = '<span class="hide"> 선택됨</span>';
		//console.log(_this);
		if(!_this.hasClass('on') && !_this.parent('.specialsList') && !_this.parent('.securList')) {
			_this.addClass('on').siblings().removeClass('on');
			_this.append(_accessbility).siblings().children('span.hide').remove();
		} 
		if (_this.parent('.specialsList , .securList')) {
			if (!_this.hasClass('on')) {
				//console.log('specialsList A');
				_this.addClass('on');
				_this.append(_accessbility);
			} else {
				//console.log('specialsList b');
				_this.removeClass('on');
				_this.children('span.hide').remove();
			}
		}
		
		// if (_this.parent('.securList')) {
		// 	if (!_this.hasClass('on')) {
		// 		console.log('securList a');
		// 		_this.addClass('on');
		// 		_this.append(_accessbility);
		// 	} else {
		// 		console.log('securList b');
		// 		_this.removeClass('on');
		// 		_this.children('span.hide').remove();
		// 	}
		// }
		
	});
	/* 접근성 layer 포커스 이동 */
	$("a").click(function() {
		var _url = $(this).attr('href')
		if( _url.indexOf('layer') != -1) {
			$(_url).focus();
		}
	});

		

	$(".specialsList a").click(function() {
		var _this = $(this);
		var _idx = $(this).index();
		var _accessbility = '<span class="hide"> 선택됨</span>';

		if (!_this.hasClass('on')) {
			//console.log('securList a');
			_this.addClass('on');
			_this.append(_accessbility);
		} else {
			//console.log('securList b');
			_this.removeClass('on');
			_this.children('span.hide').remove();
		}
		
	});

	/* on, off button addCheck 활성 */
	$(".orgbtnList > a , .btnList > a").click(function() {
		var _this = $(this);
		var _idx = $(this).index();
		var _accessbility = '<span class="hide"> 선택됨</span>';
		//console.log(_this);
		if(!_this.hasClass('on')) {
			_this.addClass('on');
			_this.append(_accessbility);
		} else {
			_this.removeClass('on');
			_this.children('span.hide').remove();
		}
	});

	/* 검색Box 활성 */
	
	$(".searchBox .schBtn").click(function() {
		var _this = $(this);
		if($('.searchResultBox').length){
			if(_this.parent().siblings('.searchResultBox').hasClass('on')){
				$('.searchResultBox');
			} else {
				$('.searchResultBox').addClass('on');
			}
		}
	});
	$(".searchResultBox > .btn > a").click(function() {
		var _this = $(this);
		_this.parents('.searchResultBox').removeClass('on');
	});


	/* 차량번호 선택 */
	$(".tabChois > a").click(function() {
		var _this = $(this);
		var idx = $(this).index();
		$(".tabChois").removeClass('on');
		_this.append(_accessbility).addClass('on').siblings().removeClass('on').children('.hide').remove();
		
		if($('.tabOpen').length > 0) {
			$('.tabOpen').eq(idx).attr('aria-hidden' , false).show().siblings('.tabOpen').attr('aria-hidden' , true).hide();
		}
		// return false;
	});
	/* 삭제된 페이지
	$(".tabLiChois > li > a").click(function() {
		var _this = $(this);
		var idx = $(this).parent().index();
		_this.parent().addClass('on').siblings().removeClass('on');
		
		if($('.tabOpen').length > 0) {
			$('.tabOpen').eq(idx).attr('aria-hidden' , false).show().siblings('.tabOpen').attr('aria-hidden' , true).hide();
		}
		return false;
	});
	$(".ChkChois > li > div > a").click(function() {
		var _this = $(this);
		var idx = $(this).parent().parent().index();
		$(".ChkChois > li").removeClass('on');
		_this.parent().parent().addClass('on').siblings().removeClass('on');
		return false;
	});
	*/
	/* 운전자보험 차량상세정보*/
	$(".radioChois li > a").click(function() {
		var _this = $(this);
		//var _href = $(this).attr('href');
		var idx = $(this).parent().index();
		$(".ChkChois > li").removeClass('on');
		_this.parent().addClass('on').siblings().removeClass('on');
	});

	/* 차량종류 선택 Tab  삭제된 페이지
	$(".carTypCatList > li > a").click(function() {
		var _this = $(this);
		var idx = $(this).parent().index();
		$(".carTypCatList > li").removeClass('on');
		_this.parent().addClass('on');
		return false;
	});
	*/
	/* 자동차 검색 결과   삭제된 페이지
	$(".searchResult > a").click(function() {
		var _this = $(this);
		if(!_this.hasClass('on')) {
			_this.addClass('on').siblings().removeClass('on');
		} else {
			_this.removeClass('on').siblings().removeClass('on');
		}
	});
	 */
	/* 담보내역 버튼 */
	// $(".btnList > a").click(function() {
	// 	var _this = $(this);
	// 	if(!_this.hasClass('on')) {
	// 		_this.addClass('on').siblings().removeClass('on');
	// 	} else {
	// 		_this.removeClass('on').siblings().removeClass('on');
	// 	}
	// });

	/* 차량운전자 범위 선택 showhide */
	$(".noCheckList > a").click(function() {
		var _this = $(this);
		var _idx = $(this).index();
		var _parent = $(this).parent();

		if(!_this.hasClass('on')) {
			_this.append(_accessbility).addClass('on').siblings().removeClass('on').children('span.hide').remove();
			//_this.children('span.hide').text("선택");
		} else {
			_this.removeClass('on').children('span.hide').remove().siblings().removeClass('on').children('span.hide').remove();
			//_this.children('span.hide').text("");
		}
		
		if(_this.parent('.inputChois').length) {
			_parent.siblings('.inputWrap').eq(_idx).show().siblings('.inputWrap').hide();
		}
		if($('.tabOpen').length) {
			$('.tabOpen').eq(_idx).attr('aria-hidden' , false).show().siblings('.tabOpen').attr('aria-hidden' , true).hide();
		}
		return false;
	});

	/* 차량 범위 선택 */
	
	$(".btnCheck a").click(function() {
		var _this = $(this);
		if(!_this.parents('li').hasClass('on')) {
			_this.parents('li').addClass('on').siblings().removeClass('on');
			_this.siblings().removeClass('on');
		} 
		
	});

	$(".changeon").click(function() {
		var _this = $(this).parent().parent();
		_this.removeClass('on').addClass('on').siblings().removeClass('on');
	});

	$(".addOn").click(function() {
		var _this = $(this).parent().parent();
		if(!_this.hasClass('on')) {
			_this.addClass('on');
		} else {
			_this.removeClass('on');
		}
	});

	/* 차량 범위 선택 showhide */
	
	$(".carBtnWarp .itemListN3 li a").click(function() {
		var _this = $(this);
		var _target = $('.carAttList');
		var _imgUrl = $('#drvPic');
		var _targetCont = $('.carAttCont');
		var _parent = $(this).parent();
		var idx = _parent.index();
		var _accessbility = '<em class="hide"> 선택됨</em>';
		if(_parent.hasClass('on')) {
			_this.append(_accessbility).parent('li').addClass('on').siblings().removeClass('on').children('em.hide').remove();
			_targetCont.addClass('on')
			// 본인 : .pos_me , 배우자 : .pos_spouse , 나의부모 : pos_parent_left, 배우자의 부모 : pos_parent_right, 자녀+자녀의배우자 : pos_child, 지정1인 : pos_strainger 
			// idx 0 : 본인 (남자인 경우), 
			// idx 0 : 본인 (여자인 경우),
			//1:부부 (본인+배우자), 
			//2: 가족 : (본인 + 배우자 + 나의부모 + 배우자의부모 + 자녀 + 자녀배우자), 
			//3: 본인+지정1인 (본인 + 지정1인), 
			//4 : 부부+지정1인 (본인 + 배우자 + 지정1인), 
			//5:운전자 제한없음 (본인 + 배우자 + 나의부모 + 배우자의부모 + 자녀 + 자녀배우자 + 지정자 1인)
			_imgUrl.attr('class','bg_driverPic'+idx)
			$('.drvMember').find('> li').removeClass('on').attr('aria-hidden' , true); 
			if(!$('.carViewMemberBox').hasClass('on')) { 
				$('.carViewMemberBox').addClass('on');
				$('.carViewNameDesc').html('운전자 범위를 선택해주세요');
			}
			if(idx==0){
				$('.pos_me').addClass('on').attr('aria-hidden' , false); 
				$('.carAttType').removeClass('on');
				_targetCont.removeClass('on');
				$('.carViewNameDesc').html('만 N세 이상 본인 한정')
			} /*본인 남자*/
			if(idx==1){
				$('.pos_me').addClass('on').attr('aria-hidden' , false); 
				$('.pos_spouse').addClass('on').attr('aria-hidden' , false); 
				$('.carAttType').removeClass('on');$('.carAtt2').addClass('on');
				$('.carViewNameDesc').html('만 N세 이상 부부 한정')
			} /*부부*/
			if(idx==2){
				$('.pos_me').addClass('on').attr('aria-hidden' , false); 
				$('.pos_spouse').addClass('on').attr('aria-hidden' , false); 
				$('.pos_parent_left').addClass('on').attr('aria-hidden' , false); 
				$('.pos_parent_right').addClass('on').attr('aria-hidden' , false); 
				$('.pos_child').addClass('on').attr('aria-hidden' , false); 
				$('.carAttType').removeClass('on');
				$('.carAtt4').addClass('on');
				$('.carViewNameDesc').html('만 N세 이상 가족 한정')
			} /*가족*/
			if(idx==3){
				$('.pos_me').addClass('on').attr('aria-hidden' , false); 
				$('.pos_strainger').addClass('on').attr('aria-hidden' , false); 
				$('.carAttType').removeClass('on');
				$('.carAtt1').addClass('on');
				$('.carViewNameDesc').html('만 N세 이상 본인 + 지정1인 한정')
			} /*본인+지정1인*/
			if(idx==4){
				$('.pos_me').addClass('on').attr('aria-hidden' , false); 
				$('.pos_spouse').addClass('on').attr('aria-hidden' , false); 
				$('.pos_strainger').addClass('on').attr('aria-hidden' , false); 
				$('.carAttType').removeClass('on');
				$('.carAtt1').addClass('on');$('.carAtt2').addClass('on');
				$('.carViewNameDesc').html('만 N세 이상 부부 + 지정1인 한정')
			} /*부부+지정1인*/
			if(idx==5){
				$('.pos_me').addClass('on').attr('aria-hidden' , false); 
				$('.pos_spouse').addClass('on').attr('aria-hidden' , false); 
				$('.pos_parent_left').addClass('on').attr('aria-hidden' , false); 
				$('.pos_parent_right').addClass('on').attr('aria-hidden' , false); 
				$('.pos_strainger').addClass('on').attr('aria-hidden' , false); 
				$('.pos_child').addClass('on').attr('aria-hidden' , false); 
				$('.carAttType').removeClass('on');
				$('.carAtt5').addClass('on');
				$('.carViewNameDesc').html('전 연령 운전자 제한 없음')
			} /*운전자 제한 없음*/
		} else {
			_this.children('.hide').remove();
			_parent.removeClass('on');
			_imgUrl.attr('class','bg_driverPic')
			$('.drvMember').find('> li').removeClass('on').attr('aria-hidden' , true); 
			_targetCont.removeClass('on')
			 $('.carAttType').removeClass('on');
		}
	});
	/* 차량 상세정보 입력 */
	$('.blackboxOption .btn a').click(function (e) {
		var _this = $(this);
		if(!_this.hasClass('on')) {
			$(this).addClass('on').parent().siblings().find('a').removeClass('on');
		} else {
			$(this).removeClass('on').parent().siblings().find('a').removeClass('on');
		}
	});

	$(".subTreeBtnOne").click(function() {
	//$(document).on('click','.subTreeBtnOne',function() {
		if(!$('.subTreeBtnOrgBg').hasClass('up')) {
			$('.subTreeBtnOrgBg').addClass('up');
			$('.subTreeBtnBg').text('하위컨텐츠 닫기');
			$('.subSale').addClass('on');
		} else {
			$('.subTreeBtnOrgBg').removeClass('up');
			$('.subTreeBtnOrgBg').text('하위컨텐츠 열기');
			$('.subSale').removeClass('on');
		}
		return false;
	});
	//상단 자세히펼침 부분
	/*

	$(".subConOpen").click(function() {
		if (!$(this).parent('.accodion').length > 0 || !$(this).parent().parent('.accodion').length > 0 || !$(this).parent('.accodionPo').length > 0  || !$(this).parent().parent('.accodionPo').length > 0 ) {
			console.log('aaaaaa');
			if(!$(this).hasClass('up')) {
				$(this).addClass('up');
				$(this).children('em').text('하위컨텐츠 닫기');
				if($(this).parent().siblings('.dataDetail').length){$(this).parent().siblings('.dataDetail').attr('aria-hidden' , false).addClass('on');}
				if($(this).siblings('.dataDetail').length){$(this).siblings('.dataDetail').attr('aria-hidden' , false).addClass('on');}
				$(this).siblings('.dataDetail').attr('aria-hidden' , false).addClass('on');
			} else {
				$(this).removeClass('up');
				$(this).children('em').text('하위컨텐츠 열기');
				if($(this).parent().siblings('.dataDetail').length){$(this).parent().siblings('.dataDetail').attr('aria-hidden' , true).removeClass('on');}
				if($(this).siblings('.dataDetail').length){$(this).siblings('.dataDetail').attr('aria-hidden' , true).removeClass('on');}
			}
			return false;
		} else {
			console.log('bbbbbb');
		}
	});
	*/
	/* 공통 날자선택 팝업 */

	$(".dateSelectTabWrap > ul > li > a").click(function() {
		var _target = $('#calendarWrap');
		var idx =  $(this).parent().index();
		if(!$(this).hasClass('on')) {
			//console.log(eq());
			$(this).append(_accessbility).addClass('on').parent().siblings().find('a').removeClass('on').children('em.hide').remove();
			if(idx == 0 ) {
				_target.attr('class','startdata');
			} else {
				_target.attr('class','enddata');
				$('.todayYmd').hide();
			}
		}
	});
	$(".calendar > li > a").click(function() {
		var _targetA = $('.calendar > li > a');
		var _accessbility = '<em class="hide"> 선택됨</em>';
		if(!$(this).hasClass('on')) {
			_targetA.removeClass('on').children('em.hide').remove();
			//$(this).addClass('on');
			$(this).append(_accessbility).addClass('on');

		}
	});

	/* 다중 선택 */
	$("a.allAgr02").click(function() {
		var _this = $(this);
		if(!_this.hasClass('on')) {
			_this.addClass('on');
			if($('.radioChois').length > 0) {
				$('.radioChois > ul').each(function() {
					$(this).find('li').children('a').children('.hide').remove();
					$(this).find('li').first().addClass('on').children('a').append(_accessbility).parent().siblings().removeClass('on');
				});
			}
		} else {
			_this.removeClass('on');
			if($('.radioChois').length > 0) {
				$('.radioChois > ul').each(function() {
					$(this).find('li').removeClass('on').children('a').children('.hide').remove();
					//$(this).find('li').first().removeClass('on').children('a').children('.hide').remove();
				});
			}
		}
	});
	$(".radioChois > ul > li > a").click(function() {
		var _this = $(this);
		var _parent = $(this).parent();
		if(!_this.parent().hasClass('on')) {
			_this.append(_accessbility).parent().addClass('on').siblings().removeClass('on').find('.hide').remove();
		} else {
			_parent.removeClass('on').children('a').children('.hide').remove();
		}
	});
	/* 운전자보험 차량상세정보*/
	/*
	$(".radioChois li > a").click(function() {
		var _this = $(this);
		//var _href = $(this).attr('href');
		var idx = $(this).parent().index();
		$(".ChkChois > li").removeClass('on');
		if(!_this.parent().hasClass('on')) {
			_this.append(_accessbility).parent().addClass('on').siblings().removeClass('on').find('.hide').remove();
		}
	});
	*/

	/* //디자인 체크박스 */

	$(".logTabChois > ul > li > a").click(function() {
		var _target = $(this).parent().parent();
		if(_target.siblings('.logTabChoisBox').length >= 0) {
			if($(this).hasClass('tabChois')) {
				if(!$(this).parent().hasClass('on')) {
					$(this).parent().addClass('on');
					_target.siblings().addClass('on');
				} else {
					$(this).parent().removeClass('on');
					_target.siblings().removeClass('on');
				}
			} else {
				$(this).parent().siblings().removeClass('on');
				_target.siblings().removeClass('on');
			}
			//return false;
		};
	});
	
	/* 상단 고정 아코디언 */
	/*
	$(".accodion a.subConOpen, .accodionPo a.subConOpen").click(function() {
		if(!$(this).hasClass('up')) {
			$('a.subConOpen').addClass('up').children('em').text('하위컨텐츠 닫기');
			if($('.accodion .dataDetail').length > 0 && $('.accodionPo .dataDetail').length > 0 ){
				$('.accodion .dataDetail ,.accodionPo .dataDetail').attr('aria-hidden' , false).addClass('on');
			}
		} else {
			$('a.subConOpen').removeClass('up').children('em').text('하위컨텐츠 열기');
			if($('.accodion .dataDetail').length > 0 &&  $('.accodionPo .dataDetail').length > 0 ){
				$('.accodion .dataDetail ,.accodionPo .dataDetail').attr('aria-hidden' , true).removeClass('on'); 
			}
		}
		return false;
	});
	*/

	$(window).on('scroll touchmove touchend' , function(e){
		// 자동차보험 보험가입가이드 4번째 되면 하단 버튼 class on 추가
		$('.guideInBox1 .slick-dots > li').each(function() {
			var _maxIdx = $('.slick-dots > li').length;
			if($('.guideInBox1 .slick-dots > li').eq(_maxIdx -1).hasClass('slick-active')) {
				$('.btnWrap > a').addClass('on');
			} else {
				$('.btnWrap > a').removeClass('on');
			}
		})
		$('.slick-dots > li').each(function () {
			$(this).children('button').find('.hide').remove();
			if($(this).hasClass('slick-active')) {
				$('.slick-dots > li').children('button').children('.hide').remove();
				$(this).find('button').append(_accessbility);
			}
		});
		/*
		if($('.accodion').length > 0 && $('.accodionPo').length > 0) {
			var el = $('body');
			var scrollTop = $(window).scrollTop();
			var elPosition = el.find('.accodion').offset().top;
			if(scrollTop - elPosition > 5){
				el.find('.accodionPo').addClass('fixed');
				$('.accodion > .dataDetail , .accodionPo > .dataDetail').removeClass('on');
				$('.accodion .subConOpen, .accodionPo .subConOpen').removeClass('up');
			}
			else{
				el.find('.accodionPo').removeClass('fixed');
			}
		};
		
		if($('.poTop').length > 0) {
			var el = $('body');
			var scrollTop = $(window).scrollTop();
			var elPosition = el.find('.poTop').offset().top;
				if(scrollTop - elPosition > 0){
					el.find('.poTopPo').addClass('fixed');
				}
				else{
					el.find('.poTopPo').removeClass('fixed');
				}
		};
		*/
	});


	/* 부가담보 아코디언 */
	
	$(".addCollat .infoBox > a").click(function() {
		var _this = $(this);
		if(!_this.parents('li').hasClass('on')) {
			_this.parents('li').addClass('on').siblings().hide();
			_this.find('em.hide').text('하위컨텐츠 열기');
		} else {
			_this.parents('li').removeClass('on').siblings().show();
			_this.find('em.hide').text('하위컨텐츠 닫기');
		}
		
	});
	
});


