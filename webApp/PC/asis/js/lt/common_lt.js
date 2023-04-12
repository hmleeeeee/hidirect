$(document).ready(function(){
	
	// 숫자만 입력
    $('.vNumber').keydown(function(event) {
		gf_checkTypes(this, 'NUMB', event);
	});
	
	/**
	* @alias 계약자 정보 입력 연락방식 선택
	* @param hp	: 전화번호('-' 제외)
	* @return 
	*/
	$(document).on("change","#telCat",function(e){
	    e.preventDefault();
	    
	    var telCat = $(this).val();
	    var val="hpTypeCon";
	    if(telCat!='3'){
	    	val = "telTypeCon";
	    }
	    $(".selectTelType").hide();
	    $(".selectTelType."+val).show();
	});
	
	$(document).on("change","#selTel",function(e){
	    e.preventDefault();
	    $("#tel1").val( $(this).val() );
	});
	
	/**
	* @alias 로고 클릭 메인화면 이동	 
	*/
	$(document).on("click",".objFixedWrap .logo",function(e){
		
		location.href = "/service.do?m=3293e8e708";
		
	});
	
});

/**
 * 브라우저 저장값 input에 들어갈시 스타일 조정
 */
function fn_lt_setInputBaseStyle() {
	//브라우저 저장값이 SET되어 있는 경우가 있어 값이 있을 경우 css적용 
		setTimeout(function(){
			$.each($(".inputBase"), function(){
				if ( !comm_ui_util.isNull($(this).find("input").val()) ) {
					$(this).addClass("value");
				}
			});
		}, 500);
}

/**
 * 스크롤이 있는 화면에서 뜨는 레이어팝업 top값 조정
 */
function fn_lt_LayerTopFix(layerId) {
	$("#"+layerId).css("top", Math.max(0, (($(window).height() - $("#"+layerId).outerHeight()) / 2) + $(window).scrollTop()) + "px");
	
	var $btns = $("#"+layerId).find("a");
	
	if( $btns.length > 0 ) {
		$.each($btns, function(){
			if ($(this).attr("href") == "#") {
				$(this).attr("href", "javascript:;");
			}
		});
	}
}

/**
 * @alias 휴대폰 번호 3단계 처리
 * @param hp	: 핸드폰 번호('-' 제외)
 * @return 
 */
function fn_lt_HpChange(hp){
	
	if(hp.length > 9){
		if(hp.length == 10){
			$("#telNo1").val(hp.substring(0,3));
			$("#telNo2").val(hp.substring(3,6));
			$("#telNo3").val(hp.substring(6,10));
		}else if(hp.length == 11){
			$("#telNo1").val(hp.substring(0,3));
			$("#telNo2").val(hp.substring(3,7));
			$("#telNo3").val(hp.substring(7,11));
		}
	}
}

/**
* @alias 전화번호 처리
* @param tel: 전화번호('-' 제외)
* @return 
*/
function fn_lt_TelChange(tel){
	
	if(tel.length > 6){
		if(tel.length == 7){
			$("#telNo2").val(tel.substring(0,3));
			$("#telNo3").val(tel.substring(3,7));			
		}else if(tel.length == 8){
			$("#telNo2").val(hp.substring(0,4));
			$("#telNo3").val(hp.substring(4,8));			
		}
	}
}

/**
 * @alias 주민번호로 포맷팅된 생년월일 구하기
 * 주민번호 tip : 뒷자리중 첫째자리가 
 *                1, 2 : 1900년대 출생자
 *                3, 4 : 2000년대 출생자
 *                9, 0 : 1800년대 출생자
 *                5, 6 : 외국인 1900년대 출생자
 *                7, 8 : 외국인 2000년대 출생자 
 * @param regNo : 주민번호 13자리
 * @param dateFormat : 데이트포맷(yyMMdd, yyyy-MM-dd, yy/MM/dd, yyyy년MM월dd일 .....)
 * @return 문자열
 * @author 김인걸
 */
function fn_lt_getBirthDate(regNo, dateFormat) {  
	var year = regNo.substring(0, 1) == "0" ? parseInt(regNo.substring(1, 2)) : parseInt(regNo.substring(0, 2));
	var month = regNo.substring(2, 3) == "0" ? parseInt(regNo.substring(3, 4)) : parseInt(regNo.substring(2, 4));
	var day = regNo.substring(4, 5) == "0" ? parseInt(regNo.substring(5, 6)) : parseInt(regNo.substring(4, 6));
	
	var num = parseInt(regNo.substring(6, 7));
	if( num == 1 || num == 2 || num == 5 || num == 6 ) {
		year = 1900 + year;
	}
	else if( num == 3 || num == 4 || num == 7 || num == 8 ) {
		year = 2000 + year;
	}
	else if( num == 9 || num == 0 ) {
		year = 1800 + year;
	}
	
	/* 인증 부분 on/off 영역 [end] */
	
	return $.format.date(new Date(year, month-1, day, 0, 0, 0), dateFormat);
}

/**
 * @alias 주민번호 체크(내외국인)
 * @param socialno1	: 첫번째 주민등록번호 6자리
 * @param socialno2	: 두번째 주민등록번호 7자리
 * @return 
 */
function fn_lt_validCheckRRNO(socialno1, socialno2, ctrtrCat) {
	//내국인 주민번호 확인
	if(socialno2.substring(0, 1) < 5) {
		var i, sum = 0;
		var str = socialno1 + socialno2;
		var polhldr_insrd_txt = "";
		if(ctrtrCat == "Y"){
			polhldr_insrd_txt = "피보험자";
		}
		if(ctrtrCat == "N"){
			polhldr_insrd_txt = "계약자";
		}

		if(socialno1.length != 6){			
			alertPopup(polhldr_insrd_txt +"주민등록번호 생년월일이 잘못 입력되었습니다.", "ok", function(){$("#regNo1").focus();});			
			return false;
		}
		if(socialno2.length != 7){			
			alertPopup(polhldr_insrd_txt +"주민등록번호 뒷자리가 잘못 입력되었습니다.", "ok", function(){$("#regNo2").focus();});			
			return false;
		}
		if (str.length != 13){
			alertPopup(polhldr_insrd_txt +"주민등록번호 생년월일이 잘못 입력되었습니다.", "ok", function(){$("#regNo1").focus();});
			return false;
		}

		//2020.10.07 주민번호 체계 변경 반영
		//2020.09.30 이전 출생자 - 기존 주민등록번호 유효성 체크 기준 유지 / 2020.09.30 이후 출생자 - 주민등록번호 유효성 체크로직 미적용
		var getBirth = fn_lt_getBirthDate(socialno1 + socialno2, "yyyyMMdd");
		if(getBirth >= 20200930){
			//console.log("getBirth", getBirth);
			return true;
		}else{
			for (i=0,sum=0; i<12; i++){
				sum += (((i%8) + 2) * (str.charAt(i) - "0"));
			}
			sum = 11 - (sum % 11);
			sum = sum % 10;
			if (sum == str.charAt(12)){
				return true;
			}
			alertPopup("주민등록번호 생년월일이 잘못 입력되었습니다.", "ok", function(){$("#regNo1").focus();});
			return false;
		}
	//외국인 주민번호 확인
	} else {		
		alertPopup("죄송합니다, 외국인은 홈페이지 가입이 불가능합니다. 자세한 내용은 고객센터(1899-6782)로 문의하여 주시기 바랍니다.", "ok", function(){$("#regNo1").focus();});
		return false;

	}
}

