/* ***************************************************************************
 * 2017-08-30 18:00		                                              *
 * ************************************************************************* */

	 
	 
	 
$(document).ready(function () {
	$('.inputWrap input[readonly="readonly"]').each(function () {
		$(this).next('label').css({color:'#999', top:'7px'});
	});
});

$(document).ready(function () {
	//체크 콘텐츠(용례 : 약관동의)
	$('.agreeCtr .allAgr').each(function () {
		$(this).click(function (e) {
			e.preventDefault();

			if ( $(e.target).parents('.agreeCtr').is('.on') ) {
				$(e.target).parents('.agreeCtr').removeClass('on');
				$(e.target).parents('.agreeCtr').next('.termCont').find('input').removeAttr('checked');

				$(e.target).parents('.agreeCtr').find('.btnView').removeClass('act');
				$(e.target).parents('.agreeCtr').find('.btnView .state').text('약관 닫기');
				$(e.target).parents('.agreeCtr').next('.termCont').attr('aria-hidden' , false).show();

				//if($(e.target).next('.whiteBox').lenght){$(e.target).next('.whiteBox').find('a').removeClass('on');}
			} else {
				$(e.target).parents('.agreeCtr').addClass('on');
				$(e.target).parents('.agreeCtr').next('.termCont').find('input').attr('checked','checked');

				$(e.target).parents('.agreeCtr').find('.btnView').addClass('act');
				$(e.target).parents('.agreeCtr').find('.btnView .state').text('약관 보기');
				$(e.target).parents('.agreeCtr').next('.termCont').attr('aria-hidden' , true).hide();

				//if($(e.target).next('.whiteBox').lenght){$(e.target).next('.whiteBox').find('a').addClass('on');}
			}
		});
	});
	
	//체크 콘텐츠(용례 : 약관동의)
	$('.agreeCtr .radioBtn.allAgree input').each(function () {
		$(this).click(function (e) {

			if ( $(e.target).val() != "Y" ) {
				$(e.target).parents('.agreeCtr').find("input:radio[value=N]").prop("checked", true);	// 미동의 체크
				$(e.target).parents('.agreeCtr').find("input:radio[value=Y]").prop("checked", false);
				
				$(e.target).parents('.agreeCtr').removeClass('on');
				$(e.target).parents('.agreeCtr').next('.termCont').find('input').removeAttr('checked');

				$(e.target).parents('.agreeCtr').find('.btnView').removeClass('act');
				$(e.target).parents('.agreeCtr').find('.btnView .state').text('약관 닫기');
				$(e.target).parents('.agreeCtr').next('.termCont').attr('aria-hidden' , false).show();

				//if($(e.target).next('.whiteBox').lenght){$(e.target).next('.whiteBox').find('a').removeClass('on');}
			} else {
				$(e.target).parents('.agreeCtr').find("input:radio[value=Y]").prop("checked", true);	// 동의 체크
				$(e.target).parents('.agreeCtr').find("input:radio[value=N]").prop("checked", false);
				
				$(e.target).parents('.agreeCtr').addClass('on');
				$(e.target).parents('.agreeCtr').next('.termCont').find('input').attr('checked','checked');

				$(e.target).parents('.agreeCtr').find('.btnView').addClass('act');
				$(e.target).parents('.agreeCtr').find('.btnView .state').text('약관 보기');
				$(e.target).parents('.agreeCtr').next('.termCont').attr('aria-hidden' , true).hide();

				//if($(e.target).next('.whiteBox').lenght){$(e.target).next('.whiteBox').find('a').addClass('on');}
			}
		});
	});

	$('.agreeCtr .btnView').each(function () {
		$(this).click(function (e) {
			e.preventDefault();

			if ( $(e.target).parents('.btnView').is('.act') ) {
				$(e.target).parents('.btnView').removeClass('act');
				$(e.target).parents('.btnView').find('.state').text('약관 닫기');
				$(e.target).parents('.agreeCtr').next('.termCont').attr('aria-hidden' , false).show();
			} else {
				$(e.target).parents('.btnView').addClass('act');
				$(e.target).parents('.btnView').find('.state').text('약관 보기');
				$(e.target).parents('.agreeCtr').next('.termCont').attr('aria-hidden' , true).hide();
			}
		});
	});

	$('.termCont').each(function () {
		var _idx = $('.termCont').children('li').size();
		//console.log(_idx)
		if (_idx > 1) {
			$('.termCont input').each(function () {
				$(this).click(function (e) {
					var itemSize = $(e.target).parents('.termCont').children('li').size();
					var checkedSize = $(e.target).parents('.termCont').find('input:checked').size();

					if ( itemSize == checkedSize ) {
						$(e.target).parents('.termCont').prev('.agreeCtr').addClass('on');
						$(e.target).parents('.termCont').prev('.agreeCtr').children('.btnView').addClass('act');
						$(e.target).parents('.termCont').prev('.agreeCtr').children('.btnView').find('.state').text('약관 닫기');
						$(e.target).parents('.termCont').attr('aria-hidden' , true).hide();
					} else if ( itemSize > checkedSize ) {
						$(e.target).parents('.termCont').prev('.agreeCtr').removeClass('on');
						$(e.target).parents('.termCont').prev('.agreeCtr').children('.btnView').removeClass('act');
						$(e.target).parents('.termCont').prev('.agreeCtr').children('.btnView').find('.state').text('약관 보기');
						$(e.target).parents('.termCont').attr('aria-hidden' , false).show();
					}
				});
			});
		}
	});
	
	//체크 콘텐츠(용례 : 약관동의) 2017-11-02 -------------------------------------------
	$('.agreeCtr01 .allAgr').each(function () {
		$(this).click(function (e) {
			e.preventDefault();

			if ( $(e.target).parents('.agreeCtr01').is('.on') ) {
				$(e.target).parents('.agreeCtr01').removeClass('on');
				$(e.target).parents('.agreeCtr01').next('.termCont, .termCont_rdo').find('input').removeAttr('checked');

				$(e.target).parents('.agreeCtr01').find('.btnView').removeClass('act');
				$(e.target).parents('.agreeCtr01').find('.btnView .state').text('약관 닫기');
				$(e.target).parents('.agreeCtr01').next('.termCont, .termCont_rdo').attr('aria-hidden' , false).show();

				//if($(e.target).next('.whiteBox').lenght){$(e.target).next('.whiteBox').find('a').removeClass('on');}
			} else {
				$(e.target).parents('.agreeCtr01').addClass('on');
				$(e.target).parents('.agreeCtr01').next('.termCont').find('input').attr('checked','checked');
				$(e.target).parents('.agreeCtr01').next('.termCont_rdo').find('input:even').attr('checked','checked');

				$(e.target).parents('.agreeCtr01').find('.btnView').addClass('act');
				$(e.target).parents('.agreeCtr01').find('.btnView .state').text('약관 보기');
				$(e.target).parents('.agreeCtr01').next('.termCont, .termCont_rdo').attr('aria-hidden' , true).hide();

				//if($(e.target).next('.whiteBox').lenght){$(e.target).next('.whiteBox').find('a').addClass('on');}
			}
		});
	});

	$('.agreeCtr01 .btnView').each(function () {
		$(this).click(function (e) {
			e.preventDefault();

			if ( $(e.target).parents('.btnView').is('.act') ) {
				$(e.target).parents('.btnView').removeClass('act');
				$(e.target).parents('.btnView').find('.state').text('약관 닫기');
				$(e.target).parents('.agreeCtr01').next('.termCont, .termCont_rdo').attr('aria-hidden' , false).show();
			} else {
				$(e.target).parents('.btnView').addClass('act');
				$(e.target).parents('.btnView').find('.state').text('약관 보기');
				$(e.target).parents('.agreeCtr01').next('.termCont, .termCont_rdo').attr('aria-hidden' , true).hide();
			}
		});
	});
	//--------------------------------------------------------------------------------------
});

