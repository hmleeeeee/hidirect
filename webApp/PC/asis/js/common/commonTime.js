	var timerchecker = null;
	var initTime = 1200;
	//var initTime = 20;
	var timerId = '';
	
	/*
	 * 본인인증 시간 연장
	 */
	function setTimeExtend(){
		HiJS.svr.doRequestAjax('DHCO0099M10S', {
			xecure : false,
			callback : {
				success:function(responseData) {
					if(responseData.header.responseCode == 'OK'){
						if(responseData.data.certRsltCd == "0000"){
							setTimeReset(timerId);
						}else{
							openLayer('certificateEndLayer','common');
							$("#"+timerId).hide();
							setTimeExpire();
						}
					}else{
						openLayer('certificateEndLayer','common');
						$("#"+timerId).hide();
						setTimeExpire();
					}
				}
			}
		});
	}
	
	/*
	 * 세션 종료
	 */
	function setTimeExpire(){
		HiJS.svr.doRequestAjax('DHCO0099M14S', {
			data : {Expire : true},
			xecure : false,
			callback : {
				success:function(responseData) {
					if(responseData.header.responseCode == 'OK'){
						
					}else{
						alert('세션체크 실패');
					}
				}
			}
		});
	}
	
	/*
	 * 레이어 본인인증 시간 연장
	 */
	function certificateLayerExtend(id){
		closeLayer(id);
		setTimeExtend();	
	}
	
	/*
	 * 본인인증 시간 리셋
	 */
	function setTimeReset(id){
		timerId = id;
		$("#"+timerId).show();
		
		showCountdown(initTime, 2);
	}
	
	/*
	 * Timer 초기화 Logic
	 */
	function clearCountdownTimeOut()  {
		if( timerchecker != null ){
			clearTimeout( timerchecker );
		}
		
		timerchecker = null;
	}
	
	/*
	 * 시간 표시 설정
	 */
	function setTimeStr( value ){
		var rtnValue = value+"";
		if( rtnValue.length < 2){
			rtnValue = "0"+rtnValue;
		}
		return rtnValue;
	}
	
	/*
	 * 시간 로직
	 */
	function showCountdown(ExpireTime, flag){
		var day, hour, min, sec, mod;
		var CountText = "";
		var RemainTime = ExpireTime -1;
		
		if(RemainTime >= 0){
			day = Math.floor(RemainTime / (3600*24));
			
			mod = RemainTime % (24 * 3600);
			
			//남은 시간
			hour = Math.floor(mod/3600);
			mod = mod % 3600;
			//남은 분
			min = Math.floor(mod/60);
			//남은 초
			sec = mod % 60;
			
			CountText = (day > 0)?day +"일 " : "";
			CountText = (hour > 0)?CountText + hour +"시간 " : (CountText.length>0)?CountText + "시간" : CountText;
			CountText = (min > 0)?CountText + setTimeStr(min) +"분 " : (CountText.length > 0)?CountText + setTimeStr(min) + "분" :CountText;
			CountText = CountText + setTimeStr(sec) +"초";
		}
		
		if(min <= 0 || min == ""){
			//이제 그만
			CountText = "00분 "+CountText;
		}
		if(min != "" && min >= 20){
			sec = 0;
			CountText = "20분 00초";
		}
		if((sec <= 0 && CountText == "00초") || (CountText == "")){
			//이제 그만
			CountText = "00분 00초";
		}
		
		var chkLabel = "";
		
		try{
			chkLabel = typeof document.getElementById(timerId);
			if(chkLabel != "undefined"){
				//화면에 값 뿌리기
				if(timerId == 'cTimeCount'){
					$("#"+timerId).find('strong').empty();
					$("#"+timerId).find('strong').append(CountText);
				}else if(timerId == 'mTimeCount'){
					$("#"+timerId).find('span').find('span').empty();
					$("#"+timerId).find('span').find('span').append(CountText);
				}else if(timerId == 'gTimeCount'){
					$("#"+timerId).find('div').find('span').find('span').empty();
					$("#"+timerId).find('div').find('span').find('span').append(CountText);
				}
			}
		}catch(e){}
		
		if(RemainTime == 300){
			//if(RemainTime == 20){
				openLayer('certificate5Layer','common');
		}
		
		if(RemainTime == 60){
			//자동차보험료확인시 세션값 저장하기위한 처리 2017.12.12			
			if("2fd44d8972" == _menuId){
				console.log('fnC2CStep4Save');
				fnC2CStep4Save();
			}
		}
		if(RemainTime == 0){
				openLayer('certificateEndLayer','common');
				$("#"+timerId).hide();
				setTimeExpire();
				return;
		}
		
		if(CountText != "0"){
			if(flag == 1){
				timerchecker = setTimeout("showCountdown("+RemainTime+", 1)", 1000);
			}else if(flag == 2){
				clearCountdownTimeOut();
				showCountdown(initTime, 1);
			}
		}
	}