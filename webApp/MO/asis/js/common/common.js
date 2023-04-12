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
					return tmp[1] + "-" + tmp[3].substring(0, 1) +"******";
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
				var regex2 = /((S)[0-9A-Z]{6})[0-9A-Z]{1,8}/; // S200403C0000632(적하보험) 추가
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
	
	var layerList_que = [];
	
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
		if (start != -1) {
			start += key.length;
			var end = cookies.indexOf(';', start);
			if (end == -1) end = cookies.length;
			value = cookies.substring(start, end);
		}
		return  unescape(value);
	}
	
	/**
	 * @alias 금액을 콤마(,)가 포함된 포맷으로 변환한다.
	 * @param n : 변환전 금액
	 */
	function getCurrencyValue(n) {
		n = parseFloat(n);
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		n += '';                          // 숫자를 문자열로 변환
		
		while (reg.test(n)) {
			n = n.replace(reg, '$1' + ',' + '$2');
		}
		
		if (n == 'NaN') {
			n = '';
		}
		return n;
	}
	
	/**
	 * @alias 날짜 포맷팅
	 * @param str : 날짜 변수  
	 * @param key : 포맷팅할 특수기호 ( / , - )
	 */
	function setFormatDate( str, key ){
		var val = "";
		if (str == null || str.length > 8) {
			alert("8자리가 아닙니다.");
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
			alert("14자리가 아닙니다.");
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
				alert("입력가능한 글자수를 초과하였습니다.");
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
			alert("입력가능한 글자수를 초과하였습니다.");
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
	 * @alias 해당 월의 마지막 날짜를 반환
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
		$('.layer').click(function(e) {
			focusedObject = e.currentTarget;
		});
	});
	
	/**
	 * @alias 레이어 풀팝업 닫기
	 */
	function closeLayer(divId,flag) {
		if (!isNullChk(layerList_que) && layerList_que.length > 0) {
			if (isNullChk(divId)) {
				divId = layerList_que.pop();
			} else {
				if (layerList_que[layerList_que.length - 1] == divId) {
					layerList_que.pop();
				}
			}
		}
		
		if (!divId) {
			$(".layerPopM").hide();
			$(".layerPopWrap").hide();
			$(".popWrap").hide();
		} else {
			$("#" + divId).attr('aria-hidden', true);
			$("#" + divId).hide();
		}
		
		var parentId = getParentLayerId();
		if (parentId == '' || flag == 'AA') {
			$("#topHeader").show();
			$("#h1Wrap").show();
			$("#h1Main").show();
			$("#bottomFooter").show();
		} else {
			$("#" + parentId).show();
		}
		
		if (focusedObject != null) {
			try {
				focusedObject.focus();
			} catch(e) {}
		}
		
		// 자동차보험 가입화면에 보이는 상담신청 플로팅 아이콘 숨김
		$(".btConTel").show();
		
		$("#quickMenuBtn").show();
		
		// console.log("closeLayer layerList_que", layerList_que);
	}
	
	/**
	 * @alias 레이어 풀팝업 열기
	 */
	function openLayer(divId) {
		var parentId = getParentLayerId();
		
		layerList_que.push(divId);
		
		$("#" + divId).attr('aria-hidden', false);
		$("#" + divId).attr('role', 'dialog');
		$("#" + divId).attr('aria-live', 'polite');  // 웹접근성 추가
		
		$("#" + divId).show();
		$("#" + divId).focus(); // 접근성 /2005
		
		if (parentId == '') {
			$("#topHeader").hide();
			$("#h1Wrap").hide();
			$("#h1Main").hide();
			$("#bottomFooter").hide();
		} else {
			$("#" + parentId).hide();
		}
		
		$("body").scrollTop(0);
		
		$("#quickMenuBtn").hide();
		
		// 자동차보험 가입화면에 보이는 상담신청 플로팅 아이콘 숨김
		$(".btConTel").hide();
		
		// 간편설계 안내 레이어 숨김 /1908
		$(".notiFixed").hide();
		
		// console.log("openLayer layerList_que", layerList_que);
	}
	
	/* select layer 열기 */
	function openSelectLayer(title) {
		var cssId = ".carSelWrap2";
		
		$(cssId).show();
		$(cssId).find(".carSlct").show();
		$(cssId).find("h4").attr("tabindex","0");
		if (title != undefined) {
			$(cssId).find("h4").html(title);
		}
		$(cssId).find("h4").focus();
		$("body").bind('touchmove', function(e) {e.preventDefault()});
	}
	
	/* select layer 닫기 */
	function closeSelectLayer(event){ 
		$(".carSelWrap2 .carSlct").hide();
		$("body").unbind('touchmove');
		
		setTimeout(function() {
			$(".carSelWrap2").hide();
			if (focusedObject != null) {
				try {
					focusedObject.focus();
				} catch(e){
					
				}
			}
		}, 300);
	}
	
	/*null체크*/
	function isNullChk(data){
		if(data === undefined || data === 'undefined' || 
		   data === null || data === 'null' ||
		   data === ''){
			return true;
		}else{
			return false;
		}
	};
	
	/**************************** 공통 레이어 함수 끝 ************************************/

	/**
	 * @alias null 변경
	 * @param value : 체크할 값
	 * @param replaceValue : 변경할 값
	 * @exp  nvl(value, "");
	 */
	function nvl(value, replaceValue) {
		if (value) {
			return value;
		} else{
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
	 * @return 콤마를 포함한 금액
	 */
	ValueFilter.regist("amtWon", function(value) {
		return getCurrencyValue(value) + "원";
	});
	
	/**
	 * @alias 데이터의 변환 작업을 수행한다.
	 * @param 변환이전 금액
	 * @return 콤마를 포함한 금액
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
			    	$(this).text(ValueFilter.convert("amtWon", $(this).text()));
		   		} catch(e){}
		   	});
		   	
		   	//금액(만원), 처리
		 	$(".td_amtMWon").each(function(index) {
		   		try {
			    	$(this).text(ValueFilter.convert("amtMWon", $(this).text()));
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
		   			$(this).text(ValueFilter.convert("amtCnt", $(this).text()));
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
	    var tmp_mth     = curMonth - mth        ;   // 현재 월- 생월
	    var tmp_day     = curDay - daygab       ;   // 현재 일- 생일

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
	    	alert("생년월일 길이가 잘못 되었습니다.");
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
	 * @alias 생년월일(7자리) 이용한 만나이계산(YYMMDDG = YYMMDD(주민앞자리) + G(성별))
	 * @desc G = 1,2:국내1900년대생 남녀, 3,4:국내 2000년대생 남녀, 5,6:외국19000년대생 남녀, 7,8:외국2000년대생 남녀, (9,0:국내18000년대생 남녀 -> 0:태아로 변경)
	 */
	function ageCalculation4(date, inagInsStDt, msgYn){
		if(date.length != 7) {
			alert("생년월일 길이가 잘못 되었습니다.");
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
	 * @alias 주민번호를 이용한 만나이 계산(책임개시일 기준)
	 */
	function ageCalculation2(date, inagInsStDt, msgYn) {
		if(date.length != 8) {
			if(msgYn != 'N'){
				alert("생년월일 길이가 잘못 되었습니다.");	
			}
			return;
		}
		if(inagInsStDt.length != 8) {
			if(msgYn != 'N'){
				alert("보험책임개시일 길이가 잘못 되었습니다.");
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
		
		return $.format.date(new Date(year, month-1, day, 0, 0, 0), dateFormat);
	}
	
	// 제휴혜택 탭 초기화 - 접근성 /2005
	$(function() {
		$('.ariaContWrap .itemCont div.on').attr('tabindex','0');
		// 높이값 초기화
		fnAriaHeight();
		
		$('.ariaContWrap .itemCont > div').each(function () {
			if($(this).hasClass('on')) {
				$(this).attr('aria-hidden' , false);
			} else {
				$(this).attr('aria-hidden' , true);
			}
		});
		
		/* 앱푸시 수취 확인 서비스 호출 */
		if(getUrlParamter("_appPushId") !== false || sessionStorage.getItem('pushId') !== null){
			
			if(sessionStorage.getItem('pushId') === null){
				sessionStorage.setItem('pushId', getUrlParamter("_appPushId"));
			}
			
			var serviceId 	= getUrlParamter("m");
			var pushId 		= getUrlParamter("_appPushId") ? getUrlParamter("_appPushId") : sessionStorage.getItem('pushId');
			getEventTag(pushId, serviceId);
		}		
	});
	
	function getEventTag(pushId, serviceId){
		
		var result = "";
		var	reqVO = {
				svcMenuId : serviceId
		};
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0901M04S", {
			data : reqVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					result = responseObj.data.prodHisCd;
					
					if(result !== undefined && result !== "" && result !== null){
						/*
						 * 수취 이벤트코드 맵핑
						 */
						appPushTagging(pushId, result);
					}
				},
				failure:function() {					 
				}
			}
		});
		
		return result;
	}
	
	// URL 파라미터 값 가져오기
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
	
	// 상세내용 높이값
	function fnAriaHeight() {
		var ariaHeight = $('.itemCont > div.on').outerHeight(); // on 높이(border, padding 포함)
		
		$('.ariaContWrap > .itemCont').css('height', ariaHeight + 'px');
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
				
				$.unblockUI();
				fnCompleUpload(fileData);
			},
			error:function(){
				$.unblockUI();
				alert("업로드에 실패하였습니다. 다시 시도해 주세요.");
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
		
		if (msgDate !="" && msgDate != undefined) {
			requestSmsVO = {
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts,
					msgDate : msgDate
			};
		} else {
			requestSmsVO = {
					cnctNo : cnctNo,
					msgSendUsr : msgSendUsr,
					msgCnts : msgCnts
			};
		}
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0111M02I", {
			data : requestSmsVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					alert("보험료 계산내역을 발송하였습니다.");
				},
				failure:function() {
					alert("보험료 계산내역을 발송에 실패하였습니다. 잠시 후 다시 시도해주세요."); 
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
		if(isNullChk(menuId)){
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
		
		
		/* Ajax방식으로 TranID 호출 */
		HiJS.svr.doRequestAjax("DHCO0111M05I", {
			data : requestSmsVO,
			loadingbar : false,
			callback : {
				success : function(responseObj) {
					alert("보험료 계산내역을 발송하였습니다.");
				},
				failure:function() {
					alert("보험료 계산내역을 발송에 실패하였습니다. 잠시 후 다시 시도해주세요."); 
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
		for(var i=0; i<10; i++){
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
					alert("보험료 계산내역을 발송하였습니다.");
				},
				failure:function() {
					alert("보험료 계산내역을 발송에 실패하였습니다. 잠시 후 다시 시도해주세요."); 
				}
			}
		});
	}

	/** 
	 * @alias 콜미신청 레이어
	 * @param taskCode : 콜미구분코드
	 * @param callmeData : 콜미데이터
	 */
	function openCallmeLayer(taskCode, callmeData) {
		// openLayer
		var layerId = "_callmeLayer";
		openLayer(layerId);
		// 콜미기본정보 세팅
		callmeCommonAct(taskCode, layerId, callmeData);
	}
	
	/** 
	 * @alias 인수거부 레이어
	 */
	function openLayerInsu() {
		// openLayer
		var layerId = "_callmeLayerInsu";
		openLayer(layerId);
		// 콜미기본정보 세팅
		callmeCommonAct("CAL_CALL", layerId);
	}
	
	/** 
	 * @alias 보험료계산 이탈레이어
	 * @param gb : 콜미  TASK CODE
	 * @param callmeData : 콜미데이터
	 * @param prevLink : 이전링크URL
	 */
	function openCallmeLayerPC(gb, callmeData, prevLink) {
		// openLayer
		var layerId = '';
		var taskCode = ''; 
		
		console.log("openCallMeLayerPc === " + gb);
		if (gb == 'CAL_CALL') { // 자동차보험
			layerId = '_callmeLayerMT';
		}else if (gb == "FM_CALL"&& prevLink != '7afb3ad9a3') { // 운전자, 암, 건강, 주택화재
			layerId = '_callmeLayerLT';
		}else if (gb == 'CC_CALL' && prevLink != 'a7ab8a9cfb') { // 건강보험(상담신청 처리를 위한 분기처리)
			layerId = '_callmeLayerLT';
		}else if (gb == 'LT_CALL' && prevLink != '452665tgd7') { // 건강보험(상담신청 처리를 위한 분기처리)
			layerId = '_callmeLayerLT';
		}else if (gb == 'HT_CALL' && prevLink != '9589f58b0d') { // 건강보험(상담신청 처리를 위한 분기처리)
			layerId = '_callmeLayerLT';
		}else if (getToday() <= '20221230' && gb == 'XX_CALL') { // 연금보험(단기이벤트로 인한 날짜 처리)
			layerId = '_callmeLayerPN';
		} else if (gb == 'CHILD_CALL' && prevLink != '058d893174') { // 어린이보험
			layerId = '_callmeLayerLT';
		} else if (gb == 'L_FG_CALL'){ // 장기체류
			layerId = '_callmeLayerLFG';
		}  else if (gb == 'L_FG_INSU_CALL'){ // 장기체류
			layerId = '_callmeLayerLFGINSU';
		} else if (gb == 'SM_CALL'){ // 전환형실손
			layerId = '_callmeLayerSM';
		} else { // 기타
			layerId = '_callmeLayerGI';
		}
		taskCode = gb;
		
		//장기체류는 레이어팝업(풀팝업 아님)
		if(gb == "L_FG_CALL" || gb == "L_FG_INSU_CALL"){
			lpOpener(layerId);
		}else{
			openLayer(layerId);
		}

		// 콜미기본정보 세팅
		callmeCommonAct(taskCode, layerId, callmeData);
		
		// 자보 이탈레이어 링크URL 변경
		if (gb == 'CAL_CALL') {
			// 홈버튼 링크URL
			var homelink = '/';
			if (prevLink && prevLink != '') {
				homelink = prevLink;
			}
			
			// 상담신청버튼 클릭 (신청후링크변경)
			$('#' + layerId).find("[data-callmeact=apply]").unbind('click');
			$('#' + layerId).find("[data-callmeact=apply]").click(function() {
				// validation
				if (!callmeValidate(layerId)) {
					$.unblockUI();
					return;
				}
				
				if (!$("#_callmeLayerMTAgreeCheck").attr("checked")) {
					alert('연락처 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.');
					$.unblockUI();
					return;
				}
				
				// 콜미영역 항목값 JSON
				var callmeJson = getCallmeData(layerId);
				// 콜미신청 실행
//				var callmeResult = callmeApply(taskCode, $.extend(callmeData, callmeJson));
				
				var callmedata = {
						taskCode : taskCode || 'CAL_CALL'
				};
				
				var jsondata = $.extend(callmeData, callmeJson);
				
				$.extend(callmedata, jsondata);
				
				if (taskCode == "TM_CALL") {
					console.log("taskCode:" + taskCode);
					try {
						AM_PL('/tmcall_mobile');
					} catch (e) {
						
					}
				}
				
				// 콜미신청 실행
				HiJS.svr.doRequestAjax('DHCO0104M01I', {
					data:callmedata,
					async:true,
					loadingbar:false,
					callback:{
						success:function(data) {
							/* 무중단 기간 처리 (9/29(금) 18시 ~ 10/10(화) 0시)*/
							var nowDate = new Date();
							if ( ( getToday() == "20170929" &&  nowDate.getHours() >= "18" ) ||  ( getToday() >= "20170930" &&  getToday() < "20171010")  ){
								alert("상담신청이 완료되었습니다.<br/><br/>추석 연휴 기간(9월29일 18시 ~ 10월9일 24시)에 신청하신 고객님은 10월10일(화) 9시부터 순차적으로 안내가 진행되며, 상담원 연결이 지연될 수 있습니다. 너그러운 양해 부탁드리며 최대한 신속하게 연락 드리겠습니다"); 
								closeLayer(layerId);
							} else {
								alert('상담 신청이 완료 되었습니다. 보험료 계산을 종료합니다.');
								document.location.href = homelink;
							}
							$.unblockUI();
						},
						failure:function(data) {
							var code = data.header.responseCode;
							var message = data.header.responseMessage;
							result = {result:false, responseCode:code, responseMessage:message.replace('[' + code + '] ', '')};
							alert(responseMessage.replace('[' + code + '] ', ''));
							$.unblockUI();
						}
					}
				});
			});
			// 홈버튼 링크
			$('#' + layerId).find("[data-callmelink=home]").attr('href', homelink);
		}
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
		
		// 전화번호 초기화
		$obj.find('[data-callmevo=telNo]').val('');
		// 전화번호 타입 변경처리
		$obj.find('[data-callmevo=telType]').change(function() {
			$obj.find('[data-callmevo=telNo]').val('');
		});
		// 전화번호 기본정보 세팅
		if (callmeData) {
			if (callmeData.telType) {
				$obj.find('[data-callmevo=telType]').val(callmeData.telType);
			}
			if (callmeData.telPart1 && callmeData.telPart2 && callmeData.telPart3) {
				$obj.find('[data-callmevo=telNo]').val(callmeData.telPart1 + callmeData.telPart2 + callmeData.telPart3);
			} else if (callmeData.telNo) {
				$obj.find('[data-callmevo=telNo]').val(callmeData.telNo);
			}
		}
		// 상담신청버튼 클릭
		$obj.find("[data-callmeact=apply]").unbind('click');
		$obj.find("[data-callmeact=apply]").click(function() {
			$.blockUI();
			// validation
			if (!callmeValidate(layerId)){
				$.unblockUI();
				return;
			}
			
			if (layerId == "_callmeLayer") { // 상담전화
				if (!$("#_callmeLayerAgreeCheck").attr("checked")) {
					alert('연락처 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.');
					$.unblockUI();
					return false;
				}
			} else if (layerId == '_callmeLayerMT') { // 자동차 보험
				if (!$("#_callmeLayerMTAgreeCheck").attr("checked")) {
					alert('연락처 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.');
					$.unblockUI();
					return false;
				}
			} else if (layerId == '_callmeLayerLT') { // 운전자 보험
				if (!isDate($("#birth").val()) || $("#birth").val() == "") {
					alert("생년월일을 정확히 입력해주세요.");
					$("#birthDay").focus();
					$.unblockUI();
					return;
				}
				if ($('input[name=custNo2]:checked').length == 0) {
					alert("성별을 선택하세요");
					$.unBlockUI();
					return;
				}
				if (!$("#_callmeLayerLTAgreeCheck").attr("checked")) {
					alert('연락처 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.');
					$.unblockUI();
					return false;
				}
			} else if (layerId == "_callmeLayerGI") { // 일반보험
				if (!$("#_callmeLayerGIAgreeCheck").attr("checked")) {
					alert('연락처 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.');
					$.unblockUI();
					return false;
				}
			} else if (layerId == "_callmeLayerInsu") { // 인수거부
				if (!$("#_callmeLayerInsuAgreeCheck").attr("checked")) {
					alert('연락처 수집·이용에 관한 동의가 필요합니다.\n내용을 확인 하신 후 동의여부를 체크해 주세요.');
					$.unblockUI();
					return false;
				}
			}
			
			// 콜미영역 항목값 JSON
			var callmeJson = getCallmeData(layerId);
			
			// var callmeResult = callmeApply(taskCode, $.extend(callmeData, callmeJson));
			
			var callmedata = {
					taskCode : taskCode || 'CAL_CALL'
			};
			
			var jsondata = $.extend(callmeData, callmeJson);
			
			$.extend(callmedata, jsondata);
			
			if (taskCode == "TM_CALL") {
				console.log("taskCode:" + taskCode);
				try {
					AM_PL('/tmcall_mobile');
				} catch (e) {
					
				}
			}
			
			// 콜미신청 실행
			HiJS.svr.doRequestAjax('DHCO0104M01I', {
				data:callmedata,
				async:true,
				loadingbar:false,
				callback:{
					success:function(data) {
						if (layerId == '_callmeLayerLT') {
							/* 무중단 기간 처리 (9/29(금) 18시 ~ 10/10(화) 0시)*/
							var nowDate = new Date();
							if ( ( getToday() == "20170929" &&  nowDate.getHours() >= "18" ) ||  ( getToday() >= "20170930" &&  getToday() < "20171010")  ){
								alert("상담신청이 완료되었습니다.<br/><br/>추석 연휴 기간(9월29일 18시 ~ 10월9일 24시)에 신청하신 고객님은 10월10일(화) 9시부터 순차적으로 안내가 진행되며, 상담원 연결이 지연될 수 있습니다. 너그러운 양해 부탁드리며 최대한 신속하게 연락 드리겠습니다"); 
								closeLayer(layerId);
							} else {
								alert('상담 신청이 완료 되었습니다.\n홈페이지 메인 화면으로 이동합니다.');
								document.location.href = homelink;
							}
							
						} else {
							/* 무중단 기간 처리 (9/29(금) 18시 ~ 10/10(화) 0시)*/
							var nowDate = new Date();
							if ( ( getToday() == "20170929" &&  nowDate.getHours() >= "18" ) ||  ( getToday() >= "20170930" &&  getToday() < "20171010")  ){
								alert("상담신청이 완료되었습니다.<br/><br/>추석 연휴 기간(9월29일 18시 ~ 10월9일 24시)에 신청하신 고객님은 10월10일(화) 9시부터 순차적으로 안내가 진행되며, 상담원 연결이 지연될 수 있습니다. 너그러운 양해 부탁드리며 최대한 신속하게 연락 드리겠습니다"); 
							} else {
								alert('상담 신청이 완료 되었습니다.\n신청 팝업을 닫고 진행 중이던 화면으로 돌아갑니다.');
							}
							closeLayer(layerId);
						}
						$.unblockUI();
					},
					failure:function(data) {
						var code = data.header.responseCode;
						var message = data.header.responseMessage;
						result = {result:false, responseCode:code, responseMessage:message.replace('[' + code + '] ', '')};
						alert(responseMessage.replace('[' + code + '] ', ''));
						$.unblockUI();
					}
				}
			});
		});
	}
	/** 
	 * @alias 콜미신청 Validation Check
	 * @param  areaId : 콜미신청 영역ID
	 * @return  boolean
	 */
	function callmeValidate(areaId) {
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
		
		// 연락처 형식 검사
		if (!validTelNo($('#' + areaId).find('[data-callmevo=telNo]').val(), $('#' + areaId).find('[data-callmevo=telType]').val())) {
			$('#' + areaId).find('[data-callmevo=telNo]').focus();
			return false;
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
			if ($(this).attr('data-callmevo') == 'telNo') {
				var telJson = splitTelNo($(this).val());
				resultData['telPart1'] = telJson.telNo1;
				resultData['telPart2'] = telJson.telNo2;
				resultData['telPart3'] = telJson.telNo3;
			} else {
				resultData[$(this).data('callmevo')] = $(this).val();
			}
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
		var callmedata = {
				taskCode : taskcode || 'CAL_CALL'
		};
		$.extend(callmedata, jsondata);
		
		var result = {result:true, responseCode:'', responseMessage:''};
		
		if (taskcode == "TM_CALL") {
			console.log("taskcode:" + taskcode);
			try {
				AM_PL('/tmcall_mobile');
			} catch (e) {
				
			}
		}
		
		HiJS.svr.doRequestAjax('DHCO0104M01I', {
			data:callmedata,
			async:false,
			loadingbar:false,
			callback:{
				success:function(data) {
					
				},
				failure:function(data) {
					var code = data.header.responseCode;
					var message = data.header.responseMessage;
					result = {result:false, responseCode:code, responseMessage:message.replace('[' + code + '] ', '')};
				}
			}
		});
		
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
					$("#"+divId).find(".lpContWrap").append(html);
			}	
			
			var pos = $("#_scrollEnd_" + divId).position().top;
			$("#"+divId+",.lpContWrap").animate({scrollTop:pos},'slow');
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
	 * @alias 보험상품 전화번호 정보 반환
	 * @param sesskey 세션키
	 * @return {telType:"", telNo:""}
	 */
	function getCMTelNo(sesskey) {
		var returnObj = {telType:"", telNo:"", referer:""};
		HiJS.svr.doRequestAjax("DHCO0901M01S", {
			data:{executeTime:sesskey},
			async:false,
			loadingbar:false,
			callback:{
				success:function(result) {
					returnObj.telType = result.data.telCat;
					returnObj.telNo = result.data.telNo;
					returnObj.referer = result.data.referer;
				},
				failure:function(result) {
					returnObj.telType = "";
					returnObj.telNo = "";
					returnObj.referer = "";
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
	 * @param actNo : 계약자 전화번호
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
	
	/**
	 * @alias 한글체크
	 */	
	function chkHangul(val){
		var check = /[가-힣]/;
		if(check.test(val)){
			return true;
		}else{
			return false;
		}
	};
	
	/**
	 * @alias undefined/null Number 데이터 default 처리
	 * @param str : 소스 str
	 * @param defaultNum : default num
	 * @return Number(str)
	 */
	function nvlNumber(str, defaultNum) {

		if ( undefined == str || '' == str || null == str || "undefined" == str || "null" == str ) {
			str  = defaultNum;
		}
		
		return Number(str);

	};
	
	function addSlash(objInput){
		if($(objInput).val() == undefined || $(objInput).val() == ""){
			return;
		}
		
		var returnStr = "";
		var regex = /^[0-9]*$/;
		var oriStr = replaceAll($(objInput).val(),"/","");
		
		if(regex.test(oriStr)){
			$.each(new Array(4),function(idx){	
				
				if(oriStr.split("")[idx] != null){
					if(idx == 2){
						returnStr = returnStr + "/";
					}	
					returnStr += oriStr.split("")[idx];
				}
			});
		}else{
			returnStr = "";
		}
		
		$(objInput).val(returnStr);
	};
	
	function cardExpireChk(inputId, hiddenYear, hiddenMonth) {
		if(isNullChk($("#"+inputId).val())){
			alert("유효기간을 입력해 주세요.");
			return true;
		}
		
		var validYearMonth = replaceAll($("#"+inputId).val(),"/","");
		
		if(validYearMonth.length != 4 || !isNumber(validYearMonth)) {
			alert("유효기간을 형식에 맞게 입력해 주세요.");
			return true;
		}
		
		if(Number(validYearMonth.substring(0,2)) > 12){
			alert("유효기간을 형식에 맞게 입력해 주세요.(월/년)");
			return true;
		}
		
		if(parseInt(sCurDate,10) > parseInt("20" + validYearMonth.substring(2,4) + validYearMonth.substring(0,2), 10)) {
			alert("카드 유효기간은 현재년월보다 크거나 같아야 합니다.");
			return true;
		}
		
		$("#"+hiddenYear).val("20"+validYearMonth.substring(2,4));
		$("#"+hiddenMonth).val(validYearMonth.substring(0,2));
		
		return false;
	};
	
	/**
	 * @alias Cross-site Scripting 검사
	 * @param str : 문자열
	 * @return str : xss 제거된 문자열
	 */
	function xssCheck(str) {
		var targetArr = ["javascript", "script", "iframe", "document", "vbscript", "applet", "embed", "object",
				"frame", "grameset", "layer", "bgsound", "alert", "onblur", "onchange", "onclick", "ondbclick",
				"onerror", "onfocus", "onload", "onmouse", "onscroll", "onsubmit", "onunload", "form", "object",
				"onBlur", "onChange", "onClick", "onDbclick", "onError", "onFocus", "onLoad", "onMouse",
				"onScroll", "onSubmit", "onUnload"]; // 적용문자
		for (var i = 0; i < targetArr.length; i++) {
			str = str.replace(new RegExp(targetArr[i], 'gi'), "");
		}
		return str;
	}
	
	function inputEmailChk(val,callback){
		var chkEmailRegex = /([0-9a-zA-Z_-]+)@(([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2})/;
		if(!val.match(chkEmailRegex)){
			alert("입력하신 이메일이 유효하지 않습니다.\n다시 확인하시기 바랍니다.",callback);
			return false;
		}else{
			return true;
		}
	}
	
	// APP 소개 팝업 열기
	function openAppIntro() {
		lpCloser("appInfoLayer");
		fnOpenAppIntroLayer();
	}
	
	// 레이어 팝업 열기
	function lpOpener(id) {
		$(".layerPopup").each(function(){
			if($(this).css("opacity") == "1"){
				lpCloser($(this).attr("id"));
			}
		});
		
		layerList_que.push(id);
		
		var deviceW = $(window).width();
		var deviceH = $(window).height();
		
//		location.href = "#" + id;
		
		$("#" + id).attr('role', 'dialog');
		$("#" + id).attr('aria-live', 'polite');  // 웹접근성 추가
		$("#" + id).css({zIndex:'999999', opacity:'1', pointerEvents:'auto'}).attr('aria-hidden', false);
		$("#" + id).attr('tabindex', '0');
		$("#" + id).show().focus(); // 접근성 /2005
		
		$('body').css({overflow:'hidden', width:deviceW + 'px', height:deviceH + 'px'});
		
		if(id == "orientationChangeLayer"){
			$("#" + id).css('background-color','rgba(0,0,0,0.88)');
		}
		
		// 자동차보험 가입화면에 보이는 상담신청 플로팅 아이콘 숨김
		$(".btConTel").hide();
		// console.log("lpOpener layerList_que", layerList_que);
	}
	
	// 레이어 팝업 닫기
	function lpCloser(id, targetId) {
		$('.backFocus').focus().removeClass('backFocus'); // 접근성 /2005
		
		if (!isNullChk(layerList_que) && layerList_que.length > 0) {
			if (isNullChk(id)) {
				id = layerList_que.pop();
			} else {
				if (layerList_que[layerList_que.length - 1] == id) {
					layerList_que.pop();
				}
			}
		}
		
//		location.href = "#close";
		$("#" + id).css({zIndex:'0', opacity:'0', pointerEvents:'none'})
		$("#" + id).attr('tabindex', '-1');
		$("#" + id).css('opacity', '0');
		$("#" + id).hide();
		
		$('body').css({overflow:'scroll', width:'100%', height:'100%'});
		
		if (targetId == undefined || targetId == '') {
			$("body").focus();
		} else {
			$("#"+targetId).focus();
		}
		
		// 자동차보험 가입화면에 보이는 상담신청 플로팅 아이콘 보임
		$(".btConTel").show();
		
		// 간편설계 안내 레이어 보임 /1908
		$(".notiFixed").show();
		
//		 console.log("lpCloser layerList_que2222", layerList_que);
	}
	
	// 레이어 팝업 parent 확인
	function getParentLayerId() {
		// console.log("getParentLayerId", layerList_que);
		var parentId = '';
		if (!isNullChk(layerList_que) && layerList_que.length > 0) {
			parentId = layerList_que[layerList_que.length - 1];
		}
		// console.log("parentId", parentId);
		return parentId;
	}
	
	// 레이어 팝업 열기
	var preLayerId = [];
	function alertOpener(id, multiYn) {
		$.unblockUI();
		//console.log("### alertOpener id=>" + id );
		//console.log("### alertOpener _menuId=>" + this._menuId );
		//console.log("### alertOpener multiYn=>" + multiYn );
		//console.log("### alertOpener preLayerId=>" + preLayerId );
				
		if(this._menuId != 'b5eef5f9a4' && multiYn != 'N' ){
			$(".layerPopup").each(function(){
				if($(this).css("opacity") == "1"){
					lpCloser($(this).attr("id"));
					var len = 0;
					if(preLayerId.length > 0){
						len = preLayerId.length;
					}
					preLayerId[len] = $(this).attr("id");
				}
			});
		}
//		layerList_que.push(id);
		
		var deviceW = $(window).width();
		var deviceH = $(window).height();
		
//		location.href = "#" + id;
		
		$("#" + id).attr('role', 'dialog');
		$("#" + id).attr('aria-live', 'polite');  // 웹접근성
		// 2021.12.06 김태원 - lpOpener로 뜨는 팝업 위에 alert메세지를 보여지게 하기 위해 zIndex를 999999에서 1000000으로 변경 
		$("#" + id).css({zIndex:'1000000', opacity:'1', pointerEvents:'auto'}).attr('aria-hidden', false);
		$("#" + id).attr('tabindex', '0');
		$("#" + id).show();
		$("#" + id).focus(); // 접근성 /2005
		
		$('body').css({overflow:'hidden', width:deviceW + 'px', height:deviceH + 'px'});
		
		if(id == "orientationChangeLayer"){
			$("#" + id).css('background-color','rgba(0,0,0,0.88)');
		}
		
		// console.log("lpOpener layerList_que", layerList_que);
	}
	
	// 레이어 팝업 닫기
	function alertCloser(id, targetId) {
		
//		if (!isNullChk(layerList_que) && layerList_que.length > 0) {
//			if (isNullChk(id)) {
//				id = layerList_que.pop();
//			} else {
//				if (layerList_que[layerList_que.length - 1] == id) {
//					console.log("lpCloser layerList_que0000", layerList_que[layerList_que.length - 1]);
//					layerList_que.pop();
//				}
//			}
//		}
		
//		location.href = "#close";
		$("#" + id).css({zIndex:'0', opacity:'0', pointerEvents:'none'}).attr('aria-hidden', true);
		$("#" + id).attr('tabindex', '-1');
		$("#" + id).css('opacity', '0');
		
		$("#" + id).hide();
		
		$('body').css({overflow:'scroll', width:'100%', height:'100%'});
		
		if (targetId == undefined || targetId == '') {
			$("body").focus();
		} else {
			$("#"+targetId).focus();
		}
		
		// alert("1"); alert("2");로 호출한 경우 레이어로 변경되며 동일한 레이어아이디(layerPopAlert)로 msg 내용도 둘다 2로 보여진다.
		// 똑같은 내용의 레이어가 중복 발생하며, 첫번째 레이어를 닫았을때 이전 레이어를 호출하며 스크롤이 사라지는 현상 발생하여 예외처리
		if(preLayerId.length > 0 && id != "layerPopAlert" ){
			lpOpener(preLayerId[preLayerId.length -1]);
			preLayerId[preLayerId.length -1] = "";
		}
		
//		 console.log("lpCloser layerList_que2222", layerList_que);
	}
	
	$(window).on("orientationchange",function(event) {
		if (window.orientation != undefined) {
			if (window.orientation == 0) {
				fnOrientationChangeType("H");
			} else {
				fnOrientationChangeType("W");
			}
		}
	});
	
	$(window).load(function() {
		if(window.orientation == 90 || window.orientation == -90){
			fnOrientationChangeType("W");
		}else{
			fnOrientationChangeType("H");
		}
	});
	
	function fnOrientationChangeType(type){
		if(type == "H"){
			lpCloser("orientationChangeLayer");
			$("body").off("scroll touchmove mousewheel");
		}else if(type == "W"){
			lpOpener("orientationChangeLayer");
			$("body").on("scroll touchmove mousewheel", function(e){
				e.preventDefault();
				e.stopPropagation();
				return false;
			});
		}
	}
	
	$(document).on("focus","input[type=text],input[type=tel],input[type=number],textarea", function(){
		if(checkWebOS.and && $(this).attr("readonly") == undefined){
			var htmlTypeOpen = "";
			$(".popWrap").each(function(){
				if($(this).is(":visible")){
					htmlTypeOpen = "pop";
				}
			});
			
			if(htmlTypeOpen == "pop"){
				$(this).parents('.popWrap').find(".popContent").css("position","relative");
				$(this).parents('.popWrap').find(".popContent").css("margin-bottom","0");
				$(this).parents('.popWrap').find(".popContent").css("padding-bottom","70px");
			}else{
				$("#h1Wrap").css("position","relative");
			}

			
			/* 보험료계산하기 버튼 고정 문제로 숨김 /1904
			  $(".btnWrap").each(function(){
					$(this).css({position:'absolute'});
				});*/
			
		}
	});

	$(document).on("blur","input[type=text],input[type=tel],input[type=number],textarea", function(){
		if(checkWebOS.and && $(this).attr("readonly") == undefined){
			var htmlTypeClose = "";
			$(".popWrap").each(function(){
				if($(this).is(":visible")){
					htmlTypeClose = "pop";
				}
			});
			
			if(htmlTypeClose == "pop"){
				$(this).parents('.popWrap').find(".popContent").css("position","");
				$(this).parents('.popWrap').find(".popContent").css("margin-bottom","70px");
				$(this).parents('.popWrap').find(".popContent").css("padding-bottom","0");
			}else{
				$("#h1Wrap").css("position","");
			}
			
			/* 보험료계산하기 버튼 고정 문제로 숨김 /1904
			$(".btnWrap").each(function(){
				$(this).css({position:'fixed'});
			});*/
		}
	});
	
	/**
	 * window.alert overwrite layer alert
	 */
	var alertCallBackFuc;
	window.alert = function (msg, callBackFuc, multiYn ) {
		
		if(!isNullChk(callBackFuc)){
			alertCallBackFuc = callBackFuc;
		}else{
			alertCallBackFuc = null;
		}
		
		$("#alertLayerMsg").html(msg);
		alertOpener("layerPopAlert", multiYn );
	};
	
	//alert 확인
	$(document).on("click","#alertBtn", function(){

		alertCloser("layerPopAlert","");
		
		if(alertCallBackFuc != null){
			if (alertCallBackFuc.constructor == Function) {
				alertCallBackFuc;
			} else {
				eval(alertCallBackFuc);
			}
		}
		
		$('.backFocus').focus().removeClass('backFocus'); // 접근성 /2005
//		lpCloser("layerPopAlert","");
	});
	
	/**
	 * window.confirm overwrite layer confirm
	 */
	var confirmCallBackSuccFuc;
	var confirmCallBackFailFuc;
	window.confirm = function (msg, succCallBackFuc, failCallBackFuc) {
		
		if(!isNullChk(succCallBackFuc)){
			confirmCallBackSuccFuc = succCallBackFuc;
		}else{
			confirmCallBackSuccFuc = null;
		}
		
		if(!isNullChk(failCallBackFuc)){
			confirmCallBackFailFuc = failCallBackFuc;
		}else{
			confirmCallBackFailFuc = null;
		}
		
		$("#confirmLayerMsg").html(msg);
		alertOpener("layerPopConfirm");
	};
	
	//confirm 확인
	$(document).on("click","#confirmBtn", function(){
		if(confirmCallBackSuccFuc != null){
			eval(confirmCallBackSuccFuc);
		}
		
		alertCloser("layerPopConfirm","");
	});
	
	//confirm 취소
	$(document).on("click","#confirmCancelBtn", function(){
		if(confirmCallBackFailFuc != null){
			eval(confirmCallBackFailFuc);
		}
		
		alertCloser("layerPopConfirm","");
	});
	
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
	
	
	/*******************************************
	 * 계좌번호 마스킹 처리
	 *******************************************/
	function maskAcntNo(acntNo){
		try {
			var maskingStr = "";
			
			var len = acntNo.length ;
			
			if(len == 10 || len == 11){//휴대폰 번호
				maskingStr = maskingPhone(acntNo);//앞/뒤4자리 제외(단 전화번호 계좌는 전화번호 기준 준용)
			} else if(len<=9){ //기타-기존 로직 대로
				len = acntNo.length - 3 ;
				maskingStr = acntNo.substring(0,len)+"***";
			} else{ //12자리 이상 번호
				stStr = acntNo.substring(0,4);
				edStr = acntNo.substring(len-4,len);		
				maskingStr = stStr + fillStar(len-8) + edStr;
			}
			return maskingStr;
		} catch(e){
			return acntNo;
		}
		
	}
	
	/*******************************************
	 * 카드번호 마스킹 처리
	 * 아멕스 카드 : 15자리
	 * 다이너스클럽 : 14자리
	 * 일반 : 16자리
	 *******************************************/
	function maskCardNo(cardNo){	
		try{
			var maskingStr = "";
			var len = cardNo.length ;
			stStr = cardNo.substring(0,4);
			edStr = cardNo.substring(len-4,len);		
			maskingStr = stStr + fillStar(len-8) + edStr;
			return maskingStr;
		} catch(e){
			return cardNo;
		}
	}	
	
	function fillStar(cnt){
		var str = "";
		for(var i =0;i<cnt;i++)
			str+="*";
		return str;
	}
	
	/**
	 * @alias  session storage/ localstorage 사용가능 유무 확인<br>
	 * ex)storageAvailable("localStorage") 결과 : true/false
	 * @param type	: 'localStorage','sessionStorage'
	 * @author 심흥무
	 * 
	 */
	
	function storageAvailable(type){
	    var storage;

	    try {
	        storage = window[type];
	        var x = '__storage_test__';
	        storage.setItem(x, x);
	        storage.removeItem(x);
	        return true;
	    }
	    catch(e) {

	        return e instanceof DOMException && (
	            // Firefox를 제외한 모든 브라우저
	           e.code === 22 ||
	            // Firefox
	            e.code === 1014 ||
	            // 코드가 존재하지 않을 수도 있기 떄문에 이름 필드도 확인합니다.
	            // Firefox를 제외한 모든 브라우저
	           e.name === 'QuotaExceededError' ||
	            // Firefox
	            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
	            // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
	            (storage && storage.length !== 0);
	    }
	}
	
	/**
	 * @alias  고객 생년월일 8자리 정합성 체크<br> (2021-08-20)
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
 			alert("생년월일을 확인해주세요", callback);
			return false;		
		}else if(birthDate.length >= 8){
			if(birthDate.length > 8){
				alert("생년월일을 확인해주세요", callback);
				return false;				
			}else if(1900 > year || year > yearNow){
				alert("생년월일을 확인해주세요", callback);
				return false;
			}else if(month < 1 || month > 12){
				alert("생년월일을 확인해주세요", callback);
				return false;				
			}else if(day < 1 || day > 31){
				alert("생년월일을 확인해주세요", callback);
				return false;				
			}else if((month == 4 || month == 6 || month == 9 || month == 11) && day == 31){
				alert("생년월일을 확인해주세요", callback);
				return false;		
			}else if(month == 2){
				var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
				if(day > 29 || (day ==29 && !isleap)){ //윤년체크
					alert("생년월일을 확인해주세요", callback);
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
	 * @alias  카카오톡 나에게 보내기 팝업 오픈
	 * @author 이정주
	 */
    this.openKakaoSendPopup = function(){
    	closeLayer('_callmeLayerLFGINSU');
    	lpOpener('_callmeLayerLFGKAKAO');

		var cmTelNo = getCMTelNo($('input[name=executeTime]').val());
		$("input[name=mpNo]").val(cmTelNo.telNo);
		$("input[name=mpNo]").parent().addClass("value");
    }
	