function fnResize() {
	var deviceW = $(window).width();
	var deviceH = $(window).height();

	//.listtype2 타입에서의 버튼-세로 위치 재설정
	$('.listtype2 .bttn').each(function () {
		var btnH = $(this).height();
		var listH = $(this).parents('li').height();
		var mgt = ( 0.5 * btnH ) * -1;
		var txtLeng = $(this).children('span').text().size;

		if ( btnH > listH ) {
			$(this).parents('li').css('height', btnH + 'px');
			$(this).css('marginTop', mgt + 'px');
		} else if ( btnH < listH ) {
			$(this).parents('li').css('height', 'auto');
			$(this).css('marginTop', mgt + 'px');
		} else {
			$(this).parents('li').css('height', btnH + 'px');
			$(this).css('marginTop', '0');
		}
	});

	/* ***************************************************************************
	 * 버튼형 선택                                                               *
	 * ************************************************************************* */
	var maxBoxH = 130;
	var minBoxH = 61;
	var minBoxH2 = 90;
	
	$('.itemPack').each(function () {
		/* 
		 * 공통 기본형
		 */
		var liObj = $('.itemPack ul.itemListN1 > li:nth-child(1), .itemPack ul.itemListN2 > li:nth-child(1), .itemPack ul.itemListN2 > li:nth-child(2), .itemPack ul.itemListN3 > li:nth-child(1), .itemPack ul.itemListN3 > li:nth-child(2), .itemPack ul.itemListN3 > li:nth-child(3), .itemPack ul.itemListN3 > li:nth-child(4), .itemPack ul.itemListN3 > li:nth-child(5), .itemPack ul.itemListN3 > li:nth-child(6), .itemPack ul.itemListN3 > li:nth-child(7), .itemPack ul.itemListN3 > li:nth-child(8), .itemPack ul.itemListN3 > li:nth-child(9), .itemPack ul.itemListN3 > li:nth-child(10), .itemPack ul.itemListN3 > li:nth-child(11), .itemPack ul.itemListN3 > li:nth-child(12), .itemPack ul.itemListN4 > li:nth-child(1), .itemPack ul.itemListN4 > li:nth-child(2), .itemPack ul.itemListN4 > li:nth-child(3), .itemPack ul.itemListN4 > li:nth-child(4), .itemPack ul.itemListN5 > li:nth-child(1), .itemPack ul.itemListN5 > li:nth-child(2), .itemPack ul.itemListN5 > li:nth-child(3), .itemPack ul.itemListN5 > li:nth-child(4), .itemPack ul.itemListN5 > li:nth-child(5)');

		var itemsize = $(this).find('li').size();
		var maxH, itemH;
		var arrayH = [];

		for (var n = 0;n < itemsize;n++) {
			itemH = $(this).find('li').eq(n).height();
			arrayH.push(itemH);
		}

		maxH = Math.max.apply(null, arrayH);

		$(this).find('.cont').each(function () {
			var itempack = $(this).parents('.itemPack');
			var itempackCar = $(this).parents('.itemPack.itemCar');
			
			if ( maxH > maxBoxH ) {
				$(itempack).find('li').css('height', ( maxBoxH + 5 ) + 'px');
				$(itempack).find(liObj).css('height', maxBoxH + 'px');
				$(itempack).find('li > a').css('height', '100%');
			} else if ( maxH < minBoxH ) {
				$(itempack).find('li').css('height', ( minBoxH + 5 ) + 'px');
				$(itempack).find(liObj).css('height', minBoxH + 'px');
				$(itempack).find('li > a').css({height: '100%', padding: '0.1rem 0'});
			} else {
				$(itempack).find('li').css('height', ( maxH + 5 ) + 'px');
				$(itempack).find(liObj).css('height', maxH + 'px');
				$(itempack).find('li > a').css('height', '100%');
			}
			
			if ( maxH > maxBoxH ) {
				$(itempackCar).find('li').css('height', ( maxBoxH + 5 ) + 'px');
				$(itempackCar).find(liObj).css('height', maxBoxH + 'px');
				$(itempackCar).find('li > a').css('height', '100%');
			} else if ( maxH < minBoxH2 ) {
				$(itempackCar).find('li').css('height', ( minBoxH2 + 24 ) + 'px');
				$(itempackCar).find(liObj).css('height', minBoxH2 + 'px');
				$(itempackCar).find('li > a').css({height: '100%', padding: '0.1rem 0'});
			} else {
				$(itempackCar).find('li').css('height', ( maxH + 5 ) + 'px');
				$(itempackCar).find(liObj).css('height', maxH + 'px');
				$(itempackCar).find('li > a').css('height', '100%');
			}		
		});

		/* 연관컨텐츠 추가 : 비활성화상태의 버튼구조에도 버튼타입의 height설정을 적용함.
		(용례:자동차보험 > 자녀할인 특약(만 6세 이하),ECO마일리지 특약) */
		var disabledBtnH = $(this).find('li').height();
		
		if ( $(this).next('.btnDisable') ) {
			$(this).next('.btnDisable').find('span').css('height', disabledBtnH + 'px');
		}
	});
}


