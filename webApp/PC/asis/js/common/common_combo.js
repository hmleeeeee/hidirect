/**
 * @alias : 공통 셀렉트박스 
 * @author : N15419
 */

/**
 * 셀렉트박스 코드 데이터
 * email:이메일도메인
 * hphn:핸드폰앞자리
 * tel:전화번호앞자리
 * tetypel:전화구분
 */
var _comboData = {
		email : [{label:'직접 입력', value:''}
			, {label:'naver.com', value:'naver.com'}
			, {label:'hanmail.net', value:'hanmail.net'}
			, {label:'daum.net', value:'daum.net'}
			, {label:'gmail.com', value:'gmail.com'}
			, {label:'nate.com', value:'nate.com'}
			, {label:'hotmail.com', value:'hotmail.com'}
			, {label:'lycos.com', value:'lycos.com'}
			, {label:'dreamwiz.com', value:'dreamwiz.com'}
			, {label:'korea.com', value:'korea.com'}			
			, {label:'chol.com', value:'chol.com'}
			, {label:'hi.co.kr', value:'hi.co.kr'}],
		 hphn:[{label:'010', value:'010'}
		 	, {label:'011', value:'011'}
		 	, {label:'016', value:'016'}
		 	, {label:'017', value:'017'}
		 	, {label:'018', value:'018'}
		 	, {label:'019', value:'019'}],
		 tel:[{label:'02', value:'02'}
		 	, {label:'031', value:'031'}
		 	, {label:'032', value:'032'}
		 	, {label:'033', value:'033'}
		 	, {label:'041', value:'041'}
		 	, {label:'042', value:'042'}
		 	, {label:'043', value:'043'}
		 	, {label:'051', value:'051'}
		 	, {label:'052', value:'052'}
		 	, {label:'053', value:'053'}
		 	, {label:'054', value:'054'}
		 	, {label:'055', value:'055'}
		 	, {label:'061', value:'061'}
		 	, {label:'062', value:'062'}
		 	, {label:'063', value:'063'}
		 	, {label:'064', value:'064'}
		 	, {label:'070', value:'070'}
		 	, {label:'0502', value:'0502'}
		 	, {label:'0503', value:'0503'}
		 	, {label:'0505', value:'0505'}
		 	, {label:'0506', value:'0506'}
		 	, {label:'0303', value:'0303'}],
		 	teltype : [{label:'휴대폰', value:'3'}
		 	, {label:'직장', value:'2'}		 
		 	, {label:'자택', value:'1'}]		 	
};

/**
 * @업무타입 A : 승용차요일제 OBD 관리화면
 * 				 에코마일리지 OBD 관리화면
 *				 자동차 신규(원스탑)/갱신 가입설계 시 에코마일리지 담보 선택 시
 *				 자동차 에코마일리지 중도가입 시
 *				 인터넷창구 > 납입/환급/해지 > 보험료납입_자동차갱신_3or4단계_환급계좌
 *			 B : 사고접수화면 : 보상조회/청구 > 보험금청구
 *				 휴면보험금
 *				 자동이체 신청/변경
 *				 태아확정(자녀등록) - 환급시
 *				 청약철회
 *				 배서, 취소 환급계좌 사용(2021.11.12 케이, 카카오, 토스 추가). B그룹은 환급계좌로 사용
 * 			 C : 즉시이체
 *				 태아확정(자녀등록) - 추징시
 * 			 D : 보험계약대출 상환
 * 			 E : 보험계약대출 신청
 * 			 F : 인터넷창구 > 납입/환급/해지 > 보험료납입_장기_2단계_납입계좌 입력
 *               (원래 C 타입이었는데 현업요청으로 [산업은행, 수협, 새마을금고, 신용협동조합, 상호저축은행] 제외)
 *               자동차보험 즉시이체
 * 			 G : 일반보험 즉시이체은행
 *           H : 자동차보험 가상계좌 
 *           I : 자동차보험 마일리지환급계좌 
 *           J : 자동차보험 분납계좌, 분납계좌+마일리지환급계좌 
 * 
 * # 변경사항
 * P20160224-0044 업무별 처리가능은행 목록만 보여주도록 수정 by 2016.02.26 김태원
 *  - H(자동차보험 가상계좌) 추가 
 *  - G : 제주은행 주석처리
 *  - I : F 복사하여 수협 추가(자동차보험 마일리지환급계좌용). 2017.04.20
 *  
 */
