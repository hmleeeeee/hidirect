/**
 * [PC] 다이렉트 보험 서비스 플랫폼 구축
 * --------------------------------------
 * ui.pub.js 
 * ## 퍼블리싱 테스트 스크립트용, 개발시 제외 바랍니다.##
 * Modify: 2023/02/02
 */ 


// console.log('ui.pub.js')

function gnb(dep1,dep2,dep3){
	var gnbWrap = $(".gnbWrapSet");
	var dep1Li = $(".gnb > li");
	var dep1A = $(".gnb > li > a");
	var dep2Li = $(".gnb_dep2 > li");
	var dep2A = $(".gnb_dep2 > li > a");
	var dep3Li = $(".gnb_dep3 > li");
	var dep3A = $(".gnb_dep3 > li > a");
	var subMenuArea = $(".subMenuArea");
	var gnbTime;

	$(".gnb_dep2").each(function(){
		if($(this).find("> li").length > 3){
			$(this).addClass("many")
		}
	})

	function gnbReset(){
		dep1Li.removeClass("on");
		dep2Li.removeClass("on hover");
		dep3Li.removeClass("on");
		dep1Li.eq(dep1).addClass("on");
		dep1Li.eq(dep1).find(dep2Li).eq(dep2).addClass("on");
		dep1Li.eq(dep1).find(dep2Li).eq(dep2).find(dep3Li).eq(dep3).addClass("on");
		var gnbheight = $(".gnbArea").outerHeight()+1;
		gnbWrap.stop().animate({height : gnbheight},300,function(){
			subMenuArea.hide();
			gnbWrap.removeClass("open");
		})
	}

	gnbReset();

	dep1A.on("mouseenter focus",function(){
		dep1Li.removeClass();
		$(this).parent().addClass("on");
		subMenuArea.hide();
		$(this).parent().find("> .subMenuArea").show();
		var subLi = $(this).parent().find("> .subMenuArea > .gnb_dep2 > li");
		var maxHeight = 0;
		/*subLi.each(function(){
			if($(this).height() > maxHeight){
				maxHeight = $(this).height();
				subLi.height(maxHeight);
			}
		})*/
		var gnbheight = $(this).parent().find("> .subMenuArea").outerHeight()+$(".gnbArea").outerHeight()+1;
		gnbWrap.addClass("open").stop().animate({height : gnbheight},300);

		if($(".btnAllmenu").hasClass("on")){
			$(".btnAllmenu").removeClass("on");
			$(".btnAllmenu").find("img").attr("src",$(".btnAllmenu").find("img").attr("src").replace("_on","_off"));
			$(".btnAllmenu").attr('title','전체메뉴보기').find("img").attr("alt","전체메뉴보기"); // 개선 /202005
			$(".allmenuListArea").stop().slideUp();
		}
	})

	dep2Li.on("mouseenter focusin",function(){
		dep2Li.removeClass("hover");
		$(this).addClass("hover");
	})
	gnbWrap.on("mouseenter focusin",function(){
		clearTimeout(gnbTime);
	})
	gnbWrap.on("mouseleave focusout",function(){
		clearTimeout(gnbTime);
		gnbTime = setTimeout(function(){
			gnbReset();
		},500)
	})


	$(".btnDirect").on("click",function(e){
		e.preventDefault();
		if(!$(this).hasClass("on")){
			$(this).addClass("on").attr("title","열림");
			$(".directListArea").slideDown();
		}else{
			$(this).removeClass("on").attr("title","닫힘");
			$(".directListArea").slideUp();
		}
	})


	// GNB 와 전체메뉴 겹치는 현상 수정 /202005
	$(".btnAllmenu").on("mouseenter focusin", function(){
	  gnbReset();
	});

	$(".btnAllmenu").on("click",function(e){
		e.preventDefault();
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_off","_on"));
			$(this).attr('title','전체메뉴닫기').find("img").attr("alt","전체메뉴닫기");
			$(".allmenuListArea").stop().slideDown();
			$(".btnDirect").removeClass("on").attr("title","닫힘"); // 개선 /202005
			$(".directListArea").stop().slideUp();
		}else{
			$(this).removeClass("on");
			$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_on","_off"));
			$(this).attr('title','전체메뉴보기').find("img").attr("alt","전체메뉴보기"); // 개선 /202005
			$(".allmenuListArea").stop().slideUp();
		}
	})
}


$(function() {
  gnb(0, 0, 0);
  // gnb();
});