$(document).ready(function(){	
	//상단 자세히펼침 부분
	$('.subConOpen').addClass('up');
	$('.dataDetail').addClass('on');
	
	$('.subConOpen').each(function(){
		if($(this).children('em').length == 0){
			$(this).append('<em>접기</em>');
		}
	});
	
	$(".subConOpen").click(function() {		
		if(!$(this).hasClass('up')) {
			$(this).addClass('up').attr('aria-hidden' , false);
			if($(this).children('em').length == 0){
				$(this).append('<em>접기</em>');
			}
			$(this).children('em').text('접기');			
			$('.dataDetail').attr('aria-hidden' , false).addClass('on');
			
		} else {
			$(this).removeClass('up').attr('aria-hidden' , true);
			if($(this).children('em').length == 0){
				$(this).append('<em>접기</em>');
			}
			$(this).children('em').text('펼치기');		
			$('.dataDetail').attr('aria-hidden' , true).removeClass('on');	
		}
		return false;	
	});	
	
	/*$(".accodion > .subConOpen").click(function() {		
		if(!$('.subConOpen').hasClass('up')) {
			$('.subConOpen').addClass('up').children('em').text('하위컨텐츠 닫기');	
			$('.dataDetail').attr('aria-hidden' , false).addClass('on');
		} else {
			$('.subConOpen').removeClass('up').children('em').text('하위컨텐츠 열기');	                                                                                                                                                                                                                                                                                                                                                                  
			$('.dataDetail').attr('aria-hidden' , true).removeClass('on');
		}
		return false;
	});*/
})


	

//resize
$(window).resize(function () {
	fnResize();
});

$(document).ready(function(){
	fnRadioBox();
	fnResize(); //resize 함수 호출
});

$(document).ready(function(){
	/* 
	 * 버튼형 선택
	 */
	$('.itemPack').each(function () {
		
		if ($(this).next().is('.itemContWrap')) {
			// 단일선택이고 버튼을 선택하면 선택 컨텐츠를 노출하는 경우
		
			$(this).find('li > a').click(function (e) {
				var itemIdx = $(e.target).parents('li').index();
				var itemContWrap = $(e.target).parents('.itemPack').next('.itemContWrap');
				
				if ($(e.target).parents('li').is('.on')) {
					$(e.target).children('span.hide').remove().parents('li').removeClass('on');
					$(e.target).parents('li').siblings().removeClass('on').children('a').find('span.hide').remove();
					if (!$(itemContWrap).hasClass('pl')) {
						$(itemContWrap).children('div').eq(itemIdx).attr('aria-hidden' , true).removeClass('on');
						$(itemContWrap).children('div').eq(itemIdx).siblings().attr('aria-hidden' , true).removeClass('on');
					}
				} else {
					$(e.target).append(_accessbility).parents('li').addClass('on');
					$(e.target).parents('li').siblings().removeClass('on').children('a').find('span.hide').remove();
					if (!$(itemContWrap).hasClass('pl')) {
						$(itemContWrap).children('div').eq(itemIdx).attr('aria-hidden' , false).addClass('on');
						$(itemContWrap).children('div').eq(itemIdx).siblings().attr('aria-hidden' , true).removeClass('on');
					}
				}
			});
		} else { 	
			var _accessbility = '<span class="hide"> 선택됨</span>';		
			$(this).find('li > a').click(function (e) {
				//다중선택
				if ( $(e.target).parents('.itemPack').is('.pl') ) {
					if ( !$(this).parents('li').is('.on') ) {
						
						$(this).append(_accessbility).parents('li').addClass('on');
					} else {
						$(this).find('span.hide').remove();
						$(this).parents('li').removeClass('on');
					}
				//단일선택
				} else {
					if ( !$(this).parents('li').is('.on') ) {
						$(this).append(_accessbility).parents('li').addClass('on').siblings('li').removeClass('on').children('a').find('span.hide').remove();
					} else {
						$(this).find('span.hide').remove();
						$(this).parents('li').removeClass('on');
					}
				}
			});
		}
	});
});

// input radio 
	function fnRadioBox() {
	var _rdi = $('.gender span');
	_rdi.click(function(){
		var _name = $(this).find('input').attr('name');
		var _radio = $('.gender span  input[name$='+_name+']');
		var _index = _radio.parent().index(this);
		
		_radio.each(function(index, value){
			if(_index == index){
				$(this).checked = true;
				$(this).parent().removeClass('off').addClass('on');
			} else {
				$(this).checked = false;
				$(this).parent().removeClass('on').addClass('off');
			};
		});
	});		

	var _rdi = $('.radioBox span');
	_rdi.click(function(){
		var _name = $(this).find('input').attr('name');
		var _radio = $('.radioBox span  input[name$='+_name+']');
		var _index = _radio.parent().index(this);
		
		_radio.each(function(index, value){
			if(_index == index){
				$(this).checked = true;
				$(this).parent().removeClass('off').addClass('on');
			} else {
				$(this).checked = false;
				$(this).parent().removeClass('on').addClass('off');
			};
		});
	});
}



$(document).ready(function(){
	// $("input").focus(function() {
	// 	$(this).val("").css({'color':'#333', 'font-weight':'bold'});		
	// });

	// 버튼클릭 하위컨텐츠 노출
	// $(".subContBtnOne").click(function() {	
	//	if(!$('.subBtnBg').hasClass('up')) {
	//		$('.subBtnBg').addClass('up');
	//		$('.subBtnBg').text('하위컨텐츠 닫기');
	//		$('.dataDetail').attr('aria-hidden' , false).addClass('on');
	//	} else {
	//		$('.subBtnBg').removeClass('up');
	//		$('.subBtnBg').text('하위컨텐츠 열기');
	//		$('.dataDetail').attr('aria-hidden' , true).removeClass('on');
	//	}
	//	return false;
	// });
	
	//아코디언 tab
	if($('.tabBox').length){
		/*
		$('.tabBox .toggleTitle a').click(function(e){
			if($(this).parent().parent().parent().find('.tabBox.open').length) {
				$(this).parent().parent().parent().parent().find('.btnAllTog').text('모두 열기');
			}

			if($(this).parent().parent().hasClass('open') == true) {
				$(this).parent().parent().removeClass('open');
				
			} else {
				$(this).parent().parent().parent().find('div').removeClass('open');
				$(this).parent().parent().addClass('open');
			}
			return false;
		});
		*/
		$('.tabBox > .toggleTitle a').click(function(e){
			
			if($(this).parent().parent().parent().find('.tabBox.open').length) {
				$(this).parent().parent().parent().parent().find('.btnAllTog').text('모두 열기');
				$(this).find('.hide').text(' 하위콘텐츠 닫기')
			}

			if($(this).parent().parent().hasClass('open') == true) {
				$(this).parent().parent().removeClass('open');
				$(this).find('.hide').text(' 하위콘텐츠 열기')
			} else {
				$(this).parent().parent().parent().find('div').removeClass('open');
				$(this).parent().parent().addClass('open');
				$(this).find('.hide').text(' 하위콘텐츠 닫기')
			}
			return false;
		});
	}
	
	$('.btnAllTog').click(function(e){
		if($(this).parent().next().find('.tabBox').length == $(this).parent().next().find('.tabBox.open').length) {
			$(this).parent().next().find('div').removeClass('open');
			$(this).text('모두 열기');
			return false;
		} else{
			$(this).parent().next().find('.tabBox').addClass('open');
			$(this).text('모두 닫기');
			return false;
		}
	});
	//논리적인 탭 세팅 부분
	$('body').on('click', '.tabLogical .tabLink', function(){		
		$(this).parent().parent().find('div').removeClass('on');
		$(this).parent().addClass('on');		
	});

});