var _bankCdData = {
		A : [{label:'국민은행', 		value:'004'}
		   , {label:'신한은행', 		value:'088'}
		   , {label:'우리은행', 		value:'020'}
		   , {label:'농협은행', 		value:'011'}
		   , {label:'지역농협', 		value:'012'}
		   , {label:'기업은행', 		value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행', 		value:'027'}
		   , {label:'sc은행',	value:'023'}
		   , {label:'산업은행', 		value:'002'}
		   , {label:'경남은행', 		value:'039'}
		   , {label:'광주은행', 		value:'034'}
		   , {label:'대구은행', 		value:'031'}
		   , {label:'부산은행', 		value:'032'}
		   , {label:'전북은행', 		value:'037'}
		   , {label:'제주은행', 		value:'035'}
		   , {label:'우체국', 		value:'071'}
		   , {label:'수협', 			value:'007'}
		   , {label:'새마을금고', 		value:'045'}
		   , {label:'신용협동조합', 		value:'048'}
		   , {label:'상호저축은행', 		value:'050'}
		   , {label:'HSBC', 			value:'054'}
		   , {label:'도이치', 			value:'055'}],
		B : [{label:'국민은행',           	value:'004'}
		   , {label:'신한은행',           	value:'088'}
		   , {label:'우리은행',           	value:'020'}
		   , {label:'농협은행',           	value:'011'}
		   , {label:'지역농협',           	value:'012'}
		   , {label:'기업은행',           	value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',           	value:'027'}
		   , {label:'sc은행', 	value:'023'}
		   , {label:'산업은행',           	value:'002'}
		   , {label:'경남은행',           	value:'039'}
		   , {label:'광주은행',           	value:'034'}
		   , {label:'대구은행',           	value:'031'}
		   , {label:'부산은행',           	value:'032'}
		   , {label:'전북은행',           	value:'037'}
		   , {label:'제주은행',           	value:'035'}
		   , {label:'케이뱅크',			value:'089'}
		   , {label:'카카오뱅크',			value:'090'}   
		   , {label:'토스뱅크',			value:'092'}   
		   , {label:'우체국',            	value:'071'}
		   , {label:'수협',              	value:'007'}
		   , {label:'새마을금고',         	value:'045'}
		   , {label:'신용협동조합',       	value:'048'}
		   , {label:'상호저축은행',       	value:'050'}
		   , {label:'산림조합중앙회',     	value:'064'}
		   , {label:'HSBC',             value:'054'}
		   , {label:'도이치',             value:'055'}
		   , {label:'JP모건',            	value:'057'}
		   , {label:'교보증권',           	value:'261'}
		   , {label:'대신증권',           	value:'267'}
		   , {label:'대우증권',           	value:'238'}
		   , {label:'동부증권',           	value:'279'}
		   , {label:'동양증권',           	value:'209'}
		   , {label:'메리츠증권',         	value:'287'}
		   , {label:'미래에셋증권',       	value:'230'}
		   , {label:'부국증권',           	value:'290'}
		   , {label:'삼성증권',           	value:'240'}
		   , {label:'솔로몬투자증권',     	value:'268'}
		   , {label:'신영증권',           	value:'291'}
		   , {label:'신한금융투자',       	value:'278'}
		   , {label:'우리투자증권',       	value:'247'}
		   , {label:'유진투자증권',       	value:'280'}
		   , {label:'이트레이드증권',     	value:'265'}
		   , {label:'키움증권',           	value:'264'}
		   , {label:'하나대투증권',       	value:'270'}
		   , {label:'하이투자증권',       	value:'262'}
		   , {label:'한국투자증권',       	value:'243'}
		   , {label:'한화증권',           	value:'269'}
		   , {label:'현대증권',           	value:'218'}
		   , {label:'HMC투자증권',        	value:'263'}
		   , {label:'LIG투자증권',        	value:'292'}
		   , {label:'NH농협증권',         	value:'289'}
		   , {label:'SK증권',            	value:'266'}],
		C : [{label:'국민은행',				value:'004'}
		   , {label:'신한은행',            value:'088'}
		   , {label:'우리은행',            value:'020'}
		   , {label:'농협은행',            value:'011'}
		   , {label:'지역농협',            value:'012'}
		   , {label:'기업은행',            value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',            value:'027'}
		   , {label:'sc은행',  			  value:'023'}
		   , {label:'산업은행',            value:'002'}
		   , {label:'경남은행',            value:'039'}
		   , {label:'광주은행',            value:'034'}
		   , {label:'대구은행',            value:'031'}
		   , {label:'부산은행',            value:'032'}
		   , {label:'전북은행',            value:'037'}
		   , {label:'제주은행',            value:'035'}
		   , {label:'우체국',             value:'071'}
		   , {label:'수협',              	value:'007'}
		   , {label:'새마을금고',          	value:'045'}
		   , {label:'신용협동조합',        	value:'048'}
		   , {label:'상호저축은행',        	value:'050'}],
		D : [{label:'기업은행',            value:'003'}
		   , {label:'국민은행',			value:'004'}
		   , {label:'신한은행',			value:'088'}
		   , {label:'우리은행',			value:'020'}
		   , {label:'농협은행',			value:'011'}
		   , {label:'지역농협',			value:'012'}
		   , {label:'기업은행',			value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',			value:'027'}
		   , {label:'sc은행',		value:'023'}
		   , {label:'경남은행',			value:'039'}
		   , {label:'광주은행',			value:'034'}
		   , {label:'대구은행',			value:'031'}
		   , {label:'부산은행',			value:'032'}
		   , {label:'전북은행',			value:'037'}
		   , {label:'제주은행',			value:'035'}
		   , {label:'우체국',				value:'071'}],
		E : [{label:'국민은행',			value:'004'}
		   , {label:'신한은행',			value:'088'}
		   , {label:'우리은행',			value:'020'}
		   , {label:'농협은행',			value:'011'}
		   , {label:'지역농협',			value:'012'}
		   , {label:'기업은행',			value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',			value:'027'}
		   , {label:'sc은행',		value:'023'}
		   , {label:'산업은행',			value:'002'}
		   , {label:'경남은행',			value:'039'}
		   , {label:'광주은행',			value:'034'}
		   , {label:'대구은행',			value:'031'}
		   , {label:'부산은행',			value:'032'}
		   , {label:'전북은행',			value:'037'}
		   , {label:'제주은행',			value:'035'}
		   , {label:'우체국',				value:'071'}
		   , {label:'수협',				value:'007'}
		   , {label:'새마을금고',			value:'045'}
		   , {label:'신용협동조합',			value:'048'}
		   , {label:'상호저축은행',			value:'050'}
		   , {label:'동양종금',			value:'209'}
		   , {label:'현대증권',			value:'218'}
		   , {label:'미래에셋증권',			value:'230'}
		   , {label:'대우증권',			value:'238'}
		   , {label:'삼성증권',			value:'240'}
		   , {label:'한국투자증권',			value:'243'}
		   , {label:'우리투자증권',			value:'247'}
		   , {label:'하이투자증권',			value:'262'}
		   , {label:'HMC투자증권',			value:'263'}
		   , {label:'이트레이드증권',		value:'265'}
		   , {label:'SK증권',				value:'266'}
		   , {label:'하나대투증권',			value:'270'}
		   , {label:'굿모닝신한증권',		value:'278'}
		   , {label:'메리츠증권',			value:'287'}],
		F : [{label:'국민은행',			value:'004'}
		   , {label:'농협은행',			value:'011'}
		   , {label:'지역농협',			value:'012'}
		   , {label:'신한은행',			value:'088'}
		   , {label:'우리은행',			value:'020'}
		   , {label:'기업은행',			value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',			value:'027'}
		   , {label:'sc은행',		value:'023'}
		   , {label:'경남은행',			value:'039'}
		   , {label:'광주은행',			value:'034'}
		   , {label:'대구은행',			value:'031'}
		   , {label:'부산은행',			value:'032'}
		   , {label:'전북은행',			value:'037'}
		   , {label:'제주은행',			value:'035'}
		   , {label:'우체국',				value:'071'}
		   , {label:'새마을금고',		value:'045'}
		   , {label:'신용협동조합',			value:'048'}
		   , {label:'수협'      ,		value:'007'}
		   , {label:'케이뱅크',			value:'089'}
		   , {label:'카카오뱅크',			value:'090'} 
		   , {label:'토스뱅크',			value:'092'}],
		G : [{label:'기업은행',			value:'003'}
			, {label:'국민은행',			value:'004'}
			, {label:'농협은행',			value:'011'}
			, {label:'지역농협',			value:'012'}
			, {label:'우리은행',			value:'020'}
			, {label:'SC은행',			value:'023'}
			, {label:'씨티은행(한미)',	value:'027'}
//			, {label:'산업은행', 		value:'002'}
//			, {label:'경남은행',			value:'039'}
//		    , {label:'광주은행',			value:'034'}
//		    , {label:'대구은행',			value:'031'}
//		    , {label:'부산은행',			value:'032'}
		    , {label:'전북은행',			value:'037'}
		    , {label:'제주은행',			value:'035'}
			, {label:'우체국',			value:'071'}
			, {label:'KEB하나은행', 				value:'081'}
		    , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
			, {label:'신한은행',			value:'088'}
			, {label:'새마을금고',		value:'045'}
			, {label:'신용협동조합',		value:'048'}
			, {label:'수협'      ,		value:'007'}
			, {label:'케이뱅크',			value:'089'}
			, {label:'카카오뱅크',		value:'090'}
			, {label:'토스뱅크',			value:'092'}], 
	    H : [{label:'국민은행',			value:'004'} 
		   , {label:'신한은행',			value:'088'}
		   , {label:'우리은행',			value:'020'}
		   , {label:'농협은행',			value:'011'} 
		   , {label:'기업은행',			value:'003'} 
		   , {label:'KEB하나은행', 				value:'081'}
//		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',			value:'027'} 
		   , {label:'sc은행',			value:'023'}  
		   , {label:'경남은행',			value:'039'} 
		   , {label:'대구은행',			value:'031'} 
		   , {label:'부산은행',			value:'032'}],
		I : [{label:'국민은행',			value:'004'}
		   , {label:'농협은행',			value:'011'}
		   , {label:'지역농협',			value:'012'}
		   , {label:'신한은행',			value:'088'}
		   , {label:'우리은행',			value:'020'}
		   , {label:'기업은행',			value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',			value:'027'}
		   , {label:'sc은행',			value:'023'}
		   , {label:'산업은행',          value:'002'}
		   , {label:'경남은행',			value:'039'}
		   , {label:'광주은행',			value:'034'}
		   , {label:'대구은행',			value:'031'}
		   , {label:'부산은행',			value:'032'}
		   , {label:'전북은행',			value:'037'}
		   , {label:'제주은행',			value:'035'}
		   , {label:'우체국',			value:'071'}
		   , {label:'케이뱅크',			value:'089'}
		   , {label:'새마을금고',			value:'045'}
		   , {label:'신용협동조합',			value:'048'}
		   , {label:'수협'      ,		value:'007'}
		   , {label:'상호저축은행', 		value:'050'}
		   , {label:'HSBC(홍콩상하이)',	value:'054'}
		   , {label:'카카오뱅크',			value:'090'}],
		J : [{label:'국민은행',			value:'004'}
		   , {label:'농협은행',			value:'011'}
		   , {label:'지역농협',			value:'012'}
		   , {label:'신한은행',			value:'088'}
		   , {label:'우리은행',			value:'020'}
		   , {label:'기업은행',			value:'003'}
		   , {label:'KEB하나은행', 				value:'081'}
		   , {label:'KEB하나은행(구.외환은행)', 	value:'005'}
		   , {label:'씨티은행',			value:'027'}
		   , {label:'sc은행',			value:'023'}
		   , {label:'산업은행',          value:'002'}
		   , {label:'경남은행',			value:'039'}
		   , {label:'광주은행',			value:'034'}
		   , {label:'대구은행',			value:'031'}
		   , {label:'부산은행',			value:'032'}
		   , {label:'전북은행',			value:'037'}
		   , {label:'제주은행',			value:'035'}
		   , {label:'우체국',			value:'071'}
		   , {label:'케이뱅크',			value:'089'}
		   , {label:'새마을금고',			value:'045'}
		   , {label:'신용협동조합',		value:'048'}
		   , {label:'수협'      ,		value:'007'}
		   , {label:'상호저축은행', 		value:'050'}
		   , {label:'HSBC(홍콩상하이)',	value:'054'}
		   , {label:'카카오뱅크',			value:'090'}]
};

/**
 * 코드에 맞는 SELECT OPTION HTML 문자열 출력
 * @param type - email : 이메일도메인, hphn : 핸드폰앞자리,tel : 전화번호앞자리, teltype:전화구분
 * @param defaultVal - 기본값
 */
function writeOptionHtml(type, defaultVal) {
	document.write(getOptionHtml(type, defaultVal));
}

/**
 * 코드에 맞는 SELECT OPTION HTML 문자열 반환
 * @param type - email : 이메일도메인, hphn : 핸드폰앞자리,tel : 전화번호앞자리, teltype:전화구분
 * @param defaultVal - 기본값
 * @returns {String} Option Html
 */
function getOptionHtml(type, defaultVal) {
	var data = _getComboDataByType(type);
	if (!data) return '';
	
	var html  = '';
	$.each(data, function(idx, val) {
		html += '<option value="' + val.value + '"' + (val.value == defaultVal ? 'selected="selected"' : '' ) + '>' + val.label + '</option>';
	});
	
	return html;
}

/**
 * TYPE에 의해서 공통콤보 데이터를 반환
 * @param type - email : 이메일도메인, hphn : 핸드폰앞자리,tel : 전화번호앞자리, teltype:전화구분
 * @returns _comboData Json
 */
function _getComboDataByType(type) {
	switch (type) {
		case 'email' : return _comboData.email;
		case 'hphn' : return _comboData.hphn;
		case 'tel' : return _comboData.tel;		
		case 'teltype' : return _comboData.teltype;		
		default : return null;
	};
}

/**
 * 은행코드에 맞는 SELECT OPTION HTML 문자열 출력
 * @param type - A,B,C,D,E,F,I
 * @param defaultVal - 기본값
 */
function writeBankOptionHtml(type, defaultVal) {
	document.write(getBankOptionHtml(type, defaultVal));
}

/**
 * 은행코드에 맞는 SELECT OPTION HTML 문자열 반환
 * @param type - A,B,C,D,E,F,I
 * @param defaultVal - 기본값
 * @returns {String} Option Html
 */
function getBankOptionHtml(type, defaultVal) {
	var data = _getBankCdDataByType(type);
	
	if (!data) return '';
	
	var html  = '';
	$.each(data, function(idx, val) {
		html += '<option value="' + val.value + '"' + (val.value == defaultVal ? 'selected="selected"' : '' ) + '>' + val.label + '</option>';
	});
	
	return html;
}

/**
 * TYPE에 의해서 은행코드 데이터를 반환
 * @param type - A,B,C,D,E,F,G,H
 * @returns _bankCdData Json
 * H추가 // P20160224-0044 업무별 처리가능은행 목록만 보여주도록 수정 by 2016.02.26 김태원
 */
function _getBankCdDataByType(type) {
	switch (type) {
		case 'A' : return _bankCdData.A;
		case 'B' : return _bankCdData.B;
		case 'C' : return _bankCdData.C;		
		case 'D' : return _bankCdData.D;
		case 'E' : return _bankCdData.E;
		case 'F' : return _bankCdData.F;
		case 'G' : return _bankCdData.G;
		case 'H' : return _bankCdData.H;
		case 'I' : return _bankCdData.I;
		case 'J' : return _bankCdData.J;
		default : return null;
	};
}

/**
 * 은행코드에 맞는 은행명 문자열 반환
 * @param type - A,B,C,D,E,F
 * @param cd - 은행코드
 * @returns {String} 은행명
 */
function getBankName(type, cd) {
	
	if (typeof (type) != 'string' || typeof (cd) != 'string') {
		return '';
	}

	var result = '';
	try {
		$.each(_bankCdData[type], function(idx, val) {
			if (val.value == cd) {				
				result = val.label;
				return false;
			}
		});		
	} catch(e) {
		return '';
	}

	return result;
}
