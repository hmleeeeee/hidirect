/**
 * @alias : 공통 Util Js 
 * @author : k.d.g
 */


/**
 * 공통약관페이지 이동(moveTermsPage) 
 * 약관 동의 하면 초기화(initTerms)
 * 약관 이벤트를 등록(initTermsAddEvent)
 * 약관 정보를 조회(getTermsInfo)
 * 공통session(common param)
 * 본인 인증 화면 이벤트 처리(initAgreeAddEvent)
 * ...
 */
var CommonUtil = function(){
	var _this = this;
	this.type = "hello";


    /* 
     * script List 에 자신이 찾고자 하는 js 가 있는지 확인  Like 검색임
     */
    this.findJs = function(jsName){
      var arr_rtn = [];
      $("script[src*='" + jsName + "']").each(function(i, src){
        arr_rtn.push(src);
      });
      return arr_rtn;
    };


    //빈값 인지 확인 
    this.isNull = function(value){
        if(value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)){
            return true; 
        }else{
            return false;
        }
    }
    
    // 셀렉트박스 값 세팅 
    this.selVal = function(selId, val){
        var $sel = $("#"+selId);
        if ($sel.length == 0) {
        	return;
        }
        
        if (_this.isNull(val) || typeof val == "undefined") {
        	val = $sel.find("option").eq(0).val();
        }
        $sel.val(val);
        $sel.siblings("span").find("strong").text($sel.find("option:selected").text());
        
    }


    /* 
     * 배열 안에 존재 하는 Object 의 필드 값과 일치 하는 하는 object 를 찾아서 반환한다.
     */
    this.getTargetObjectInArray = function(arrayObj, fieldName , jobCd){
        return $.grep(arrayObj, function(e){ if(eval("e." + fieldName) == jobCd){ return e; }}); 
    }
	

	/* 
	 *  숫자를 입력하면 [전화번호, 휴대폰] 형식 문자열로 반환
	 */

	this.phoneFomatter = function(num){
        var formatNum = '';
        if(num.length == 8){
            return num.replace(/(\d{4})-(\d{4})/, '$1-$2');
        }else if(num.length == 9){
            return num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
        }else if(num.length == 10){
            return num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }else{
            return num.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3' );     
        }
    }

	/* 
	 * 공통 약관 페이지로 이동 한다. 
	 * ------------------------------------
	 * {
				tranid 		: 트랜스 아이디
			, 	formid 		: 파라미터를 전송할 폼 아이디 
			,   pagename 	: 약관 동의와  본인 인증 후 이동할 페이지명
			,   prodcd  	: 상품코드 
				[
					8150    국내여행보험
					8158    국내여행보험 실손전용
					8400    해외여행보험
					8408    해외여행보험 실손전용
					8410    해외장기체류보험
					6930    골프보험
					3110    주택화재보험
					8370    자전거보험
					6940    스키보험
					210B    장기운전자보험
					106F    (유)연금보험
					107F    (무)연금보험
					1491    실손의료보험
					4960    주택화재상해보험
					210A    장기운전자보험
					107C    무배당
					106C    유배당
					196K    hicalleco
					8540    자동차보험
					5114    자동차보험(TM/개인용)
					5117    자동차보험(개인CM)
					5209    자동차보험(TM/업무용)
					5213    자동차보험(업무CM)
					5113    자동차보험(개인용오프)
					5208    자동차보험(업무용오프)
				]

		} 
	 *
	 */ 
	this.moveTermsPage= function(param){

		if(this.isNull(param)){
			alert("moveTermsPage 함수에 파라미터 값이  null 입니다.");
		}

		if(this.isNull(param.tranid)){
			alert("moveTermsPage 함수의 [tranid] 값이 null 입니다.")
			return;
		}

		if(this.isNull(param.formid)){
			alert("moveTermsPage 함수의 [formid] 값이 null 입니다.")
			return;
		}

		if(this.isNull(param.pagename)){
			alert("moveTermsPage 함수의 [pagename] 값이 null 입니다.")
			return;
		}

		if(this.isNull(param.prodcd)){
			alert("moveTermsPage 함수의 [prodcd] 값이 null 입니다.")
			return;
		}

		/* 
		 * 약관 페이지로 이동  
		 */
		HiJS.svr.doRequestForm(param.tranid, param.formid, "EX/EX/GIPC2220G.jsp");
	}



	this.rtnObj_list;
    this.choiceList_list; //약관에서 선택하지 않은 "선택사항목록" 

	/* 
	 * 약관 동의 화면 초기화 
	 */ 
	this.initTerms = function(obj){
		_this.getTermsInfo(obj);			// 약관 정보를 가져온다. 
        _this.initTermsAddEvent();
        //_this.initTermsPass(obj);			// 2019.12.04 가입설계동의 생략 프로세스 제거
	}

    
	/* 
	 * 약관 이벤트를 등록
	 */
    this.initTermsAddEvent = function(){
		/* 
         * 다음 버튼을 눌렀을 때에 세션에 동의 하지 않은 정보를 저장한다 나중에 결제 동의 화면에서 보여주기 위함
         */
    	$(document).off('click.event', '.btn.next');
        $(document).on('click.event', '.btn.next', function(){
            var $suntaek   = $(".agreeBox.checkAllSetItem:eq(1) ul");       //(선택)상품 소개를 위한 동의 영역

            var $arr_NotCheckComboList =  $suntaek.find("[value=Y]:not(:checked)") ; //체크하지 않은 콤보들을 추출 한다.
            
            var arr_choiceNameList = [];
            if($arr_NotCheckComboList.length > 0){
            	arr_choiceNameList.push("BFZZ00");
            }
            
            for (var i = 0; i < $arr_NotCheckComboList.length; i++) {
            	//BFZZ07 --> 마케팅동의 관련 보종별 07로 전부 예외처리 되어있음 따라서 공통에서 수정 처리
            	if($arr_NotCheckComboList.eq(i).attr('name') == "BFZZ07"){
            		arr_choiceNameList.push("BFZZ01");
            	}else{
            		arr_choiceNameList.push($arr_NotCheckComboList.eq(i).attr('name'));
            	}
            }
            
            var obj = {};
            obj.choiceList = arr_choiceNameList;
            comm_ui_util.setSessionObj(obj);
            
            // 계피상이 일 경우 계약자 기준으로 상품소개동의 보여주기 위한 세팅 202007
            if(typeof fn_callbackMTOnly == 'function'){	//자동차 예외처리
        		fn_callbackMTOnly();
        	}
            
        });
        
        $(document).off('change.event1', '#agreeAll1');
        $(document).on('change.event1', '#agreeAll1', function(){
        	if($(this).is(":checked")){
				$(".checkAllSet:eq(0) input.yes").prop("checked", true);
				$(".checkAllSet:eq(0) input.no").prop("checked", false);
			}else{
				$(".checkAllSet:eq(0) input.yes").prop("checked", false);
				$(".checkAllSet:eq(0) input.no").prop("checked", true);
			}
        });
	}
    
    
    /* 2019.12.04 가입설계동의 생략 프로세스 제거
     * 
	 * 가입설계동의 생략 여부 확인(commonParamVO.pravAgrmPass)
	 *
    this.initTermsPass = function(obj){
    	var termsBlock;					// 가입설계동의 생략 프로세스 차단여부
    	var pravAgrmCode;				// MTPC0120G, MTPC0500G 가입설계동의 생략 예외처리를 위한 코드 (실명조회 : 0120, 계피상이건 : 0500)
    	if(obj != null){
    		termsBlock = obj.termsBlock;
    		pravAgrmCode= obj.pravAgrmCode;
    	}
    	
    	var common_session_info =  comm_ui_util.getSessionObj();
    	common_session_info.pravAgrmCode = pravAgrmCode;
    	
    	console.log("termsBlock====" + termsBlock);
    	
    	// 자동차만 가입설계동의 생략 적용
    	var val_prodCd        = common_session_info.prodCd; //상품코드
    	
    	if(comm_ui_util.isNull(termsBlock) && val_prodCd == "10061001"){
	    	var rtn;
			HiJS.svr.doRequestAjax("DHCO0310M05S", {
				data : common_session_info,
				loadingbar : false,
				async : false, 
				callback : {
					success : function(responseObj) {
						console.log("pravAgrmPass====" + responseObj.data.pravAgrmPass);
						rtn = responseObj.data.pravAgrmPass;
						
						if(rtn == "Y"){
							//자동차 MTPC0120G 에서만 실명조회(기존로직)
							if(pravAgrmCode == "0120"){
								realNmCheck();
							}
							
							$(".btn.prev").on('click', fnMovePre);
							//동의 화면 생략
							$(window).load(function(){
								$("#contents1").hide();
								$("#contents2").show();	
							});
						}
					}
					,
					failure:function(result) {
						console.log(result);
					}
				}
			});
    	}
	}
	*/


	/* 
	 * 약관 정보를 가져온다.
	 * ---------------------------------  
	 * 	prodCd 코드 목록 
	 * ---------------------------------
	 *  "10061001"   : 자동차보험(MOTOR) 
	 *  "10061010"   : 자동차보험 법인(MOTOR2) 
	 *  "10061002"   : 골프보험(GOLF) 
	 *  "10061003"   : 주택화재보험(HOUSE) 
	 *  "10061014"   : 주택화재상해보험(HOUSEINJURY) 
	 *  "10061004"   : 해외여행보험(FOREIGN) 
	 *  "10061012"   : 장기체류보험(LONGFOREIGN) 
	 *  "10061005"   : 국내여행보험(DOMESTIC) 
	 *  "10061013"   : 실손의료비보험(MEDICINE) 
	 *  "10061007"   : 장기운전자보험(LTERM) 
	 *  "10061008"   : 무배당 연금보험(PENSION) 
	 *  "10061009"   : 유배당 연금보험(PENSION2) 
	 *  "10061025"   : 무배당 수관용 연금보험(PENSION3) 
	 *  "10061011"   : 공인인증 전자서명(SELFSIGN)
	 *  "10061035"   : 장기 어린이보험(CHDRN)
	 *  "10061038"   : 전환형실손보험(SCHMD)   
	 */
	this.getTermsInfo = function(obj){
		var suntaekView;						// 상품소개동의 무조건 보여짐
    	if(obj != null){
    		suntaekView= obj.suntaekView;
    	}
		var common_session_info =  comm_ui_util.getSessionObj();

		var val_prodCd        = common_session_info.prodCd; //상품코드
		var val_ctrtrPtyKorNm = common_session_info.ctrtrPtyKorNm; //계약자
		var val_ptyKorNm      = common_session_info.ptyKorNm; //계약자
		var val_insrdNm       = common_session_info.insrdNm; //피보험자
		
		if(this.isNull(val_prodCd)){
			alertPopup("약관 정보를 조회 하는 데 필요한 상품코드가 없습니다.", "ok");	
			return ; 
		}
		
		var ctrtrCat = common_session_info.ctrtrCat; //계피 불일치 여부
		var agmtKind = common_session_info.agmtKind; //해외장기체류 가입유형
		
		console.log("mktgUtlAgrmExistYn====" + common_session_info.mktgUtlAgrmExistYn);
		
		// 마케팅활용 기동의여부
		var val_mktgUtlAgrmExistYn = common_session_info.mktgUtlAgrmExistYn;
		
		var requestSmsVO = {};
        requestSmsVO.insProdCd = "TM000001";

        HiJS.svr.doRequestAjax("DHCO0310M04S", {  //ajax 
            data : requestSmsVO,
            loadingbar : false,
            async :false,
            callback : {
                success : function(responseObj) {
                    _this.rtnObj_list = responseObj.data.dhco0310voList;

                    /* 
                     * cashing 처리 
                     */
                    var $filsu     = $(".agreeBox.checkAllSetItem:eq(0) ul:eq(0)"); //(필수)신용 정보 처리 동의 영역
                    var $suntaek   = $(".agreeBox.checkAllSetItem:eq(1) ul");       //(선택)상품 소개를 위한 동의 영역
                    var $mingam    = $(".agreeBox.checkAllSetItem:eq(0) ul:eq(1)"); //민감정보 및 고유식별정보의 처리에 관한 사항 (영역)
                    var $TMPN      = $("[name=TMPN_TAMPLETE]");                       // 예외로 연금만 이정보가 들어 간다. 
                    
                    /* 
                     * 민감정보 영역을 숨긴다. (값이 있을 때만 보여줌)
                     */
                    
                    // 2021.05 민감정보 삭제
                    // $(".subTit.tline").hide();                              // [민감정보 및 고유식별정보의 처리에 관한 사항] 제목 영역을 숨긴다. 
                    // $mingam.hide();   // [민감정보] 리스트 영역을 숨긴다.

                    /* 
                     *
                     */
                    $filsu.html("");             //(필수)신용 정보 처리 동의   초기화
                    $suntaek.html("");           //(선택)상품 소개를 위한 동의 초기화
                    $mingam.html("");            //민감정보 및 고유식별정보의 처리에관 한 사항 (영역) 
                    
                    var filsuArray = new Array();
					var suntaekArray = new Array();
					var mingamArray = new Array();

                    for (var i = 0; i < _this.rtnObj_list.length; i++) {

                        if(_this.rtnObj_list[i].delYn == "N"){ //삭제 대상이 아닌것만
                        	var cntnMgntId 				=  _this.rtnObj_list[i].cntnMgntId;
                            var val_title               =  _this.rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, "");; //동의 제목
                            var val_cnts				=  _this.rtnObj_list[i].cnts; //동의 내용
                            var val_cntnOptCat          =  _this.rtnObj_list[i].cntnOptCat; //컨텐츠 옵션구분 코드
                            var val_radio_id_yes        =  _this.rtnObj_list[i].cntnMgntId + "_1"; //[동의] id 
                            var val_radio_id_no         =  _this.rtnObj_list[i].cntnMgntId + "_2"; //[미동의] id
                            var $li_new                 = $("<li/>");
                            
                            //BFZZ07 --> 마케팅동의 관련 보종별 indexOf("07") 로 전부 예외처리 되어있음 따라서 공통에서 수정 처리
                            if(_this.rtnObj_list[i].cntnMgntId == 'BFZZ01'){
                            	cntnMgntId = "BFZZ07";
                            	val_radio_id_yes = "BFZZ07_1";
                            	val_radio_id_no = "BFZZ07_2";
                            }
                            
                            // 필수동의 질병상해 민감정보 동의 자동차제외 문구추가 202007 (자동차만)	
                            if(_this.rtnObj_list[i].cntnMgntId == "BFAA04" && (val_prodCd == "10061001" || val_prodCd == "10061010")){
                            	val_title = val_title + "<br /> - 자동차보험은 해당없음";
                            }

                            /* 
                             * [ (필수) 개인(신용)정보 처리 동의 ] 부분 처리  
                             */
                            var $new_li_div1         =  $('<div/>').attr({class: 'titArea'}).appendTo($li_new);
                            var $new_li_div1_span    =  $('<span/>').attr({class : 'txt'}).html(val_title).appendTo($new_li_div1);
                            var $new_li_div1_a       =  $('<a/>').attr({href:'#none', class:'btn small2', title:'자세히보기', style:'left: 490px;', code:_this.rtnObj_list[i].cntnMgntId}).appendTo($new_li_div1);
                            var $new_li_div1_a_span  =  $('<span/>').text('자세히보기').appendTo($new_li_div1_a);
                            
                            /* 
                             * val_cntnOptCat =   "08": 문구상단 과 "09": 문구하단 일때는  [동의], [미동의] 버튼을 넣지 않는다. 
                             */ 
                            //if(val_cntnOptCat != "08" && val_cntnOptCat != "09" && val_cntnOptCat != "05"){
                            //if((val_prodCd == "10061013" || val_prodCd == "10061035") && ctrtrCat == 'Y' && _this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') != 0 && _this.rtnObj_list[i].cntnMgntId.indexOf('BFAA00') != 0){ //실손, 어린이면 
							if((val_prodCd == "10061013" || val_prodCd == "10061035"|| val_prodCd == "10061038") && ctrtrCat == 'Y' && _this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') != 0 && _this.rtnObj_list[i].cntnMgntId.indexOf('BFAA00') != 0){ //실손, 어린이, 전환형실손면 
								var $new_li_ul                 =  $('<ul/>').attr({class : 'agreeRadio '}).appendTo($li_new);
								var $new_li_ul_li1             =  $('<li/>').appendTo($new_li_ul);
								var $new_li_ul_li1_sapn        =  $('<span/>').attr({class : 'txt'}).html("계약자(" + val_ctrtrPtyKorNm + ")").appendTo($new_li_ul_li1);
								
								var $new_li_ul_li1_div1   	   =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li1);
								var $new_li_ul_li1_div1_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_ul_li1_div1);
								var $new_li_ul_li1_div1_span   =  $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_ul_li1_div1);
								var $new_li_ul_li1_div2        =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li1);
								var $new_li_ul_li1_div2_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_no, class: 'no' , value: 'N' }).appendTo($new_li_ul_li1_div2);
								var $new_li_ul_li1_div2_span   =  $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_ul_li1_div2);
								
								var $new_li_ul_li2             =  $('<li/>').appendTo($new_li_ul);
								var $new_li_ul_li2_sapn        =  $('<span/>').attr({class : 'txt'}).html("피보험자(" + val_ptyKorNm + ")").appendTo($new_li_ul_li2);
								
								var $new_li_ul_li2_div1   	   =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li2);
								var $new_li_ul_li2_div1_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_ul_li2_div1);
								var $new_li_ul_li2_div1_span   =  $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_ul_li2_div1);
								var $new_li_ul_li2_div2        =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li2);
								var $new_li_ul_li2_div2_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_no, class: 'no' , value: 'N' }).appendTo($new_li_ul_li2_div2);
								var $new_li_ul_li2_div2_span   =  $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_ul_li2_div2);
							
							}else if(val_prodCd == "10061012" && agmtKind == '04' && _this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') != 0){ //장기체류 
								var $new_li_ul                 =  $('<ul/>').attr({class : 'agreeRadio '}).appendTo($li_new);
								var $new_li_ul_li1             =  $('<li/>').appendTo($new_li_ul);
								var $new_li_ul_li1_sapn        =  $('<span/>').attr({class : 'txt'}).html("계약자(" + val_ptyKorNm + ")").appendTo($new_li_ul_li1);
								
								var $new_li_ul_li1_div1   	   =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li1);
								var $new_li_ul_li1_div1_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_ul_li1_div1);
								var $new_li_ul_li1_div1_span   =  $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_ul_li1_div1);
								var $new_li_ul_li1_div2        =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li1);
								var $new_li_ul_li1_div2_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_no, class: 'no' , value: 'N' }).appendTo($new_li_ul_li1_div2);
								var $new_li_ul_li1_div2_span   =  $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_ul_li1_div2);
								
								var $new_li_ul_li2             =  $('<li/>').appendTo($new_li_ul);
								var $new_li_ul_li2_sapn        =  $('<span/>').attr({class : 'txt'}).html("피보험자(" + val_insrdNm + ")").appendTo($new_li_ul_li2);
								
								var $new_li_ul_li2_div1   	   =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li2);
								var $new_li_ul_li2_div1_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_ul_li2_div1);
								var $new_li_ul_li2_div1_span   =  $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_ul_li2_div1);
								var $new_li_ul_li2_div2        =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li2);
								var $new_li_ul_li2_div2_input  =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_no, class: 'no' , value: 'N' }).appendTo($new_li_ul_li2_div2);
								var $new_li_ul_li2_div2_span   =  $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_ul_li2_div2);
							
							/*}else if(val_prodCd == "10061004" && agmtKind == '04' && _this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') != 0){ // 해외여행 
								var $new_li_ul                 =  $('<ul/>').attr({class : 'agreeRadio '}).appendTo($li_new);
								var $new_li_ul_li1             =  $('<li/>').appendTo($new_li_ul);
								var $new_li_ul_li1_sapn        =  $('<span/>').attr({class : 'txt'}).html("계약자(" + val_ptyKorNm + ")").appendTo($new_li_ul_li1);
								var $new_li_ul_li1_div         =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li1);
								var $new_li_ul_li1_div_input   =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_ul_li1_div);
								var $new_li_ul_li1_div_span    =  $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_ul_li1_div);
								
								var $new_li_ul_li2             =  $('<li/>').appendTo($new_li_ul);
								var $new_li_ul_li2_sapn        =  $('<span/>').attr({class : 'txt'}).html("피보험자(" + val_insrdNm + ")").appendTo($new_li_ul_li2);
								var $new_li_ul_li2_div         =  $('<div/>').attr({class : 'radio', style : 'float:right'}).appendTo($new_li_ul_li2);
								var $new_li_ul_li2_div_input   =  $('<input/>').attr({type:'checkbox', name: _this.rtnObj_list[i].cntnMgntId , id: val_radio_id_no, class: 'yes' , value: 'Y' }).appendTo($new_li_ul_li2_div);
								var $new_li_ul_li2_div_span    =  $('<label/>').attr({for: val_radio_id_no}).html('동의함').appendTo($new_li_ul_li2_div);
							*/
							}else{
								
								if(_this.rtnObj_list[i].cntnMgntId != "BFAA00" && _this.rtnObj_list[i].cntnMgntId != "BFZZ00"){
									var $new_li_div2        =  $('<div/>').attr({class : 'agreeRadio'}).appendTo($li_new);
									var $new_li_div2_div1   =  $('<div/>').attr({class : 'radio'}).appendTo($new_li_div2);
									
									//if(val_cntnOptCat == "02"){ //선택 동의 이면
									//선택동의(BFZZ) radio, 필수동의(BFAA) checkbox
									if(_this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') >= 0){
										// 선택동의
										var $new_li_div2_div1_input = $('<input/>').attr({type:'radio', name: cntnMgntId, id: val_radio_id_no,  class: 'no' , value: 'N' }).appendTo($new_li_div2_div1);
										var $new_li_div2_div1_label = $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_div2_div1);
										var $new_li_div2_div2       = $('<div/>').attr({class : 'radio', style: 'margin-left: 7px;'}).appendTo($new_li_div2);
										var $new_li_div2_div2_input = $('<input/>').attr({type:'radio', name: cntnMgntId, id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_div2_div2);
										var $new_li_div2_div2_label = $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_div2_div2);
										
									}else{
										// 필수동의 checkbox --> 뒷단(MTPC0120G) 에서 $(".checkAllSet:eq(0) :checkbox[value=Y]:visible") 으로 처리.
										var $new_li_div2_div1_input = $('<input/>').attr({type:'checkbox', name: cntnMgntId, id: val_radio_id_no,  class: 'no' , value: 'N' }).appendTo($new_li_div2_div1);
										var $new_li_div2_div1_label = $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_div2_div1);
										var $new_li_div2_div2       = $('<div/>').attr({class : 'radio', style: 'margin-left: 7px;'}).appendTo($new_li_div2);
										var $new_li_div2_div2_input = $('<input/>').attr({type:'checkbox', name: cntnMgntId, id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_div2_div2);
										var $new_li_div2_div2_label = $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_div2_div2);
										
									}
								}
								/* else{
									// 필수,선택 소비자 권익보호에 관한 사항 내용 노출 처리
									$($li_new).prepend('<h4 class="subTit tline"></h4>');	// 라인 추가
									$($new_li_div1).append(val_cnts);						// 동의 내용 추가
									$($new_li_div1).find('a').remove();						// 자세히보기 제거
									$($new_li_div1).css('max-width','100%');				// max-width 변경
								} */
							}
							//}

                            //if(val_cntnOptCat == "01" || val_cntnOptCat == "08" ){            //01 : 필수 , 08: 문구상단
                            if(_this.rtnObj_list[i].cntnMgntId.indexOf('BFAA') >= 0){
                            	if(_this.rtnObj_list[i].cntnMgntId == 'BFAA04' || _this.rtnObj_list[i].cntnMgntId == 'BFAA05'){
                                    mingamArray.push($li_new);
                                }else{
                                	filsuArray.push($li_new);
                                }
                            //}else if(val_cntnOptCat == "02" || val_cntnOptCat == "09"){       //02 : 선택 , 09: 문구하단
                       		}else if(_this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') >= 0){
                                // [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우
                                //if (val_cntnOptCat == "02" && (_this.rtnObj_list[i].cntnMgntId.indexOf("07")>= 0 || _this.rtnObj_list[i].cntnMgntId.indexOf("16")>= 0 )&& val_mktgUtlAgrmExistYn == "Y") {
                       			if(_this.rtnObj_list[i].cntnMgntId == "BFZZ02" || _this.rtnObj_list[i].cntnMgntId == "BFZZ03"){
                       				//skip
                       			}else if( (val_prodCd == "10061001" || val_prodCd == "10061010") && _this.rtnObj_list[i].cntnMgntId == "BFZZ15"){
                       				//보험개발원약관 자동차만 skip
	                       		}else{
	                       			suntaekArray.push($li_new);
	                       		}
                            }
                        }
                    }
                    
                    // 필수동의
                    if(filsuArray.length > 0){
	                    $.each(filsuArray, function(idx, value){
	                    	$filsu.append(value);
						});
                    }
                    
					// 필수동의(민감정보) 2021.05 민감정보 삭제
					/*if(mingamArray.length > 0){
						$(".subTit.tline").show();  
                        $mingam.show();
						
						$.each(mingamArray, function(idx, value){
	                    	$mingam.append(value);
						});
					}*/
					
					// 선택동의
					if(suntaekArray.length > 0){
						if(val_mktgUtlAgrmExistYn == "Y"){		// 마케팅동의 기동의 여부
							if(suntaekView == "Y"){				// 상품소개동의 무조건 보여짐
								$.each(suntaekArray, function(idx, value){
									$suntaek.append(value);
								});
							}else{
								//skip
							}
						}else{
							$.each(suntaekArray, function(idx, value){
								$suntaek.append(value);
							});
						}
					}
                    
                    /* 
                     * 연금상품일때는  연금만 사용하는 영역을 보여준다. 
                     */
                    var prodCd = comm_ui_util.getSessionObj().prodCd;
                    if(!comm_ui_util.isNull(prodCd) && (prodCd == "10061009" || prodCd == "10061008" || prodCd == "10061025")){
                    	//console.log('-------------5');
                        $TMPN.show(); //연금란을 보인다
                    }else{
                    	//console.log('-------------5(2)');
                        $TMPN.hide(); //연금란을 숨긴다
                    }


                    /* 
                     * 자동차도 제휴 때문에 예외 케이스가 생겼다................................................................................................................................으휴..
                     */
                    var obj_session        =  comm_ui_util.getSessionObj();
                    var val_cnc_no         =  obj_session.cncNo  ;            //제휴처 고객번호 
                    var val_media_no       =  obj_session.mediaNo ;           //캠페인 ID
                    var val_threeAgreeYn   =  obj_session.threeAgreeYn ;      //3자 동의 여부 Y:동의 
                    
                    if( 
                            !comm_ui_util.isNull(val_cnc_no)
                        &&  !comm_ui_util.isNull(val_media_no)
                        &&  val_threeAgreeYn == "Y"
                    ){
                    	//console.log('-------------5(3)');	
                      var $jehu_html =  '<br>' + '<br>' + '<br>' 
                                    +  '<div class="inputTable checkAllSet">'
                                    +      '<div class="title">'
                                    +          '<h3 class="tit"><span class="fontPoint2">(선택)</span> 제휴 소개를 위한 동의</h3>'
                                    +      '</div>'
                                    +      '<div class="agreeBox checkAllSetItem">'
                                    +          '<ul>'
                                    +           '<li><div class="titArea"><span class="txt"> 개인(신용) 정보의 수집·이용에 관한 사항</span><a href="#none" class="btn small2" title="자세히보기" style="left: 305px;" code="CMMD15" cntnoptcat="02"><span>자세히보기</span></a></div><div class="agreeRadio"><div class="radio"><input type="radio" name="CMMD15" id="CMMD15_1" class="yes" value="Y"><label for="CMMD15_1">동의함</label></div><div class="radio" style="margin-left: 7px;"><input type="radio" name="CMMD15" id="CMMD15_2" class="no" value="N"><label for="CMMD15_2">동의하지 않음</label></div></div></li>'
                                    +          '</ul>'
                                    +      '</div>'
                                    + '</div>';
                      $suntaek.parent().parent().append($jehu_html);

                      $("a[code=CMMD15]").off('click');
                      $("a[code=CMMD15]").on('click', function(){
                          comm_ui_util.commlayerPopup('termlayerPop_jehu', function(){ });
                      });

                      $("[name=CMMD07]").off('change')
                      $("[name=CMMD07]").on('change', function(){
                        $("[name=CMMD15]").prop("checked", false);
                        $("[name=CMMD15][value=" + $("[name=CMMD07]:checked").val() + "]").prop("checked", true);
                      });

                      $("[name=CMMD15]").off('change')
                      $("[name=CMMD15]").on('change', function(){
                        $("[name=CMMD07]").prop("checked", false);
                        $("[name=CMMD07][value=" + $("[name=CMMD15]:checked").val() + "]").prop("checked", true);
                      });
                    }

                    /* 
                     * (선택) 상품 소개를 위한 동의 란이 비어 있음으면 숨긴다.
                     */
                    if($(".contentWrap:visible .inputTable.checkAllSet:eq(1) li").length < 1){
                      $(".contentWrap:visible .inputTable.checkAllSet:eq(1)").hide();
                      $("#agreeAll2").remove();
                      /*
                      if(_menuId == 'e8ef5f0812'){ //자동차
                    	  $(".agreeBox.checkAllSetItem:eq(1)").hide();
                    	  $(".btnAllChkArea .btnAllChk:eq(0)").removeClass("on");
                      }*/
                    }else{
                      $(".contentWrap:visible .inputTable.checkAllSet:eq(1)").show();
                    }
                    
                    // 필수동의 모든항목 일괄 선택/해제
                    $(document).on("click", ".checkAllSet:eq(0) :checkbox", function(){
            			var checkVal = $("#"+$(this).attr("id")).val();
            					
            			if(checkVal == 'Y'){
            				$(this).parents(".agreeRadio").find("input.yes").prop("checked", true);
            				$(this).parents(".agreeRadio").find("input.no").prop("checked", false);
            			}else{
            				$(this).parents(".agreeRadio").find("input.yes").prop("checked", false);
            				$(this).parents(".agreeRadio").find("input.no").prop("checked", true);
            			}
            		});
            		
                	// 선택동의 모든항목 일괄 선택/해제
            		$(document).on("click", ".checkAllSet:eq(1) :radio", function(){
            			var checkVal = $("#"+$(this).attr("id")).val();
            			$(".checkAllSet:eq(1) :radio[value="+checkVal+"]").prop("checked", true);
            		});
            		
            		// 개인(신용)정보의 수집·이용동의 선택시 가입권유 모두 동의
            		$(document).on("click", "input[id=BFZZ07_1]", function(){
            			$("#agreeSelect1").val("Y");
            			$("#agreeSelect2").val("Y");
            			$("#agreeSelect3").val("Y");
            			$("#agreeSelect4").val("Y");
            		});
            		
                    /* 
                     * 자세히 보기 이벤트
                     */
                    $(".btn.small2").off('click');
                    $(".btn.small2").on('click', function(){    
                        var val_code = $(this).attr('code');
                        /* 
                         * trim 처리 
                         */
                        val_code = $.trim(val_code);
                        for (var i = 0; i < _this.rtnObj_list.length; i++) {
                            
                            if(_this.rtnObj_list[i].cntnMgntId == val_code){
                                var $popHtml = comm_ui_util.commlayerPopup('termlayerPop', function(){ });
                                
                                $popHtml.find(".btnClose").attr("data-focus","[code="+val_code+"]" );
                                $popHtml.find(".btn.orange").attr("data-focus","[code="+val_code+"]");
                                popupFocus();
                                
                                $popHtml.find('.titleArea h2').html(_this.rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, ""));                          //제목
                                $popHtml.find(".popAgreeScroll").html(_this.rtnObj_list[i].cnts); //내용 
                                
                                // 필수, 선택동의 내용 PC/모바일 공통 DB조회 --> 2021.05 동의내용 개편에 따른 PC/모바일 구분 처리
                                $popHtml.find("#agreeWeb").show();
                                $popHtml.find("#agreeMob").hide();
                            	
                                // 선택동의이고, [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우만. 자동차 제외
                                if (_this.rtnObj_list[i].cntnMgntId == "BFZZ01") {
                                	
                                	if($("#agreeSelect1").val() != "Y"){
                                    	$("#agreeTel").prop("checked", false);
                                    }
                                    if($("#agreeSelect2").val() != "Y"){
                                    	$("#agreeSms").prop("checked", false);
                                    }
                                    if($("#agreeSelect3").val() != "Y"){
                                    	$("#agreeEmail").prop("checked", false);
                                    }
                                    if($("#agreeSelect4").val() != "Y"){
                                    	$("#agreePost").prop("checked", false);
                                    }
                                	
                                	//상품소개동의 개인정보 유효기간
                                	if($("#agrmExprYear").val() != undefined && $("#agrmExprYear").val() != ""){
                                    	var val = $("#agrmExprYear").val();
                                    	$("input:radio[name=agrmExprCltWeb][value="+val+"]").prop("checked", true);
                                    }
                                    
                                    $("#agreeCntnMgntId").val(_this.rtnObj_list[i].cntnMgntId);
                                }
                                
                                if( _this.rtnObj_list[i].cntnMgntId == "BFZZ04"){
                                	//상품소개동의 개인정보 유효기간
                                    if($("#agrmExprYear").val() != undefined && $("#agrmExprYear").val() != ""){
                                    	var val = $("#agrmExprYear").val();
                                    	$("input:radio[name=agrmExprPrdWeb][value="+val+"]").prop("checked", true);
                                    }
                                    
                                    $("#agreeCntnMgntId").val(_this.rtnObj_list[i].cntnMgntId);
                                }
                                
                                $("#termlayerPop").css("top", Math.max(0, (($(window).height() - $("#termlayerPop").outerHeight()) / 2) + $(window).scrollTop()) + "px");
                                $popHtml.find(".btn.line.inlineBlock.orange").off('click.orange');
                                $popHtml.find(".btn.line.inlineBlock.orange").on('click.orange', function() {
                                	if ($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ01"){
                                		var chkVal = 0;
                                		// 전화
                                		$("#agreeSelect1").val("Y");
                                		if (!$("#agreeTel").prop("checked")) {
                                			$("#agreeSelect1").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 문자
                                		$("#agreeSelect2").val("Y");
                                		if (!$("#agreeSms").prop("checked")) {
                                			$("#agreeSelect2").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 이메일
                                		$("#agreeSelect3").val("Y");
                                		if (!$("#agreeEmail").prop("checked")) {
                                			$("#agreeSelect3").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 전화
                                		$("#agreeSelect4").val("Y");
                                		if (!$("#agreePost").prop("checked")) {
                                			$("#agreeSelect4").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 개인정보 보유기간 선택(5년/4년/3년)
                                		var agrmExprYear = $(":radio[name=agrmExprCltWeb]:checked").val();
                                		if(agrmExprYear != ""){
                                			$("#agrmExprYear").val(agrmExprYear);
                                		}
                                		
                                		// 선택동의 미동의 확인 (선택동의만 .suntaek)                         		
                                		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                                			$(".checkAllSet:eq(1) :radio.no").prop("checked", true);
                                			comm_ui_util.commlayerClosePopup();
                                		}else{
                                			if(chkVal == 4){
                                    			alertPopup('가입권유 연락방식을 1개 이상 선택해주시기 바랍니다.',"ok",function(){
                                    				return false;
                                    			});
                                    		}else{
                                    			$(".checkAllSet:eq(1) :radio.yes").prop("checked", true);
                                    			comm_ui_util.commlayerClosePopup();
                                    		}
                                		}
                                		
                                	}else if($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ04"){
                                		// 개인정보 보유기간 선택(5년/4년/3년)
                                		var agrmExprYear = $(":radio[name=agrmExprPrdWeb]:checked").val();
                                		if(agrmExprYear != ""){
                                			$("#agrmExprYear").val(agrmExprYear);
                                		}
                                		
                                		// 선택동의 미동의 확인 (선택동의만 .suntaek)
                                		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                                			$(".checkAllSet:eq(1) :radio.no").prop("checked", true);
                                		}else{
                                			$(".checkAllSet:eq(1) :radio.yes").prop("checked", true);
                                		}
                                		comm_ui_util.commlayerClosePopup();
                                		
                                	}else{
                                		
                                		// 자세히보기 내용 라디오버튼 항목 확인 (필수동의만 .filsu)
                                		if( $popHtml.find("#agreeWeb .filsu.agreeRadio.fr").size() > 0){
	                                    	var $nas = $popHtml.find("#agreeWeb .filsu.agreeRadio.fr");
	                                    	for(var i = 0; na = $nas[i]; i++) {	
	                                    		//동의 미선택 항목 체크		
	                                    		if ($(na) && !$(na).find("input[value=Y]").is(":checked")  ) {
	                                    			alertPopup("본 동의는 '고객정보 관리 및 가입설계'를 위해 필수적인 사항이므로  동의를 거부하시는 경우 관련 업무 수행이 불가합니다.","ok",function(){
	                                    				$(na).find("input").focus();
	                                    			});
	                                    			return false;	
	                                    		}
	                                    	}
                                		}
                                		//console.log("val_code", val_code);
                                    	$(".checkAllSet:eq(0) input[name="+val_code+"].yes").prop("checked", true);
                                    	$(".checkAllSet:eq(0) input[name="+val_code+"].no").prop("checked", false);
                                    	
                                		comm_ui_util.commlayerClosePopup();
                                	}
                                });
                                
                            }
                        }

                        /* 
                         *  제휴 일때  [개인(신용) 정보의 수집 - 이용에 관한 사항 ] [자동차 상품 예외 사항 .........]
                         */
                        if($(this).attr('code') == "CMMD15"){
                          var $pophtml1 =  comm_ui_util.commlayerPopup('termlayerPop_jehu', function(){ 
                          });     

                          $pophtml1.find("#a_ok").off('click.a_ok');
                          $pophtml1.find("#a_ok").on('click.a_ok', function(){
                              comm_ui_util.commlayerClosePopup();
                          });
                          
                        }

                   });
                }
                ,
                failure:function(result) {      
                    
                }
            }
        });
        
        
        $("input[name*=07]").click(function() {
        	var chk = $(this).val();
        	if(chk == "Y") {
        		$("input[name*=16]:eq(0)").prop("checked", true);
        		$("input[name*=16]:eq(0)").attr("checked", true);
        	} else {
        		$("input[name*=16]:eq(1)").prop("checked", true);
        		$("input[name*=16]:eq(1)").attr("checked", true);
        	}
        });
        
        $("input[name*=16]").click(function() {
        	var chk = $(this).val();
        	if(chk == "Y") {
        		$("input[name*=07]:eq(0)").prop("checked", true);
        		$("input[name*=07]:eq(0)").attr("checked", true);
        	} else {
        		$("input[name*=07]:eq(1)").prop("checked", true);
        		$("input[name*=07]:eq(1)").attr("checked", true);
        	}
        });
	}


	this.setSessionObj = function(obj){
		var requestVO = obj;
		
	
		HiJS.svr.doRequestAjax("DHCO1001M01I", {  //ajax session
      xecure:true,
			data : requestVO,
			loadingbar : false,
			async : false, 
			callback : {
				success : function(responseObj) {
					return responseObj.data; 
				}
				,
				failure:function(result) {
					return result;
				}
			}
			
		});
	};

	/*
	 *  공통session JSON 을 반환 
	 */
	this.getSessionObj = function(){
		var requestVO = {};
		var rtn;
		HiJS.svr.doRequestAjax("DHCO1001M02S", {  //ajax session
			data : requestVO,
			loadingbar : false,
			async : false, 
			callback : {
				success : function(responseObj) {
					rtn =  responseObj.data; 

				}
				,
				failure:function(result) {		
					return result;	
				}
			}
		});
		return rtn; 
	};

	this.reqMPVO;
	this.cipa0041VOList;
    this.timerID;   //타이머를 핸들링하기 위한 전역 변수 
    this.time;      //타이머 시작시의 시간 

    /*
     * [인증번호] 타이머를 시작한다.  
     */
    this.startCertiTime = function(){
        _this.clear_time();
        _this.time = 180;
        _this.timerID = setInterval("comm_ui_util.decrementCertiTime()", 1000);
    }

    /* 
     * 남은 시간을 감소시키는 함수
     */
    this.decrementCertiTime =  function(){
        if(_this.time <= 0){
            _this.clear_time();
            /* 
             * 인증번호(6자리) 비활성화
             */
            $("label:contains('인증번호(6자리)')").next().prop("disabled", true);
            $("label:contains('인증번호(6자리)')").parent().addClass("disabled");
            var btn_index =  $(".btn.next").length;
        
            if(btn_index > 0){
                $(".btn.next").eq(btn_index-1).prop("disabled", true);
                $(".btn.next").eq(btn_index-1).addClass("disabled");
            }
        }

        var obj_time = _this.toMinSec(_this.time);
        $(".hpTime").html(obj_time.min + ":" + obj_time.sec);


        _this.time = _this.time - 1;  
    }

    /*
     * 정수형 숫자(초 단위)를 "시:분:초" 형태로 표현하는 함수
     */
     this.toMinSec =  function(t){
        var rtn = {};
        rtn.min = Math.floor(parseInt(t) / 60);
        if(String(rtn.min).length < 2){
            rtn.min = "0" + rtn.min; 
        }
        rtn.sec = parseInt(t) % 60;
        if(String(rtn.sec).length < 2){
            rtn.sec = "0" + rtn.sec; 
        }
        return rtn;
     }

    /*
     * 인증번호 timer를 멈춘다.
     */
    this.clear_time = function(){
        clearInterval(_this.timerID);
    }
    
    
    

	/* 
	 * 본인 인증 페이지 초기화 
	 */
	this.initAgree = function(){		
		_this.initAgreeAddEvent(); 	//본인 인증 화면 이벤트 처리. 
	};