$(document).ready(function () {
	/* 버튼형 목록 (용례 : 인터넷 창구 > 긴급출동 서비스) */
	$('.itemMenu > li > a').each(function () {
		$(this).parents('li').find('.state').text('');

		$(this).on('click',function (e) {
			var idx = $(e.target).parents('li').index();

			$(e.target).parents('li').addClass('on');
			$(e.target).parents('li').siblings().removeClass('on');

			$(e.target).parents('li').find('.state').text('선택됨');
			$(e.target).parents('li').siblings().find('.state').text('');
		});
	});
});

$(document).ready(function () {
	//자녀할인 특약(만 6세 이하)
	//init
	$('.childrenInfo .itemPack').show();
	$('.childrenInfo .btnDisable').attr('aria-hidden' , true).hide();

	$('.childrenInfo .itemContWrap').children('div').eq(0).attr('aria-hidden' , false).show();
	$('.childrenInfo .itemContWrap').children('div').eq(1).attr('aria-hidden' , true).hide();

	$('.childrenOption .tabMenu > a').click(function (e) {
		if ( $(this).index() == '1' ) {
			//미가입 선택
			$('.childrenInfo .tabOpen').attr('aria-hidden' , true).hide();
			$('.childrenInfo .btnDisable').attr('aria-hidden' , false).show();
		} else {
			//가입 선택
			$('.childrenInfo .itemPack').show();
			$('.childrenInfo .btnDisable').attr('aria-hidden' , true).hide();
		}
	});

	$('.ecoOption .itemPack').show();
	$('.ecoOption .btnDisable').hide();
	$('.ecoOption .tabMenu > a').click(function (e) {
		if ( $(e.target).parents('a').index() == '1' ) {
			//미가입 선택
			$('.ecoOption .itemPack').hide();
			$('.ecoOption .btnDisable').attr('aria-hidden' , false).show();
		} else {
			//가입 선택
			$('.ecoOption .itemPack').show();
			$('.ecoOption .btnDisable').attr('aria-hidden' , true).hide();

		}
	});

	$('.childrenInfo .itemPack li > a').each(function () {
		$(this).on('click',function (e) {
			var idx = $(e.target).parents('li').index();
			var itemContWrap = $(e.target).parents('.itemPack').siblings('.itemContWrap');

			$(e.target).parents('li').addClass('on');
			$(e.target).parents('li').siblings().removeClass('on');

			if ( idx == 0 || idx == 1 ) {
				//정보 확인 보이기
				$(itemContWrap).children('div').eq(0).attr('aria-hidden' , false).show();
				$(itemContWrap).children('div').eq(1).attr('aria-hidden' , true).hide();
			} else if ( idx == 2 ) {
				//정보 입력 보이기
				$(itemContWrap).children('div').eq(0).attr('aria-hidden' , true).hide();
				$(itemContWrap).children('div').eq(1).attr('aria-hidden' , false).show();
			}
		});
	});
});

$(document).ready(function () {
	//선택콘텐츠 (용례 : 자동차 보험 - 부가담보 설정 팝업)
	$('.selectionPack .listBox .check').each(function () {
		var disableItem = $(this).find('input:disabled');
		$(disableItem).parents('li').css('color','#ccc');
	});

	$('.listBox .check').each(function () {
		var disableItem = $(this).find('input:disabled');
		$(disableItem).parents('li').children().css('opacity','0.4'); 
	});
	
	// $('.listBox .check').each(function () {
	// 	var disableItem = $(this).find('input:checked','input:disabled');
	// 	$(disableItem).parents('li').css('opacity','0.5'); 
	// });

	//선택 탭콘텐츠 보이기 (용례 : 자동차 보험 - 추천담보 설정하기 팝업) - 개발요청으로 주석처리(05/16) 
	var tabMenu = $('.tabWrap li > a');
	var onIdx = $('.tabWrap li.on').index();

	$('.tabWrap li').append('<span class="hide"></span>');
	$('.tabWrap li.on').children('span.hide').text('탭 활성');
	$('.tabContBox > .tabCont').eq(onIdx).css('display','block');

	$(tabMenu).on('click',function (e) {
		var idx = $(e.target).parents('li').index();

		$(e.target).parents('li').addClass('on');
		$(e.target).parents('li').siblings().removeClass('on');

		$(e.target).parents('li').children('span.hide').text('탭 활성');
		$(e.target).parents('li').siblings().children('span.hide').text('');

		$('.tabContBox > .tabCont').eq(idx).css('display','block');
		$('.tabContBox > .tabCont').eq(idx).siblings('.tabCont').css('display','none');
	});
});

