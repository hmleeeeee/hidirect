$(function(){
    /*skipNavi*/
    $(".skipNavi a").on("focus",function(){
        $(".skipNavi li").removeClass("on");
        $(this).parent().addClass("on");
    })
    $(".skipNavi a").on("blur",function(){
        $(".skipNavi li").removeClass("on");
    })
    $(".skipNavi a").on("click",function(e){
        e.preventDefault();
        var target = $(this).attr("href");
        $(target).attr("tabindex","-1").focus();
    })

    // $(document).on("focus",".radio input, .checkbox input",function(e){
    //     var _this = $(this).parent();
    //     setTimeout(function(){
    //         _this.addClass("focus");
    //     },100)
    //
    // })
    // $(document).on("blur",".radio input, .checkbox input",function(e){
    //     var _this = $(this).parent();
    //     setTimeout(function(){
    //         _this.removeClass("focus");
    //     },100)
    // })

    $(document).on("change",".checkbox.checkAll input",function(e){
        if($(this).is(":checked")){
            $(this).closest(".checkAllSet").find(".checkAllSetItem .radio input.yes").each(function(){
                if(!$(this).is(":checked")){
                    $(this).click();
                }
            })
        }else{
            $(this).closest(".checkAllSet").find(".checkAllSetItem .radio input.no").each(function(){
                if(!$(this).is(":checked")){
                    $(this).click();
                }
            })
        }
        if($(".checkbox.checkAll input").length == $(".checkbox.checkAll input:checked").length){
            $(".btnAllChk").addClass("on");
            $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의 선택됨");
        }else{
            $(".btnAllChk").removeClass("on");
            $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의");
        }
    })
    /*모두동의 버튼*/
    $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의");
    $(document).on("click",".btnAllChk",function(e){
        e.preventDefault();
        if($(".checkbox.checkAll input").length != $(".checkbox.checkAll input:checked").length){
            $(".btnAllChk").addClass("on");
            $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의 선택됨");
            $(".checkbox.checkAll input").each(function(){
                if(!$(this).is(":checked")){
                    $(this).click();
                }
            })
        }else{
            $(".btnAllChk").removeClass("on");
            $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의");
            $(".checkbox.checkAll input").each(function(){
                if($(this).is(":checked")){
                    $(this).click();
                }
            })
        }
    })
    $(document).on("change",".checkAllSetItem .radio input",function(e){
        if($(this).closest(".checkAllSetItem").find(".radio input.yes:checked").length < $(this).closest(".checkAllSetItem").find(".radio input.yes").length){
            $(this).closest(".checkAllSet").find(".checkbox.checkAll input").prop("checked",false);
            $(this).closest(".checkAllSet").find(".checkbox.checkAll input").attr("checked",false);
        }else{
            $(this).closest(".checkAllSet").find(".checkbox.checkAll input").prop("checked",true);
            $(this).closest(".checkAllSet").find(".checkbox.checkAll input").attr("checked",true);
        }
        if($(".checkbox.checkAll input").length == $(".checkbox.checkAll input:checked").length){
            $(".btnAllChk").addClass("on");
            $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의 선택됨");
        }else{
            $(".btnAllChk").removeClass("on");
            $(".btnAllChk").attr("title","업무에 필요한 필수 및 선택 사항에 대한 동의");
        }
    })


    $(document).on("change",".checkbox.checkAll input",function(e){
        if($(this).is(":checked")){
            $(this).closest(".noAllSet").find(".confirm").each(function(){
                $(this).find(".no").click();
            })
        }else{
            $(this).closest(".noAllSet").find(".confirm").each(function(){
                $(this).find(".no").parent().removeClass("on");
            })
        }
    })
    /*inputBase*/
    $(document).on("focusin",".inputBase > input, .inputBase > .inputSet input",function(e){
        $(this).closest(".inputBase").addClass("focus");
    })
    $(document).on("focusout",".inputBase",function(e){
        if(!$(this).find("input").val()){
            $(this).removeClass("focus");
            $(this).removeClass("value");
        }else{
            $(this).removeClass("focus");
            $(this).addClass("value");
        }
    })
    $(document).on("focusout",".inputBase.validationChk",function(e){
        if(!$(this).find("input").val()){
            $(this).addClass("value");
            $(this).addClass("validation");
        }else{
            $(this).removeClass("validation");
        }
    })
    inputAppend();


    /*tabWrap*/
    $(document).on("click",".tabWrap .tabList li a",function(e){
        if(!$(this).closest(".tabWrap").hasClass("linkType")){
            e.preventDefault();
            if(!$(this).parent().hasClass("disabled")){
                var idx = $(this).parent().index();
                var $target = $(this).closest(".tabWrap");
                $target.find("> .tabList > li").removeClass("on").eq(idx).addClass("on");

                $target.find("> .tabList > li a").attr("title","");
                $target.find("> .tabList > li").eq(idx).find("a").attr("title","선택됨");

                if($(this).find(".img img").length > 0){
                    $target.find(".img img").each(function(){
                        $(this).attr("src",$(this).attr("src").replace("_on","_off"));
                    })
                    $(this).find(".img img").attr("src",$(this).find(".img img").attr("src").replace("_off","_on"));
                }
                if(!$target.hasClass("selectOnly")){
                    $target.find("> .tabCon, > .inScrollArea > .tabCon").removeClass("on").eq(idx).addClass("on");
                    $("select").fakeselect();
                }
                listStyle();
            }
        }
    })
    $(".tabWrap .tabList li.on").find("a").attr("title","선택됨");

    /*openContentArea*/
    $(document).on("click",".openContentArea > li > a",function(e){
        e.preventDefault();
        var idx = $(this).parent().index();
        var $targetWrap = $(this).closest(".openContentArea");
        var $target = $(this).parent();
        
        if(!$(this).hasClass("noReply")) {
            if ($targetWrap.hasClass("multi")) {
                if (!$target.hasClass("on")) {
                    $target.addClass("on").find("> a").attr("title","상세보기 닫기");
                    if($target.find(">a").hasClass("faq")){
                    	$target.addClass("on").find("> a").attr("title","답변 상세보기 닫기");
                    }
                    $target.find(".openContent").slideDown();
                } else {
                    $target.removeClass("on").find("> a").attr("title","상세보기 열기");
                    if($target.find(">a").hasClass("faq")){
                    	$target.removeClass("on").find("> a").attr("title","답변 상세보기 열기");
                    }
                    $target.find(".openContent").slideUp();
                }
            } else {
                if (!$target.hasClass("on")) {
                    $targetWrap.find(" > li").removeClass("on").find("> a").attr("title","상세보기 열기");
                    if($target.find(">a").hasClass("faq")){
                    	$targetWrap.find(" > li").removeClass("on").find("> a").attr("title","답변 상세보기 열기");
                    }
                    $targetWrap.find(" > li > .openContent").slideUp();
                    $target.addClass("on").find("a").attr("title","상세보기 닫기");

                    if($target.find(">a").hasClass("faq")){
                    	$target.addClass("on").find("> a").attr("title","답변 상세보기 닫기");
                    }
                    $target.find(".openContent").slideDown();
                } else {
                    $target.removeClass("on").removeClass("on").find("> a").attr("title","상세보기 열기");
                    if($target.find(">a").hasClass("faq")){
                    	$target.removeClass("on").removeClass("on").find("> a").attr("title","답변 상세보기 열기");
                    }
                    $target.find(".openContent").slideUp();
                }
            }
        }
    })


    /*confirmTable*/
    $(document).on("click",".confirmTable .dataSelect a",function(e){
        e.preventDefault();
        var idx = $(this).parent().index();
        var target = $(this).closest(".titleWrap").parent();
        var value = $(this).attr("data-media-value");
        if($(this).hasClass("yes") && target.find(".openClose").length > 0  && !target.find(".openClose").hasClass("on")){
            target.find(".openClose").addClass("on").slideDown();
        }
        if($(this).hasClass("no") && target.find(".openClose").length > 0  && target.find(".openClose").hasClass("on")){
            target.find(".openClose").removeClass("on").slideUp();
        }

    })
    /*dataSelect*/
    $(document).on("click",".dataSelect a",function(e){
        e.preventDefault();
        var idx = $(this).parent().index();
        var value = $(this).attr("data-media-value");
        var $target = $(this).closest(".dataSelect");
        if(!$target.hasClass("disabled")){
            $target.find("li").removeClass("on").eq(idx).addClass("on");
            if(idx == 1){
                $target.addClass("on");
            }
            $target.find("li a").attr("title","");
            $target.find("li").eq(idx).find("a").attr("title","선택됨");

            $target.find("input[type=hidden]").val(value);
            if($(".confirmTable .confirm").length == $(".confirmTable .confirm li.on .no").length){
                $(this).closest(".confirmTable").find(".checkbox.checkAll input").prop("checked",true);
                $(this).closest(".confirmTable").find(".checkbox.checkAll input").attr("checked",true);
            }else{
                $(this).closest(".confirmTable").find(".checkbox.checkAll input").prop("checked",false);
                $(this).closest(".confirmTable").find(".checkbox.checkAll input").attr("checked",false);
            }
        }
    })

    /*circleSlide*/
    $(document).on("click",".circleSlide",function(e){
	      e.preventDefault();
	      var idx;
	      var $target = $(this);
	      if(!$target.hasClass("disabled")){
	        if(!$(this).hasClass("on")){
	          idx = 1;
	          $target.addClass("on");
	          $target.parents('tr').next('.joinUseInput').attr('aria-hidden','false').addClass('on'); // 가입 시 추가정보 입력 /2204
	        }else{
	          idx = 0;
	          $target.removeClass("on");
	          $target.parents('tr').next('.joinUseInput').attr('aria-hidden','true').removeClass('on'); // 가입 시 추가정보 입력 /2204
	        }
		        var value = $target.find("li").eq(idx).find("a").attr("data-media-value");
		        $target.find("li").removeClass("on").eq(idx).addClass("on");
		        $target.find("li a").attr("title","");
		        $target.find("li a").attr("tabindex","-1");
		        $target.find("li").eq(idx).find("a").attr("title","선택됨");
		        $target.find("li").eq(idx).find("a").attr("tabindex","0").focus();
		        $target.find("input[type=hidden]").val(value);
	      }
    })

    /* fakeSelect */
    setTimeout(function(){
        selectChg();
    },10)

    $(document).on("change","select",function(){
        if($(this).val()==""){
            $(this).parent().find(".select-title").removeClass("value");
        }else{
            $(this).parent().find(".select-title").addClass("value");
        }
    })
    

	/* Help Focus - 웹접근성 /1902 */
	$('.bottomBtn .btnHelp').click(function() {
		$(this).attr("data-focus", ".helpPopWrap");
	});
    
    /*계산가입 도움말 스크립트*/
    $(document).on("click",".bottomBtn .btnHelp",function(e){
        e.preventDefault();
        if(!$(this).hasClass("on")){
            $(this).addClass("on");
            $(".helpPopWrap").slideDown();
        }else{
            $(this).removeClass("on");
            $(".helpPopWrap").slideUp(function(){
                $(".btnHelp").removeClass("backFocus");
            });
        }
    })
    $(document).on("click",".helpPopWrap .btnHelpClose",function(e){
        e.preventDefault();
        $(".bottomBtn .btnHelp").click();
    })
    $(document).on("click",".contentArea .btnHelp, .quickAreaRight .btnHelp",function(e){
        e.preventDefault();
        $(".btnHelp").removeClass("backFocus");
        $(e.target).addClass("backFocus");
        if(!$(this).hasClass("popupStyle")){
            var target = $(this).attr("href");
            $(".helpPopWrap .item").removeClass("on");            
            if(!$(".bottomBtn .btnHelp").hasClass("on")){
                $(".bottomBtn .btnHelp").addClass("on");
                $(".helpPopWrap").slideDown();
                $(".helpPopWrap .btnHelpClose").attr("data-focus", ".backFocus");

                setTimeout(function(){
                    $(".helpPopWrap .scrollArea").animate({"scrollTop":$(".helpPopWrap .scrollArea").scrollTop()+$(target).position().top},500)
					$(target).addClass("on").attr("tabindex","0").focus();
                },500)
            }else{
                $(".helpPopWrap .scrollArea").animate({"scrollTop":$(".helpPopWrap .scrollArea").scrollTop()+$(target).position().top},500)
            }
        }
    })


    /*resize*/
    $(window).on("resize",function(){
        $(".contentWrap .contentArea").css("min-height",$(document).height());

        /*보험상품 메인화면*/
        // if($(window).height() < 500){
        //     $("objFixedWrap").addClass("ab");
        // }else{
        //     $("objFixedWrap").removeClass("ab");
        // }
        $(".productMainWrap .productMainContentArea").css({"padding-bottom":$(".productMainWrap .productMainContentArea .bottomFixed").height()+20});
        $(".helpPopWrap .scrollArea").css({"height":$(window).height()-190});
    });
    setTimeout(function(){
        $(window).resize();
    },100)


    /*layerPop. 레이어팝업 여러개 동시에 뜨게 변경 */
    $(document).on("click",".layerPopWrap .btnClose",function(e){
        e.preventDefault();
        var target = $(this).attr("href");

        if(target == "#" || target == "#none" || target == "javascript:;"){
            $(".dim_bg").fadeOut();
            //$(".layerPopWrap").fadeOut();		//모든 레이어팝업 안 보이게 처리
            $(this).parent().fadeOut();			//X버튼 클릭한 레이어팝만 안 보이게 처리
            //closeLayer($(this).parent().attr("id"));
        }else{
            $(target+"_dim_bg").fadeOut();
            $(target).fadeOut();
        }
    })
    $(document).on("click","[data-focus]",function(e){
        e.preventDefault();
        var focus = $(this).attr("data-focus");
        $(focus).attr("tabindex","0").focus();
    })


    /*wordSelect*/
    $(document).on("click",".wordSelect .tab a",function(e){
        e.preventDefault();
        var idx = $(this).parent().index();
        var $target = $(this).closest(".wordSelect");
        $target.find("li").removeClass("on").eq(idx).addClass("on");
        $target.find(".wordSelectTabCon .tabCon").removeClass("on").eq(idx).addClass("on");
    })

    $(document).on("click",".itemList li a",function(e){
        e.preventDefault();
        if(!$(this).parent().hasClass("disabled")){
            var idx = $(this).parent().index();
            var $target = $(this).closest(".itemSelectArea");
            if($target.hasClass("multi")){
                if(!$(this).parent().hasClass("on") && !$(this).parent().hasClass("noToggle") && !$(this).parent().hasClass("disabled")){
                    $(this).parent().addClass("on");
                }else{
                    $(this).parent().removeClass("on");
                }
                if(!$(this).parent().hasClass("on") && $(this).parent().hasClass("noToggle") && !$(this).parent().hasClass("disabled")){
                    $(this).parent().addClass("on");
                }
            }else{
                $target.find(".itemList li").removeClass("on").eq(idx).addClass("on");
            }
        }
    })
    /*agreeBox txt 가장큰것 찾기*/
    setTimeout(function(){
        var maxWidth = 0;
        var maxHeight = 0;
        $(".agreeBox .titArea .txt:not('.full')").each(function(){
            if(maxWidth < $(this).outerWidth()){
                maxWidth = $(this).outerWidth();
            }
        })
        $(".agreeBox .btn").css("left",maxWidth+20);
        $(".agreeBox .txt.noSame").each(function(){
            $(this).parent().find(".btn").css("left",$(this).width()+20);
        })

        $(".fixedBannerArea .conArea").each(function(){
            if(maxHeight < $(this).outerHeight()){
                maxHeight = $(this).outerHeight();
            }
        })
        if(!$(".fixedBannerArea .bannerArea").hasClass("motor")){
            $(".fixedBannerArea .conArea").css("min-height",maxHeight);
        }else{
            $(".fixedBannerArea .conArea").css("min-height","0px");
        }
    },100)

    setInterval(function(){
        if($(".logo1").css("display") == "none"){
            $(".logo1").fadeIn();
            $(".logo2").fadeOut();
        }else{
            $(".logo1").fadeOut();
            $(".logo2").fadeIn();
        }
    },3000)
    $(".lnb .dep2 > li").each(function () {
        if($(this).find(".dep3").length > 0){
            $(this).addClass("sub");
        }
    })
    $(document).on("click",".lnb .dep2 > li > a",function(e){
        if($(this).parent().hasClass("sub")){
            e.preventDefault();
            if(!$(this).parent().hasClass("on")){
                $(".lnb .dep2 > li").removeClass("on")
                $(".lnb .dep2 > li .dep3").slideUp();
                $(this).parent().addClass("on");
                $(this).closest("li").find(".dep3").slideDown();
            }else{
                $(this).parent().removeClass("on");
                $(this).closest("li").find(".dep3").slideUp();
            }
        }
    })
    $(document).on("change",".inputFile .file",function(e){
        e.preventDefault();
        var val = $(this).val();
        $(this).closest(".inputBase").find(".fileInput").val(val);
    })

    $(document).on("click",".inputFile .btn",function(e){
        e.preventDefault();
        $(this).closest(".inputFile").find("input.file").click();
    })
    $(document).on("click",".quickArea .top a",function(e){
        e.preventDefault();
        $("body,html").stop().animate({"scrollTop":0},500);
    })
    $(document).on("click",".btnBannerClose",function(e){
        e.preventDefault();
        $(this).closest(".fullBannerWrap").slideUp();
    })
    $(document).on("click",".saleList .btnMore",function(e){
        e.preventDefault();
        if(!$(this).parent().find(".saleListContent").hasClass("open")){
            $(this).parent().find(".saleListContent").addClass("open");
            $(this).hide();
        }else{
            $(this).parent().find(".saleListContent").removeClass("open")
            $(this).show();
        }
    })

    //상품상세 상단고정
    if($(".productFixedMenu").length > 0){
        $(window).scroll(function(){
            var top = $(this).scrollTop();
						var gnbH=$('.gnbWrapSet').height(); // gnb height
						
						// 수정/20200617 if(top+gnbH > $(".contentArea.full").offset().top){
            if(top >= $(".contentArea.full").offset().top){
                $(".productFixedMenu, .productMenuIn").addClass("fixed");								
            }else{
                $(".productFixedMenu, .productMenuIn").removeClass("fixed");
            }
        })
    }
    //상품상세 유의사항
    $(document).on("click",".olListFocusBox a",function(e){
        e.preventDefault();
        var target = $(this).attr("href");
        $("body, html").animate({"scrollTop":$(target).offset().top-50},500,function(){
            $(target).attr("tabindex","-1").focus();
        })
    })
    
	//장기 공통팝업용 상품상세 유의사항
	$(document).on("click",".scrollBoxArea a",function(e){
		e.preventDefault();
		var target = $(this).attr("href");
		$(".PopScrollPonint").animate({"scrollTop":$(target).offset().top-50},500,function(){
			$(target).attr("tabindex","-1").focus();
		})
	 })
    
    //계약자 정보 입력 연락방식 선택
    $(document).on("change",".agreeContentOpenRadio",function(e){
        e.preventDefault();
        var val = $(this).val();
        if(val == "yes"){
            $(".agreeContentOpen").show();
            $(".agreeContentOpen .checkbox input").prop("checked",true);
            $(".agreeContentOpen .checkbox input").attr("checked",true);
        }else{
            $(".agreeContentOpen").hide();
            $(".agreeContentOpen .checkbox input").prop("checked",false);
            $(".agreeContentOpen .checkbox input").attr("checked",false);
        }
    })
    //계약자 정보 입력 연락방식 선택
    $(document).on("change","#telType, #c2cTelType",function(e){
        e.preventDefault();
        var val = $(this).val();
        var target = $(this).closest(".inputArea");
        target.find(".selectTelType").hide()
        target.find(".selectTelType."+val).show()
    })

    if($(".productMainWrap").length > 0){
        setTimeout(function(){
            fixedBannerPos();
        },500)
    }
    if($(".listStyle").length > 0){
        setTimeout(function(){
            listStyle()
        },500)
    }
    //상품 메인 이벤트 버튼
    $(document).on("click",".bottomFixed .eventBanner .btnOpen",function(e){
        e.preventDefault();
        if(!$(this).closest(".eventBanner").hasClass("on")){
            $(this).closest(".eventBanner").addClass("on");
        }else{
            $(this).closest(".eventBanner").removeClass("on");
        }
    })
    popupFocus();
    $(document).on("keydown",".popupFocus .btnClose",function(e){
        if(e.keyCode == 9 && !e.shiftKey){
            e.preventDefault();
            $(".popupFocus").focus();
        }
    })
    $(document).on("keydown",".popupFocus",function(e){
        if(e.keyCode == 9 && e.shiftKey && $(this).is(":focus")){
            e.preventDefault();
            $(".popupFocus .btnClose").focus();
        }
    })
    $(document).on("keydown",".popupFocus",function(e){
        if(e.keyCode == 9 && e.shiftKey && $(this).is(":focus")){
            e.preventDefault();
            $(".popupFocus .btnClose").focus();
        }
    })

})
function scrollTabindex(){
    $("*").each(function(){
        if($(this).css("overflow-y") == "scroll" || $(this).css("overflow-y") == "auto"){
            $(this).attr("tabindex",0);
        }
    })
}
function popupFocus(focus){
    setTimeout(function(){
        var firstTarget = $(".layerPopWrap").eq(0);
        $(".layerPopWrap, .alertArea").removeAttr("tabindex").removeClass("popupFocus");
        $(".layerPopWrap, .alertArea").each(function(){        	
        	if($(this).css("display") != "none"){
        		if(Number(firstTarget.css("z-index")) <= Number($(this).css("z-index"))){
                    firstTarget = $(this);
                }
        	}            
        })
        
        firstTarget.attr("tabindex",0).focus().addClass("popupFocus");
        if(focus){
            $(focus).attr("tabindex","0").focus();
        }
        scrollTabindex();
    },100)
}
function listStyle(){
    $(".listStyle").each(function(){
        var heightChk = null;
        var addGap = false;
        if($(this).find("li").length > 1){
            $(this).find("li").each(function(){
                if($(this).height() > 25 ){
                    addGap = true;
                }
            })
            if(addGap){
                $(this).removeClass("noGap");
            }else{
                $(this).addClass("noGap");
            }
        }
    })
}
function fixedBannerPos(){
    var top = ($(".productMainContentArea").outerHeight())-$(".productMainWrap .fixedBannerArea").outerHeight();
    $(".productMainWrap .fixedBannerArea").css("top",top);
    if($(".fixedBannerArea .bannerArea.plusMiddle").length > 0){
        var plusTop = ($(".bannerArea.plusMiddle li").height()/2)-14+"px";
        $("head").append("<style>.fixedBannerArea .bannerArea.plusMiddle li:after{top:"+plusTop+"}</style>")

    }

    //$("#precautionContent").show();
}
function inputAppend(){
    $(".inputBase").each(function(){
        if($(this).find("input").val() != ""){
            //$(this).find("label").css({"transition":"all 0s"})
            $(this).addClass("value");
            // $(this).find("label").removeAttr("style")
        }
    })
    $(".inputBase.datepicker input").each(function(){
        var $this = $(this);
        if($(this).closest(".datepicker").hasClass("multi")){
            $(this).datepicker({
                showOn:"both",
                buttonImage:"https://direct.hi.co.kr/images/common/btn_cal.png",
                buttonImageOnly : true,
                buttonText : "달력",
                dayNamesMin : ["일","월","화","수","목","금","토"],
                monthNames : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
                dateFormat : "yy-mm-dd",
                minDate : "-1y",
                maxDate : "+1y",
                numberOfMonths : 2,
                beforeShowDay : function(date){
                    var date1 = $this.closest(".inputTable").find(".start").datepicker("getDate");
                    var date2 = $this.closest(".inputTable").find(".end").datepicker("getDate");
                    return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
                },
                onSelect : function(){
                    $this.closest(".inputBase").addClass("value");
                    comm_ui_util.fn_SetDate($this);
                }
            })
        }else{
            $(this).datepicker({
                showOn:"both",
                buttonImage:"https://direct.hi.co.kr/images/common/btn_cal.png",
                buttonImageOnly : true,
                buttonText : "달력",
                dayNamesMin : ["일","월","화","수","목","금","토"],
                monthNames : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
                dateFormat : "yy-mm-dd",
                minDate : "-1y",
                maxDate : "+1y",
                onSelect : function(){
                    $this.closest(".inputBase").addClass("value");
                    comm_ui_util.fn_SetDate($this);
                }
            })
        }
    })
}

