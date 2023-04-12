$(document).ready(function() {

	//subNavi
	/*
	$("#sub_navi").children().children().children("a").click(function() {
		$("#sub_navi ul li ul").removeClass('on');
		$("#sub_navi").children().children().removeClass('on');
		$(this).next("ul").toggleClass('on');
		$(this).parent("li").toggleClass('on');
		//$(this).toggleAttr("title","항목 더보기 열림");
	});
*/
	$("#sub_navi").children().children().children("a").click(function() {
		
		$("#sub_navi ul li ul").removeClass('on');
		$("#sub_navi").children().children().removeClass('on');

		$(this).next("ul").addClass('on');
		$(this).parent("li").addClass('on');

		$("#sub_navi").children().children().children("a").attr("title","항목 더보기 열림");
		$(this).attr("title", "");
		$("#sub_navi").children().children("li.noneDep").children("a").attr("title","");
		$("#sub_navi").children().children().children("a[target]").attr("title", "새창으로 열림");
	});
	
	$("#sub_navi").children().children().children("a").attr("title","항목 더보기 열림");
	$("#sub_navi").children().children("li.on").children("a").attr("title","");
	$("#sub_navi").children().children("li.noneDep").children("a").attr("title","");
	$("#sub_navi").children().children().children("a[target]").attr("title", "새창으로 열림");
	
	

	//GNB
	$(".gnb li").children().mouseenter(function() {
		$(".wrap_gnb_depth2").removeClass("active");
		$(this).next(".wrap_gnb_depth2").addClass("active");
		$(".gnb li").removeClass("on");
	});
	$(".wrap_gnb_depth2").mouseenter(function() {
		$(".wrap_gnb_depth2").removeClass("active");
		$(this).addClass("active");
		$(".gnb li").removeClass("on");
		$(this).parent().addClass("on");
	});

	$(".gnb li").children().mouseleave(function() {
		$(".wrap_gnb_depth2").removeClass("active");
		$(".gnb li").removeClass("on");
	});
	$(".wrap_gnb_depth2").mouseleave(function() {
		$(".wrap_gnb_depth2").removeClass("active");
		$(".gnb li").removeClass("on");
	});


	$(".gnb li").children().focus(function() {
		$(".wrap_gnb_depth2").removeClass("active");
		$(this).next(".wrap_gnb_depth2").addClass("active");
	});

/*
	$(".gnb").mouseenter(function() {
		if(checkWebOS.ie){
			$(".play").css("display","block")
		}
	});                                                                                                                                                                                                                                                                    
*/

	$(".btn_mt a").focusin(function( ){
		$(".wrap_gnb_depth2").removeClass("active");
	});

	//main ars
	/*
	$(".btn_ars").click(function() {
		$(this).next("div").toggleClass('on');
		$(this).toggleClass('on');

		if ($(this).hasClass("on")) {
			$(this).attr('title', 'ARS 번호안내 닫기');
		} else {
			$(this).attr('title', 'ARS 번호안내 열기');
		}
	});
	*/

	//main cs layer

	$(".main_cs_info_close").click(function() {
		$(".main_cs_info div").css("display","none");
	});

	// main 버튼 레이어
	$(".btn_mt a").mouseenter(function() {
		$(".mt_btn_area1").css("display","block");
	});
	$(".btn_mt a").mouseleave(function() {
		$(".mt_btn_area1").css("display","none");
	});
	$(".btn_mt a").focusin(function( ){
		$(".mt_btn_area1").css("display","block");
	});
	$(".mt_btn_area1_out").focusout(function( ){
		$(".mt_btn_area1").css("display","none");
	});

	$(".btn_main_vi_mt").mouseenter(function() {
		$(".btn_main_vi_mt_area1").css("display","block");
	});
	$(".btn_main_vi_mt").mouseleave(function() {
		$(".btn_main_vi_mt_area1").css("display","none");
	});
	$(".btn_main_vi_mt").focusin(function( ){
		$(".btn_main_vi_mt_area1").css("display","block");
	});
	$(".btn_main_vi_mt_area1_out").focusout(function( ){
		$(".btn_main_vi_mt_area1").css("display","none");
	});




	//전체메뉴
	
	$(".all_menu a").click(function() {
		$(".wrap_allMenu").show();
		$(".wrap_allMenu").next(".layerPopBg").show();
		$(".allMenu_title h2").focus();
	});
	$(".allMenuClose a").click(function() {
		$(".wrap_allMenu").hide();
		$(".wrap_allMenu").next(".layerPopBg").hide();
		$(".all_menu a").focus();
	});
	


	// 자동차 보험 도움말 영역
	$(".helpArea dd:not(:first)").hide();

	
	$(".helpArea dl dt").each(function(i) {
		txt = $(".helpArea dl dt a").eq(i).text();
		$(".helpArea dl dt a").eq(i).attr('title', txt + ' 열기');

		$(".helpArea dl dt a.on").attr('title', '');
	});

	$(".helpArea dt a").click(function() {
		$(".helpArea dl dt").each(function(i) {
			txt = $(".helpArea dl dt a").eq(i).text();
			$(".helpArea dl dt a").eq(i).attr('title', txt + ' 열기');
		});
		$(this).attr('title', '');
		
		if (!$(this).hasClass('on')) {
			
			$(".helpArea dd").hide();  
			$(this).parent().next('dd').show();

			$(".helpArea dt a").removeClass("on");
			$(this).addClass("on");

		}
	});

	$("#tgLink a").each(function() {
		var tgLink_text = $(this).attr('title')
		$(this).click(function() {
			$(this).attr('title', tgLink_text +  ' (확인하였음)');
		});
	});


	// 차량 상세 정보 입력
	//- 개발에서 제어
	/*
	$(".carDetail .detailList:not(:first)").hide();
	$(".carDetail .detailList a").click(function() {
		if (!$(this).parent().parent().hasClass("lastList"))
		{
			$(".carDetail .on2 span").show();

			$(".carDetail > ul > li").removeClass("on");
			$(this).parent().parent().parent().next("li").addClass("on");

			$(".detailList").hide();
			$(this).parent().parent().parent().next("li").find(".detailList").show();

			$(this).parent().parent().parent().addClass('on2');

		} else {
			$(".carDetail > ul > li").removeClass("on");
			$(this).parent().parent().parent().addClass('on2');
			$(this).addClass("on");
		}
			
	});
*/
	


		
	if(!$(".noScript").length > 0) {

		$(".carInfo input:radio").click(function() {
			if ($(this).hasClass("selY"))
			{
				$(this).parent().next("dd").show();
				$(this).parent().find(".carTit").css("color", "#003170");

				$(this).parent().css("border-bottom", "0");
			} else {
				$(this).parent().next("dd").hide();
				$(this).parent().find(".carTit").css("color", "#333");
				
				if ($(this).hasClass("selN")) {
					$(this).parent().css("border-bottom", "1px solid #dadada");
				}
			}
		});
	}

	// 레이어팝업(모달윈도우) 세로 중앙 정렬
	$(".layerPop").css("top", Math.max(0, (($(window).height() - $(".layerPop").outerHeight()) / 2) + $(window).scrollTop()) + "px");

	// 레이어팝업 높이(layerPopCont 있는 경우)
	$(".scrollY").not(".scrollY.installmentInfo").parent(".layerPop").css("paddingBottom","80px");
	$(".scrollY").prev(".titWrap.mgT20").parent(".layerPop.sizeL").css("paddingBottom","130px");

	// 보험료확인 th 툴팁 열기(GI-02-01)
	$("a.btn_tooltip").click(function() {
		$(".tooltipBox").not($(this).next(".tooltipBox")).fadeOut();
		$(this).next(".tooltipBox").fadeIn();
	});

	// 보험료확인 th 툴팁 닫기(GI-02-01) 
	$(".tooltipBox a.close").click(function() {
		$(".tooltipBox").fadeOut();
	});
		
	
	// 직업 선택 방법 탭
	$(".tabType02 li div label, .tabType02 li div input:radio").click(function() {
		$(".wrapTabCont").hide();
		$(".tabType02 li").removeClass("selected"); 
		if($(this).prev("input:radio").attr("checked",true)) {
			var index = $(this).parent().parent("li").index();
			$(".wrapTabCont:eq(" + index + ")").show();
			$(this).parent().parent("li").addClass("selected");
		}
	});
	$(".tabType02.carTab li div label, .tabType02.carTab li div input:radio").click(function() {
		$(".tabType02.carTab").css("border-color", "#7190be");
	});

	/*if($('.wrapTabCont').length >= 1) {
		$('.wrapTabCont:eq(0)').css('display','block');
	}*/
	if($(".tabType02 li").hasClass("selected")){
		var index = $(".tabType02 li.selected").index();
		$(".tabType02 li.selected").find("input:radio").attr("checked",true);
		$(".wrapTabCont:eq(" + index + ")").show();
	}

	// 기본 탭 on/off 효과
	$(".tabCont:not(:first)").hide();
	$(".tabCont:first").show();

	$(".securityTab .tabCont").show();

	if(!$(".tabNone").length > 0) {
		$(".tabType01 li a, .tabType04 li a, tabType03 li a").click(function() {
			tabCont = $(this).attr('href');
			$(this).parent().parent().parent().parent().find(".tabCont").hide();
			$(tabCont).show();

			return false;
		});
	}
	
	if(!$(".tabNone").length > 0) {
		$(".tabType01 li a, .tabType04 li a").click(function() {
			$(this).parent().parent().find("li").removeClass("on");
			$(this).parent().addClass("on");
		});
	}

	$(".etcTabCont:not(:first)").hide();
	$(".etcDetail02 .etcTabCont:first").show();
	$(".etcTab li a").click(function() {
		$(this).parent().parent().find("li").removeClass("on");
		$(this).parent().addClass("on");

		tabCont = $(this).attr('href');
		$(this).parent().parent().parent().parent().find(".etcTabCont").hide();
		$(tabCont).show();

		return false;
	});
	
	// 레이어팝업 탭메뉴 MT-06-05
	if($("#tabAct ul li").hasClass("on")){
		var index = $("#tabAct ul li.on").index();
		$(".tabCont").hide().not($(".tabCont:eq(" + index + ")"));
		$(".tabCont:eq(" + index + ")").show();
	}
	$("#tabAct ul li a").click(function() {
		$("#tabAct").siblings("div").children(".tabCont").hide();
		$(this).parent("li").siblings("li").removeClass("on");
		$(this).parent("li").addClass("on");
		var index = $(this).parent("li").index();
		$(".tabCont:eq(" + index + ")").show();
	});
	
	// 레이어팝업 탭메뉴 MT-06-05(수정)
	if($("#tabAct2 ul li").hasClass("on")){
		var index = $("#tabAct2 ul li.on").children("a").attr("href");
		$(".tabCont").hide().not($(index));
		$(index).show();
	}
	$("#tabAct2 ul li a").click(function() {
		$("#tabAct2").siblings("div").children(".tabCont2").hide();
		var index = $("#tabAct2 ul li.on").children("a").attr("href");
		$(".tabCont").hide().not($(index));
		$(index).show();
	});

	// 4단계 보험료 계산
	$(".etcDetail01, .etcDetail02").hide();
	$(".etcWrap dd a").click(function() {
		$(this).toggleClass("on");

		title = $(this).attr("title");
		src = $(this).find("img").attr("src");
		alt = $(this).find("img").attr("alt");

		if ($(this).hasClass("on"))
		{
			$(this).parent().parent().next("div").show();

			$(this).attr("title", title.replace('열기', '닫기'));
			$(this).find("img").attr("src", src.replace('Down', 'Up'));
			$(this).find("img").attr("alt", alt.replace('상세보기', '상세닫기'));
		} 
		else {
			$(this).parent().parent().next("div").hide();
		
			$(this).attr("title", title.replace('닫기', '열기'));
			$(this).find("img").attr("src", src.replace('Up', 'Down'));
			$(this).find("img").attr("alt", alt.replace('상세닫기', '상세보기'));
		}
	});

	$(".etcTotal .price a").click(function() {
		etcDetail = $(this).parent().parent().parent();
		etcDetailWrap = $(this).parent().parent().parent().prev().find("dd a");
		toggleBtn = etcDetail.parent().parent().find(".etcWrap a");
		title = toggleBtn.attr("title");
		src = toggleBtn.find("img").attr("src");
		etcDetail.hide();
		toggleBtn.removeClass("on");
		$(toggleBtn).attr("title", title.replace('닫기', '열기'));
		$(toggleBtn).find("img").attr("src", src.replace('Up', 'Down'));
		$(etcDetailWrap).focus();
	});

	// 버튼클릭시 visited 클래스 토글 GI-04-06
	/* 개발에서 처리
	if($("#tgLink > a").hasClass("visited")){
		var $checkbox = $("#tgLink > a").find("input[type=checkbox]");
		$checkbox.prop("checked", true);
	}
	$("#tgLink > a").click(function(){
		$(this).toggleClass("visited");
		var $checkbox = $(this).find("input[type=checkbox]");
		$checkbox.prop("checked", !$checkbox.is(":checked"));
	});
	$("#tgLink > a input[type=checkbox]").click(function(){
		var $checkbox = $(this);
		$checkbox.prop("checked", !$checkbox.is(":checked"));
	});
	$("#tgLink > a label").click(function(){
		var $checkbox = $(this).prev("input[type=checkbox]");
		$checkbox.prop("checked", !$checkbox.is(":checked"));
		$(this).parent().toggleClass("visited");
	});
*/
	//메인 상단 이벤트 창닫기
	$(".main_btn_top_close").click(function() {
		$(".wrap_main_top_event").slideUp();
	});



	//메인베너 페이징 타이틀
	$(".main_event .slidesjs-pagination li a").each(function() {
		var pageno = $(this).parent("li").index() + 1;
		var pagesum = $(this).parent().parent().children("li:last").index() + 1;
		$(this).attr("title", "총 " + pagesum+ "개중 " + pageno + "번째 배너");
	});

	// 연금보험 FAQ
	$(".drmFaq li > a").click(function() {
		var layer = $(this).parent().find("div");
		$(".drmFaq li div").hide();
		$(layer).show(0, function() {
			$(layer).find("a").click(function() {
				$(layer).hide();
				$(layer).parent().find("a").focus();
			});
		});
	});

	// 홍보자료 슬라이드 이미지
	var btn = $(".slideBtn a.next, .slideBtn a.prev");
	w = $(".slideList ul li").width();

	$(".slideList ul").css({width: (w*$(".slideList ul li").size()) + "px"});
	$(".slideList ul").css({left: "-140px"});
	$(".poster ul li:last").prependTo(".poster ul");
	$(".video ul li:last").prependTo(".video ul");

	$(btn).click(function() {
		move($(this));
		//$(".video li:first").hide();
	});

	move = function(btnName) {
		var leftPosition = (btnName.attr("class")=="prev") ? "+=140px" : "-=140px";
		var slide = $(btnName).parent().attr("id");
		var ul = $(btnName).parent().next("div").find("ul");
		var liF = $(btnName).parent().next("div").find("ul li:first");
		var liL = $(btnName).parent().next("div").find("ul li:last");

		$(ul).animate({left:leftPosition}, "fast", "swing", function() {
			if (leftPosition == "-=140px") {
				$(liF).appendTo(ul); 
			} else {
				$(liL).prependTo(ul);
			}
			$(this).css({left:"-140px"});
			
		});
	}

	/*
	$(".slideList ul li a").click(function() {
	
		if(checkWebOS.ie){
			$(".play").show();
		}
		var viewSrc = $(".videoView div img").attr("src");
		var viewSrc2 = $(".posterView img").attr("src");
		var sumSrc = $(this).find("img").attr("src");

		if ($(this).parent().parent().parent().hasClass("video")) {
			video = $(this).attr("href");
			$(".videoWrap").hide();
			$("." + video).show();
			$(".slideList ul li").removeClass("on");
			$(this).parent().addClass("on");
			return false;
		} 
	});

	$(".play a").click(function() {
		$(".play").show();
		$(this).parent().hide();
	});
	*/
	
	$(".qaList .ansWrap").hide();
	$(".qaList > li a").click(function() {
		$(".qaList > li a").each(function(i) {
			title = $(".qaList > li a").eq(i).attr('title');
			$(".qaList > li a").eq(i).attr('title', title.replace('닫기', '열기'));
		});
		if ($(this).parent().hasClass("on")) {
			$(".qaList .ansWrap").hide();
			$(this).parent().removeClass("on");
			
		} else {
			$(".qaList .ansWrap").hide();
			$(this).next(".ansWrap").show();

			$(".qaList > li").removeClass("on");
			$(this).parent().addClass("on");
			title = $(this).attr('title');
			$(this).attr("title", title.replace('열기', '닫기'));
		}
	});

	//공지사항 첨부파일 title
	$(".tb_att_file a").each(function() {
		var aTitle = $(this).text();
		//alert(aTitle)
		if ($(this).hasClass("pdf")) {
				$(this).attr('title', aTitle + ' PDF 다운로드');
			}
		if ($(this).hasClass("doc")) {
				$(this).attr('title', aTitle + ' DOC 다운로드');
			}
		if ($(this).hasClass("hwp")) {
				$(this).attr('title', aTitle + ' HWP 다운로드');
			}
	});

	//한눈에 보는 이용안내
	$(".pop_guide_header li a").click(function() {
		$(".pop_guide_header li").removeClass("on");
		$(this).parent().addClass("on");
		$(".wrap_guide_cont").removeClass("on");
		var index = $(this).parent("li").index();
		$(".wrap_guide_cont:eq(" + index + ")").addClass("on");
	});

	$(".wrap_guide_cont .slidesjs-pagination li a").each(function() {
		var pageno = $(this).parent("li").index() + 1;
		var pagesum = $(this).parent().parent().children("li:last").index() + 1;
		$(this).attr("title", "총 " + pagesum+ "개중" + pageno + "번째 이용안내");
	});

	$(".btn_infoOpen").click(function() {
		$(".layer_wrap_guide").addClass("on");
		$(".layerPopBg").css("display","block");
	});

	$(".pop_guide_colse").click(function() {
		$(".layer_wrap_guide").removeClass("on");
	});

	//접근성 테이블 summary 추가
	$("table").each(function(idx) {
		var tsumm = "";
		var lastIndex = $(this).children().children().children("th").length -1;
		$(this).children().children().children("th").each(function(idx) {
			if(idx == lastIndex){
				tsumm += $(this).text();
			}else{
				tsumm += $(this).text() +",";
			}
			
		});
		/*$(this).attr("summary", tsumm + " 등의 정보를 확인/입력 할 수 있는 테이블");*/
	});


	//해외여행 국가선택 
	$(".wrap_selNa ul a").click(function() {
		$(this).parent().parent().children().children().removeClass("on");
		$(this).addClass("on");
		
		//$(".layerPopBg").css("display","block");
	});

	//주소 선택
	$(".wrap_zipcode ul a").click(function() {
		$(this).parent().parent().children().children().removeClass("on");
		$(this).addClass("on");
		
		//$(".layerPopBg").css("display","block");
	});
	$(".scroll_body dd a").click(function() {
		$(this).parent().parent().children().children().removeClass("on");
		$(this).addClass("on");
		
		//$(".layerPopBg").css("display","block");
	});

	// input size
	$("input[size=5]").css("width","37px");
	$("input[size=18]").css("width","134px");
	$("input[size=27]").css("width","168px");
	$("input[size=28]").css("width","176px");
	$("input[size=33]").css("width","205px");
	$("input[size=36]").css("width","223px");
	$("input[size=37]").css("width","227px");
	$("input[size=48]").css("width","344px");
		//$("#sub_navi").children().children().children("a[target]").attr("title", "새창으로 열림");


	//클릭투콜 툴팁
	$(".c2c_btn2").click(function() {
		$(".wrap_c2c_tooltip").css("display","block");
	});
	$(".c2c_tooltip_close a").click(function() {
		$(".wrap_c2c_tooltip").css("display","none");
	});


});

// 계약조회 사진조회 팝업창띄우기
function urlOpen(url, width, height) {
	window.open (url,'','width='+width+', height='+height+', top=' + (screen.height-height)/2 + ',left=' + (screen.width-width)/2); 
	return false;
}