$(document).ready(function () {
	// 용례 : 해외여행 보험 > 계약자정보 입력, ECO마일리지특약 - 사진등록
	$('.insuredList').each(function () {
		$(this).children('li').each(function () {
			var bttn = $(this).find('.bttn');

			$(bttn).click(function (e) {
				if ( $(e.target).parents('li').is('.on') ) {
					$(e.target).parents('li').removeClass('on').find('.formBox').attr('aria-hidden' , true);
				} else {
					$(e.target).parents('li').addClass('on').find('.formBox').attr('aria-hidden' , false);
					$(e.target).parents('li').siblings('li').removeClass('on').find('.formBox').attr('aria-hidden' , true);
				}
			});

			/* 활성화된 목록내부의 확인버튼은 개발단계에서 클릭이벤트로 바로 적용하지 않으므로 주석처리함.
			$(this).find('.formBox .btn > a').on('click',function (e) {
				$(e.target).parents('.formBox').attr('aria-hidden' , true);
				$(e.target).parents('li').removeClass('on');
			}); */
		});
	});

	//ECO마일리지특약 - 사진등록(입력영역이 보이기상태일때 사진등록의 사이즈를 재설정함.)
	$('.ecoSpec .insuredList li > .bttn').each(function () {
		$(this).click(function (e) {
			$('.pictureList > li').each(function () {
				var picW = $(this).width() - 5;
				var picH = picW * 0.71;

				$(this).children('.imgBox').css({width: picW + 'px', height: picH + 'px'});
				$(this).children('.imgBox').children('.sample').css({width: picW + 'px', height: picH + 'px'});
			});
		});
	});
});

/* 우편번호 검색 select */

$(document).ready(function() {
	$('.addBtn select').on('change', function() {
		var _this = $(this);
		var _val =  $(this).val();
		if (_val != null && _val != undefined && _val != '') {
			_this.addClass('on');
		} else {
			_this.removeClass('on');
		}

	});
});

$('.imageBtn a').click(function() {
		var _this = $(this);
		if(!_this.hasClass('on')) {
			$(this).addClass('on').siblings().find('a').removeClass('on');
		} else {
			$(this).removeClass('on').siblings().find('a').removeClass('on');
		}
	});



$(document).ready(function () {
	//.listtype2 타입에서의 버튼-세로 위치 재설정
	$('.listtype2 .bttn').each(function () {
		var btnH = $(this).height();
		var listH = $(this).parents('li').height();
		var mgt = ( 0.5 * btnH ) * -1 ;
		var txtLeng = $(this).children('span').text().size;

		if ( ( btnH + 20 ) > listH ) {
			$(this).parents('li').css('height', ( btnH + 20 ) + 'px');
			$(this).css('marginTop', mgt + 'px');
		} else if ( ( btnH + 20 ) < listH ) {
			$(this).parents('li').css('height', 'auto');
			$(this).css('marginTop', mgt + 'px');
		} else {
			$(this).parents('li').css('height', ( btnH + 20 ) + 'px');
			$(this).css('marginTop', '0');
		}
	});
});


/* 파일업로드 */
$(document).ready(function() {
	var fileuploader = $('.file_uploader'),
		filename;

	$(fileuploader).on('change', function () {
		filename = $(this).val();
		$('file_name').val(filename);
	});
});


/* layerPopup(dim layer type) 닫기 버튼 기능제어 */
$(document).ready(function() {
	$('.layerClose').each(function () {
		$(this).click(function (e) {
			$(e.target).parents('.layerPopup').css('opacity','0');
		});
	});
	$('.layerWrap .layerBtn > a').each(function () {
		$(this).click(function (e) {
			$(e.target).parents().parents('.layerPopup').css('opacity','0');
		});
	});
});

$(document).ready(function () {
	
	//앱 알림 설정 버튼	
	var setBtn = $('.appAlrim .btnSetting .bttn');
	
	
	$(setBtn).click(function (e) {
		if ( !$(e.target).parents('.btnSetting').is('.act') ) {
			$(e.target).parents('.btnSetting').addClass('act');
			

			$(e.target).animate({
				left: '2.3rem'
			},100);

			$(e.target).children('.state').text('설정됨');
		} else {
			$(e.target).parents('.btnSetting').removeClass('act');

			$(e.target).animate({
				left: '0'
			},100);

			$(e.target).children('.state').text('해제됨');
		}
	});

	//위치기반 서비스를 위한 약관 동의 버튼
	$('.gpsServ .bttn').click(function (e) {
		if ( !$(e.target).is('.on') ) {
			$(e.target).addClass('on');
			$(e.target).text('동의해제');
		} else {
			$(e.target).removeClass('on');
			$(e.target).text('동의하기');
		}
	});
	
});

//레이어팝업 show상태에서 body스크롤 방지
// 웹접근성 스크립트 추가  .layerPopup 비활성화 상태는 모두 .attr('aria-hidden' , true) 추가 한다.
$(document).ready(function () {
	var deviceW = $(window).width();
	var deviceH = $(window).height();
	var url, lpId, targetId;

	$('.layerPopup').each(function () {
		url = '#' + $(this).attr('id');
		$(this).css({opacity:'0'}).attr('aria-hidden' , true);

		$('a[href="' + url + '"]').attr('title','새창').click(function (e) {
			url = $(this).attr('href');
			
			targetId = $(this).attr('id');
			
			if ( targetId != null ) {
				$(this).attr('id',targetId);
				lpId = url;
				$(lpId).find('.layerClose').attr('href','#' + targetId);
			} else {
				$(this).attr('id','linker');
				lpId = url;
				$(lpId).find('.layerClose').attr('href','#linker');
			}

			$(lpId).css({opacity:'1'}).attr('aria-hidden' , false);
			$('html, body').css({overflow: 'hidden', width: deviceW + 'px', height: deviceH + 'px'});

			$(lpId).find('.layerClose').click(function (e) {
				$(e.target).attr('href','#none');
				
				if ( targetId != null ) {
					$('body').find('#' + targetId).focus();
				} else {
					$('body').find('#linker').focus().removeAttr('id');
				}
				
				$(e.target).parents('.layerPopup').css({opacity:'0'}).attr('aria-hidden' , true);
				$('html, body').css({overflow: 'scroll', width: '100%', height: '100%'});
			});
		});
	});
});

