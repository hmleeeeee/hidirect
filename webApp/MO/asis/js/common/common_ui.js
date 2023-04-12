/**
 * @alias : 
 * @author : 
 */

/**
 * @alias 
 */
$(document).on('click', ".gender span, .radioBox span", function () {
	$(this).parent().children("span").each((function (idx, value) {
		if (value == this) {
			$(value).removeClass("off");
			$(value).addClass("on");
			$(value).children("input").attr("checked", true);
		} else {
			$(value).removeClass("on");
			$(value).addClass("off");
			$(value).children("input").attr("checked", false);
		}
	}).bind(this));
});


/**
 * 최근설계내역 팝업 호출
 * @param type
 * @param insProdCd
 * @param isProdNm
 * @param ptyId
 * @param clk2CallId
 */
//function fn_lt_showRecentPopup(type, insProdCd, isProdNm, ptyId, clk2CallId) {
var formNm = ""; //form명(다이렉트 모바일 추가 변수)
function fn_lt_showRecentPopup(insProdCd, dhco0133List) {
	var addPlanHtml = "";
	for ( var i=0; i < dhco0133List.length; i++ ){
		if(i == 10){
			break;
		}
		//console.log("[fn_lt_showRecentPopup]===============================");
		//console.log(dhco0133List[i]);
		//console.log("-------------------------------");
		
		/*
		savStep - 저장 단계 코드
		10 : 본인인증 완료
		20 : 추가정보 완료
		30 : 보험료계산 완료
		40 : 피보험자/계약자 정보 입력 완료
		50 : 가입 전 알리 사항 완료
		60 : 청약내용확인 완료
		90 : 보험가입완료
		*/
		
		/*
		 * 10061002	: 골프보험
		 * 10061004	: 해외여행보험
		 * 10061005 : 국내여행보험
		 * 10061007	: 장기운전자보험
		 * 10061008	: 무배당연금보험
		 * 10061009	: 유배당연금보험
		 * 10061012	: 해외장기체류보험
		 * 10061013 : 실손의료비보장보험
		 * 10061014	: 주택화재상해보험
		 * 10061015	: 암보험
		 */
		
		// 추가정보입력 여부
		var addInfoYn = "N";
		if (insProdCd == "10061007" || insProdCd == "10061008" || insProdCd == "10061009" || insProdCd == "10061012"
			|| insProdCd == "10061013" || insProdCd == "10061014" || insProdCd == "10061015") {
			addInfoYn = "Y";
		}
		
		// 가입전알릴사항(계약체결전확인사항) 여부
		var ifoDutyYn = "N";
		if (insProdCd != "10061014") {
			ifoDutyYn = "Y";
		}
		
		// 연금여부
		var penYn = "N";
		if (insProdCd == "10061008" || insProdCd == "10061009") {
			penYn = "Y";
		}
		
		// 시간체크여부
		var hourChkYn = "N";
		if (insProdCd == "10061002" || insProdCd == "10061004" || insProdCd == "10061005" || insProdCd == "10061012") {
			hourChkYn = "Y";
		}
		
		// 가족형여부
		var fmlyYn = "N";
		if (insProdCd == "10061004" || insProdCd == "10061005" || insProdCd == "10061012" || insProdCd == "10061014") {
			fmlyYn = "Y";
		}
		
		// 피보험자/계약자 불일치여부
		var ntsYn = "N";
		if (insProdCd == "10061013") {
			ntsYn = "Y";
		}

		// 납입주기
		var paydMthdYn = "N";
		if (insProdCd == "10061007" || insProdCd == "10061008" || insProdCd == "10061009" || insProdCd == "10061013" || insProdCd == "10061015") {
			paydMthdYn = "Y";
		}
		
		// 납입주기2
		var paydMthdYn2 = "N";
		if (insProdCd == "10061014") {
			paydMthdYn2 = "Y";
		}
		
		// 운전용도여부
		var drvgUsageYn = "N";
		if (insProdCd == "10061007") {
			drvgUsageYn = "Y";
		}
		
		// 단계 및 타이틀 세팅
		var lvlCat = "";
		var lvlNm = "";
		if (dhco0133List[i].lvlCat == "20") {
			lvlCat = "1";							
			// 추가정보입력여부
			if (addInfoYn == "Y") {
				lvlCat = "2";
				lvlNm = "추가정보입력 ";
			}
			else {
				lvlNm = "고객정보입력 ";
			}
		}
		else if (dhco0133List[i].lvlCat == "30") {
			lvlCat = "2";
			// 추가정보입력여부
			if (addInfoYn == "Y") {
				lvlCat = "3";
			}
			lvlNm = "보험료확인 ";
		}
		else if (dhco0133List[i].lvlCat == "40") {
			lvlCat = "3";
			// 추가정보입력여부
			if (addInfoYn == "Y") {
				lvlCat = "4";
			}
			lvlNm = "피보험자/계약자 정보 입력 ";
		}
		else if (dhco0133List[i].lvlCat == "50") {
			lvlCat = "4";
			// 추가정보입력여부, 가입전 알릴사항여부
			if (addInfoYn == "Y" && ifoDutyYn == "Y") {
				lvlCat = "5";
			}
			
			// 가입전알릴사항(계약체결전확인사항) 여부
			if (ifoDutyYn == "N") {
				lvlNm = "피보험자/계약자 정보 입력 ";
			}
			else {
				lvlNm = "가입 전 알릴 사항 ";
			}
		}
		else if (dhco0133List[i].lvlCat == "60") {
			lvlCat = "4";
			// 추가정보입력여부
			if (addInfoYn == "Y" && ifoDutyYn == "Y") {
				lvlCat = "5";
			}
			lvlNm = "청약내용확인 ";
		}
		
		// 시간체크여부
		var insTerm = "";
		if (hourChkYn == "Y") {
			insTerm = setFormatDate(dhco0133List[i].insStDt, "-") + "  " + dhco0133List[i].insStTm + "시 ~ " + setFormatDate(dhco0133List[i].insEdDt, "-") + "  " + dhco0133List[i].insEdTm + "시";
		}
		else {
			insTerm = setFormatDate(dhco0133List[i].insStDt, "-") + " ~ " + setFormatDate(dhco0133List[i].insEdDt, "-");
		}
		
		// 개인형/가족형 여부
		var agmtTitl = "";
		if (fmlyYn == "Y") {
			if (dhco0133List[i].prodTypCat == "01") {
				agmtTitl = "개인형"
			}
			else if (dhco0133List[i].prodTypCat == "03") {
				agmtTitl = "가족형"
			}
		}
		
		// 불일치여부						
		if (ntsYn == "Y") {
			var ntsTitl = "";
			if (dhco0133List[i].prodTypCat == "Y") {
				ntsTitl = "19세미만 자녀가입";
			}
			else {
				ntsTitl = "19세이상 가입";
			}
			
			if (agmtTitl != "") {
				agmtTitl = agmtTitl + "/" + ntsTitl;
			}
			else {
				agmtTitl = ntsTitl;
			}
		}
		
		// 운전용도코드
		var drvgUsageTitl = "";
		if (drvgUsageYn == "Y") {
			if (dhco0133List[i].drvgUsageCat == "1") {
				drvgUsageTitl = "자가용"
			}
			else if (dhco0133List[i].drvgUsageCat == "2") {
				drvgUsageTitl = "영업용"
			}
		}
		
		var prem = 0;
		if (dhco0133List[i].prem != null) {
			prem = getCurrencyValue(dhco0133List[i].prem); 
		}
		
		var paydMthdTitl = "일시납 ";
		if (paydMthdYn == "Y") {
			if (dhco0133List[i].paydMthdCd == "01") {
				// 월납
				paydMthdTitl = "월납 ";
			}
			else if (dhco0133List[i].paydMthdCd == "02") {
				// 2개월납
				paydMthdTitl = "2개월납 ";
			}
			else if (dhco0133List[i].paydMthdCd == "03") {
				// 3개월납
				paydMthdTitl = "3개월납 ";
			}
			else if (dhco0133List[i].paydMthdCd == "06") {
				// 6개월납
				paydMthdTitl = "6개월납 ";
			}
			else if (dhco0133List[i].paydMthdCd == "12") {
				// 연납
				paydMthdTitl = "연납 ";
			}
		}
		
		if (paydMthdYn2 == "Y") {
			if (dhco0133List[i].paydMthdCd != "01") {
				// 월납
				paydMthdTitl = "월납 ";
			}
		}

		/**
		 * 다이렉트모바일 추가 변수
		 */
		/* 
		 * 10061002	: 골프보험
		 * 10061004	: 해외여행보험
		 * 10061005 : 국내여행보험
		 * 10061007	: 장기운전자보험
		 * 10061008	: 무배당연금보험
		 * 10061009	: 유배당연금보험
		 * 10061012	: 해외장기체류보험
		 * 10061013 : 실손의료비보장보험
		 * 10061014	: 주택화재상해보험
		 * 10061015	: 암보험
		 */
		var planNm= ""; // 보험명
		if (insProdCd == "10061002") {
			planNm = "골프보험";
			formNm = "frm";
		}else if (insProdCd == "10061004") {
			planNm = "해외여행보험";
			formNm = "frm";
		}else if (insProdCd == "10061005") {
			planNm = "국내여행보험";
			formNm = "frm";
		}else if (insProdCd == "10061007") {
			planNm = "장기운전자보험";
			formNm = "form1";
		}else if (insProdCd == "10061008") {
			planNm = "무배당연금보험";
			formNm = "form1";
		}else if (insProdCd == "10061009") {
			planNm = "유배당연금보험";
			formNm = "form1";
		}else if (insProdCd == "10061012") {
			planNm = "해외장기체류보험";
			formNm = "frm";
		}else if (insProdCd == "10061013") {
			planNm = "실손의료비보장보험";
			formNm = "form1";
		}else if (insProdCd == "10061014") {
			planNm = "주택화재상해보험";
			formNm = "frm";
		}else if (insProdCd == "10061015") {
			planNm = "암보험";
			formNm = "form1";
		}
		addPlanHtml += "<li>";
		//addPlanHtml += "<a href=\"javascript:void(0);\" onclick=\"javascript:fnSetPrevPlan('"+giia0220List[i].scNo+"','"+giia0220List[i].plnCd+"');\" role=\"button\">";
		addPlanHtml += "<a href=\"javascript:void(0);\" onclick=\"javascript:fn_lt_SetGoPage('" + insProdCd + "','" + dhco0133List[i].clk2CallId + "','" + dhco0133List[i].plnSeqno + "','" + dhco0133List[i].lvlCat + "');\" role=\"button\">";
		addPlanHtml += "<dl class=\"boxContList\">";
		addPlanHtml += "<dt>";
		addPlanHtml += "<strong>"+planNm+"</strong>";
		//addPlanHtml += "<span>"+giia0220List[i].scNo.substr(0,5)+"******</span>";
		addPlanHtml += "<em>"+dhco0133List[i].regDt + "(" + dhco0133List[i].regDm + ")"+"</em>";
		addPlanHtml += "</dt>";
		addPlanHtml += "<dd>";
		addPlanHtml += "<p><em class=\"tagBlue\">STEP " + lvlCat + "</em><span>" + lvlNm + "</span></p>";
		addPlanHtml += "<ul class=\"list\">";
		addPlanHtml += "<li class=\"cont\">";
		
		if(insProdCd != "10061007"){
			addPlanHtml += "<strong>계약유형</strong>";
			addPlanHtml += "<span>"+agmtTitl+"</span>";	
			addPlanHtml += "</li>";
		}
		
		addPlanHtml += "<li>";
		addPlanHtml += "<strong>보험기간</strong>";
		addPlanHtml += "<span>"+setFormatDate(dhco0133List[i].insStDt,".")+"~"+setFormatDate(dhco0133List[i].insEdDt,".")+"</span>";
		addPlanHtml += "</li>";
		addPlanHtml += "<li>";
		addPlanHtml += "<strong>보험료</strong>";
		addPlanHtml += "<span>"+prem+"</span>";
		addPlanHtml += "</li>";
		addPlanHtml += "</ul>";
		addPlanHtml += "</dd>";
		addPlanHtml += "</dl>";
		addPlanHtml += "</a>";
		addPlanHtml += "</li>";
	}
	
	return addPlanHtml;
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
	var menuId = "";
	
	if (insProdCd == "10061002") {
		// 골프보험
		// 이동 단계
		switch (lvlCat) {
			case "20":	// 보험료계산 화면 이동
				trinId = "DHGI3001M10S";
				pageId = "GI/PC/GIPC3110G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHGI3001M20S";
				pageId = "GI/PC/GIPC3210G.jsp";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHGI3001M22S";
				pageId = "GI/PC/GIPC3211G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHGI3001M30S";
				pageId = "GI/PC/GIPC3310G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHGI3001M32S";
				pageId = "GI/PC/GIPC3312G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061004") {
		// 해외여행보험
		// 이동 단계
		switch (lvlCat) {
			case "20":	// 보험료계산 화면 이동
				trinId = "DHGI2001M03S";
				pageId = "GI/PC/GIPC2120G.jsp";
				menuId = "67e478de35";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHGI2001M09S";
				pageId = "GI/PC/GIPC2200G.jsp";
				menuId = "59958a8e98";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHGI2001M14S";
				pageId = "GI/PC/GIPC2250G.jsp";
				menuId = "2757017260";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHGI2001M10S";
				pageId = "GI/PC/GIPC2300G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHGI2001M15S";
				pageId = "GI/PC/GIPC2301G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061005") {
		// 국내여행보험
		// 이동 단계
		switch (lvlCat) {
			case "20":	// 보험료계산 화면 이동
				trinId = "DHGI1001M03S";
				pageId = "GI/PC/GIPC1120G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHGI1001M09S";
				pageId = "GI/PC/GIPC1200G.jsp";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHGI1001M04S";
				pageId = "GI/PC/GIPC1220G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHGI1001M10S";
				pageId = "GI/PC/GIPC1300G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHGI1001M13S";
				pageId = "GI/PC/GIPC1301G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061007") {
		// 운전자보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHLT0100M10S";
				pageId = "LT/DR/LTDR0100G.jsp";
			//	menuId = "67e478de35";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHLT0100M20S";
				pageId = "LT/DR/LTDR0110G.jsp";
			//	menuId = "67e478de35";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHLT0200M02S";
				pageId = "LT/DR/LTDR0300G.jsp";
				menuId = "512rsr6753";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHLT0200M03S";
				pageId = "LT/DR/LTDR0320G.jsp";
				menuId = "3eg425w165";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHLT0300M01S";
				pageId = "LT/DR/LTDR0400G.jsp";
			//	menuId = "67e478de35";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHLT0300M05S";
				pageId = "LT/DR/LTDR0504G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061008") {
		// 무배당 연금보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHPN0005M01S";
				pageId = "LT/PN/LTPN0005G.jsp";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHPN0002M01L";
				pageId = "LT/PN/LTPN0002G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHPN0006M01S";
				pageId = "LT/PN/LTPN0006G.jsp";
				break;
			case "40":	// 계약체결 전 확인사항
				trinId = "DHPN0009M02S";
				pageId = "LT/PN/LTPN0010G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHPN0009M06S";
				pageId = "LT/PN/LTPN0012G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHPN0009M07S";
				pageId = "LT/PN/LTPN0013G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061009") {
		// 유배당 연금보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHPN0005M01S";
				pageId = "LT/PN/LTPN0005G.jsp";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHPN0002M01L";
				pageId = "LT/PN/LTPN0002G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHPN0006M01S";
				pageId = "LT/PN/LTPN0006G.jsp";
				break;
			case "40":	// 계약체결 전 확인사항
				trinId = "DHPN0009M02S";
				pageId = "LT/PN/LTPN0010G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHPN0009M06S";
				pageId = "LT/PN/LTPN0012G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHPN0009M07S";
				pageId = "LT/PN/LTPN0013G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061012") {
		// 해외장기체류보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHGI5001M05S";
				pageId = "GI/PC/GIPC5102G.jsp";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHGI5001M03S";
				pageId = "GI/PC/GIPC5120G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHGI5001M09S";
				pageId = "GI/PC/GIPC5200G.jsp";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHGI5001M06S";
				pageId = "GI/PC/GIPC5251G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHGI5001M10S";
				pageId = "GI/PC/GIPC5300G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHGI5001M07S";
				pageId = "GI/PC/GIPC5301G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061013") {
		// 실손의료비보장보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHMD0102M01S";
				pageId = "LT/MD/LTMD0102G.jsp";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHMD0100M20S";
				pageId = "LT/MD/LTMD0110G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHMD0200M02S";
				pageId = "LT/MD/LTMD0200G.jsp";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHMD0200M04S";
				pageId = "LT/MD/LTMD0300G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHMD0300M01S";
				pageId = "LT/MD/LTMD0400G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHMD0300M05S";
				pageId = "LT/MD/LTMD0450G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061014") {
		// 주택화재상해보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHGI6100M03S";
				pageId = "GI/PC/GIPC6200G.jsp";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHGI6100M04S";
				pageId = "GI/PC/GIPC6300G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHGI6100M06S";
				pageId = "GI/PC/GIPC6400G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHGI6100M08S";
				pageId = "GI/PC/GIPC6500G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHGI6100M09S";
				pageId = "GI/PC/GIPC6501G.jsp";
				break;
*/
		}
	}
	else if (insProdCd == "10061015") {
		// 암보험
		// 이동 단계
		switch (lvlCat) {
			case "10":	// 추가정보입력 화면 이동
				trinId = "DHCN0100M10S";
				pageId = "LT/CN/LTCN0100G.jsp";
				break;
			case "20":	// 보험료계산 화면 이동
				trinId = "DHCN0100M20S";
				pageId = "LT/CN/LTCN0110G.jsp";
				break;
			case "30":	// 피보험자/계약자 정보 입력 화면 이동
				trinId = "DHCN0100M30S";
				pageId = "LT/CN/LTCN0200G.jsp";
				break;
			case "40":	// 가입전 알릴 사항 화면 이동
				trinId = "DHCN0100M40S";
				pageId = "LT/CN/LTCN0300G.jsp";
				break;
			case "50":	// 청약내용확인 화면 이동
				trinId = "DHCN0100M50S";
				pageId = "LT/CN/LTCN0400G.jsp";
				break;
/*				
			case "60":	// 보험계약체결동의 화면 이동
				trinId = "DHCN0100M60S";
				pageId = "LT/CN/LTCN0450G.jsp";
				break;
*/
		}
	}
	
	if (trinId != "" && pageId != "") {
		$('#clk2CallId').val(clk2CallId);
		$('#plnSeqno').val(plnSeqno);
		$('#executeTimeHis').val($('#executeTime').val());
		//HiJS.svr.doRequestForm(trinId, "formHis", pageId);
		HiJS.svr.doRequestForm(menuId, formNm);//보험료계산
	}
	else {
		alertPopup("이동할 페이지가 없습니다.", "ok", null);
	}
}