
/*
$(document).ready(function () {
  
  /* 메인 슬라이드 */
 /* $('.mainBanner .slick').slick({
		dots : true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
		  {
		    breakpoint: 320,
		    settings: {
		      dots : true,
  				infinite: true,
  				slidesToShow: 1,
  				slidesToScroll: 1,
		    }				
		  }
		]
	});
  */
  
  /* 메인 GNB */
  /*
  $('a.btnAll').click(function(){
    $('.allMenuWrap').css({'left':'100%','height':'100%','overflow':'auto'}).show();
    $('html, body').css({'overflow':'hidden'});
    $('.allMenuWrap').animate({'left':'0'}),300,function(){
      $('html, body').css({
        'height':'100%',
        'overflow':'hidden'
       });
    };
  });
  $('.btnMenuClose').click(function(){
    $('.allMenuWrap').animate({'left':'100%'}),300,function(){
      $('.allMenuWrap').hide();
      $('html, body').css({
        'height':'',
        'overflow':''
       });
     };
   });
  */
  
  /* 메인 GNB 아코디언 */
  /*var _accessbility = '<span class="hide"> 선택됨</span>';
	var _accessbilityup = '<span class="hide"> 하위메뉴 열기</span>';

	$('.allMenuWrap .menuList > li').each(function () {
		if ( $(this).find('.submenuList').size() != 0 ) {

			$(this).addClass('has').children('a').append(_accessbilityup);
			$('.allMenuWrap .menuList > li').eq(0).removeClass('has').addClass('hasOn');
		}

		$(this).children('a.dept01').click(function (e) {
			if ( $(e.target).parents('li').is('.has') ) {
				$(e.target).parents('li').addClass('hasOn').find('.hide').text('하위메뉴 닫기');
				$(e.target).parents('li').removeClass('has');

				var other = $(e.target).parents('li').siblings();
				
				$(other).each(function () {
					if ( $(this).find('.submenuList').size() != 0 ) {
						$(this).removeClass('hasOn').addClass('has').find('.hide').text('하위메뉴 열기');
					} else {
						$(this).removeClass('has hasOn').find('.hide').text('하위메뉴 열기');
					}
				});

				$(e.target).parents('li').find('.submenuList').show();
				$(e.target).parents('li').find('.infoTxt').show();
				$(e.target).parents('li').siblings().find('.submenuList').hide();
				$(e.target).parents('li').siblings().find('.infoTxt').hide();
				
			} else if ( $(e.target).parents('li').is('.hasOn') ) {
				$(e.target).parents('li').addClass('has').find('.hide').text('하위메뉴 열기');
				$(e.target).parents('li').removeClass('hasOn');
				$(e.target).parents('li').find('.submenuList').hide();
				$(e.target).parents('li').find('.infoTxt').hide();
				$(e.target).parents('li').siblings().find('.submenuList').hide();
				$(e.target).parents('li').siblings().find('.infoTxt').hide();
			}
		});
	});*/
  
  /* Float Menu */  
  /*var deviceW = $(window).width();
	var deviceH = $(window).height();
  $('.btnQm a').click(function (e) {
		if ( !$(e.target).is('.on') ) {
			if ( $('body').find('div.qmDim').size() == 0 ) {
				$('body').append('<div class="qmDim"></div>');
			} else {
				return false;
			}

			$('body').css({overflow: 'hidden', width: deviceW + 'px', height: deviceH + 'px'});

			$(e.target).addClass('on');
			$(e.target).parents('.btnQm').find('.state').text('바로가기 메뉴 숨기기');

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
});
*/


/* 20170725 스크립트 추가 */
/*
$(document).ready(function () {
	$('.mainHeader .btnAll').on('click', function(){
		var deviceW = $(window).width();
		var deviceH = $(window).height();
		//$('body').css({height: deviceH + 'px'});
		//웹접근성 .layerMask 포커스가 가지 않게 처리 aria-hidden="true" 추가
		$('.allMenuWrap').show(); //.before('<div class="layerMask" id="layerMask" aria-hidden="true" style="display:block" />');
		
		$('.menuList > li.has > .submenuList').hide();
		
		$('body').css({overflowX: 'hidden', overflowY: 'hidden', width: deviceW + 'px', height: deviceH + 'px'});
		$('.quickMenu').hide();
		setTimeout(function(){
			$('.allMenuWrap').addClass('on');
		},100);
		setTimeout(function(){
			$('#layerMask').css({background:'#f6f6f6',opacity:'1'});
		},500);

		//전체메뉴 하위메뉴 목록 border 스타일 제어
		$('.submenuList').each(function () {
		 	var eachSize = $(this).children('li').size();
		 	if ( eachSize % 2 == 0 ) {
		 		$(this).children('li').eq(eachSize - 2).css('borderBottom','0');
		 		$(this).children('li').eq(eachSize - 1).css('borderBottom','0');
		 	} else if ( eachSize % 2 == 1 ) {
		 		$(this).children('li').eq(eachSize - 1).css('borderBottom','0');
		 	}
		});		
	});
	$('header .btnMenuClose').on('click', function(){
		$('.allMenuWrap').removeClass('on');
		//$('#layerMask').removeAttr('style').show();
		
		$('body').css({overflowX: 'hidden', overflowY: 'scroll', width: '100%', height: '100%'});
		setTimeout(function(){
			$('.allMenuWrap').hide();
			$('.quickMenu').show();
			$('#layerMask').remove();
		},500);	
	});
*/
/* 최종보험료 Fixed 
  $('body').scroll(function () {
    if ($('body').scrollTop() > 53) {
        $('#h1Wrap .accodion').addClass('.fixed');
      }else{
        $('#h1Wrap .accodion').removeClass('.fixed');
      }
  });
*/
  
 /* 최종보험료 아코디언 
 $('a.subConOpen').click(function (){
  $('a.subConOpen').classToggle('up');
  $('.dataDetail').classToggle('on');
  return false;
 });

 //전체메뉴 하위메뉴 목록 border 스타일 제어
	$('.submenuList').each(function () {
		var eachSize = $(this).children('li').size();
		if ( eachSize % 2 == 0 ) {
		 	$(this).children('li').eq(eachSize - 2).css('borderBottom','0');
		 	$(this).children('li').eq(eachSize - 1).css('borderBottom','0');
		} else if ( eachSize % 2 == 1 ) {
		 	$(this).children('li').eq(eachSize - 1).css('borderBottom','0');
		}
	});

}); */