$(document).ready(function () {
	// 2017-06-28 접근성을 위하여 추가
	//var _accessbility = '<span class="hide"> 선택됨</span>';
	var _accessbilityup = '<span class="hide">하위메뉴 열기</span>';
	//전체메뉴

	$('.allMenuWrap .menuList li p.infoTxt').hide();
	$('.allMenuWrap .menuList li.hasOn p.infoTxt').show();
	
	/* 메인화면 시차 문제로 삭제 /202007
	$('.allMenuWrap').on('transitionend', function(){		  
		$('#h1Main').attr('aria-hidden' , true).css({'display':'none'});
		$('footer').attr('aria-hidden' , true).css({'display':'none'});
		$('.mainHeader > h1').attr('aria-hidden' , true).css({'display':'none'});
	 	$('.mainHeader > .btnAll').attr('aria-hidden' , true).css({'display':'none'});
	});*/
	
	$('.allMenuWrap .menuList > li').each(function () {
		
		if ( $(this).find('.submenuList').size() != 0 ) {
						
			$(this).addClass('has').children('a.dept01').append(_accessbilityup); // 수정 /202006
			$('.allMenuWrap .menuList > li').eq(0).removeClass('has').addClass('hasOn');
			
			if ( $(this).hasClass('hasOn')) {
				$(this).find('.hide').text('하위메뉴 닫기');
			}
		}

		$(this).children('a.dept01').click(function (e) {
			if ( $(e.target).parents('li').is('.has') ) {
				$(e.target).parents('li').addClass('hasOn').find('.hide').text('하위메뉴 열림'); // 수정 /202007
				$(e.target).parents('li').removeClass('has');

				var other = $(e.target).parents('li').siblings();
				
				$(other).each(function () {
					if ( $(this).find('.submenuList').size() != 0 ) {
						$(this).removeClass('hasOn').addClass('has').find('.hide').text('하위메뉴 열기'); // 수정 /202007
					} else {
						$(this).removeClass('has hasOn').find('.hide').text('하위메뉴 열기'); // 수정 /202007
					}
				});

				$(e.target).parents('li').find('.submenuList').show(); // 수정 /202006
				$(e.target).parents('li').find('.infoTxt').show();
				$(e.target).parents('li').siblings().find('.submenuList').hide();
				$(e.target).parents('li').siblings().find('.infoTxt').hide();
				
			} else if ( $(e.target).parents('li').is('.hasOn') ) {
							// hasOn 일 때 이벤트 삭제 /202006
				//$(e.target).parents('li').addClass('has').find('.hide').text('하위메뉴 열기');
				//$(e.target).parents('li').removeClass('hasOn');
				//$(e.target).parents('li').find('.submenuList').hide();
				//$(e.target).parents('li').find('.infoTxt').hide();
				//$(e.target).parents('li').siblings().find('.submenuList').hide();
				//$(e.target).parents('li').siblings().find('.infoTxt').hide();
			}
		});
	});

	// 보험상품 탭 /202006	
	fnInsuMenuTab();
	
	// 탭 선택 - // 202209 접근성
	function fnInsuMenuTab() {
		$('.insuMenu p a').each(function() {
			var _this = $(this);
			
			if (_this.parent().hasClass('on') == true) {	
				_this.attr('title','선택됨');
			} else {			
				_this.removeAttr('title');
			}
		});
	}
	// 탭 이벤트
	$('.insuMenu p a').click(function() {
		var _idx = $(this).parent('p').index();
		
		// 탭 선택
		$(this).parent().addClass('on').siblings().removeClass('on');
		fnInsuMenuTab(); // 접근성
		// 메뉴 열림	
		$('.insuListArea').eq(_idx).show().siblings('.insuListArea').hide();
		
		fnHasScroll(); // 세로 스크롤바 있을 때 /202006
	});	
	
	//메인 : 바로가기 메뉴
	var deviceW = $(window).width();
	var deviceH = $(window).height();

	$('.qmDim').css({width: deviceW + 'px', height: deviceH +'px'});

	/* $('.btnQm a').focus(function (e) {
		$(e.target).parents('.btnQm').css('outline','0.1rem dotted #f7f7f7');
	});

	$('.btnQm a').blur(function (e) {
		$(e.target).parents('.btnQm').css('outline','0');
	}); */

	$('.btnQm a').click(function (e) {
		
		if ( !$(e.target).is('.on') ) {
			if ( $('body').find('div.qmDim').size() == 0 ) {
				$('body').append('<div class="qmDim"></div>');
			} else {
				return false;
			}

			$('body').css({overflow: 'hidden', height: deviceH + 'px'});

			$(e.target).addClass('on');
			$(e.target).parents('.btnQm').find('.state').text('바로가기 메뉴 숨기기');
			$('#h1Main').attr('aria-hidden' , true);
			$('.mainHeader').attr('aria-hidden' , true);
			$('footer').attr('aria-hidden' , true);
			

			$('.listQm').css('display','block').animate({bottom: '0'},1,function () {
				$(this).children('.qm1').animate({
					marginTop: '0'
				},50,function () {
					$(this).children().css('color','rgba(255,255,255,1)');

					setTimeout(0,qmShow());
				});
			});
		} else {
			$(e.target).removeClass('on');
			$(e.target).parents('.btnQm').find('.state').text('바로가기 메뉴 보이기');

			qmHide();

			$('body').find('div.qmDim').remove();
			$('body').css({overflow: 'scroll', width: '100%', height: '100%'});
			$('.listQm').css({display: 'none'});
			$('#h1Main').attr('aria-hidden' , true);
		}
	});

	function qmShow() {
		$('.listQm > li.qm2').animate({
			marginTop: '0'
		},10,function () {
			$(this).children().css('color','rgba(255,255,255,1)');

			$('.listQm > li.qm3').animate({
				marginTop: '0'
			},10,function () {
				$(this).children().css('color','rgba(255,255,255,1)');

				$('.listQm > li.qmAll').animate({
					marginTop: '0'
				},10,function () {
					$(this).children().css('color','rgba(255,255,255,1)');
				});
			});
		});
	}

	function qmHide() {
		$('.listQm > li.qmAll').animate({
			marginTop: '5.1rem'
		},5,function () {
			$(this).children().css('color','rgba(255,255,255,0)');

			$('.listQm > li.qm3').animate({
				marginTop: '5.1rem'
			},5,function () {
				$(this).children().css('color','rgba(255,255,255,0)');

				$('.listQm > li.qm2').animate({
					marginTop: '5.1rem'
				},5,function () {
					$(this).children().css('color','rgba(255,255,255,0)');
					$('.listQm > li.qm1').animate({

						marginTop: '5.1rem'
					},5,function () {
						$(this).children().css('color','rgba(255,255,255,0)');
						$('.listQm').animate({bottom: '-5.1rem'},10,function () {
							$(this).css('display','none');
						});
					});
				});
			});
		});
	}
	
	$('li.qmAll > a').on('click', function(){	
		$('.menuList').css({display: 'none'});
		$('.qmallMenu').css({display: 'block'});
	});
	
	$('.titleBar > a').on('click', function(){
		$('.menuList').css({display: 'block'});
		$('.qmallMenu').css({display: 'none'});
	});
		
	/* 20170709 수정 */
	//var winH = $(window).height();
	$('.allMenuWrap').css({'height':deviceH+'px'});
	/* 2017-07-07 사이드 메뉴 처리 요청으로 주석
	var winHeight = $(window).height();	
	//$('.allMenuWrap').hide();
	//메뉴 show hide
	
	$('.allMenuWrap').css({'height':winH+'px'});
	$('.mainHeader .btnAll').on('click', function(){
		$('.allMenuWrap').fadeIn(500);
		$('.allMenuWrap > div').stop().animate({'scrollTop':'0'}, 10);
		$('#h1Main').css({'overflow':'hidden', 'height':winH+'px', 'position':'fixed', 'left':0,'top':0});
		$('.allMenuWrap').addClass('on').css({'right':'0'}).before('<div class="layerMask" id="layerMask" style="display:block" />');
		// $('.allMenuWrap').addClass('on').show().before('<div class="layerMask" id="layerMask" style="display:block" />');
		$('.quickMenu').hide();
		$('body').css({overflow: 'hidden', height: deviceH + 'px'}); //width: deviceW + 'px'
	});
	*/

	//$('body').css({overflowX: 'hidden', overflowY: 'scroll', width: '100%', height: '100%'});

	$('.mainHeader .btnAll, header .btnMenu').on('click', function(){
		$(this).attr('aria-expanded','true'); // 스크린리더에 메뉴 확장됨 알림 /202007
		
		//$('body').css({height: deviceH + 'px'});
		//웹접근성 .layerMask 포커스가 가지 않게 처리 aria-hidden="true" 추가
		$('.allMenuWrap').show(); //.before('<div class="layerMask" id="layerMask" aria-hidden="true" style="display:block" />');
		
		$('.menuList > li.has > .submenuList').hide();
		
		$('body').css({overflowX: 'hidden', overflowY: 'hidden', width: deviceW + 'px', height: deviceH + 'px'});
		$('.quickMenu').hide();
		$('.allMenuWrap').addClass('on').attr({'tabindex':'0', 'aria-hidden':'false'}); // 전체메뉴 열릴 때 첫번 째 메뉴에 포커스 - 접근성 /2007
		$('.allMenuWrap.on .hasOn > a').focus(); // 전체메뉴 열릴 때 첫번 째 메뉴에 포커스 - 접근성 /2007
		
		// 전체 메뉴 Open - 메인 화면 숨김 /202007
		$('#h1Main').attr('aria-hidden' , true).fadeOut('fast');
		$('footer').attr('aria-hidden' , true).fadeOut('fast');
		$('.mainHeader > h1').attr('aria-hidden' , true).fadeOut('fast');
	 	$('.mainHeader > .btnAll').attr('aria-hidden' , true).fadeOut('fast');
	 	
		/**
		setTimeout(function(){
			
			$('#h1Main').attr('aria-hidden' , false).css({'display':'none'});
		},100);
		**/
		setTimeout(function(){
			$('#layerMask').css({background:'#f6f6f6',opacity:'1'});
		},500);

		//전체메뉴 하위메뉴 목록 border 스타일 제어
		// $('.submenuList').each(function () {
		// 	var eachSize = $(this).children('li').size();

		// 	if ( eachSize % 2 == 0 ) {
		// 		$(this).children('li').eq(eachSize - 2).css('borderBottom','0');
		// 		$(this).children('li').eq(eachSize - 1).css('borderBottom','0');
		// 	} else if ( eachSize % 2 == 1 ) {
		// 		$(this).children('li').eq(eachSize - 1).css('borderBottom','0');
		// 	}
		// });

		/*2017-07-07 사이드 메뉴 처리 요청으로 주석
		$('.allMenuWrap > div').stop().animate({'scrollTop':'0'}, 10);
		$('#h1Wrap').css({'overflow':'hidden', 'height':winH+'px', 'position':'fixed', 'left':0,'top':0});
		$('.allMenuWrap').addClass('on').css({'right':'0'}).before('<div class="layerMask" id="layerMask" style="display:block" />');
		$('.menuList > li.has > .submenuList').hide();
		$('body').css({overflow: 'hidden', height: deviceH + 'px'}); //width: deviceW + 'px'
		*/
	});
	
	// 전체메뉴 열리면 한 번만 실행 /202006
	$('.mainHeader .btnAll, header .btnMenu').one('click', function(){
		fnMenuHeight();	// 전체메뉴 높이 값 설정 /202006
		fnHasScroll(); // 세로 스크롤바 있을 때 /202006
		
		return false;
	});
		
	// 전체메뉴 높이 값 설정 /202006
	function fnMenuHeight() {
		var openMenuHeight = $('.hasOn').height(); // 열린 메뉴 높이
		var logoHeight = $('.logo').height(); // 로고 영역 높이
		var firstMenuHeight =	$('.insuMenu').height(); // 첫 번째 메뉴 높이
		var callBoxHeight =	$('.callBox').height(); // 콜센터 배너 높이
		var excludeHeight = logoHeight + firstMenuHeight + 20; // 제외 높이 /수정202007
		
		$('.menuList, .menuArea').css({'height': openMenuHeight - logoHeight});
		$('.allMenuWrap .menuArea .menuList > li:first-child .submenuList .insuListArea ul').css('height', openMenuHeight - excludeHeight);
		//MY다이렉트 메뉴 높이값 
		$('.allMenuWrap .menuArea .menuList > li:first-child:eq(2) .submenuList .insuListArea ul').css('height', openMenuHeight - excludeHeight);
	}
	
	function fnHasScroll() {
		var hascrollMenu = $('.hasOn .insuListArea ul');
		
		// 세로 스크롤바 있을 때 /202006		
		if(hascrollMenu.hasVerticalScrollBar()) {
			hascrollMenu.addClass('insetShadow');	
		} else {
			hascrollMenu.removeClass('insetShadow');
		}
	}
	// 세로 스크롤바 있을 때 /202006
	$.fn.hasVerticalScrollBar = function(){
		return this.get(0) ? this.get(0).scrollHeight > this.innerHeight() : false;
	}
	$('header .btnMenuClose').on('click', function(){
		$('.mainHeader .btnAll, header .btnMenu').attr('aria-expanded','false'); // 스크린리더에 메뉴 축소됨 알림 /202007
		
		$('.allMenuWrap').removeClass('on').attr('aria-hidden','true').removeAttr('tabindex'); // 접근성 aria-live : off, tabindex 삭제 /20200615
		$('#h1Main').attr('aria-hidden' , false).css({'display':'block'});
		$('footer').attr('aria-hidden' , false).css({'display':'block'});
		$('.mainHeader > h1').attr('aria-hidden' , false).css({'display':'block'});
		$('.mainHeader > .btnAll').attr('aria-hidden' , false).css({'display':'block'}).focus(); // 수정 /202006
		//$('#layerMask').removeAttr('style').show();
		
		$('body').css({overflowX: 'hidden', overflowY: 'scroll', width: '100%', height: '100%'});
		setTimeout(function(){
			$('.allMenuWrap').hide();
			$('.quickMenu').show();
			$('#layerMask').remove();
		},200); // 수정 /202006
		
	});

	//메뉴 depth click
	$('.allMenuWrap > li > a').on('click', function(){
		var onIndex = $('.allMenuWrap > li.open').index();
		var index = $(this).parent().index();
		if(onIndex == index){
			$('.allMenuWrap > li').removeClass('open');
			$('.allMenuWrap > li > ul').stop().animate({'height':'0'}, 100, function(){
				$(this).css({'display':'none'});
				$('.allMenuWrap > li.open > ul').css({'display':'block'});
			});
			return false;
		}
		$('.allMenuWrap > li').removeClass('open');
		$('.allMenuWrap > li > ul').stop().animate({'height':'0'}, 100, function(){
			$(this).css({'display':'none'});
			$('.allMenuWrap > li.open > ul').css({'display':'block'});
		});
		$(this).parent().addClass('open');
		$(this).next('ul').css({'display':'block', 'height':'auto'});
		var listH = $(this).next('ul').height();
		$(this).next('ul').css({'height':'0'}).stop().animate({'height':listH+'px'});
	});

});