/**
 * @alias 주민번호 체크(내외국인)
 * @param regNo1Id	: 첫번째 주민등록번호 id
 * @param regNo2Id	: 두번째 주민등록번호 id
 * @param formName  : Form명
 * @return 
 */
function fn_lt_validCheckRRNO2(regNo1Id, regNo2Id, formName) {
	var socialno1 = $("#"+regNo1Id).val();
	var socialno2 = HiJS.svr.getNOSDecValue(formName, regNo2Id); //복호화 처리
	
	//내국인 주민번호 확인
	if(socialno2.substring(0, 1) < 5) {
		var i, sum = 0;
		var str = socialno1 + socialno2;
		if(socialno1.length != 6){			
			alertPopup("주민등록번호 생년월일이 잘못 입력되었습니다.", "ok", function(){$("#"+regNo1Id).focus();});			
			return false;
		}
		if(socialno2.length != 7){			
			alertPopup("주민등록번호 뒷자리가 잘못 입력되었습니다.", "ok", function(){$("#"+regNo2Id).focus();});			
			return false;
		}
		if (str.length != 13){
			alertPopup("주민등록번호 생년월일이 잘못 입력되었습니다.", "ok", function(){$("#"+regNo1Id).focus();});
			return false;
		}
		
		//2020.10.07 주민번호 체계 변경 반영
		//2020.09.30 이전 출생자 - 기존 주민등록번호 유효성 체크 기준 유지 / 2020.09.30 이후 출생자 - 주민등록번호 유효성 체크로직 미적용
		var getBirth = fn_lt_getBirthDate(socialno1 + socialno2, "yyyyMMdd");
		if(getBirth >= 20200930){
			//console.log("getBirth", getBirth);
			return true;
		}else{
			for (i=0,sum=0; i<12; i++){
				sum += (((i%8) + 2) * (str.charAt(i) - "0"));
			}
			sum = 11 - (sum % 11);
			sum = sum % 10;
			if (sum == str.charAt(12)){
				return true;
			}
			alertPopup("주민등록번호 생년월일이 잘못 입력되었습니다.", "ok", function(){$("#"+regNo1Id).focus();});
			return false;
		}
	//외국인 주민번호 확인
	} else {		
		alertPopup("죄송합니다, 외국인은 홈페이지 가입이 불가능합니다. 자세한 내용은 고객센터(1899-6782)로 문의하여 주시기 바랍니다.", "ok", function(){$("#"+regNo1Id).focus();});
		return false;

	}
}

/**
 * @alias 입력 내용을 정해진 바이트 수 만큼 제한
 * @param txt : 입력 문자열 내용
 * @param maxLength : 제한길이
 * @return str
 */
function fn_lt_getByteLengthCntOfTxt(txt, maxLength){
	
	var returnValue="";
	if(txt != "") {
		if(txt.len() > maxLength) {
			returnValue = txt.cut(maxLength);			
			//alertPopup("입력가능한 글자수를 초과하였습니다.", "ok", null);
		} else {
			returnValue = txt;
		}
	}
	return returnValue;
}

/**
 * @alias 입력값의 바이트 길이를 구하는 함수.
 * @param str : 금액
 * @return boolean
 */
function fn_lt_getByteLengthValue(str) {
    var byteLength= 0;

    for(var inx=0; inx < str.length; inx++) {
        var oneChar = escape(str.charAt(inx));
        if( oneChar.length == 1 )
            byteLength ++;
        else if(oneChar.indexOf("%u") != -1)
            byteLength += 2;
        else if(oneChar.indexOf("%") != -1)
            byteLength += oneChar.length/3;
    }
    return byteLength;
}

/**
 * @alias 글자의 byte수를 체크하여 원하는 길이만큼 리턴하는 함수(onkeyup 이벤트 사용)
 * @param obj : 체크대상 object
 * @param num : 입력가능 byte수
 */
function fn_lt_checkLength(obj, num) {	
	
	var str = obj.value;
	
	if(num < fn_lt_getByteLengthValue(str)){
		if(!comm_ui_util.isNull(obj.value)){
			/*obj.disabled = true;		
			alertPopup("입력가능한 글자수를 초과하였습니다.","ok",function(){				
				obj.value = obj.value.cut(num);
			});	
			obj.disabled = false;*/
			obj.value = obj.value.cut(num);
		}
		
	}
}

/**
 * @alias 레이어 오픈
 * @param rayerId : 레이어 id
 * @return 
 */
function fn_lt_openLayer(layerId){
	
	$("#"+layerId).fadeIn(); //레이어 보이기
	$("#"+layerId+"_dim_bg").fadeIn(); //배경 어둡게 처리
}

/**
 * @alias 키패드 추가
 * @param  
 * @return 
 */
function fn_lt_loadKeyPad(){	
	/* 
	 * 키보드 보안  관련 태크 추가. 
	 */
	//주민번호 속성 수정 
 	var $regNo2_$cardNo3 = $("#regNo2, #cardNo4");
	$regNo2_$cardNo3.attr("data-enc","on" );
	$regNo2_$cardNo3.attr("data-datatype","n" );
	$regNo2_$cardNo3.attr("data-tk-kbdType","number" );

	//form 태그에 키보드 보안 관련 태그 추가 
	var $form = $("#regNo2, #cardNo3").parents("form");
	var $div1 = $("<div/>").attr( {class : "nppfs-elements", style :"display:none"});
	var $div2 = $("<div/>").attr( {class : "nppfs-keypad-div", style :"display:none"});

	$form.append($div1);
	$form.append($div2);


	$.getScript("/pluginfree/js/nppfs-1.9.0.js", function(){
        $.getScript("/pluginfree/jsp/nppfs.script-1.9.0.jsp", function(){
            npPfsStartup(document.form1, true, true, true, true, "data-enc", "on");
        });     
    }); 
}

/**
 * @alias 금액 한글표시
 * @param sAmt : 금액
 * @return 
 */