function selectChg(){
    $("select").each(function(){
        $(this).fakeselect();
        if($(this).val()==""){
            $(this).parent().find(".select-title").removeClass("value");
        }else{
            $(this).parent().find(".select-title").addClass("value");
        }
    })
}
function layerPopOpen(open,target){
    $(".dim_bg").fadeIn();
    $(".layerPopWrap."+open).fadeIn();
    $(window).scrollTop($(".layerPopWrap."+open).offset().top);
    $(".layerPopWrap").attr("data-media-target",target);
    selectChg();
}
var multiAlert = [];
var alertPopup = function(con,type,callback,focus) {
    var alertPop = ''
    alertPop += '<div class="alertSet">';
    alertPop += '<div class="dim_bg dim_alert"></div>';
    alertPop += '<div class="alertArea">';
    alertPop += '	<div class="titArea">';
    alertPop += '	</div>';
    alertPop += '	<div class="txtArea mt20">';
    alertPop += '		<ul class="exmark">';
    alertPop += '			<li class="alertTxt">'+con+'</li>';
    alertPop += '		</ul>';
    alertPop += '	</div>';
    alertPop += '	<div class="btnAreaWrap tac mt20">';
    if(type != "ok"){
        alertPop += '		<a href="#none" class="btn line m10h4 gray cancel"><span>취소</span></a>';
    }
    alertPop += '		<a href="#none" class="btn line m10h4 orange ok"><span>확인</span></a>';
    alertPop += '	</div>';
    alertPop += '	<a href="#" class="btnClose"><img src="https://direct.hi.co.kr/images/common/btn_alert_close.png" alt="닫기"></a>';
    alertPop += '</div>';
    alertPop += '</div>';
    $("body").append(alertPop);
    $(".alertArea").fadeIn();
    $(".dim_alert").fadeIn();
    $(".alertArea .btn.ok").unbind("click").bind("click",function(){
        var target = $(this).closest(".alertSet");
        alertHide(target,focus);
        if(typeof(callback) == "function"){
            callback(true);
        }
    })
    $(".alertArea .btnClose, .alertArea .btn.cancel").unbind("click").bind("click",function(){
        var target = $(this).closest(".alertSet");
        alertHide(target,focus);
        if(typeof(callback) == "function"){        	
            callback(false);            
            
        }
    })
    popupFocus()
}

