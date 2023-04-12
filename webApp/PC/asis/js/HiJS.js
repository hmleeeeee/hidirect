/**
 * 각 프로젝트에서 필요에 의해 만들어진 script 모음
 * 
 * @class
 * @author Framework Team
 * @version 1.0
 * @since 1.0
 */

HiJS = new function() {
};

HiJS.mvc = hi.framework.mvc;
HiJS.page = hi.framework.pagination;
HiJS.tmpl = hi.framework.template;
HiJS.svr = {};

/* Error Message 용 변수 */
HiJS.errorMsg = null;

HiJS.rootContext = "";

/* 해당 시스템에 대한 로그 레벨 정의 */
hi.framework.config.Config.logLevel = "ERROR";

/* Ajax 방식에 대한 서버 URL (doRequestAjax, doRequestAjaxForm) */
hi.framework.config.Config.serverURL = HiJS.rootContext + "/DH.json";

/* Xec Ajax 방식에 대한 서버 URL (doRequestAjax, doRequestAjaxForm) */
hi.framework.config.Config.xecJsonServerURL = HiJS.rootContext + "/DH.xec";

/* Session Ajax 방식에 대한 서버 URL (doRequestAjax, doRequestAjaxForm) */
hi.framework.config.Config.sessServerURL = HiJS.rootContext + "/SDH.json";

/* Session Xec Ajax 방식에 대한 서버 URL (doRequestAjax, doRequestAjaxForm) */
hi.framework.config.Config.sessXecureJsonServerURL = HiJS.rootContext + "/SDH.xec";

/* doRequestForm 방식에 대한 URL */
hi.framework.config.Config.submitURL = HiJS.rootContext + "/service.do";

/* 파일 다운로드 URL */
hi.framework.config.Config.downloadURL = HiJS.rootContext + "/DH.download";

hi.framework.config.Config.serverTimeout = 180000;

/* Google Map URL 정보 */
// hi.framework.options.Config.mapURL =
// "http://maps.googleapis.com/maps/api/staticmap?";
/**
 * Ajax 방식으로 서버의 TranID를 호출한다.<br/> HiJs.svr.doRequestAjax(tranId, params,
 * callback ) 호출
 * 
 * @param {String}
 *            tranId 실행할 TRANID
 * @param {Object}
 *            options 서버 호출시 필요한 options 정보
 */
HiJS.svr.doRequestAjax = function(tranId, options) {

	if (!options.callback)
		options.callback = {};

	// failure callback이 없을 경우 default callback 사용
	if (!options.callback.failure) {
		options.callback.failure = HiJS.svr.defaultFailure;
	}

	// message callback이 없을 경우 default callback 사용
	if (!options.callback.message) {
		options.callback.message = function(responseStatus, responseObj) {
			if (typeof(responseObj) == 'string') {
				responseObj = JSON.parse(responseObj);
			}			
			if (responseObj.header.responseCode == 'OK') {
				HiJS.errorMsg = null;
			} else {
				HiJS.errorMsg = responseObj;
			}
		};
	}
	
	var _isBlocked = HiJS.isBlocked();
	hi.framework.jquery.HttpClient.doRequestAjax(tranId, {
		formId : options.formId,
		data : options.data,
		url : options.url,
		arrayFlag : (typeof(options.arrayFlag) == 'undefined' ? false : options.arrayFlag),
		timeout : options.timeout,
		xecure:(typeof(options.xecure) == 'undefined' ? true : (options.xecure) == true ? false : false),
		async : (typeof(options.async) == 'undefined' ? true : options.async),
		//tkformid: (typeof(options.tkformid) == 'undefined' ? false : options.tkformid),
		//tkchgname:options.tkchgname,
		cert:(typeof(options.cert) == 'undefined' ? false : options.cert),
		callback : {
			before : function() {		
				if(options.loadingbar != false && !_isBlocked){
					$.blockUI({
						fadeIn:0,
						fadeOut:0,
						ignoreIfBlocked:true						
					});
			  	}

				if (!options.callback.before) {
					if (typeof(options.callback.before) == 'function') {
						options.callback.before();		
					}
				}
			},
			/* 성공시 처리, 로직에서 개별 처리 */
			success : options.callback.success,
			/* 실패시 처리, 실패 메시지 공통 처리 */
			failure : options.callback.failure,
			/* success or failure 처리 후 호출된다. 응답 메시지에 대한 처리 */
			message : options.callback.message,
			/* 오류시 메시지 처리후 콜백 실행 */			
			error : options.callback.error,
			complete : function() {	
				if(options.loadingbar != false && !_isBlocked){
					$.unblockUI();
				}
				if (!options.callback.complete) {
					if (typeof(options.callback.complete) == 'function') {
						options.callback.complete();		
					}
				}
			}
		}
	});
};

HiJS.svr.doRequestForm = hi.framework.jquery.HttpClient.doRequestForm;

HiJS.svr.doRequestLink = hi.framework.jquery.HttpClient.doRequestLink;

HiJS.svr.doRequestDownload = hi.framework.jquery.HttpClient.doRequestDownload;

HiJS.svr.doRequestXecureLink = hi.framework.jquery.HttpClient.doRequestXecureLink;

HiJS.svr.getTKDecValue  = hi.framework.jquery.HttpClient.getTKDecValue;

HiJS.svr.getNOSDecValue = hi.framework.jquery.HttpClient.getNOSDecValue;

HiJS.isBlocked = function() {
	return $(window).data("blockUI.isBlocked") == '1' ? true : false;
};

HiJS.svr.doSyncAjaxLoadingBar = function(ajaxFnc) {
	var _localBlocked = HiJS.isBlocked();	
	if (!_localBlocked) {
		$.blockUI({
			fadeIn:0,
			fadeOut:0,
			ignoreIfBlocked:true						
		});
	}

	if (typeof ajaxFnc == 'function') {
		setTimeout(ajaxFnc, 200);		
	}

	if (!_localBlocked) {	
		$.unblockUI();
	}
};

/* Ajax loadingBar 처리 */
$(document).ready(function() {
	/*
	//$('body').append('<div id="loadingBar"><img src="' + HiJS.rootContext + '/images/ajax-loader.gif" /></div>');
	*/
	var image = '<img src="https://direct.hi.co.kr/images/loading/loading_kor.gif" />'; // 기존 국문의 경우 로딩바
	
	$(document).ajaxStart(function() {
		//$.blockUI({ message: image });
		//$('#loadingBar').show();
	});
	 
	
	$(document).ajaxSuccess(function() {
		//$.unblockUI();
		//$('#loadingBar').hide();
	});
	
	$(document).ajaxError(function() {
		//$.unblockUI();
		//$('#loadingBar').hide();
	});	
});

Date.prototype.format = function(f, isEmptyZero) {
    if (!this.valueOf()) return " ";
    
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return isEmptyZero ? (d.getMonth() + 1) : (d.getMonth() + 1).zf(2);
            case "dd": return isEmptyZero ? d.getDate() : d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

HiJS.svr.defaultFailure = function(responseObj) {
	if (typeof(responseObj) == 'string') {
		responseObj = JSON.parse(responseObj);
	}
	alert(responseObj.header.responseMessage);
	// 세션 만료일경우 첫 페이지로 이동
	if( responseObj.header.responseCode == "HIAPP-30001" ) {
		if( HiJS.rootContext == "" ) {
			document.location.replace("/");
		} else {
			document.location.replace(HiJS.rootContext);
		}
	}
};