$(document).ready(function () {
	//선택시 주황색박스 버튼 활성화 기능
	$('.orgboxBtn > a').each(function () {
		$(this).click(function (e) {
			if ( !$(e.target).is('.on') ) {
				$(e.target).addClass('on');
				$(e.target).siblings().removeClass('on');
			}
		});
	});
	//전체메뉴 하위메뉴 목록 border 스타일 제어
	$('.submenuList').each(function () {
		var eachSize = $(this).children('li').size();
		if ( eachSize % 2 == 0 ) {
			$(this).children('li').eq(eachSize - 2).css('borderBottom','none');
			$(this).children('li').eq(eachSize - 1).css('borderBottom','none');
		} else if ( eachSize % 2 == 1 ) {
			$(this).children('li').eq(eachSize - 1).css('borderBottom','none');
		}
	});
	$('.submenuList').each(function () {
		var eachSize = $(this).children('li').size();
		if ( eachSize % 2 == 0 ) {
			$(this).children('li').eq(eachSize - 2).children('a').css('borderBottom','none');
			$(this).children('li').eq(eachSize - 1).children('a').css('borderBottom','none');
		} else if ( eachSize % 2 == 1 ) {
			$(this).children('li').eq(eachSize - 1).children('a').css('borderBottom','none');
		}
	});
});