var alertPopup2 = function(con,type,callback,focus) {
    var alertPop = ''
    alertPop += '<div class="alertSet">';
    alertPop += '<div class="dim_bg dim_alert"></div>';
    alertPop += '<div class="alertArea">';
    alertPop += '	<div class="titArea">';
    alertPop += '	</div>';
    alertPop += '	<div class="txtArea mt20">';
    alertPop += '		<ul class="exmark">';
    alertPop += '			<li class="alertTxt">'+con+'</li>';
    alertPop += '		</ul>';
    alertPop += '	</div>';
    alertPop += '	<div class="btnAreaWrap tac mt20">';
    alertPop += '		<a href="#none" class="btn line m10h4 orange ok"><span>확인</span></a>';
    if(type != "ok"){
    	alertPop += '		<a href="#none" class="btn line m10h4 gray cancel"><span>취소</span></a>';
    }
    alertPop += '	</div>';
    alertPop += '	<a href="#" class="btnClose"><img src="https://direct.hi.co.kr/images/common/btn_alert_close.png" alt="닫기"></a>';
    alertPop += '</div>';
    alertPop += '</div>';
    $("body").append(alertPop);
    $(".alertArea").fadeIn();
    $(".dim_alert").fadeIn();
    $(".alertArea .btn.ok").unbind("click").bind("click",function(){
        var target = $(this).closest(".alertSet");
        alertHide(target,focus);
        if(typeof(callback) == "function"){
            callback(true);
        }
    })
    $(".alertArea .btnClose, .alertArea .btn.cancel").unbind("click").bind("click",function(){
        var target = $(this).closest(".alertSet");
        alertHide(target,focus);
        if(typeof(callback) == "function"){        	
            callback(false);            
            
        }
    })
    popupFocus()
}
/*
function loadingStart() {
    var loadingPop = ''
    loadingPop += '<div class="loadingBg"></div>';
    loadingPop += '<div class="loadingWrap">';
    loadingPop += '    <div id="progressbox" class="box ">';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading01.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading02.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading03.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading04.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading05.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading06.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading07.png" alt="현대해상 다이렉트 로딩중" class="loadImg on" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading08.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading09.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading10.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading11.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading12.png" alt="현대해상 다이렉트 로딩중" class="loadImg" />';
    loadingPop += '    </div>';
    loadingPop += '    <div class="slogan">';
    loadingPop += '        <img src="https://direct.hi.co.kr/images/common/loading_direct_txt.png" alt="처리중입니다. 잠시만 기다려 주세요! 현대해상 다이렉트는 고객님의 정보를 보안프로그램, 암호화 등을 통하여 안전하게 처리하고 있습니다." />';
    loadingPop += '    </div>';
    loadingPop += '</div>';
    $("body").append(loadingPop);
    // Loading2017
    function loadingStart(){
        var obj=document.getElementById("progressbox");
        if(obj.className=="box") return;
        obj.className="box";
        loadingAni(0);
    }
    function loadingAni(ct){
        setTimeout(function(){
            var loadImg=$(".loadImg");
            var nextImg =ct+1 >= loadImg.length-1 ? 0 : ct+1;

            loadImg.removeClass("on").eq(nextImg).addClass("on");
            loadingAni(nextImg);
        },4000/60);
    };
    loadingStart();
}
*/

