/**
 * 
 */
//-- CCMEDIA Ad-Nibbler Tag Service 1.0
//-- Copyright 2017 CCMEDIA, All Rights Reserved.
// util start 

var _BT_SVR = "";

var _BT_TRK= "/weblog/weblog_tag.jsp";

function _bt_run_track ( ) {

	var _BT_target = _BT_get_simple_tag () ;
	var img = new Image ();	
	img.src = _BT_target;
	img.onload = function () { return;};

	if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_target);

}

function _BT_getref () {
	var v_ref = document.referrer;
	if( (v_ref=='undefined')||( v_ref == '' )) {
		eval(" try{ v_ref = parent.document.referrer ;}catch( _error){ v_ref = '';}");
	}
	return v_ref;
} 

function _BT_getcurtime () {
	
	var sdate = new Date();
	var iday = sdate.getDay();
	var imon = sdate.getMonth() + 1;
	var iyea = sdate.getFullYear();
	var ihour = sdate.getHours ();
	var imin = sdate.getMinutes ();
	var isec = sdate.getSeconds ();
	var szret;
  	if(iday < 10) iday = '0' + iday;
  	if(imon < 10) imon = '0' + imon;
  	szret = iyea + "" + imon + "" + iday + (( ihour < 10) ? "0" : "" )  + ihour + (( imin < 10) ? "0" : "" ) + imin + (( isec < 10) ? "0" : "" ) + isec;
  	return szret;
}

function _BT_get_simple_inline ( uid, tab ) {

	var _BT_dim= "&tagtype=1&scr=" + window.screen.width+'x'+window.screen.height;
	var _BT_ref = _BT_getref ();
	var _BT_time = _BT_getcurtime();
	
	var _BT_ret =  _BT_TRK + "?tz=" +  _BT_time + "&_BT_tab=" + tab
					+  "&url=" + escape(document.location) + _BT_dim + "&ref=" + escape ( _BT_ref )
					;
	var img = new Image ();	
	img.src = _BT_ret;
	img.onload = function () { return;};

	if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_ret);	
	return _BT_ret;

}

function _BT_get_simple_inline_tag ( uid, tab) {
	var tagtype = uid;
	var _BT_dim= "&tagtype=" + tagtype +"&scr=" + window.screen.width+'x'+window.screen.height;
	var _BT_ref = _BT_getref ();
	var _BT_time = _BT_getcurtime();
	
	var _BT_ret =  _BT_TRK + "?tz=" +  _BT_time + "&_BT_tab=" + tab
					+  "&url=" + escape(document.location) + _BT_dim + "&ref=" + escape ( _BT_ref )
					;
	var img = new Image ();	
	img.src = _BT_ret;
	img.onload = function () { return;};

	if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_ret);	
	return _BT_ret;


	
}

function _BT_get_simple_inline_json ( uid, tab ) {
	var tagtype = uid;
	var _BT_dim= "&tagtype=" + tagtype + "&scr=" + window.screen.width+'x'+window.screen.height;
	var _BT_ref = _BT_getref ();
	var _BT_time = _BT_getcurtime();
	
	var _BT_ret =  _BT_TRK + "?tz=" +  _BT_time + "&_BT_tab=" + tab
					+  "&url=" + escape(document.location) + _BT_dim + "&ref=" + escape ( _BT_ref )
					;
	var img = new Image ();	
	img.src = _BT_ret;
	img.onload = function () { return;};

	if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_ret);	
	return _BT_ret;

}

function _BT_get_simple_tag () {

	var _BT_dim= "&tagtype=1&scr=" + window.screen.width+'x'+window.screen.height;
	var _BT_ref = _BT_getref ();
	var _BT_time = _BT_getcurtime();
	var _BT_ret =  _BT_TRK + "?tz=" +  _BT_time + _BT_dim + "&ref=" + escape ( _BT_ref ) + "&url=" + escape(document.location) 
					;

	return _BT_ret;

}

/**
 * Form 객체로 부터 Query Url 생성
 */
function _BT_get(formId){
	
	var hmap = new Array();
	var retUrl = '';
	var type;
	
	var fnode = document.getElementsByName(formId)[0];
	
	var childList = fnode.childNodes;
	
	for (var idx=0; idx<childList.length; idx++ ){
		var childElement = childList.item(idx);
		
		try { 
			//	브라우져 별 parsing
			var agent = navigator.userAgent.toLowerCase();
			if (agent.indexOf("chrome") != -1 
					|| agent.indexOf("firefox") != -1
					|| agent.indexOf("safari") != -1){
				type = childElement.attributes.item('type').nodeValue;
			}else if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)){
				type = childElement.attributes.getNamedItem('type').nodeValue;
			}
	
			if (childElement.nodeName.toLocaleLowerCase() == 'input'){
					
				if (type.toLowerCase() == 'text'){
					hmap.push(childElement.name + '=' + escape(encodeURIComponent(childElement.value)));
				}else if (type.toLowerCase() == 'password'){
					hmap.push(childElement.name + '=' + escape(encodeURIComponent(childElement.value)));
				}else if ((type.toLowerCase() == 'checkbox' || type.toLowerCase() == 'radio')
						
						&& childElement.checked){
					
					hmap.push(childElement.name + '=' + escape(encodeURIComponent(childElement.value)));
					
				}else if (type.toLowerCase() == 'hidden'){
					if ( typeof(_BT_TRACK_HIDDEN_) =="undefined" ||   _BT_TRACK_HIDDEN_  == false )  continue; 
					hmap.push(childElement.name + '=' + escape(encodeURIComponent(childElement.value)));
				}			
				
			}else if (childElement.nodeName.toLocaleLowerCase() == 'select'){
				
				hmap.push(childElement.name + '=' + escape(encodeURIComponent(childElement.value)));
				
			}else if (childElement.nodeName.toLocaleLowerCase() == 'textarea'){
				hmap.push(childElement.name + '=' + escape(encodeURIComponent(childElement.value)));
			}

		}
		catch ( _e ) {
			
		}
	}

	for (var idx=0; idx < hmap.length; idx++){
		retUrl += hmap[idx];
		if (idx < hmap.length - 1)
			retUrl += '&';
	}
	return retUrl;
}

function _bt_uinfo (action) {
	var _f;
	
	var szret = "";
	
	try {

		/**
		 * submit 인 경우
		 * _BT_TRACK_FORM_ 상관없이 실행
		 * 
		 */
		if ( action != "submit" || (typeof(_BT_TRACK_FORM_) =="undefined" ||  _BT_TRACK_FORM_ == "") ) return;

		szret = "tagtype=2&";
		if ( _BT_TRACK_FORM_ == "all" ) {
			
			// step1.  make hash for whole forms.
			var formList = document.forms;
			for (var idx=0; idx<formList.length; idx++){
				var form = formList[idx];
				szret = szret + _BT_get(form.name) +"&";
			}
		}
		else {
			szret += _BT_get ( _BT_TRACK_FORM_ );
		}
		var _BT_target =  _BT_TRK + "?" + szret;
		var imgu = new Image ();	
		imgu.src = _BT_target;
		imgu.onload = function () { return;};
		if ( typeof(_BT_DEBUG_) !="undefined" && _BT_DEBUG_ == "on" ) alert ( _BT_target);
	}
	catch(_e){		
		
		alert ( _e );
	};
}

function _get_gtn_value(_obj){
	return encodeURIComponent(JSON.stringify(_obj));
}
/*
try {
	if ( typeof ( window.onbeforeunload ) != 'undefined' && window.onbeforeunload == null ) {
		window.onbeforeunload = _bt_uinfo;
	}
}
catch(_e){

};
*/
