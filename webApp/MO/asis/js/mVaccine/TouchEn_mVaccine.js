/*
 * TouchEn mVaccine WEBJS
 * Copyright(C)2015 RaonSecure Co., Ltd.
 * Version 2.1.3
 * 2015-04-17
 */

String.prototype.contains = function(str){
	return this.toLocaleLowerCase().indexOf(str) !== -1;
}; 

var version		="version=2.5"; 
var siteId		="hicardirect-web";
var timeOutBlur 	= 30;
var timeOutSession 	= 600;
var app 			= "com.android.browser|org.mozilla.firefox|com.opera.browser|com.opera.browser.mini.classic|com.opera.browser.mini.android|com.android.chrome|com.sec.android.app.sbrowser|net.daum.android.daum|com.nhn.android.search|mobi.mgeek.tunnybrowser|com.ucmobile.intl";
var ff 	 			= window.navigator.userAgent.contains('firefox'); 
var old 			= window.navigator.userAgent.contains('android 2.');
var safari			= window.navigator.userAgent.contains('safari');
var chrome			= false;
if(window.navigator.userAgent.contains('chrome')){
	chorme 	= true;
	safari 	= false;
}
var mVaccineLayer = "mVaccineLayer";

// mVaccine funtion start
function TouchEn_mVaccine() {
	this.mVaccine_lic = null;

	try{
		if(mVaccine_lic!=null)
			this.mVaccine_lic = mVaccine_lic;
	}catch(e){
		
	}
	this.callback_token = null;
	
	try{
		if(callback_token!=null)
			this.callback_token = callback_token;
	}catch(e){
		
	}
	
	this.callback_url = null;
	
	try{
		if(callback_url!=null)
			this.callback_url = callback_url;
	}catch(e){
		
	}
	
	this.useCallback = true;
	if(old)
		this.useCallback = false;
	
	this.mode = "mini";  
	this.isReady = false;
	this.isStart = false;
	this.isRepeat = false;
	
	// full모드 (ScanActivity) 구동
	this.full = function() {
		if(this.mVaccine_lic==null){
			alert("TouchEn mVaccine : 라이선스를 등록하세요.");
			return;
		}

		var i = "";
		i = "?siteid=" + siteId;
		i += "&licensekey=" + this.mVaccine_lic;
		i += "&" + version;
		i += '&update_pattern='		+ true;
		i += '&update_engine='     	+ true;
		i += '&useBlackAppCheck='  	+ true;
		i += '&scan_rooting='      	+ true;
		i += '&scan_package='      	+ true;
		i += '&isFgOrBg='		    + true;		
		i += '&rootingexitapp='     + true;
		i += '&callback_url='		+ this.callback_url;
		i += '&callback_token='		+ this.callback_token;
		i += '&debug='   			+ false;
		
		if (old) {
			location.replace('smartvaccinestart://'+i);
			return;
		}
		
		if(safari){
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "touchen_mvaccine");
			iframe.setAttribute("src", 'mvaccinestart://mvaccine'+i);
			iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
			document.body.appendChild(iframe);
			setTimeout(function(){
				document.body.removeChild(document.getElementById("touchen_mvaccine"));
			}, 1000);
			
			return;
		}

		if (ff) {
			location.href='mvaccinestart://mvaccine'+i; 
		} else {
			location.href="intent://mvaccine"+i+"#Intent;scheme=mvaccinestart;package=com.TouchEn.mVaccine.webs;end";
		}
	};
	
	// mini모드 (BackGround ScanActivity) 구동 (권장)
	this.mini = function() {
		if(this.mVaccine_lic==null){
			alert("TouchEn mVaccine : 라이선스를 등록하세요.");
			return;
		}

		var i = "";
		i = "?siteid=" + siteId;
		i += "&licensekey=" + this.mVaccine_lic;
		i += "&" + version;
		i += '&update_pattern='   	+ true;
		i += '&update_engine='		+ true;
		i += '&useBlackAppCheck='	+ true;
		i += '&scan_rooting='		+ true;
		i += '&scan_package='		+ true;
		i += '&rootingexitapp='		+ true;
		i += '&show_notify='		+ false;		
		i += '&show_scan_ui='		+ true;
		i += '&app='				+ app;
		i += '&timeOutBlur='		+ timeOutBlur;
		i += '&timeOutSession='		+ timeOutSession;
		i += '&callback_url='		+ this.callback_url;
		i += '&callback_token='		+ this.callback_token;
		i += '&callback_cycle='		+ 60;  
		i += '&debug='   			+ false;
		
		if (old) {
			location.replace('smartbgvaccinestart://'+i);
			return;
		}
		
		if(safari){
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "touchen_mvaccine");
			iframe.setAttribute("src", 'mvaccinestartbg://mvaccine'+i);
			iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
			document.body.appendChild(iframe);
			setTimeout(function(){
				document.body.removeChild(document.getElementById("touchen_mvaccine"));
			}, 1000);
			
			return;
		}
		 
		if (ff) {
			location.href='mvaccinestartbg://mvaccine'+i;
		} else {

			location.href="intent://mvaccine"+i+"#Intent;scheme=mvaccinestartbg;package=com.TouchEn.mVaccine.webs;end";
		}
	};
	this.exit = function() {
		if(_mVaccine.isStart)
			return;
		
		_mVaccine.isStart = true;
		
		if (ff) {
			location.href='mvaccineexit://mvaccine'; 
		} else if (old) {
			location.replace("smartvaccineexit://");
			return;
		}else if(safari){
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "touchen_mvaccine");
			iframe.setAttribute("src", 'mvaccineexit://mvaccine');
			iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
			document.body.appendChild(iframe);
			setTimeout(function(){
				document.body.removeChild(document.getElementById("touchen_mvaccine"));
			}, 1000);
			
			return;
		} else {
			location.href="intent://mvaccine#Intent;scheme=mvaccineexit;package=com.TouchEn.mVaccine.webs;end";
		}
		
		setTimeout("_mVaccine.isStart = false", 1000);
	};
	this.market = function() {
		//location.href="market://details?id=com.TouchEn.mVaccine.webs";
		var url="market://details?id=com.TouchEn.mVaccine.webs";
		$(location).attr('href',url);
	};
	
	this.start = function(){
		if(_mVaccine.isStart)
			return;
		
		_mVaccine.isStart = true;
				
		if(this.mode=="mini"){
			this.mini();
		}else{
			this.full();
		}
				
		setTimeout("_mVaccine.isStart = false", 1000);
	};
	
}
// mVaccine funtion end