/* 
   * 인증번호 발송
     * ---------------------------------------------
     * param_hpInfo (JSON)  : 파라미터가 추가 될경우 [세션]에 있을 값을 읽지 않고 이 파라미터에 담긴 정보를 토대로 인증을 한다. 
     *      > mvcomeancat   : [통신사: 1(SKT),  2(KT), 3(LGT), 4(SKT알뜰),  5(KT알뜰),  6(LGT알뜰)]
     *      > hp            : 휴대폰 번호 [01012341234]
     *      > name          : 성명
     *      > regno1        : 주민번호 
     *      > regno2        : 주민번호 
   */
  this.fnCertiMPSendEncryption = function(param_hpInfo, callback){
    var rtn = false;
    if(comm_ui_util.isNull(param_hpInfo)){ 
      alert("fnCertiMPSendEncryption() > param_hpInfo is Null " );
      return; 
    }

    if(comm_ui_util.isNull(param_hpInfo.mvcomeancat)){
      alert("fnCertiMPSendEncryption() > param_hpInfo.mvcomeancat is Null " );
      return; 
    }

    if(comm_ui_util.isNull(param_hpInfo.hp)){
      alert("fnCertiMPSendEncryption() > param_hpInfo.hp is Null " );
      return; 
    }

    if(comm_ui_util.isNull(param_hpInfo.name)){
      alert("fnCertiMPSendEncryption() > param_hpInfo.name is Null " );
      return; 
    }

    if(comm_ui_util.isNull(param_hpInfo.regno1)){
      alert("fnCertiMPSendEncryption() > param_hpInfo.regno1 is Null " );
      return; 
    }

    if(comm_ui_util.isNull(param_hpInfo.regno2)){
      alert("fnCertiMPSendEncryption() > param_hpInfo.regno2 is Null " );
      return; 
    }

    var $formEncryption =  $("[name=eRegNo][data-enc=on]:not('[type=hidden]')").parents('form');  //주민번호 뒤자리 
    $("[name=eRegNo][data-enc=on]:not('[type=hidden]')").val(param_hpInfo.regno2);


    /* 
     * 주민등록 번호 뒷자리 암호화
     */
    var E2E_PARAM = encodeURIComponent(JSON.stringify(npPfsCtrl.toJson($formEncryption[0])));  

    /* 
     * 메뉴번호 
     */
    var val_sel_svcMenuId = ""; 

    /* 
     * 업무코드 
     */
    var val_sel_menuCode = "";

    var common_session_info = comm_ui_util.getSessionObj();
    if(!comm_ui_util.isNull(common_session_info)){
      val_sel_svcMenuId   = common_session_info.menuId;
      val_sel_menuCode    = common_session_info.menuCode;

    }

    if(comm_ui_util.isNull(val_sel_svcMenuId) && !comm_ui_util.isNull(_menuId)){
      val_sel_svcMenuId = _menuId;
    }



    _this.cipa0041VOList = [{
        ptyCat              : '3',
        cprnPtrEcYn         : '0',          
        mvComeanCat         : param_hpInfo.mvcomeancat,      //통신사 구분
        mpNo                : param_hpInfo.hp,         //전화 번호 
        passMvComeanCat     : param_hpInfo.mvcomeancat,      //통신사 구분
        passMpNo            : param_hpInfo.hp             //전화 번호 
        
    }];

    requestVO = {
        cipa0041VOList      : _this.cipa0041VOList,
        svcMenuId           : val_sel_svcMenuId,    //메뉴번호 
        E2EParams           : E2E_PARAM,
        pUsrName            : param_hpInfo.name,
        regNoFront          : param_hpInfo.regno1,
        menuCode            : val_sel_menuCode      //업모코드 
    };

    console.log('fnCertiMPSendEncryption:DHCO0099M06S call -----------------------2');
    HiJS.svr.doRequestAjax('DHCO0099M06S', {
        data : requestVO,
        loadingbar : true,
        callback : {
            success:function(responseData) {
            	if(responseData.data.rsltCd == '9999'){
            		alertPopup("입력값이 초기화 되었습니다. 고객정보 입력으로 이동해 주세요.", "ok");
            		
            	}else if(responseData.data.rsltCd != 'NME0000' && responseData.data.rsltCd != '0000'){
                    //alert(responseData.data.rsltMsg);
                	alert("휴대폰 인증정보를 확인해주세요.");
                     /*
                     * 반환 값 확인에 필요한 메서드  
                     */
                    if(typeof callback == 'function'){
                        responseData.certTF = false;
                        callback(responseData);
                    }
                }else{


                    var data = responseData.data;                            
                    _this.cipa0041VOList = new Array();
                    
                    _this.reqMPVO = {
                        cipa0041VOList      : data.cipa0041VOList,
                        cipa0042VOList      : data.cipa0042VOList,
                        grpId               : data.grpId,
                        reqDt               : data.reqDt,
                        ptyNo               : data.ptyNo,
                        rlifLobCd           : data.rlifLobCd,
                        rlifUtlAgrmCat      : data.rlifUtlAgrmCat,
                        entryPathCat        : data.entryPathCat,
                        svcMenuId           : val_sel_svcMenuId,
                        menuCode            : val_sel_menuCode,
                        passMvComeanCat     : param_hpInfo.mvcomeancat,      //통신사 구분
                        // passPtyRegNo        : val_txt_jumin,        //전화 번호  
                        // passPtyNm           : val_txt_nm,           //주민번호
                        passMpNo            : param_hpInfo.hp         //성명

                    };

                  
                    $(".contentWrap:visible .inputBase input:eq(1)").prop("disabled", false); //인증번호란 활성화
                    $(".contentWrap:visible .inputBase:eq(1)").removeClass("disabled");     //인증번호div란 활성화
                    //$(".contentWrap:visible .btn.big span").text("다시요청");	// 다른 span 버튼까지 모두 텍스트가 바뀌어버림
                    var $span = $(".contentWrap:visible .btn.big span");
                    if($span.text() == "인증번호전송"){
                    	$span.text("다시요청");
                    }
                    
                    /* 
                     * 윤부장님 소스 전용 소스 !!!!!!!
                     */

                    if($("#smsNo").length >  0){
                      $("#smsNo").parent().removeClass("disabled");
                      $("#smsNo").prop("disabled", false);
                    }
                    
                    comm_ui_util.startCertiTime(); //인증번호 timer 시작

                    /*
                     * 반환 값 확인에 필요한 메서드  
                     */
                    if(typeof callback == 'function'){
                        responseData.certTF = true;
                        callback(responseData);
                    }
                }
            }
        }
    });
  }

	/* ************************************************************
	 * 인증번호 시간연장
	 */

	$(document).off('click.hpAgree', '.contentWrap:visible .inputArea.inlineBlock .item .hpTimeWrap .btn.moreTime');
	$(document).on('click.hpAgree', '.contentWrap:visible .inputArea.inlineBlock .item .hpTimeWrap .btn.moreTime', function(){
      var $span = $(".contentWrap:visible .btn.big span");
      if($span.text() == "다시요청"){
      	comm_ui_util.startCertiTime(); //인증번호 timer 시작
      }else{
      	alert("인증번호전송을 해 주세요.");
      }
		
	});
	
	/* 
	 * 인증번호 발송
     * ---------------------------------------------
     * param_hpInfo (JSON) : 파라미터가 추가 될경우 [세션]에 있을 값을 읽지 않고 이 파라미터에 담긴 정보를 토대로 인증을 한다. 
     *      > mvcomeancat  : [통신사: 1(SKT),  2(KT), 3(LGT), 4(SKT알뜰),  5(KT알뜰),  6(LGT알뜰)]
     *      > hp           : 휴대폰 번호 [01012341234]
     *      > name         : 성명
     *      > regno        : 주민번호 
	 */
	this.fnCertiMPSend = function(param_hpInfo){
        var E2E_PARAM;
        var val_pUsrName; //자동차 피보험자 성명 
        var regNo1_tmp ;
        
        var requestVO = {};
        var common_session_info = comm_ui_util.getSessionObj();

        /*
         * [동의 확인]
         */
         if($(".contentWrap .tabCon:visible .agreeList.harf.checkAllSetItem [type=checkbox]:not(':checked')").length > 0 ){
            alertPopup("동의를 해주세요.", "ok");
            return;
         }

        var $form_tmp =  $("[name*=gNo][data-enc=on]:not('[type=hidden]')").parents('form');  //주민번호 뒤자리 
    
        if($("#contractorYn").val() == "Y"){
            $form_tmp= null;
        }
        
        if(!comm_ui_util.isNull($form_tmp)){
          E2E_PARAM = encodeURIComponent(JSON.stringify(npPfsCtrl.toJson($form_tmp[0])));  

          if(!comm_ui_util.isNull(param_hpInfo)  && !comm_ui_util.isNull(param_hpInfo.regno) ){
            regNo1_tmp = param_hpInfo.regno;
          }else if(!comm_ui_util.isNull($("#pRegNo1").val())){
            regNo1_tmp =  $("#pRegNo1").val();  
          }else if(comm_ui_util.isNull(regNo1_tmp)){
            regNo1_tmp =  $("#regNo1").val();
          }

          val_pUsrName = $("#pUsrName").val();
        }

        if($("#contractorYn").val() == "Y"){
        	regNo1_tmp= $("#person1").val().substring(0,6);
        	val_pUsrName = $("#name").val();
        }
        
        /* 
         * 통신사 
         */
        var val_mvComeanCat;    //통신사
        var val_hp;             //휴대전화번호
        // var val_txt_jumin;      //주민등록 번호 
        // var val_txt_nm;         //성명
        
        //console.log("[param_hpInfo]------------------------")
        //console.log(param_hpInfo);
        //console.log(!_this.isNull(param_hpInfo));
        
        if(!_this.isNull(param_hpInfo)){                    //파라미터로 정보를 넘겨 받았을 경우
            val_mvComeanCat = param_hpInfo.mvcomeancat;     //통신사
            val_hp          = param_hpInfo.hp;              //휴대폰
            // val_txt_jumin   = param_hpInfo.regno;           //주민등록 번호 
            // val_txt_nm      = param_hpInfo.name;            //성명
        }else{
            val_mvComeanCat = $("#mvComeanCat").val();
            //val_hp = $(".contentWrap:visible .inputBase input:eq(0)").val();
            val_hp = $("#hp").val();
            
            if( val_hp==undefined || val_hp=="" ){
            	//console.log("val_hp==undefined || val_hp==''");
            	val_hp = $(".contentWrap:visible .inputBase input:eq(0)").val();
            }
            // val_txt_jumin   = common_session_info.regNo;      //주민등록 번호 
            // val_txt_nm      = common_session_info.name;     //성명

            //console.log("[val_mvComeanCat]:::" + val_mvComeanCat);
            //console.log("[before val_hp]:::" + $(".contentWrap:visible .inputBase input:eq(0)").val());
            //console.log("[after val_hp]:::" + val_hp);
        }
       
        
        /*
         * [휴대폰 번호 확인]
         */
		// 휴대폰번호 숫자 입력 여부
		if (!isNaturalNumber(val_hp)) {
			alertPopup('휴대폰번호 입력을 확인해 주세요.',"ok",function(){
				$(".contentWrap:visible .inputBase input:eq(0)").val("");
				$(".contentWrap:visible .inputBase input:eq(0)").focus();
			});
			return;
		}
		// 휴대폰번호 길이 체크
		if (val_hp.length < 10 ||  val_hp.length > 11) {
			alertPopup('휴대폰번호 입력을 확인해 주세요.',"ok",function(){
				$(".contentWrap:visible .inputBase input:eq(0)").focus();
			});
			return;
		}
        
        
        //휴대번호 체크 
        if(_this.isNull(val_hp)){
            alertPopup("전화번호를 입력해 주세요", "ok");
            return ;  
        }

        //휴대전화번호에 "-"를 붙인다. 
        var val_hypoonHp = _this.phoneFomatter(val_hp);
        
        // if(_this.isNull(val_txt_jumin)){
        //     alert("주민등록 번호를 입력해 주세요.");
        //     return ; 
        // }

        //성명 
        // if(_this.isNull(val_txt_nm)){
        //     alert("성명을 입력해 주세요.");
        //     return ; 
        // }




        /******************************************* 
         * 자동차 쪽에서 필요한 정보 
         ******************************************* /

        /* 
         * 메뉴번호 
         */
        var val_sel_svcMenuId = ""; 

        /* 
         * 업무코드 
         */
        var val_sel_menuCode = "";


        if(!comm_ui_util.isNull(common_session_info)){
          val_sel_svcMenuId   = common_session_info.menuId;
          val_sel_menuCode    = common_session_info.menuCode;

        }

        if(comm_ui_util.isNull(val_sel_svcMenuId) && !comm_ui_util.isNull(_menuId)){
          val_sel_svcMenuId = _menuId;
        }

        _this.cipa0041VOList = [{
            ptyCat              : '3',
            cprnPtrEcYn         : '0',          
            mvComeanCat         : val_mvComeanCat,      //통신사 구분
            mpNo                : val_hypoonHp,         //전화 번호 
            // ptyRegNo            : val_txt_jumin,        //주민번호 
            // ptyNm               : val_txt_nm,           //성명
            passMvComeanCat     : val_mvComeanCat,      //통신사 구분
            // passPtyRegNo        : val_txt_jumin,        //전화 번호  
            // passPtyNm           : val_txt_nm,           //주민번호
            passMpNo            : val_hypoonHp         //성명
            
        }];

        var certSignDetCd = "10501001";  // 10501001.피보험자 인증
        $("#certSignMthdCd").val("10491001"); // 인증서명 방법코드 : 10491001. 휴대폰 서명
        
        if (  $("#contractorYn").val() == "Y" ){
        	certSignDetCd = "10501002";	 // 10501002.계약자 인증
        }
        
        
        requestVO = {
            cipa0041VOList      : _this.cipa0041VOList,
            svcMenuId           : val_sel_svcMenuId,    //메뉴번호 
            E2EParams           : E2E_PARAM,
            pUsrName            : val_pUsrName,
            pRegNo1             : regNo1_tmp,
            menuCode            : val_sel_menuCode,      //업모코드
            executeTime 		: $('#executeTime').val(),
        	contractorYn 		: $("#contractorYn").val(),
			certSignGbCd  		: $("#certSignGbCd").val(), 
			certSignMthdCd  	: $("#certSignMthdCd").val(),
			certSignDetCd 		: certSignDetCd,
			bzCd          		: $("#bzCd").val(),
			bzDetCd       		: $("#bzDetCd").val()
        };

        console.log('fnCertiMPSend:DHCO0099M06S call-------------------------------1');
        HiJS.svr.doRequestAjax('DHCO0099M06S', {
            data : requestVO,
            loadingbar : true,
            callback : {
                success:function(responseData) {
                	if(responseData.data.rsltCd == '9999'){
                		alertPopup("입력값이 초기화 되었습니다. 고객정보 입력으로 이동해 주세요.", "ok");
                		
                	}else if(responseData.data.rsltCd != 'NME0000' && responseData.data.rsltCd != '0000'){
                        //alertPopup(responseData.data.rsltMsg, "ok");
                    	alertPopup("휴대폰 인증정보를 확인해주세요.", "ok");
                    }else{


                        var data = responseData.data;                            
                        _this.cipa0041VOList = new Array();
                        
                        _this.reqMPVO = {
                            cipa0041VOList      : data.cipa0041VOList,
                            cipa0042VOList      : data.cipa0042VOList,
                            grpId               : data.grpId,
                            reqDt               : data.reqDt,
                            ptyNo               : data.ptyNo,
                            rlifLobCd           : data.rlifLobCd,
                            rlifUtlAgrmCat      : data.rlifUtlAgrmCat,
                            entryPathCat        : data.entryPathCat,
                            svcMenuId           : val_sel_svcMenuId,
                            menuCode            : val_sel_menuCode,
                            passMvComeanCat     : val_mvComeanCat,      //통신사 구분
                            // passPtyRegNo        : val_txt_jumin,        //전화 번호  
                            // passPtyNm           : val_txt_nm,           //주민번호
                            passMpNo            : val_hypoonHp,         //성명
                    		certSignGbCd  		: $("#certSignGbCd").val(), 
                    		certSignMthdCd  	: $("#certSignMthdCd").val(),
                			certSignDetCd 		: certSignDetCd,
                			bzCd          		: $("#bzCd").val(),
                			bzDetCd       		: $("#bzDetCd").val()

                        };

                        /* 
                         * 윤부장님 소스 전용 소스 !!!!!!!
                         */
                        alertPopup('인증번호가 발송되었습니다.',"ok",function(){
                        	//$(".contentWrap:visible .inputBase input:eq(1)").prop("disabled", false); //인증번호란 활성화
                        	//$(".contentWrap:visible .inputBase:eq(1)").removeClass("disabled");     //인증번호div란 활성화
                        	$(".contentWrap:visible .btn.big span").text("다시요청");
                        	 
                            if($("#smsNo").length >  0){
                              $("#smsNo").parent().removeClass("disabled");
                              $("#smsNo").prop("disabled", false);
                            }

                            
                            $('.btn.line.m10h4.orange.ok').attr('data-focus', '#certiMPSend');
                            $('.btnClose').attr('data-focus', '#certiMPSend'); 
                            comm_ui_util.startCertiTime(); //인증번호 timer 시작
                        });

                       
                    }
                }
            }
        });
	}

	/* 
	 * 인증체크
	 */
	this.fnCertiCheck = function(smsNo){
		if(comm_ui_util.isNull(smsNo)){
            alertPopup("인증번호를 입력해 주세요", "ok");
            return;
        }

        _this.reqMPVO.cipa0042VOList[0].smsNo = smsNo;

        var rtn = {}; //리턴 값
        HiJS.svr.doRequestAjax('DHCO0099M07S', {
            data : _this.reqMPVO,
            loadingbar : false,
            async : false,
            callback : {
                success:function(responseData) {
                    $.unblockUI();
                    if(responseData.data.rsltCd != 'NME0000' && responseData.data.rsltCd != '0000'){
                        alertPopup("인증번호 입력을 확인해주세요.", "ok", function(){
                        	rtn.sucessYn = false;
                        	rtn.data =  responseData.data;
                        });
                    }else{                        
                        rtn.sucessYn = true;
                        rtn.data =  responseData.data;
                        //인증성공 후 
                        
                        try{
                        	//2021.09.30 - 로컬스토리지 저장
                        	_this.certMethodSave(rtn.data.ptyId,"HP");
                        }catch (e) {}
                        $(".contentWrap:visible .inputBase input:eq(1)").prop("disabled", true);
                    }
                }, 
                failure:function(responseObj) {
                    $.unblockUI();              
                    alertPopup(responseObj.header.responseMessage, "ok");
                    rtn.sucessYn = false;
                },
                error:function(jqXHR, textStatus, errorThrown) {
                    $.unblockUI();          
                    alert("Error Code:[" + jqXHR.status + "] " + jqXHR.statusText);                 
                    rtn.sucessYn = false;
                }
            }
        });

        return rtn;

	}

	/* 
	 * 본인 인증 화면 이벤트 처리. 
	 */
	this.initAgreeAddEvent = function(){

		/* 
		 * cashing 처리 
		 */
		var $cashing_allcheckbox		=  $(".contentWrap:visible .hpAgreeBox .rightArea [type=checkbox]");			//전체동의 체크 box
	    var $cashing_agreeCheckBoxes	=  $(".contentWrap:visible .agreeList.harf.checkAllSetItem [type=checkbox]"); 	//필수 동의들
	    var $cashing_smsNo				=  $(".contentWrap:visible .inputBase input:eq(1)"); 							//인증번호(6 자리)
	    var $cashing_hp					=  $(".contentWrap:visible .inputBase input:eq(0)"); 							//휴대폰 번호 
	
		/*
		 * 인증번호 disabled 처리
		 */
		$(".contentWrap:visible .inputBase input:eq(1)").prop("disabled", true); 
	
		/* 
		 * [인증번호 전송]
		 */
		$(document).off('click.hpAgree', '.contentWrap:visible .inputArea.inlineBlock .item .btn.big');
		$(document).on('click.hpAgree', '.contentWrap:visible .inputArea.inlineBlock .item .btn.big', function(){
			comm_ui_util.fnCertiMPSend();
		});
	
		/* 
	     * [전체동의 이벤트 처리]
	     */
	    $(document).off('change.hpAllClick', '.contentWrap .tabCon:visible .hpAgreeBox .rightArea [type=checkbox]');
	    $(document).on('change.hpAllClick', '.contentWrap .tabCon:visible .hpAgreeBox .rightArea [type=checkbox]', function(){
	        /* 
	         * 전체 동의
	         */
	        if($(".contentWrap .tabCon:visible .hpAgreeBox .rightArea [type=checkbox]").prop('checked')){
	        	$(".contentWrap .tabCon:visible .agreeList.harf.checkAllSetItem [type=checkbox]").prop("checked", true);
	        }else{
	        	$(".contentWrap .tabCon:visible .agreeList.harf.checkAllSetItem [type=checkbox]").prop("checked", false);
	        }
	    });

	    /* 
	     * [개인정보 이용동의], [고유식별정보처리 동의], [서비스이용약관 동의], [통신사이용약관 동의] 변뎡 이벤트 처리 
	     */
	    $(document).on('click', '.contentWrap:visible .agreeList.harf.checkAllSetItem [type=checkbox]', function(){
	        /* 
	         *  동의가 전체 체크 되어 있으면  "전체 동의"를 체크한다.
	         */
	        /*if($cashing_agreeCheckBoxes.not(":checked").length == 0){ 
	            $($cashing_allcheckbox).prop("checked", true);
	        }else{
	            $($cashing_allcheckbox).prop("checked", false);
	        }*/
	    });


	     /* 
	     * 공인 인증
	     */
	    $(document).off('click.certiAgree', '.contentWrap:visible .nic');
	    $(document).on('click.certiAgree', '.contentWrap:visible .nic' , function(){
	        _this.fnCCAOpen();
	    });
	    
	    /* 
	     * 카카오페이 인증 요청 (가입설계 동의)
	     */
	    $(document).off('click', '#fnCertKakaoPayAuthSend');
	    $(document).on('click', '#fnCertKakaoPayAuthSend', function(){
	    	_this.clear_time();
	        _this.fnCertKakaoPayAuthSend();
	    });
	    
	    /* 
	     * 카카오페이 인증 확인 (가입설계 동의)
	     */
	    $(document).off('click', '#fnCertKakaoPayAuthReSend');
	    $(document).on('click', '#fnCertKakaoPayAuthReSend', function(){
	        _this.fnCertKakaoPayAuthReSend();
	    });
	    
	    /* 
	     * 카카오페이 인증 닫기, 다른 수단 인증 시, 카카오페이 인증 폴링 중지
	     */
	    $(document).off('click', '#kakaoPayAuthReqPop .btnClose, #kakaoPayAuthPollingPop .btnClose, #kakaoPayAuthPollingPop .btn.line.inlineBlock.blue');
	    $(document).on('click', '#kakaoPayAuthReqPop .btnClose, #kakaoPayAuthPollingPop .btnClose, #kakaoPayAuthPollingPop .btn.line.inlineBlock.blue', function(){
	    	_this.clear_time();
	    });
	    
	    /* 
	     * 인증번호에 따라 [다음 or 확인] 버튼을  활성화 / 비활성화 
	     */
	    $(document).on('change', '.contentWrap:visible .inputBase input:eq(1)' , function(){
	
	        var val_smsNo = $(this).val();        
	
	        if(val_smsNo.length == 6){
	            $(".btn.next").removeClass("disabled"); //다음 버튼 활성화
	        }else{
	            $(".btn.next").addClass("disabled"); //다음 버튼 비활성화      
	        }
	    });

	    var session_info =  comm_ui_util.getSessionObj();

		if(!comm_ui_util.isNull(session_info.mpNo)){
		    $($cashing_hp).val(session_info.mpNo); // 
		    $($cashing_hp).trigger('focus');
		    $($cashing_hp).trigger('focusout');
		}
	}


	this.certRegNo1;  		//주민번호 앞자리 
	this.certRegNo2;  		//주민번호 뒷자리 
	this.certMenuId; 		  //메뉴ID
	this.certMenuCd; 		  //메뉴CD
  

  
	/* 
	 * 공인인증 호출 
	 */
	this.fnCCAOpen = function(){
		var common_session_info = comm_ui_util.getSessionObj();
		_this.certMenuId = common_session_info.menuId; //메뉴ID 
	    
		if(comm_ui_util.isNull(_this.certMenuId) && !comm_ui_util.isNull(_menuId) ){
	    	_this.certMenuId = _menuId;
	    }

		_this.certMenuCd = common_session_info.menuCd; //메뉴CD
		_this.menuCode = common_session_info.menuCode; //메뉴 menuCode
		
		//포탈 통합고객 등록/조회 휴대폰 오류 처리된 오류여부 확인
		if($("#tcntWrongYnHphn").val() == 'Y'){
			alertPopup("계약자님의 연락처(휴대폰번호) 확인이 필요합니다. <span class=fontPoint2>본인인증을 공동인증서가 아닌 휴대폰으로 진행</span> 부탁드립니다.<br>문의사항은 콜센터(1899-6782, 평일 09시~18시)로 연락바랍니다.",'ok',function(){
				Delfino.login('login=certLogin', _this.fnDelfinoComplete_callback);
			});	
			return false;
		}

		Delfino.login('login=certLogin', _this.fnDelfinoComplete_callback);
	}
	

	/* 
	 * 공인인증 호출 
	 */
	this.fnDelfinoComplete_callback = function(aResult){
		
		if(aResult.status!=1){
			_this.saveCrrErr(aResult);
		}
		
		if(aResult.status==1){
			_this.fnSignDataWithVID_callback(aResult);
		} else if (aResult.status == 0){
			alertPopup('본인인증이 취소되었습니다.', "ok",	function(){
				 $('.btn.line.m10h4.orange.ok').attr('data-focus', '.focusBackup'); 
				 $('.btnClose').attr('data-focus', '.focusBackup'); 
			});
			return false; 
		} else if(aResult.status==-10301) { 
			return false; 
		} else {
			alertPopup("error:" + aResult.message + "[" + aResult.status + "]", "ok");
			return false;
		}
	}
	
	/* 
	 * 인증이력 저장(에러발생시)
	 */
	this.saveCrrErr = function(aResult){
		var E2E_PARAM ;
	    if(!comm_ui_util.isNull($nppfs_form)){
	      E2E_PARAM = encodeURIComponent(JSON.stringify(npPfsCtrl.toJson($nppfs_form[0])));
	    }

	    var $form_tmp =  $("[name*=gNo][data-enc=on]:not('[type=hidden]')").parents("form");  //주민번호 뒤자리 
	    if($("#contractorYn").val() == "Y"){
	        $form_tmp= null;
	       }
	    var json_tmp = null;
	    if(!comm_ui_util.isNull($form_tmp)){

	      json_tmp =   npPfsCtrl.toJson($form_tmp[0]);

	      E2E_PARAM = encodeURIComponent(JSON.stringify(json_tmp));  
	    }
			
	    
	    	
		var certSignDetCd = "10501001";  // 10501001.피보험자 인증
		$("#certSignMthdCd").val("10491002"); // 인증서명 방법코드 : 10491001. 공동인증서
	    
	    if (  $("#contractorYn").val() == "Y" ){
	    	certSignDetCd = "10501002";	 // 10501002.계약자 인증
	    }
	    
			var requestVO = {
					aSignedMsg		: aResult.signData,
					aVidMsg		  	: aResult.vidRandom,
					certType		: '02',
					svcMenuId	  	: _this.certMenuId,
					menuCode	  	: _this.menuCode,
					E2EParams   	: E2E_PARAM,
					certSignGbCd  	: $("#certSignGbCd").val(), 
					certSignMthdCd	: $("#certSignMthdCd").val(),
					certSignDetCd 	: certSignDetCd,
					bzCd          	: $("#bzCd").val(),
					bzDetCd       	: $("#bzDetCd").val(),
					errCd			: aResult.status,
					errorMsg 		: aResult.message
			};

			//console.log("### 공동인증 requestVO=>" + JSON.stringify(requestVO) );
			
	    if(!comm_ui_util.isNull(json_tmp) && !comm_ui_util.isNull(json_tmp.regNo1)){
	        requestVO.regNo1 = json_tmp.regNo1;
	    }

	    if(!comm_ui_util.isNull(json_tmp) && !comm_ui_util.isNull(json_tmp.pRegNo1)){
	        requestVO.pRegNo1 = json_tmp.pRegNo1;
	    }
	    
	    if($("#contractorYn").val() == "Y"){
	    	requestVO.pRegNo1 = $("#person1").val().substring(0,6);
	    	requestVO.pRegNo2 = '';		//DHCO0099M08S 세션 값으로 세팅 
	    	requestVO.executeTime = $('#executeTime').val()
	    	requestVO.contractorYn =$("#contractorYn").val()
	    }
	    
	    //인증이력 저장
		HiJS.svr.doRequestAjax('DHCO0099M92S', {
			data : requestVO,
			loadingbar : false,
            async : false,
			callback : {
				success:function(responseData) {
					console.log("crr success");
				}
			}
		});
	}


	/*
	 *   
	 */	
	this.fnSignDataWithVID_callback = function(aResult){
    var E2E_PARAM ;
    if(!comm_ui_util.isNull($nppfs_form)){
      E2E_PARAM = encodeURIComponent(JSON.stringify(npPfsCtrl.toJson($nppfs_form[0])));
    }


    var $form_tmp =  $("[name*=gNo][data-enc=on]:not('[type=hidden]')").parents("form");  //주민번호 뒤자리 
    if($("#contractorYn").val() == "Y"){
        $form_tmp= null;
       }
    var json_tmp = null;
    if(!comm_ui_util.isNull($form_tmp)){

      json_tmp =   npPfsCtrl.toJson($form_tmp[0]);

      E2E_PARAM = encodeURIComponent(JSON.stringify(json_tmp));  
    }
		
    
    	
	var certSignDetCd = "10501001";  // 10501001.피보험자 인증
	$("#certSignMthdCd").val("10491002"); // 인증서명 방법코드 : 10491001. 공동인증서
    
    if (  $("#contractorYn").val() == "Y" ){
    	certSignDetCd = "10501002";	 // 10501002.계약자 인증
    }
    
		var requestVO = {
				aSignedMsg	: aResult.signData,
				aVidMsg		  : aResult.vidRandom,
				certType		: '02',
				svcMenuId	  : _this.certMenuId,
				menuCode	  : _this.menuCode,
				E2EParams   : E2E_PARAM,
				certSignGbCd  		: $("#certSignGbCd").val(), 
				certSignMthdCd		: $("#certSignMthdCd").val(),
				certSignDetCd 		: certSignDetCd,
				bzCd          		: $("#bzCd").val(),
				bzDetCd       		: $("#bzDetCd").val()
		};

		//console.log("### 공동인증 requestVO=>" + JSON.stringify(requestVO) );
		
    if(!comm_ui_util.isNull(json_tmp) && !comm_ui_util.isNull(json_tmp.regNo1)){
        requestVO.regNo1 = json_tmp.regNo1;
    }

    if(!comm_ui_util.isNull(json_tmp) && !comm_ui_util.isNull(json_tmp.pRegNo1)){
        requestVO.pRegNo1 = json_tmp.pRegNo1;
    }
    
    if($("#contractorYn").val() == "Y"){
    	requestVO.pRegNo1 = $("#person1").val().substring(0,6);
    	requestVO.pRegNo2 = '';		//DHCO0099M08S 세션 값으로 세팅 
    	requestVO.executeTime = $('#executeTime').val()
    	requestVO.contractorYn =$("#contractorYn").val()
    }
    
    

		HiJS.svr.doRequestAjax('DHCO0099M08S', {
			data : requestVO,
			loadingbar : false,
            async : false,
			callback : {
				success:function(responseData) {
          //알림 처리 
          if(responseData.data.successYn == 'Y'){
              alertPopup("인증이 완료되었습니다.", "ok", function(){
            	  try{
                  	
                  	//2021.09.30 - 로컬스토리지 저장
                  	_this.certMethodSave(responseData.data.ptyId,"PUB");
                  }catch (e) {}
            	  //alert("### certCallBack 공동인증 // response=>" + JSON.stringify(responseData) );
              	/*
                   * 반환 값 확인에 필요한 메서드  
                   */
                  if(typeof certCallBack == 'function'){
                      certCallBack(responseData);
                  }
              });
          }else{
              if(responseData.data.certRsltMsg != ''){
                  alertPopup(responseData.data.certRsltMsg, "ok", function(){
                  	if(typeof certCallBack == 'function'){
                          certCallBack(responseData);
                      }
                  });
              }else{
                  alertPopup('인증처리가 실패되었습니다.', "ok", function(){
                  	if(typeof certCallBack == 'function'){
                  		$('.nic').focus();
                          certCallBack(responseData);
                      }
                  });
              }
          }
				}
			}
		});
	}
	
	var reqKakaoPayAuthVO = {};			//카카오페이 인증 VO
	var reqKakaoPayAuthSubVO = {};		//카카오페이 인증 시 필요한 본인인증 공통 VO
	
	/* 
	 *  카카오페이인증 요청
	 */
	this.fnCertKakaoPayAuthSend = function(){
		var E2E_PARAM;
		var val_pUsrName; //자동차 피보험자 성명 
        var regNo1_tmp;
        
        var common_session_info = comm_ui_util.getSessionObj();
        
        /*
         * [동의 확인]
         */
        if($(".contentWrap .tabCon:visible .agreeList.harf.checkAllSetItem [type=checkbox]:not(':checked')").length > 0 ){
        	if( $(".contentWrap .tabCon:visible .agreeList.harf.checkAllSetItem [type=checkbox]:not(':checked')").attr("id") == "agree4_1" ){
        		alertPopup("개인(신용)정보의 수집·이용에 관한 사항에 동의하여 주시기 바랍니다.", "ok");
        		return;
        	}else if($(".contentWrap .tabCon:visible .agreeList.harf.checkAllSetItem [type=checkbox]:not(':checked')").attr("id") == "agree4_2") {
        		alertPopup("개인(신용)정보의 제공에 관한 사항에 동의하여 주시기 바랍니다.", "ok");
        		return;
        	}
        }

        var $form_tmp =  $("[name*=gNo][data-enc=on]:not('[type=hidden]')").parents('form');  //주민번호 뒤자리 
    
        if($("#contractorYn").val() == "Y"){
            $form_tmp= null;
        }
        
        var json_tmp = null;
        if(!comm_ui_util.isNull($form_tmp)){
			E2E_PARAM = encodeURIComponent(JSON.stringify(npPfsCtrl.toJson($form_tmp[0])));  
			
			if(!comm_ui_util.isNull($("#pRegNo1").val())){
				regNo1_tmp =  $("#pRegNo1").val();  
			}else if(comm_ui_util.isNull(regNo1_tmp)){
				regNo1_tmp =  $("#regNo1").val();
			}
			
			val_pUsrName = $("#pUsrName").val();
          }
        
        if($("#contractorYn").val() == "Y"){
        	regNo1_tmp= $("#person1").val().substring(0,6);
        	val_pUsrName = $("#name").val();
        }

        var val_hp = $("#hp2").val();	//휴대전화번호
        /*
         * [휴대폰 번호 확인]
         */
		// 휴대폰번호 숫자 입력 여부
		if (!isNaturalNumber(val_hp)) {
			alertPopup('휴대폰번호 입력을 확인해 주세요.',"ok",function(){
			});
			return;
		}
		// 휴대폰번호 길이 체크
		if (val_hp.length < 10 ||  val_hp.length > 11) {
			alertPopup('휴대폰번호 입력을 확인해 주세요.',"ok",function(){
			});
			return;
		}
        //휴대번호 체크 
        if(_this.isNull(val_hp)){
            alertPopup("전화번호를 입력해 주세요", "ok");
            return ;  
        }
        
        /******************************************* 
         * 자동차 쪽에서 필요한 정보 
         ******************************************* /

        /* 
         * 메뉴번호 
         */
        var val_sel_svcMenuId = ""; 

        /* 
         * 업무코드 
         */
        var val_sel_menuCode = "";

        if(!comm_ui_util.isNull(common_session_info)){
          val_sel_svcMenuId   = common_session_info.menuId;
          val_sel_menuCode    = common_session_info.menuCode;

        }

        if(comm_ui_util.isNull(val_sel_svcMenuId) && !comm_ui_util.isNull(_menuId)){
          val_sel_svcMenuId = _menuId;
        }
        
		var certSignDetCd = "10501001";  // 10501001.피보험자 인증
        $("#certSignMthdCd").val("10491003"); // 인증서명 방법코드 : 10491003. 카카오페이
        
        if (  $("#contractorYn").val() == "Y" ){
        	certSignDetCd = "10501002";	 // 10501002.계약자 인증
        }
    
        reqKakaoPayAuthSubVO = {
    		pUsrName : val_pUsrName,
            pRegNo1  : regNo1_tmp,
                
		    svcMenuId : val_sel_svcMenuId, 
		    menuCode : val_sel_menuCode,
			executeTime : $('#executeTime').val(),
			contractorYn : $("#contractorYn").val(),
			certSignGbCd  		: $("#certSignGbCd").val(), 
			certSignMthdCd  	: $("#certSignMthdCd").val(),
			certSignDetCd 		: certSignDetCd,
			bzCd          		: $("#bzCd").val(),
			bzDetCd       		: $("#bzDetCd").val()		
		};
         
		reqKakaoPayAuthVO = {
			phone_no : val_hp,
			//name : '',
			//birthday : '',
			expires_in : "300",
			call_center_no : "1899-6782",
			title : "간편본인인증",
			allow_simple_registration : "Y",
			verify_auth_name : "Y",
			
			dhco0099VO : reqKakaoPayAuthSubVO,
			
			E2EParams : E2E_PARAM
		};

		//console.log(reqKakaoPayAuthVO);
		
		HiJS.svr.doRequestAjax('DHCO0090M01S', {
            data : reqKakaoPayAuthVO,
            loadingbar : false,
            callback : {
                success:function(responseData) {
					console.log('DHCO0090M01S Success');
					//console.log(responseData);
					
					var txcd  = responseData.data.txcd;
					var errcode = responseData.data.errcode;
					var errmsg = responseData.data.errmsg;
					
					if ( txcd == "00" ){ //정상 응답
						reqKakaoPayAuthVO = {
							token : responseData.data.token,
							tx_id : responseData.data.tx_id,
							
							phone_no : responseData.data.phone_no,
							name : responseData.data.name,
							birthday : responseData.data.birthday,
							
							dhco0099VO : reqKakaoPayAuthSubVO
						};
						
						// 카카오페이 인증 폴링 추가
						comm_ui_util.startKakaoPayAuthPolling();
						
						comm_ui_util.commlayerPopup('kakaoPayAuthReqPop', function(){ });
					} else { //오류 응답
						if ("E400" == errcode) {
							errmsg = "카카오톡 사용자가 아니거나 해지된 사용자입니다. 카카오톡 가입 후 이용해주시기바랍니다.";
						} else if ("E401" == errcode) {
							errmsg = "휴대폰 번호 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E402" == errcode) {
							errmsg = "고객성명 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E403" == errcode) {
							errmsg = "생년월일 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E404" == errcode) {
							errmsg = "콜센터번호 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E421" == errcode) {
							errmsg = "입력하신 생년월일과 카카오톡에 등록된 생년월일이 일치하지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E422" == errcode) {
							errmsg = "입력하신 고객성명과 카카오톡에 등록된 성명이 일치하지않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E500" == errcode) {
							errmsg = "카카오페이 서버오류입니다. 다른 방법을 시도해 주시기바랍니다.";
						} else {
							errmsg = "현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.";
						}
						
						//comm_ui_util.commlayerClosePopup();
						alertPopup(errmsg, "ok");
						return; 
					}
				},
				failure : function(responseData){
					//comm_ui_util.commlayerClosePopup();
					alertPopup("현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.", "ok");
					return;
				}
			}
        });
	}
	
	// 카카오페이인증 확인
	this.fnCertKakaoPayAuthReSend = function(){
		$.blockUI();
		HiJS.svr.doRequestAjax("DHCO0090M02S", {
			data : reqKakaoPayAuthVO,
			loadingbar : false,
			callback : {
				success:function(responseData) {
					$.unblockUI();
					console.log('DHCO0090M02S Success');
					//console.log(responseData);
					
					var txcd  = responseData.data.txcd;
					var rsltCd = responseData.data.dhco0099VO.certRsltCd;
					var errcode = responseData.data.errcode;
					var errmsg = responseData.data.errmsg;
					
					if ( txcd == "00" && rsltCd == "NME0000"){ // 정상
						alertPopup("인증이 완료되었습니다.", "ok", function(){
							
							
							try{
								
			                  	//2021.09.30 - 로컬스토리지 저장
			                  	_this.certMethodSave(responseData.data.dhco0099VO.ptyId,"KKO");
			                  }catch (e) {}
							/*
							* 반환 값 확인에 필요한 메서드  
							*/
							if(typeof certCallBack == 'function'){
								_this.clear_time();
								comm_ui_util.commlayerClosePopup();
								certCallBack(responseData);
							}
					 	});
					}else if ( txcd == "01" ){ // 대기중
						comm_ui_util.commlayerPopup('kakaoPayAuthPollingPop', function(){ });
					}else if ( txcd == "09" ){ // 시간초과
						comm_ui_util.commlayerClosePopup();
						alertPopup("인증시간이 초과되었습니다. 다시 시도해주시기 바랍니다.", "ok");
					}else if ( txcd == "98" ){ // 검증실패
						comm_ui_util.commlayerClosePopup();
						alertPopup("검증에 실패하셨습니다. 다시 시도해주시기 바랍니다.", "ok");
					} else { //오류 응답
						if ("E400" == errcode) {
							errmsg = "중복호출로 인한 잘못된 요청입니다. 다시 시도해주시기 바랍니다.";
						} else if ("E401" == errcode) {
							errmsg = "조회 식별자가 존재하지 않습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E402" == errcode) {
							errmsg = "서명 결과가 존재하지 않습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E403" == errcode) {
							errmsg = "서명이 완료되지 않았습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E500" == errcode) {
							errmsg = "카카오페이 서버오류입니다. 다른 방법을 시도해 주시기바랍니다.";
						} else {
							errmsg = "현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.";
						}
						comm_ui_util.commlayerClosePopup();
						alertPopup(errmsg, "ok");
						return;
					}
				},
				failure : function(responseData){
					comm_ui_util.commlayerClosePopup();
					alertPopup("현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.", "ok");
					return;
				}
			}
		});
	}
	
	// 카카오페이인증 확인 (폴링 처리 --> 폴링 시 상태 이력저장 안함, 그 외 DHCO0090M02S 동일)
	this.fnCertKakaoPayAuthPollSend = function(){
		HiJS.svr.doRequestAjax("DHCO0090M03S", {
			data : reqKakaoPayAuthVO,
			loadingbar : false,
			callback : {
				success:function(responseData) {
					console.log('DHCO0090M03S Success');
					//console.log(responseData);
					
					var txcd  = responseData.data.txcd;
					var rsltCd = responseData.data.dhco0099VO.certRsltCd;
					var errcode = responseData.data.errcode;
					var errmsg = responseData.data.errmsg;
					
					if ( txcd == "00" && rsltCd == "NME0000"){ // 정상
						if(typeof certCallBack == 'function'){
							_this.clear_time();
							comm_ui_util.commlayerClosePopup();
							certCallBack(responseData);
						}
						
						try{
							
		                  	//2021.09.30 - 로컬스토리지 저장
		                  	_this.certMethodSave(responseData.data.dhco0099VO.ptyId,"KKO");
		                  }catch (e) {}
					}else if ( txcd == "01" ){ // 대기중
						//comm_ui_util.commlayerPopup('kakaoPayAuthPollingPop', function(){ });
					}else if ( txcd == "09" ){ // 시간초과
						_this.clear_time();
						comm_ui_util.commlayerClosePopup();
						alertPopup("인증시간이 초과되었습니다. 다시 시도해주시기 바랍니다.", "ok");
					}else if ( txcd == "98" ){ // 검증실패
						_this.clear_time();
						comm_ui_util.commlayerClosePopup();
						alertPopup("검증에 실패하셨습니다. 다시 시도해주시기 바랍니다.", "ok");
					} else { //오류 응답
						if ("E400" == errcode) {
							errmsg = "중복호출로 인한 잘못된 요청입니다. 다시 시도해주시기 바랍니다.";
						} else if ("E401" == errcode) {
							errmsg = "조회 식별자가 존재하지 않습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E402" == errcode) {
							errmsg = "서명 결과가 존재하지 않습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E403" == errcode) {
							errmsg = "서명이 완료되지 않았습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E500" == errcode) {
							errmsg = "카카오페이 서버오류입니다. 다른 방법을 시도해 주시기바랍니다.";
						} else {
							errmsg = "현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.";
						}
						_this.clear_time();
						comm_ui_util.commlayerClosePopup();
						alertPopup(errmsg, "ok");
						return;
					}
				},
				failure : function(responseData){
					_this.clear_time();
					comm_ui_util.commlayerClosePopup();
					alertPopup("현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.", "ok");
					return;
				}
			}
		});
	}
	
	/*
     * 카카오페이 인증 폴링, 3초당 60회 --> 180초(3분)
     */
    this.startKakaoPayAuthPolling = function(){
        _this.clear_time();
        _this.time = 60;
        _this.timerID = setInterval("comm_ui_util.fnKakaoPayAuthPolling()", 3000);
    }
   
    this.fnKakaoPayAuthPolling =  function(){
        if(_this.time <= 0){
            _this.clear_time();
        }
        
        //카카오페이인증 확인
        comm_ui_util.fnCertKakaoPayAuthPollSend();
        
        var obj_time = _this.toMinSec(_this.time);
        _this.time = _this.time - 1;
    }
    
    /* 
     * 카카오페이 인증 요청 (본인확인용 - 이름,생년월일,휴대폰번호)
     */
    $(document).off('click', '#fnKakaoOwnAuthReq');
    $(document).on('click', '#fnKakaoOwnAuthReq:not(.disabled)', function(){
    	_this.clear_time();
        _this.fnKakaoOwnAuthReq();
    });
    
    /* 
     * 카카오페이 인증 확인 (본인확인용 - 이름,생년월일,휴대폰번호)
     */
    $(document).off('click', '#fnKakaoOwnAuthRes');
    $(document).on('click', '#fnKakaoOwnAuthRes', function(){
        _this.fnKakaoOwnAuthRes();
    });
    
    /* 
	 *  카카오페이 인증 요청 (본인확인용 - 이름,생년월일,휴대폰번호)
	 */
	this.fnKakaoOwnAuthReq = function(){
        /*
         * [동의 확인]
         */
		var checkAgree = $("#autoOasisLayer .agreeList.harf.checkAllSetItem [type=checkbox]:not(':checked')");
        if(checkAgree.length > 0 ){
        	if( checkAgree.attr("id") == "agree4_1" ){
        		alertPopup("개인(신용)정보의 수집·이용에 관한 사항에 동의하여 주시기 바랍니다.", "ok");
        		return;
        	}else if( checkAgree.attr("id") == "agree4_2") {
        		alertPopup("개인(신용)정보의 제공에 관한 사항에 동의하여 주시기 바랍니다.", "ok");
        		return;
        	}
        }
        
        var ptyKorNm = $("#ptyKorNm").val();
        var birthday = $("#birthday").val();
        var mpNo = $("#mpNo").val();
        
        //이름 체크 
        if(_this.isNull(ptyKorNm)){
            alertPopup("이름 입력해 주세요", "ok");
            return ;  
        }
        //생년월일 체크 
        if(_this.isNull(birthday)){
            alertPopup("생년월일 입력해 주세요", "ok");
            return ;  
        }
        /*
         * [휴대폰 번호 확인]
         */
		// 휴대폰번호 숫자 입력 여부
		if (!isNaturalNumber(mpNo)) {
			alertPopup('휴대폰번호 입력을 확인해 주세요.',"ok",function(){
			});
			return;
		}
		// 휴대폰번호 길이 체크
		if (mpNo.length < 10 ||  mpNo.length > 11) {
			alertPopup('휴대폰번호 입력을 확인해 주세요.',"ok",function(){
			});
			return;
		}
        //휴대번호 체크 
        if(_this.isNull(mpNo)){
            alertPopup("휴대폰번호 입력을 확인해 주세요.", "ok");
            return ;  
        }
    
        reqKakaoPayAuthSubVO = {
		    svcMenuId : '00a66ac167', 
		    menuCode : '',
			executeTime : $('#executeTime').val(),
		};
         
		reqKakaoPayAuthVO = {
			phone_no : mpNo,
			name : ptyKorNm,
			birthday : birthday,
			expires_in : "300",
			call_center_no : "1899-6782",
			title : "간편본인인증",
			allow_simple_registration : "Y",
			verify_auth_name : "Y",
			
			dhco0099VO : reqKakaoPayAuthSubVO,
		};
		
		//console.log(reqKakaoPayAuthVO);
		
		HiJS.svr.doRequestAjax('DHCO0090M04S', {
            data : reqKakaoPayAuthVO,
            loadingbar : false,
            callback : {
                success:function(responseData) {
					console.log('DHCO0090M04S Success');
					//console.log(responseData);
					
					var txcd  = responseData.data.txcd;
					var errcode = responseData.data.errcode;
					var errmsg = responseData.data.errmsg;
					
					if ( txcd == "00" ){ //정상 응답
						reqKakaoPayAuthVO = {
							token : responseData.data.token,
							tx_id : responseData.data.tx_id,
							
							phone_no : responseData.data.phone_no,
							name : responseData.data.name,
							birthday : responseData.data.birthday,
							
							dhco0099VO : reqKakaoPayAuthSubVO
						};
						
						comm_ui_util.commlayerPopup('kakaoPayOwnReqPop', function(){ });
						popupFocus();
					} else { //오류 응답
						if ("E400" == errcode) {
							errmsg = "카카오톡 사용자가 아니거나 해지된 사용자입니다. 카카오톡 가입 후 이용해주시기바랍니다.";
						} else if ("E401" == errcode) {
							errmsg = "휴대폰 번호 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E402" == errcode) {
							errmsg = "고객성명 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E403" == errcode) {
							errmsg = "생년월일 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E404" == errcode) {
							errmsg = "콜센터번호 누락 혹은 형식에 맞지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E421" == errcode) {
							errmsg = "입력하신 생년월일과 카카오톡에 등록된 생년월일이 일치하지 않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E422" == errcode) {
							errmsg = "입력하신 고객성명과 카카오톡에 등록된 성명이 일치하지않습니다. 확인 후 이용해주시기 바랍니다.";
						} else if ("E500" == errcode) {
							errmsg = "카카오페이 서버오류입니다. 다른 방법을 시도해 주시기바랍니다.";
						} else {
							errmsg = "현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.";
						}
						
						alertPopup(errmsg, "ok");
						return; 
					}
				},
				failure : function(responseData){
					alertPopup("현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.", "ok");
					return;
				}
			}
        });
	}
	
	/* 
	 *  카카오페이 인증 확인 (본인확인용 - 이름,생년월일,휴대폰번호)
	 */
	this.fnKakaoOwnAuthRes = function(){
		HiJS.svr.doRequestAjax("DHCO0090M05S", {
			data : reqKakaoPayAuthVO,
			loadingbar : false,
			callback : {
				success:function(responseData) {
					console.log('DHCO0090M05S Success');
					//console.log(responseData);
					
					var txcd  = responseData.data.txcd;
					var rsltCd = responseData.data.dhco0099VO.certRsltCd;
					var errcode = responseData.data.errcode;
					var errmsg = responseData.data.errmsg;
					
					if ( txcd == "00" && rsltCd == "NME0000"){ // 정상
						if(typeof certCallBack == 'function'){
							_this.clear_time();
							comm_ui_util.commlayerClosePopup();
							alertPopup('인증이 완료되었습니다.',"ok",function(){
								certCallBack(responseData);
							});
						}
					}else if ( txcd == "01" ){ // 대기중
						alertPopup("카카오페이 인증을 확인해주시기 바랍니다.", "ok");
					}else if ( txcd == "09" ){ // 시간초과
						_this.clear_time();
						comm_ui_util.commlayerClosePopup();
						alertPopup("인증시간이 초과되었습니다. 다시 시도해주시기 바랍니다.", "ok");
					}else if ( txcd == "98" ){ // 검증실패
						_this.clear_time();
						comm_ui_util.commlayerClosePopup();
						alertPopup("검증에 실패하셨습니다. 다시 시도해주시기 바랍니다.", "ok");
					} else { //오류 응답
						if ("E400" == errcode) {
							errmsg = "중복호출로 인한 잘못된 요청입니다. 다시 시도해주시기 바랍니다.";
						} else if ("E401" == errcode) {
							errmsg = "조회 식별자가 존재하지 않습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E402" == errcode) {
							errmsg = "서명 결과가 존재하지 않습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E403" == errcode) {
							errmsg = "서명이 완료되지 않았습니다. 다시 시도해주시기 바랍니다.";
						} else if ("E500" == errcode) {
							errmsg = "카카오페이 서버오류입니다. 다른 방법을 시도해 주시기바랍니다.";
						} else {
							errmsg = "현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.";
						}
						_this.clear_time();
						comm_ui_util.commlayerClosePopup();
						alertPopup(errmsg, "ok");
						return;
					}
				},
				failure : function(responseData){
					_this.clear_time();
					comm_ui_util.commlayerClosePopup();
					alertPopup("현재 카카오페이 인증을 이용하실 수 없습니다. 다른 방법을 시도해 주시기바랍니다.", "ok");
					return;
				}
			}
		});
	}
	
    /* 
     * 결제 약관 동의 화면 초기화 
     */
    this.initPayTerms = function(){
        this.getPayTermsInfo(); //결제 약관 정보를 가져온다.
        this.initPayTermsAddEvent();  //결제 약관 이벤트를 등록 
    }

    this.clicked_a;
    /* 
     * 결제 약관 이벤트를 등록 
     */
    this.initPayTermsAddEvent = function(){
        $(document).on('click', '.btn.small2', function(){
            var _a = $(this);
            _this.clicked_a = $(this);
            var val_code        = $(this).attr('code');
            var val_cntnoptcat  = $(this).attr('cntnoptcat');
            
            //자동차 체결동의화면 소비자권익보호에 관한 사항 하드코딩(09->02)
           	/*if(val_code == 'CMMT06'){
            	val_cntnoptcat = '02';
            }*/
           	
            if(val_code == undefined){
            	val_cntnoptcat = "9999";
            }else if(val_code.indexOf('BFAA') >= 0){
           		val_cntnoptcat = "01";
           	}else if(val_code.indexOf('BFZZ') >= 0){
           		val_cntnoptcat = "02";
           	}else if(val_code.indexOf('AFAA') >= 0){
           		val_cntnoptcat = "03";
           	}else{
           		val_cntnoptcat = "07";
           	}
            
            switch(val_cntnoptcat){
                case "01": //필수
                case "02": //선택
                    /* 
                     * (선택) 상품 소개를 위한 동의 
                     */
                    for (var i = 0; i < _this.choiceList_list.length; i++) {
                        
                        if(_this.choiceList_list[i].cntnMgntId == val_code){
                            var $popHtml = comm_ui_util.commlayerPopup('termlayerPop', function(){ });
                            $popHtml.find(".btnClose").attr("data-focus","[code="+val_code+"]" );
                            $popHtml.find(".btn.orange").attr("data-focus","[code="+val_code+"]");
                            popupFocus();

                            $popHtml.find('.titleArea h2').html(_this.choiceList_list[i].title.replace(/\[([^0-9]*)\]/g, ""));                          //제목
                            $popHtml.find(".popAgreeScroll").html(_this.choiceList_list[i].cnts);   //내용
                            
                            // 필수, 선택동의 내용 PC/모바일 공통 DB조회 --> 2021.05 동의내용 개편에 따른 PC/모바일 구분 처리
                            $popHtml.find("#agreeWeb").show();
                            $popHtml.find("#agreeMob").hide();
                            
                            // 선택동의이고, [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우만
                            if (_this.choiceList_list[i].cntnMgntId == "BFZZ01") {
                            	
                                if($("#agreeSelect1").val() != "Y"){
                                	$("#agreeTel").prop("checked", false);
                                }
                                if($("#agreeSelect2").val() != "Y"){
                                	$("#agreeSms").prop("checked", false);
                                }
                                if($("#agreeSelect3").val() != "Y"){
                                	$("#agreeEmail").prop("checked", false);
                                }
                                if($("#agreeSelect4").val() != "Y"){
                                	$("#agreePost").prop("checked", false);
                                }
                                
                            	//상품소개동의 개인정보 유효기간
                            	if($("#agrmExprYear").val() != undefined && $("#agrmExprYear").val() != ""){
                                	var val = $("#agrmExprYear").val();
                                	$("input:radio[name=agrmExprCltWeb][value="+val+"]").prop("checked", true);
                                }
                                
                                $("#agreeCntnMgntId").val(_this.choiceList_list[i].cntnMgntId);
                            }
                            
                            if( _this.choiceList_list[i].cntnMgntId == "BFZZ04"){
                            	
                            	//상품소개동의 개인정보 유효기간
                                if($("#agrmExprYear").val() != undefined && $("#agrmExprYear").val() != ""){
                                	var val = $("#agrmExprYear").val();
                                	$("input:radio[name=agrmExprPrdWeb][value="+val+"]").prop("checked", true);
                                }
                                
                                $("#agreeCntnMgntId").val(_this.choiceList_list[i].cntnMgntId);
                            }
                            
                            $popHtml.find(".btn.line.inlineBlock.orange").off('click.orange');
                            $popHtml.find(".btn.line.inlineBlock.orange").on('click.orange', function(){
                            	if ($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ01"){
                            		var chkVal = 0;
                            		// 전화
                            		$("#agreeSelect1").val("Y");
                            		if (!$("#agreeTel").prop("checked")) {
                            			$("#agreeSelect1").val("N");
                            			chkVal++;
                            		}
                            		
                            		// 문자
                            		$("#agreeSelect2").val("Y");
                            		if (!$("#agreeSms").prop("checked")) {
                            			$("#agreeSelect2").val("N");
                            			chkVal++;
                            		}
                            		
                            		// 이메일
                            		$("#agreeSelect3").val("Y");
                            		if (!$("#agreeEmail").prop("checked")) {
                            			$("#agreeSelect3").val("N");
                            			chkVal++;
                            		}
                            		
                            		// 전화
                            		$("#agreeSelect4").val("Y");
                            		if (!$("#agreePost").prop("checked")) {
                            			$("#agreeSelect4").val("N");
                            			chkVal++;
                            		}
                            		
                            		// 개인정보 보유기간 선택(5년/4년/3년)
                            		var agrmExprYear = $(":radio[name=agrmExprCltWeb]:checked").val();
                            		if(agrmExprYear != ""){
                            			$("#agrmExprYear").val(agrmExprYear);
                            		}
                            		
                            		// 선택동의 미동의 확인 (선택동의만 .suntaek)                         		
                            		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                            			$(".checkAllSet:eq(1) :radio.no").prop("checked", true);
                            			comm_ui_util.commlayerClosePopup();
                            		}else{
                            			if(chkVal == 4){
                                			alertPopup('가입권유 연락방식을 1개 이상 선택해주시기 바랍니다.',"ok",function(){
                                				return false;
                                			});
                                		}else{
                                			$(".checkAllSet:eq(1) :radio.yes").prop("checked", true);
                                			comm_ui_util.commlayerClosePopup();
                                		}
                            		}
                            		
                            	}else if($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ04"){
                            		// 개인정보 보유기간 선택(5년/4년/3년)
                            		var agrmExprYear = $(":radio[name=agrmExprPrdWeb]:checked").val();
                            		if(agrmExprYear != ""){
                            			$("#agrmExprYear").val(agrmExprYear);
                            		}
                            		
                            		// 선택동의 미동의 확인 (선택동의만 .suntaek)
                            		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                            			$(".checkAllSet:eq(1) :radio.no").prop("checked", true);
                            		}else{
                            			$(".checkAllSet:eq(1) :radio.yes").prop("checked", true);
                            		}
                            		comm_ui_util.commlayerClosePopup();
                            		
                            	}else{
                            		comm_ui_util.commlayerClosePopup();
                            	}
                            });
                        }
                    }
                break;  
                case "03": //체결
                    /* 
                     * 일반 자세히 보기 팝업을 띄운다.
                     */
                    val_code = $.trim(val_code); //trim 처리 (좌우 공백을 제거 한다.)

                    /*
                     * (필수) 보험 계약의 체결을 위한 동의
                     */
                    for (var i = 0; i < _this.rtnObj_list.length; i++) {
                        
                        if(_this.rtnObj_list[i].cntnMgntId == val_code){
                            var $popHtml = comm_ui_util.commlayerPopup('termlayerPop', function(){ });
                            $popHtml.find(".btnClose").attr("data-focus","[code="+val_code+"]" );
                            $popHtml.find(".btn.orange").attr("data-focus","[code="+val_code+"]");
                            popupFocus();
                            
                            $("#termlayerPop").css("top", Math.max(0, (($(window).height() - $("#termlayerPop").outerHeight()) / 2) + $(window).scrollTop()) + "px");
                            $popHtml.find('.titleArea h2').html(_this.rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, ""));                          //제목
                            $popHtml.find(".popAgreeScroll").html(_this.rtnObj_list[i].cnts);
                            
                            //2020.06 계약체결동의 일반,장기,자동차 구분
                            var prodCd =  comm_ui_util.getSessionObj().prodCd;
                        	if(prodCd == '10061001' || prodCd == '10061010'){
                        		$popHtml.find(".GILT_agree").remove();
                        	}else{
                        		$popHtml.find(".MT_agree").remove();
                        	}
                            
                            // 필수, 선택동의 내용 PC/모바일 공통 DB조회 --> 2021.05 동의내용 개편에 따른 PC/모바일 구분 처리
                        	$popHtml.find("#agreeWeb").show();
                        	$popHtml.find("#agreeMob").hide();
                            
                            $popHtml.find(".btn.line.inlineBlock.orange").off('click.orange');
                            $popHtml.find(".btn.line.inlineBlock.orange").on('click.orange', function(){
                            	
                            	// 자세히보기 내용 라디오버튼 항목 확인 (필수동의만 .filsu)
                        		if( $popHtml.find("#agreeWeb .filsu.agreeRadio.fr").size() > 0){
                                	var $nas = $popHtml.find("#agreeWeb .filsu.agreeRadio.fr");
                                	for(var i = 0; na = $nas[i]; i++) {	
                                		//동의 미선택 항목 체크		
                                		if ($(na) && !$(na).find("input[value=Y]").is(":checked")  ) {
                                			alertPopup("본 동의는 '계약의 체결·이행'을 위해 필수적인 사항이므로  동의를 거부하시는 경우 관련 업무 수행이 불가합니다.","ok",function(){
                                				$(na).find("input").focus();
                                			});
                                			return false;	
                                		}
                                	}
                        		}
                        		//console.log("val_code", val_code);
                            	$(".checkAllSet:eq(0) input[name="+val_code+"].yes").prop("checked", true);
                            	$(".checkAllSet:eq(0) input[name="+val_code+"].no").prop("checked", false);
                            	
                                comm_ui_util.commlayerClosePopup(); 
                            });
                        }
                    }
                break;
                case "06": //링크
                    /* 
                     *  화면이동을 한다. 
                     */
                    val_code = $.trim(val_code); //trim 처리 (좌우 공백을 제거 한다.)
                    for (var i = 0; i < _this.rtnObj_list.length; i++) {
                        if(_this.rtnObj_list[i].cntnMgntId == val_code){
                            
                            window.open( _this.rtnObj_list[i].cnts.replace(/\<p\>|\<\/p\>/g, ""));
                        }
                    }

                break;

                case "07": //팝업
                	var prodCd =  comm_ui_util.getSessionObj().prodCd;
                	var popId = 'payTermLayerPop';
                	
                	if(prodCd == '10061001' || prodCd == '10061010'){
                		popId = 'motorPayTermLayerPop'
                	}
                	
                    var $layerPop  =  comm_ui_util.commlayerPopup(popId, function(pophtml, TF){
                        var cntnOptCat =  _this.clicked_a.attr("cntnOptCat");
                        if(TF){
                            $("input[cntnOptCat=" + cntnOptCat + "]").prop("checked", true).change();
                        }else{
                            $("input[cntnOptCat=" + cntnOptCat + "]").prop("checked", false).change();
                        }
                    });
                    
                    $layerPop.find(".btnClose").attr("data-focus","[code="+val_code+"]");
                    $layerPop.find("#a_payDisAgree").attr("data-focus","[code="+val_code+"]");
                    $layerPop.find("#a_payAgree").attr("data-focus","[code="+val_code+"]");
                    popupFocus();
                    
                    
                    

                    /*
                     * 보험계약의 체결 동의 팝업 [전체동의] cahnge 이벤트
                     */
                    $layerPop.find('#agreeAll3').off('change');
                    $layerPop.find('#agreeAll3').on('change', function(){
                      if($(this).prop('checked')){
                        $layerPop.find('.agreeRadio input').prop('checked', true);
                      }else{
                        $layerPop.find('.agreeRadio input').prop('checked', false);
                      }
                    });

                    /* 
                     * 상품별 팝업 제목 설정 
                     */
                    /*var prodNm = "";
                    var prodCd =  comm_ui_util.getSessionObj().prodCd;
                    switch(prodCd){
                      case "10061001":    
                          prodNm  = "자동차보험";
                      break;
                      case "10061010":    
                          prodNm  = "자동차보험 법인";
                      break;
                      case "10061002":    
                          prodNm  = "골프보험";
                      break;
                      case "10061003":    
                          prodNm  = "주택화재보험";
                      break;
                      case "10061014":    
                          prodNm  = "주택화재상해보험";
                      break;
                      case "10061004":    
                          prodNm  = "해외여행보험";
                      break;
                      case "10061012":    
                          prodNm  = "장기체류보험";
                      break;
                      case "10061005":    
                          prodNm  = "국내여행보험";
                      break;
                      case "10061013":    
                          prodNm  = "실손의료비보험";
                      break;
                      case "10061007":    
                          prodNm  = "장기운전자보험";
                      break;
                      case "10061008":    
                          prodNm  = "무배당 연금보험";
                      break;
                      case "10061009":    
                          prodNm  = "유배당 연금보험";
                      break;
                      case "10061011":    
                          prodNm  = "공인인증 전자서명";
                      break;

                    }
                    $layerPop.find("#pay_prodNm").html(prodNm);*/

                    /*
                     * 동의가 되어 있을 경우 팝업 전체 동의 체크 
                     */
                    if( _a.parent().parent().find("input[value='Y']").prop('checked')){
                        $layerPop.find(".checkAll input").prop("checked", true).change();
                    }


                    /* 
                     * 제목 설정 
                     */ 
                    $layerPop.find('.titleArea h2').html();
                
                    /* 
                     * 취소 버튼 핸들러 등록 
                     */
                    $layerPop.find("#a_payDisAgree").off('click');
                    $layerPop.find("#a_payDisAgree").on('click', function(){
                        _this.commlayerClosePopup(false);
                    });

                    /* 
                     * 확인 버튼 핸들러 등록 
                     */
                    $layerPop.find("#a_payAgree").off('click');
                    $layerPop.find("#a_payAgree").on('click', function(){
                        if($layerPop.find("input[class=yes]:checked").length == 5){ //동의를 전부 했을 경우만 
                            _this.commlayerClosePopup(true);
                        }else{
                            _this.commlayerClosePopup(false);
                        }
                    });

                break;
            }
        });    

  
        /* 
         * 전체동의 클릭시 
         */
        $(document).on('change.pay', '#agreeAll1', function(){
          /* 
           * 전체동의가 (TRUE)  &&  보험계약의 체결 , 이행들을 위한 개인(신용 )정보 처리에 동의합니다. (TRUE) 이면 관련 팝업 을 띄워준다.
           */  
        	if($(this).is(":checked")){
				$(".checkAllSet:eq(0) input.yes").prop("checked", true);
				$(".checkAllSet:eq(0) input.no").prop("checked", false);
				
				if($("input[cntnoptcat=07]:checked").length != $("input[cntnoptcat=07]").length){
					$("input[cntnoptcat=07]:checked").eq(0).parent().parent().parent().find('a[cntnoptcat=07]').trigger('click');
				}
			}else{
				$(".checkAllSet:eq(0) input.yes").prop("checked", false);
				$(".checkAllSet:eq(0) input.no").prop("checked", true);
			}
        });


        /* 
         * 동의 
         */
        $("[cntnoptcat=07]").parent().next().find("[value=Y]").off('change.agree');
        $("[cntnoptcat=07]").parent().next().find("[value=Y]").on('change.agree', function(){
          if($(this).prop("checked")){
               $(this).parent().parent().prev().find("a").trigger('click');
          }
        })
    }



    /* 
     * 약관 정보를 가져온다.
     * ---------------------------------  
     *  prodCd 코드 목록 
     * ---------------------------------
     *  "10061001"   : 자동차보험(MOTOR) 
     *  "10061010"   : 자동차보험 법인(MOTOR2) 
     *  "10061002"   : 골프보험(GOLF) 
     *  "10061003"   : 주택화재보험(HOUSE) 
     *  "10061014"   : 주택화재상해보험(HOUSEINJURY) 
     *  "10061004"   : 해외여행보험(FOREIGN) 
     *  "10061012"   : 장기체류보험(LONGFOREIGN) 
     *  "10061005"   : 국내여행보험(DOMESTIC) 
     *  "10061013"   : 실손의료비보험(MEDICINE) 
     *  "10061007"   : 장기운전자보험(LTERM) 
     *  "10061008"   : 무배당 연금보험(PENSION) 
     *  "10061009"   : 유배당 연금보험(PENSION2) 
     *  "10061025"   : 무배당 수관용 연금보험(PENSION3) 
     *  "10061011"   : 공인인증 전자서명(SELFSIGN) 
     *  "10061035"   : 장기 어린이보험(CHDRN)
     */
    this.getPayTermsInfo = function(){
    	var common_session_info =  comm_ui_util.getSessionObj();

		var val_prodCd        = common_session_info.prodCd; //상품코드
		
		
        var requestVO = {};

        HiJS.svr.doRequestAjax("DHCO0310M03S", {  //ajax 
            data : requestVO,
            loadingbar : false,
            async : false,
            callback : {
                success : function(responseObj) {
                    _this.rtnObj_list       = responseObj.data.dhco0310voList;
                    _this.choiceList_list   = responseObj.data.choiceList;
                    
                    /* 
                     * cashing 처리 
                     */
                    var $filsu     = $(".bline"); //(필수)신용 정보 처리 동의 영역
                    var $suntaek   = $(".agreeBox.checkAllSetItem:eq(1) ul");       //(선택)상품 소개를 위한 동의 영역
                    var $mingam    = $(".agreeBox.checkAllSetItem:eq(0) ul:eq(1)"); //민감정보 및 고유식별정보의 처리에 관한 사항 (영역)
                    
                    /* 
                     * 민감정보 영역을 숨긴다. (값이 있을 때만 보여줌)
                     */
                    $(".subTit.tline").hide();                              // [민감정보 및 고유식별정보의 처리에 관한 사항] 제목 영역을 숨긴다. 
                    $mingam.hide();   // [민감정보] 리스트 영역을 숨긴다.

                    /* 
                     *
                     */
                    $filsu.html("");             //(필수)신용 정보 처리 동의   초기화
                    $suntaek.html("");           //(선택)상품 소개를 위한 동의 초기화
                    $mingam.html("");            //민감정보 및 고유식별정보의 처리에 관한 사항 (영역) 

                    for (var i = 0; i < _this.rtnObj_list.length; i++) {

                        if(_this.rtnObj_list[i].delYn == "N"){ //삭제 대상이 아닌것만
                            var val_title               =  _this.rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, "");; //동의 제목
                            var val_cnts				=  _this.rtnObj_list[i].cnts; //동의 내용
                            var val_cntnOptCat          =  _this.rtnObj_list[i].cntnOptCat; //컨텐츠 옵션구분 코드
                            var val_radio_id_yes        =  _this.rtnObj_list[i].cntnMgntId + "_1"; //[동의] id 
                            var val_radio_id_no         =  _this.rtnObj_list[i].cntnMgntId + "_2"; //[미동의] id
                            var $new_li                 = $("<li/>");
                            
                            // 필수동의 질병상해 민감정보 동의 자동차제외 문구추가 202007 (자동차만)	
                            if(_this.rtnObj_list[i].cntnMgntId == "AFAA06" && (val_prodCd == "10061001" || val_prodCd == "10061010")){
                            	val_title = val_title + "<br /> - 자동차보험은 해당없음";
                            }
                            
                            /* 
                             * [ (필수) 개인(신용)정보 처리 동의 ] 부분 처리  
                             */
                            var $new_li_div1		= $("<div/>").attr({class : 'titArea'}).appendTo($new_li);
                            var $new_li_div1_span	= $("<span/>").attr({class : 'txt'}).html(val_title).appendTo($new_li_div1);
                            var $new_li_div1_a       =  $('<a/>').attr({href:'#none', class:'btn small2', title:'자세히보기', style:'left: 490px;', code:_this.rtnObj_list[i].cntnMgntId}).appendTo($new_li_div1);
                            var $new_li_div1_a_span  =  $('<span/>').text('자세히보기').appendTo($new_li_div1_a);

                            /* 
                             * val_cntnOptCat =   "08": 문구상단 과 "09": 문구하단 일때는  [동의], [미동의] 버튼을 넣지 않는다. 
                             */ 
                            //if(val_cntnOptCat != "08" && val_cntnOptCat != "09" && val_cntnOptCat != "05"){
                            if(_this.rtnObj_list[i].cntnMgntId != "AFAA00"){
	                            var $new_li_div2                = $("<div/>").attr({class : 'agreeRadio'}).appendTo($new_li);
	                            var $new_li_div2_div1           = $("<div/>").attr({class : 'radio'}).appendTo($new_li_div2);
								var $new_li_div2_div1_checkbox  = $('<input/>').attr({type : 'checkbox', name:_this.rtnObj_list[i].cntnMgntId,  id: val_radio_id_no, class:'no', value:'N' }).appendTo($new_li_div2_div1);
	                            var $new_li_div2_div1_label     = $("<label/>").attr({for: val_radio_id_no}).html("동의하지 않음").appendTo($new_li_div2_div1);
	                            var $new_li_div2_div2           = $("<div/>").attr({class : 'radio', style: 'margin-left: 7px;'}).appendTo($new_li_div2);
								var $new_li_div2_div2_checkbox  = $('<input/>').attr({type : 'checkbox', name:_this.rtnObj_list[i].cntnMgntId,  id: val_radio_id_yes, class:'yes', value:'Y' }).appendTo($new_li_div2_div2);
	                            var $new_li_div2_div2_label     = $("<label/>").attr({for: val_radio_id_yes}).html("동의함").appendTo($new_li_div2_div2);
                            }
                            /* else{
                            	// 필수,선택 소비자 권익보호에 관한 사항 내용 노출 처리
								$($new_li).prepend('<h4 class="subTit tline"></h4>');	// 라인 추가
								$($new_li_div1).append(val_cnts);						// 동의 내용 추가
								$($new_li_div1).find('a').remove();						// 자세히보기 제거
								$($new_li_div1).css('max-width','100%');				// max-width 변경
                            } */
                            
                            /*if(val_cntnOptCat == "01"			//01 : 필수 
                                    ||  val_cntnOptCat == "04"  //05: 일반
                                    ||  val_cntnOptCat == "05"  //05: 민감
                                    ||  val_cntnOptCat == "06"  //06: 링크
                                    ||  val_cntnOptCat == "07"  //07: 팝업
                                    ||  val_cntnOptCat == "08"	//08

                                ){
                                
                                }else if(val_cntnOptCat == "02"		//02: 선택
                                    ){       //02 : 선택*/
                            if(_this.rtnObj_list[i].cntnMgntId.indexOf('AFAA') >= 0){
                            	if(val_prodCd == "10061010" && 
                            			(_this.rtnObj_list[i].cntnMgntId == "AFAA00" 
                            			|| _this.rtnObj_list[i].cntnMgntId == "AFAA03"
                            			|| _this.rtnObj_list[i].cntnMgntId == "AFAA04"
                            			|| _this.rtnObj_list[i].cntnMgntId == "AFAA05"
                            			|| _this.rtnObj_list[i].cntnMgntId == "AFAA06"
                            			|| _this.rtnObj_list[i].cntnMgntId == "AFAA07"))
                            			{
                            		//자동차 법인 skip
                            	}else{
                            		if(_this.rtnObj_list[i].cntnMgntId == "AFAA06" || _this.rtnObj_list[i].cntnMgntId == "AFAA07"){
        								// 2021.05 민감정보 삭제
        							}else{
        								$filsu.append($new_li); //필수 영역
        							}
                            	}
                            }
                        }
                    }
                    
                    /* 
                     * 선택 사항 목록을 화면에 뿌린다.
                     */
                    for (var i = 0; _this.choiceList_list != null && i < _this.choiceList_list.length; i++) {
                        
                        if(_this.choiceList_list[i].delYn == "N"){ //삭제 대상이 아닌것만
                        	var cntnMgntId 				=  _this.choiceList_list[i].cntnMgntId;
                            var val_title               =  _this.choiceList_list[i].title.replace(/\[([^0-9]*)\]/g, "");; //동의 제목
                            var val_cnts				=  _this.choiceList_list[i].cnts; //동의 내용
                            var val_cntnOptCat          =  _this.choiceList_list[i].cntnOptCat; //컨텐츠 옵션구분 코드
                            var val_radio_id_yes        =  _this.choiceList_list[i].cntnMgntId + "_1"; //[동의] id 
                            var val_radio_id_no         =  _this.choiceList_list[i].cntnMgntId + "_2"; //[미동의] id
                            var $new_li                 = $("<li/>");     
                            
                            //BFZZ07 --> 마케팅동의 관련 보종별 indexOf("07") 로 전부 예외처리 되어있음 따라서 공통에서 수정 처리
                            if(_this.choiceList_list[i].cntnMgntId == 'BFZZ01'){
                            	cntnMgntId = "BFZZ07";
                            	val_radio_id_yes = "BFZZ07_1";
                            	val_radio_id_no = "BFZZ07_2";
                            }
                            
                            /* 
                             * [ (선택) [상품 소개를 위한 동의] 부분 처리  
                             */
                            var $new_li_div1		= $("<div/>").attr({class : 'titArea'}).appendTo($new_li);
                            var $new_li_div1_span	= $("<span/>").attr({class : 'txt'}).html(val_title).appendTo($new_li_div1);
                            var $new_li_div1_a      =  $('<a/>').attr({href:'#none', class:'btn small2', title:'자세히보기', style:'left: 490px;', code:_this.choiceList_list[i].cntnMgntId}).appendTo($new_li_div1);
                            var $new_li_div1_a_span =  $('<span/>').text('자세히보기').appendTo($new_li_div1_a);

                            /* 
                             * val_cntnOptCat =   "08": 문구상단 과 "09": 문구하단 일때는  [동의], [미동의] 버튼을 넣지 않는다. 
                             */ 
	                        //if(val_cntnOptCat != "08" && val_cntnOptCat != "09" && val_cntnOptCat != "05"){
                            if(_this.choiceList_list[i].cntnMgntId != "BFZZ00"){
	                            var $new_li_div2                = $("<div/>").attr({class : 'agreeRadio'}).appendTo($new_li);
	                            var $new_li_div2_div1           = $("<div/>").attr({class : 'radio'}).appendTo($new_li_div2);
	                            var $new_li_div2_div1_input     = $("<input/>").attr({type : 'radio', name : cntnMgntId , id : val_radio_id_no, class : 'no' , value : 'N'}).appendTo($new_li_div2_div1 );
	                            var $new_li_div2_div1_label     = $("<label/>").attr({for: val_radio_id_no}).html("동의하지 않음").appendTo($new_li_div2_div1);
	                            var $new_li_div2_div2           = $("<div/>").attr({class : 'radio', style: 'margin-left: 7px;'}).appendTo($new_li_div2);
	                            var $new_li_div2_div2_input     = $("<input/>").attr({type : 'radio', name : cntnMgntId , id : val_radio_id_yes, class : 'yes' , value : 'Y', cntnOptCat:val_cntnOptCat}).appendTo($new_li_div2_div2 );
	                            var $new_li_div2_div2_label     = $("<label/>").attr({for: val_radio_id_yes}).html("동의함").appendTo($new_li_div2_div2);
	                        }
                            /* else{
                            	// 필수,선택 소비자 권익보호에 관한 사항 내용 노출 처리
								$($new_li).prepend('<h4 class="subTit tline"></h4>');	// 라인 추가
								$($new_li_div1).append(val_cnts);						// 동의 내용 추가
								$($new_li_div1).find('a').remove();						// 자세히보기 제거
								$($new_li_div1).css('max-width','100%');				// max-width 변경
                            } */
                            
                            if(_this.choiceList_list[i].cntnMgntId.indexOf('BFZZ') >= 0){
                            	$suntaek.append($new_li); //선택 영역
                            }
                            
                        }

                    }

                    /* 
                     * (선택) 상품 소개를 위한 동의 란이 비어 있음으면 숨긴다.
                     */
                    if($(".contentWrap:visible .inputTable.checkAllSet:eq(1) li").length < 1){
                    	$(".contentWrap:visible .inputTable.checkAllSet:eq(1)").hide();
                    	$("#agreeAll2").remove();
                    }else{
                    	$(".contentWrap:visible .inputTable.checkAllSet:eq(1)").show();
                    }
                    
                    // 필수동의 모든항목 일괄 선택/해제
                    $(document).on("click", ".checkAllSet:eq(0) :checkbox", function(){
            			var checkVal = $("#"+$(this).attr("id")).val();
            					
            			if(checkVal == 'Y'){
            				$(this).parents(".agreeRadio").find("input.yes").prop("checked", true);
            				$(this).parents(".agreeRadio").find("input.no").prop("checked", false);
            			}else{
            				$(this).parents(".agreeRadio").find("input.yes").prop("checked", false);
            				$(this).parents(".agreeRadio").find("input.no").prop("checked", true);
            			}
            		});
            		
                	// 선택동의 모든항목 일괄 선택/해제
            		$(document).on("click", ".checkAllSet:eq(1) :radio", function(){
            			var checkVal = $("#"+$(this).attr("id")).val();
            			$(".checkAllSet:eq(1) :radio[value="+checkVal+"]").prop("checked", true);
            		});
            		
            		// 개인(신용)정보의 수집·이용동의 선택시 가입권유 모두 동의
            		$(document).on("click", "input[id=BFZZ07_1]", function(){
            			$("#agreeSelect1").val("Y");
            			$("#agreeSelect2").val("Y");
            			$("#agreeSelect3").val("Y");
            			$("#agreeSelect4").val("Y");
            		});
                }
                ,
                failure:function(result) {      
                    
                }
            }
        });
        
        $("input[name*=07]").click(function() {
        	var chk = $(this).val();
        	if(chk == "Y") {
        		$("input[name*=16]:eq(0)").prop("checked", true);
        		$("input[name*=16]:eq(0)").attr("checked", true);
        	} else {
        		$("input[name*=16]:eq(1)").prop("checked", true);
        		$("input[name*=16]:eq(1)").attr("checked", true);
        	}
        });
        
        $("input[name*=16]").click(function() {
        	var chk = $(this).val();
        	if(chk == "Y") {
        		$("input[name*=07]:eq(0)").prop("checked", true);
        		$("input[name*=07]:eq(0)").attr("checked", true);
        	} else {
        		$("input[name*=07]:eq(1)").prop("checked", true);
        		$("input[name*=07]:eq(1)").attr("checked", true);
        	}
        });
    }



    this.hpDirectSign  = function(param_bzDetCd, param_signAgmtInfo){

     	 var startDay = new Date('1/20/2018 00:00:00');//2018/01/20 00:00
      	 var toDay = new Date();
       	 var endDay = new Date('1/20/2018 03:00:00');//2018/01/20 03:00
       	 
       	 if((startDay <= toDay) && (toDay <= endDay)){
	    	alert("휴대폰직접서명 서비스 일시 중단 안내 \n\n 1. 일시 : 1월 20일(토) 자정(00시) ~ 새벽 03시(3시간) \n 2. 사유 : 보안 시스템 개선 작업\n\n *공인인증서를 통한 계약 체결은 정상적으로 가능합니다.");
	    	return ;
       	 }
 
        if(this.isNull(param_bzDetCd)){
            alert("hpDirectSign 함수를 실행하는 데 필요한 [param_bzDetCd(업무 상세 코드가 없습니다)]");
            return ;
        }

        if(this.isNull(param_signAgmtInfo)){
            alert("hpDirectSign 함수를 실행하는 데 필요한 [param_signAgmtInfo(메시지)]");
            return ; 
        }

        var reqVo = {};
        reqVo = {
           bzDetCd : param_bzDetCd, 
           signAgmtInfo : param_signAgmtInfo
        };

        HiJS.svr.doRequestAjax('DHCO0100M04S', {
            data : reqVo,
            loadingbar : false,
            callback : {
            success : function(responseObj) {
                //alert("휴대폰으로 직접서명URL 안내 문자가 발송되었습니다. 확인 후 URL를 클릭하여 전자서명을 해주세요.");
                if(!_this.isNull(responseObj.data.localUrlTmp)){
                   // window.open(responseObj.data.localUrlTmp, '휴대폰 직접 서명');
                   // openLayer('layer_hpDirectSign');
                   //_this.localYN_hpDirectSign = 'Y'; //로컬 
                	fnCallWebSignSms(responseObj,'Y');
                }else{
                	fnCallWebSignSms(responseObj,'N');
                }
                
                 
                //_this.mappingNo =  responseObj.data.mappingNo; 


                /* 
                 * 자필서명 불러오기 이벤트 설정 
                 */
                // var $tag_getMySign = $("#a_getMySign");  
                // $tag_getMySign.off();
                // $tag_getMySign.on('click', function(){
                //     _this.fnCallSignImg();
                // });
            

                //$("#webSignDiv").html("");
                //var infoCnte = "휴대폰 직접서명을 할 수 있는 사이트주소(URL)을 고객님이 본인인증시 입력하셨던 휴대폰 번호 <span>010-4721-****</span>로 전송 하였습니다.";
                //$("#webSignDiv").html(infoCnte);
              
                //$("#mappingNo").val(responseObj.data.mappingNo);
              
            },
            failure : function(responseObj){
              alert("전자서명 URL SMS발송 실패");
              return;
            }
          }
        });

    }

    this.fnCallSignImg = function(mappingNo){
        var rtn = null; //반활할 값
        if(this.isNull(mappingNo)){
            alert("commonUtil.fnCallSignImg  함수를 실행하기에 필요한 param_mappingNo 값이 존재하지 않는다.");
            return;
        }
        var reqVo = {};

        reqVo = {
            mappingNo : mappingNo,
        };

        HiJS.svr.doRequestAjax('DHCO0100M03S', {
            data : reqVo,
            loadingbar : false,
            async : false,
            callback : {
                success : function(responseObj) {
                    
                	rtn = responseObj.data;
                	/*
                	var statCd = responseObj.data.statCd; 
                    var filePath = responseObj.data.filePath; 
                    var fileNm   = responseObj.data.fileNm; 
                    
                    if ( statCd == "10141003" ){ //10141003.타임스탬프합본 및 검증완료      
                        var appendHTML = "";
                        $("#signImg").html("");
                        var imgViewPath = replaceAll( filePath,"/dB2C/data","");

                        
                        if(_this.localYN_hpDirectSign == 'Y'){ //로컬이면 
                            appendHTML = "<img id='dmSign' alt='휴대폰직접서명 이미지' style='width:388px; height:188px;' src='https://edirect.hi.co.kr" + imgViewPath + fileNm + "'  />";
                        }else{ //로컬이 아니면 
                            appendHTML = "<img id='dmSign' alt='휴대폰직접서명 이미지' style='width:388px; height:188px;' src='" + imgViewPath + fileNm + "'  />";
                        }

                        
                        $("#signImg").html(appendHTML);
                        
                        rtn = responseObj.data;
                    } else {
                        alert("휴대폰으로 전송된 URL을 클릭하여 휴대폰 직접서명을 먼저 수행해주세요.");
                        $("#signImg").html("");
                    }
                    */
                     
                },
                failure : function(responseObj){
                    //$("#signImg").html("");
                    alertPopup("휴대폰 자필서명 이미지 로딩에 실패하였습니다. 창을 닫고 다시 시도해주세요.", "ok");
                    return;
                }
            }
        });

        return rtn;
    };   
    
    
    
    
    

    /*
     * 직업 대분류 정보 조회 ajax
     * ====================================
     * cjobJbClsCat  : "1"
     * cjobRegOrd    : "2"
     */
    this.getCidJobInfoList = function(){
        var rtn ; //반환 값 
        HiJS.svr.doRequestAjax("DHLT0200M21S", {
            data : {"cjobJbClsCat":"1", "cjobRegOrd":"2"},
            async : false,
            loadingbar : false,
            callback : {
                success : function(responseObj) {
                    var sidLength = 0;
                    var data = '';
                    var resData = responseObj.data;                 

                    if(resData.resultCode == "900") {
                        alert("세션이 종료되었거나 비정상적인 방법으로 접속하셨습니다.\n처음 부터 다시 이용해 주세요.");
                        location.href = "/service.do?m=3293e8e708";
                        return;
                    }

                    rtn = responseObj.data.cizz0018VOList;
                    // $.each(responseObj.data.cizz0018VOList, function(i, list) {
                    //     data += '<li><a href="#none" onclick="fnSidJobOnClick(this);" data-regord="'+list.cjobRegOrd +'" data-val="' + list.cjobJbCd + '">' + list.cjobJbNm + '</a></li>';
                    //     sidLength = i;
                    // });
                }
            }
        });
        return rtn; 
    }

    /* 
     * 직업 중분류 정보 조회 ajax
     * ====================================
     * cd  :   선택된 대분류 코드 
     */ 
    this.getMidJobInfoList = function(cd){


        if(_this.isNull(cd)){ //선택된 대분류 코드 가 없을 때
            alert("commonUtil.js > getMidJobInfoList 함수 [cd] 파라미터 값이 null 입니다. ");
            return; 
        }
        var rtn ; //반환 값 
        HiJS.svr.doRequestAjax("DHLT0200M21S", {
            /* 
             * cjobJbClsCat :   "3"
             * cjobRegOrd   :   "2"
             * cjobUprJbcd  :   선택된 대분류 코드 
             */
            data : {"cjobJbClsCat":"3", "cjobRegOrd":"2", "cjobUprJbcd" : cd},
            async : false,
            loadingbar : false,
            callback : {
                success : function(responseObj) {
                    var sidLength = 0;
                    var data = '';
                    var resData = responseObj.data;                 

                    if(resData.resultCode == "900") {
                        alert("세션이 종료되었거나 비정상적인 방법으로 접속하셨습니다.\n처음 부터 다시 이용해 주세요.");
                        location.href = "/service.do?m=3293e8e708";
                        return;
                    }

                    rtn = responseObj.data.cizz0018VOList;
                    // $.each(responseObj.data.cizz0018VOList, function(i, list) {
                    //     data += '<li><a href="#none" onclick="fnSidJobOnClick(this);" data-regord="'+list.cjobRegOrd +'" data-val="' + list.cjobJbCd + '">' + list.cjobJbNm + '</a></li>';
                    //     sidLength = i;
                    // });
                }
            }
        });
        return rtn;
    }

    /* 
     * 직업 소분류 정보 조회 ajax
     * ====================================
     * cd : 선택된 중분류 코드 
     */ 
    this.getSidJobInfoList = function(cd){
        if(_this.isNull(cd)){
            alert("commonUtil.js > getSidJobInfoList 함수 [cd] 파라미터 값이 null 입니다.");
        }
        var rtn ; //반환 값 
        HiJS.svr.doRequestAjax("DHLT0200M21S", {
            /* 
             * cjobJbClsCat :  "5"
             * cjobRegOrd   :  "2"
             * cjobUprJbcd  :  [선택된 중분류 코드]
             */
            data : {"cjobJbClsCat":"5", "cjobRegOrd":"2", "cjobUprJbcd": cd},
            async : false,
            loadingbar : false,
            callback : {
                success : function(responseObj) {
                    var sidLength = 0;
                    var data = '';
                    var resData = responseObj.data;                 

                    if(resData.resultCode == "900") {
                        alert("세션이 종료되었거나 비정상적인 방법으로 접속하셨습니다.\n처음 부터 다시 이용해 주세요.");
                        location.href = "/service.do?m=3293e8e708";
                        return;
                    }
                    rtn = responseObj.data.cizz0018VOList;
                    // $.each(responseObj.data.cizz0018VOList, function(i, list) {
                    //     data += '<li><a href="#none" onclick="fnSidJobOnClick(this);" data-regord="'+list.cjobRegOrd +'" data-val="' + list.cjobJbCd + '">' + list.cjobJbNm + '</a></li>';
                    //     sidLength = i;
                    // });
                }
            }
        });
        return rtn;
    }

    /*
     * 중분류 정보를 담을 배열 변수
     */
    this.arr_Mid;



    /* 
     * 돋보기 버튼을 클릭하여 조회 성공시 돋보기 영역을 보여준다. 
     */
    this.showJobSearchArea = function(){
        $(".ctgSelectArea").addClass("small");
        $(".ctgSelectArea .scrollYArea").slideUp();
        $(".jobSearchResult").slideDown();
    }

    /* 
     * 직업 검색 이벤트 등록
     */
    this.initSearchJobAddEvent = function(){

        /* 
         * 대분류 , 중분류 , 소분류 이벤트
         */
        $(document).on('click', '.ctgSelectArea .tit', function(){
            $(".ctgSelectArea").removeClass("small");
            $(".ctgSelectArea .scrollYArea").slideDown();
            $(".jobSearchResult").slideUp();
        })
        
        /* 
         * 대분류 선택 목록 click Event
         */
        $(document).on('click', '.scrollYArea:eq(0) ul li', function(){

            //cashing 
            var $ul_Mid = $(".scrollYArea:eq(1) ul"); //중분류 선택 목록 

            /* 
             * 대분류 선택 표시를 지운다. 
             */
            $(this).parents("ul").find("li").removeClass("on"); 


            /* 
             * 현재 선택된 li tag 만 선택 표시를 해준다. 
             */
            $(this).addClass("on");

            var val_jobCd = $(this).find("a").attr("jobCd");
            _this.arr_Mid =  _this.getMidJobInfoList(val_jobCd); //중분류 목록을 가져온다.


            $ul_Mid.html(""); //중분류 목록을 초기화

            for(var x in _this.arr_Mid){
                var val_jobCd       =  _this.arr_Mid[x].cjobJbCd ; //직업코드
                var val_jobClsCat   =  _this.arr_Mid[x].cjobJbClsCat; //분류코드 
                var val_jobNm       =  _this.arr_Mid[x].cjobJbNm ; //직업명

                var $new_li =  $("<li/>"); //li tag 생성
                var $new_a  =  $("<a/>").attr({href: "#none",jobCd : val_jobCd, jobNm : val_jobNm, jboClsCat : val_jobClsCat}).text(val_jobNm);  //a tag 생성
                $new_li.append($new_a);
                $ul_Mid.append($new_li); //중분류 선택 목록에 추가 
            }
        })


        /* 
         * 소분류 정보를 담을 배열 변수 
         */
        this.arr_Sid;


        /*
         * 중분류 선택 목록 click Event
         */
        $(document).on('click', '.scrollYArea:eq(1) ul li', function(){

            //cashing 
            var $ul_Sid = $(".scrollYArea:eq(2) ul"); //소분류 선택 목록 

            /* 
             * 중분류 선택 표시를 지운다. 
             */
            $(this).parents("ul").find("li").removeClass("on"); 

            /* 
             * 현재 선택된 li tag 만 선택 표시를 해준다. 
             */
            $(this).addClass("on");

            var val_jobCd =  $(this).find("a").attr("jobCd");
            

            _this.arr_Sid =  _this.getSidJobInfoList(val_jobCd); //중분류 목록을 가져온다.

            $ul_Sid.html(""); //소분류 목록 삭제(초기화)
             for(var x in _this.arr_Sid){
                var val_jobCd       =  _this.arr_Sid[x].cjobJbCd ; //직업코드
                var val_jobClsCat   =  _this.arr_Sid[x].cjobJbClsCat; //분류코드 
                var val_jobNm       =  _this.arr_Sid[x].cjobJbNm ; //직업명

                var $new_li =  $("<li/>"); //li tag 생성
                var $new_a  =  $("<a/>").attr({href: "#none",jobCd : val_jobCd, jobNm : val_jobNm, jboClsCat : val_jobClsCat}).text(val_jobNm);  //a tag 생성
                $new_li.append($new_a);
                $ul_Sid.append($new_li); //중분류 선택 목록에 추가 
            }
        })


        /*
         * 소분류 선택 목록 click Event
         */
        $(document).on('click', '.scrollYArea:eq(2) ul li', function(){


            /* 
             * 소분류 선택 표시를 지운다. 
             */
            $(this).parents("ul").find("li").removeClass("on"); 


            /* 
             * 현재 선택된 li tag 만 선택 표시를 해준다. 
             */
            $(this).addClass("on");
        })        



        /* 
         * 직업 검색 배열을 담을 변수
         */
        this.arr_searchJob ;
        /*
         * 직업 검색 (직업 입력) 돋보기 버튼 click Event
         */
        $(document).on('click', '.btnRight', function(){
            var sKeyWord =  $(".autoCompleteInput").val();

            if(!sKeyWord){
                alertPopup("조회하실 직업명을 입력해 주세요.", "ok", function(){
                	$(".autoCompleteInput").focus();                
                });
                return ;
            }

            HiJS.svr.doRequestAjax("DHLT0200M22S", {
                data : {"cjobJbClsCat":"5", "cjobRegOrd":"1", "cjobSrchTyp":"02", "cjobSrchItm" : sKeyWord},
                loadingbar : false,
                callback : {
                    success : function(responseObj) {
                        var resData = responseObj.data;
                        if(resData.resultCode == "900") {
                            alert("세션이 종료되었거나 비정상적인 방법으로 접속하셨습니다.\n처음 부터 다시 이용해 주세요.");
                            location.href = "/service.do?m=3293e8e708";
                            return;
                        }
                        
                        //돋보기 영역
                        var $jobSearchResult =  $(".jobSearchResult div ul");
                        $jobSearchResult.html("");


                        /* 
                         * 돋보기 영역 결과 값 세팅
                         */ 
                        var arr_cipz0035VOList = resData.cipz0035VOList;

                        _this.arr_searchJob = arr_cipz0035VOList;

                        //검색결과 총건수 
                        $(".fontPoint2").html(arr_cipz0035VOList.length);



                        /* 
                         * <a href="#none" jobcd="2" jobnm="전문가 및 관련 종사자" jboclscat="1">전문가 및 관련 종사자</a>
                         jobcd
                         jobnm
                         jboclscat
                         */

                        for (var i = 0; i < arr_cipz0035VOList.length; i++) {
                            var $new_li =  $("<li/>"); 
                            var $new_a  =  $("<a/>").attr({href : "#none", cjobJbCd: arr_cipz0035VOList[i].cjobJbCd, cjobJbNm: arr_cipz0035VOList[i].cjobJbNm }).text(arr_cipz0035VOList[i].cjobJbNm);
                            $new_li.append($new_a); 
                            $jobSearchResult.append($new_li);
                        }

                        /* 
                         * 돋보기 영역을 보여준다.
                         */
                        _this.showJobSearchArea();

                        // $("#schSidBox").show();
                        
                        // $("#schSid").html("");
                        // if(responseObj.data.cipz0035VOList.length == 0) {
                        //     $("#schSidDiv").addClass("resultNone");
                        //     $("#schSid").append("<li>검색 결과가 없습니다.</li>");
                        // } else {
                        //     $("#schSidDiv").removeClass("resultNone");
                        //     var data = '';
                        //     $.each(responseObj.data.cipz0035VOList, function(i, list) {
                        //         data += '<li><a href="#none" onclick="fnSchSidClick(this);" data-val="' + list.cjobJbCd + '">' + list.cjobJbNm.replace(regExp, '<strong>' + sKeyWord + '</strong>') + '</a></li>';
                        //     });
                        //     $("#schSid").html(data);
                        // }
                    }
                }
            });
        });




        /* 
         * 직업 검색 목록 클릭 이벤트
         */
        $(document).on('click', '.jobSearchResult ul li', function(){
            $(".jobSearchResult ul li").removeClass("on");
            $(this).addClass("on");
        })

    }


    /*
     * 현재 선택된 대분류의 값을 가져온다.  
     */
    this.getCidInfoObject = function(){

        /* 
         * 현재 선택된 태그 정보(대분류)를 가져온다. 
         */
        var $a_selected = $(".scrollYArea:eq(0) ul li[class=on] a"); 


        if(_this.isNull($a_selected) || $a_selected.length == 0){
            alertPopup("현재 선택된 대분류 항목이 없습니다.", "ok");
            return; 
        }

        var val_jobcd = $a_selected.attr("jobcd");  //직업 코드를 가져온다.

        //직업코드가 일치하는 대분류 객체를 반환 
        var obj_selectedCid =  _this.getTargetObjectInArray(_this.arr_Cid, "cjobJbCd", val_jobcd);
        return obj_selectedCid;
    }

    /* 
     * 현재 선택된 중분류의 값을 가져온다.
     */

    this.getMidInfoObject = function(){
        /*
         * 현재 선택된 태그 정보(중분류)를 가져온다.
         */
        var $a_selected = $(".scrollYArea:eq(1) ul li[class=on] a");

        if(_this.isNull($a_selected) || $a_selected.length == 0) {
            alertPopup("현재 선택된 중분류 항목이 없습니다.", "ok");
            return ;
        }

        var val_jobcd = $a_selected.attr("jobcd"); //직업 코드를 가져온다.

        //직업코드가 일치하는 중분류 객체를 반환 
        var obj_selectedMid = _this.getTargetObjectInArray(_this.arr_Mid, "cjobJbCd", val_jobcd);
        return obj_selectedMid;
    }

    /* 
     * 현재 선택된 소분류의 값을 가져온다.
     */ 
    this.getSidInfoObject = function(){
        /* 
         * 현재 선택된 태그 정보(소분류)를 가져온다.
         */
        var $a_selected = $(".scrollYArea:eq(2) ul li[class=on] a");

        if(_this.isNull($a_selected) || $a_selected.length ==0){
            alertPopup("현재 선택된 소분류 항목이 없습니다.", "ok");
            return;
        }

        var val_jobcd = $a_selected.attr("jobcd"); //직업 코드를 가져온다.


        //직업 코드가 일차하는 중분류 객체를 반환 
        var obj_selectedSid = _this.getTargetObjectInArray(_this.arr_Sid, "cjobJbCd", val_jobcd );
        return obj_selectedSid;
    }


    /* 
     * 현재 선택된 직업검색 값을 가져온다.
     */
    this.getJobSearchObject = function(){
        var val_jobcd = $(".jobSearchResult ul li[class=on] a").attr("cjobjbcd"); //현재 선택된 직업 코드를 가져오고
        var obj_selectedCid =  _this.getTargetObjectInArray(_this.arr_searchJob, "cjobJbCd", val_jobcd);   //arr_searchJob 배열에서  직업코드와 관련 된 객체를 가져온다.
        return obj_selectedCid;
    }
    


    /*
     * 대분류 정보를 담을 배열 변수 
     */
    this.arr_Cid;

    /*
     * 직업 검색 기능 초기화
     */
    this.initSearchJob = function(){

        //event 등록 
        _this.initSearchJobAddEvent();

        //chshing
        var $ul_cid = $(".scrollYArea:eq(0) ul"); //대분류 선택 목록 
        var $ul_Mid = $(".scrollYArea:eq(1) ul"); //중분류 선택 목록 
        var $ul_Sid = $(".scrollYArea:eq(2) ul"); //소분류 선택 목록 

        _this.arr_Cid =  _this.getCidJobInfoList(); //대분류 목록을 가져온다.

        /*
         * 대분류 목록 초기화
         */
        $ul_cid.html("");

        /* 
         * 중분류 목록 초기화
         */
        $ul_Mid.html("");

        /* 
         * 소분류 목록 초기화
         */
        $ul_Sid.html("");

        /* 
         * 대분류 목록을 세팅해 준다.
         */
        for(var x in _this.arr_Cid){
            var val_jobCd     =  _this.arr_Cid[x].cjobJbCd ; //직업코드
            var val_jobClsCat =  _this.arr_Cid[x].cjobJbClsCat; //분류코드 
            var val_jobNm     =  _this.arr_Cid[x].cjobJbNm ; //직업명

            var $new_li =  $("<li/>"); //li tag 생성
            var $new_a  =  $("<a/>").attr({href: "#none",jobCd : val_jobCd, jobNm : val_jobNm, jboClsCat : val_jobClsCat}).text(val_jobNm);  //a tag 생성
            $new_li.append($new_a);
            $ul_cid.append($new_li); //대분류 선택 목록에 추가 
        }
    }
    
    this.$dim;
    this.$layerPopTmp;
    this.fn_callback;
    /* 
     * sync 방식 공통 레이어 팝업 
     */
    this.commlayerPopup = function(id, callback, option){

        if(this.isNull(id)){
            return;
        }

        var rtn ; //반환 할 값
        $.ajax({
            url     : "/bin/CO/CO/COCO0136G.jsp",
            type    : "get",
            async   : false,
            success : function(data){
                var new_div = $("<div/>").append($(data));
            
                if(!_this.isNull(_this.$dim)){
                    _this.$dim.remove();                
                }
                if(!_this.isNull(_this.$layerPopTmp)){
                    _this.$layerPopTmp.remove();
                }
                _this.$dim = new_div.find('.dim_bg');
                $("body").append(_this.$dim);    
                _this.$layerPopTmp = new_div.find("#"+id);
                $("body").append(_this.$layerPopTmp);
                
                _this.$dim.fadeIn();
                
                
                if(!comm_ui_util.isNull(option) && !comm_ui_util.isNull(option.fixedPosition)){
                	_this.$layerPopTmp.css("top",option.fixedPosition);
                }else{
                	_this.$layerPopTmp.css("top", Math.max(0, (($(window).height() - _this.$layerPopTmp.outerHeight()) / 2) + $(window).scrollTop()) + "px");                	
                	
                }
                
                _this.$layerPopTmp.fadeIn();
                
                
                //_this.$layerPopTmp.attr("tabindex","0").focus();
                /*
                 * 창이 닫힐 때 레  
                 */
                if(!_this.isNull(callback)){
                    _this.fn_callback = callback;
                }

                /*
                 * 현재 로딩한 폼을 리턴한다. 
                 */
                rtn =  _this.$layerPopTmp; 
            }
        })
        return rtn;
    }
    
    this.callCommLayerCallBack = function(obj){
    	if(!_this.isNull(_this.fn_callback)){
            _this.fn_callback(_this.$layerPopTmp, obj);
        }
    }

    this.commlayerClosePopup = function(val){
        if(!_this.isNull(_this.fn_callback)){
            _this.fn_callback(_this.$layerPopTmp, val);
        }
       
        _this.$dim.fadeOut(function(){
        	_this.$dim.remove();
        });
        _this.$layerPopTmp.fadeOut(function(){
        	_this.$layerPopTmp.remove();
        });
    }
    
    
   
    
    /** 
	 * @alias 콜미신청 Validation Check
	 * @param  areaId : 콜미신청 영역ID
	 * @return  boolean
	 */
	this.callmeValidate = function(areaId) {
		var result = true;
		
		// 항목 체크타입에 따른 검사
		var $obj = $('#' + areaId);
		$obj.find('[data-validtype]').each(function() {
			var $self = $(this);
			var types = $(this).data('validtype').split(' ');
			var inputval = $(this).val();
			
			$.each(types, function(idx, type) {
				if (functions[type](inputval) == false) {
					 alert($self.attr("title") + messages[type]);
					 $self.focus();
					 result = false;
					 return false;
				} 
			});
			
			if (!result) {
				return false;
			}
		});	
		
		if (!result) {
			return result;
		}
		
		// 휴대폰 중간자리 검사
		if ($('#' + areaId).find('[data-callmevo=telPart1]').val() == '010') {
			var $tel1 = $('#' + areaId).find('[data-callmevo=telPart1]');
			var $tel2 = $('#' + areaId).find('[data-callmevo=telPart2]');
			var $tel3 = $('#' + areaId).find('[data-callmevo=telPart3]');

			// 휴대폰 번호 체크
			if(!phnTelNumCheck2($tel1.val(), $tel2.val(), $tel3.val()) ){
				return;
			}

		}		
		
		return result;
	}
	
	/** 
	 * 
	 * @alias 콜미신청영역의 요소값에 대한 JSON 생성
	 * @param  areaId : 콜미신청 영역ID
	 * @return JSON  
	 */
	this.getCallmeData = function(areaId) {
		var $obj = $('#' + areaId);
		var resultData = {};	
		$obj.find('[data-callmevo]').each(function() {
			resultData[$(this).data('callmevo')] = $(this).val();
		});
		
		return resultData;
	}
	
	/** 
	 * @alias 콜미신청영 Ajax
	 * @param taskcode : TASK CODE
	 * @param jsondata : JSON DATA
	 * @param {result:boolean, responseCode:string, responseMessage:string}
	 */
	this.callmeApply = function (taskcode, jsondata) {
		var callmedata = {
				taskCode : taskcode || 'CAL_CALL'
		};
		$.extend(callmedata, jsondata);
		
		var xec = true;
		if (typeof(document.XWCDataPlugin) == 'undefined') {
			xec = false;
		}
		
		var result = {result:true, responseCode:'', responseMessage:''};
		
		if(taskcode == "TM_CALL"){
			console.log("taskcode:"+taskcode);
			try {
				_PL('https://direct.hi.co.kr/tmcall_pc');
			} catch (e) {}
		}
		
		HiJS.svr.doRequestAjax('DHCO0104M01I', {
			data:callmedata,
			async:false,
			loadingbar:false,
			xecure:xec,
			callback:{success:function(data) {
							 },
							 failure:function(data) {		
								 var code = data.header.responseCode;
								 var message = data.header.responseMessage;
								 result =  {result:false, responseCode:code, responseMessage:message.replace('[' + code + '] ', '')};
							 }
							}
		});		
		
		return result;
	}
	
	this. _callmeTelNo = {telType:'', telPart1:'', telPart2:'', telPart3:''};
	this._telChk = false;
	
	
	/** 
	 * @alias 상담전화레이어 
	 */	
	this.fncOpenCallmeLayer = function() {
		_this.setCallmeTelNo();
		_this.openCallmeLayer(_this.getCallmeTask(), _this._callmeTelNo);
	}
	
	/** 
	 * @alias 상담 기본전화번호 세팅 
	 */		
	this.setCallmeTelNo = function() {
		if (_this._callmeTelNo.telType == '' &&  _this._callmeTelNo.telPart1 == '' && _this._callmeTelNo.telPart2 == '' &&  _this._callmeTelNo.telPart3 == '') {
			if (!_this._telChk) {
				_this._callmeTelNo = getCMTelNo($('input[name=executeTime]').val());
				_this._telChk = true;
			}
		}			
	}
	
	/** 
	 * @alias 마지막스텝 판단 
	 */		
	this.isLastStep = function() {
		var result = false;

    if(_this.isNull(_menuGb)){
      return ; 
    }

		var rootGb = _menuGb.substr(0, 2);
		switch(rootGb) {
			case '46' :	// 장기운전자
				if (_menuId == '777nk81gr9') result = true;
			break;
			case '47' :	// 연금
				if (_menuId == 'cb3e686efb') result = true;
			break;
			case '50' :	// 단기운전자
				if (_menuId == 'fda98d5464') result = true;				
			break;
			case '51' :	// 국내여행
				if (_menuId == '226f037ec9') result = true;				
			break;
			case '52' :	// 해외여행
				if (_menuId == 'beec1003f6') result = true;				
			break;
			case '53' :	// 골프
				if (_menuId == '1e760af7b6') result = true;
			break;			
			case '54' :	// 주택화재
				if (_menuId == '1e960af7b7') result = true;
			break;	
			case 'd8' :	// 실손의료비보장보험
				if (_menuId == 'bfee998247') result = true;
			break;
			case '74' :	// 주택화재상해보험
				if (_menuId == '32228f1e1c') result = true;
			case '5e' :	// my 다이렉트
				if (_menuId == 'f335a51213') result = true;
				if (_menuId == '0f4727d68a') result = true;
			break;
		}

		if (_menuGb ==  '012ac931b5' ){ //장기체류보험
			if (_menuId == '5be50ccd0d') { //장기체류보험 가입완료
				result = true;
			}
		}
	
		return result;
	}
	
	/**
	 * 가입종료 상담신청 팝업 호출
	 */
	
	
	$(document).on("click", "a.btnClose", function(){
		var isXbtn = $(this).find("img[src*='btn_close.png']").length;
		var alertChk = $(this).closest(".alertSet").length;
		
		
		console.log('_menuId: ' + _menuId)
		console.log('_menuGb: ' + _menuGb)
		
		if(alertChk <= 0){
			if(isXbtn > 0){
				if( $(".dim_bg:visible").length == 0 && $(".btnClose:visible").length > 0 ) {
					if(_menuGb == "d8f4e412b0" || _menuGb == "91c81b7cf9"){
						openLayer('_linkedSaleLTCC');
					}else{
						if (_this.isLastStep()) {
							location.href = "/";
							return;
						}
						if ($('input[name=executeTime]').val() != '') {
							_this._callmeTelNo.executeTime = $('#executeTime').val(); 
						}
						_this.setCallmeTelNo();
						if(_menuId != 'be9c1d923a' && _menuId != 'bb188e95fe' && _menuId != 'da100e959d'){
							
							if(_geMediaNo=="B817")openCallmeLayerPC("", _this._callmeTelNo);	//2022.09.27 - 현대 M포인트 제휴 관련 수정 - 심흥무
							else		openCallmeLayerPC(_this.getCallmeTask(), _this._callmeTelNo);
							
							popupFocus();
						}
					}
				}	
			}else{
				$("img[src*='btn_close.png']").parent().focus();
			}
		}	
		
	});
	
	
	/** 
	 * @alias 상담전화 태스크구분코드 
	 */		
	this.getCallmeTask = function() {
		var result = 'CAL_CALL';
		var rootGb = _menuGb.substr(0, 2);
		
		switch(rootGb) {
			case '46' :	// 장기운전자
				result = 'LT_CALL';
			break;
			case '47' :	// 연금
				result = 'PN_CALL';
			break;
			case '50' :	// 단기운전자
				result = 'GE_CALLME';
			break;
			case '51' :	// 국내여행
				result = 'DM_CALL';		
			break;
			case '52' :	// 해외여행
				result = 'FG_CALL';		
			break;
			case '53' :	// 골프
				result = 'GF_CALL';		
			break;			
			case '54' :	// 주택화재
				result = 'HS_CALL';		
			break;	
			case 'd8' :	// 실손의료비
				result = 'MD_CALL';
			break;
			case '74' :	// 주택화재상해보험
				result = 'HS_CALL';
			break;
			case '83' :	// 암
				result = 'CC_CALL';
			break;
			case 'ed' :	// 건강
				result = 'HT_CALL';
			break;
			case 'b0' : // H주택화재상해보험
				result = 'FM_CALL';
			break;
			case '5e' : // MY다이렉트
				result = 'MY_CALL';
			break;
			case '8f' : // 장기어린이보험
				result = 'CH_CALL';
			case '73' : // 하이펫보험
				result = 'HIPET_CALL';
			break;
		}
		
		// 해외장기체류보험은 해외여행과 동일하게 콜미신청하기로 함 (2016.07.27 윤우현 주임에게 확인)
		// 2021.11.03 해외장기체류 이탈프로세스 변경(안윤경 차장님)
		if (_menuGb ==  '012ac931b5' || _menuGb ==  '6dbf806423'){ 
			result = 'L_FG_CALL';	
		}
		
		
		return result;		
	}

  /* 
   * 응모여부 체크 
   * --------------------------------------
   * [반환값]
   * 001 : 응모 하지 않은 고객
   * 002 : 응모한 고객
   */
  this.checkedEntry = function(obj){
    if(comm_ui_util.isNull(obj)){
      return; 
    }

    if(comm_ui_util.isNull(obj.evntId)){
      return;  
    }

    if(comm_ui_util.isNull(obj.custTel)){
      return; 
    }

    var rtn = "";
    HiJS.svr.doRequestAjax("DHCO0350M13S", {  
      data :obj,
      loadingbar : false,
      async : false, 
      callback : {
        success : function(responseObj) {
          rtn =  responseObj.data.rtCode;
        }
        ,
        failure:function(result) {    
        }
      }
    });
    return rtn;
  }
	
	
	this.checkedEvnt = function(obj){
		var rtn = "";
		HiJS.svr.doRequestAjax("DHCO0350M12S", {  
			data : obj,
			loadingbar : false,
      async : false, 
			callback : {
				success : function(responseObj) {
					//console.log(JSON.stringify(responseObj.data));
					var rtCode = responseObj.data.rtCode;
          rtn = rtCode; 
				}
				,
				failure:function(result) {		
					//console.log(JSON.stringify(result));
				}
			}
		});
    return rtn; 
	}
	
	/* 암보험 이벤트 응모 */
	this.checkedLtEvnt = function(obj){
		var rtn = "";
		HiJS.svr.doRequestAjax("DHCO0350M15S", {  
			data : obj,
			loadingbar : false,
      async : false, 
			callback : {
				success : function(responseObj) {
		console.log(JSON.stringify(responseObj.data));
					var rtCode = responseObj.data.rtCode;
          rtn = rtCode; 
				}
				,
				failure:function(result) {		
	    console.log(JSON.stringify(result));
				}
			}
		});
    return rtn; 
	}
	
	/* 이벤트 신규(정규화 장미정- 201810) 응모 */
	this.checkedNewRegEvnt = function(obj){
		var rtn = "";
		HiJS.svr.doRequestAjax("DHCO0350M21S", {  
			data : obj,
			loadingbar : false,
			async : false, 
			callback : {
				success : function(responseObj) {
					//console.log(JSON.stringify(responseObj.data));
					var rtCode = responseObj.data.rtCode;
          rtn = rtCode; 
				}
				,
				failure:function(result) {		
					//console.log(JSON.stringify(result));
				}
			}
		});
    return rtn; 
	}
	
	this.mainContentChange = function(){
		$(".objArea").eq(0).addClass("play");
		$(".productFixedMenu a").on("click",function(){
			$(".productFixedMenu li").removeClass("on");
			$(".productFixedMenu a").attr("title","");
			$(this).parent().addClass("on");
			$(this).attr("title","선택됨");
			$(".content.product").hide().eq($(".productFixedMenu a").index(this)).show();
		});
	}
	
	this.openCallmeLayerQuick = function () {
			
		// 상담신청버튼 클릭 처리
		var $layerObj = $('#telConsl');		
		var layerId= 'telConsl';
		// validation
		var taskCode = $layerObj.find('[data-callmetask]:checked').attr('data-callmetask');
		if (taskCode == 'undefined' || taskCode == null || taskCode == '') {
			alertPopup('상담신청 내용을 선택해 주세요', "ok", function(){
				return;
			});
		}
		if (!_this.callmeValidate(layerId)) return;
		
		// 콜미영역 항목값 JSON
		var callmeJson = _this.getCallmeData(layerId);
		// 콜미신청 실행
		var callmeResult = _this.callmeApply(taskCode, callmeJson);
		// 콜미결과별 처리
		if (callmeResult.result) {
			alertPopup('상담 신청이 완료 되었습니다.<br>신청 팝업을 닫고 진행 중이던 화면으로 돌아갑니다.', "ok", function(){
				$(".dim_bg").remove();
				$(".layerPopWrap").remove();
			});				
		} else {
			alertPopup(callmeResult.responseMessage, "ok");
		}

	}
	
	
	
	/**
	 * @alias 날짜 포맷팅(YYYY value MM value DD value 형식으로 리턴)
	 * @param str : 날짜 변수(8자리)  
	 */
	this.setFormatDateToValue =  function (str,value){
		var result = "";
		if (str.length == 8) {
			result = str.substring(0,4) + value + str.substring(4,6) + value + str.substring(6,8);
		}
		return result;
	}
	
	/**
	 * @alias 날짜 포맷팅(YYYY년 MM월 DD일 형식으로 리턴)
	 * @param str : 날짜 변수(8자리)  
	 */
	this.setFormatDateToHan = function (str){
		var result = "";
		if (str.length == 8) {
			result = str.substring(0,4) + '년 ' + str.substring(4,6) + '월 ' + str.substring(6,8) + '일';
		}
		return result;
	}
	
	/**
	 * @alias 달력컨트롤(datepicker)에서 날짜 선택시 날짜 체크(시작일, 종료일)
	 * 시작일이 종료일보다 클경우 종료일을 시작일로 세팅
	 */
	this.fn_SetDate = function(obj) {
		var type = "";
		var oInsStDt = "";
		var oInsEdDt = "";
		var oInsTmp = "";
		var flag = false;
		var iCnt = 1;
		if (obj.hasClass("start")) {
			oInsStDt = obj.closest(".inputBase").find(".start");		
			if (obj.hasClass("end")) {
				oInsEdDt = obj.closest(".inputBase").find(".end");
			}
			else {
				oInsTmp = obj.closest(".inputBase");
				flag = false;
				var cnt = 0;
				while (!flag) {
					oInsTmp = oInsTmp.parent();
					if (oInsTmp.find(".end").hasClass("end")) {
						oInsEdDt = oInsTmp.find(".end");
						flag = true;
					}
					
					cnt++; 
					if (cnt > 10) {
						flag = true;
					}
				}
			}
		}
		else if (obj.hasClass("end")) {
			oInsEdDt = obj.closest(".inputBase").find(".end");
			if (obj.hasClass("start")) {
				oInsStDt = obj.closest(".inputBase").find(".end");
			}
			else {
				oInsTmp = obj.closest(".inputBase");
				flag = false;
				var cnt = 0;
				while (!flag) {
					oInsTmp = oInsTmp.parent();
					if (oInsTmp.find(".start").hasClass("start")) {
						oInsStDt = oInsTmp.find(".start");
						flag = true;
					}
					
					cnt++; 
					if (cnt > 10) {
						flag = true;
					}
				}
			}
			
		}
		
		if ( comm_ui_util.isNull(oInsStDt) ) {
			return;
		}
		
		if ( comm_ui_util.isNull(oInsEdDt) ) {
			return;
		}
		
		var insStDt = oInsStDt.val();
		var insEdDt = oInsEdDt.val();
		
		insStDt = replaceAll(insStDt, '-', '');
		insEdDt = replaceAll(insEdDt, '-', '');
		
		if (insStDt > insEdDt) {
			oInsEdDt.val(setFormatDate(insStDt, '-'));
		}
	}


  this.before_div_z_index = 0;
  this.before_dim_z_index = 0;
  
  
  /** 
   * 로컬스토리지에 인증수단 저장(20210930-심흥무)
   * ---------------------------------------
   * ptyId          : 저장할 당사자ID
   * method			: 인증수단(hp/pub/kko/pin 등)
   * ---------------------------------------
   */
  
  this.certMethodSave= function(ptyId,method){
	  try{
		  if(ptyId !=null && ptyId !=""){
			  var loadDoc = localStorage.getItem("certMethod");
			  var pasData = {};
				
			  if(loadDoc !=null){
				  pasData = JSON.parse(loadDoc);
			  }
			  pasData[ptyId]=method;
			  localStorage.setItem("certMethod",JSON.stringify(pasData));
		  }
	  }catch (e) {}
  }
  
  /** 
   * 이벤트 응모 팝업 
   * ---------------------------------------
   * obj            : [JSON]
   * obj.evntId     : 이벤트 아이디
   * ---------------------------------------
   * option         : [JSON]
   * option.target  : 팝업이 닫혔을때 focus할 component
   */
  this.fn_openLayerEventPop = function(obj){

    if(comm_ui_util.isNull(obj) || comm_ui_util.isNull(obj.evntId)){
      alert("fn_openLayerEventPop method parameter :    [evntId] 가  null 입니다.");
      return; 
    }

    var $evnet_layerPop = comm_ui_util.commlayerPopup('eventEntryPop', function(){
        
    });
    
    /* 
     * [이벤트 응모하기] 버튼 클릭 이벤트
     */
    $evnet_layerPop.find("#a_eventEntry").off('click.event');
    $evnet_layerPop.find("#a_eventEntry").on('click.event', function(){
      /******************************************************************* 
       * validation check
       *******************************************************************/
      //이름 null 값 체크 
      var val_custNm =  $evnet_layerPop.find("#event_custNm").val(); 
      if(comm_ui_util.isNull(val_custNm)){
        alertPopup('이름을 입력해 주세요', "ok");
        return; 
      }

      //휴대폰번호 null 값 체크 
      var val_hp =  $evnet_layerPop.find("#event_hp").val(); 
      if(comm_ui_util.isNull(val_hp)){
        alertPopup("휴대폰 입력해 주세요", "ok");
        return; 
      }

      //주민등록번호 null 값 체크
      var val_regNo1 =  $evnet_layerPop.find("#event_regNo1").val(); 
      if(comm_ui_util.isNull(val_regNo1)){
    	  alertPopup('주민등록번호를 입력해 주세요', "ok");
        return; 
      }

      //뒷 7자리 null 값 체크 
      var val_regNo2 =  $evnet_layerPop.find("#event_regNo2").val(); 
      if(comm_ui_util.isNull(val_regNo2)){
    	  alertPopup('주민번호 뒷자리를 입력해 주세요', "ok");
        return; 
      }

      /*
       * 이벤트 동의를 위한 개인정보 수집/이용 동의 
       */
      var val_agree1 =  $evnet_layerPop.find("#agree1").prop("checked");
      if(!val_agree1){
    	alertPopup("이벤트 동의를 위한 개인정보 수집/이용 동의를 해주세요.", "ok");
        return; 
      }
      /*
       * 이벤트 동의를 위한 개인정보 제공 동의 
       */
      var val_agree2 =  $evnet_layerPop.find("#agree2").prop("checked");
      if(!val_agree2){
    	alertPopup("이벤트 동의를 위한 개인정보 제공 동의를 해주세요.", "ok");
        return; 
      }

    

    

      var val_regNo = val_regNo1 + val_regNo2;
      var oReqData = {
        custNm         : val_custNm,
        custTel        : val_hp,   
        evntId         : obj.evntId,  
        insProdCd      : '10061001',      // 상품코드 자동차개인 : 10061001 
        regNo          : val_regNo

      };


      HiJS.svr.doRequestAjax('DHCO0350M12S', {
        xecure:false,
        data : oReqData,
        loadingbar : false,
        callback : {
          success:function(responseObj) {
            
            var lstData = responseObj.data.rtCode;
            /* 
             * 이미 등록된 고객입니다. 
             */
            if(lstData =="002"){
              alertPopup("고객님은 이미 응모 하셨습니다.", "ok");
              return; 
            }

            if(lstData =="003"){
            	alertPopup('고객님은 미산출 고객님 이십니다. <br>내차보험료 확인 하기를 눌러 보험료 확인하고 이벤트 응모하세요.<br>보험료계산화면으로 이동하시겠습니까?', "", function(rst){
            		if(rst) {
            			location.href = '/service.do?m=28680681ee';
            		}
            	});
            	return;
            }
            
            alertPopup("이벤트에 응모해주셔서 감사합니다.", "ok");
            comm_ui_util.commlayerClosePopup();
            
          }, failure : function(responseObj){
        	alertPopup("이벤트 응모중 예외가 발생하였습니다. 고객센터를 통해 문의해주세요.", "ok");
            return;
          }
        }
      });

    });
  }

  //장기체류보험 카카오톡 나에게 보내기 팝업오픈 및 전화번호 셋팅
  this.openKakaoSendPopup = function(){
  	comm_ui_util.commlayerPopup('_callmeBreakwayLayerGILTRKAKAO');

		var cmTelNo = getCMTelNo($('input[name=executeTime]').val());
		var mpNo = cmTelNo.telPart1 + cmTelNo.telPart2 + cmTelNo.telPart3;
		$("input[name=hp]").val(mpNo);
		$("input[name=hp]").parent().addClass("value");
  }
  
  //장기체류보험 카카오톡 나에게 보내기
  this.lfgSendMeKakao = function(){
	  
	  var telNo1 = $("input[name=hp]").val().substring(0, 3);
	  var telNo2 = $("input[name=hp]").val().substring(3, 7);
	  var telNo3 = $("input[name=hp]").val().substring(7, 11);
		
      var oReqData = {
    		  telNo1 		: telNo1,
			  telNo2 		: telNo2,
			  telNo3 		: telNo3,
    		  executeTime   : $("input[name=executeTime]").val()
      };
      
      HiJS.svr.doRequestAjax('DHGI5001M81S', {
          xecure:false,
          data : oReqData,
          loadingbar : false,
          callback : {
	            success:function(responseObj) {
	            	alertPopup("보험료 전송이 완료되었습니다.<br>출국 전 잊지말고 다시 방문해주세요.","ok",function(){location.href='/'});
	            }, failure : function(responseObj){
	            	alertPopup("보험료 전송이 실패하였습니다.<br>입력정보를 확인해주세요.","ok",function(){});
	            }
	          }
      });
  }
 	
  this.getTermsInfoMyDirect = function(obj){
	  var suntaekView;						// 상품소개동의 무조건 보여짐
	  // 마케팅활용 기동의여부
	  var requestSmsVO = {};
      requestSmsVO.insProdCd = "TM000001";

      HiJS.svr.doRequestAjax("DHCO0310M04S", {  //ajax 
          data : requestSmsVO,
          loadingbar : false,
          async :false,
          callback : {
              success : function(responseObj) {
                  _this.rtnObj_list = responseObj.data.dhco0310voList;

                  /* 
                   * cashing 처리 
                   */
                  var $suntaek   = $(".agreeBox.checkAllSetItem ul");       //(선택)상품 소개를 위한 동의 영역
                  $suntaek.html("");           //(선택)상품 소개를 위한 동의 초기화

					var suntaekArray = new Array();

					for (var i = 0; i < _this.rtnObj_list.length; i++) {

                      if(_this.rtnObj_list[i].delYn == "N"){ //삭제 대상이 아닌것만
                      	var cntnMgntId 				=  _this.rtnObj_list[i].cntnMgntId;
                          var val_title               =  _this.rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, "");; //동의 제목
                          var val_cnts				=  _this.rtnObj_list[i].cnts; //동의 내용
                          var val_cntnOptCat          =  _this.rtnObj_list[i].cntnOptCat; //컨텐츠 옵션구분 코드
                          var val_radio_id_yes        =  _this.rtnObj_list[i].cntnMgntId + "_1"; //[동의] id 
                          var val_radio_id_no         =  _this.rtnObj_list[i].cntnMgntId + "_2"; //[미동의] id
                          var $li_new                 = $("<li/>");
                          
                          //BFZZ07 --> 마케팅동의 관련 보종별 indexOf("07") 로 전부 예외처리 되어있음 따라서 공통에서 수정 처리
                          if(_this.rtnObj_list[i].cntnMgntId == 'BFZZ01'){
                          	cntnMgntId = "BFZZ07";
                          	val_radio_id_yes = "BFZZ07_1";
                          	val_radio_id_no = "BFZZ07_2";
                          }

                          /* 
                           * [ (필수) 개인(신용)정보 처리 동의 ] 부분 처리  
                           */
                          var $new_li_div1         =  $('<div/>').attr({class: 'titArea'}).appendTo($li_new);
                          var $new_li_div1_span    =  $('<span/>').attr({class : 'txt'}).html(val_title).appendTo($new_li_div1);
                          var $new_li_div1_a       =  $('<a/>').attr({href:'#none', class:'btn small2', title:'자세히보기', style:'left: 490px;', code:_this.rtnObj_list[i].cntnMgntId}).appendTo($new_li_div1);
                          var $new_li_div1_a_span  =  $('<span/>').text('자세히보기').appendTo($new_li_div1_a);

							if(_this.rtnObj_list[i].cntnMgntId != "BFAA00" && _this.rtnObj_list[i].cntnMgntId != "BFZZ00"){
								
								var $new_li_div2        =  $('<div/>').attr({class : 'agreeRadio'}).appendTo($li_new);
								var $new_li_div2_div1   =  $('<div/>').attr({class : 'radio'}).appendTo($new_li_div2);
								
								//선택동의(BFZZ) radio
								if(_this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') >= 0){
									// 선택동의
										var $new_li_div2_div1_input = $('<input/>').attr({type:'radio', name: cntnMgntId, id: val_radio_id_no,  class: 'no' , value: 'N'}).appendTo($new_li_div2_div1);
										var $new_li_div2_div1_label = $('<label/>').attr({for: val_radio_id_no}).html('동의하지 않음').appendTo($new_li_div2_div1);
										var $new_li_div2_div2       = $('<div/>').attr({class : 'radio', style: 'margin-left: 7px;'}).appendTo($new_li_div2);
										var $new_li_div2_div2_input = $('<input/>').attr({type:'radio', name: cntnMgntId, id: val_radio_id_yes, class: 'yes' , value: 'Y'}).appendTo($new_li_div2_div2);
										var $new_li_div2_div2_label = $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_div2_div2);
								}
							}
						
                          if(_this.rtnObj_list[i].cntnMgntId.indexOf('BFAA') >= 0){
                     		}else if(_this.rtnObj_list[i].cntnMgntId.indexOf('BFZZ') >= 0){
                              // [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우
                     			if(_this.rtnObj_list[i].cntnMgntId == "BFZZ02" || _this.rtnObj_list[i].cntnMgntId == "BFZZ03"){
                     				//skip
                     			}else{
	                       			suntaekArray.push($li_new);
	                       		}
                          }
                      }
                  }
					
				// 선택동의
				if(suntaekArray.length > 0){
					// 상품소개동의 무조건 보여짐
					$.each(suntaekArray, function(idx, value){
						$suntaek.append(value);
					});
				}

				if( $("#mktgUtlAgrmExistYn").val()!= "Y"){
					$("#agreeAll2").prop("checked", false);
					$(".checkAllSet :radio.no").prop("checked", true);
				}else{
					$("#agreeAll2").prop("checked", true);
					$(".checkAllSet :radio.yes").prop("checked", true);
				}
                 
              	// 선택동의 모든항목 일괄 선택/해제
          		$(document).on("click", ".checkAllSet :radio", function(){
          			var checkVal = $("#"+$(this).attr("id")).val();
          			$(".checkAllSet :radio[value="+checkVal+"]").prop("checked", true);

          		});
          		
          		// 개인(신용)정보의 수집·이용동의 선택시 가입권유 모두 동의
          		$(document).on("click", "input[id=BFZZ07_1]", function(){
          			$("[id^='agreeSelect']").val("Y");
          			$("#selG").val("Y");
          		});
          		
          		$(document).on("click", "input[id=BFZZ04_1]", function(){
          			$("[id^='agreeSelect']").val("Y");
          			$("#selG").val("Y");
          		});
          		
          		$(document).on("click", "input[id=BFZZ07_2]", function(){
          			$("[id^='agreeSelect']").val("N");
          			$("#selG").val("N");
          		});
          		
          		$(document).on("click", "input[id=BFZZ04_2]", function(){
          			$("[id^='agreeSelect']").val("N");
          			$("#selG").val("N");
          		});
          		
                  /* 
                   * 자세히 보기 이벤트
                   */
                  $(".btn.small2").off('click');
                  $(".btn.small2").on('click', function(){    
                      var val_code = $(this).attr('code');
                      /* 
                       * trim 처리 
                       */
                      val_code = $.trim(val_code);
                      for (var i = 0; i < _this.rtnObj_list.length; i++) {
                          
                          if(_this.rtnObj_list[i].cntnMgntId == val_code){
                              var $popHtml = comm_ui_util.commlayerPopup('termlayerPop', function(){ });
                              
                              $popHtml.find(".btnClose").attr("data-focus","[code="+val_code+"]" );
                              $popHtml.find(".btn.orange").attr("data-focus","[code="+val_code+"]");
                              popupFocus();
                              
                              $popHtml.find('.titleArea h2').html(_this.rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, ""));                          //제목
                              $popHtml.find(".popAgreeScroll").html(_this.rtnObj_list[i].cnts); //내용 

                              // 필수, 선택동의 내용 PC/모바일 공통 DB조회 --> 2021.05 동의내용 개편에 따른 PC/모바일 구분 처리
                              $popHtml.find("#agreeWeb").show();
                              $popHtml.find("#agreeMob").hide();
                          	
                              // 선택동의이고, [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우만
                              if (_this.rtnObj_list[i].cntnMgntId == "BFZZ01") {
                              	
                            	//기존에 미동의이면 팝업 오픈시 동의하지 않음으로 선택함
                            	if( $("#mktgUtlAgrmExistYn").val()!= "Y"){
                            		$(".popupContentArea :radio.no").prop("checked", true);
                            	}else{
                            		$(".popupContentArea :radio.yes").prop("checked", true);
                            	}
                            	
                            	var selG = $("#selG").val();
                            	// 미동의 선택해서 팝업 오픈한 경우 팝업도 미동의로 선택
                            	if(selG=="N"){
                            		$(".popupContentArea :radio.no").prop("checked", true);
                            	}else{
                            		$(".popupContentArea :radio.yes").prop("checked", true);
                            	}
                            	
                            	if($("#agreeSelect1").val() != "Y"){
                                  	$("#agreeTel").prop("checked", false);
                                }
                                if($("#agreeSelect2").val() != "Y"){
                                  	$("#agreeSms").prop("checked", false);
                                }
                                if($("#agreeSelect3").val() != "Y"){
                                  	$("#agreeEmail").prop("checked", false);
                                }
                                if($("#agreeSelect4").val() != "Y"){
                                  	$("#agreePost").prop("checked", false);
                                }
                              	
                                //전화,문자,이메일,DM 중 하나라도 선택하면 동의로 바꿔줌
                                $(document).on("click", ".popupContentArea :checkbox", function(){
                                	if($(this).prop("checked")){
                                		$(".popupContentArea :radio.yes").prop("checked", true);
                                	} 
                                	
                                	if(!$("#agreeTel").prop("checked") && !$("#agreeSms").prop("checked") && !$("#agreeEmail").prop("checked") && !$("#agreePost").prop("checked")){
                                     	$(".popupContentArea :radio.no").prop("checked", true);
                                    }
                          		});
                                
                                $(document).on("click", ".popupContentArea :radio.yes", function(){
                                	$(".popupContentArea :radio.yes").prop("checked", true);
                                	
                                });
                                
                                $(document).on("click", ".popupContentArea :radio.no", function(){
                                	$(".popupContentArea :radio.no").prop("checked", true);
                                	$(".popupContentArea :checkbox").prop("checked", false);
                                });
                                
                              	//상품소개동의 개인정보 유효기간
                              	if($("#agrmExprYear").val() != undefined && $("#agrmExprYear").val() != ""){
                              	    if( $("#mktgUtlAgrmExistYn").val()!= "Y"){
                                  	   $(".popupContentArea :radio.no").prop("checked", true);
                                   }
                              		
                                  	var val = $("#agrmExprYear").val();
                                  	$("input:radio[name=agrmExprCltWeb][value="+val+"]").prop("checked", true);
                                 }
                                  
                                  $("#agreeCntnMgntId").val(_this.rtnObj_list[i].cntnMgntId); 
                                  
                              }
                              
                              if( _this.rtnObj_list[i].cntnMgntId == "BFZZ04"){
                              	//상품소개동의 개인정보 유효기간
                                  if($("#agrmExprYear").val() != undefined && $("#agrmExprYear").val() != ""){
                                  	var val = $("#agrmExprYear").val();
                                  	$("input:radio[name=agrmExprPrdWeb][value="+val+"]").prop("checked", true);
                                  }
                                  
                                  $("#agreeCntnMgntId").val(_this.rtnObj_list[i].cntnMgntId);
                                  
                                //기존에 미동의이면 팝업 오픈시 동의하지 않음으로 선택함
                              	if( $("#mktgUtlAgrmExistYn").val()!= "Y"){
                              		$(".popupContentArea :radio.no").prop("checked", true);
                              	}else{
                              		$(".popupContentArea :radio.yes").prop("checked", true);
                              	}
                                 
                              	var selG = $("#selG").val();
                            	// 미동의 선택해서 팝업 오픈한 경우 팝업도 미동의로 선택
                            	if(selG=="N"){
                            		$(".popupContentArea :radio.no").prop("checked", true);
                            	}else{
                            		$(".popupContentArea :radio.yes").prop("checked", true);
                            	}
                            	
                            	$(document).on("click", ".popupContentArea :radio.yes", function(){
                            		$(".popupContentArea :checkbox").prop("checked", true);
                                	$(".popupContentArea :radio.yes").prop("checked", true);
                                });
                                
                                $(document).on("click", ".popupContentArea :radio.no", function(){
                                	$(".popupContentArea :radio.no").prop("checked", true);
                                	$(".popupContentArea :checkbox").prop("checked", false);
                                });
                                
                              }
                              
                              $("#termlayerPop").css("top", Math.max(0, (($(window).height() - $("#termlayerPop").outerHeight()) / 2) + $(window).scrollTop()) + "px");
                              $popHtml.find(".btn.line.inlineBlock.orange").off('click.orange');
                              
                              //확인 버튼 클릭
                              $popHtml.find(".btn.line.inlineBlock.orange").on('click.orange', function() {

                              	if ($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ01"){
                              		var chkVal = 0;
                              		// 전화
                              		$("#agreeSelect1").val("Y");
                              		if (!$("#agreeTel").prop("checked")) {
                              			$("#agreeSelect1").val("N");
                              			chkVal++;
                              		}
                              		
                              		// 문자
                              		$("#agreeSelect2").val("Y");
                              		if (!$("#agreeSms").prop("checked")) {
                              			$("#agreeSelect2").val("N");
                              			chkVal++;
                              		}
                              		
                              		// 이메일
                              		$("#agreeSelect3").val("Y");
                              		if (!$("#agreeEmail").prop("checked")) {
                              			$("#agreeSelect3").val("N");
                              			chkVal++;
                              		}
                              		
                              		// DM
                              		$("#agreeSelect4").val("Y");
                              		if (!$("#agreePost").prop("checked")) {
                              			$("#agreeSelect4").val("N");
                              			chkVal++;
                              		}
                              		
                              		// 개인정보 보유기간 선택(5년/4년/3년)
                              		var agrmExprYear = $(":radio[name=agrmExprCltWeb]:checked").val();
                              		if(agrmExprYear != ""){
                              			$("#agrmExprYear").val(agrmExprYear);
                              		}
                              		
                              		// 선택동의 미동의 확인 (선택동의만 .suntaek)                         		
                              		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                              			$(".checkAllSet :radio.no").prop("checked", true);
                              			$("#agreeAll2").prop("checked", false);
                              			$("#selG").val("N");
                              			comm_ui_util.commlayerClosePopup();
                              		}else{
                              			if(chkVal == 4){
                                  			alertPopup('가입권유 연락방식을 1개 이상 선택해주시기 바랍니다.',"ok",function(){
                                  				return false;
                                  			});
                                  		}else{
                                  			$(".checkAllSet :radio.yes").prop("checked", true);
                                  			$("#agreeAll2").prop("checked", true);
                                  			$("#selG").val("Y");
                                  			comm_ui_util.commlayerClosePopup();
                                  		}
                              		}
                					
                              	}else if($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ04"){                             	
                              		// 개인정보 보유기간 선택(5년/4년/3년)
                              		var agrmExprYear = $(":radio[name=agrmExprPrdWeb]:checked").val();
                              		if(agrmExprYear != ""){
                              			$("#agrmExprYear").val(agrmExprYear);
                              		}
                              		
                              		// 선택동의 미동의 확인 (선택동의만 .suntaek)
                              		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                              			$(".checkAllSet :radio.no").prop("checked", true);
                              			$("#agreeAll2").prop("checked", false);
                              			$("#selG").val("N");
                              			$("[id^='agreeSelect']").val("N");
                              		}else{
                              			$(".checkAllSet :radio.yes").prop("checked", true);
                              			$("#agreeAll2").prop("checked", true);
                              			$("#selG").val("Y");
                              			
                              			var chkVal = 0;
                                  		if ($("#agreeSelect1").val()=="Y") chkVal++;
                                  		if ($("#agreeSelect2").val()=="Y") chkVal++;
                                  		if ($("#agreeSelect3").val()=="Y") chkVal++;
                                  		if ($("#agreeSelect4").val()=="Y") chkVal++;

                                  		if(chkVal == 0){
                                  			$("[id^='agreeSelect']").val("Y");
                                  		}
                              		}
                              		comm_ui_util.commlayerClosePopup();
                              		
                              	}else{
                              		
                              		// 자세히보기 내용 라디오버튼 항목 확인 (필수동의만 .filsu)
                              		if( $popHtml.find("#agreeWeb .filsu.agreeRadio.fr").size() > 0){
	                                    	var $nas = $popHtml.find("#agreeWeb .filsu.agreeRadio.fr");
	                                    	for(var i = 0; na = $nas[i]; i++) {	
	                                    		//동의 미선택 항목 체크		
	                                    		if ($(na) && !$(na).find("input[value=Y]").is(":checked")  ) {
	                                    			alertPopup("본 동의는 '고객정보 관리 및 가입설계'를 위해 필수적인 사항이므로  동의를 거부하시는 경우 관련 업무 수행이 불가합니다.","ok",function(){
	                                    				$(na).find("input").focus();
	                                    			});
	                                    			return false;	
	                                    		}
	                                    	}
                              		}

                                  	$(".checkAllSet input[name="+val_code+"].yes").prop("checked", true);
                                  	$(".checkAllSet input[name="+val_code+"].no").prop("checked", false);
                                  	
                              		comm_ui_util.commlayerClosePopup();
                              	}
                              });
                              
                          }
                      }

                 });
              }
              ,
              failure:function(result) {      
                  
              }
          }
      });
		
		$("input[name*=07]").click(function() {
      	var chk = $(this).val();
      	if(chk == "Y") {
      		$("input[name*=16]:eq(0)").prop("checked", true);
      		$("input[name*=16]:eq(0)").attr("checked", true);
      	} else {
      		$("input[name*=16]:eq(1)").prop("checked", true);
      		$("input[name*=16]:eq(1)").attr("checked", true);
      	}
      });
      
      $("input[name*=16]").click(function() {
      	var chk = $(this).val();
      	if(chk == "Y") {
      		$("input[name*=07]:eq(0)").prop("checked", true);
      		$("input[name*=07]:eq(0)").attr("checked", true);
      	} else {
      		$("input[name*=07]:eq(1)").prop("checked", true);
      		$("input[name*=07]:eq(1)").attr("checked", true);
      	}
      });
	}
  
	
} 