function fn_lt_getHanGulAmt(sAmt) {
	if( !isNumber(sAmt) ) return sAmt;
	sAmt += "";
	var sId = sAmt.substr(0, 1);
	var nLn = sAmt.length;
	var sTxt = "";
	switch(nLn) {
		case 4 : sTxt = sId + "천원"; break;
		case 5 : sTxt = sId + "만원"; break;
		case 6 : sTxt = sId + "십만원"; break;
		case 7 : sTxt = sId + "백만원"; break;
		case 8 : sTxt = sId + "천만원"; break;
		case 9 : sTxt = sId + "억원"; break;
	}
	return sTxt;
}

/**
 * @alias 자바 메소드 replaceAll
 * @param str : 검색단어
 * @param searchStr : 변환될 단어
 * @param replaceStr : 변환된 단어
 */
function fn_lt_replaceAll(str, searchStr, replaceStr) {
	while( str.indexOf(searchStr) != -1 ){
		str = str.replace(searchStr, replaceStr);
	}
	return str;
};


/**
 * @alias alertPopup 위치 현재 위치한 곳 가운데로 고정 (팝업용)
 * @param isCm : 공통팝업여부, msg : alert메세지, param : 후처리 변수
 */
function fn_lt_fixAlertPos(isConfirm, isCm, msg, param) {
	
	/*
	 * 팝업에서 alert이 뜨면 팝업이 dim보다 z-index가 높으므로 alert이 떠도 팝업의 요소를 클릭 할 수 있음.
	 * 클릭하지 못하게 하기 위해 팝업의 z-index 값을 dim보다 낮게 설정 하여 팝업이 dim으로 가려질 수 있도록 처리
	 * alert을 닫으면 팝업의 원래 z-index 값으로 복원
	 */
	var isPop = $(".dim_bg").is(":visible") ? true : false;
	var zIndex = "";    // 팝업의 원래 z-index값 : 팝업에서의 alert처리시에만 쓰는 값
	if (isPop) {
		zIndex = $(".layerPopWrap ").css("zIndex");
		$(".layerPopWrap ").css("zIndex", "5");
	}
	
	/* 공통 alert이 아닌 개별적으로 띄우는 alert일 경우 */
	if (!isCm) {
		alertPopup(msg, isConfirm ? "" : "ok", null);
	}
		
	// 확인 버튼 눌렀을때
	var doIt = function(confirm) {
		
		var $target = null;
		
		/** param타입 따라 분기 **/
		// case 1 : function - 확인 클릭 후 callback 함수 호출
		if(typeof param == "function") {
			param(confirm);
		}
		// case 2 : object - 해당 오브젝트에 포커스
		else if (typeof param == "object") {
			$(param).focus();
		}
		// case 3 : id, class, name 이름 문자열 - 해당 요소를 찾아 포커스 
		else if (typeof param == "string") {
			if ( $("#"+param).length > 0 ) { $target = $("#"+param); }
			else if ( $("."+param).length > 0 ) { $target = $("."+param).eq(0); }
			else if ( $("input[name='"+param+"'").length > 0 ) { $target = $("input[name='"+param+"'"); }
			$target.focus();
		}
		
		// selectbox 테두리 focus
		if( $target != null && typeof $target != "undefined") {
			var $selTitle = $target.siblings(".select-title");
			if( $selTitle.length > 0 ) {
				$selTitle.addClass("focus");
			}
		}
		
	};
	
	//=============== alert 레이어의 top위치 조정과 이벤트 바인딩 ===============
	
	var $als = $(".alertSet:visible");
	var $ala = $als.find(".alertArea");
	
	if ( $als.length > 0 ) {
		// alert의 top을 현재 위치의 가운데로 보이도록 조정

		
		$ala.css("top", Math.max(0, (($(window).height() - $ala.outerHeight()) / 2)+ $(window).scrollTop()) + "px");
		$ala.find("a").attr("href", "javascript:;");
		
		// 확인, 닫기 클릭 이벤트 unbind후 다시 정의
		$(".alertArea .btnClose, .alertArea .btn.cancel, .alertArea .btn.ok").unbind("click");
			
		// 확인 버튼
		$ala.find(".btn.ok").on("click", function(){
			$ala.fadeOut(400, function(){
				$als.remove();
				if(isPop){
					$(".layerPopWrap ").css("zIndex", zIndex);
				}
				doIt(true);
			});
		});
		// 취소, X 버튼
		$ala.find(".btnClose, .btn.cancel").on("click", function(){
			$ala.fadeOut(400, function(){
				$als.remove();
				if(isPop){
					$(".layerPopWrap ").css("zIndex", zIndex);
				}
				doIt(false);
			});
		});
	}
}

/**
 * @alias INPUT TYPE 입력값 제한
 * @param obj : input object
 *        kor : 한글허용여부  (필수)
 *        eng : 영문허용여부  (필수)
 *        num : 숫자허용여부  (필수)
 *        evt : 이벤트 객체   (필수)
 *        permiChar : 허용할문자 (옵션)
 * @return N/A
 * onkeyup="keyRegLimit(this, true, true, false)"
 * onkeyup="keyRegLimit(this, true, false, false, ['.', '%'])"
 */
function keyRegLimit(obj, kor, eng, num, permiChar) {
	
	var exp = "";
	/*"[0-9ㄱ-ㅎ가-힣]|[\[\]{}()\<\>?|`~!@#$%^&*-_+=,.;:\"'\\]"*/
	if (kor) {   // 한글
		exp = "ㄱ-ㅎㅏ-ㅣ가-힣";
	}
	if (eng) {   // 영문
		exp = exp + "a-zA-Z";
	}
	if (num) {   // 숫자
		exp = exp + "0-9";
	}
	exp = "[^" + exp + "]";
	
	var v = $(obj).val();
	
	//console.log(v);
	var regExp = new RegExp(exp, "g");
	
	if(regExp.test(v)) {
		/* 허용 문자 */
		var lastChar = v.substr(v.length-1, 1);
		var addChar = "";
		if (typeof permiChar != "undefined" && permiChar != null) {
			if (permiChar.indexOf(lastChar) != -1) {
				addChar = lastChar;
			}
		}
		$(obj).val(v.replace(lastChar,'') + addChar);
	}
}

/**
 * @alias INPUT TYPE 입력값 제한
 * @param obj : input object
 *        kor : 한글허용여부  (필수)
 *        eng : 영문허용여부  (필수)
 *        num : 숫자허용여부  (필수)
 *        evt : 이벤트 객체   (필수)
 *        permiKeyCode : 허용할키코드 (옵션)
 * @return N/A
 * onkeydown="keyLimit(this, true, true, false, event)"
 * onkeydown="keyLimit(this, true, false, false, [65,34])"
 */
