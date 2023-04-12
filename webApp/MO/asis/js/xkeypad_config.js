 ﻿var g_XKBasePath = "https://qaxk.hi.co.kr";
﻿//var g_XKBasePath = window.location.protocol + "//" + window.location.host + "";

var XKConfigMobile = {
		server : g_XKBasePath + "/xkscriptservice",
		contextRoot	: g_XKBasePath + "/js",
		cssPath : g_XKBasePath + "/theme_white/css/xkp_mobile.css",
		logoImgPath : g_XKBasePath + "/theme_white/img/logo.png",
		inputObjectBackgroundColor : "#E4E4E4",
		inputObjectBorderStyle : "1px solid #9E9E9E",
		invalidSessionErrorMessage : "보안세션이 만료되었습니다.\n'확인'을 누르면 키패드가 갱신 됩니다.",
		invalidSessionAutoRefresh : true,
		enableAccessibility : true, 
		useCustomAlert : false,
		functionKeyButtonStyle : "text", // "symbol"
		maxInputSize : 10,
		textInputView : 0,
		touchOption : 0 //0:touchstart 1:touchend
	};