$(document).on("click",".faqAccordion .toggleTitle a",function () {	
	if($(this).parent().parent().parent().find('.tabBox.open').length) {
		$(this).parent().parent().parent().parent().find('.btnAllTog').text('모두 열기');
		$(this).find('.hide').text(' 하위콘텐츠 닫기')
	}

	if($(this).parent().parent().hasClass('open') == true) {
		$(this).parent().parent().removeClass('open');
		$(this).find('.hide').text(' 하위콘텐츠 열기')
	} else {
		$(this).parent().parent().parent().find('div').removeClass('open');
		$(this).parent().parent().addClass('open');
		$(this).find('.hide').text(' 하위콘텐츠 닫기')
	}
	return false;
});

/*이달의카드혜택수정/20220215*/
$(document).on("click",".benefitAccordion .itemImgTitle a",function () {	
	
	if($(this).parent().parent().hasClass('open') == true) {
		$(this).parent().parent().removeClass('open');
		$(this).find('.hide').text(' 하위콘텐츠 열기')
	} else {
		$(this).parent().parent().parent().parent().find('div').removeClass('open');
		$(this).parent().parent().addClass('open');
		$(this).find('.hide').text(' 하위콘텐츠 닫기')
	}
	
	return false;
});

$(document).on("click",".benefitAccordion .itemImgArrow a",function () {	
	
	if($(this).parent().parent().parent().hasClass('open') == true) {
		$(this).parent().parent().parent().removeClass('open');
		$(this).find('.hide').text(' 하위콘텐츠 열기')
	} else {
		$(this).parent().parent().parent().parent().find('div').removeClass('open');
		$(this).parent().parent().parent().addClass('open');
		$(this).find('.hide').text(' 하위콘텐츠 닫기')
	}
	return false;
});
/*이달의카드혜택수정/20220215*/


/* 접근성처리 추가 */
$(document).ready(function() {	
	
	$(".btn > div > a").each(function() {
		$(this).on('click', function(){
			if($(this).children('span.hide').length == 0 ) {
				var _accessbility = '<span class="hide"> 선택됨</span>';
				if (!$(this).children().hasClass('hide')) {
					$(this).append(_accessbility);		
					//$(this).attr('aria-hidden' , true);				
				}				
				$(this).parent().siblings('div').find('a').children('span.hide').remove();
				//$(this).parent().siblings('div').find('a').attr('aria-hidden' , false);
			}
		});
	});
	
	$(".specialsList.onbtn > a").each(function() {
		var _this = $(this);
		var _idx = $(this).index();
		var _accessbility = '<span class="hide"> 선택됨</span>';

		if (!_this.hasClass('on')) {	
			_this.append(_accessbility);
		} else {			
			_this.children('span.hide').remove();
		}		
	});
	
//	$('header.mainHeader > h1, .allMenuWrap .logo').attr('role','img');
	$('.btnHelp').attr('aria-label','도움말');
	$('.btnHelp').attr('role','button');
	$('.btnInfo').attr('title','입력정보 요약/변경 화면 열기'); // 접근성2차 /2210
	$('.slick-dots > li > button').attr('role','button');
		
	$('.carViewMemberBox .btnHelp2').attr('role','button');
	$('.carViewMemberBox .btnHelp2').attr('aria-label','도움말');
	$('.cardEventimg > img').attr('role','button');
	 
	
});

$(document).on("DOMSubtreeModified","#divTxt",function () {	
	$(this).children(".btnHelp").attr({'aria-label':'도움말',role:'button'});
});