function loadingStart() {
    var loadingPop = ''
    loadingPop += '<div class="loadingWrap">';
    loadingPop += '    <div class="loading">';
    loadingPop += '        <p class="logo"><img src="https://direct.hi.co.kr/images/common/loading_txt.png" alt="현대해상 다이렉트"></p>';
    loadingPop += '        <p class="img"><img src="https://direct.hi.co.kr/images/common/loading2.gif" alt=""></p>';
    loadingPop += '        <p class="txt">처리중입니다. 잠시만 기다려주세요.</p>';
    loadingPop += '        <p class="txt2">현대해상 다이렉트와 함께 오늘도 즐거운 하루되세요.</p>';
    loadingPop += '    </div>';
    loadingPop += '</div>';
    $("body").append(loadingPop);
    $(".loadingWrap").fadeIn();
}

/* ECO마일리지 환급 보험료 /1809 */
function fnMileageLoading() {
    var loadingPop = ''
    loadingPop += '<div class="loadingWrap">';
    loadingPop += '    <div class="loading">';
    loadingPop += '        <p class="logo"><img src="https://direct.hi.co.kr/images/common/loading_txt.png" alt="현대해상 다이렉트"></p>';
    loadingPop += '        <p class="img"><img src="https://direct.hi.co.kr/images/common/loading2.gif" alt=""></p>';
    loadingPop += '        <p class="txt">처리중입니다. 잠시만 기다려주세요.</p>';
    loadingPop += '        <p class="txt2">ECO마일리지 환급 보험료를 갱신계약에<br />사용할 수 있도록 처리 중입니다.</p>';
    loadingPop += '    </div>';
    loadingPop += '</div>';
    $("body").append(loadingPop);
    $(".loadingWrap").fadeIn();
}

function loadingEnd() {
    $(".loadingWrap, .loadingBg").fadeOut(function(){
        $(".loadingWrap, .loadingBg").remove();
    });
}
function alertHide(target,focus){
    target.fadeOut();
    target.fadeOut(function(){
        target.remove();
        if(focus){
            $(focus).attr("tabindex","0").focus();
        }
    });
}
function multiAlertFunction(){
    for(i=0 ; i < multiAlert.length ; i++){
        alertPopup(multiAlert[i][0], multiAlert[i][1], alertHide)
    }
}

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