function keyCodeLimit(obj, kor, eng, num, evt, permiKeyCode) {
	try
    {
    	var key;
    	var val = obj.value;
    	var mob = navigator.appName;
    	
    	if( mob == "Microsoft Internet Explorer" ){
    		key = evt.keyCode;
    	}
    	else{
    		key = evt.which;
    	}
    	/* 
    	    공통적으로 허용하는 키 
    	    8 backspace, 9 tab, 32 space, 16 shift, 37~40 방향키
    	    35 end, 36 home, 45 insert, 46 delete
    	*/
    	var comAllowKey = [ 8, 9, 32, 16, 37, 38, 39, 40, 35, 36, 45, 46 ];
    	if ( comAllowKey.indexOf(key) != -1 ) {
    		return true
    	}
    	// 예외허용 키 
    	if (typeof permiKeyCode != "undefined") {
    		if ( permiKeyCode.indexOf(key) != -1 ) {
    			window.event.returnValue = true;
    			return true;
        	}
    	}
		if (kor && key == 229) {   // 한글
			window.event.returnValue = true;
		}
		else if (eng && (65 <= key && key <=90)) {   // 영문
			window.event.returnValue = true;
		}
		else if (num && ((48 <= key && key <= 57) || (96 <= key && key <= 105)) ) {   // 숫자
			window.event.returnValue = true;
		}
		else {
        	if (window.event) {
    			window.event.returnValue = false;
    			return false;
    		}
            else {
            	evt.preventDefault();
    		}
		}
    }
    catch(e) {
    	// TODO
	}
    
}

/**
 * 개인정보동의 유효성체크
 */
function fn_lt_agreeVldChk(){
	
	//필수
	var $nas = $(".agreeBox.checkAllSetItem").eq(0).find("ul").eq(0).find("li");
		
	for(var i = 0; na = $nas[i]; i++) {	
		//동의 미선택 항목 체크		
		if ($(na).find("div").eq(1).hasClass("agreeRadio") && !$(na).find("input.yes").is(":checked")  ) {

			alertPopup($(na).find("span").html().trim()+ "에\n동의해 주시기 바랍니다.","ok",function(){
				$(na).find("input").focus();
			});
			
			return false;	
		}		
	}
	
	var $nas2 = $(".agreeBox.checkAllSetItem").eq(0).find("ul").eq(1).find("li");
	
	for(var i = 0; na = $nas2[i]; i++) {	
		//동의 미선택 항목 체크		
		if ($(na).find("div").eq(1).hasClass("agreeRadio") && !$(na).find("input.yes").is(":checked")  ) {
			alertPopup($(na).find("span").html().trim()+ "에\n동의해 주시기 바랍니다.","ok",function(){
				$(na).find("input").focus();
			});
			return false;	
		}		
	}
	
	//선택
	var $sAgree = $(".agreeBox.checkAllSetItem").eq(1).find("ul").eq(0).find("li");		
	
	for (var i = 0; sAg = $sAgree[i]; i++) {		
		// 동의/미동의 미선택 항목 체크 		
		if ($(sAg).find("div").eq(1).hasClass("agreeRadio") && !$(sAg).find("input:radio").is(":checked")) {			
			alertPopup($(sAg).find("span").html().trim()+ "을\n체크해 주시기 바랍니다.","ok",function(){
				$(sAg).find("input").eq(0).focus();
			});
			return false;
		}
	}
	
	return true;
}

/**
 * 개인정보동의 유효성체크
 */
function fn_check_agree(){
	
	for(var cnt = 0 ; cnt < $(".agreeBox.checkAllSetItem").eq(0).children("ul").length ; cnt++){
		//필수
		var $nas = $(".agreeBox.checkAllSetItem").eq(0).children("ul").eq(cnt).find("li");
		for(var i = 0; na = $nas[i]; i++) {
			
			//동의 미선택 항목 체크(계/피 둘다 있는 경우)
			if($(na).find("ul").eq(0).hasClass("agreeRadio")){
				if(!$(na).find("input.yes").eq(0).is(":checked") || !$(na).find("input.yes").eq(1).is(":checked")){
					alertPopup($(na).find("span").html().trim()+ "에\n동의해 주시기 바랍니다.","ok",function(){
						$(na).find("input").focus();
					});
					return false;
				}
			}
			//동의 미선택 항목 체크(계약자만 있는 경우)
			else if ($(na).find("div").eq(1).hasClass("agreeRadio")  && !$(na).find("input.yes").is(":checked")  ) {

				alertPopup($(na).find("span").html().trim()+ "에\n동의해 주시기 바랍니다.","ok",function(){
					$(na).find("input").focus();
				});
				
				return false;	
			}		
		}
	}
	
	//선택
	var $sAgree = $(".agreeBox.checkAllSetItem").eq(1).find("ul").eq(0).find("li");		
	
	for (var i = 0; sAg = $sAgree[i]; i++) {		
		// 동의/미동의 미선택 항목 체크 		
		if ($(sAg).find("div").eq(1).hasClass("agreeRadio") && !$(sAg).find("input:radio").is(":checked")) {			
			alertPopup($(sAg).find("span").html().trim()+ "을\n체크해 주시기 바랍니다.","ok",function(){
				$(sAg).find("input").eq(0).focus();
			});
			return false;
		}
	}
	
	return true;
}

/**
 * e-mail 값 체크
 * @param value	: 입력값
 * @param type	: addr-이메일주소, domain: 이메일 도메인
 * @returns {Boolean}
 */