// 팝업 레이어 체크 및 생성
function mVaccine_check() {
	if(_mVaccine.isReady)
		return false;
	
	mVaccineCheckStatus(function(result){
		if(!result)  // 레이어 없을 시 생성
			mVaccineOpenLayerDialog();
	});
	
	return false;
}

// 백신 실행을 위한 초기화 함수로 백신 실행여부를 확인하고 백신 설치/실행을 위한 팝업 생성
function mVaccine_onload() {
	_mVaccine.mode = "full";
	
	mVaccine_check();
}


// 백신을 재실행하기 위한 함수 session callback 값을 remove하고 백신 설치/실행을 위한 팝업 생성
function mVaccine_reload() {
	
	mVaccineSessionRemove(function(){
		if (!mVaccine_check())
			return;

		_mVaccine.start();
	});
}

// 백신 설치를 위해 구글스토어로 리다이렉션
function mVaccineCheck(){
	if(_mVaccine.isStart)
		return;
	
	_mVaccine.isStart = true;
	
	if(safari){
		var iframe = document.createElement("iframe");
		iframe.setAttribute("id", "touchen_mvaccine");
		iframe.setAttribute("src", 'market://details?id=com.TouchEn.mVaccine.webs');
		iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
		document.body.appendChild(iframe);
		setTimeout(function(){
			document.body.removeChild(document.getElementById("touchen_mvaccine"));
		}, 1000);
		
		return;
	}else{
		_mVaccine.market();
	}
	
	setTimeout("_mVaccine.isStart = false", 1000);
}

// 백신을 실행시키고 callback을 통해 백신이 실행되었는지 확인
function mVaccineStart(){

	_mVaccine.start();
	setTimeout("mVaccineScanCheck(true)", 2000);
}

// 백신 실행 여부를 session callback으로 확인하고 실행이 확인되면 팝업 닫음
function mVaccineScanCheck(repeat){
	_mVaccine.isRpeat = repeat;
	if(!_mVaccine.useCallback){
		mVaccineLayerClose();
		return;
	}
	
	mVaccineCheckStatus(mVaccineScanCheckCallback);
}

function mVaccineScanCheckCallback(result){
	if(result){
		mVaccineLayerClose();
	}else{
		if(_mVaccine.isRpeat)
			setTimeout("mVaccineScanCheck(true)", 2000);
	}
}