var $nppfs_form ;


$(document).ready(function(){
	
  /* 인증 부분 on/off 영역 [start] */

  if($("#regNo1, regNo2").length != 0 ){
 
    /* 
     * 키보드 보안  관련 태크 추가. 
     */
    //주민번호 속성 수정 
    var $regNo2 = $("#regNo2");
    $regNo2.attr("data-enc","on" );
    
    $regNo2.attr("data-datatype","n" );
    $regNo2.attr("data-tk-kbdType","number" );
    
    //form 태그에 키보드 보안 관련 태그 추가 
    $nppfs_form = $("#regNo2").parents("form");
    var $form = $("#regNo2").parents("form");
    var $div1 = $("<div/>").attr( {class : "nppfs-elements", style :"display:none"});
    var $div2 = $("<div/>").attr( {class : "nppfs-keypad-div", style :"display:none"});
    $form.append($div1);
    $form.append($div2);

    /* 
     * 관련 라이브러리가 있을 경우 관련 라이브러리를 추가 하지 않는다. 
     */
    if(comm_ui_util.findJs("nppfs-1.9.0").length  < 1){

      /* 
       * 관련 라이브러리 추가. 
       */
  
       $.getScript("/pluginfree/js/nppfs-1.9.0.js", function(){
           $.getScript("/pluginfree/jsp/nppfs.script-1.9.0.jsp", function(){
               npPfsStartup($form[0], true, true, true, true, "data-enc", "on");
              // $("#regNo2").next().addClass("nospos");
           });     
       });

    }   
  }

	/* 
	 * 화면에 [공인인증서]가 있을 시에   [nppfs-1.9.0.js] 을 추가.
	 */
	if($(".nic").length > 0 ){
         if(comm_ui_util.findJs("nppfs-1.9.0").length < 1 ){
              $.getScript("/pluginfree/js/nppfs-1.9.0.js", function(){
                 $.getScript("/pluginfree/jsp/nppfs.script-1.9.0.jsp", function(){
                 });     
             });
         }
	}

    /* 인증 부분 on/off 영역 [end] */

    /*
     * 전화상담 퀵메뉴 
     */
    if($(".telConsl").length > 0 ){
    	 if(comm_ui_util.findJs("jquery-fakeform-0.5.js").length < 1 ){
    		 $.getScript("/js/lib/jquery-fakeform-0.5.js", function(){
             });
    	 }
    	
    	$(".telConsl").on('click', function(){
    		layerPopOpen('failjoin');
    	});
    	$.get("/bin/CO/CO/COCO0136G.jsp", function(data){
            var new_div = $("<div/>").append($(data));
            var $dim = new_div.find('.dim_bg');
            var $layerpopup = new_div.find('.layerPopWrap');
            
            $("body").append($dim);
            $("body").append($layerpopup);
            
            $("#btnCallme").on('click',function(){
            	comm_ui_util.openCallmeLayerQuick();
        	});
            
            $("#hp").off('keydown');
            $("#hp").on('keydown',function(e){
            	
    			if(!gf_checkTypes(this, 'NUCM', event)){
    				return false;
    			}
    		});

        });
    	$(document).off("change.tel");
    	$(document).on("change.tel","input[name='insurance']",function(){
            var val = $(this).val();
            $(".insurance").hide();
            $(".insurance."+val).show();
        });
    
    }
    
    $(document).on('click', '#evntCmpltOkBtn', function(){
    	comm_ui_util.commlayerClosePopup();
    });
	
    
    /*
     * 인기검색어 이벤트 처리 
     */
     
    //인기 검색어 필드 및 자동차 검색 input box 가 존재 할 경우만 실행 
    if($('.autoCompleteList').length > 0 && $('.autoComplete input').length > 0 ){
      /************************************************************************************************ 
       * 유사 검색어 이벤트를 걸어준다.
       ************************************************************************************************/
      $(document).on('click', '.autoCompleteList a', function(){
          $(".autoComplete input").val($(this).text());
          $(".autoCompleteList").hide();
      });
       
      $(document).on('keyup', '.autoComplete input', function(e){
      	if(comm_ui_util.isNull($(this).val())){
      		autoWord($('.autoComplete input').val());
      		return false;
      	}
        var obj = {};
        obj.rsmbAutoWord = $(this).val();
        HiJS.svr.doRequestAjax("DHCO0350M11S", {  //ajax  호출
          data : obj,
          loadingbar : false,
          callback : {
            success : function(responseObj) {
                	
              var arr_obj =  responseObj.data.list_DHCO0080VO;

            	$(".autoCompleteList li").hide();
                if(arr_obj.length > 0){
                    

                    for (var i = 0; i < arr_obj.length; i++) {
                    	autoWord(arr_obj[i].autoNm);
                    }
                }else{
                	autoWord($('.autoComplete input').val());
                }

            }
            ,
            failure:function(result) {      
                 
            }
          }
        });
      });
        
      /************************************************************************************************ 
       * 인기 검색어 조회 
       ************************************************************************************************/
      HiJS.svr.doRequestAjax("DHCO0350M10S", {  //ajax  호출
          data : {},
          loadingbar : false,
          callback : {
              success : function(responseObj) {
                  var arr_obj =  responseObj.data.list_DHCO0080VO; 
                  var $div_keyWordList = $(".keyWordList");

                  $div_keyWordList.html("");
                  for (var i = 0; i < arr_obj.length; i++) {
                      var $new_a = $("<a/>").attr({href:'#none'}).html(arr_obj[i].coMainAutoSrchNm);
                      $div_keyWordList.append($new_a);
                  }
                  
              }
              ,
              failure:function(result) {      
                  
              }
          }
      });

      $(document).on('click', '.keyWordList a', function(){
          /*
           * 반환 값 확인에 필요한 메서드  
           */
          if(typeof cb_favoriteWord == 'function'){
              cb_favoriteWord($(this).html(), $(this));
          }
      });
    }
});


var comm_ui_util =  new CommonUtil();