function fn_lt_EmalChk(value, type) {
	var regex1 = /[^._0-9a-zA-Z]/;
	var regex2 = /(([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2})/;  		
	var tmp = "";
	if (type == "addr") {
		tmp = value.match(regex1);
		if (tmp == null) {
			return true;
		}
		else {
			return false;
		}
	}
	else if (type == "domain") {
		tmp = value.match(regex2);
		if (tmp != null) {
			return true;
		}
		else {
			return false;
		}
	}
}

/**
 * e-mail 값 체크
 * @param val	: 입력값(이메일주소)
 * @returns {Boolean}
 */
function fn_lt_emailChk(val){
	var chkEmailRegex = /([0-9a-zA-Z_-]+)@(([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2})/;
	if(!val.match(chkEmailRegex)){
		return false;
	}else{
		return true;
	}
}
/**
 * Validator - 영문명
 * @param val - 문자열
 * @return 체크결과(true|false)
 */
function fn_lt_EngNmChk(val){
	var pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	return __validatePositive(val, pattern);
}

/**
 * 최근설계내역 팝업 호출
 * @param type
 * @param insProdCd
 * @param isProdNm
 * @param ptyId
 * @param clk2CallId
 */
function fn_lt_showRecentPopup(type, insProdCd, isProdNm, ptyId, clk2CallId, ctrtrCat, insrdNm, insrdBirth) {
	
	var dataYn = "N";
	var chkCtrtrCatData = 0;
	var lyrHTML = "";
	var reqVO = {
			insProdCd 	: insProdCd,
			ptyId 	  	: ptyId,
			clk2CallId	: clk2CallId,
			rowCnt    	: 5
	};
	
	$.blockUI();
	HiJS.svr.doRequestAjax("DHCO3000M01S", {
		data : reqVO,
		loadingbar : false,
		//async:true,
		callback : {
			success : function(responseObj) {
				$.unblockUI();
				
				$.each(responseObj.data.dhco3003voList, function(i, list) {
					
					if (list.clk2CallId != null) {
						dataYn = "Y";	
						/*
						 * 10061007	: 장기운전자보험
						 * 10061009	: 유배당연금보험
						 * 10061013 : 실손의료비보장보험
						 * 10061015	: 암보험
						 * 10061029 : 건강보험
						 * 10061032 : 주택화재상해보험
						 * 10061035	: 어린이보험
						 */
						
						// 추가정보입력 여부
						var addInfoYn = "N";
						if (insProdCd == "10061007" || insProdCd == "10061009" || insProdCd == "10061013" || insProdCd == "10061015" 
							|| insProdCd == "10061029" || insProdCd == "10061032" || insProdCd == "10061035") {
							addInfoYn = "Y";
						}
						
						// 가입전알릴사항(계약체결전확인사항) 여부
						var ifoDutyYn = "Y";
//						var ifoDutyYn = "N";
//						if (insProdCd != "10061014") {
//							ifoDutyYn = "Y";
//						}
						
						// 연금여부
						var penYn = "N";
						if (insProdCd == "10061009") {
							penYn = "Y";
						}
						
						// 피보험자/계약자 불일치여부
						var ntsYn = "N";
						if (insProdCd == "10061013" || insProdCd == " 10061035") {
							ntsYn = "Y";
						}
						
						// 납입주기
						var paydMthdYn = "N";
						if (insProdCd == "10061007" || insProdCd == "10061009" || insProdCd == "10061013" || insProdCd == "10061015" || insProdCd == "10061035") {
							paydMthdYn = "Y";
						}
						
						// 운전용도여부
						var drvgUsageYn = "N";
						if (insProdCd == "10061007") {
							drvgUsageYn = "Y";
						}
						
						// 단계 및 타이틀 세팅
						var lvlCat = "";
						var lvlNm = "";
						if (list.lvlCat == "20") {
							lvlCat = "1";							
							// 추가정보입력여부
							if (addInfoYn == "Y") {
								lvlCat = "2";
								lvlNm = "보험료확인 ";
							}
							else {
								lvlNm = "보험료확인 ";
							}
						}
						else if (list.lvlCat == "30") {
							lvlCat = "2";
							// 추가정보입력여부
							if (addInfoYn == "Y") {
								lvlCat = "3";
							}
							lvlNm = "계약자정보 입력 ";
						}
						else if (list.lvlCat == "40") {
							lvlCat = "3";
							// 추가정보입력여부
							if (addInfoYn == "Y") {
								lvlCat = "4";
							}
							lvlNm = "알릴의무확인 ";
						}
						else if (list.lvlCat == "50") {
							lvlCat = "4";
							// 추가정보입력여부, 가입전 알릴사항여부
							if (addInfoYn == "Y" && ifoDutyYn == "Y") {
								lvlCat = "5";
							}
							
							// 가입전알릴사항(계약체결전확인사항) 여부
							lvlNm = "청약내용확인 ";
							
						}
						else if (list.lvlCat == "60") {
							lvlCat = "4";
							// 추가정보입력여부
							if (addInfoYn == "Y" && ifoDutyYn == "Y") {
								lvlCat = "5";
							}
							lvlNm = "보험료결제 동의 ";
						}
						
						// 가입기간
						insTerm = setFormatDate(list.insStDt, "-") + " ~ " + setFormatDate(list.insEdDt, "-");

						
						// 청약번호
						var scNo = "";
						if(list.scNo != null) {
							scNo = list.scNo;
						}else{
							scNo = "&nbsp;";
						}
						
						if (insProdCd == "10061007" || insProdCd == "10061009" || insProdCd == "10061013" || insProdCd == "10061015" || insProdCd == "10061035") {
							paydMthdYn = "Y";
						}
						
						/*
						 * 10061007	: 장기운전자보험
						 * 10061009	: 유배당연금보험
						 * 10061013 : 실손의료비보장보험
						 * 10061015	: 암보험
						 * 10061029 : 건강보험
						 * 10061032 : 주택화재상해보험
						 * 10061035	: 어린이보험
						 */
						
						// 플랜 구분
						var plnCatTitle = "";
						if(insProdCd == "10061007"){			// 운전자
							if(list.plnCat == "001P" ) {
								plnCatTitle = "스마트";
							}else if(list.plnCat == "002P"){
								plnCatTitle = "기본형(영업용)";
							}else if(list.plnCat == "001Q") {
								plnCatTitle = "스탠다드";
							}else if(list.plnCat == "001R") {
								plnCatTitle = "프리미엄";
							}
						}else if(insProdCd == "10061032"){		// 주택
							if(list.plnCat == "0000") {
								plnCatTitle = "스탠다드";
							}else if(list.plnCat == "001H") {
								plnCatTitle = "프리미엄";
							}
						}else if(insProdCd == "10061035"){		// 어린이
							if(list.plnCat == "0000") {
								plnCatTitle = "스탠다드";
							}else if(list.plnCat == "00AM") {
								plnCatTitle = "프리미엄";
							}
						}else if(insProdCd == "10061009"){		// 유배당연금
							if(list.plnCat == "0000") {
								plnCatTitle = "스탠다드";
							}
						}else if(insProdCd == "10061029"){		// 건강
							if(list.plnCat == "00S5" || list.plnCat == "00S2" ) {
								plnCatTitle = "스탠다드";
							}else if(list.plnCat == "00S6" || list.plnCat == "00S3") {
								plnCatTitle = "프리미엄";
							}
						}else if(insProdCd == "10061015"){		// 암
							if(list.plnCat == "00X1") {
								plnCatTitle = "스마트";
							}else if(list.plnCat == "00X2") {
								plnCatTitle = "스탠다드";
							}else if(list.plnCat == "00X3") {
								plnCatTitle = "프리미엄";
							}
						}else if(insProdCd == "10061013"){		// 실손
							if(list.plnCat == "00W1") {
								plnCatTitle = "스마트";
							}
						}
						
						// 운전용도코드
						var drvgUsageTitl = "";
						if (drvgUsageYn == "Y") {
							if (list.drvgUsageCat == "1") {
								drvgUsageTitl = "자가용";
							}
							else if (list.drvgUsageCat == "2") {
								drvgUsageTitl = "영업용";
							}
						}
						
						var prem = 0;
						if (list.prem != null) {
							prem = getCurrencyValue(list.prem); 
						}
						
					
						// 납입방법
						var paydMthdTitl = "";
						if(list.paydMthdCd == "01") {
							// 월납
							paydMthdTitl = " / 월";
						}else if(list.paydMthdCd == "12"){
							// 연납
							paydMthdTitl = " / 연";
						}
						
						
						/*최근계산내역 팝업 그리기, 어린이보험,실손은 계피상이 데이터 목록만 보여줌 */
						//어린이보험,실손 계피상이인 경우
						if(ctrtrCat == "Y" && (insProdCd == "10061035" || insProdCd == "10061013")){
							if(list.prodTypCat == "Y" && insrdNm == list.insrdNm && insrdBirth == list.insrdDlrNo.substring(2,8)){
								//계피상이 케이스
								lyrHTML += fn_lt_PopUpGui(list, plnCatTitle, insTerm, scNo, prem, paydMthdTitl, lvlNm, insProdCd, isProdNm);
								chkCtrtrCatData++; //실손, 어린이 데이터체크용
							}
						}
						//어린이보험,실손 계피동일인경우
						else if(ctrtrCat == "N" && (insProdCd == "10061035" || insProdCd == "10061013")){
							if(list.prodTypCat == "N"){
								//계피동일 케이스
								lyrHTML +=  fn_lt_PopUpGui(list, plnCatTitle, insTerm, scNo, prem, paydMthdTitl, lvlNm, insProdCd, isProdNm);
								chkCtrtrCatData++; //실손, 어린이 데이터체크용
							}
						}
						//어린이, 실손제외 상품
						else{
							//타상품 케이스
							lyrHTML +=  fn_lt_PopUpGui(list, plnCatTitle, insTerm, scNo, prem, paydMthdTitl, lvlNm, insProdCd, isProdNm);
						}												
					}
					
					/*어린이, 실손보험은 계피상이, 동일 각각의 데이터로 분기처리해서 보여줌.*/
					if((insProdCd == "10061035" || insProdCd == "10061013") && chkCtrtrCatData == 0){
						dataYn = "N";
					}
					
					if(dataYn == "N"){
						var $pop = comm_ui_util.commlayerPopup("recentCalcNoDataPop");
						$("#recentCalcNoDataPop").find(".btnClose").attr("data-focus","#recent");
						$("#recentCalcNoDataPop").find(".btn.line").attr("data-focus","#recent");
				 	    popupFocus();
						$pop.css("top", "150px");
						$pop.find('.prodNm').text(isProdNm);
						$pop.find(".btnAreaWrap a").eq(0).on("click", function(){ comm_ui_util.commlayerClosePopup();});
					}else{
						var $pop = comm_ui_util.commlayerPopup("recentCalcPop");
						$("#recentCalcPop").find(".btnClose").attr("data-focus","#recent");
						$("#recentCalcPop").find(".btn.line").attr("data-focus","#recent");
						popupFocus();
						$pop.css("top", "150px");
						$pop.find('.prodNm').text(isProdNm);
						$pop.find('.lastCalculationList.noarr').html(lyrHTML);
						$pop.find(".btnAreaWrap a").eq(0).on("click", function(){ comm_ui_util.commlayerClosePopup();});
					}
	
				});
				

				if (type == "Y" && dataYn == "N") {
					var $pop = comm_ui_util.commlayerPopup("recentCalcNoDataPop");
					$("#recentCalcNoDataPop").find(".btnClose").attr("data-focus","#recent");
					$("#recentCalcNoDataPop").find(".btn.line").attr("data-focus","#recent");
			 	    popupFocus();
					$pop.css("top", "150px");
					$pop.find('.prodNm').text(isProdNm);
					$pop.find(".btnAreaWrap a").eq(0).on("click", function(){ comm_ui_util.commlayerClosePopup();});
				}
			}
		}
	});		
}


/*최근계산 내역 팝업*/
function fn_lt_PopUpGui(list, plnCatTitle, insTerm, scNo, prem, paydMthdTitl, lvlNm, insProdCd, isProdNm){
	var lyrHTML = '';
	//<-- 리스트 -->
	lyrHTML += '			<div class="item">';
	lyrHTML += '				<div class="titleArea">';
	lyrHTML += '					<div class="title">';
	lyrHTML += '						<p class="step">플랜종류</p>';
	lyrHTML += '						<p class="stepTit"><span class="fontPoint1">'+ plnCatTitle +'</span></p>';
	lyrHTML += '					</div>';
	lyrHTML += '        			<div class="time">' + list.regDt + ' (' + list.regDm + ')' + '</div>';
	lyrHTML += '				</div>';
	lyrHTML += '				<div class="box">';
	lyrHTML += '					<div class="vmiddle">';
	lyrHTML += '						<dl>';
	lyrHTML += '							<dt>보험기간</dt>';
	lyrHTML += '							<dd>'+ insTerm + '</dd>';
	lyrHTML += '						</dl>';
	lyrHTML += '						<dl>';
	lyrHTML += '							<dt>청약번호</dt>';
	lyrHTML += '							<dd>'+ scNo +'</dd>';
	lyrHTML += '						</dl>';
	/*어린이,실손 계피상이 피보험자 정보 노출*/
	if(insProdCd == "10061035" || insProdCd == "10061013"){
		if(list.prodTypCat == "Y"){
			lyrHTML += '						<dl>';
			lyrHTML += '							<dt>피보험자</dt>';
			lyrHTML += '							<dd>'+ maskingName(list.insrdNm)+" ("+list.insrdDlrNo+")"+'</dd>';
			lyrHTML += '						</dl>';
		}
	}
	lyrHTML += '					</div>';
	lyrHTML += '					<div class="vmiddle">';
	lyrHTML += '						<dl>';
	lyrHTML += '							<dt>보험료</dt>';
	lyrHTML += '							<dd><span class="fontPoint5">'+ prem +'</span> 원' + paydMthdTitl + '</dd>';
	lyrHTML += '						</dl>';
	lyrHTML += '						<dl>';
	lyrHTML += '							<dt>최종단계</dt>';
	lyrHTML += '							<dd>'+ lvlNm +'</dd>';
	lyrHTML += '						</dl>';
	lyrHTML += '					</div>';	
	lyrHTML += '					<a href="javascript:fn_lt_SetGoPage(\'' + insProdCd + '\', \'' + list.clk2CallId + '\', \'' + list.plnSeqno + '\', \'' + list.lvlCat + '\');" class="btn big r50" style="width: 110px;"><span>다음단계 진행</span></a>';
	lyrHTML += '    			</div>';
	lyrHTML += '			</div>';
	
	return lyrHTML;

}

/**
 * 최근설계내역 페이지 이동
 * @param insProdCd	: 보험상폼코드
 * @param clk2CallId: 임시저장 설계 ID
 * @param plnSeqno	: 임시저장 설계 일련번호
 * @param lvlCat	: 이동할 Step
 */
function fn_lt_SetGoPage(insProdCd, clk2CallId, plnSeqno, lvlCat) {
	
	var trinId = "";
	var pageId = "";
	
	lvlCat = "20";
	
	if (insProdCd == "10061007") {
		// 운전자보험
		trinId = "DHLT0100M20S";
		pageId = "LT/DR/LTDR0110G.jsp";
	}
	else if (insProdCd == "10061009") {
		// 유배당 연금보험
		// 이동 단계
		trinId = "DHPN0002M01L";
		pageId = "LT/PN/LTPN0002G.jsp";
	}
	else if (insProdCd == "10061013") {
		// 실손의료비보장보험
		// 이동 단계
		trinId = "DHMD0100M20S";
		//20220307_실손결합가입(실손+건강, 실손+암)
		if($("#formHis #cbnProdAppYn").val() == "Y"){
			//20220516_실손결합가입(실손+어린이)
			if($("#formHis #ctrtrCat").val() == "Y"){
				pageId = "LT/MD/LTMD0150G.jsp";		//실손결합(실손+어린이)
			}else{
				pageId = "LT/MD/LTMD0140G.jsp";		//실손결합(실손+건강)
			}
		}else{
			pageId = "LT/MD/LTMD0110G.jsp";
		}
	}
	else if (insProdCd == "10061015") {
		// 암보험
		// 이동 단계
		trinId = "DHCN0100M20S";
		pageId = "LT/CN/LTCN0110G.jsp";
	}
	else if (insProdCd == "10061032") {
		// 주택화재상해보험
		// 이동 단계
		trinId = "DHFM0100M20S";
		pageId = "LT/FM/LTFM0110G.jsp";
	}
	else if (insProdCd == "10061029") {
		// 건강보험
		// 이동 단계
		trinId = "DHHT0100M20S";
		pageId = "LT/HT/LTHT0110G.jsp";
	}
	else if (insProdCd == "10061035") {
		// 어린이보험
		// 이동 단계
		trinId = "DHCR0100M20S";
		pageId = "LT/CR/LTCR0110G.jsp";
	}
	
	if (trinId != "" && pageId != "") {
		$('#clk2CallId').val(clk2CallId);
		$('#plnSeqno').val(plnSeqno);
		$('#executeTimeHis').val($('#executeTime').val());
		HiJS.svr.doRequestForm(trinId, "formHis", pageId);
	}
	else {
		alertPopup("이동할 페이지가 없습니다.", "ok", null);
	}
}


/**
 * 중복 초과담보 자동삭제 이력 저장
 * @param insProdCd
 * @param excGb
 * @param executeTime
 */
function fn_lt_insertStsExcCvrTot(insProdCd, excGb, executeTime) {
	
	var reqVO = {
			insProdCd 	: insProdCd,
			excGb       : excGb,
			executeTime : executeTime
	};
	
	$.blockUI();
	HiJS.svr.doRequestAjax("DHCO3000M03S", {
		data : reqVO,
		loadingbar : false,
		//async:true,
		callback : {
			success : function(responseObj) {
//				var data = responseObj.data;
				$.unblockUI();
				
			}
			,failure : function(resData){
				$.unblockUI();
				
			}
		}
	});		
}


/*2021년 장기 제도개정 상품 판매개시 여부*/
function getChgDtYn(pdCd){
	
	var prodCd = ""; //상품코드
	var prodSlYn =""; //상품 판매개시 여부
	var d = new Date();
	var YY = d.getFullYear();
	var MM = d.getMonth()+1;
	var DD = d.getDate();
	var HR = d.getHours();
	var MU = d.getMinutes();
	if(MM < 10) {
		MM = "0" + MM;
	}
	if(DD < 10) {
		DD = "0" + DD;
	}
	if(HR < 10){
		HR = "0" + HR;
	}
	if(MU < 10){
		MU = "0" + MU;
	}
	var yymmdd = YY + "" + MM + "" +DD;
	var chkDate = yymmdd +"" + HR +"" + MU + "";
	//if(chkDate >= 202101010900){
	if(yymmdd >= 20230101){
		prodSlYn = "Y";
	}else{
		prodSlYn = "N";
	}
	console.log("prodSlYn : " + prodSlYn);
	prodCd = getProdCd(pdCd, prodSlYn);
	console.log("prodCd : " + prodCd);
	return prodCd;
}


/**
 * @alias  as-is, to-be 판매 상품 보종코드 정보 조회
 * @param pdCd	: DR(운전자), FM(주택화재), MD(실손), CN(암), HT(건강), PN(연금), CR(어린이) 
 * @param prodSlYn: 현재판매상품 Y 과거판매상품 N
 * @param prodCd: return 보종코드
 */
function getProdCd(pdCd,prodSlYn){
	console.log("pdCd:"+pdCd);
	var prodCd="";
	//운전자보험
	if(pdCd == "DR" && prodSlYn == "Y"){
		prodCd = "210L"; //이후
	}else if(pdCd == "DR" && prodSlYn == "N"){
		prodCd = "210K"; //이전
	}
	//주택화재보험
	else if(pdCd == "FM" && prodSlYn == "Y"){
		prodCd = "178E";
	}else if(pdCd == "FM" && prodSlYn == "N"){
		prodCd = "178E";
	}
	//실손보험
	else if(pdCd == "MD" && prodSlYn == "Y"){
		prodCd = "1499";
	}else if(pdCd == "MD" && prodSlYn == "N"){
		prodCd = "1499";
	}
	//암보험
	else if(pdCd == "CN" && prodSlYn == "Y"){
		prodCd = "171J";
	}else if(pdCd == "CN" && prodSlYn == "N"){
		prodCd = "171J";
	}
	//건강 보험
	else if(pdCd == "HT" && prodSlYn == "Y"){
		prodCd = "295E";
	}else if(pdCd == "HT" && prodSlYn == "N"){
		prodCd = "295E";
	}
	//연금 보험
	else if(pdCd == "PN" && prodSlYn == "Y"){
		prodCd = "106L";
	}else if(pdCd == "PN" && prodSlYn == "N"){
		prodCd = "106K";
	}
	//어린이 보험
	else if(pdCd == "CR" && prodSlYn == "Y"){
		prodCd = "205D";
	}else if(pdCd == "CR" && prodSlYn == "N"){
		prodCd = "205D";
	}
	//전환형 실손 보험
	else if(pdCd == "SM" && prodSlYn == "Y"){
		prodCd = "242C";
	}else if(pdCd == "SM" && prodSlYn == "N"){
		prodCd = "242B";
	} else if(pdCd=="WF"){ //사업장화재
		prodCd = "177B";
	}
	else{}
	
	return prodCd;
	
}

/**
 * SMS 문자발송
 * @param type
 * @param insProdCd
 */
function fn_lt_sms(insProdCd, executeTime) {
	var dataYn = "N";
	var reqVO = {
			insProdCd 	: insProdCd, 
			executeTime : executeTime
	};
	
	$.blockUI();
	HiJS.svr.doRequestAjax("DHCO0130M02S", {
		data : reqVO,
		loadingbar : false,
		//async:true,
		callback : {
			success : function(responseObj) {
				var data = responseObj.data;
				$.unblockUI();
				alertPopup("[SMS] 정상적으로 발송 되었습니다.", "ok", function(){
					$(".btn.small.mail").focus();
				});
			}
			,failure : function(resData){
				$.unblockUI();
				alertPopup("[SMS] 발송 오류 입니다.", "ok", function(){
					$(".btn.small.mail").focus();
				});
			}
		}
	});		
}

/* 제휴 서비스사 엠포스 호출 
 * 조항선	IT서비스본부 IT서비스개발실 개발1팀 	프로
	T: 02 - 2287 - 1948 ｜ M: 010 - 4949 - 4711
	eMail: hangseon@emforce.co.kr
 * */
function fnCallEmforce(reqData){
	
	var cnc_no = reqData.ltCncNo; //고객 고유번호 or 고유번호 없으면 제휴처코드로 대신함
	var media_no = reqData.ltMediaNo; //제휴처 매체코드 
	var strCompanyId = reqData.ltCompanyId; //제휴처코드
	var amount = reqData.amount; //보험료
	var mktgUtlAgrmExistYn = reqData.mktgUtlAgrmExistYn; //마케팅동의여부
	var executeTime = reqData.executeTime; //세션키값
	var pdNm = reqData.pdNm;
	var tranId = reqData.tranId; //DHCO0104M13S, DHCO0104M14S, DHCO0104M15S
	
//	console.log(viewJSON(reqData));
		
	var url = "https://landing.gooddirect.net/cpa/receive.cb?"; /*reward url*/
	var prcssYn = "00"; //장기는 항상 정상값으로 던짐 (가망고객, 제휴 중복 체크 안함. 가입하면 무조건 리워드)
	var acode="sale"; //보험가입	
	var dataTxt = "cnc_no=" + cnc_no +"&companyId=" +strCompanyId + "&media_no=" + media_no + "&return_value="+prcssYn;
	dataTxt += "&sid="+cnc_no+"&acode="+acode+"&amount="+amount;
	callbackUrl = url + dataTxt;
	console.log("dataTxt : " + dataTxt); 

		$.ajax({
			type: 'get',
		 	url: url,
		 	data:{companyId:strCompanyId,media_no:media_no,return_value:prcssYn,sid:cnc_no,acode:acode,amount:amount},
			loadingbar : false,
			dataType:"jsonp",
			timeout: 1500,
		 	success:function(data){
//		 		console.log("[fnCallEmforce] success : " + pdNm);
//		 		console.log("succ 응답전문 : " + viewJSON(data));
		 		callServiceLog(data, 'success :'+data.statusText+"&resultCd="+data.status + " / "+ dataTxt , pdNm, mktgUtlAgrmExistYn, tranId, executeTime);
		 	},
		 	error:function(data){
//		 		console.log("[fnCallEmforce] error");
//		 		console.log("fail 전문 : " + viewJSON(data));
		 		callServiceLog(data, 'fail :'+data.statusText+"&resultCd="+data.status + " / "+ dataTxt , pdNm, mktgUtlAgrmExistYn, tranId, executeTime);
			}
		});

}


//[제휴견적] 엠포스 응답페이지 호출 로그
function callServiceLog(data, logMsg, pdNm, mktgUtlAgrmExistYn, tranId, executeTime) {
//	console.log("[callServiceLog] call. ");
//	console.log("mktgUtlAgrmExistYn : " + mktgUtlAgrmExistYn);
//	console.log("tranId : " + tranId);
	var mktgUtlAgrYn = mktgUtlAgrmExistYn == "Y" ? "01": "02";
	
	var oReqData = {
			joinMbrId		: data.cnc_no
		  ,	campaignId		:  data.companyId
		  , prcssYn			: 'Y'
	      , applyYn			: 'Y'
	      , mktAgreeYn		: mktgUtlAgrYn
	      , callbackUrl		: logMsg
	      , inPath1			: 'W'
	      , inPath2			: pdNm
	      , executeTime 	: executeTime
		};	
	
//	console.log("oReqData : " + viewJSON(oReqData));
	
	HiJS.svr.doRequestAjax(tranId, {
		xecure:false,
		data : oReqData,
		loadingbar : false,		
		callback : {
			success:function(responseObj) {
			},
			failure : function (responseObj){
			}
		}
	});
}


function viewJSON( input ){
	return JSON.stringify( input ,null, 4);
}

/**
 * @alias 날짜 변환 yyyymmdd
 * @param value : 변환날짜 포맷 yyyymmdd
 * @param option : date >  yyyy-mm-dd 
 * @param option : kr > yyyy년mm월dd일
 * @param option : co > yyyy.mm.dd
 */

function conVertdate(value, option){
	var retDate = "";
	var regex = "";

		if(option == "date"){
			try{	
				if(value.length >= 8) {
						regex = /([0-9]{4})(\-*)([0-9]{2})(\-*)([0-9]{2})/;
						var tmp = value.match(regex); 
						if (tmp != null) {
							retDate = tmp[1] + "-" + tmp[3] + "-" + tmp[5];
						}
					} else {
						regex = /([0-9]{4})(\-*)([0-9]{2})/;
						var tmp = value.match(regex); 
						if (tmp != null) {
							retDate = tmp[1] + "-" + tmp[3];
						}
					}
			}catch(e){
				return retDate = "";
			}
		}
		if(option == "kr"){
			try{
				if(value.length >= 8) {
					regex = /([0-9]{4})(\-*)([0-9]{2})(\-*)([0-9]{2})/;
					var tmp = value.match(regex); 
					if (tmp != null) {
						retDate = tmp[1] + "년" + tmp[3] + "월" + tmp[5] + "일";
					}
				} else {
					regex = /([0-9]{4})(\-*)([0-9]{2})/;
					var tmp = value.match(regex); 
					if (tmp != null) {
						retDate = tmp[1] + "년" + tmp[3] + "월";
					}
				}
			}catch(e){
				return retDate = "";
			}
		}
		if(option == "co"){
			try{
				if(value.length >= 8) {
					regex = /([0-9]{4})(\-*)([0-9]{2})(\-*)([0-9]{2})/;
					var tmp = value.match(regex); 
					if (tmp != null) {
						retDate = tmp[1] + "." + tmp[3] + "." + tmp[5];
					}
				} else {
					regex = /([0-9]{4})(\-*)([0-9]{2})/;
					var tmp = value.match(regex); 
					if (tmp != null) {
						retDate = tmp[1] + "." + tmp[3];
					}
				}
			}catch(e){
				return retDate = "";
			}
		}
		
		return retDate;
	}