// session callback 값을 확인하고 콜백 함수에 true/false를 전달해서 실행
function mVaccineCheckStatus(callbackFunction){
	
	var request = new XMLHttpRequest();
	request.open("POST", _mVaccine.callback_url, false);
	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200) {
			var returnValue = request.responseText.replace(/^\s+|\s+$/g,"");
			var returnValueArray = returnValue.split(",");
			returnValue = returnValueArray[0];
			
			if(returnValue=='null'){
				var cToken = returnValueArray[4];
				if(cToken!=null){
					if(_mVaccine.callback_token!=cToken)
						_mVaccine.callback_token = cToken;
				}

			}
						
			if(callbackFunction!=null){
				if(returnValue=='null')
					callbackFunction(false);
				else
					callbackFunction(true);
				
			}else{
				if(returnValue=='null')
					return false;
				else
					return true;
			}

		}else{
			if(callbackFunction!=null){
				callbackFunction(false);
			}else{
				return false;
			}
		}
	};
	request.send();

	return false;
}

// session callback 값을 remove 하고 콜백함수를 실행
function mVaccineSessionRemove(callbackFunction){
	var request = new XMLHttpRequest();
	request.open("POST", _mVaccine.callback_url+"?mVaccine_op=setCheck&mVaccine_check=false", false);
	if(callbackFunction!=null)
		request.onreadystatechange = callbackFunction;
	request.send();
}

// 백신 설치/실행 팝업을 생성
function mVaccineOpenLayerDialog() {
	
	if(document.getElementById(mVaccineLayer)!=null)
		return;

    var div1 = document.createElement("DIV");
    div1.id = mVaccineLayer;
    div1.style.position = "absolute";
    div1.style.height = "100%";
    div1.style.width = "100%";
    div1.style.top = "0";
    div1.style.left = "0";
    div1.style.background = "#000000";
    div1.style.opacity = "0.4";
    div1.style.filter = "alpha(opacity=40)";
    
    var div2 = document.createElement("DIV");
    div2.style.cssText="width: 200px;z-index: 1001;border: 3px solid orange;border-radius: 11px;background: gray;";
    div2.innerHTML="<span style='color:orange;'>TouchEn mVaccine</span><br><span id='mVaccineLayerText1'>백신을 설치 / 실행해주시기바랍니다. 이미  설치되어있는 분은 바로 실행해주시기바랍니다.</span><span id='mVaccineLayerText2' style='display:none;'>백신을 실행합니다.</span>"
    	+"<div><span id='mVaccineCheck'><button style='margin: 10px;width: 70px;' onclick='mVaccineCheck();'>설치</button></span>"
    	+"<span id='mVaccineStart''><button style='margin: 10px;width: 70px;' onclick='mVaccineStart();'>실행</button></span><span id='mVaccineLoading' style='display:none;'>실행중...</span></div>"+
    	"<div>백신실행확인</div><span id='mVaccineScanCheck'><button style='margin: 10px;width: 70px;' onclick='mVaccineScanCheck(false);'>확인</button>";
    
    var div3 = document.createElement("DIV");
    div3.id = mVaccineLayer + "_popup";
    div3.style.cssText="position: absolute;  display: table-cell;text-align: center; vertical-align: middle; color: white;z-index: 1000;";
    div3.appendChild(div2);
    
    document.body.appendChild(div1);
    document.body.appendChild(div3);
    
    
    mVaccineLayerResize();

    window.onresize = function(event) {mVaccineLayerResize();};
    
	_mVaccine.isReady=true;
}

// 디바이스 가로/세로 화면 전환시 설치/실행 팝업의 사이즈와 위치를 조정
function mVaccineLayerResize() {
	var div1 = document.getElementById(mVaccineLayer);
    var div2 = document.getElementById(mVaccineLayer + "_popup");
    if (div2) {
    	div2.style.top = (div1.clientHeight/2)-100+"px";
    	div2.style.left = (div1.clientWidth/2)-100+"px";
    }
}

// 설치/실행 팝업을 닫음
function mVaccineLayerClose(){
	
	var close = true;
    if (close) {
    	_mVaccine.isReady=false;
        var div1 = document.getElementById(mVaccineLayer);
        var div2 = document.getElementById(mVaccineLayer + "_popup");
        
        if (div1) {
            document.body.removeChild(div1);
        }
        if (div2) {
            document.body.removeChild(div2);
        }
        
        window.onresize = null;
    }
}
var _mVaccine = new TouchEn_mVaccine();