/**
 * @alias : 공통 함수 정의

 * @author : LNJ SYSTEM 개발자 [ 이태권 ]
 */


/**
	 * 데이터의 변환 작업을 수행한다.
	 */
	var ValueFilter = {
		_items_ : {
			"regNo" : function(value) {
				var regex = /([0-9]{6})(\-*)([0-9])([0-9]{6})/;
				var tmp = value.match(regex); 
				if (tmp != null) { 
					return tmp[1] + "-" + "*******";
				}
				throw new Error("'" + value + "'는 주민번호 형식이 아닙니다.");	
			},
			"regno" : function(value) {
				var regex = /([0-9]{6})(\-*)([0-9])([0-9]{6})/;
				var tmp = value.match(regex); 
				if (tmp != null) { 
					return tmp[1] + "-" + tmp[3] + "******";
				}
				throw new Error("'" + value + "'는 주민번호 형식이 아닙니다.");	
			},
			
			"mpNo" : function(value) {
				var regex = /(01[0-9])(\-*)([0-9]{4}|[0-9]{3})(\-*)([0-9]{4})/;
				var tmp = value.match(regex); 
				if (tmp != null) { 
					return tmp[1] + "-" + tmp[3] + "-" + "****";
				} 
				throw new Error("'" + value + "'는 휴대폰 번호 형식이 아닙니다.  " + value);	
			},
			
			"telNo" : function(value) {
				var regex = /(070|02|031|032|033|041|042|043|051|052|053|054|055|061|062|063|064)(\-*)(\d{3,4})(\-*)(\d{4})/;
				var tmp = value.match(regex); 
				if (tmp != null) { 
					return tmp[1] + "-" + tmp[3] + "-" + "****";
				}
				throw new Error("'" + value + "'는 일반 전화번호 형식이 아닙니다.");	
			},
			
			"addr" : function(value) {
				var regex = /([^\s]+)\s+([^\s]+)\s+([^\s]+)\s+(.+)/;
				var tmp = value.match(regex); 
				if (tmp != null) { 
					return tmp[1] + " " + tmp[2] + " " + tmp[3] + " " + "****";
				} else {
					return value;
				}
				throw new Error("'" + value + "'는 주소 형식이 아닙니다.");	
			},
			
			"emal" : function(value) {
				var regex = /([0-9a-zA-Z_-]+)@(([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2})/;
				var tmp = value.match(regex); 
				if (tmp != null) {
					var str = tmp[1];
					if (str.length <= 3) {
						str = "***";
					} else {
						str = str.substring(0, 3) + "***";
					}
					return str + "@" + tmp[2];
				}
				throw new Error("'" + value + "'는 이메일 형식이 아닙니다.");	
			},
			
			"actNo" : function(value) {
				var regex = /([0-9,-]+)/;
				var tmp = value.match(regex); 
				if (tmp != null) {
					var str = tmp[1];
					if (str.length <= 4) {
						str = "*******";
					} else {
						str = str.substring(0, 4) + "*******";
					}
					return str;
				}
				throw new Error("'" + value + "'는 계좌 형식이 아닙니다.");	
			},
			// 카드에 따라, 아멕스 카드처럼 아래 정규식이 달라질 수 있음 확인 필요
			"crdNo" : function(value) {
				var regex = /([0-9]{4})(\-*)([0-9]{4})(\-*)([0-9]{4})(\-*)([0-9]{4})/;
				var tmp = value.match(regex); 
				if (tmp != null) {
					return tmp[1] + "-" + tmp[3] + "-" + tmp[5] + "-" + "****";
				} else {
					// 아멕스 카드
					regex = /([0-9]{4})(\-*)([0-9]{6})(\-*)([0-9]{5})/;
					tmp = value.match(regex); 
					if (tmp != null) {
						return tmp[1] + "-" + tmp[3] + "-" + "*****";
					} else {
						regex = /([0-9-]+)/;
						tmp = value.match(regex); 
						if (tmp != null) {
							var str = tmp[1];
							if (str.length <= 8) {
								str = "********";
							} else {
								str = str.substring(0, str.length - 8) + "********";
							}
							return str;
						}
					}
				}
				throw new Error("'" + value + "'는 카드번호 형식이 아닙니다.");	
			},
			
			"autoNo" : function(value) {
				var regex = /(.+)[0-9]{2}/;
				var tmp = value.match(regex);
				if (tmp != null) {
					return tmp[1] + "**";
				}
				throw new Error("'" + value + "'는 차량번호 형식이 아닙니다.");	
			},
			
			"chssNo" : function(value) {
				var regex = /([A-Z0-9]{9})[A-Z0-9]{8}/;
				var tmp = value.match(regex);
				if (tmp != null) {
					return tmp[1] + "********";
				}
				throw new Error("'" + value + "'는 차대번호 형식이 아닙니다.");	
			},
			
			"agmtNo" : function(value) {
				var regex = /((L|F|M)[0-9A-Z]{5})[0-9A-Z]{6}/;
				var regex2 = /((S)[0-9A-Z]{6})[0-9A-Z]{1,8}/;		// S200403C0000632(적하보험) 추가
				var tmp = value.match(regex);
				var tmp2 = value.match(regex2);
				if (tmp != null) {
					return tmp[1] + "******";
				} else if (tmp2 != null) {
					return tmp2[1] + "******";
				}
				throw new Error("'" + value + "'는 계약번호 형식이 아닙니다.");	
			},
			
			"corpNo" : function(value) {
				var regex = /([0-9]{3})([0-9]{2})([0-9]{5})/;
				var tmp = value.match(regex);
				if (tmp != null) {
					return tmp[1] + "-" + tmp[2] + "-" + tmp[3]; 
				}
				throw new Error("'" + value + "'는 사업자번호 형식이 아닙니다.");	
			}
			
		},
		
		/**
		 * 이름에 따른 변환 함수를 추가한다.
		 * 변환 함수의 예제)
		 * ValueFilter.regist("test", function(value) {
		 *                              ...
		 *                              return newValue;
		 *                           });  
		 */
		regist : function(name, func) {
			ValueFilter._items_[name] = func;
		},
		
		convert : function(name, value) {
			var func = ValueFilter._items_[name];
			if (func == null)
				throw new Error("'" + name + "'을 필터가 정의되지 않았습니다.");
			if (value != null && value.length > 0) {
				return func(value);
			} else {
				return value;
			}
		}
	};
		
	/**
	 * @alias script 공통 초기 실행 Method
	 */
	$(function(){	
		$('.nComma').each(function(){
			$(this).keyup(function(event){
				$(this).val(ValueFilter.convert("amtCnt", $(this).val().replace(/,/g, "")));
			});
		});
	});
	
	/**
	 * @alias 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴한다. 
	 * @param len : 자를 byte수
	 */
	String.prototype.cut = function(len) {
		var str = this;
		var l = 0;
		for(var i=0;i<str.length;i++){
			l += (str.charCodeAt(i) > 128) ? 2 : 1;
			if(l > len) {
				return str.substring(0,i);
			}
		}
		return str;
	};
	/**
	 * @alias 문자열 사이즈를 구한다
	 */
	String.prototype.len = function () {
		var val = this;
		// 입력받은 문자열을 escape() 를 이용하여 변환한다.
		// 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다.
		var temp_estr = escape(val);
		var s_index   = 0;
		var e_index   = 0;
		var temp_str  = "";
		var cnt       = 0;
		
		
		// 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
		// 제거할 문자열이 존재한다면
		while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0) {
			temp_str += temp_estr.substring(s_index, e_index);
			s_index = e_index + 6;
			cnt ++;
		}
		
		
		temp_str += temp_estr.substring(s_index);
		temp_str = unescape(temp_str);  // 원래 문자열로 바꾼다.
		
		
		// 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
		return ((cnt * 2) + temp_str.length) + "";
	};
	/**
	 * @alias 문자열을 숫자 타입으로 변경(숫자형 문자만 변경, 문자열은 공백 반환)
	 */
	String.prototype.num = function() {
		return (this.trim().replace(/[^0-9]/g, ""));
	};
	/**
	 * @alias Array값 비교
	 * @param a 해당 array값
	 * @param obj 비교대상 값
	 * @returns {Boolean}
	 */
	Array.prototype.contains = function ( needle ) {
		for (i in this) {
			if (this[i] == needle) return true;
		}
		return false;
	};
	
	/**
	 * @alias 쿠키를 생성한다.
	 * @param key : 키값을 지정한다. 쿠키 키값
	 * @param val : 키에 대한 value값 생성
	 * @param expires : 며칠간 쿠키를 생성할지 기간 설정.
	 */
	function setCookie(key, val, exp){
		var expire = new Date();
        expire.setDate(expire.getDate() + exp);
        var cookies = key + '=' + escape(val) + '; path=/ '; // 한글 깨짐을 막기위해 escape(value)를 합니다.
        if(typeof(exp) != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';        
        document.cookie = cookies;
	}
	
	/**
	 * @alias 생성된 쿠키를 불러온다.
	 * @param key : 쿠키에서 사용된 키값
	 * @return val : 쿠키값
	 */
	function getCookie(key){
		key = key + '=';
        var cookies = document.cookie;
        var start = cookies.indexOf(key);
        var value = '';
        if(start != -1){
             start += key.length;
             var end = cookies.indexOf(';', start);
             if(end == -1)end = cookies.length;
             value = cookies.substring(start, end);
        }
		return  unescape(value);
	}
	
	/**
	 * @alias ID/NAME에 해당되는 필드값에 콤마 생성
	 * @param id : 값이 들어있는 ID
	 * @param name : 값이 들어있는 NAME
	 */
	function addComma( id, name ){
		if( id != '' ){
			$('#' + id + '').toPrice();
		}else{
			$('input[name=' + name + ']').toPrice();
		}
	}
	
	/**
	 * @alias 금액을 콤마(,)가 포함된 포맷으로 변환한다.
	 * @param n : 변환전 금액
	 */
	function getCurrencyValue(n) {
		n = parseFloat(n);
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		n += '';                          // 숫자를 문자열로 변환

		while (reg.test(n))
			n = n.replace(reg, '$1' + ',' + '$2');
		
		if(n == 'NaN'){
			n = '';
		}
		return n;
	}
	
	/**
	 * @alias ID/NAME에 해당되는 필드값에 콤마 삭제
	 * @param id : 값이 들어있는 ID
	 * @param name : 값이 들어있는 NAME
	 */
	function delComma( id, name ){
		if( id != '' ){
			$('#' + id + '').getOnlyNumeric($('#' + id + '').val());
		}else{
			$('input[name=' + name + ']').getOnlyNumeric($('input[name=' + name + ']').val());
		}
	}
	
	/**
	 * @alias 날짜 포맷팅
	 * @param str : 날짜 변수  
	 * @param key : 포맷팅할 특수기호 ( / , - )
	 */
	function setFormatDate( str, key ){
		var val = "";
		if (!str) {
			return;
		}
		if (str.length > 8) {
			alertPopup("8자리가 아닙니다.","ok",null);
			return false;
		}
		val = str.substring(0,4) + key + str.substring(4,6) + key + str.substring(6,8);
		return val;
	}
	
	/**
	 * @alias 날짜 포맷팅(YYYY년 MM월 DD일 형식으로 리턴)
	 * @param str : 날짜 변수(8자리)  
	 */
	function setFormatDateToHan(str){
		var val = "";
		if (str.length == 8) {
			val = str.substring(0,4) + '년 ' + str.substring(4,6) + '월 ' + str.substring(6,8) + '일';
		}
		return val;
	}
	
	/**
	 * @alias 날짜 포맷팅(시분초)
	 * @param str : 날짜 변수  
	 * @param key : 년월일 포맷팅할 특수기호 ( / , - )
	 * @param key2: 시분초 포맷팅할 특수기호 ( - , : )
	 */
	function setFormatDateTime( str, key , key2){
		var val = "";
		
		str = replaceAll(str,' ','');
		
		if (str.length > 14) {
			alertPopup("14자리가 아닙니다.","ok",null);
			return str;
		}
		val = str.substring(0,4) + key + str.substring(4,6) + key + str.substring(6,8) + " " + str.substring(8,10) + key2 + str.substring(10,12) + key2 + str.substring(12,14);
		return val;
	}
	
	/**
	 * @alias TEXTFIELD VALUE 특수문자 삭제
	 * @param id : 값이 들어있는 ID
	 * @param rep : 없앨려는 특수문자
	 * @return str : 
	 */
	function delSpecialChar( id, rep ){
		var str = replaceAll( $('#'+id+'').val(), rep, "" );
		return str;
	}
	
	/**
	 * @alias 첫 필드 값의 MAXIMUM 값을 체크해서 초과할시 다음 TEXTFIELD로 넘겨주는 함수
	 * @param curId : 첫번째 필드
	 * @param nexId : 두번째 필드
	 * @param max : MAXIMUM 값
	 * @exp <input name="txt" id="txt" onkeyup="autoNextField( curId, nexId, max )" /> 
	 */
	function autoNextField( nmId, nexId, max ){
		var length = 0;
		if ($('#' + nmId + '').length > 0) {
			length = $('#' + nmId + '').val().length;
		} else {
			length = $('input[name=' + nmId + ']').val().length;
		}
		if( max == length ) {
			if ($('#' + nexId + '').length > 0) {
				$('#' + nexId + '').focus();
			} else {
				$('input[name=' + nexId + ']').focus();
			}
		}
	}
	
	/**
	 * @alias 자바 메소드 replaceAll
	 * @param str : 검색단어
	 * @param searchStr : 변환될 단어
	 * @param replaceStr : 변환된 단어
	 */
	function replaceAll(str, searchStr, replaceStr) {
		while( str.indexOf(searchStr) != -1 ){
			str = str.replace(searchStr, replaceStr);
		}
		return str;
	};
	
	/**
	 * @alias HTML 표현방식으로 변환
	 * @param str : HTML 표현방식으로 변환할 문자열
	 */
	function setHtmlReplace(str){
		str = replaceAll(str, "&lt;", "<");
		str = replaceAll(str, "&gt;", ">");
		str = replaceAll(str, "&quot;", "\"");
		str = replaceAll(str, "&apos;", "'");
		str = replaceAll(str, "&amp;", "&");
		str = replaceAll(str, "&nbsp;", " ");
		return str;
	}
	
	/**
	 * @alias 공통 팝업 스크립트
	 * @param options 옵션
	 * ==================================
	 * 				width 		: 가로길이
	 * 				height 		: 세로길이
	 * 				status		: 상태바표시
	 * 				scrollbars 	: 스크롤바 표시
	 * 				location		: 주소 필드 표시
	 * 				url				: 팝업 활성화할 URL
	 * 				name			: 이름
	 * ==================================
	 * @exp 
	 	$('.openPopupPost').click(function(){
			$('.openPopupPost').openPoupDefault({
				width : 620,
				length : 605,
				url : '/bin/MY/CO/MYCO6001G.jsp'
			});			
		});
	 */
	$.fn.openPoupDefault = function(options) {
		var defaults = {
			width 		: '1000',
			heigth 		: '1000',
			status 		: 'no',
			scrollbars 	: 'no',
			location		: 'no',
			url				: '',
			name			: 'popup'
		};
		var opt = $.extend(defaults, options);
		window.open(opt.url, opt.name, 'width='+opt.width+',height='+opt.height+',status='+opt.status+',scrollbars='+opt.scrollbars+'location='+opt.location);
	};
	
	/**
	 * @alias 입력 내용을 정해진 바이트 수 만큼 제한
	 * @param txt : 입력 문자열 내용
	 * @return str
	 */
	function getByteLengthCntOfTxt(txt, maxLength){
		var returnValue="";
		if(txt != "") {
			if(txt.len() > maxLength) {
				returnValue = txt.cut(maxLength);
				alertPopup("입력가능한 글자수를 초과하였습니다.","ok",null);
			} else {
				returnValue = txt;
			}
		}
		return returnValue;
	}
	/**
	 * @alias 문자열의 바이트 길이를 구하는 함수.
	 * @param obj : 객체의 this 값
	 * @return str
	 */
	function getByteLengthCnt(txt, maxLength) {
		var byteLength = 0;
		if(txt) {
			if(txt.len() > maxLength) {
				return maxLength; 
			} else {
				byteLength = txt.len();
			}
		}
		return byteLength;
	}
	
	/**
	 * @alias 입력값의 바이트 길이를 구하는 함수.
	 * @param str : 금액
	 * @return boolean
	 */
	function getByteLengthValue(str) {
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
	function checkLength(obj, num) {
		if(num < getByteLengthValue(obj.value)){
			alertPopup("입력가능한 글자수를 초과하였습니다.","ok",null);
			obj.value = obj.value.cut(num);
		}
	}
	
	/**
	 * @alias 두 날짜간 일자 차이를 리턴
	 * @param date1:시작일자
	 * @param date2:종료일자
	 * @return String
	 */
	function getDayBetween(date1,date2) {
		var dt1m = Number(date1.substring(5, 7)) - 1;
		var dt2m = Number(date2.substring(5, 7)) - 1;
		
		var dt1 = new Date(date1.substring(0,4), dt1m, date1.substring(8, 10));
		var dt2 = new Date(date2.substring(0,4), dt2m, date2.substring(8, 10));
		var interval = dt2 - dt1;
		
		var day = 1000*60*60*24;

		return parseInt(interval / day, 10);
	}
	
	/**
	 * @alias 사업자등록번호 체크
	 * @param bmanRegNo : 사업자등록번호
	 * @return boolean
	 */
	function validCheckBSNO(bsno)
	{	
		if	(bsno.length	>= 10) {
			// 사업자번호	체크로직
			hap	=	bsno.substring(0, 1) * 1
				+ bsno.substring(1,	2) * 3
				+ bsno.substring(2,	3) * 7
				+ bsno.substring(3,	4) * 1
				+ bsno.substring(4,	5) * 3
				+ bsno.substring(5,	6) * 7
				+ bsno.substring(6,	7) * 1
				+ bsno.substring(7,	8) * 3
				+ bsno.substring(8,	9) * 5;
			
			lastVal = bsno.substring(8,	9) * 5;
			lastVal = parseInt(lastVal / 10);
			hap	=	hap	+	lastVal;
			checkVal = 10	-	hap%10;
			
			if (checkVal ==	10)
				checkVal	=	0;
			if (bsno.substring(9, 10) != checkVal) {
				return	false;
			}
		} else {
			return	false;
		}
		
		return true;
	}
	
	/**
	 * @alias 주민번호 체크(내외국인)
	 * @param socialno1	: 첫번째 주민등록번호 6자리
	 * @param socialno2	: 두번째 주민등록번호 7자리
	 * @return boolean
	 */
	function validCheckRRNO(socialno1, socialno2) {
		//내국인 주민번호 확인
		if(socialno2.substring(0, 1) < 5) {
			var i, sum = 0;
			var str = socialno1 + socialno2;
			if(socialno1.length != 6){
				alertPopup("주민등록번호 생년월일이 잘못 입력되었습니다.","ok",null);
				return false;
			}
			if(socialno2.length != 7){
				alertPopup("주민등록번호 뒷자리가 잘못 입력되었습니다.","ok",null);
				return false;
			}
			if (str.length != 13){
				alertPopup("주민등록번호가 잘못 입력되었습니다.","ok",null);
				return false;
			}
			
			//2020.10.07 주민번호 체계 변경 반영
			//2020.09.30 이전 출생자 - 기존 주민등록번호 유효성 체크 기준 유지 / 2020.09.30 이후 출생자 - 주민등록번호 유효성 체크로직 미적용
			var getBirth = getBirthDate(socialno1 + socialno2, "yyyyMMdd");
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
				alertPopup("주민등록번호가 잘못 입력되었습니다.","ok",null);
				return false;
			}
		//외국인 주민번호 확인
		} else {
			alertPopup("죄송합니다, 외국인은 홈페이지 가입이 불가능합니다. 자세한 내용은 고객센터(1899-6782)로 문의하여 주시기 바랍니다.","ok",null);
			return false;
//			var fgnno = socialno1 + socialno2;
//			var sum=0;
//			var odd=0;
//			buf = new Array(13);
//			for(i=0; i<13; i++) { buf[i]=parseInt(fgnno.charAt(i)); }
//			odd = buf[7]*10 + buf[8];
//			if(odd%2 != 0) { return false; }
//			if( (buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9) ) {
//			        return false;
//			}
//			multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
//			for(i=0, sum=0; i<12; i++) { sum += (buf[i] *= multipliers[i]); }
//			sum = 11 - (sum%11);
//			if(sum >= 10) { sum -= 10; }
//			sum += 2;
//			if(sum >= 10) { sum -= 10; }
//			if(sum != buf[12]) { return false; }
//			return true;
		}
	}
	
	/**
	 * @alias 주민번호 체크(내외국인)
	 * @param socialno1	: 첫번째 주민등록번호 6자리
	 * @param socialno2	: 두번째 주민등록번호 7자리
	 * @return boolean
	 */
	function validCheckRRNO_all(socialno1, socialno2, callback) {
		
		if(typeof callback == "undefined") {
			callback = null;
		}
		
		//내국인 주민번호 확인
		if(socialno2.substring(0, 1) < 5) {
			var i, sum = 0;
			var str = socialno1 + socialno2;
			if(socialno1.length != 6){
				alertPopup("주민등록번호 생년월일이 잘못 입력되었습니다.","ok", callback);
				return false;
			}
			if(socialno2.length != 7){
				alertPopup("주민등록번호 뒷자리가 잘못 입력되었습니다.","ok",callback);
				return false;
			}
			if (str.length != 13){
				alertPopup("주민등록번호가 잘못 입력되었습니다.","ok",callback);
				return false;
			}
			
			//2020.10.07 주민번호 체계 변경 반영
			//2020.09.30 이전 출생자 - 기존 주민등록번호 유효성 체크 기준 유지 / 2020.09.30 이후 출생자 - 주민등록번호 유효성 체크로직 미적용
			var getBirth = getBirthDate(socialno1 + socialno2, "yyyyMMdd");
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
				alertPopup("주민등록번호가 잘못 입력되었습니다.","ok",callback);
				return false;
			}
		//외국인 주민번호 확인
		} else {
			var fgnno = socialno1 + socialno2;
			var sum=0;
			var odd=0;
			buf = new Array(13);
			for(i=0; i<13; i++) { buf[i]=parseInt(fgnno.charAt(i)); }
			odd = buf[7]*10 + buf[8];
			if(odd%2 != 0) {
				alertPopup("(1)외국인등록번호가 잘못 입력되었습니다.","ok",callback);
				return false;
			}
			// 2017-02-08(포탈은 2012-08-02 제거함) 
			// 외국인등록번호 검증 식별 구분자 제거
			if( (buf[11]!=6) && (buf[11]!=7) && (buf[11]!=8) && (buf[11]!=9) ) {
//				alert("(2)외국인등록번호가 잘못 입력되었습니다!");
//				return false;
			}
			multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
			for(i=0, sum=0; i<12; i++) { sum += (buf[i] *= multipliers[i]); }
			sum = 11 - (sum%11);
			if(sum >= 10) { sum -= 10; }
			sum += 2;
			if(sum >= 10) { sum -= 10; }
			if(sum != buf[12]) {
				alertPopup("(3)외국인등록번호가 잘못 입력되었습니다","ok",callback);
				return false;
			}
			return true;
		}
	}
	
	/**
	 * @alias INPUT TYPE 입력값 제한
	 * @param obj : INPUT TYPE Object
	 * @param type : 입력값 제한 Type
	 * 		- NUMB 	: 숫자
	 * 		- NUCM 	: 숫자 and [ 복사, 잘라내기, SHIFT, DELETE, END, HOME, CTRL, C,V,X ]
	 * 		- CHAR 	: 한글
	 * 		- HCNO 	: 한글 AND 숫자
	 *      - HCEC  : 한글 또는 영문
	 * 		- ECHR 	: 영문
	 * 		- ECNO 	: 영문 또는 숫자
	 * 		- URL 	: 영문, 숫자, ?./=_&: -
	 * 		- HNSP 	: 한글, 숫자, ", .,()-Space
	 * 		- ENSP	: 영문, 숫자, ?./=_&:, Space , (,)괄호
	 * 		- HENO	: 한글, 숫자, 영문

	 *      - EMAIL : 이메일입력용 / 영문, 숫자, .(마침표)
	 * @return N/A
	 * <input type=text onkeydown="gf_checkTypes(this, 'NUMB', event)" />
	 */
	function gf_checkTypes(obj, type, evt)
	{
		try
	    {
	    	var key;
	    	var val = obj.value;
	    	var onlyEng = /^[a-zA-Z]+$/;
	    	var mob = navigator.appName;
	    	
	    	if( mob == "Microsoft Internet Explorer" ){
	    		key = evt.keyCode;
	    	}else{
	    		key = evt.which;
	    		
	    		// "<-"는 예외처리
	    		if(key == 0x08) {
	    			return true;
	    		} 
	    	}
	    	
	    	//console.log(key);
	    	//console.log(obj.value);
	    	
	        switch(type)
	        {
	            case "NUMB":    // 숫자
	            	obj.style.imeMode = "disabled";
	                if(
	                        (48 <= key && key <= 57) || 
	                        (96 <= key && key <= 105) || 
	                        key == 0 || 
	                        key == 45 || 
	                        key == 8 ||
	                        key == 9 ||
	                        key == 16
	                 )
	                {
	                    window.event.returnValue = true;
	                }else{
	                	obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }                   
	                break;
	            case "NUCM":    // 숫자 and [ 복사, 잘라내기, SHIFT, DELETE, END, HOME, CTRL, C,V,X ] 
	            	obj.style.imeMode = "disabled";
	            	if(
	                    	(48 <= key && key <= 57) || 
	                    	(96 <= key && key <= 105) ||
	                    	key == 0 || 
	                    	key == 45 || 
	                    	key == 8 ||  
	                    	key == 9 ||  
	                    	key == 16 ||  
	                    	key == 17 ||  
	                    	key == 35 ||  
	                    	key == 36 ||
	                    	key == 45 ||
	                    	key == 46 ||
	                    	key == 67 ||
	                    	key == 86 ||
	                    	key == 88 
	               	)
	                {
	                    window.event.returnValue = true;
	                }else{
	                	obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }  
		                break;
	            case "FLOT":    // 숫자 소수점, "." 추가
	            	obj.style.imeMode = "disabled";
	                if(
	                        (48 <= key && key <= 57) || 
	                        (96 <= key && key <= 105) || 
	                        key == 110 || 
	                        key == 190 || 
	                        key == 0 || 
	                        key == 45 || 
	                        key == 8 ||
	                        key == 9
	                 )
	                {
	                    window.event.returnValue = true;
	                }else{
	                	obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }                   
	                break;
	            case "CHAR":    // 한글
	            	obj.style.imeMode = "sMode";
	                if( key == 229 || key == 9 )
	                {
	                	window.event.returnValue = true;
	                }else{
	                	obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                break;
	            case "HCNO":    // 한글 또는 숫자
	                obj.style.imeMode = "active";
	                if( (key == 229) || (48 <= key && key <= 57) || (96 <= key && key <= 105) || key == 9 )
	                {
	                	window.event.returnValue = true;
	                }else{
	                	obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                break;
	            case "HCEC":    // 한글 또는 영문
	                obj.style.imeMode = "active";
	                if( 65 <= key && key <=90 || key == 229 || key == 9)
	                {
	                	window.event.returnValue = true;
	                }else{
	                	obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                break;
	            case "ECHR":    // 영문
	            	obj.style.imeMode = "disabled";
	            	if( 65 <= key && key <=90 || key == 9)
	            	{
	            		window.event.keyCode = true;
	            	}else{
	            		obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			event.preventDefault();
	            		}
	            	}
	                break;
	            case "ECNO":    // 영문 또는 숫자 
	                obj.style.imeMode = "disabled";
	                if(!(((key >= 0x61 && key <= 0x7A) || (key >= 0x41 && key <= 0x5A)) || (key >= 0x30 && key <= 0x39) || key == 9) )
	                {
	                    obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                else return true;
	                break;
	            case "URL" :    // 영문, 숫자, ?./=_&: -
	                obj.style.imeMode = "disabled";
	                if(!(((key >= 0x61 && key <= 0x7A) || (key >= 0x41 && key <= 0x5A)) || (key >= 0x2E && key <= 0x3A) || key == 0x26 || key == 0x3D || key == 0x3F || key == 0x5F || key == 0x2D || key == 9) )
	                {
	                    obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                else return true;
	                break;
	            case "HNSP":    // 한글, 숫자, ", .,()-Space
	                obj.style.imeMode = "active";
	                if(!((key >= 0xAC00 && key <= 0xD7A3) || (key >= 0x3131 && key <= 0x314E) || (key >= 0x30 && key <= 0x39) || key == 0x20 || key == 0x22 || key == 0x28 || key == 0x29 || (key >= 0x2C && key <= 0x2E) || key == 9) )
	                {
	                    obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                else return true;
	                break;
	            case "ENSP" :    // 영문, 숫자, ?./=_&:, Space , (,)괄호
	                obj.style.imeMode = "disabled";
	                if(!(((key >= 0x61 && key <= 0x7A) || (key >= 0x41 && key <= 0x5A)) || (key >= 0x2E && key <= 0x3A) || key == 0x26 || key == 0x3D || key == 0x3F || key == 0x5F || key == 0x20 || key == 0x28 || key == 0x29 || key == 0x2C ) || key == 9)
	                {
	                    obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                else return true;
	                break;
	            case "HENO":    // 한글, 숫자, 영문
	                obj.style.imeMode = "active";
	                
	                if(!((key == 229) || (48 <= key && key <= 57) || (96 <= key && key <= 105) || (65 <= key && key <=90) || key == 9 ))
	                {
	                    obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                else return true;
	                break;
	            
	            /** 특정 입력폼에 입력제한 **/
	                
	            case "EMAIL":    // 이메일 (영문,숫자,.(마침표))
	            	obj.style.imeMode = "disabled";
	                if(!(((key >= 0x61 && key <= 0x7A) || (key >= 0x41 && key <= 0x5A)) || (key >= 0x30 && key <= 0x39) || key == 9 || key == 190) )
	                {
	                    obj.focus();
	                    if(window.event){
	            			window.event.returnValue = false;
	            			return false;
	            		}else{
	            			evt.preventDefault();
	            		}
	                }
	                else return true;
	                break;
		        }
	    }
	    catch(e)
	    {
	    	alertPopup("checkTypes error :" + e.Message(),"ok",null);
		}
		
	}
	
	/**
	 * @alias VALIDATION 체크 공통
	 * @param name : TEXTFIELD NAME
	 * @param msg	: ALERT 메세지
	 * @param gubun : 
	 * 		selbox 	= 셀렉트박스
	 * 		txtnm 	= 텍스트필드 name
	 * 		txtid 		= 텍스트필드 id
	 * @exp 
	  	if(getValDationChk("mgrId", "", "selbox") == false) {
	 		return false;
	 	}
	 */
	function getValDationChk( nmid, msg, gubun ){
		
		if (msg == "") {
			if (gubun == "selbox") 			msg = $('select[name='+nmid+']').attr("title") + "(을/를) 입력해주세요.";
			else if (gubun == "txtnm")		msg = $('input[name='+nmid+']').attr("title") + "(을/를) 입력해주세요.";
			else									msg = $('#'+nmid+'').attr("title") + "(을/를) 입력해주세요.";
		}
		
		var str = "";
		if (gubun == "selbox") 			str = $('select[name='+nmid+']').val();
		else if (gubun == "txtnm")		str = $('input[name='+nmid+']').val();
		else									str = $('#'+nmid+'').val();
		
		if( str == "" ){
			alertPopup(msg,"ok",null);
			if (gubun == "selbox") 			$('select[name='+nmid+']').focus();
			else if (gubun == "txtnm")		$('input[name='+nmid+']').focus();
			else									$('#'+nmid+'').focus();
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * @alias 현재 날짜 가져오기(클라이언트)
	 * @param sprt : 출력구분자
	 * @exp 
	 * getToday("-");
	 */
	function getToday(sprt) {
		var d = new Date();
		var YY = d.getFullYear();
		var MM = d.getMonth()+1;
		var DD = d.getDate();
		if(MM < 10) {
			MM = "0" + MM;
		}
		if(DD < 10) {
			DD = "0" + DD;
		}
		if(sprt != undefined) {
			return YY + sprt + MM + sprt + DD;
		} else {
			return "" + YY + MM + DD;
		}
	}
	
	/**
	 * @alias 기준일자로 1년 후 날짜 가져오기(클라이언트)
	 * @param dateText : 기준일자
	 * @param sprt : 출력구분자
	 * @exp 
	 * getNextYearDay("-");
	 */
	function getNextYearDay(dateText, sprt) {
		dateText = replaceAll(dateText, "-", "");
		
		var yy = parseInt(dateText.substring(0,4), 10);
		var mm = parseInt(dateText.substring(4,6), 10);
		var dd = parseInt(dateText.substring(6,8), 10);
		
		var stdDate = new Date(yy, mm-1, dd);
		
		var YY = stdDate.getFullYear() + 1;
		var MM = stdDate.getMonth()+1;
		var DD = stdDate.getDate();
		
		// 윤년에따른 마지막날 검증
		var toDate = new Date(YY, mm-1);
		var lastDay = getLastDay(toDate);
		
		if (DD > lastDay) {
			DD = lastDay;
		}

		if(MM < 10) {
			MM = "0" + MM;
		}
		if(DD < 10) {
			DD = "0" + DD;
		}
		if(sprt != undefined) {
			return YY + sprt + MM + sprt + DD;
		} else {
			return "" + YY + MM + DD;
		}
	}
	
	/**
	 * @alias 기준일자로 1년 후 날짜 가져오기(윤년인 경우 2/28일 -> 2/29일로 처리)
	 * @param dateText : 기준일자
	 * @param sprt : 출력구분자
	 * @exp 
	 * getNextYearDay2("-");
	 */
	function getNextYearDay2(dateText, sprt) {
		dateText = replaceAll(dateText, "-", "");
		
		var yy = parseInt(dateText.substring(0,4), 10);
		var mm = parseInt(dateText.substring(4,6), 10);
		var dd = parseInt(dateText.substring(6,8), 10);
		
		var stdDate = new Date(yy, mm-1, dd);
		
		var YY = stdDate.getFullYear() + 1;
		var MM = stdDate.getMonth()+1;
		var DD = stdDate.getDate();
		
		// 윤년에따른 마지막날 검증
		var toDate = new Date(YY, mm-1);
		var lastDay = getLastDay(toDate);
		
		//만기일이 윤년이면 2/28일은 2/29일로 변경
		if(lastDay == "29" && MM == "2" && DD == "28") DD = lastDay;
		
		if (DD > lastDay) {
			DD = lastDay;
		}

		if(MM < 10) {
			MM = "0" + MM;
		}
		if(DD < 10) {
			DD = "0" + DD;
		}
		if(sprt != undefined) {
			return YY + sprt + MM + sprt + DD;
		} else {
			return "" + YY + MM + DD;
		}
	}
	
	/**
	 * @alias 기준일자로 addMonth만큼 더한 일자 가져오기
	 * @param dateText : 기준일자
	 * @param sprt : 출력구분자
	 * @param addMonth : 계산할 개월
	 * @exp 
	 * getAddMonthDay
	 */
	function getAddMonthDay(dateText, addMonth, sprt) {
		var retDate = '';
		dateText = replaceAll(dateText, sprt, "");

		var yy = dateText.substring(0,4);
		var mm = dateText.substring(4,6);
		var dd = dateText.substring(6,8);
		
		var stdDate = new Date(yy, mm-1 + addMonth, dd);
		var YY = stdDate.getFullYear();
		var MM = stdDate.getMonth() + 1;
		var DD = stdDate.getDate();
		
		if(dd != DD){
			stdDate = new Date(YY,MM-1,0);
			YY = stdDate.getFullYear();
			MM = stdDate.getMonth() + 1;
			DD = stdDate.getDate();
		}
		if(MM < 10) {
			MM = "0" + MM;
		}
		if(DD < 10) {
			DD = "0" + DD;
		}		
		
		if(sprt != undefined){
			retDate = YY + sprt + MM + sprt + DD;
		}else{
			retDate = YY +""+ MM +""+ DD;
		}
		return retDate;
	}
	
	
	/**
	 * @alias 현재 달의 1일 가져오기(클라이언트)
	 * @param sprt : 출력구분자
	 * @exp 
	 * getFirstDate("-");
	 */
	function getFirstDate(sprt) {
		var d = new Date();
		var YY = d.getFullYear();
		var MM = d.getMonth()+1;
		if(MM < 10) {
			MM = "0" + MM;
		}
		if(sprt != undefined) {
			return YY + sprt + MM + sprt + "01";
		} else {
			return YY + MM + "01";
		}
	}

	/**
	 * @alias 이전/이후 날짜 가져오기
	 * @param date:기준일자(yyyyMMdd)
	 * @param num:계산일수(number)
	 * @return 계산된 날짜
	 */
	function getAddDate(date, num) {
		var yy = parseInt(date.substring(0,4), 10);
		var mm = parseInt(date.substring(4,6), 10);
		var dd = parseInt(date.substring(6,8), 10);
		
		var stdDate = new Date(yy, mm-1, dd);
		
		var newDate = stdDate;
		newDate.setDate(stdDate.getDate()+num);
		
		var newYY = newDate.getFullYear();
		var newMM = newDate.getMonth()+1;
		if(newMM < 10) {
			newMM = "0"+newMM;
		}
		var newDD = newDate.getDate();
		
		// 2013-10-10 추가
		if(newDD < 10) {
			newDD = "0"+newDD;
		}
		
		return newYY + "" + newMM + "" + newDD;
	}
	
	/**
	 * @alias 해당 월의 마지막 날짜를 반환(윤년 적용)
	 * @param date:Date Objct
	 * @returns 해당 월의 마지막 날짜
	 */
	function getLastDay(date) {
		
		var monthTable = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		
		if (((date.getYear() % 4 == 0) && (date.getYear() % 100 != 0)) || (date.getYear() % 400 == 0)) {
			monthTable[1] = 29;
		} else {
			monthTable[1] = 28;			
		}
		
		return monthTable[date.getMonth()];
	}
	
	/**
	 * @alias 윤년 여부
	 * @param year : 년도(4자리 : 2020)
	 * @returns true : 윤년, false : 평년
	 */
	function isLeapYear(yyyy) {
		
		var isLeap = false;
		
		if (((yyyy % 4 == 0) && (yyyy % 100 != 0)) || (yyyy % 400 == 0)) {
			isLeap = true;		//윤년
		} else {
			isLeap = false;		//평년
		}
		
		return isLeap;
	}
	
	/**
	 * @alias 윤년 여부
	 * @param date : String 날짜(8자리 : 20200229)
	 * @returns true : 윤년, false : 평년
	 */
	function isLeapDate(yyyymmdd) {
		
		var isLeap = false;
		var yyyy = yyyymmdd.substring(0,4);
		
		if (((yyyy % 4 == 0) && (yyyy % 100 != 0)) || (yyyy % 400 == 0)) {
			isLeap = true;		//윤년
		} else {
			isLeap = false;		//평년
		}
		
		return isLeap;
	}
	
	/**************************** 공통 레이어 함수 시작 ************************************/

	var focusedObject; // 레이어 팝업을 호출한 오브젝트
	$(function() {
		$('.layer').click(function(e){
			focusedObject=e.currentTarget;
		});
		
//인터넷푸시 수취 확인 이력 저장
		//resData->serviceWorker에서 보내는 수취 값
		if(getUrlParamter("resData") !== false || sessionStorage.getItem('resData') !== null){
			
			if(sessionStorage.getItem('pushSeq') === null){
				sessionStorage.setItem('pushSeq', getUrlParamter("pushSeq"));
			}
			if(sessionStorage.getItem('pushMgntSeq') === null){
				sessionStorage.setItem('pushMgntSeq', getUrlParamter("pushMgntSeq"));
			}
			if(sessionStorage.getItem('resData') === null){
				sessionStorage.setItem('resData', getUrlParamter("resData"));
			}
			var serviceId 	= getUrlParamter("m");
			var pushSeq 		= getUrlParamter("pushSeq") ? getUrlParamter("pushSeq") : sessionStorage.getItem('pushSeq');
			var pushMgntSeq 		= getUrlParamter("pushMgntSeq") ? getUrlParamter("pushMgntSeq") : sessionStorage.getItem('pushMgntSeq');
			var resData 		= getUrlParamter("resData") ? getUrlParamter("resData") : sessionStorage.getItem('resData');
			
			
			getEventTag(pushSeq,pushMgntSeq, serviceId,resData);	//로그 등록을 위한 EventTag조회 (dphdhdba.PUSH_HIS_CD_MGNT)
			console.log("serviceId==>"+serviceId);
			console.log("pushSeq==>"+pushSeq);
			console.log("pushMgntSeq==>"+pushMgntSeq);
			console.log("resData==>"+resData);
			
		}		
	});
	
	
function getEventTag(pushId,pushMgntSeq, serviceId,resData){
		
		var result = "";
		var	reqVO = {
				svcMenuId : serviceId
		};
//console.log("getEventTag==>serviceId-->"+serviceId);		

		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0901M04S", {
			data : reqVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					result = responseObj.data.prodHisCd;
					console.log("result-->"+result);
					if(result !== undefined && result !== "" && result !== null){
						/*
						 * 수취 이벤트코드 맵핑
						 */
						
						intPushTagging(pushId,pushMgntSeq, result,resData);
					}else{
						intPushTagging(pushId,pushMgntSeq, serviceId,resData);
					}
				},
				failure:function() {					 
				}
			}
		});
		
		return result;
	}

/**
 * @alias 인터넷푸시 수신 여부 업데이트 2step
 */
function intPushTagging(pushId, pushMgntSeq,pushEvntCat,resData){

	

		if(!isNullChk_1(pushId) && !isNullChk_1(pushEvntCat)){
			
			var reqVo = {};
			
			reqVo = {
					resData : resData,
					pushSeq : pushId,
					pushMgntSeq : pushMgntSeq,
					pushEvntCat : pushEvntCat
			};
			
			HiJS.svr.doRequestAjax('DHCO0901M05U', {
				data : reqVo,
				loadingbar : false,
				callback : {
					success : function(responseObj) {	
						
						console.log("인터넷 푸시 수취 성공");
						
					},
					failure : function(responseObj){
						
						console.log("인터넷 푸시 수취 실패");
					}
				}
			});
		}

}

//URL 파라미터 값 가져오기
function getUrlParamter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split("&");
	var sParameterName;
	var i;
	
	for ( i = 0 ; i < sURLVariables.length; i++){
		sParameterName = sURLVariables[i].split("=");
		
		if (sParameterName[0] === sParam){
			return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	
	return false
}

/*null체크*/
function isNullChk_1(data){
	
	if(data === undefined || data === 'undefined' || 
	   data === null || data === 'null' ||
	   data === ''){
		return true;
	}else{
		return false;
	}
};
	/**
	 * @alias 공통 레이어 닫기 버튼을 눌렀을 때 
	 */
	function closeLayer(divId) {
		closeLayer(divId,"");
	}
	
	function closeLayer(divId, dimId) {
		if (!divId) {
			$(".layerPopWrap").fadeOut();
			if($(".dim_bg:visible").length > 0){
				$(".dim_bg:visible").each(function(){
					if($(this).attr('id') == "common"){
						$('#common').fadeOut();
					}else{
						var strId=""+$(this).attr('id');
						if(strId.substring(0,6)=="dimBg_"){
						    $(this).remove();
					    }else{
					    	$(".dim_bg").fadeOut();	
					    }
					}
				})
			}else{
				$(".dim_bg").fadeOut();	
			}
			
		} else {
			if(dimId == "" || dimId == undefined){
				//dim_bg 레이어 close
				if($(".dim_bg:visible").length > 0){
					$(".dim_bg:visible").each(function(){
						if($(this).attr('id') == "dimBg_"+divId){
							//$("#dimBg_"+ divId).fadeOut();	
							$("#dimBg_"+ divId).remove();	
						}else if($(this).attr('id') == "common"){
							//$('#common').fadeOut();
							$('#common').remove();
						}
					})
				}else{
					//
				}
				//open레이어ID close
				$('#' + divId).fadeOut();
			}else{
				//$("#"+dimId).fadeOut();
				$("#"+dimId).remove();				
				$('#' + divId).fadeOut();
			}

			var existLayer = false;
			$('.layerPopWrap').each(function() {
				if ($(this).is(':visible')) {
					existLayer = true;
					return false;
				} 
			});
			if (!existLayer) {
				$(".dim_bg").fadeOut();							
			}
		}

	    if(focusedObject != null) {
	    	try{
	    		focusedObject.focus();
	    	}catch(e){}
	    }
	}
	
	/** 참고
	 * @alias 공통 레이어팝업 
	 * @param divId : div id
	 * @exp <div  id="layerTest" class="layerPop" style="display:none" >
	 *            openLayer('layerTest')함수로 호출
	 */
	function openLayer(divId) {
		openLayer(divId,"");
	}
	
	function openLayer(divId,dimId) {
		if(dimId == "" || dimId == undefined){
			if($(".dim_bg:visible").length > 0) {
				//기존레이어팝업호출
				$(".dim_bg:visible").each(function(){
					var strId = ""+$(this).attr('id');
					//alert("strId"+strId);
					if(strId == "dimBg_"+divId){
						//
					}else if(strId == "common"){
						//
					}else{
						$("body").append('<div class="dim_bg" id="dimBg_'+divId+'" style="display:none;"></div>');
						$("#dimBg_"+ divId).fadeIn();	
					}
				})				
			}else{
				var chk = false;
				$(".dim_bg").each(function(){
					var strId = ""+$(this).attr('id');
					if(strId =="dimBg_"+divId ){
						$("#dimBg_"+ divId).fadeIn();
						chk = true;
					}
				})
				if(!chk){
					//새로운 레이어팝업호출
					$("body").append('<div class="dim_bg" id="dimBg_'+divId+'" style="display:none;"></div>');
					$("#dimBg_"+ divId).fadeIn();
			    }
			}		
		}else{
			//dimid가 존재하는 경우
			$("#"+dimId).fadeIn();
		}
		$("#"+divId).fadeIn().attr('tabindex',0).focus();  /* 웹접근성1704 */
		$("#"+divId).css("top", Math.max(0, (($(window).height() - $("#"+divId).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        $('#'+divId).focus();
	}
	/**************************** 공통 레이어 함수 끝 ************************************/

	/**
	 * @alias null 변경
	 * @param value : 체크할 값
	 * @param replaceValue : 변경할 값	 
	 * @exp  nvl(value, ""); 
	 */
	function nvl(value, replaceValue) {		
		if(value) {		
			return value;
		}else{
			return replaceValue;
		}
	}
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 날짜(YYYYMMDD) or (YYYYMM)
	 * @return 날짜(YYYY-MM-DD) or (YYYY-MM)
	 */
	ValueFilter.regist("date", function(value) {
		var regex = "";
		if(value.length >= 8) {
			regex = /([0-9]{4})(\-*)([0-9]{2})(\-*)([0-9]{2})/;
			var tmp = value.match(regex); 
			if (tmp != null) {
				return tmp[1] + "-" + tmp[3] + "-" + tmp[5];
			}
		} else {
			regex = /([0-9]{4})(\-*)([0-9]{2})/;
			var tmp = value.match(regex); 
			if (tmp != null) {
				return tmp[1] + "-" + tmp[3];
			}
		}
		throw new Error("'" + value + "'는 날짜 형식이 아닙니다."); 
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 날짜(YYYYMMDD) or (YYYYMM)
	 * @return 날짜(YYYY년 MM월 DD일) or (YYYY년 MM월)
	 */
	ValueFilter.regist("dateko", function(value) {
		var regex = "";
		if(value.length >= 8) {
			regex = /([0-9]{4})(\-*)([0-9]{2})(\-*)([0-9]{2})/;
			var tmp = value.match(regex); 
			if (tmp != null) {
				return tmp[1] + "년 " + tmp[3] + "월 " + tmp[5] + "일";
			}
		} else {
			regex = /([0-9]{4})(\-*)([0-9]{2})/;
			var tmp = value.match(regex); 
			if (tmp != null) {
				return tmp[1] + "년 " + tmp[3] + "월";
			}
		}
		throw new Error("'" + value + "'는 날짜 형식이 아닙니다."); 
	});	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 변환이전 금액
	 * @return 콤마를 포함한 금액(원)
	 */
	ValueFilter.regist("amtWon", function(value) {
		return getCurrencyValue(value) + "원";
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 변환이전 금액
	 * @return 콤마를 포함한 금액(만원)
	 */
	ValueFilter.regist("amtMWon", function(value) {
		return getCurrencyValue(value) + "만원";
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 변환이전 금액 ($)
	 * @return 콤마를 포함한 금액 ($)
	 */
	ValueFilter.regist("amtCnt", function(value) {
		return getCurrencyValue(value);
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 수익률(1.2000)
	 * @return '%'를 포함한 수익률
	 */
	ValueFilter.regist("ratePers", function(value) {
		//var	regex = /([0-9]{.+})/;
		var regex = /(^[+-]?\d{1,})/;
		var tmp = value.match(regex); 
		if (tmp != null) { 
			return getCurrencyValue(value) + "%";
		}
		throw new Error("'" + value + "'는 수익률 형식이 아닙니다."); 
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.(입력데이터가 주민번호인지 사업자번호인지 체크하여 변환처리한다.)
	 * @param 주민번호 or 사업자번호
	 * @return 마스킹 데이터
	 */
	ValueFilter.regist("regNo2", function(value) {
		var regex = "";
		if(value.length < 13) {
			regex = /([0-9]{3})(\-*)([0-9]{2})(\-*)([0-9]{5})/;
			var tmp = value.match(regex); 
			if (tmp != null) { 
				return tmp[1] + "-" + tmp[3] + "-" + tmp[5];
			}
		} else {
			return ValueFilter.convert("regNo",value);
		}
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 대출번호
	 * @return 마스킹 데이터
	 */
	ValueFilter.regist("lnNo", function(value) {
		var regex = /([0-9]{8})(\-*)([0-9]{5})/;
		var tmp = value.match(regex); 
		if (tmp != null) { 
			return tmp[1] + "-" + tmp[3];
		}
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 퇴직보험 계약번호
	 * @return 마스킹 데이터
	 */
	ValueFilter.regist("rtmtAgmtNo", function(value) {
		var regex = /((P)[0-9A-Z]{5})[0-9A-Z]{6}/;
		var tmp = value.match(regex);
		if (tmp != null) {
			return tmp[1] + "******";
		}
		throw new Error("'" + value + "'는 퇴직보험 계약번호 형식이 아닙니다.");	
	});
	
	/**
	 * @alias 자동차번호를 체크한다
	 * @param 입력된 자동차 번호
	 * @return true|false
	 */
	function validateCarNo(val) {
		var objCarNo = val;
		
		var isGoodNo = false;
		
		// 형식1 체크 : 한글2자 + 01~99 + 한글1자 + 00~99 + 00~99
		if(objCarNo.match(/[가-힣]{2}[0-9]{1}[0-9]{1}[가-힣]{1}[0-9]{4}/g) == objCarNo) {
			isGoodNo = true;
		}
		
		// 형식2체크 : 01~99 + 한글1자 + 00~99 + 00~99
		if(objCarNo.match(/[0-9]{1}[0-9]{1}[가-힣]{1}[0-9]{4}/g) == objCarNo) {
			isGoodNo = true;
		}
		
		// 형식3체크 : 임 + 숫자6자리
		if(objCarNo.match(/[임]{1}[0-9]{6}/g) == objCarNo) {
			isGoodNo = true;
		}
		
		return isGoodNo;
	}
		
	/**
	 * @alias class 에 정의된 데이터 변환을 실행한다. - 오류 무시
	 * @param areaId : 변환시킬 영역 입력값 없을시 전체 영역 조회
	 * @exp  fn_pageDataChange(); :전체 영역 변환,  fn_pageDataChange('areaId'); : ID 영역 안에만 변환 
	 */
	function fn_pageDataChange(areaId) { 
	 	// YYYYMMDD날짜형식을 YYYY-MM-DD로 변환
		
		if(areaId == undefined){
			
			//사업자번호 or 주민등록번호
			$(".td_regNo2").each(function(index) {
		   		try {
		    		$(this).text(ValueFilter.convert("regNo2", $(this).text()));
		   		} catch(e){}
		   	});
			
		   	$(".td_date").each(function(index) {
		   		try {
		    		$(this).text(ValueFilter.convert("date", $(this).text()));
		   		} catch(e){}
		   	});
			
			// 금액(원) , 처리
		   	$(".td_amtWon").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("amtWon", (($(this).text()).split(",").join("")).split("원").join("")));
		   		} catch(e){}
		   	});
		   	
		   	//금액(만원), 처리
		 	$(".td_amtMWon").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("amtMWon", (($(this).text()).split(",").join("")).split("만원").join("")));
		   		} catch(e){}
		   	});
			
			// 이율(%) 처리
		   	$(".td_ratePers").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("ratePers", $(this).text()));
		   		} catch(e){}
		   	});
		   	
		   	// 달러 콤마 처리
		   	$(".td_amtCnt").each(function(index) {
		   		try {
		   			$(this).text(ValueFilter.convert("amtCnt", ($(this).text()).split(",").join("")));
		   		} catch(e){}
		   	});
		   	
		   	// YYYYMMDD-YYYYMMDD날짜형식을 YYYY-MM-DD<br/>~YYYY-MM-DD로 변환
		   	$(".td_dateCust").each(function(index) {
		   		if($(this).text().length > 9) {
		   			try {
		   				$(this).html(ValueFilter.convert("date", $(this).text().substring(0,8)) + "<br/>~ " + ValueFilter.convert("date", $(this).text().substring(9)));
		   			} catch(e){}
		   		}
		   	});
		   	
		   	// YYYYMMDD-YYYYMMDD날짜형식을 YYYY-MM-DD~YYYY-MM-DD로 변환
		   	$(".td_dateCust2").each(function(index) {
		   		if($(this).text().length > 9) {
		   			try {
		   				$(this).html(ValueFilter.convert("date", $(this).text().substring(0,8)) + " ~ " + ValueFilter.convert("date", $(this).text().substring(9)));
		   			} catch(e){}
		   		}
		   	});
		   	
		 // 날짜 , 시분초
			$(".td_dateTime").each(function(index) {
		   		try {
		   			$(this).text(setFormatDateTime($(this).text(),"-",":"));
		   		} catch(e){}
		   	});
			
			// 날짜 (YYYYMMDD >> YYYY년 MM월 DD일)
		   	$(".td_dateko").each(function(index) {
		   		try {
		    		$(this).text(ValueFilter.convert("dateko", $(this).text()));
		   		} catch(e){}
		   	});				
		}else{
			//사업자번호 or 주민등록번호
			$("#"+areaId).find(".td_regNo2").each(function(index) {
		   		try {
		    		$(this).text(ValueFilter.convert("regNo2", $(this).text()));
		   		} catch(e){}
		   	});
			
			$("#"+areaId).find(".td_date").each(function(index) {
		   		try {
		    		$(this).text(ValueFilter.convert("date", $(this).text()));
		   		} catch(e){}
		   	});
			
			// 금액(원) , 처리
			$("#"+areaId).find(".td_amtWon").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("amtWon", $(this).text()));
		   		} catch(e){}
		   	});
		   	
		   	//금액(만원), 처리
			$("#"+areaId).find(".td_amtMWon").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("amtMWon", $(this).text()));
		   		} catch(e){}
		   	});
			
			// 이율(%) 처리
			$("#"+areaId).find(".td_ratePers").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("ratePers", $(this).text()));
		   		} catch(e){}
		   	});
		   	
		   	// 달러 콤마 처리
			$("#"+areaId).find(".td_amtCnt").each(function(index) {
		   		try {
		   			$(this).text(ValueFilter.convert("amtCnt", $(this).text()));
		   		} catch(e){}
		   	});
		   	
		   	// YYYYMMDD-YYYYMMDD날짜형식을 YYYY-MM-DD<br/>~YYYY-MM-DD로 변환
			$("#"+areaId).find(".td_dateCust").each(function(index) {
		   		if($(this).text().length > 9) {
		   			try {
		   				$(this).html(ValueFilter.convert("date", $(this).text().substring(0,8)) + "<br/>~ " + ValueFilter.convert("date", $(this).text().substring(9)));
		   			} catch(e){}
		   		}
		   	});
		   	
		   	// YYYYMMDD-YYYYMMDD날짜형식을 YYYY-MM-DD~YYYY-MM-DD로 변환
			$("#"+areaId).find(".td_dateCust2").each(function(index) {
		   		if($(this).text().length > 9) {
		   			try {
		   				$(this).html(ValueFilter.convert("date", $(this).text().substring(0,8)) + " ~ " + ValueFilter.convert("date", $(this).text().substring(9)));
		   			} catch(e){}
		   		}
		   	});
			
			// 날짜 , 시분초
			$("#"+areaId).find(".td_dateTime").each(function(index) {
		   		try {
		   			$(this).text(setFormatDateTime($(this).text(),"-",":"));
		   		} catch(e){}
		   	});
			
			// 날짜 (YYYYMMDD >> YYYY년 MM월 DD일)
			$("#"+areaId).find(".td_dateko").each(function(index) {
		   		try {
		    		$(this).text(ValueFilter.convert("td_dateko", $(this).text()));
		   		} catch(e){}
		   	});		   				
		}
		
		
	}

	/**
	 * @alias 주민번호를 이용한 만나이 범위 체크
	 * @param date 생년월일(YYYYMMDD)
	 * @param start 허용 만나이 시작
	 * @param end  허용 만나이 끝
	 */
	function ageCalculationRangeCheck(date,start,end) {
			    
	    var txtYear   = date.substring(0, 4);
	    var txtMm     = date.substring(4, 6);
	    var txtDd     = date.substring(6);
	    
	    var today   = new Date();
	    var month   = today.getMonth() + 1;
	    var day     = today.getDate();

	    var curYear     = today.getFullYear();
	    var curMonth    = ("" + month ).length == 1 ? "0" + ("" + month ) : ("" + month );
	    var curDay      = ("" + day).length         == 1 ? "0" + ("" + day ) : ("" + day);

	    var tmp_age     = curYear - txtYear     ;   // 현재 년- 생년
	    var mth         = txtMm ;                   // 생월
	    var daygab      = txtDd ;                   // 생일
	    var tmp_mth     = curMonth - mth        ;   //현재 월- 생월
	    var tmp_day     = curDay - daygab       ;   //현재 일- 생일

	    if(tmp_mth == 0) {
	        if (tmp_day < 0) {
	            tmp_age--;
	        }
	    }
	    else if (tmp_mth < 0) {
	        tmp_age--;
	    }
	    
	    var result = false;
	    
	    if(start<=tmp_age && end>=tmp_age){
	    	result = true;
	    }
	    
		return result;
	}
	
	
	/**
	 * @alias 주민번호를 이용한 만나이 계산
	 */
	function ageCalculation(date) {
	    if(date.length != 8) {
	    	alertPopup("생년월일 길이가 잘못 되었습니다.","ok",null);
	    	return;
	    }
	    
	    var txtYear   = date.substring(0, 4);
	    var txtMm     = date.substring(4, 6);
	    var txtDd     = date.substring(6);
	    
	    var today   = new Date();
	    var month   = today.getMonth() + 1;
	    var day     = today.getDate();

	    var curYear     = today.getFullYear();
	    var curMonth    = ("" + month ).length == 1 ? "0" + ("" + month ) : ("" + month );
	    var curDay      = ("" + day).length         == 1 ? "0" + ("" + day ) : ("" + day);

	    var tmp_age     = curYear - txtYear     ;   // 현재 년- 생년
	    var mth         = txtMm ;                   // 생월
	    var daygab      = txtDd ;                   // 생일
	    var tmp_mth     = curMonth - mth        ;   //현재 월- 생월
	    var tmp_day     = curDay - daygab       ;   //현재 일- 생일

	    if(tmp_mth == 0) {
	        if (tmp_day < 0) {
	            tmp_age--;
	        }
	    }
	    else if (tmp_mth < 0) {
	        tmp_age--;
	    }
	    
		return tmp_age;
	}
	
	/**
	 * @alias 생년월일(7자리) 이용한 만나이계산(YYMMDDG = YYMMDD(주민앞자리) + G(성별))
	 * @desc G = 1,2:국내1900년대생 남녀, 3,4:국내 2000년대생 남녀, 5,6:외국19000년대생 남녀, 7,8:외국2000년대생 남녀, (9,0:국내18000년대생 남녀 -> 0:태아로 변경)
	 */
	function ageCalculation4(date, inagInsStDt, msgYn){
		if(date.length != 7) {
			alertPopup("생년월일 길이가 잘못 되었습니다.","ok",null);
			return;
		}
		var brth = date.substring(0,6);
		var gender = date.substring(6,7);
		
		if(gender == 1 || gender == 2 || gender == 5 || gender == 6){
			brth = "19" + brth;
		}else if(gender == 0 || gender == 3 || gender == 4 || gender == 7 || gender == 8){
			brth = "20" + brth;
		}else if(gender == 9){
			brth = "18" + brth;
		}
		
		return ageCalculation2(brth, inagInsStDt, msgYn);
	}
	
	/**
	 * ??? 이 로직 이상함?! 사용하지 마세요.
	 * @alias 생년월일(6자리) 이용한 만나이계산
	 */
	function ageCalculation3(date, inagInsStDt, msgYn){
		var brth = date;
		if(date.substring(0,2) > 10 ){
			brth = "19" + brth;
		}else{
			brth = "20" + brth;
		}
		return ageCalculation2(brth, inagInsStDt, msgYn);
	}
	
	/**
	 * @alias 주민번호를 이용한 만나이 계산(책임개시일 기준)
	 */
	function ageCalculation2(date, inagInsStDt, msgYn) {
		if(date.length != 8) {
			if(msgYn != 'N'){
				alertPopup("생년월일 길이가 잘못 되었습니다.","ok",null);	
			}
			return;
		}
		if(inagInsStDt.length != 8) {
			if(msgYn != 'N'){
				alertPopup("보험책임개시일 길이가 잘못 되었습니다.","ok",null);
			}
			return;
		}
		
		var txtYear   = date.substring(0, 4);
		var txtMm     = date.substring(4, 6);
		var txtDd     = date.substring(6);
		
		var curYear     = inagInsStDt.substring(0, 4);
		var curMonth    = inagInsStDt.substring(4, 6);
		var curDay      = inagInsStDt.substring(6);
		
		var tmp_age     = curYear - txtYear     ;   // 책임개시일 년- 생년
		var mth         = txtMm ;                   // 책임개시일 월
		var daygab      = txtDd ;                   // 책임개시일 일
		var tmp_mth     = curMonth - mth;   		//책임개시일 월- 생월
		var tmp_day     = curDay - daygab;   		//책임개시일 일- 생일
		
		
		if(tmp_mth == 0) {
			if (tmp_day < 0) {
				tmp_age--;
			}
		}
		else if (tmp_mth < 0) {
			tmp_age--;
		}
		
		return tmp_age;
	}
	
	/**
	 * @alias 주민등록번호로 남녀성별 구하기 (1:남자, 2:여자, null 입력에러)
	 */
	function getSexCatByRegNo(regNo){
		var firstNum = 0;
		var retVal = "";
		if(regNo.length == 13){
			// 주민번호 전체가 넘어올때
			firstNum = regNo.substring(6,7);
		}else if(regNo.length == 7){
			// 주민번호 뒷자리만 넘어올때
			firstNum = regNo.substring(0,1);
		}
		if(firstNum > 0 && firstNum < 10){
			if(firstNum%2 == 1){
				// 홀수(1,3,5,7) : 남자
				retVal = "1";
			}else if(firstNum%2 == 0){
				// 짝수(2,4,6,8) : 여자
				retVal = "2";
			}			
		}
		return retVal;
	}
		
	/**
	 * 2016.03.07
	 * 사용금지(deprecated)!!!(validation.js isNumber와 충돌. validation.js isNaturalNumber 사용)
	 * 소수점이 필요하면  validation.js isDecimal 사용
	 * 
	 * @alias 숫자 여부 체크 (숫자 : true, 문자 : false)
	 */
	function isNumber(val) {
		if(isNaN(val) == true) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * @alias 주민번호 Date형으로 변환
	 * 주민번호 tip : 뒷자리중 첫째자리가 
	 *                1, 2 : 1900년대 출생자
	 *                3, 4 : 2000년대 출생자
	 *                9, 0 : 1800년대 출생자
	 *                5, 6 : 외국인 1900년대 출생자
	 *                7, 8 : 외국인 2000년대 출생자 
	 * @param regNo : 주민번호 13자리
	 * @param dateFormat : 데이트포맷(yyMMdd, yyyy-MM-dd, yy/MM/dd, yyyy년MM월dd일 .....)
	 * @return 문자열
	 * @author 정원석
	 */
	function regNoConvDateStr(regNo, dateFormat) {  
		var divInt = (parseInt(regNo.substring(6, 7)) + 1) / 2;
		var year = regNo.substring(0, 1) == "0" ? parseInt(regNo.substring(1, 2)) : parseInt(regNo.substring(0, 2));
		var month = regNo.substring(2, 3) == "0" ? parseInt(regNo.substring(3, 4)) : parseInt(regNo.substring(2, 4));
		var day = regNo.substring(4, 5) == "0" ? parseInt(regNo.substring(5, 6)) : parseInt(regNo.substring(4, 6));
		
		/* 인증 부분 on/off 영역 [start] */

		if(divInt == 5 || divInt == 0) { // 1800년대 출생자
			year = 1800 + year;
		} else if(divInt == 1 || divInt == 3) { // 1900년대 출생자
			year = 1900 + year;
		} else if(divInt == 2 || divInt == 4) { // 2000년대 출생자
			year = 2000 + year;
		} else { // 해당없으면 주민번호 불량
			return null;
		}
		
		/* ================= 주민번호 뒷자리 암호화 안했을 시 테스트용 ====================== */
		/*var aaa = parseInt(regNo.substring(6, 7));
		if( aaa == 1 || aaa == 2 ) {
			year = 1900 + year;
		}
		else if( aaa == 3 || aaa == 4 ) {
			year = 2000 + year;
		}*/
		/* ========================================================================================  */
		
		/* 인증 부분 on/off 영역 [end] */
		
		return $.format.date(new Date(year, month-1, day, 0, 0, 0), dateFormat);
	}
	
	/**
	 * @alias ie에서 new Date("2012-02-02")를 제대로 된 date로 생성
	 * @param dateStringInRange : dateStringType ex) 2008-12-12
	 * @return Date : 생성된 Date
	 * @author 정원석
	 */
	function getDate(dateStringInRange) {
		if(!dateStringInRange) {
			return new Date();
		}
		
	    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
	        date = new Date(NaN), month,
	        parts = isoExp.exec(dateStringInRange);

	    if(parts) {
	      month = +parts[2];
	      date.setFullYear(parts[1], month - 1, parts[3]);
	      if(month != date.getMonth() + 1) {
	        date.setTime(NaN);
	      }
	    }
	    return date;
	}
	
	/**
	 * @alias 팝업 차단 여부확인
	 * @param openWin : 팝업 객체
	 * @return true : 블록됨, false : 블록해제됨
	 * @author 강철
	 */
	function chkPopupBlock(openWin) {
		if(openWin == undefined || openWin == null || !openWin || openWin.closed || typeof openWin.closed=='undefined' || openWin.outerWidth == 0) {
		    return true;
		} else {
			return false;
		}
	}
	
	/**
	 * @alias 팝업 생성 함수(사이즈 조절 및 스크롤 셋팅 가능)
	 * @param url : 이동할 페이지주소
	 * @param name : 팝업창 이름
	 * @param width : 가로 사이즈
	 * @param height : 세로 사이즈
	 * @param scroll : 스크롤 여부(1: 스크롤 , no : 스크롤없음
	 */
	function goPopup(url, name, width, height, scroll){
		var scrollbars="yes";
		if(scroll == undefined || scroll == '') {
			scrollbars = "yes";
		} else {
			scrollbars = scroll; 
		}
		window.open(url, name, 'width='+width+', height='+height+', toolbar=no, menubar=no, scrollbars='+scrollbars+', status=no, resizable=no');
	}
	
	/** 파일업로드 셋팅
	 * @alias formId :  폼아이디
	 * @param 
	 */
	function fnUploadSet(formId){
		$("#"+formId).attr("action","/upload.do");
		$("#"+formId).ajaxForm({
			beforeSubmit: function (data,frm,opt){
				$.blockUI();
			},
			success: function(data){
				var fileData = JSON.parse(data); 
				//console.log("data::"+JSON.stringify(fileData));
				
				$.unblockUI();
				fnCompleUpload(fileData);
			},
			error:function(){
				$.unblockUI();
				alertPopup("업로드에 실패하였습니다. 다시 시도해 주세요.","ok",null);
			}
		});
	}

	/**
	 * @alias sms메세지 발송
	 * @param cnctNo : 수신자번호
	 * @param msgSendUsr : 발신자번호
	 * @param msgCnts : 발신 메세지
	 * @param msgDate : 발송예약시간 2015-05-15 11:06
	 */
	function fnSmsSend(cnctNo,msgSendUsr,msgCnts, msgDate) {
		var requestSmsVO;
		
		if(msgDate !="" && msgDate != undefined){
			requestSmsVO = {			
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts,
					msgDate : msgDate
			};
		}else{
			requestSmsVO = {			
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts
			};
		}
		
		$.blockUI();
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0111M02I", {
			data : requestSmsVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					$.unblockUI();
					alertPopup("SMS발송이 정상 처리 되었습니다.","ok",null);
					if($(".alertArea:visible").length > 0) {
						$(".alertArea:visible").find("a").attr("href","javascript:;");
					}
					
				}
			}
		});
	}

	/**
	 * @alias sms메세지 발송
	 * @param cnctNo : 수신자번호
	 * @param msgSendUsr : 발신자번호
	 * @param msgCnts : 발신 메세지
	 * @param msgDate : 발송예약시간 2015-05-15 11:06
	 */
	function fnSmsSendHist(cnctNo,msgSendUsr,msgCnts, executeTime, bzCd, sndType, menuId, msgDate) {
		var requestSmsVO;
		if(isNull(menuId)){
			menuId = this._menuId;
		}
		if(msgDate !="" && msgDate != undefined){
			requestSmsVO = {			
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts,
					msgDate : msgDate,
					executeTime : executeTime,
					bzCd : bzCd,
					sndType : sndType,
					menuId : menuId
			};
		}else{
			requestSmsVO = {			
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts,
					executeTime : executeTime,
					bzCd : bzCd,
					sndType : sndType,
					menuId : menuId
			};
		}
		
		$.blockUI();
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0111M05I", {
			data : requestSmsVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					$.unblockUI();
					alertPopup("SMS발송이 정상 처리 되었습니다.","ok",null);
					if($(".alertArea:visible").length > 0) {
						$(".alertArea:visible").find("a").attr("href","javascript:;");
					}
					
				}
			}
		});
	}	
	
	/**
	 * @alias sms메세지 발송
	 * @param cnctNo : 수신자번호
	 * @param msgSendUsr : 발신자번호
	 * @param msgCnts : 발신 메세지
	 * @param msgDate : 발송예약시간 2015-05-15 11:06
	 */
	function fnAppDnSmsSend(cnctNo,msgSendUsr,msgCnts, msgDate) {
		var requestSmsVO;
		
		if(msgDate !="" && msgDate != undefined){
			requestSmsVO = {			
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts,
					msgDate : msgDate
			};
		}else{
			requestSmsVO = {			
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts
			};
		}
		
		$.blockUI();
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0111M03I", {
			data : requestSmsVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					$.unblockUI();
					alertPopup("SMS발송이 정상 처리 되었습니다.","ok",null);
					if($(".alertArea:visible").length > 0) {
						$(".alertArea:visible").find("a").attr("href","javascript:;");
					}
					
				}
			}
		});
	}
	
	//카카오 알림톡; 자동차 4,6단계시 사용
	function fnSendKakao(cnctNo, msgSendUsr, msgCnts, backMsg, executeTime, bzCd, sndType, menuId){
		
		var reqKakaoVo = {			
					cnctNo : cnctNo,			// 수신자 전화번호
					msgSendUsr : msgSendUsr,	// 송신자 전화번호
					msgCnts : msgCnts,			// 송신 메시지
					backMsg : backMsg,			// 부달 메시지
					kakaoTpl : 'MTKK0244',		// 카톡템플릿 코드
					serviceCd : '1910027990',	//서비스코드. 현대해상 다이렉트 코드 사용필(알림톡개발가이드참고) 1910027990 단건발송, 1910028093 버튼형URL 브라우저로 열림
					executeTime : executeTime,
					bzCd : bzCd,
					sndType : sndType,
					menuId : menuId
			};
	
		HiJS.svr.doRequestAjax("DHCO0112M02I", {
			data : reqKakaoVo,
			loadingbar : true,
			callback : {
				success : function(responseObj) {
					alertPopup("발송이 정상 처리 되었습니다.","ok",null);
				}
			}
		});
	}
	
	

	
	/**
	 * @alias 알림톡 메세지 발송
	 * @param 
		arrData[0] = 수신자번호
		arrData[1] = LMS문구;
		arrData[2] = 알림톡문구;
		arrData[3] = 카톡템플릿 코드
		arrData[4] = 버튼명(실제로 사용안함-템플릿작성시 정한 명칭 사용);
		arrData[5] = 버튼URL. 
		arrData[6] = 세션키값;
		arrData[7] = DB매핑값;
		arrData[8] = 메뉴ID;
		arrData[9] = 발송구분코드;
	 */
	function fnKakaoSendHist(arr) {
		var requestSmsVO;
		
		var param = arr;
		for(var i =0; i<10; i++){
			if(param[i] == undefined){
				param[i]="";
			}
		}

		requestSmsVO = {			
				cnctNo : param[0],
				msgCnts : param[1],
				kakaoCnts : param[2],
				kakaoTpl : param[3],
				kkoBtnNm : param[4],
				kkoBtnUrl : param[5],
				executeTime : param[6],
				mappingNo : param[7],
				menuId : param[8],
				sndType : param[9]
				
		};
		
		
		$.blockUI();
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0111M06I", {
			data : requestSmsVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					$.unblockUI();
					alertPopup("발송이 정상 처리 되었습니다.","ok",null);
					if($(".alertArea:visible").length > 0) {
						$(".alertArea:visible").find("a").attr("href","javascript:;");
					}
					
				}
			}
		});
	}
	
	
	/** 
	 * @alias 콜미신청 레이어
	 * @param taskCode : 콜미구분코드
	 * @param callmeData : 콜미데이터 
	 */
	function openCallmeLayer(layerId ,taskCode, callmeData,target) {
		
		var $obj = $('#' + layerId);
		openLayer(layerId);
		
		$("#"+ layerId).find(".btnClose").attr("data-focus","#"+target);
		popupFocus();
		//상담신청 내용 구분
        $(document).on("change","input[name='_callmetask']",function(){
            var val = $(this).val();
            $(".insurance").hide();
            $(".insurance."+val).show();
        });
		
		// 전화번호 초기화
		$obj.find('[data-callmevo=telPart1], [data-callmevo=telPart2], [data-callmevo=telPart3]').val('');		
		// 히든 값 초기화
		 $("#"+layerId+"_telPart11").val(""); //자택 전화번호 1
		 $("#"+layerId+"_telPart12").val(""); //자택 전화번호 2
		 $("#"+layerId+"_telPart21").val(""); //직장 전화번호 1
		 $("#"+layerId+"_telPart22").val(""); //직장 전화번호 2
		 $("#"+layerId+"_telPart31").val(""); //휴대폰 전화번호 1
		 
		 if(layerId == '_callmeLayer'){
			 $("span[data-fakeform-index=0]").find('strong').text('휴대폰');
			 $obj.find('[data-callmevo=telType]').val('3');
			 $(".selectTelType").hide();
			 $(".selectTelType.hpTypeCon").show();
			 $("#"+layerId+"_telPart31").val(""); //휴대폰 전화번호 1
		 }else if(layerId == '_callmeLayerQuick'){
			 $("span[data-fakeform-index=5]").find('strong').text('휴대폰');
			 $obj.find('[data-callmevo=telType]').val('3');
			 $(".selectTelType").hide();
			 $(".selectTelType.hpTypeCon").show();
			 $("#"+layerId+"_telPart31").val(""); //휴대폰 전화번호 1
		 }
		
		// 전화번호 타입 변경처리
		$obj.find('[data-callmevo=telType]').change(function(e) {
			e.preventDefault();
			//휴대폰
			if ($(this).val() == '3') {
		        $(".selectTelType").hide();
		        $(".selectTelType.hpTypeCon").show();
				 $("#"+layerId+"_telPart31").val(""); //휴대폰 전화번호 1
			//직장
			}else if ($(this).val() == '2'){
		        $(".selectTelType").hide();
		        $(".selectTelType.jobTypeCon").show();
				$("#"+layerId+"_telPart21").val(""); //직장 전화번호 1
				$("#"+layerId+"_telPart22").val(""); //직장 전화번호 2
		        $("#"+layerId+"_telPart21").html("");
		        $("#"+layerId+"_telPart21").html(getOptionHtml('tel'));
		        selectChg();//select 변경건 반영
			//자택
			}else if ($(this).val() == '1'){
		        $(".selectTelType").hide();
		        $(".selectTelType.telTypeCon").show();
				 $("#"+layerId+"_telPart11").val(""); //자택 전화번호 1
				 $("#"+layerId+"_telPart12").val(""); //자택 전화번호 2
		        $("#"+layerId+"_telPart11").html("");
		        $("#"+layerId+"_telPart11").html(getOptionHtml('tel'));
		        selectChg();//select 변경건 반영
			} else {
		        $(".selectTelType").hide();
		        $(".selectTelType.telTypeCon").show();
		        $("#"+layerId+"_telPart11").html(getOptionHtml('tel'));
		        selectChg();//select 변경건 반영
			}
			$obj.find('[data-callmevo=telPart1], [data-callmevo=telPart2], [data-callmevo=telPart3]').val('');		
		});
		
		
		$obj.find("input[type=text]").keydown(function(event) {
			gf_checkTypes(this, 'NUMB', event);			
		});
		
		$(".alertArea .btnClose").click(function(){
			var obj_dim_zIndex = $(".dim_bg[id=common]").css("zIndex");
			$obj.css("zIndex",obj_dim_zIndex +2);
		})
		
		 
		// 상담신청버튼 클릭 	
		$obj.find("[data-callmeact=apply]").unbind('click');
		$obj.find("[data-callmeact=apply]").click(function() {
			//자택
			if($obj.find('[data-callmevo=telType]').val()=='1'){
				var telNo1 = $("#"+layerId+"_telPart11").val();
				var telNo2 = $("#"+layerId+"_telPart12").val();
				telNo1 = telNo1.trim();
				telNo2 = telNo2.trim();
				$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1);
				if(telNo2.length ==8 ){
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 4));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(4, 8));
				}else{
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(3));
				}
			}else if($obj.find('[data-callmevo=telType]').val()=='2'){
				var telNo1 = $("#"+layerId+"_telPart21").val();
				var telNo2 = $("#"+layerId+"_telPart22").val();
				telNo1 = telNo1.trim();
				telNo2 = telNo2.trim();

				$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1);
				if(telNo2.length ==8 ){
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 4));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(4, 8));
				}else{
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(3));
				}
			}else if($obj.find('[data-callmevo=telType]').val()=='3'){
				var telNo1 = $("#"+layerId+"_telPart31").val();
				telNo1 = telNo1.trim();
				if(telNo1.length == 11 ){
					$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo1.substring(3, 7));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo1.substring(7, 11));
				}else if(telNo1.length == 10){
					$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo1.substring(3, 6));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo1.substring(6, 10));
				}
			}else{
				var telNo1 = $("#"+layerId+"_telPart11").val();
				var telNo2 = $("#"+layerId+"_telPart12").val();
				
				telNo1 = telNo1.trim();
				telNo2 = telNo2.trim();
				$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1);
				if(telNo2.length ==8 ){
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 4));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(4, 8));
				}else{
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(3));
				}
			}
			if (!callmeValidate(layerId)) return;
			
			/* 전화가입상품 태깅 처리 - 김수진 */
			if("TM_HS_CALL" == taskCode){ // 주택화재상해보험
				webLogTagging('R10', '002');
			}else if("TM_LT_CALL" == taskCode){ // 하이운전자 보험
				webLogTagging('R11', '002');
			}
			
			
			
			// validation :taskCode : TM_LT_CALL(상담전화신청)
			if(layerId == '_callmeLayerQuick'){
				taskCode = $obj.find('[data-callmetask]:checked').data('callmetask');
			}
			
			if (taskCode == 'undefined' || taskCode == null || taskCode == '') {
				var curZIndex = $obj.css("zIndex")
				$obj.css("zIndex","2");
				alertPopup('상담신청 내용을 선택해 주세요',"ok",function(result){
					$obj.css("zIndex",curZIndex);
				});
				return;
			}
			
			
			// 콜미영역 항목값 JSON
			var callmeJson = getCallmeData(layerId);
			// 콜미신청 실행
			var callmeResult = callmeApply(taskCode, $.extend(callmeData, callmeJson));
			// 콜미결과별 처리
			if (callmeResult.result) {
				var alertText = '상담 신청이 완료 되었습니다.\n신청 팝업을 닫고 진행 중이던 화면으로 돌아갑니다.';
				var curZIndex = $obj.css("zIndex");
				$obj.css("zIndex","2");
				
				alertPopup(alertText,"ok",function(){
					$(".btn.line.m10h4.orange.ok").attr("data-focus","#"+target);
					closeLayer(layerId);
					$obj.css("zIndex",curZIndex);
					
					
				});
			} else {
				alertPopup(callmeResult.responseMessage,"ok", function(){
					$(".btn.orange:visible").focus();
				});
			}
		});		
		
	}
	
	//이륜차 산출이탈 체크
	function getStorageProdCd() {
		var result = '';
		//console.log('[common.js]_menuGb='+_menuGb+',storageProdCd='+sessionStorage.getItem("storageProdCd"));
		
		if(_menuGb == "4800000000"){
			result = '5407';
		}else if(_menuGb == "4500000000" && sessionStorage.getItem("storageProdCd") == "5407"){
			result = '5407';
		}else{
			result = '';
		}
		
		return result;		
	}

	/** 
	 * @alias 보험료계산 이탈레이어 
	 * @param gb : 콜미  TASK CODE
	 * @param callmeData : 콜미데이터
	 * @param conFnc : 보험료계산계속하기 버튼 함수
	 * @param prevLink : 이전링크URL  
	 * @param corpGb : 개인,법인 구분 - 1.개인 2.법인  
	 */
	function openCallmeLayerPC(gb, callmeData, conFnc, prevLink) {
		
		var layerId = '';
		var taskCode = '';
		
		if(gb == 'CAL_CALL'){ 

			// 세션 스토리지 custCat - 산출이탈 팝업을 자동차(개인)만 구분하기 위해서 사용
			if( sessionStorage.getItem("custCat") == "1" ){ // 자동차보험 개인용인 경우
				if(getStorageProdCd() == '5407'){
					layerId = '_callmeBreakwayLayer'; //이륜차만 적용
				}else{
					layerId = '_callmeBreakwayLayerMT_psn';
				}
			} else { // 자동차보험 법인 외 기타 상품 ( 일반운전자 등에서 사용 ) 
				// 자동차보험 법인
				if(_menuGb == "4500000000") {
					layerId = '_callmeBreakwayLayerMT_corp';
				}
				else {
					layerId = '_callmeBreakwayLayerMT';
				}
			}
	
		}else if(gb == 'FG_CALL'  &&  _menuGb == "5200000000" ){
			
			console.log("해외여행보험");
			layerId = '_callmeBreakwayLayerGITR';   // 해외여행보험
		}else if(gb == 'L_FG_CALL'){
			
			console.log("장기체류보험");
			//인수단계 이후는 팝업 변경
			if(_menuId == "cf36533567" || _menuId == "910ec488ae" || _menuId == "c5ba31f951" || _menuId == "5360fed210"){
				layerId = '_callmeBreakwayLayerGILTRINSU';   // 장기체류보험
			}
			//인수단계 이전
			else{
				layerId = '_callmeBreakwayLayerGILTR';   // 장기체류보험
			}
			
		}else if(gb == 'LT_CALL' || gb == "CC_CALL" || gb == "HT_CALL" || gb == "FM_CALL"){
			console.log("장기운전자보험");
			layerId = '_callmeBreakwayLayerLT';   // 운전자, 암, 건강, H주택화재
		}else if(getToday() <= '20221230' && gb == 'PN_CALL'){
			
			console.log("연금보험");
			layerId = '_callmeBreakwayLayerPN';   // 연금보험(단기이벤트로 인한 날짜 처리)
		}else if(gb == 'CH_CALL'){
			
			console.log("장기어린이보험");
			layerId = '_callmeBreakwayLayerLT';   // 장기어린이보험
		}else{
			layerId = '_callmeBreakwayLayer';			
		}
		
		//console.log('[common.js] gb='+gb+', _menuGb='+_menuGb+', layerId='+layerId+', storageProdCd='+sessionStorage.getItem("storageProdCd"));
		
		taskCode = gb;

		//openLayer(layerId,'common');
		comm_ui_util.commlayerPopup(layerId);
		if(layerId == '_callmeBreakwayLayerMT'){
			$('#' + layerId).css("top",50);
		} else if(layerId == '_callmeBreakwayLayerMT_psn'){
			$('#' + layerId).css("top",50);
		}
		
		// 상품소개동의 세팅
		getTermsInfoCallme(layerId);
		// 콜미기본정보 세팅
		//callmeCommonAct(taskCode, layerId, callmeData);
		
		// 보험료계산 계속하기 기능추가
		$('#' + layerId).find("[data-callmeact=continue]").unbind('click.aa');		
		$('#' + layerId).find("[data-callmeact=continue]").click(function() {
			//closeLayer();
			comm_ui_util.commlayerClosePopup();
			if (typeof(conFnc) == 'function') {
				conFnc();
			}			
		});

		//하단 이벤트 배너 (단순 팝업 닫기 기능)
		var $html_eventBanner = $('#' + layerId).find('.eventBanner a');
		$html_eventBanner.unbind('click.eventBanner');
		$html_eventBanner.on('click.eventBanner', function(){
			comm_ui_util.commlayerClosePopup();	
			if (typeof(conFnc) == 'function') {
				conFnc();
			}
		});
		
		/* 이벤트 신규(정규화 장미정- 201810) 산출이탈레이어 이미지 정보적용 */
		var common_session_info = comm_ui_util.getSessionObj();
	    if(!comm_ui_util.isNull(common_session_info)){
	      var val_evntLayerImg   = common_session_info.evntLayerImg;
	      var val_evntLayerTitle   = common_session_info.evntLayerTitle;
	      
	      if(val_evntLayerImg != null) {
	    	  $html_eventBanner.append("<img src='"+val_evntLayerImg+"' alt='"+val_evntLayerTitle+"' />");
	      }
	    }

		// 자보 이탈레이어 링크URL 변경
		if (gb == 'CAL_CALL') {
			// 홈버튼 링크URL
			var homelink = '/';
			if (prevLink && prevLink != '') {
				homelink = prevLink;
			}
			
			// 상담신청버튼 클릭 (신청후링크변경)
			$('#' + layerId).find("[data-callmeact=apply]").unbind('click.aa');
			$('#' + layerId).find("[data-callmeact=apply]").click(function() {
				
				var hpNo = $('#' + layerId).find("#hpNo").val().trim();
	
				
				if(hpNo.length == 11 ){
					$('#' + layerId).find('[data-callmevo=telPart1]').val(hpNo.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart2]').val(hpNo.substring(3, 7));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(hpNo.substring(7, 11));
				}else if(hpNo.length == 10){
					$('#' + layerId).find('[data-callmevo=telPart1]').val(hpNo.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart2]').val(hpNo.substring(3, 6));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(hpNo.substring(6, 10));
				}
				
			
				// validation
				if (!callmeValidate(layerId)) return;
				
				if(!$('#' + layerId).find('#agreeYS').prop('checked')){				
					var curLayerZIndex =  parseInt($('#' + layerId).css("zIndex"));
					$('#' + layerId).css("zIndex",curZIndex-2);
					alertPopup('개인정보 수집/이용에 동의해주세요.',"ok",function(){
						$("#agreeYS").focus();
					});
					$('#' + layerId).css("zIndex",curZIndex);
					$("body").animate({"scrollTop":$(".alertArea").offset().top -50},0)
					return;
				}	

				// 콜미영역 항목값 JSON
				var callmeJson = getCallmeData(layerId);
				// 콜미신청 실행
				var callmeResult = callmeApply(taskCode, $.extend(callmeData, callmeJson));
				// 콜미결과별 처리
				var curZIndex = $('#' + layerId).css("zIndex");
				var alertText = '상담 신청이 완료 되었습니다. 보험료 계산을 종료합니다.'
				
				if (callmeResult.result) {
					$('#' + layerId).css("zIndex","2");
					alertPopup(alertText,"ok",function(){
						comm_ui_util.commlayerClosePopup();
						$('#' + layerId).css("zIndex",curZIndex);
						document.location.href = homelink;
					});
					$("body").animate({"scrollTop":$(".alertArea").offset().top -50},0)						
					
				} else {
					$('#' + layerId).css("zIndex","2");
					alertPopup(callmeResult.responseMessage,"ok",function(){
						comm_ui_util.commlayerClosePopup();
						$('#' + layerId).css("zIndex",curZIndex);
					});
				}			
			});
			// 홈버튼 링크			
			//$('#' + layerId).find("[data-callmelink=home]").attr('href', homelink);				
		}else{
			callmeCommonAct(taskCode, layerId, callmeData);
		}
	}
	
	
	function setAlertOnPop(object){
		var alertText = "";
		alertText = '상담 신청이 완료 되었습니다.\n신청 팝업을 닫고 진행 중이던 화면으로 돌아갑니다.'
	
		var curZIndex = object.css("zIndex");
		object.css("zIndex","2");
		alertPopup(alertText,"ok",function(){		
			comm_ui_util.commlayerClosePopup();
			object.css("zIndex",curZIndex);
		});
		//$("body").animate({"scrollTop":$(".alertArea").offset().top -50},0)
	}
	
	function getTermsInfoCallme(layerId){
		var rtnObj_list;
		var requestSmsVO = {};
        requestSmsVO.insProdCd = "TM000001";

        HiJS.svr.doRequestAjax("DHCO0310M04S", {  //ajax 
            data : requestSmsVO,
            loadingbar : false,
            async :false,
            callback : {
                success : function(responseObj) {
                    rtnObj_list = responseObj.data.dhco0310voList;

                    var $suntaek   = $(".agreeBox.callmeBreakwayAgree:eq(0) ul"); //(선택)상품 소개를 위한 동의 영역
                    
                    //이륜차 예외처리
                    if(getStorageProdCd() == '5407' && layerId == '_callmeBreakwayLayer'){
    					$suntaek = $(".checkAllSet > .agreeBox.callmeBreakwayAgree:eq(0) ul");
                    }
                    
                    $suntaek.html(""); //(선택)상품 소개를 위한 동의 초기화
                    
					var suntaekArray = new Array();

                    for (var i = 0; i < rtnObj_list.length; i++) {

                        if(rtnObj_list[i].delYn == "N"){ //삭제 대상이 아닌것만
                        	var cntnMgntId 				=  rtnObj_list[i].cntnMgntId;
                            var val_title               =  rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, "");; //동의 제목
                            var val_cntnOptCat          =  rtnObj_list[i].cntnOptCat; //컨텐츠 옵션구분 코드
                            var val_radio_id_yes        =  rtnObj_list[i].cntnMgntId + "_1"; //[동의] id 
                            var $li_new                 = $("<li/>");
                            
                            //BFZZ07 --> 마케팅동의 관련 보종별 indexOf("07") 로 전부 예외처리 되어있음 따라서 공통에서 수정 처리
                            if(rtnObj_list[i].cntnMgntId == 'BFZZ01'){
                            	cntnMgntId = "agreeYS";
                            	val_radio_id_yes = "agreeYS";
                            }

                            
                            /* 
                             * [ (필수) 개인(신용)정보 처리 동의 ] 부분 처리  
                             */
                            var $new_li_div1         =  $('<div/>').attr({class: 'titArea'}).appendTo($li_new);
                            var $new_li_div1_span    =  $('<span/>').attr({class : 'txt'}).text(val_title).appendTo($new_li_div1);
                            var $new_li_div1_a       =  $('<a/>').attr({href:'#none', class:'btn callme', title:'자세히보기', style:'left: 300px;', code:rtnObj_list[i].cntnMgntId}).appendTo($new_li_div1);
                            var $new_li_div1_a_span  =  $('<span/>').text('자세히보기').appendTo($new_li_div1_a);
							
							if(rtnObj_list[i].cntnMgntId != "BFZZ00"){
								var $new_li_div2        =  $('<div/>').attr({class : 'agreeRadio'}).appendTo($li_new);
								var $new_li_div2_div1   =  $('<div/>').attr({class : 'radio'}).appendTo($new_li_div2);
								
								var $new_li_div2_div1_input =  $('<input/>').attr({type:'radio', name: cntnMgntId, id: val_radio_id_yes, class: 'yes' , value: 'Y' }).appendTo($new_li_div2_div1);
								var $new_li_div2_div1_label = $('<label/>').attr({for: val_radio_id_yes}).html('동의함').appendTo($new_li_div2_div1);
								
							}

                       		if(rtnObj_list[i].cntnMgntId.indexOf('BFZZ') >= 0){
                                // [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우
                       			if(rtnObj_list[i].cntnMgntId == "BFZZ00" || rtnObj_list[i].cntnMgntId == "BFZZ01"){
                       				suntaekArray.push($li_new);
	                       		}
                            }
                        }
                    }
					
					// 선택동의
					if(suntaekArray.length > 0){
						$.each(suntaekArray, function(idx, value){
							$suntaek.append(value);
						});
					}


            		// 개인(신용)정보의 수집·이용동의 선택시 가입권유 모두 동의
            		$(document).on("click", "input[id=agreeYS]", function(){
            			$("#callmeAgreeSelect1").val("Y");
            			$("#callmeAgreeSelect2").val("Y");
            			$("#callmeAgreeSelect3").val("Y");
            			$("#callmeAgreeSelect4").val("Y");
            		});
            		
                    /* 
                     * 자세히 보기 이벤트 --> commonUtil.js 의  .btn.small2 버튼 이벤트와 겹침으로 .btn.callme css 추가하여 별도 처리
                     */
                    $(".btn.callme").off('click');
                    $(".btn.callme").on('click', function(){    
                    	var termlayerPop = "<div class='layerPopWrap w520' id='callmeTermlayerPop' style='display:none;'><div class='titleArea'><h2></h2></div><div class='popupContentArea'><div class='popAgreeScroll'></div><div class='btnAreaWrap tac mt20'><a href='#none' class='btn line inlineBlock orange'><span>확인</span></a></div></div><a href='#none' class='btnClose'><img src='https://direct.hi.co.kr/images/common/btn_popup_close.png' alt='닫기'></a></div>"
                        var val_code = $(this).attr('code');
                        /* 
                         * trim 처리 
                         */
                        val_code = $.trim(val_code);
                        for (var i = 0; i < rtnObj_list.length; i++) {
                            
                            if(rtnObj_list[i].cntnMgntId == val_code){
                            	//var $popHtml = comm_ui_util.commlayerPopup('termlayerPop', function(){ });
                            	
                            	/* 
                            	 *	openCallmeLayerPC 해당 팝업을 comm_ui_util.commlayerPopup 로 호출하여 [termlayerPop 자세히보기] 팝업 호출 시 comm_ui_util.commlayerPopup 으로 중복 팝업 호출 불가
                            	 *	따라서, [termlayerPop 자세히보기] 팝업을 해당 div에 append 하여 comm_ui_util.commlayerPopup 이 아닌 openLayer 팝업으로 처리
                            	*/
                            	
                            	$("#" + layerId).append(termlayerPop);
                            	openLayer("callmeTermlayerPop");
                            	
                            	var $popHtml = $("#callmeTermlayerPop");
                                
                                $popHtml.find(".btnClose").attr("data-focus","[code="+val_code+"]" );
                                $popHtml.find(".btn.orange").attr("data-focus","[code="+val_code+"]");
                                popupFocus();
                                
                                $popHtml.find('.titleArea h2').html(rtnObj_list[i].title.replace(/\[([^0-9]*)\]/g, ""));                          //제목
                                $popHtml.find(".popAgreeScroll").html(rtnObj_list[i].cnts); //내용 
                                
                                // 필수, 선택동의 내용 PC/모바일 공통 DB조회 --> 2021.05 동의내용 개편에 따른 PC/모바일 구분 처리
                                $popHtml.find("#agreeWeb").show();
                                $popHtml.find("#agreeMob").hide();
                            	
                                // 선택동의이고, [상품소개 선택 동의] 개인(신용) 정보의 수집·이용에 관한 사항인 경우만. 자동차 제외
                                if (rtnObj_list[i].cntnMgntId == "BFZZ01") {
                                	
                                    if($("#callmeAgreeSelect1").val() != "Y"){
                                    	$("#agreeTel").prop("checked", false);
                                    }
                                    if($("#callmeAgreeSelect2").val() != "Y"){
                                    	$("#agreeSms").prop("checked", false);
                                    }
                                    if($("#callmeAgreeSelect3").val() != "Y"){
                                    	$("#agreeEmail").prop("checked", false);
                                    }
                                    if($("#callmeAgreeSelect4").val() != "Y"){
                                    	$("#agreePost").prop("checked", false);
                                    }
                                    
                                    $("#agreeCntnMgntId").val(rtnObj_list[i].cntnMgntId);
                                }
                                
                                $("#callmeTermlayerPop").css("top", Math.max(0, (($(window).height() - $("#callmeTermlayerPop").outerHeight()) / 4) + $(window).scrollTop()) + "px");
                                $popHtml.find(".btn.line.inlineBlock.orange").off('click.orange');
                                $popHtml.find(".btn.line.inlineBlock.orange").on('click.orange', function() {
                                	if ($("#agreeCntnMgntId").val() != undefined && $("#agreeCntnMgntId").val() == "BFZZ01"){
                                		var chkVal = 0;
                                		// 전화
                                		$("#callmeAgreeSelect1").val("Y");
                                		if (!$("#agreeTel").prop("checked")) {
                                			$("#callmeAgreeSelect1").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 문자
                                		$("#callmeAgreeSelect2").val("Y");
                                		if (!$("#agreeSms").prop("checked")) {
                                			$("#callmeAgreeSelect2").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 이메일
                                		$("#callmeAgreeSelect3").val("Y");
                                		if (!$("#agreeEmail").prop("checked")) {
                                			$("#callmeAgreeSelect3").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 전화
                                		$("#callmeAgreeSelect4").val("Y");
                                		if (!$("#agreePost").prop("checked")) {
                                			$("#callmeAgreeSelect4").val("N");
                                			chkVal++;
                                		}
                                		
                                		// 선택동의 미동의 확인 (선택동의만 .suntaek)                         		
                                		if($("#agreeWeb .suntaek.agreeRadio.fr :radio.no").is(":checked")){
                                			$(".callmeBreakwayAgree:eq(0) :radio[value=Y]").prop("checked", false);
                                			closeLayer("callmeTermlayerPop");
                                		}else{
                                			if(chkVal == 4){
                                    			alertPopup('가입권유 연락방식을 1개 이상 선택해주시기 바랍니다.',"ok",function(){
                                    				$(".callmeBreakwayAgree:eq(0) :radio[value=Y]").prop("checked", false);
                                    			});
                                    		}else{
                                    			$(".callmeBreakwayAgree:eq(0) :radio[value=Y]").prop("checked", true);
                                    			closeLayer("callmeTermlayerPop");
                                    		}
                                		}
                                		
                                	}else{
                                		closeLayer("callmeTermlayerPop");
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
	}
	
	/** 
	 * @alias 콜미신청 레이어의 기본정보 세팅
	 * @param taskCode : 콜미구분코드
	 * @param layerId : 콜미영역ID  
	 * @param callmeData : 콜미데이터 
	 */
	function callmeCommonAct(taskCode, layerId, callmeData) {
		var $obj = $('#' + layerId);
		var homelink = '/';
		
		
		$obj.find("#hpNo").unbind('click');
		$obj.find("#hpNo").keydown(function(event) {
			gf_checkTypes(this, 'NUMB', event);			
		});
		
			
		 
		// 상담신청버튼 클릭
		$obj.find("[data-callmeact=apply]").unbind('click');
		$obj.find("[data-callmeact=apply]").click(function() {
			// validation
			
			var hpNo = $obj.find("#hpNo").val().trim();
			
			if(hpNo.length == 11 ){
				$obj.find('[data-callmevo=telPart1]').val(hpNo.substring(0, 3));
				$obj.find('[data-callmevo=telPart2]').val(hpNo.substring(3, 7));
				$obj.find('[data-callmevo=telPart3]').val(hpNo.substring(7, 11));
			}else if(hpNo.length == 10){
				$obj.find('[data-callmevo=telPart1]').val(hpNo.substring(0, 3));
				$obj.find('[data-callmevo=telPart2]').val(hpNo.substring(3, 6));
				$obj.find('[data-callmevo=telPart3]').val(hpNo.substring(6, 10));
			}
			
			if (!callmeValidate(layerId)) return;	
			if(!$obj.find('#agreeYS').prop('checked')){				
				var curZIndex = $obj.css("zIndex");
				$obj.css("zIndex","2");
				alertPopup('개인정보 수집/이용에 동의해주세요.',"ok",function(){		
					$('#agreeYS').focus();
					$obj.css("zIndex",curZIndex);
				});
				//$("body").animate({"scrollTop":$(".alertArea").offset().top -50},0)
				return;
			}
			
			
			


			// 콜미영역 항목값 JSON
			var callmeJson = getCallmeData(layerId);
			// 콜미신청 실행
			var callmeResult = callmeApply(taskCode, $.extend(callmeData, callmeJson));
			// 콜미결과별 처리
			if (callmeResult.result) {
				setAlertOnPop($obj);
			} else {
				var curZIndex = $obj.css("zIndex");
				$obj.css("zIndex","2");
				alertPopup(callmeResult.responseMessage,"ok",function(){
					comm_ui_util.commlayerClosePopup();
					$obj.css("zIndex",curZIndex);
				});
			}
		});
	}
	
	
	
	
	
	
	/** 
	 * @alias 콜미신청 Validation Check
	 * @param  areaId : 콜미신청 영역ID
	 * @return  boolean
	 */
	function callmeValidate(areaId) {
		var result = true;
		var layerId = areaId;
		
		// 항목 체크타입에 따른 검사
		var $obj = $('#' + areaId);
		$obj.find('[data-validtype]').each(function() {
			var $self = $(this);
			var types = $(this).data('validtype').split(' ');
			var inputval = $(this).val();
			
			$.each(types, function(idx, type) {
				if (functions[type](inputval) == false) {
					var zIndex = $obj.css("zIndex");
					$obj.css("zIndex",(parseInt(zIndex)-2)+"");
					alertPopup($self.attr("title") + messages[type],"ok",function(){
								
				if(layerId == '_callmeLayer'){
						 
					if($obj.find('[data-callmevo=telType]').val()=='1'){
						$("#_callmeLayer_telPart12").focus();
					}else if($obj.find('[data-callmevo=telType]').val()=='2'){
						$("#_callmeLayer_telPart22").focus();
					}else if($obj.find('[data-callmevo=telType]').val()=='3'){
						$("#_callmeLayer_telPart31").focus();	 
					}
						 
				}else if(layerId == '_callmeLayerQuick'){
							
					if($obj.find('[data-callmevo=telType]').val()=='1'){
						$("#_callmeLayerQuick_telPart12").focus();	 
					}else if($obj.find('[data-callmevo=telType]').val()=='2'){
						$("#_callmeLayerQuick_telPart22").focus();		 
					}else if($obj.find('[data-callmevo=telType]').val()=='3'){
						$("#_callmeLayerQuick_telPart31").focus();		 
					}
							
				}
						
						
					$obj.css("zIndex",zIndex);
					$self.focus();
				});
					//$("body").animate({"scrollTop":$(".alertArea").offset().top -50},0)
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
	
		return result;
	}

	/** 
	 * 
	 * @alias 콜미신청영역의 요소값에 대한 JSON 생성
	 * @param  areaId : 콜미신청 영역ID
	 * @return JSON  
	 */
	function getCallmeData(areaId) {
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
	function callmeApply(taskcode, jsondata) {
		var callmedata = {taskCode : taskcode || 'CAL_CALL'};
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
			callback:{
				success:function(data) {
					
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

	
	
	/** 
	 * @alias 계약관리 상담신청 레이어
	 * @param taskCode : 콜미구분코드
	 * @param callmeData : 콜미데이터 
	 */
	function openCallmeLayerMY(taskCode, callmeData) {
		HiJS.svr.doRequestAjax('DHMY0010M11S', {
			async:false,
			loadingbar:false,
			callback:{
				success:function(resultObj) {
					// openLayer
					var layerId = '_callmeLayerMY';
					
					openLayer(layerId);
					callmeData = {
						telType : "3",
						telPart1 : resultObj.data.cipm0026VO.tcntTelAraNoHphn1,
						telPart2 : resultObj.data.cipm0026VO.tcntTelTxNoHphn1,
						telPart3 : resultObj.data.cipm0026VO.tcntTelSeqNoHphn1
					};
					emailData = {
						name : resultObj.data.cizz0007VO.ptyKorNm,
						emailId : resultObj.data.cipm0026VO.tcntElecAddr,
						emailDomain : resultObj.data.cipm0026VO.tcntElecAddrDomain
					};
					// 상담신청기본정보 세팅
					callmeCommonActMY(taskCode, layerId, callmeData, emailData);
				},
				failure:function(data) {		
					var code = data.header.responseCode;
					var message = data.header.responseMessage;
					result =  {result:false, responseCode:code, responseMessage:message.replace('[' + code + '] ', '')};
				}
			}
		});		
	}
	
	/** 
	 * @alias 상담신청 레이어의 기본정보 세팅
	 * @param taskCode : 콜미구분코드
	 * @param layerId : 콜미영역ID  
	 * @param callmeData : 콜미데이터 
	 * @param emailData : 이메일데이터 
	 */
	function callmeCommonActMY(taskCode, layerId, callmeData, emailData) {
		$('.div_callmeEmail').show();
		$('.div_callmeTel').hide();
		$('#rdo_reqMail').attr("checked",true);
		var $obj = $('#' + layerId);
		
		$obj.find('#mailLayer_subject, #mailLayer_content').val('');
		$obj.find('#mailLayer_addr, #mailLayer_domain, #mailLayer_selDomain').val('');
		$obj.find('#mailLayer_domain').attr('disabled',false);
		$obj.find('.accCount').text('0');
		
		// textarea 입력문자 글자수 계산
		$obj.find('#mailLayer_content').unbind('keyup');
		$obj.find('#mailLayer_content').bind('keydown keyup focus', function(){
			if($(this).val().length > 1000) {
				$(this).val(($(this).val()).substring(0,1000));
				$obj.find('.accCount').text($(this).val().length);
			} else {
				$obj.find('.accCount').text($(this).val().length);
			}
		});
		
		// 이메일 콤보박스 변경
		$obj.find('#mailLayer_selDomain').unbind('change');
		$obj.find('#mailLayer_selDomain').bind('change',function() {
			$("#mailLayer_domain").val($(this).val());
			if($(this).val() == "") {
				$("#mailLayer_domain").attr("disabled",false);
			} else {
				$("#mailLayer_domain").attr("disabled",true);
			}
		});
		
		
		// 이름, 이메일정보 세팅
		if (emailData) {
			if (emailData.name) {			
				$obj.find('.callmeName').text(emailData.name);
			}
			if (emailData.emailId) {
				$obj.find('#mailLayer_addr').val(emailData.emailId);
			}
			if (emailData.emailDomain) {			
				$obj.find('#mailLayer_domain, #mailLayer_selDomain').val(emailData.emailDomain);
				if($obj.find('#mailLayer_selDomain').val() == "") {
					$obj.find('#mailLayer_domain').attr("disabled",false);
				} else {
					$obj.find('#mailLayer_domain').attr("disabled",true);
				}
			}		
		}
		
		// 전화번호 기본정보 세팅
		if (callmeData) {
			if (callmeData.telPart1) {			
				$obj.find('[data-callmevo=telPart1]').val(callmeData.telPart1);
			}
			if (callmeData.telPart2) {
				$obj.find('[data-callmevo=telPart2]').val(callmeData.telPart2);
			}
			if (callmeData.telPart3) {			
				$obj.find('[data-callmevo=telPart3]').val(callmeData.telPart3);
			}		
		}
		// 상담신청버튼 클릭
		$obj.find("[data-callmeact=apply]").unbind('click');
		$obj.find("[data-callmeact=apply]").click(function() {
			if(!$("#mailLayer_agreeSel01").attr("checked")) {
				alertPopup('개인(신용)정보의 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.',"ok",null);
				return false;
			}
			if($("#rdo_reqCall").attr("checked")) { // 콜미신청
				// validation
				if (!callmeValidate(layerId)) return;
				// 콜미영역 항목값 JSON
				var callmeJson = getCallmeData(layerId);
				// 콜미신청 실행
				var callmeResult = callmeApply(taskCode, $.extend(callmeData, callmeJson));
				// 콜미결과별 처리
				if (callmeResult.result) {
					alertPopup('상담신청이 완료되었습니다.',"ok",null);
					closeLayer();
				} else {
					alertPopup(callmeResult.responseMessage,"ok",null);
				}
			} else { // 이메일 상담신청
				// validation
				if (!emailValidate(layerId)) return;
				
				$('#emailFrm > input[name=cvappEmal]').val($("#mailLayer_addr").val()+"@"+$("#mailLayer_domain").val());
				$('#emailFrm > input[name=titl]').val($("#mailLayer_subject").val());
				$('#emailFrm > input[name=aplCnts]').val($("#mailLayer_content").val());
				$('#emailFrm > input[name=cvappMpNo]').val(callmeData.telPart1 + "" + callmeData.telPart2 + callmeData.telPart3);
				
				// 이메일 상담신청 실행
				var emailResult = emailApply('emailFrm');
				// 이메일 상담신청 결과 처리
				if (emailResult.result) {
					alertPopup('상담신청이 완료되었습니다.',"ok",null);
					closeLayer();
				} else {
					alertPopup(emailResult.responseMessage,"ok",null);
				}

				
				
			}
		});
	}

	/** 
	 * @alias 계약관리 이메일상담신청 Ajax
	 * @param frmId : 이메일 from ID
	 * @param {result:boolean, responseCode:string, responseMessage:string}
	 */
	function emailApply(frmId) {
		var result = {result:true, responseCode:'', responseMessage:''};
		HiJS.svr.doRequestAjax('DHCU0600M01S', {
			formId:frmId,
			async:false,
			loadingbar:false,
			callback:{
				success:function(data) {
					var code = data.data.rtnCd;
					var message = data.data.rtnMsg;
					if(code == "2") {
						result =  {result:false, responseCode:code, responseMessage:message.replace('[' + code + '] ', '')};
					}
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
	/** 
	 * @alias 콜미신청 Validation Check
	 * @param  areaId : 콜미신청 영역ID
	 * @return  boolean
	 */
	function emailValidate(areaId) {
		var $obj = $('#' + areaId);
		
		var result = true;
		$obj.find('.vEmal').each(function() {
			if ($(this).val() == "") {
				alertPopup($(this).attr("title") + messages["vNotNull"],"ok",null);
				 $(this).focus();
				 result = false;
				 return false;
			} 
		});
			
		if (!result) {
			return false;
		}

		return result;
	}
	
	/** 
	 * @alias 입력문자 바이트수 계산
	 * @param str : 문자
	 * @return 바이트수 
	 */
	function gf_getByte(str) {
		var resultSize = 0;
		if(str == null) {
			return 0;
		}
		for(var i=0;i<str.length;i++){
			var c = str[i].charCodeAt();
			if(c >= 0x0080 && c <= 0xFFFF) {
				resultSize += 2;
			} else {
				resultSize++;
			}
		}
		return resultSize;
	}

	
	/** 
	 * @alias 웹이력등록 Ajax
	 * @param taskcode : TASK 구분코드
	 * @param jsondata : {contactSerial:웹이력순번(숫자),policyNo:청약/계약번호, custNo:주번,  plateNo:차량번호, executeTime:자보/운보세션키}
	 * @param {result:boolean, responseCode:string, responseMessage:string, contactSerial:웹이력순번(number)}
	 */
	function insWebHist(taskcode, jsondata) {
		if (!taskcode || taskcode == '') {
			return;
		}
		
		jsondata.taskCode = taskcode;
		var result = {result:true, responseCode:'', responseMessage:'', contactSerial:0};
		HiJS.svr.doRequestAjax('DHCO0120M01I', {
			data:jsondata,
			async:false,
			loadingbar:false,
			callback:{
								success:function(data) {
									result.contactSerial = data.data.nContactSerial;
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
	
	/** 
	 * @alias 화면 마지막으로 스크롤 이동
	 * @param divId : 레이어 아이디 (레이어 아이디와 레이어안에 scrollY class 있을경우 레이어의 스크롤을 맨 밑으로 이동
	 */
	function fnScrollEnd(divId){
		if (divId) {
			var html = "<div id=\"_scrollEnd_" + divId +"\"></div>";
			if($("#_scrollEnd_" + divId).length == 0){
					$("#"+divId).find(".scrollY").append(html);
			}	
			
			var pos = $("#_scrollEnd_" + divId).position().top;
			$("#"+divId+",.scrollY").animate({scrollTop:pos},'slow');
		} else {
			var html = "<div id='_scrollEnd'></div>";
			if($("#_scrollEnd").length == 0){
					$('body').append(html);
			}
			var pos = $('#_scrollEnd').position().top;
			$("html,body").animate({scrollTop:pos},'slow');
		}
	}
	
	/** 
	 * @alias OS 및 브라우저 체크 전역변수
	 */	
	var checkWebOS = {
		ie : navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") >= 0),
	  	ff : (navigator.userAgent.indexOf('Mozilla')==0) && (navigator.appName=='Netscape') && (navigator.userAgent.indexOf('Navigator') > -1)==false && (navigator.userAgent.lastIndexOf('Firefox') > -1),
		ns : (navigator.userAgent.lastIndexOf('Gecko') > -1) && (navigator.userAgent.indexOf('Navigator') > -1),
	  	sf : (navigator.userAgent.lastIndexOf('Safari') != -1) && (navigator.userAgent.lastIndexOf('Chrome') != -1)==false,
	  	op : (navigator.userAgent.match('Opera') == 'Opera') || (navigator.userAgent.match('OPR') == 'OPR'),
	  	cr : (navigator.userAgent.match('Chrome') == 'Chrome') && (navigator.userAgent.match('Safari')=='Safari') && (navigator.userAgent.match('Opera') != 'Opera') && (navigator.userAgent.match('OPR') != 'OPR'),
	  	win : (navigator.platform.toLowerCase().indexOf('win32') != -1) || (navigator.platform.toLowerCase().indexOf('win64') != -1),
	  	win9x : (navigator.userAgent.indexOf('Windows 98')!=-1) || (navigator.userAgent.indexOf('Win98') != -1) || (navigator.userAgent.indexOf('Windows ME') != -1) || (navigator.userAgent.indexOf('Windows NT 4.0') != -1),
	  	mac : (navigator.userAgent.indexOf('Mac') != -1),
	  	lnx64 : ((navigator.userAgent.indexOf('Linux') != -1) && ((navigator.userAgent.toLowerCase().indexOf('x86_64') != -1) || (navigator.userAgent.toLowerCase().indexOf('ia_64') != -1) || (navigator.userAgent.toLowerCase().indexOf('ppc_64') != -1))),
	  	lnx32 : ((navigator.userAgent.indexOf('Linux') != -1) && ((navigator.userAgent.toLowerCase().indexOf('i386') != -1) || (navigator.userAgent.toLowerCase().indexOf('i686') != -1))),
	  	lnx : (navigator.userAgent.indexOf('Linux') != -1),
	 	and : (navigator.userAgent.match('Android')=='Android'),
	  	iph : (navigator.userAgent.match('iPhone')=='iPhone'),
	  	mob : (navigator.platform == 'Windows Mobile')
	};
	/** 
	 * @alias 베라포트로 보안 솔루션 설치 여부 확인
	 */
	function installWinSolution(){
		var isInstalled = true;
		
		var axInfoList = vp_getAxInfoList();
		if (axInfoList == null) return false;

		try {
			for(var i=0;i<axInfoList.length;i++) {	    	   
				var axInfo = vp_getAxInfo(axInfoList, axInfoList[i].objectname);
				var isProgram = axInfo.objectName;
				 if(axInfo.installStatus == false && isProgram != "CxReport6" ){
					 isInstalled = false;
				 }
			}
		}catch (e) {
		}
	      
		return isInstalled;
	}
	
	/** 
	 * @alias 콜미신청 퀵메뉴 레이어
	 * @param taskCode : 콜미구분코드
	 * @param callmeData : 콜미데이터 
	 */
	function openCallmeLayerQuick() {
		// 레이어오픈
		var layerId = '_callmeLayerQuick';
		var $obj = $('#' + layerId);
		openLayer(layerId);
		
		
		/////////// 기본정보 초기화 ////////////////////////
		// 콜미기본정보 세팅
		//callmeCommonAct('', layerId);
		// 전화번호 초기화
		$obj.find('[data-callmevo=telPart1], [data-callmevo=telPart2], [data-callmevo=telPart3]').val('');		
		// 가상 값 초기화
		 $("#"+layerId+"_telPart11").val(""); //자택 전화번호 1
		 $("#"+layerId+"_telPart12").val(""); //자택 전화번호 2
		 $("#"+layerId+"_telPart21").val(""); //직장 전화번호 1
		 $("#"+layerId+"_telPart22").val(""); //직장 전화번호 2
		 $("#"+layerId+"_telPart31").val(""); //휴대폰 전화번호 1
		 /////////////////////////////////////////////////
		
		//상담신청 내용 구분
        $(document).on("change","input[name='_callmetask']",function(){
            var val = $(this).val();
            $(".insurance").hide();
            $(".insurance."+val).show();
        });
		/////////////////////////////////////////////////////
		// 전화번호 타입 변경처리
		$obj.find('[data-callmevo=telType]').change(function(e) {
			e.preventDefault();
			
			//휴대폰
			if ($(this).val() == '3') {
		        $(".selectTelType").hide();
		        $(".selectTelType.hpTypeCon").show();
				 $("#"+layerId+"_telPart31").val(""); //휴대폰 전화번호 1
				
			//직장
			}else if ($(this).val() == '2'){
		        $(".selectTelType").hide();
		        $(".selectTelType.jobTypeCon").show();
				$("#"+layerId+"_telPart21").val(""); //직장 전화번호 1
				$("#"+layerId+"_telPart22").val(""); //직장 전화번호 2
		        $("#"+layerId+"_telPart21").html("");
		        $("#"+layerId+"_telPart21").html(getOptionHtml('tel'));
		        selectChg();//select 변경건 반영
			//자택
			}else if ($(this).val() == '1'){
		        $(".selectTelType").hide();
		        $(".selectTelType.telTypeCon").show();
				 $("#"+layerId+"_telPart11").val(""); //자택 전화번호 1
				 $("#"+layerId+"_telPart12").val(""); //자택 전화번호 2
		        $("#"+layerId+"_telPart11").html("");
		        $("#"+layerId+"_telPart11").html(getOptionHtml('tel'));
		        selectChg();//select 변경건 반영

			} else {
		        $(".selectTelType").hide();
		        $(".selectTelType.telTypeCon").show();
		        $("#"+layerId+"_telPart11").html(getOptionHtml('tel'));
		        selectChg();//select 변경건 반영
			}
			// 전화번호 초기화
			$obj.find('[data-callmevo=telPart1], [data-callmevo=telPart2], [data-callmevo=telPart3]').val('');		
			// 가상 값 초기화
			 
		});
		 
		////////////////////////////////////////////////////////////////
		// 상담신청버튼 클릭 처리	
		$obj.find("[data-callmeact=apply]").unbind('click');
		$obj.find("[data-callmeact=apply]").click(function() {
			if (!callmeValidate(layerId)) return;
			///////////////////////////////////////////////////
			//hidden 값 세팅
			//자택
			if($obj.find('[data-callmevo=telType]').val()=='1'){
				var telNo1 = $("#"+layerId+"_telPart11").val();
				var telNo2 = $("#"+layerId+"_telPart12").val();
				
				telNo1 = telNo1.trim();
				telNo2 = telNo2.trim();
				$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1);
				if(telNo2.length ==8 ){
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 4));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(4, 8));
				}else{
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(3));
				}
			}else if($obj.find('[data-callmevo=telType]').val()=='2'){
				var telNo1 = $("#"+layerId+"_telPart21").val();
				var telNo2 = $("#"+layerId+"_telPart22").val();
				
				telNo1 = telNo1.trim();
				telNo2 = telNo2.trim();

				$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1);
				if(telNo2.length ==8 ){
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 4));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(4, 8));
				}else{
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(3));
				}
			}else if($obj.find('[data-callmevo=telType]').val()=='3'){
				var telNo1 = $("#"+layerId+"_telPart31").val();
				
				
				telNo1 = telNo1.trim();
				if(telNo1.length == 11){
					$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo1.substring(3, 7));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo1.substring(7, 11));
				}else if(telNo1.length == 10){
					$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo1.substring(3, 6));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo1.substring(6, 10));
				}else{
					alertPopup('연락처 형식을 다시 한번 확인해 주세요',"ok",null);
					$("#"+layerId+"_telPart31").focus();
				}
			}else{
				var telNo1 = $("#"+layerId+"_telPart11").val();
				var telNo2 = $("#"+layerId+"_telPart12").val();
				
				telNo1 = telNo1.trim();
				telNo2 = telNo2.trim();
				$('#' + layerId).find('[data-callmevo=telPart1]').val(telNo1);
				if(telNo2.length ==8 ){
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 4));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(4, 8));
				}else{
					$('#' + layerId).find('[data-callmevo=telPart2]').val(telNo2.substring(0, 3));
					$('#' + layerId).find('[data-callmevo=telPart3]').val(telNo2.substring(3));
				}
			}
			
			
			// validation
			var taskCode = $obj.find('[data-callmetask]:checked').data('callmetask');
			if (taskCode == 'undefined' || taskCode == null || taskCode == '') {
				alertPopup('상담신청 내용을 선택해 주세요',"ok",null);
				return;
			}
			
			
			// 콜미영역 항목값 JSON
			var callmeJson = getCallmeData(layerId);
			// 콜미신청 실행
			var callmeResult = callmeApply(taskCode, callmeJson);
			// 콜미결과별 처리
			if (callmeResult.result) {
				var curZIndex = $obj.css("zIndex")
				$obj.css("zIndex","2");
				alertPopup('상담 신청이 완료 되었습니다.\n신청 팝업을 닫고 진행 중이던 화면으로 돌아갑니다.',"ok",function(result){
					closeLayer(layerId);	
					$obj.css("zIndex",curZIndex);
				});				
			} else {
				alertPopup(callmeResult.responseMessage,"ok",null);
			}
		});		
	}
	
	
	
	
	/** 
	 * @alias 보험상품 전화번호 정보 반환
	 * @param sesskey 세션키
	 * @return {telType:'', telPart1:'', telPart2:'', telPart3:''}
	 */	
	function getCMTelNo(sesskey) {
		var xec = true;
		if (typeof(document.XWCDataPlugin) == 'undefined') {
			xec = false;
		}
		var returnObj = {telType:'', telPart1:'', telPart2:'', telPart3:''};
		HiJS.svr.doRequestAjax('DHCO0901M01S', {
			data:{executeTime:sesskey},
			async:false,
			loadingbar:false,
			xecure:xec,
			callback:{success:function(result) {
								returnObj.telType = result.data.telCat;
								returnObj.telPart1 = result.data.telNo1;
								returnObj.telPart2 = result.data.telNo2;
								returnObj.telPart3 = result.data.telNo3;
							 },
							 failure:function(result) {		
									returnObj.telType = '';
									returnObj.telPart1 = '';
									returnObj.telPart2 = '';
									returnObj.telPart3 = ''; 
							 }
							}
		});	
		
		return returnObj;
	} 

	/**
	 * @alias 보험나이 계산
	 * @param curYYYYMMDD : 보험시작일자 (ex : 20130804)
	 * @param rsn : 생년월일 (ex : 19860804)
	 * @return number
	 */
	function ageCalIns(curYYYYMMDD, rsn) {
		try {
			var rsnYYYYMMDD = ""+rsn;
			
			var v_curYYYY = parseInt(curYYYYMMDD.substring(0, 4), 10);
			var v_curMM	  = parseInt(curYYYYMMDD.substring(4, 6), 10);
			var v_curDD	  = parseInt(curYYYYMMDD.substring(6, 8), 10);
                                                                
			var v_rsnYYYY = parseInt(rsnYYYYMMDD.substring(0, 4), 10);
			var v_rsnMM   = parseInt(rsnYYYYMMDD.substring(4, 6), 10);
			var v_rsnDD   = parseInt(rsnYYYYMMDD.substring(6, 8), 10);

			var v_yy  = v_curYYYY - v_rsnYYYY;	// 현재 년- 생년
			var v_mm  = v_curMM - v_rsnMM;	//현재 월- 생월
			var v_dd  = v_curDD - v_rsnDD;	//현재 일- 생일

			var v_age = 0;
			
			if(v_mm > 6) {
				v_age = v_yy + 1;
			} else if(v_mm == 6) {
				if(v_dd < 0) {
					v_age = v_yy;
				} else {
					v_age = v_yy + 1;
				}
			} else if(v_mm == -6) {
				if(v_dd < 0) {
					v_age = v_yy - 1;
				} else {
					v_age = v_yy;
				}
			} else if(v_mm < -6) {
				v_age = v_yy - 1;
			} else {
				v_age = v_yy;
			}
			return v_age + "";

		} catch(e) {
			//alert(e.description);
		}
	}
	
	/**
	 * @alias 평생계좌 제외
	 * @param bnkCd : 은행코드 
	 * @param actNo : 계좌번호
	 * @param phoneNum : 계약자전화번호
	 */
	function checkAllLifeActNo(bnkCd, actNo, phoneNum) {
		var len = actNo.length;
		var fnum = "";
		if(bnkCd == "003"){ //기업은행
			if(len == "10" || len == "11"){
				return false;
			}
		}else if(bnkCd == "088"){ //신한은행
			if(len >= "10" && len <= "14"){
				fnum = actNo.substring(0,1);
				if(fnum == "0"){
					return false;
				}
			}
		}else{
			if(actNo == phoneNum){
				return false;
			}
		}
		
		return true;
	}
	
	function getBankNm(cd){

		if(cd =="001"){
			retVal = "한국은행";
		}else if(cd =="002"){
			retVal = "산업은행";
		}else if(cd =="003"){
			retVal = "기업은행";
		}else if(cd =="004"){
			retVal = "국민은행";
		}else if(cd =="005"){
			retVal = "KEB하나(외환)";
		}else if(cd =="006"){
			retVal = "주택은행";
		}else if(cd =="007"){
			retVal = "수협중앙회";
		}else if(cd =="008"){
			retVal = "수출입은행";
		}else if(cd =="009"){
			retVal = "장기신용";
		}else if(cd =="011"){
			retVal = "농협은행";
		}else if(cd =="012"){
			retVal = "단위농협";
		}else if(cd =="013"){
			retVal = "농협13";
		}else if(cd =="014"){
			retVal = "농협14";
		}else if(cd =="015"){
			retVal = "농협15";
		}else if(cd =="016"){
			retVal = "축협중앙회";
		}else if(cd =="017"){
			retVal = "축협단위";
		}else if(cd =="020"){
			retVal = "우리은행(한빛)";
		}else if(cd =="022"){
			retVal = "상업은행";
		}else if(cd =="023"){
			retVal = "SC은행";
		}else if(cd =="024"){
			retVal = "한일은행";
		}else if(cd =="025"){
			retVal = "서울은행";
		}else if(cd =="026"){
			retVal = "신한은행";
		}else if(cd =="027"){
			retVal = "씨티은행(한미)";
		}else if(cd =="028"){
			retVal = "동화은행";
		}else if(cd =="028"){
			retVal = "동화은행";
		}else if(cd =="029"){
			retVal = "동남은행";
		}else if(cd =="030"){
			retVal = "대동은행";
		}else if(cd =="031"){
			retVal = "대구은행";
		}else if(cd =="032"){
			retVal = "부산은행";
		}else if(cd =="033"){
			retVal = "충청은행";
		}else if(cd =="034"){
			retVal = "광주은행";
		}else if(cd =="035"){
			retVal = "제주은행";
		}else if(cd =="036"){
			retVal = "경기은행";
		}else if(cd =="037"){
			retVal = "전북은행";
		}else if(cd =="038"){
			retVal = "강원은행";
		}else if(cd =="038"){
			retVal = "경남은행";
		}else if(cd =="039"){
			retVal = "충북은행";
		}else if(cd =="040"){
			retVal = "강원은행";
		}else if(cd =="045"){
			retVal = "새마을금고";
		}else if(cd =="048"){
			retVal = "신용협동조합";
		}else if(cd =="050"){
			retVal = "상호저축은행";
		}else if(cd =="052"){
			retVal = "CMB";
		}else if(cd =="071"){
			retVal = "우체국";
		}else if(cd =="072"){
			retVal = "체신72";
		}else if(cd =="073"){
			retVal = "체신73";
		}else if(cd =="074"){
			retVal = "체신74";
		}else if(cd =="076"){
			retVal = "신용보증";
		}else if(cd =="077"){
			retVal = "기술보증";
		}else if(cd =="081"){
			retVal = "KEB하나";
		}else if(cd =="082"){
			retVal = "보람은행";
		}else if(cd =="088"){
			retVal = "평화은행";
		}else if(cd =="083"){
			retVal = "통합신한은행";
		}else if(cd =="0AA"){
			retVal = "이체기관전체";
		}else{
			retVal = "";
		}
		
		return retVal;
		
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
	function getBirthDate(regNo, dateFormat) {  
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
	
	
	/***
	 * 웹로그 태깅처리
	 * @param type1
	 * @param type2
	 */
	function webLogTagging(type1, type2){
		
	//	console.log('type1 : ' + type1 + ', type2 : ' + type2);
		if(typeof(_BT_get_simple_inline_tag) != 'undefined'){
			_BT_get_simple_inline_tag( type1, type2 );
		}
	}
	
	/**
	 * @alias 한글금액 표기
	 * @param value
	 * @author JSK
	 * EX) korAmtNum1(50) 5만원
	 *       korAmtNum1(550) 5십5만원
	 */
	function korAmtNum1(value){
		if(value == undefined)  return;

		if(value == 0){
			han_value = '0';
		}else{
			var arrNumberWord = new Array("", "1", "2", "3", "4", "5", "6", "7", "8", "9");
			var arrDigitWord = new Array("", "십", "백", "천");
			var arrManWord = new Array("", "만", "억", "조");
			
			var num_value = (parseFloat(value) * 1000) + '';
			var num_length = num_value.length;
			
			var han_value = "";
			var man_count = 0;
			
			for (i = 0; i < num_length; i++) {
				var strTextWord = arrNumberWord[num_value.charAt(i)];
				
				if (strTextWord != "") {
					man_count++;
					strTextWord += arrDigitWord[(num_length - (i + 1)) % 4];
				}
				
				if (man_count != 0 && (num_length - (i + 1)) % 4 == 0) {
					man_count = 0;
					strTextWord = strTextWord + arrManWord[(num_length - (i + 1)) / 4];
				}
				
				han_value += strTextWord;			
			}
			han_value += "원";
		}
		return han_value;
	}

	/**
	 * @alias 만원단위 한글 표기
	 * @param value
	 * @author JSK
	 * EX) korAmtNum1(50) 5만원
	 *       korAmtNum1(550) 55만원
	 */
	function korAmtNum2(value){
		var msg;
		var amt = String(value);

		if(value == undefined)  return;

		if(value == 0){
		    msg = '0';
		}else{									
		    var num_value = Math.floor((parseFloat(value) * 0.1)) * 10000 + '';
		    var inputNumber = num_value < 0 ? false : num_value;
		    var unitWords = ['','만', '억 ', '조 ', '경 '];
		    var splitUnit = 10000;
		    var splitCount = unitWords.length;
		    var resultArray = [];
		    var resultString = '';

		    for (var i=0; i <splitCount; i++){
		        var unitResult = (inputNumber % Math.pow(splitUnit, i+1)) / Math.pow(splitUnit, i);
		        unitResult = Math.floor(unitResult);
		        if(unitResult > 0){
		            resultArray[i] = unitResult;
		        } 
		    }

		    for (var i=0; i <resultArray.length; i++){
		        if(!resultArray[i]) continue;
		        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
		    }
		    msg = resultString.replace(" ","");
		    if(value > 0 || value != undefined){
		    	msg+="원";
		    }
		}
		
		return msg
	}

	function numberFormat(val){
		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	/**
	 * @alias  고객명 마스킹처리<br>
	 * ex) 홍*길, 선**녀, 정**나래, PIAO ****QING
	 * @param strCustName	: 고객명
	 * @author JSK
	 * 
	 */
	function maskingName(strCustName){
		
		var originName = strCustName.split('');
		if(strCustName.length > 2 && strCustName.length <= 4){
			originName.forEach(function(name, i){
					if( i === 0 || i === originName.length -1)
						return;
					originName[i] = '*';
					
			});
			var joinName = originName.join();
			return joinName.replace(/,/g, '');
		}else if(strCustName.length > 3 && strCustName.length <= 5){
			originName.forEach(function(name, i){
					if( i === 0 || i > originName.length -3)
						return;
					originName[i] = '*';
					
			});
			var joinName = originName.join();
			return joinName.replace(/,/g, '');
		}else if(strCustName.length > 5 && strCustName.length < 12){
			originName.forEach(function(name, i){
				if( i === 0 || i > originName.length -3)
						return;
					originName[i] = '*';
					
			});
			var joinName = originName.join();
			return joinName.replace(/,/g, '');
		}else if(strCustName.length > 5 && strCustName.length >= 12){
			originName.forEach(function(name, i){
				if( i <= 3 || i > originName.length -5)
						return;
					originName[i] = '*';
					
			});
			var joinName = originName.join();
			return joinName.replace(/,/g, '');
		}else{
			var pattern = /.$/;
			return strCustName.replace(pattern, '*');
		}
	}
	
	/**
	 * @alias  휴대폰번호 마스킹처리<br>
	 * ex) 010-***-9999, 010-****-9999
	 * @param strPhoneNo	: 휴대폰번호
	 * @author JSK
	 * 
	 */
	function maskingPhone(strPhoneNo){
	
		var phoneStr = "";
		var maskingStr = "";
		
		if(isNull(strPhoneNo) == true){
			return strPhoneNo;
		}	
		
		if(strPhoneNo.split('-').length != 3){ //case1. 번호에 - 없경우
			phoneStr = strPhoneNo.length < 11 ? strPhoneNo.match(/\d{10}/gi) : strPhoneNo.match(/\d{11}/gi);

			if(strPhoneNo.length < 11){ //010xxxzzzz
				maskingStr = strPhoneNo.replace(/([0-9]{3})([0-9]{3})([0-9]{4})/, '$1***$3')
			}else{ //010xxxxzzzz
				maskingStr = strPhoneNo.replace(/([0-9]{3})([0-9]{4})([0-9]{4})/, '$1****$3')
			}
		}else{ //case2. 번호에 - 있는경우
			phoneStr = strPhoneNo.match(/\d{2,3}-\d{3,4}-\d{4}/gi);

				if(/-[0-9]{3}-/.test(phoneStr)){
					maskingStr = strPhoneNo.replace(/-[0-9]{3}-/g, "-***-");
				}else if(/-[0-9]{4}-/.test(phoneStr)){
					maskingStr = strPhoneNo.replace(/-[0-9]{4}-/g, "-****-");
				}
		}
		
		return maskingStr;
	}
	
	/**
	 * @alias  자동차번호  마스킹처리<br>
	 * ex) 52주 **19
	 * @param strAutoNo	: 자동차번호
	 * @author JSK
	 * 
	 */
	function maskingCarAutoNo(strAutoNo){
		
		if(isNull(strAutoNo) == true){
			return strAutoNo;
		}	
		
		var autoNolength = strAutoNo.length;
		var maskingAutoNo = "";
		var middleMask = "";
		
		if(autoNolength <= 7){ //차량번호
			middleMask = strAutoNo.substring(0, autoNolength-5);
		}else if(autoNolength > 15){	//차대번호
			middleMask = strAutoNo.substring(0, autoNolength-10);
		}else {	//차량번호 신규
			middleMask = strAutoNo.substring(0, autoNolength-6);
		}
		
		var dot = "";
		for (var i = 0; i < middleMask.length; i++) {
			dot += "*";
		}
		
		//차량번호 - 마지막 2개번호의 앞2자리 / 차대번호 - 앞뒤 5자리 제외
		if(autoNolength <= 7){
			maskingAutoNo = strAutoNo.substring(0,3) + middleMask.replace(middleMask, dot) + strAutoNo.substring(autoNolength-2, autoNolength);				
		}else if(autoNolength > 15){
			maskingAutoNo = strAutoNo.substring(0,5) + middleMask.replace(middleMask, dot) + strAutoNo.substring(autoNolength-5, autoNolength);	
		}else {
			maskingAutoNo = strAutoNo.substring(0,4) + middleMask.replace(middleMask, dot) + strAutoNo.substring(autoNolength-2, autoNolength);	
		}
		
		return maskingAutoNo;
	}
	
	/**
	 * @alias  계약번호  마스킹처리<br>
	 * ex) L2008****123, M2011****123
	 * @param strAgmtNo	: 계약번호
	 * @author JSK
	 * 
	 */
	function maskingAgmtNo(strAgmtNo){
		
		if(isNull(strAgmtNo) == true){
			return strAgmtNo;
		}	
		
		var agmtNolength = strAgmtNo.length;
		var maskingAgmtNo = "";
		
		//계약번호의 6번째부터 4자리
		maskingAgmtNo = strAgmtNo.substring(0,5) + "****" + strAgmtNo.substring(9, agmtNolength);	
		
		return maskingAgmtNo;
	}
	
	/**
	 * @alias  은행계좌번호  마스킹처리<br>
	 * ex) 1749******6707, 3333******8863, 010****3245
	 * @param strAgmtNo	: 계약번호
	 * @author JSK
	 * 
	 */
	function maskingAccountNo(strAccountNo){
		
		if(isNull(strAccountNo) == true){
			return strAccountNo;
		}	
		
		var accountNolength = strAccountNo.length;
		var maskingAccountNo = "";
		var middleMask = "";
		
		if(strAccountNo.substring(0,3) == "010"){ //전화번호 계좌
			middleMask = strAccountNo.substring(0, accountNolength-7);
		}else {	//계좌번호
			middleMask = strAccountNo.substring(0, accountNolength-8);
		}
		
		var dot = "";
		for (var i = 0; i < middleMask.length; i++) {
			dot += "*";
		}
		
		
		//앞/뒤4자리 제외 (단 전화번호 계좌는 전화번호 기준 준용)
		if(strAccountNo.substring(0,3) == "010"){
			maskingAccountNo = strAccountNo.substring(0,3) + middleMask.replace(middleMask, dot) + strAccountNo.substring(accountNolength-4, accountNolength);	
		}else{
			maskingAccountNo = strAccountNo.substring(0,4) + middleMask.replace(middleMask, dot) + strAccountNo.substring(accountNolength-4, accountNolength);	
		}
		
		return maskingAccountNo;
	}
	
	
	/**
	 * @alias  고객 생년월일 8자리 정합성 체크<br>
	 * @param birthDate	: ex) 20201231
	 * @return boolean
	 * @author JSK
	 */
	function birthDayChk(birthDate, callback){
		var result = false;
		var today = new Date();
		var yearNow = today.getFullYear();
		var year = Number(birthDate.substr(0,4));
		var month = Number(birthDate.substr(4,2));
		var day = Number(birthDate.substr(6,2));
				
 		if(birthDate.length <= 7){
 			alertPopup("생년월일을 확인해주세요","ok", callback);
			return false;		
		}else if(birthDate.length >= 8){
			if(birthDate.length > 8){
				alertPopup("생년월일을 확인해주세요","ok", callback);
				return false;				
			}else if(1900 > year || year > yearNow){
				alertPopup("생년월일을 확인해주세요","ok", callback);
				return false;
			}else if(month < 1 || month > 12){
				alertPopup("생년월일을 확인해주세요","ok", callback);
				return false;				
			}else if(day < 1 || day > 31){
				alertPopup("생년월일을 확인해주세요","ok", callback);
				return false;				
			}else if((month == 4 || month == 6 || month == 9 || month == 11) && day == 31){
				alertPopup("생년월일을 확인해주세요","ok", callback);
				return false;		
			}else if(month == 2){
				var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
				if(day > 29 || (day ==29 && !isleap)){ //윤년체크
					alertPopup("생년월일을 확인해주세요","ok", callback);
					return false;							
				}else{
					result = true;
				}
			}else{
				result = true;
			}
		}
		return result;
	}
	
	/**
	 * @alias 고객의 이전 인증 수단 확인(로컬스토리지)
	 * @param ptyId :당사자ID
	 * @return 인증 수단
	 * @author 심흥무 2021.09.30
	 */
	function certMeth(ptyId){
		var loadDoc = localStorage.getItem("certMethod");
		
		var rtnData = "";
		try{
			if(loadDoc !=null){
				var pasData = JSON.parse(loadDoc);
				
				var vals = Object.keys(pasData).map(function(e){
						return pasData[e];
					
				});
				
				for(var i=0; i<Object.keys(pasData).length; i++){
					if(Object.keys(pasData)[i] == ptyId){
						rtnData= vals[i];
					}
				}
			}else{
				rtnData="";
			}
		}catch(e){}
		return rtnData;
	}
	
	var certMethod =["HP","PUB","KKO","PIN"];//핸드폰인증,공동인증,카카오인증
	/**
	 * @alias 고객의 이전 인증 수단 셋팅
	 * @param gubun:GI:일반,LT:장기
	 * 			ptyId :당사자ID
	 * @return 인증 수단 셋팅
	 * @author 심흥무 2021.09.30
	 */ 
	function certMethSet(gubun,ptyId,pinViewGb){
		
		var certMethVal = certMeth(ptyId);
		//console.log("certMethVal==>"+certMethVal);
		try{
			//PIN인증 등록고객일경우, PIN인증 초기 세팅
			if(pinViewGb == '00'){
				console.log("pinViewGb ==> "+ pinViewGb);
			}else {
				if(certMethod !=null && certMethod !=""){
			 		/*
					if(gubun=="GI"||gubun=="LT"){
					//if(gubun=="LT"){
			 			certMethod =["HP","PUB","KKO"];//핸드폰인증,공동인증,카카오인증
			 		}
			 		*/
			 		for(var i=0; i<certMethod.length; i++){	//certMethod는 common.js에 설정되어있음 ({"HP","PUB","KKO"})
			 			if(certMethVal==certMethod[i]){
			 				$(".itemList").children("li:eq("+i+")").children().click();
			 			}
			 			
			 		}
			 	}
			}
		}catch(e){}
	}