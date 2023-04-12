/**
 * @alias 밸리데이션 체크 공통
 * @author 이한철
 */
	
	var messages = {};
	var functions = {};
	
	/* PRIVATE : Positive Validation Check */
	__validatePositive=function(val, pattern){
		if(val == "") return false;
		for(var i=0; i<val.length; i++){
			if(pattern.indexOf(val.charAt(i)) == -1){
				return false;
			}
		}
		return true;
	}
	
	/* PRIVATE : Negative Validation Check */
	__validateNegative=function(val, pattern){
		for(var i=0; i<val.length; i++){
			if(pattern.indexOf(val.charAt(i)) > -1){
				return false;
			}
		}
		return true;
	}
	
	/* PRIVATE : Negative Array Validation Check */
	__validateArrayPositive=function(val, pattern){
		var Arr = pattern.split("|");
		for(var i=0; i<Arr.length; i++){
			//console.log(Arr[i]+"|"+val+"|"+Arr[i].indexOf(val));
			if(Arr[i].indexOf(val) > -1){
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * Validator - 널
	 * @param value - 문자열
	 * @return 체크결과(true|false)
	 */
	isNull=function(value){
		if(value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)){
            return true; 
        }else{
            return false;
        }
	}
	
	/**
	 * Validator - ASCII
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isAscii=function(val){
		var pattern = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * Validator - 비밀번호
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isPassword=function(val){
		var pattern = "'-_=";
		return __validateNegative(val, pattern);
	}
	
	/**
	 * 2016.03.07
	 * 사용금지(deprecated)!!!(common.js isNumber와 충돌. 아래 isNaturalNumber 사용)
	 * 소수점이 필요하면 아래 isDecimal 사용
	 * 
	 * Validator - 숫자
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isNumber=function(val){
		var pattern = "0123456789";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * 2016.03.07
	 * Validator - 숫자(0과 자연수)
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isNaturalNumber=function(val){
		var pattern = "0123456789";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * Validator - 숫자(소숫점포함)
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isDecimal=function(val){
		var pattern = "0123456789.";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * Validator - 통화
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isCurrency=function(val){
		var pattern = "0123456789,";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * Validator - 전화번호
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isPhoneNumber=function(val){
		var pattern = "0123456789-";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * Validator - 계좌번호
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isAccount=function(val){
		//패턴이 전화번호와 동일
		return isPhoneNumber(val);
	}
	
	/**
	 * Validator - 날짜
	 * @param val - 문자열(YYYYMMDD|YYYY-MM-DD|YYYY-MM-DD hh:mm)
	 * @return 체크결과(true|false)
	 */
	isDate=function(val){
		var pattern = "0123456789-: ";
		if(!__validatePositive(val, pattern)){ return false; }
		if(val.length == 8){
			if(val.substring(4, 6) > 0 && val.substring(4, 6) < 13){
				if(val.substring(6, 8) > 0 && val.substring(6, 8) < 32){
					return true;
				}
			}
		}
		if(val.length == 10){
			if(val.substring(5, 7) > 0 && val.substring(5, 7) < 13){
				if(val.substring(8, 10) > 0 && val.substring(8, 10) < 32){
					if(val.substring(4, 5) == "-" && val.substring(7, 8) == "-"){
						return true;
					}
				}
			}
		}
		if(val.length == 16){
			if(val.substring(5, 7)> 0 && val.substring(5, 7) < 13){
				if(val.substring(8, 10) > 0 && val.substring(8, 10) < 32){
					if(val.substring(4, 5) == "-" && val.substring(7, 8) == "-"){
						if(val.substring(10, 11) == " " && val.substring(13, 14) == ":"){
							if(val.substring(11, 13) < 25 && val.substring(14, 16) < 60){
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}
	
	/**
	 * Validator - 주민번호 앞자리 체크
	 * @param val - 문자열(YYMMDD)
	 * @return 체크결과(true|false)
	 */
	isRegF=function(val){
		var pattern = "0123456789";
		if(!__validatePositive(val, pattern)){ return false; }
		if(val.length == 6){
			if(val.substring(2, 4) > 0 &&  val.substring(2, 4) < 13){
				var monthTable = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
				
				if (((val.substring(0, 2) % 4 == 0) && (val.substring(0, 2) % 100 != 0)) || (val.substring(0, 2) % 400 == 0)) {
					monthTable[1] = 29;
				} else {
					monthTable[1] = 28;			
				}
				var month = Number(val.substring(2, 4));
				if(val.substring(4, 6) > 0 && val.substring(4, 6) <= monthTable[month - 1]){
					return true;
				}
			}
		}
		
		return false;
	}
	
	/**
	 * Validator - 이메일주소
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isEmail=function(val){
		var pattern = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-@.";
		var str1cnt = 0;
		var str2cnt = 0;
		for(i=0; i<val.length; i++){
			if(pattern.indexOf(val.charAt(i)) == -1) return false;
	       	if(val.charAt(i) == '@') str1cnt += 1;
	       	if(val.charAt(i) == '.') str2cnt += 1;
		}
		if(str2cnt < 1 || str2cnt > 4) return false;
		return true;
	}
	
	/**
	 * Validator - 이메일계정
	 * @param val - 문자열
	 * @return 체크결과(true|false)
	 */
	isEmailAccount=function(val){
		var pattern = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-.";
		return __validatePositive(val, pattern);
	}
	
	/**
	 * Validator - 주민등록번호
	 * @param ihidnum - 주민등록번호(하이픈은 제거후 체크)
	 * @return 체크결과(true|false)
	 */
	isResNo= function(ihidnum){
		ihidnum = ihidnum.replace("-", "");
		fmt = /^\d{6}[1234]\d{6}$/;
		if(!fmt.test(ihidnum)){
			return false;
		}
		
		birthYear = (ihidnum.charAt(7) <= "2") ? "19" : "20";
		birthYear += ihidnum.substr(0, 2);
		birthMonth = ihidnum.substr(2, 2) - 1;
		birthDate = ihidnum.substr(4, 2);
		birth = new Date(birthYear, birthMonth, birthDate);
		
		if( birth.getYear() % 100 != ihidnum.substr(0, 2) ||
		    birth.getMonth() != birthMonth ||
		    birth.getDate() != birthDate) {
		    return false;
		}
		
		var arrDivide = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];            	
		var checkdigit = 0;            	
		for(var i=0;i<ihidnum.length-1;i++){
			checkdigit += parseInt(ihidnum.charAt(i)) * parseInt(arrDivide[i]);
		}
		checkdigit = (11 - (checkdigit%11))%10;
		if(checkdigit != ihidnum.charAt(12)){
			return false;
		}else{
			return true;
		}
	}
	
	/**
	 * Validator - 사업자번호
	 * @param bsmno - 사업자번호(하이픈생략)
	 * @return 체크결과(true|false)
	 */
	isBsmNo=function(bsmno){
		if(bsmno.length != 10) return;
		
		var checkSum = 0;
		checkSum += parseInt(bsmno.substring(0,1)); 
		checkSum += parseInt(bsmno.substring(1,2)) * 3 % 10; 
		checkSum += parseInt(bsmno.substring(2,3)) * 7 % 10; 
		checkSum += parseInt(bsmno.substring(3,4)) * 1 % 10; 
		checkSum += parseInt(bsmno.substring(4,5)) * 3 % 10; 
		checkSum += parseInt(bsmno.substring(5,6)) * 7 % 10; 
		checkSum += parseInt(bsmno.substring(6,7)) * 1 % 10; 
		checkSum += parseInt(bsmno.substring(7,8)) * 3 % 10; 
		checkSum += Math.floor(parseInt(bsmno.substring(8,9)) * 5 / 10);
		checkSum += parseInt(bsmno.substring(8,9)) * 5 % 10; 
		checkSum += parseInt(bsmno.substring(9,10));
		
		return (checkSum % 10) == 0;
	}
	
	/**
	 * Validator - 지역번호
	 * @param telno - 지역번호(하이픈생략)
	 * @return 체크결과(true|false) 
	 */
	isTelNo=function(telno){
		var pattern = "02|051|053|032|062|042|052|044|031|033|043|041|063|061|054|055|064|070";
		return __validateArrayPositive(telno, pattern);
	}
	
	/**
	 * Validator - 지역번호
	 * @param telno - 지역번호(하이픈생략)
	 * @return 체크결과(true|false) 
	 */
	isMpNo=function(mpno){
		var pattern = "010|011|016|017|018|019";
		return __validateArrayPositive(mpno, pattern);
	}
	
	/**
	 * Validator - 전화번호와 휴대폰 번호 모두 쓸 수 있는 지역번호
	 * @param telno - 지역번호(하이픈생략)
	 * @return 체크결과(true|false) 
	 */
	isTelMpNo=function(telmpno){
		var pattern = /02|051|053|032|062|042|052|044|031|033|043|041|063|061|054|055|064|010|011|016|017|018|019/;
		return pattern.test(telmpno);
	}

	/**
	 * Validator - 휴대폰 및 중간번호
	 * @param telno - 지역번호(하이픈생략)
	 * @return 체크결과(true|false) 
	 */
	isTelMpNo2=function(telmpno){
		var pattern = /^[1-9]/;
		return pattern.test(telmpno);
	}	
	
	/**
	 * Validator - 자릿수 체크 [2,3자리]
	 * @param val - 자릿수 체크할 변수
	 * @return 체크결과(true|false) 
	 */
	isTwoThr=function(val){
		if (val.length <= 1) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Validator - 자릿수 체크 [3,4자리]
	 * @param val - 자릿수 체크할 변수
	 * @return 체크결과(true|false) 
	 */
	isThrFour=function(val){
		if (val.length <= 2) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Validator - 자릿수 체크 [4자리]
	 * @param val - 자릿수 체크할 변수
	 * @return 체크결과(true|false) 
	 */
	isFour=function(val){
		if (val.length <= 3) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Validator - 자릿수 체크 [6자리]
	 * @param val - 자릿수 체크할 변수
	 * @return 체크결과(true|false) 
	 */
	vSix=function(val){
		if (val.length != 6) {
			return false;
		} else {
			return true;
		}
	}
	
	/**
	 * Validator - 자릿수 체크 [8자리]
	 * @param val - 자릿수 체크할 변수
	 * @return 체크결과(true|false) 
	 */
	vEight=function(val){
		if (val.length != 8) {
			return false;
		} else {
			return true;
		}
	}
	
	isChecked = function(el, msg){el = el.length ? el : [el];for(var i = 0; i < el.length; i++){if(el[i].checked)return true;}if(msg){alertPopup(msg,"ok",null);el[0].focus();return false;}return true;};

	checkedVal = function(el){var val = "";el = el.length ? el : [el];for(var i = 0; i < el.length; i++){if(el[i].checked){if(val) val += ",";val += el[i].value;}}return val;};
	
	/********************** VALIDATOR **********************/
	
	//필수값체크
	messages["vNotNull"] = "은(는) 필수입력 항목입니다.";
	functions["vNotNull"] = function(val){ return /[^\s\t\r\n]+/.test(val); };
	
	//ASCII
	messages["vAscii"] = "를(을) 영문 또는 숫자 형식으로 입력해 주세요.";
	functions["vAscii"] = function(val){ return !val || isAscii(val); };
	
	//한글
	messages["vHangul"] = "를(을) 한글로 입력해 주세요.";
	functions["vHangul"] = function(val){ return /^[가-힣]+$/.test(val); };

	//영문
	messages["vEng"] = "를(을) 한글 또는 영문으로 입력해 주세요.";
	functions["vEng"] = function(val){ return /^[가-힣A-Za-z\s\.]+$/.test(val); };
	
	//한글
	messages["vHangulAEng"] = "를(을) 한글 또는 영문으로 입력해 주세요.";
	functions["vHangulAEng"] = function(val){ return /^[가-힣A-Za-z]+$/.test(val); };
	
	//숫자
	messages["vNumber"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vNumber"] = function(val){
		return /^[0-9]*$/.test(val);
	};
	
	//통화
	messages["vCurrency"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vCurrency"] = function(val){ return !val || isCurrency(val); };
	
	//실수
	messages["vDecimal"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vDecimal"] = function(val){ return !val || isDecimal(val); };
	
	//전화번호
	messages["vPhone"] = "을 형식에 맞게 입력해 주세요.";
	functions["vPhone"] = function(val){ return !val || isPhoneNumber(val); };
	
	//계좌번호
	messages["vAccount"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vAccount"] = function(val){ return !val || isAccount(val); };
	
	//날짜
	messages["vDate"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vDate"] = function(val){ return !val || isDate(val); };
		
	//아이디
	messages["vId"] = "를(을) 영문/숫자 조합[6~20자]으로 입력해 주세요.";
	functions["vId"] = function(val){
		if(val.length < 6 || val.length > 20) return false;
		return isAscii(val);
	};
	
	//지역번호
	messages["vTelNo"] = "을 지역번호 형식에 맞게 입력해 주세요.";
	functions["vTelNo"] = function(val){
		return isTelNo(val);
	};
	
	//통신사번호 (10자리나 11자리입력시)
	messages["vHpNo"] = "를 통신사번호 형식에 맞게 입력해 주세요.";
	functions["vHpNo"] = function(val){
		var firstVal = val.substr(0,3);
		return isMpNo(firstVal);
	};
	
	//통신사번호
	messages["vMpNo"] = "를 통신사번호 형식에 맞게 입력해 주세요.";
	functions["vMpNo"] = function(val){
		return isMpNo(val);
	};
	
	//지역/통신사번호
	messages["vTelMpNo"] = "를 지역/통신사번호 형식에 맞게 입력해 주세요.";
	functions["vTelMpNo"] = function(val){
		return isTelMpNo(val);
	};

	//지역/통신사번호 중간자리
	messages["vTelMpNo2"] = "의 첫 시작은 0으로 시작될 수 없습니다.";
	functions["vTelMpNo2"] = function(val){
		return isTelMpNo2(val);
	};	
	
	//자릿수 체크[2,3자리]
	messages["vTwoThr"] = "를(을) 다시 입력해 주세요.";
	functions["vTwoThr"] = function(val){
		return isTwoThr(val);
	};
	
	//자릿수 체크[3,4자리]
	messages["vThrFour"] = "를 다시 입력해 주세요.";
	functions["vThrFour"] = function(val){
		return isThrFour(val);
	};
	
	//자릿수 체크[4자리]
	messages["vFour"] = "를 다시 입력해 주세요.";
	functions["vFour"] = function(val){
		return isFour(val);
	};
	
	//자릿수 체크[4자리]
	messages["vEight"] = "를 다시 입력해 주세요.";
	functions["vEight"] = function(val){
		return isFour(val);
	};
	
	//비밀번호
	messages["vPwd"] = "를(을) 영문/숫자 조합[8~12자]으로 입력해 주세요.";
	functions["vPwd"] = function(val){
		if(val.length < 8 || val.length > 12) return false;
		return isPassword(val);
	};
	
	//주민번호
	messages["vResNo"] = "를 형식에 맞게 입력해 주세요.";
	functions["vResNo"] = function(val){
		//return /[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}[12345678]{1}[0-9]{6}$/.test(val);
		return isResNo(val);
	};
	
	//주민번호 앞자리
	messages["vRegF"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vRegF"] = function(val){ return !val || isRegF(val); };
	
	
	//사업자번호
	messages["vBsmNo"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vBsmNo"] = function(val){ return isBsmNo(val); };
	
	//이메일
	messages["vEmail"] = "를(을) 형식에 맞게 입력해 주세요.";
	functions["vEmail"] = function(val){
		return !val || /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(val);
	};
	
	//이메일계정
	messages["vEmailAccount"] = "를 형식에 맞게 입력해 주세요.";
	functions["vEmailAccount"] = function(val){ return !val || isEmailAccount(val); };
	
	//이메일도메인
	messages["vEmailDomain"] = "를 형식에 맞게 입력해 주세요.";
	functions["vEmailDomain"] = function(val){
		return !val || /^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(val);
	};
	
	/********************** VALIDATOR **********************/
	
	/**
	 * @exp 
	  	if($.formValidator.validate($("#divId"))) {
	  		//some process...
	  	}
	 */
	jQuery.formValidator = {
			
		validate: function(obj){
			 var $result = true;
			 if(obj == null) obj = $("body");
			 $(obj).find(":text, :password, :radio, select, textarea").each(function(){
				 var $element = $(this);
				 if($element.attr("class") != undefined) {
					 // Trim 처리후 검증
					 if ($element.attr("class").indexOf('vTrim') && $element .attr('type') == 'text') {
						 if (typeof($element.val()) == 'string') {
							 $element.val($element.val().trim());							 
						 }
					 } 
					 $.each($element.attr("class").split(" "), function(idx){
						 var type = $element.attr("type");
						 if(type == "radio"){
							 var name = $element.attr("name");
							 if(functions[this] && $('input[name='+name+']:checked').length == 0){
								 alertPopup($element.attr("title") + messages[this],"ok",function(){
									 $element.focus();
								 });
								 $result = false;
								 return $result;
							 }
						 }else{
							 if(this && functions[this] && functions[this]($element.val()) == false){
								 alertPopup($element.attr("title") + messages[this],"ok",function(){
									 $element.focus();
								 });
								 $result = false;
								 return $result;
							 }
						 }
					});
				 }
				return $result;
			});
			return $result;
		},
		
		compare: function(obj){
			var $count = 0;
			if(obj == null) obj = $("body");
			$(obj).find(".vCprVld").each(function(idx){
				var $element = $(this);
				var $hiddenNm = "";
				if ($element.attr("class") == ".vCprVld") {
					
				}
				if ($element.attr("type") == "textarea") {
					$hiddenNm = $element.attr("id"); 
				} else {
					$hiddenNm = $element.attr("name");
				}
				
				if ($element.val() == $('input[name=c_h_'+$hiddenNm+']').val()){
					$count += 0;
				} else{
					$count += 1;
				}
				//console.log("비교 값 [ " + $element.val() +" | "+ $('input[name=c_h_'+$hiddenNm+']').val() + "  ] 비교result 번호[ " +idx+ " | 카운트 [ " + $count+ " ] ");
			});
			if ($count == 0) {
				//console.log("1");
				alertPopup("변경된 사항이 없습니다.","ok",null);
				return false;
			} else {
				return true;
			}
		}
		
	};
	
	
	/**
	 * @alias 숫자 체크함수
	 * @param 변수명 : obj
	 * @return 변수명 : 
	 */
	function checkNumber(obj){ 
	    var checkNumber = function (evt){
	        var keyCode;  
	        var isNetscape = (navigator.appName == "Netscape") ? 1 : 0;
	        if(isNetscape){
	            keyCode=evt.which;  
	            if((keyCode >13 && keyCode < 37) || keyCode > 57 && keyCode < 91 || keyCode > 105){  
	                evt.preventDefault();   
	            }
	        }else{
	            keyCode = event.keyCode;  
	            if ((keyCode >13 && keyCode < 37) || keyCode > 57 && keyCode < 91 || keyCode > 105){  
	                event.returnValue=false;  
	            }
	        }
	    };
	      
	    $(obj).keydown(checkNumber); 
	}
	
	/**
	 * @alias AUTOTAB 함수
	 * @param 변수명 : 현재위치, 다음위치, 최대길이
	 * @return 변수명 : 
	 */
	function fnNextFocus(curObj, nextObj, len) {
		if(curObj.value.length == len) {
			nextObj.focus();
		}
	}
	
	/**
	 * @alias telnumber check
	 * @param this
	 * @return 
	 */
	function telNumCheck(obj) {

		if(obj.value.length == 2) {
			str = obj.value.match("(0(2))");
		} else {
			str = obj.value.match("(0(3(1|2|3|0)|70|4(1|2|3|4)|5(1|2|3|4|5)|6(1|2|3|4)))");
		}
		if(!str) $("input[name="+obj.name+"]").val("");
	}

	/**
	 * @alias phoneNumber check
	 * @param this
	 * @return 
	 */
	function phoneNumCheck(obj) {
		
		str = obj.value.match("(0(1(0|1|6|7|8|9)))");
		
		if(!str) $("input[name="+obj.name+"]").val("");
	}
	
	/**
	  * @alias 실제 만 나이 체크
	  * @param regNo
	  * @return age
	  */
	function fnAgeCheck(s_regNo) {

		var today = new Date();
		var s_year = today.getFullYear();
		var s_month = today.getMonth() + 1;
		var s_day = today.getDate();
		
		var s_jy = Number(s_regNo.substring(0,2));	// 년도2자리
		var s_jm = Number(s_regNo.substring(2,4));	// 월
		var s_jd = Number(s_regNo.substring(4,6));	// 일
		var s_js = Number(s_regNo.substring(6,7));	// 성별
		
		var strFullYear = (s_js==1 || s_js==2 || s_js==5 || s_js==6) ? 1900 + s_jy : ((s_js==3 || s_js==4 || s_js==7 || s_js==8) ? 2000 + s_jy : 0);
		
		var s_age = s_year - strFullYear;
		var s_manAge = (s_month - s_jm) * 100 + (s_day - s_jd);
		
		return s_manAge >=0 ? s_age : s_age-1;
	}
	
	/**
	 * 폰번호 체크(필드ID 사용)
	 * @param tel1Id 연락처 첫번째 필드 ID
	 * @param tel2Id 연락처 두번째 필드 ID
	 * @param tel3Id 연락처 세번째 필드 ID
	 * @returns {Boolean}
	 */
	function phnTelNumCheck(tel1Id, tel2Id, tel3Id, focusObj) {
		var $tel2 = $('#' + tel2Id);
		
		if ($('#' + tel1Id).val() != '010') {
			return true;
		}
		if (!validHphnTelNo2($tel2.val())) {
			if(focusObj != undefined  && focusObj != ''){
				alertPopup('연락처를 정확하게 입력하여 주시기 바랍니다.',"ok",null,focusObj);
			}else{
				alertPopup('연락처를 정확하게 입력하여 주시기 바랍니다.',"ok",null);
				$tel2.focus();
			}
			return false;
		}
		
		var iptTelNo = $('#' + tel1Id).val() + $('#' + tel2Id).val() + $('#' + tel3Id).val();
		
		if (iptTelNo == '01020000000') {
			var noticeStr = "해당 연락처 번호는 고객의 요청에 의해 등록 차단된 번호이거나,\n";
			noticeStr += "고객연락처로 등록할 수 없는 번호로 차단된 번호입니다.\n\n";
			noticeStr += "- 차단요청일 : 2016-11-28\n";
			noticeStr += "- 차단근거 : 민원, 번호체계오류 등 입력불가한 연락처\n\n";
			noticeStr += "*자세한 내용은 1899-6782로 문의바랍니다.";
			if(focusObj != undefined  && focusObj != ''){
				alertPopup(noticeStr,"ok",null, focusObj);
			}else{
				alertPopup(noticeStr,"ok",null);
				$('#' + tel2Id).focus();
			}
			return false;
		}
		
		return true;
	}

	/**
	 * 폰번호 체크(연락처 번호 사용)
	 * @param tel1 연락처 첫번째 번호
	 * @param tel2 연락처 두번째 번호
	 * @param tel3 연락처 세번째 번호
	 * @returns {Boolean}
	 */
	function phnTelNumCheck2(tel1, tel2, tel3) {
		console.log("[validation.js phnTelNumCheck2()]");
		if (!validHphnTelNo2(tel2)) {
			alertPopup('연락처 중간자리를 정확하게 입력하여 주시기 바랍니다.',"ok",null);
			//$tel2.val('');
			//$tel2.focus();
			return false;
		}
		
		var iptTelNo = tel1 + tel2 + tel3;
		
		if (iptTelNo == '01020000000') {
			var noticeStr = "해당 연락처 번호는 고객의 요청에 의해 등록 차단된 번호이거나,\n";
			noticeStr += "고객연락처로 등록할 수 없는 번호로 차단된 번호입니다.\n\n";
			noticeStr += "- 차단요청일 : 2016-11-28\n";
			noticeStr += "- 차단근거 : 민원, 번호체계오류 등 입력불가한 연락처\n\n";
			noticeStr += "*자세한 내용은 1899-6782로 문의바랍니다.";

			alertPopup(noticeStr,"ok",null);
			//$('#' + tel2Id).focus();
			return false;
		}
		
		return true;
	}

	/**
	 * 휴대폰 두번째자리 체크
	 * @param telNo2Val 휴대폰 두번째 자리값
	 * @returns
	 */
	function validHphnTelNo2(telNo2Val) {
		try {
			var telNo2 = Number(telNo2Val);
		} catch(e) {
			return false;
		}
		
		return (telNo2 <= 1999 || telNo2 > 9999) ? false : true;
	}
	
	