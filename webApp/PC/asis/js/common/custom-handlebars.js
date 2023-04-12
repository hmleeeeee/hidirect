/**
 * @alias 2개의 변수를 비교하는 함수
 * @param lvalue : 변수1
 *        operation : 비교연산자(==, ===, !=, <, >, <=, >=, typeof)
 *        rvalue : 변수2
 */
Handlebars.registerHelper('compare', function(lvalue, operation, rvalue, options) {
	var operators = {
		'==':       function(l,r) { return l == r; },
		'===':      function(l,r) { return l === r; },
		'!=':       function(l,r) { return l != r; },
		'<':        function(l,r) { return l < r; },
		'>':        function(l,r) { return l > r; },
		'<=':       function(l,r) { return l <= r; },
		'>=':       function(l,r) { return l >= r; },
		'typeof':   function(l,r) { return typeof l == r; }
	}

	if (!operators[operation])
		throw new Error("잘못된 비교 연산자입니다. ["+operation+"]");

	var result = operators[operation](lvalue,rvalue);

	if( result ) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});


/**
 * @alias 문자열 자르는 함수
 * @param str : 문자열
 *        startIndex : 시작 
 *        endIndex : 끝
 */
Handlebars.registerHelper('substring', function(str, startIndex, endIndex) {
	try {
		var theString = str.substring(startIndex,endIndex);
	}catch(e){
		return str;
	}
    return new Handlebars.SafeString(theString);
});

/**
 * @alias replace
 * @param str : 문자열
 *        startIndex : 시작 
 *        endIndex : 끝
 */
Handlebars.registerHelper('replace', function(str, searchStr, replaceStr) {
	try {
		var theString = str.replace(searchStr,replaceStr);
	}catch(e){
		return str;
	}
    return new Handlebars.SafeString(theString);
});

/**
 * @alias replaceAll
 * @param str : 문자열
 *        startIndex : 시작 
 *        endIndex : 끝
 */
Handlebars.registerHelper('replaceAll', function(str, searchStr, replaceStr) {
	try {
		var theString = replaceAll(str, searchStr, replaceStr);
	}catch(e){
		return str;
	}
	return new Handlebars.SafeString(theString);
});

/**
 * @alias comma
 * @param str : 문자열
 *        startIndex : 시작 
 *        endIndex : 끝
 */
Handlebars.registerHelper('comma', function(str) {
	try {
		var theString = getCurrencyValue(parseInt(str));
	}catch(e){
		return str;
	}
	return new Handlebars.SafeString(theString);
});

/**
 * @alias 두 숫자 계산 함수
 * @param lvalue : 숫자1
 *        rvalue : 숫자2
 *        operation : 연산자(+, -, *, /, ^, %
 */
Handlebars.registerHelper('calculator', function(lvalue, operation, rvalue) {
	var operators = {
		'+':      function(l,r) { return parseInt(l) + parseInt(r); },
		'-':      function(l,r) { return parseInt(l) - parseInt(r); },
		'*':      function(l,r) { return parseInt(l) * parseInt(r); },
		'/':      function(l,r) { return parseInt(l) / parseInt(r); },
		'^':      function(l,r) { return parseInt(l) ^ parseInt(r); },
		'%':      function(l,r) { return parseInt(l) % parseInt(r); }
	}

	if (!operators[operation])
		throw new Error("잘못된 연산자입니다. ["+operation+"]");

	var result = operators[operation](lvalue,rvalue);

	return result;
});

/**
 * @alias date
 * @param str : 문자열
 * @param separator : 구분자
 * @exam {{#date 20130308 xxxx-xx-xx}} -> 2013-03-08
 * @exam {{#date 130308 xx.xx.xx}} -> 13.03.08
 */
Handlebars.registerHelper('date', function(str, separator) {
	var theString = "";
	var convertStrIndex = 0;
	for(var i = 0 ; i < separator.length ; i++) {
		if(separator[i] === "x") {
			theString += str[convertStrIndex];
			convertStrIndex++;
		} else {
			theString += separator[i];
		}
	}
	return new Handlebars.SafeString(theString);
});

/**
 * @alias 사업자번호 필터 변환
 * @param str : 문자열
 * @exam {{#bzNo xxxxxxxxxx}}-> xxx-xx-xxxxx
 */
Handlebars.registerHelper('td_bzNo', function(str) {
	var theString = "";
	var regex = "";
	regex = /([0-9]{3})(\-*)([0-9]{2})(\-*)([0-9]{5})/;
	var tmp = str.match(regex); 
	if (tmp != null) { 
		theString = tmp[1] + "-" + tmp[3] + "-" + tmp[5];
	}
	return new Handlebars.SafeString(theString);
});