/**
 * @alias 단기 운전자 변경 내용 정보 
 * 
 */
function fnGetFutEndorInfo(){

	var oReqData = {
			sPolicyType : sPolicyType
		  , sPolicyYM : sPolicyYM
		  , sPolicySer : sPolicySer
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M02L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				var lstData = responseObj.data;
				
				if(lstData.webEndorseList.length >0){
					//단기운전자 변경 내용이 존재하면
					$('#step01').show();
				}else{
					//신규 화면
					$('#step01_04').show();
					
				}
					$('#step05').hide();
				
					//현재 운전자 범위및 연령특약 정보 조회
					fnGetContractBasicInfo();
					
				
			}
		}
	});

}

/**
 * @alias  단기 운전자 변경 신청 내역 확인 / 변경
 * 
 */
function fnGetFutEndorInfo2(){
	var oReqData = {
			sPolicyType : sPolicyType
		  , sPolicyYM : sPolicyYM
		  , sPolicySer : sPolicySer
		};	

	HiJS.svr.doRequestAjax('DHMY0130M02L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {				
				var list = responseObj.data.webEndorseList;
				if(list.length > 0){
					var numCnt = list.length - 1 ; //역순으로 보여주기 위한 번호		
					var cnt = 0;
					for(var i = 0; i < list.length; i++) {						
						//결제 금액
						var nUnrectPrem = parseInt(list[numCnt - i].nRectPrem) - parseInt(list[numCnt - i].nUnrectPrem);
						
						var sDisabled ="";
						if(sCurrDate > parseInt(list[numCnt - i].sFmdt)){
							//현재일이 배서시기보다 크면 변경금지
							sDisabled = "disabled";
							cnt++;
						}
						var data = "<tr>"
			                +"<td id='textbox468'><input type='radio' name='endrioRadioChk' id='endrioRadioChk' title='신청 내역 선택' "+sDisabled+" value='"+(numCnt - i)+"'col></td>"
			                +"<td id='endorFam"+(numCnt - i)+"' name='endorFam"+(numCnt - i)+"'>"+list[numCnt - i].specName1+" </td>"
			                +"<td id='endorAge"+(numCnt - i)+"' name='endorAge"+(numCnt - i)+"'>"+list[numCnt - i].specName+"</td>"
			                +"<td id='endorPer"+(numCnt - i)+"' name='endorPer"+(numCnt - i)+"'>"+setFormatDate(list[numCnt - i].sFmdt,'.') +" 24:00  ~ "+setFormatDate(list[numCnt - i].sTodt,'.')+ " 24:00 </td>"
			                +"<td id='nUnrectPrem"+(numCnt - i)+"' name='nUnrectPrem"+(numCnt - i)+"'>"+nUnrectPrem+"원</td>"
			                +"<input type='hidden' name='sFmdt"+(numCnt - i)+"' id='sFmdt"+(numCnt - i)+"' value='"+list[numCnt - i].sFmdt+"'>"
			                +"<input type='hidden' name='sTodt"+(numCnt - i)+"' id='sTodt"+(numCnt - i)+"' value='"+list[numCnt - i].sTodt+"'>"
			                +"<input type='hidden' name='sInputDate"+(numCnt - i)+"' id='sInputDate"+(numCnt - i)+"' value='"+list[numCnt - i].sInputDate+"'>"
			                +"</tr>	";									 						
						$("#webEndorseList").append(data);
					}
					//변경신청 버튼 제어
			    	if(cnt == list.length){
			    	    $('#endorModify').hide();
			    		
			    	}else{
			    		$('#endorModify').show();           		
			    	}
					
				}else{
					var data ="<tr><td colspan='4'>변경 내역이 없습니다.</td></tr>";
					$("#webEndorseList").append(data); 
					
				}

				
			}
		}
	});

}

/**
 * @alias 현재 운전자 범위및 연령특약 정보 조회
 * 		  (배서 진행전  기본정보) 
 */
function fnGetContractBasicInfo(){

	var oReqData = {
			sPolicyType : sPolicyType
		  , sPolicyYM : sPolicyYM
		  , sPolicySer : sPolicySer
		  , searchStdDate : sCurrDate
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M03L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				var data = responseObj.data;
				var sFamLongName =  data.sFamLongName;
				if(trimAll(sFamLongName) =="기본계약" || trimAll(sFamLongName)=="기본계약(누구나)"){
					 sSpecLongName ="누구나";
				}
				//현재 운전자 / 연령 범위
				$('#textbox229a').text(sFamLongName);//운전자범위
				$('#textbox231a').text(data.sAgeLongName);//연령범위
				
				$('#textbox229b').text(sFamLongName);//운전자범위
				$('#textbox231b').text(data.sAgeLongName);//연령범위
				
				$('#txtEngineNo2').text(sFamLongName);//운전자범위
				$('#txtEngineNo3').text(data.sAgeLongName);//연령범위
				
				//최종지정1인 정보
				$('#t_sUserDriverID').val(data.sDriverID);
				$('#t_sUserDriverName').val(data.sDriverName);
				$('#t_sUserDriverCnt').val(data.nCnt);
				
				//보험기간 저장
				$('#v_sFmdt').val(data.sFmdt);
				$('#v_sTodt').val(data.sTodt);							
			}
		}
	});

}

/**
 * @alias 단기 운전자 변경 다음단계 - 기존 내역이 있으면 신규 ,수정 신청 
 * 	
 */
function fnNextDriver0402(gubun){
	if(gubun == 0){	//이전신청 내용
		$('#step01_02').show();
		$('#step01').hide();
		fnGetFutEndorInfo2();
		
	}else{	//추가 신청     
		$('#step01_04').show();
		$('#step01').hide();
		
		 $("#srcImageData").val("");//운전자범위 이미지 초기화
	
		
	}
	//설정 값 리셋
	fnTextReset_step01();
}  

/**
 * 보험종료기간 셋팅 
 */
function fnDriverDateChk(obj){
	var dt = replaceAll($(obj).val(), '-', '');
	
	if(!$(obj).val()){
		return;
	}else if(!isDate(dt)){
		alert('변경기준일자 형식이 올바르지 않습니다.');
		$(obj).val('');
		return;
	}
	
	if(dt <= _currDate.format('yyyyMMdd')){
		alert('현재일 이전은 선택하실수 없습니다.');
		$(obj).val('');
		return;
	}
	
	var startDate = delSpecialChar("inputCalendar3", "-");
	var endDate = delSpecialChar("inputCalendar4", "-");
	
	if(startDate !="" && endDate !=""){
		
     	if( parseInt(startDate) > parseInt(endDate)  ){
         	alert("종료 일자가 시작 일자 보다 작을수 없습니다.");
         	$(inputCalendar4).val('');
         	return false;
        }else if(parseInt(getAddDate(startDate,90)) < parseInt(endDate)){
        	alert("단기운전자 변경 기준일은 최대 3개월(90)일을 초과할수없습니다");
        	$(inputCalendar4).val('');
         	return false;
        }
     	
     	var y1 = getAddDate(startDate,-1).substring( 0, 4 );
     	
     	var m1 = getAddDate(startDate,-1).substring( 4, 6 );
     	var d1 = getAddDate(startDate,-1).substring(6, 8 );
     	
     	var y2 = endDate.substring( 0, 4 );
		var m2 = endDate.substring( 4, 6 );
		var d2 = endDate.substring( 6, 8 );
		
	      
        var msg = "보험 계약의 변경 효력 기간은 <span>"+y1+"."+m1+"."+d1+". 24:00</span> 부터 <span>"+y2+"."+m2+"."+d2+". 24:00</span> 입니다."
                  
        $('#textbox554').text(y1+"."+m1+"."+d1+". 24:00");
        $('#textbox555').text(y2+"."+m2+"."+d2+". 24:00");
        
    }
	
}

/**
 * @alias 단기 운전자 변경  2단계 이동 -운전자 범위 및 연령입력
 * 	
 */
function fnNextDriverRange(gubun){
	var startDate = delSpecialChar("inputCalendar3", "-");
	var endDate = delSpecialChar("inputCalendar4", "-");
    
    if(startDate =="" || endDate==""){
		alert("변경기준일자를 입력해주십시요");
		return;
	}
    
    //운전자 범위 남성 여성 이미지 셋팅
    var sCustNo2 = sInsrdID.substring(6,13);
    sCustNo2 = sCustNo2.substring(0,1);
    var sCustNoImg = "";
    
    if ( sCustNo2 == "1" || sCustNo2 == "3" || sCustNo2 == "5" || sCustNo2 == "7" ){
         sCustNoImg = "1";
    } else {
         sCustNoImg = "2";
    }

    
    $('#srcImage').attr("src", "https://direct.hi.co.kr/images/EN/driver_img"+sCustNoImg+"0.gif");
    //운전자 범위를 선택하고 이전단계에서 다음단계로 이동시 초기화 2015.01.26 - 한성환
    if($('#t_sFamSpecCode').val() !=""){
    	var radioChk = $(':radio[name="radioChk"]');

        //특약 추가 2013.10.16 - 한성환
        for(var i=0;i < radioChk.length ;i++){
        	radioChk[i].checked = false;
        }
        fnChangeImageAndText(0);
    }
   
    //alert(WebSquare.xml.getString(pola001Info, "sSpcType")); 2015.06.08 테스트
    $('#step01_03').hide(); //단기 운전자 변경 내역 변경 신청
    $('#step01_04').hide();	//단기 운전자 변경 신청 정보 입력
    $('#step02').show();	//운전자 범위 및 연령 입력

    if(gubun == 0){
    	//신규 신청으로 들어오는경우
    	$('#pListBtn').hide();
    	$('#pBtn').show(); //신규신청으로  보여주는 이전버튼	
    }else{
    	//변경 내역에서 들어오는 경우
    	$('#pBtn').hide();
    	$('#pListBtn').show(); //변경 내역에서 보여주는 이전버튼
    }
    
    

}

/**
 * @alias 단기운전자 변경신청
 * 	
 */
function fnEndorModify(){
	//1단계 설정 값 리셋
	fnTextReset_step01();
	
	var checkedLen = $(':radio[name="endrioRadioChk"]:checked').length;
	var checkedCnt = $(':radio[name="endrioRadioChk"]:checked').val();

	if(checkedLen < 1){
		alert("변경하실 단기운전자 변경 건을 선택해 주세요.");
		return;
	}
	
	//값 설정
	var sFmdt = $('#sFmdt'+checkedCnt+'').val();
	$('#inputCalendar3').val(getAddDate(sFmdt,1));//변경 시작일자 1이을 마이너스 하기 때문에 플러스 1일을 한다.
	$('#inputCalendar4').val($('#sTodt'+checkedCnt+'').val());//변경 종료일자
	$('#textbox289b').text($('#endorFam'+checkedCnt+'').text() +" / "+$('#endorAge'+checkedCnt+'').text());//운전자 범위 / 연령 범위
	$('#textbox29b1').text($('#endorPer'+checkedCnt+'').text());//단기 운전자 변경 기간
	$('#textbox295b').text($('#nUnrectPrem'+checkedCnt+'').text()); //납부보험료
	$('#textbox297b').text(setFormatDate($('#sInputDate'+checkedCnt+'').val(),".")); //신청일
	
	
	$('#step01_02').hide();
	$('#step01_03').show();
}

/**
 * @alias 이미지/텍스트/입력 변경, input입력 값 초기화.
 * 	
 */
function fnChangeImageAndText(value) {
    //srcImage.getUserData("pos");
    
    fnRadioSpecChk(); //사용자가 운전자 범위 선택한값 변수에 저장
    fnDateCheck();
   
    if(value == 1){                           
        $("#group000").show();
        $("#textLabel_1_0").show();        
    }else{        
        $("#group000").hide();
        $("#textLabel_1_0").hide(); 
    }
    
    if(value != $("#srcImageData").val() ){
        var sCustNo2 = sInsrdID.substring(6,13);
        sCustNo2 = sCustNo2.substring(0,1);
       
        $("#srcImageData").val(value);
        var sCustNoImg = "";
        
        if ( sCustNo2 == "1" || sCustNo2 == "3" || sCustNo2 == "5" || sCustNo2 == "7" ){
             sCustNoImg = "1";
        } else {
             sCustNoImg = "2";
        }
        
        $('#srcImage').attr("src", "https://direct.hi.co.kr/images/EN/driver_img"+sCustNoImg+value+".gif");        
        $("#textLabel_1").css("display","none");
        $("#textLabel_2").css("display","none");
        $("#textLabel_3").css("display","none");
        
        var textAreaObj  = $(".driver_box dl");
        var inputAreaObj = $(".driver_sel .infoin");

    	//특약 추가 2013.10.16 - 한성환 
        for(var i=0; i<textAreaObj.length; i++){
            if(i == value){
               //$("dl").eq(value).show();
            	
            	document.getElementById("groupText"+i).style.display="block";

                //지정1인
                if(value == 2 || value == 4 || value == 8 || value == 11){
                    $("#groupTarget").show();
                }else{
                	$("#groupTarget").hide();
                }
                //배우자
                if(value == 3 || value == 4 ){                    
                    $("#groupSpouse").show();
                }else{
                	$("#groupSpouse").hide();
                }
                
                //최저연령
                if(value == 5 || value == 6 || value == 7 || value == 9 || value == 10 || value == 11 ){
                	$("#groupYounger").show();                	
                }else{
                	$("#groupYounger").hide();
                }
            }else{
                //$("dl").eq(i).hide();
            	document.getElementById("groupText"+i).style.display="none";
            }
        }
        fnReset();

        //최종 지정1인정보 추가 2015.02.05 - 한성환
        if( (value == 2 || value == 4 || value == 8 || value == 11) && $('#t_sUserDriverCnt').val() > 0){
        	//기명피보험자 + 지정 1인 || 지정 1인 || 부부 + 지정1인 || 가족 + 지정1인 && 최종지정1인이 있는경우
        	fnGetUwerDriverSet();
        	fnDatePluralCheck();
        }
        
    }               
               
}

/**
 * @alias 사용자가 운전자 범위 선택값 변수에 저장 
 * 	
 */
function fnRadioSpecChk(){
	var radioChk = $(':radio[name="radioChk"]');

    //특약 추가 2013.10.16 - 한성환
    for(var i=0;i < radioChk.length ;i++){
        if(radioChk[i].checked==true) {
            switch(i){
                case 0 : $("#t_sFamSpecCode").val(SPEC_FAM_ONE); 			break;
                case 1 : $("#t_sFamSpecCode").val(SPEC_FAM_ONEPLUS);  		break;
                case 2 : $("#t_sFamSpecCode").val(SPEC_FAM_PLUS);   		break;
                case 3 : $("#t_sFamSpecCode").val(SPEC_FAM_COUPLE);  		break;
                case 4 : $("#t_sFamSpecCode").val(SPEC_FAM_COUPLEPAR); 		break;
                case 5 : $("#t_sFamSpecCode").val(SPEC_FAM_COUPLECHI); 		break;
                case 6 : $("#t_sFamSpecCode").val(SPEC_FAM_COUPLEPLUS);		break;
                case 7 : $("#t_sFamSpecCode").val(SPEC_FAM_LIMIT);  		break;
                case 8 : $("#t_sFamSpecCode").val(SPEC_FAM_FAMPLUS);  		break;
                case 9 : $("#t_sFamSpecCode").val(SPEC_FAM_BROTHER);  		break;
                case 10 : $("#t_sFamSpecCode").val(SPEC_FAM_UNLIMIT); 		break;
            }
        }
    }
	
}

/**
 * @alias 보험료 피보험자 
 * 	
 */
function fnDateCheck(){
	var sCustNo1 = sInsrdID.substring(0,6);
	var sCustNo2 = sInsrdID.substring(6,13);
    var sCustGubun     = sCustNo2.substring(0,1);
    
    if ( sCustGubun == "3" || sCustGubun == "4" || sCustGubun == "7" || sCustGubun == "8" ){
    	$("#t_sCustNo").val( "20" + sCustNo1);
    } else {
    	$("#t_sCustNo").val( "19" + sCustNo1);
    }
    
                
    var p_sBirthDay   = $("#t_sCustNo").val();    //본인 생년월일
    var v_startAge    = 0;        //시작시 만나이
    var v_startDate    = parseInt(delSpecialChar("inputCalendar3", "-")); // 변경기준 시작 일자 ;
    v_startAge = fnAgeChk(p_sBirthDay,v_startDate);

    var v_mm = p_sBirthDay.substring(4,6);
    var v_dd = p_sBirthDay.substring(6,8);                
    var v_startTextAge = fnRetAge(v_startAge);

    $("#manText1_1_0").text(fnSpecText());
    $("#manText2_1_0").text(v_startTextAge);

		if(v_startTextAge == 18){
    	$("#manText_area2_1_0").css("display","none");
    	$("#manText_area3_1_0").css("display","inline-block");
    }else{
    	$("#manText_area2_1_0").css("display","inline-block");
    	$("#manText_area3_1_0").css("display","none");
    }
} 


/**
 * @alias 생년월일과 비교일(년월일)을 입력받아  비교일이 됐을 때의  만나이를 구한다.
 * birthDate(생년월일), choiceDate(비교일)
 * 	
 */
function fnAgeChk(birthDate, choiceDate){
    var v_cy   = choiceDate.toString().substring(0,4);
    var v_cd   = choiceDate.toString().substring(4,8);
    var v_by   = birthDate.toString().substring(0,4);
    var v_bmd  = birthDate.toString().substring(4,8);
    var returnAge = parseInt(v_cy) - parseInt(v_by) + 1;
    
    if(v_cd < v_bmd){
        returnAge = returnAge - 2;
    }else{
        returnAge = returnAge - 1;
    }
    
    return returnAge;
}

 
/**
 * @alias 최종 지정1인정보 설정
 * 	
 */
function fnGetUwerDriverSet(){ 
	var sDriverID = $("#t_sUserDriverID").val(); 

	if(sDriverID !=""){
		var sSexGubun     = sDriverID.substring(6,7);
    	
        if ( sSexGubun == "3" || sSexGubun == "4" || sSexGubun == "7" || sSexGubun == "8" ){
        	$("#t_sTargetYear").val( "20" +sDriverID.substring(0,2));
        } else {
        	$("#t_sTargetYear").val( "19" +sDriverID.substring(0,2));        	
        }
        

        $("#t_sTargetName").val($("#t_sUserDriverName").val());
        $("#t_sTargetMonth").val(sDriverID.substring(2,4));
        $("#t_sTargetDay").val(sDriverID.substring(4,6));
        $("#t_sTargetSex").val(sSexGubun);
        
        $('#t_sTargetName').attr('disabled', true);
        $('#t_sTargetYear').attr('disabled', true);
        $('#t_sTargetMonth').attr('disabled', true);
        $('#t_sTargetDay').attr('disabled', true);
        $('#t_sTargetSex').attr('disabled', true);        

	}
	            
}

/**
 * @alias 보험료 할인 복수 체크함수
 * 	
 */
function fnDatePluralCheck(val){
    var v_startDate    = parseInt(delSpecialChar("inputCalendar3", "-")); // 변경기준 시작 일자 ;             
    var v_startAge     = "";   //시작시 만나이
    var v_yy           = "";   //년
    var v_mm           = "";   //월
    var v_dd           = "";   //일
    var v_removeFlag   = true;
    var v_yymmdd       = "";
    var v_startTextAge;
    var v_sPyy = $("#t_sSpouseYear").val();    //배우자 생년월일(년)
    var v_sPmm = $("#t_sSpouseMonth").val();   //배우자 생년월일(월)
    var v_sPdd = $("#t_sSpouseDay").val();  	//배우자 생년월일(일)
    var v_sTyy = $("#t_sTargetYear").val();     //지정1인 생년월일(년)
    var v_sTmm = $("#t_sTargetMonth").val();    //지정1인 생년월일(월)
    var v_sTdd = $("#t_sTargetDay").val();  	//지정1인 생년월일(일)
    var v_sYyy = $("#t_sYoungerYear").val();  	//가장 나이가 어린자 생년월일(년)
    var v_sYmm = $("#t_sYoungerMonth").val();  //가장 나이가 어린자 생년월일(월)
    var v_sYdd = $("#t_sYoungerDay").val();   //가장 나이가 어린자 생년월일(일)
    var v_sPdt = "";
    var v_sTdt = "";
    
    if(val == 1){
        v_yy = v_sPyy; v_mm = v_sPmm; v_dd = v_sPdd;
    }else if(val == 4){
     	v_yy = v_sYyy; v_mm = v_sYmm; v_dd = v_sYdd;
    }else{
        v_yy = v_sTyy; v_mm = v_sTmm; v_dd = v_sTdd;
    }
    if(v_mm.length < 2 && v_mm < 10){ if(v_mm == 0){return;}v_mm = "0"+v_mm; }
    if(v_dd.length < 2 && v_dd < 10){ if(v_dd == 0){return;}v_dd = "0"+v_dd; }
    
    v_yymmdd = v_yy+v_mm+v_dd;
    if(v_yymmdd.length < 8 ){
        return;
    }
    
    if(isDate(v_yymmdd) == false){
        v_removeFlag = false;
        alert("잘못된 날짜 정보입니다.");
    }else{
        v_startAge = fnAgeChk(v_yymmdd,v_startDate);
        if(v_startAge < 18){
            v_removeFlag = false;
            alert("만18세 이상 가입 가능합니다.");
        }
        if(v_removeFlag ==true){                      
            v_startTextAge = fnRetAge(v_startAge);                    
        }
    }
    

    if(v_removeFlag == false){
        if(val == 1){
        	$("#t_sSpouseYear").val("");        	
        	$("#t_sSpouseMonth").val("");
        	$("#t_sSpouseDay").val("");
        	$("#t_sSpouseYear").val("");        	
        }else if(val == 4) {
        	$("#t_sYoungerYear").val("");
        	$("#t_sYoungerMonth").val("");
        	$("#t_sYoungerDay").val("");
        	$("#t_sYoungerYear").val("");
        }else {
        	$("#t_sTargetYear").val("");
        	$("#t_sTargetMonth").val("");
        	$("#t_sTargetDay").val("");
        	$("#t_sTargetYear").val("");        	           
        }
        if(val == 1 || val == 4){
            if(v_sTmm.length < 2 && v_sTmm < 10){ v_sTmm = "0"+v_sTmm; }
               if(v_sTdd.length < 2 && v_sTdd < 10){ v_sTdd = "0"+v_sTdd; }
               v_sTdt = v_sTyy + v_sTmm + v_sTdd;
               if(v_sTdt.length < 8){
                $("#textLabel_3").css("display","none");
                    return;
            }
        }else{
            if(v_sPmm.length < 2 && v_sPmm < 10){ v_sPmm = "0"+v_sPmm; }
               if(v_sPdd.length < 2 && v_sPdd < 10){ v_sPdd = "0"+v_sPdd; }
               v_sPdt = v_sPyy + v_sPmm + v_sPdd;
               if(v_sPdt.length < 8){
                $("#textLabel_3").css("display","none");
                return;
            }
        }
    }
    
    //최저연령자보다 나이가 적은경우 
    if(val == 4){
    	if(v_sYmm.length < 2 && v_sYmm < 10){ v_sYmm = "0"+v_sYmm; }
    	if(v_sYdd.length < 2 && v_sYdd < 10){ v_sYdd = "0"+v_sYdd; }
    	if(v_sTmm.length < 2 && v_sTmm < 10){ v_sTmm = "0"+v_sTmm; }
    	if(v_sTdd.length < 2 && v_sTdd < 10){ v_sTdd = "0"+v_sTdd; }
    	
    	var v2_sTdt = v_sTyy + v_sTmm + v_sTdd;
    	var v2_sYdt = v_sYyy + v_sYmm + v_sYdd;
    	if(parseInt(v2_sYdt) < parseInt(v2_sTdt)){
    		alert("입력하신 정보를 확인해 주세요.\n지정1인이 최저 연령자보다 더 어립니다.");
    		if(t_sUserDriverCnt.getValue() < 1){
    			$("#t_sTargetYear").val("");
    			$("#t_sTargetMonth").val("");
    			$("#t_sTargetDay").val("");
    			$("#t_sTargetYear").val("");    			
    		}else{
    			$("#t_sYoungerYear").val("");
    			$("#t_sYoungerMonth").val("");
    			$("#t_sYoungerDay").val("");
    			$("#t_sYoungerYear").val("");
    			
    		}
            return;
    	}
    }

    fnReAge();
}


/**
 * @alias 배우자 정보와 지정 1인 정보가 하나라도 정상이면 보험료 적용할인 문구를 보여준다.
 * 	
 */
function fnReAge(){
	var v_startDate    = parseInt(delSpecialChar("inputCalendar3", "-")); // 변경기준 시작 일자 ;
    var p_sBirthDay    = $("#t_sCustNo").val(); //본인 생년월일
    var v_startAge     = "";   //시작시 만나이              
    var v_startTextAge;
    var v_sPyy = $("#t_sSpouseYear").val();     //배우자 생년월일(년)
    var v_sPmm = $("#t_sSpouseMonth").val();;   //배우자 생년월일(월)
    var v_sPdd = $("#t_sSpouseDay").val();      //배우자 생년월일(일)
    var v_sTyy = $("#t_sTargetYear").val();     //지정1인 생년월일(년)
    var v_sTmm = $("#t_sTargetMonth").val();;   //지정1인 생년월일(월)
    var v_sTdd = $("#t_sTargetDay").val();      //지정1인 생년월일(일)
    var v_sYyy = $("#t_sYoungerYear").val();    //가장 나이가 어린자 생년월일(년)
    var v_sYmm = $("#t_sYoungerMonth").val();   //가장 나이가 어린자 생년월일(월)
    var v_sYdd = $("#t_sYoungerDay").val();      //가장 나이가 어린자 생년월일(일)
    var v_sPdt = "";
    var v_sTdt = "";
    var v_mm = "";
    var v_dd = "";
    if(v_sPmm.length < 2 && v_sPmm < 10){ v_sPmm = "0"+v_sPmm; }
    if(v_sPdd.length < 2 && v_sPdd < 10){ v_sPdd = "0"+v_sPdd; }
    if(v_sTmm.length < 2 && v_sTmm < 10){ v_sTmm = "0"+v_sTmm; }
    if(v_sTdd.length < 2 && v_sTdd < 10){ v_sTdd = "0"+v_sTdd; }
    if(v_sYmm.length < 2 && v_sYmm < 10){ v_sYmm = "0"+v_sYmm; }
    if(v_sYdd.length < 2 && v_sYdd < 10){ v_sYdd = "0"+v_sYdd; }
    v_sPdt = v_sPyy + v_sPmm + v_sPdd;  
    v_sTdt = v_sTyy + v_sTmm + v_sTdd;
    v_sYdt = v_sYyy + v_sYmm + v_sYdd;
    
    if(v_sPdt.length < 8 && v_sTdt.length < 8 && v_sYdt.length < 8){
        $("#textLabel_3").css("display","none");
        return;
    }
    
    /*지정일인 ID값*/
    //t_sDriverID.setValue( v_sTdt);                    
    $("#t_sDriverID").val(v_sTdt.substring(2,8)+""+$("#t_sTargetSex").val());

    /*배우자 ID값*/
    //t_sMateID.setValue  ( v_sPdt);
    $("#t_sMateID").val(v_sPdt.substring(2,8));
    
    if(parseInt(v_sYdt) > 0){
            v_mm     = v_sYdt.substring(4,6);
            v_dd     = v_sYdt.substring(6,8);
            v_startAge = fnAgeChk(v_sYdt,v_startDate);
            v_startTextAge = fnRetAge(v_startAge);

            /*최저연령자 ID값 셋팅*/
            $("#t_sMinAgeDrverID").val(v_sYdt);
    }else{
        if(parseInt(p_sBirthDay) > parseInt(v_sPdt) && parseInt(p_sBirthDay) > parseInt(v_sTdt)){
            v_mm     = p_sBirthDay.substring(4,6);
            v_dd     = p_sBirthDay.substring(6,8);
            v_startAge = fnAgeChk(p_sBirthDay,v_startDate);
            v_startTextAge = fnRetAge(v_startAge);
           
            /*최저연령자 ID값 셋팅*/
            $("#t_sMinAgeDrverID").val(p_sBirthDay);
        }else{
            if(parseInt(v_sTdt) > parseInt(v_sPdt)){
                v_startAge = fnAgeChk(v_sTdt,v_startDate);
                v_startTextAge = fnRetAge(v_startAge);
                v_mm = v_sTmm;
                v_dd = v_sTdd;
                
                /*최저연령자 ID값 셋팅*/
                $("#t_sMinAgeDrverID").val(v_sTdt);
            }else{
                v_startAge = fnAgeChk(v_sPdt,v_startDate);
                v_startTextAge = fnRetAge(v_startAge);
                v_mm = v_sPmm;
                v_dd = v_sPdd;
               
                /*최저연령자 ID값 셋팅*/
                $("#t_sMinAgeDrverID").val(v_sPdt);
            }
        }
    }

    $("#manText1_3").text(fnSpecText());  
	$("#manText2_3").text(v_startTextAge);
	
    if(v_startTextAge == 18){
    	  $("#manText_area2_3").css("display","none");
          $("#manText_area3_3").css("display","inline-block");
    }else{
    	  $("#manText_area2_3").css("display","inline-block");
          $("#manText_area3_3").css("display","none");
    }
    $("#textLabel_3").css("display","block");                    
}

/**
 * @alias  보험료 적용 나이.
 * age : 나이 , sEgubun : S 시작일자 ,E 종료일자
 * 	
 */
function fnRetAge(age){
    var retVal = "";
   
    switch(parseInt(age)){
        case 18 : retVal = "18" ; break;
        case 19 : retVal = "18" ; break;
        case 20 : retVal = "18" ; break;
        case 21 : retVal = "21" ; break;
        case 22 : retVal = "21" ; break;
        case 23 : retVal = "21" ; break;
        case 24 : retVal = "24" ; break;
        case 25 : retVal = "24" ; break;
        case 26 : retVal = "26" ; break;
        case 27 : retVal = "26" ; break;
        case 28 : retVal = "26" ; break;
        case 29 : retVal = "26" ; break;
        case 30 : retVal = "30" ; break;
        case 31 : retVal = "30" ; break;
        case 32 : retVal = "30" ; break;
        case 33 : retVal = "30" ; break;
        case 34 : retVal = "30" ; break;
        case 35 : retVal = "35" ; break; 
        case 36 : retVal = "35" ; break; 
        case 37 : retVal = "35" ; break; 
        case 38 : retVal = "35" ; break; 
        case 39 : retVal = "35" ; break; 
        case 40 : retVal = "35" ; break; 
        case 41 : retVal = "35" ; break; 
        case 42 : retVal = "35" ; break; 
        case 43 : retVal = "43" ; break;
        case 44 : retVal = "43" ; break;
        case 45 : retVal = "43" ; break;
        case 46 : retVal = "43" ; break;
        case 47 : retVal = "43" ; break;
        default : retVal = "48" ;
    }
    
    userAge = retVal;        
    return retVal;
}

/**
 * @alias  선택한 운전자 범위
 * 	
 */
function fnSpecText(){
    var retVal = "";
    
    if($("#t_sFamSpecCode").val() == SPEC_FAM_ONE ){
    	retVal =  "기명피보험자 1인한정";                	
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_ONEPLUS){
    	retVal =  "기명피보험자 + 지정 1인";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_PLUS){
    	retVal =  "지정1인";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_COUPLE){
    	retVal =  "부부한정";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_COUPLEPAR){
    	retVal =  "부부 + 부모";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_COUPLECHI){
    	retVal =  "부부 + 자녀";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_COUPLEPLUS){
    	retVal =  "부부 + 지정1인";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_LIMIT){
    	retVal =  "가족한정 (형제자매제외)";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_FAMPLUS){
    	retVal =  "가족 + 지정1인";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_BROTHER){
    	retVal =  "가족 및 형제자매";
    }else if($("#t_sFamSpecCode").val() == SPEC_FAM_UNLIMIT){
    	retVal =  "누구나 운전";
    }
    
    $("#textbox439").text(retVal);
    return retVal;
}

/**
 * @alias  보험자 범위 변경시초기화.
 * 	
 */
function fnReset() {
    var inputTextObj = $(".driver_sel .input");
    inputTextObj.val("");

    $("#t_sSpouseName").val("");
    $("#t_sTargetName").val("");
    $("#t_sYoungerName").val("");
    $("#t_sTargetSex").val("");
    $("#t_sNextAgeSpec").val("");
    $("#t_sAutoAgeChngDate").val("");
    $("#t_sMateID").val("");
    $("#t_sDriverID").val("");
    $("#t_sMinAgeDrverID").val("");
    $("#t_sMinAgeDrverNM").val("");
    $("#t_sMinAgeDrverRel").val("")
}

/**
 * @alias  최저 연령 년/월/일  입력시 확인
 * 	
 */      
function fnInputYoungChk(e,thisobj,gubun){
	var check="false"
	if(gubun == "Y"){ //년도
		check = fnNextInput(2, $("#t_sYoungerMonth"), 4, -1,thisobj ,e) ;
	}else if(gubun =="M" ){//월
		check = fnNextInput(2, $("#t_sYoungerDay"), 2, 12,thisobj ,e);
	}else{ // 일
		check = true;
	}

    if( check==true){
        if($('#t_sFamSpecCode').val() == SPEC_FAM_COUPLEPLUS){
         	fnDatePluralCheck(2); 
        }else if($('#t_sFamSpecCode').val() == SPEC_FAM_FAMPLUS ){
        	fnDatePluralCheck(4); 
        }else{         	
        	fnDateOneCheck(2); 
        }
    }
	
}
/**
 * @alias  배우자 연령 년/월/일  입력시 확인
 * 	
 */      
function fnInputsSpouseChk(e,thisobj,gubun){
	var check="false"
	if(gubun == "Y"){ //년도	    
		check = fnNextInput(1, $("#t_sSpouseMonth"), 4, -1,thisobj ,e) ;
	}else if(gubun =="M" ){//월
		check = fnNextInput(1, $("#t_sSpouseDay"), 2, 12,thisobj ,e);
	}else{ // 일
		check = fnNextInput(1, $("#t_sTargetName"), 2, 31,$("#t_sSpouseDay"),e)
	}

    if( check==true){
        if($('#t_sFamSpecCode').val() == SPEC_FAM_COUPLEPLUS){
        	fnDatePluralCheck(1);
        }else{        
        	fnDateOneCheck(1); 
        }
        	
    }
	    
}
/**
 * @alias  지정1인 연령 입력시 확인
 * 	
 */
function fnInputTargetChk(e,thisobj,gubun){
		
	var check="false"
		if(gubun == "Y"){ //년도
			check = fnNextInput(3, $("#t_sTargetMonth"), 4, -1,thisobj ,e) ;
		}else if(gubun =="M" ){//월
			check = fnNextInput(3, $("#t_sTargetDay"), 2, 12,thisobj ,e);
		}else{ // 일
			check = true;
		}

    if( check==true){
        if($('#t_sFamSpecCode').val() == SPEC_FAM_COUPLEPLUS){
         	fnDatePluralCheck(3); 
        }else if($('#t_sFamSpecCode').val() == SPEC_FAM_FAMPLUS ){
        	fnDatePluralCheck(4); 
        }else{         	
        	fnDateOneCheck(3); 
        }
    }
	
}
/**
 * @alias  포커스 이동.
 * 	
 */
function fnNextInput(val, nextObj, size, maxvalue, thisobj,event) {	
    var eventCode =(window.netscape)? event.which : event.keyCode;
    
    if (eventCode == 13) {nextObj.focus();return true; }
    if(!(eventCode == 9 || eventCode == 16)){
    
        if ( typeof size != "undefined" ) {
        	
            if ( thisobj.val().length >= size ) {
                if((maxvalue > -1 &&  maxvalue < thisobj.val()) || (size == thisobj.val().length && thisobj.val() < 1) ){
                    alert("잘못된 날짜 정보입니다.");
                    thisobj.val("");
                    if($('#t_sFamSpecCode').val()!= SPEC_FAM_COUPLEPLUS ){
                        $("#textLabel"+"_"+val).css("display","none");
                    }else{
                        fnReAge();
                    }
                    return false;
                }else{
                	nextObj.focus();
                }
            }
       }
    }
    if ( eventCode == 8 ){
        if($('#t_sFamSpecCode').val() != SPEC_FAM_COUPLEPLUS){
            $("#textLabel"+"_"+val).css("display","none");
            $("#manText1"+"_"+val).text("");
            $("#manText2"+"_"+val).text("");
            $("#manText3"+"_"+val).text("");
            $("#manText4"+"_"+val).text("");
            $("#manText5"+"_"+val).text("");
        }else{
            fnReAge();
            return false;
        }
    }
    return true;
}

/**
 * @alias  보험료 할인 단일 체크함수
 * 	
 */
function fnDateOneCheck(val){      
    var p_sBirthDay    = $('#t_sCustNo').val()//본인 생년월일
    var v_startAge     = "";   //시작시 만나이
    var v_yy           = "";   //년
    var v_mm           = "";   //월
    var v_dd           = "";   //일
    var v_removeFlag   = true;
    var v_yymmdd       = "";
    var v_startDate    = parseInt(delSpecialChar("inputCalendar3", "-")); // 변경기준 시작 일자 ;
    var v_startTextAge;
 
    if(val == 1){
        v_yy = $('#t_sSpouseYear').val();    //배우자 생년월일(년)
        v_mm = $('#t_sSpouseMonth').val();   //배우자 생년월일(월)
        v_dd = $('#t_sSpouseDay').val();     //배우자 생년월일(일)
    }else if(val == 2){
        v_yy = $('#t_sYoungerYear').val();   //가장 나이가 어린자 생년월일(년)
        v_mm = $('#t_sYoungerMonth').val();  //가장 나이가 어린자 생년월일(월)
        v_dd = $('#t_sYoungerDay').val();    //가장 나이가 어린자 생년월일(일)
    }else if(val == 3){
        v_yy = $('#t_sTargetYear').val();    //지정1인 생년월일(년)
        v_mm = $('#t_sTargetMonth').val();   //지정1인 생년월일(월)
        v_dd = $('#t_sTargetDay').val();     //지정1인 생년월일(일)
    }
 
    if(v_mm.length < 2 && v_mm < 10){ if(v_mm == 0){return;}v_mm = "0"+v_mm; }
    if(v_dd.length < 2 && v_dd < 10){ if(v_dd == 0){return;}v_dd = "0"+v_dd; }

    v_yymmdd = v_yy+v_mm+v_dd;
    
    if(v_yymmdd.length < 8 ){
        return;
    }
    
    var v_chk = v_yy+v_mm+"";
    /* 2015.05.27 주석
    if(val == 2&& (   Number(v_yy) < Number(p_sBirthDay.substring(0,4)) 
                   || Number(v_chk) < Number(p_sBirthDay.substring(0,6)) )){
        t_sYoungerYear.setValue( "" );
        t_sYoungerMonth.setValue( "" );
        t_sYoungerDay.setValue( "" );
        alert("운전자중 가장 나이가 어린분의 생년월일을 입력해주세요.");
        v_removeFlag = false;
    }
    */

    //날짜형식 체크
    if(isDate(v_yymmdd) == false){
        v_removeFlag = false;
        alert("잘못된 날짜 정보입니다.");
    }else{
    	
        v_startAge = fnAgeChk(v_yymmdd,v_startDate); //만나이
        
        
        if(v_startAge < 18){
            v_removeFlag = false;
            alert("만18세 이상 가입 가능합니다.");
        }
        if(v_removeFlag ==true){
            if(val == 1){
                /*배우자 ID값 */
            	$('#t_sMateID').val(v_yymmdd.substring(2,8));                
            }else if(val == 2){
            	/* 2015.05.27 주석
                if(Number(p_sBirthDay) > Number(v_yymmdd)){
                    if(t_sYoungerDay.getValue().length == 2 || t_sMinckeck.getValue()=="Y" ){
                        t_sYoungerYear.setValue( "" );
                        t_sYoungerMonth.setValue( "" );
                        t_sYoungerDay.setValue( "" );
                        alert("운전자중 가장 나이가 어린분의 생년월일을 입력해주세요.");
                        if(t_sMinckeck.getValue()=="Y"){
                            t_sMinckeck.setValue("");
                            return false;
                        }
                        v_removeFlag = false;
                    }
                }else{
                */
                    if($('#t_sMinckeck').val()=="Y"){
                    	$('#t_sMinckeck').val("");                       
                        return true;
                    }
                    /*최저연령자 ID값 셋팅*/
                    $('#t_sMinAgeDrverID').val(v_yymmdd);
                //}
                                       
                
            }else if(val == 3){                        	
                /*지정일인 ID값 */
            	$('#t_sDriverID').val(v_yymmdd.substring(2,8)+""+$('#t_sTargetSex').val());                           
            }

            //if(parseInt(v_yymmdd) <= parseInt(p_sBirthDay) ){
            // 지정1인특약 선택시 연령 설정 변경. 2014.02.06 김상규
            if($(':radio[name="radioChk"]:checked').val() != "8"  && (parseInt(v_yymmdd) <= parseInt(p_sBirthDay)) ){
                v_yymmdd = p_sBirthDay;
                v_mm     = p_sBirthDay.substring(4,6);
                v_dd     = p_sBirthDay.substring(6,8);
            }
            v_startAge = fnAgeChk(v_yymmdd,v_startDate);
          
            v_startTextAge = fnRetAge(v_startAge);
        }
    }
    if(v_removeFlag == false){
        if(val == 1){
        	$('#t_sSpouseYear').val("");
        	$('#t_sSpouseMonth').val("");
        	$('#t_sSpouseDay').val("");
        	$('#t_sSpouseYear').focus();        	
        }else if(val == 2){
        	$('#t_sYoungerYear').val("");
        	$('#t_sYoungerMonth').val("");
        	$('#t_sYoungerDay').val("");
        	$('#t_sYoungerYear').focus();
        }else {
        	$('#t_sTargetYear').val("");
        	$('#t_sTargetMonth').val("");
        	$('#t_sTargetDay').val("");
        	$('#t_sTargetYear').focus();
        }
        $("#textLabel"+"_"+val).css("display","none");
        return;
    }
  
    $("#manText1"+"_"+val).text(fnSpecText());
    $("#manText2"+"_"+val).text(v_startTextAge);
    
    if(v_startTextAge == 18){

    	 $("#manText_area2_"+val).css("display","none");
         $("#manText_area3_"+val).css("display","inline-block");
    }else{
    	$("#manText_area2_"+val).css("display","inline-block");
        $("#manText_area3_"+val).css("display","none");
    }
    $("#textLabel"+"_"+val).css("display","block");
}

/**
 * @alias  해당문자열데이타가 날짜데이타로서 유효한지 체크한다.
 * 	
 */
function isDate(strings) {
	
	var year_data = "";
	var month_data = "";
	var date_data = "";	
	
	strings = strings.replace( /^\s+|\s+$/g ,"" );
	if (strings.length < 8) return;

	   for(i=0;i<8;i++) {
	   	var c = strings.charAt(i);
	   	if(c < '0' || c > '9'){
	          return(false);
	       }

	       if (i<4) year_data += c;
	       else if (i >= 4 && i < 6) month_data += c;
	       else if (i >= 6) date_data += c;
	   }

	var mnthst = month_data;
	var mnth = parseInt(mnthst,10);
	var dy = parseInt(date_data,10);
	
	if (mnth < 1 || mnth > 12 || dy < 1 || dy > 31) {
		return(false);
	}

	if (mnth != 2) {
		if (mnth == 4 || mnth == 6 || mnth == 9 || mnth == 11) {
			if (dy > 30) {

	               return(false);
			}
		}
		else if (mnth == 1 || mnth == 3 || mnth == 5 || mnth == 7 || mnth == 8 || mnth == 10 || mnth == 12) {
			if (dy > 31) {

	            return(false);
			}
		}
	}
	else {
		var yr1 = parseInt(year_data);
		var leapYrTest = yr1 % 4;
		var maxdy;
		if ((yr1%400== 0) || ((yr1%4==0)&&(yr1%100 !=0))) {
			maxdy = 29
		}
		else {
			maxdy = 28
		}

		if (dy > maxdy) {

	           return(false);
		}
	}
	return(true);
}


/**
 * @alias  포커스에서 나갔을때 입력된값이 ""이 아니면서 1900년도 보다 작으면 년도 날짜를 초기화 시킨다.
 * 	
 */
function fnYearValueCheckFocus(obj , val, monthObj, dayObj,retAlt) {
    if(obj.val() !="" && obj.val() < val ){
        if("0000" != obj.val() && obj.val() != "" ){
            alert(retAlt);
        }
        obj.val("");
        monthObj.val("");
        dayObj.val("");
        
        obj.focus();                       
    }
    
}


/**
 * @alias  단기 운전자 변경 2단계 ==> 3단계 이동시
 * 	
 */
function fnNextDriver(){
	var v_startDate    = parseInt(getAddDate(delSpecialChar("inputCalendar3", "-"),-1)); // 변경기준 시작 일자 ;
    var v_endDate    = parseInt(delSpecialChar("inputCalendar4", "-")); // 변경기준 시작 일자 ;   
    
	if ( !fnValidCheck() ) {
		return false;    		
	}
	
	//유지중인 계약기간 비교 
	if(parseInt( v_startDate, 10) <$('#v_sFmdt').val() || parseInt( v_startDate, 10) > $('#v_sTodt').val()  ){
		alert("유지중인 계약기간("+$('#v_sFmdt').val()+ " ~ "+$('#v_sTodt').val()+")에만  변경가능합니다");
		return;
	}else if( parseInt( v_endDate, 10) <$('#v_sFmdt').val() || parseInt( v_endDate, 10) > $('#v_sTodt').val()  ){
		alert("유지중인 계약기간("+$('#v_sFmdt').val()+ " ~ "+$('#v_sTodt').val()+")에만  변경가능합니다");
		return;				
	}
	
	fnGetFutEndorInfo3();
}

/**
 * @alias  선택항목 필수 입력값 체크
 * 
 * 특약추가(SPEC_FAM_PLUS,SPEC_FAM_COUPLEPAR,SPEC_FAM_COUPLECHI,SPEC_FAM_FAMPLUS) 로
 				 배우자 , 가장나이가어린 , 지정1인 체크 추가 2013.10.16 - 한성환 
 * 	
 */
function fnValidCheck(){                
    /* 피보험자 선택 유무 */
    if ($(":radio[name='radioChk']:checked").length != 1){
       alert("운전자 범위를 선택해주세요. ");
       radioChk0.focus();
       return false;
    }
    /* v_validCheck 피보험자 선택값                  
     * v_validCheck = SPEC_FAM_COUPLE : 부부한정
     * v_validCheck = SPEC_FAM_COUPLEPLUS : 부부 + 지정1인
     */
    var v_validCheck = $('#t_sFamSpecCode').val();
    if( v_validCheck == SPEC_FAM_COUPLE || v_validCheck == SPEC_FAM_COUPLEPLUS ){    	
    	
        if( v_validCheck != SPEC_FAM_FAMPLUS  ){
            if ($('#t_sSpouseName').val()=="") {
            	$('#t_sSpouseName').focus();
                alert("배우자의 이름을 입력해주세요.");
                return false;
            }
            if ( !fnNameValidation($('#t_sSpouseName'), "배우자의 이름")) { return false; } 
            if (  $('#t_sSpouseYear').val()=="" ||  parseInt($('#t_sSpouseYear').val()) < 1900) {
            	$('#t_sSpouseYear').focus();
                alert("배우자의 생년월일을 입력해주세요.");
                return false;
            }
            if ( $('#t_sSpouseMonth').val()=="" || parseInt($('#t_sSpouseMonth').val())== 0) {
                alert("배우자의 생년월일을 입력해주세요.");
                $('#t_sSpouseMonth').focus();
                return false;
            }
            if ( $('#t_sSpouseDay').val() =="" || parseInt($('#t_sSpouseDay').val())== 0) {
                alert("배우자의 생년월일을 입력해주세요.");
                $('#t_sSpouseDay').focus();
                return false;
            }
        }           
    }
    /* v_validCheck 피보험자 선택값 
     * v_validCheck = SPEC_FAM_LIMIT 		: 가족한정 (형제자매제외)
     * v_validCheck = SPEC_FAM_BROTHER 		: 가족(형제자매포함)
     * v_validCheck = SPEC_FAM_UNLIMIT 		: 누구나 
     * v_validCheck = SPEC_FAM_COUPLEPAR 	:  부부 + 부모(부부 및 부모 한정)
     * v_validCheck = SPEC_FAM_COUPLECHI 	:  부부 + 자녀(부부 및 자녀 한정)
     * v_validCheck = SPEC_FAM_FAMPLUS 	:  가족 + 지정1인(가족 및 지정1인 한정)
     */
    if(   v_validCheck == SPEC_FAM_LIMIT 
       || v_validCheck == SPEC_FAM_BROTHER 
       || v_validCheck == SPEC_FAM_UNLIMIT
       || v_validCheck == SPEC_FAM_COUPLEPAR
       || v_validCheck == SPEC_FAM_COUPLECHI
       || v_validCheck == SPEC_FAM_FAMPLUS ){
       
        if ($('#t_sYoungerName').val() == ""){
            alert("가장 나이가 어린분의 이름을 선택해주세요.");
            $('#t_sYoungerName').focus();
            return false;
        }
        if ( !fnNameValidation($('#t_sYoungerName'), "가장 나이가 어린분의 이름") ) { return false; } 
        if ($('#t_sYoungerYear').val() == "" || parseInt($('#t_sYoungerYear').val())< 1900){
            alert("가장 나이가 어린분의 생년월일을 입력해주세요.");
            t_sYoungerYear.focus();
            return false;
        }
        if ($('#t_sYoungerMonth').val() == "" || parseInt( $('#t_sYoungerMonth').val())== 0){
            alert("가장 나이가 어린분의 생년월일을 입력해주세요.");
            $('#t_sYoungerMonth').focus();
            return false;
        }
        if ($('#t_sYoungerDay').val() == "" || parseInt($('#t_sYoungerDay').val())== 0){
            alert("가장 나이가 어린분의 생년월일을 입력해주세요.");
            $('#t_sYoungerDay').focus();
            return false;
        }
        $('#t_sMinckeck').val("Y")
        
        if(fnDateOneCheck(2)==false){
             $('#t_sYoungerYear').focus();
            return false;
        }
        
        /* 2015.05.27 주석
        if(t_sMinAgeDrverID.getValue().substring(2,8) < sInsrdID.substring(0,6)){
        	t_sYoungerYear.focus();                
            alert("최저연령 운전자의 생년월일보다 기명피보험자의\n생년월일이 늦습니다. 확인하십시요.");
            return false;

        }
        */
        
    }
    
    /*
    	지정1인 ghkrdls
   	* v_validCheck = SPEC_FAM_ONEPLUS 		: 기명피보험자 + 지정 1인
   	* v_validCheck = SPEC_FAM_PLUS 			: 지정1인 한정(지정1인 한정)
   	* v_validCheck = SPEC_FAM_COUPLEPLUS 	: 부부한정 + 지정1인 특약
   	* v_validCheck = SPEC_FAM_FAMPLUS 		: 가족 + 지정1인(가족 및 지정1인 한정)
    */
       if( v_validCheck == SPEC_FAM_ONEPLUS 
       	   || v_validCheck == SPEC_FAM_PLUS 
       	   || v_validCheck == SPEC_FAM_COUPLEPLUS
       	   || v_validCheck == SPEC_FAM_FAMPLUS){
            if ($('#t_sTargetName').val()==""){
                alert("지정 1인의 이름을 선택해주세요.");
                $('#t_sTargetName').focus();
                return false;
            }
            if ( !fnNameValidation($('#t_sTargetName'), "지정 1인의 이름")) { return false; } 
            
            if ($('#t_sTargetSex').val() == null  ||$('#t_sTargetSex').val() == 0){
                alert("지정 1인의 성별을 선택해주세요.");
                $('#t_sTargetSex').focus();
                return false;
            }
           
            if ($('#t_sTargetYear').val()=="" || Number($('#t_sTargetYear').val()) <1900){
                alert("지정 1인의 생년월일을 입력해주세요.");
                $('#t_sTargetYear').focus();
                return false;
            }
            if ($('#t_sTargetMonth').val()=="" || Number($('#t_sTargetMonth').val())== 0){
                alert("지정 1인의 생년월일을 입력해주세요.");
                $('#t_sTargetMonth').focus();
                return false;
            }
            if ($('#t_sTargetDay').val()=="" || Number($('#t_sTargetDay').val())== 0){
                alert("지정 1인의 생년월일을 입력해주세요.");
                $('#t_sTargetDay').focus();
                return false;
            }
            
            //지정1인제어 추가 2015.02.05 -한성환
            if($('#t_sUserDriverCnt').val() > 1){                	
            	//지정1인 등록이 2명이상인경우
            	alert("지정 1인 정보 확인이 필요합니다.\n고객센터를 이용해 주십시오.\n1577-1001 평일:08:00~20:00");
            	return false;
            }
            
            if($('#t_sUserDriverCnt').val() == 0){                	
            	//지정1인 등록이 최초인경우
            	var specText = fnSpecText();
            	var confirmMsg =  "선택해 주신 ["+specText+"]으로\n"
            					+ "지정 운전자 ["+$('#t_sTargetName').val()+"] 님이  등록됩니다.\n"	
            					+ "입력 해주신 지정 1인은 특정 사유(사망,유학,군입대,면허취소,\n"
            					+ "차량구입,피보험자와의 결혼) 외에는 변경이 불가하며 변경을\n"
		                		+ "요청 하시는 경우 증빙서류 제출이 필요합니다.\n\n"			
		                		+ "해당 내용을 확인 하시고 운전자 변경을 신청 하시겠습니까?\n"			
            					+ "(입력 정보를 수정 하시려면 '취소'를 클릭해 주세요.)";			

            	var confirmChk = confirm(confirmMsg);
            	if(!confirmChk){
            		return false;
            	}
            }
        }
     /*
       if(v_validCheck == WebSquare.ModelUtil.getInstanceValue("WebUtil/RETURN/SPEC_FAM_FAMPLUS/@value") ){        	   
    	   if (t_sMinAgeDrverID.getValue().substring(2,8) < sInsrdID.substring(0,6)  ) {
               alert("최저연령 운전자의 생년월일보다 기명피보험자의 생년월일이 늦습니다. 확인하십시요.");
               return false;
           }
  	
       }
 */
    return true;
}

/**
 * @alias  영문, 한글 , 공백 유효성 체크
 * 
 * 	
 */
function fnNameValidation(objNm, alt) {
    var tmpVal = objNm.val();
    var count=0;
    if(tmpVal.search(' ') > 0){
        alert("입력항목 : "+alt+"\n\공백은 사용 불가능합니다.");
        objNm.focus();
        objNm.setValue("");
        return false;
    }
    for (i=0;i<tmpVal.length;i++){
        var tmp = tmpVal.charAt(i);
//        if(tmp.search(/[a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/) == -1 ) {
        if(tmp.search(/[a-z|A-Z|가-힝]/) == -1 ) {
            count++;
        }
        if(count != 0 ) {
            alert("입력항목 : "+alt+"\n\n영문,한글만 가능합니다.");
            objNm.focus();
            objNm.setValue("");
            return false;
        }
    }
    return true;
}


/**
 * @alias  단기 운전자 변경 내용 정보  - 정보 확인 
 * 
 * 	
 */
function fnGetFutEndorInfo3(idx){     		   		   
	var oReqData = {
			sPolicyType : sPolicyType
		  , sPolicyYM : sPolicyYM
		  , sPolicySer : sPolicySer
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M04L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				
			    
			    var sDate = parseInt(getAddDate(delSpecialChar("inputCalendar3", "-"),-1))	//시작일자
			    var eDate = parseInt(delSpecialChar("inputCalendar4", "-"));	//종료 일자 
			    var cnt = 0 ; 
			    var noCnt = 0 ;
			    var specText = fnSpecText();
			    //var P_msg01 ="";            
			    var endorVt = responseObj.data.ageFamList;

				  if(endorVt.length > 0){
				    	for(var i=0; i<endorVt.length ;i++){
				    		
				    		var sFmDt = endorVt[i].sFmdt;
				    		var sToDt = endorVt[i].sTodt;     
							var sAgeSpec = endorVt[i].sAgeSpec;
							var sFamSpec = endorVt[i].sFamSpec;
							
							/*
							if(sFmDt == sDate && sToDt == eDate && trimAll(sFamSpec) =="누구나운전"){
								alert("기존연령특약과 같습니다 .다른 연령을 선택해주십시요");
								return;
								break;
							}
							*/
							
							
				    		if(sFmDt <= sDate && sToDt >= sDate){
				    			//P_msg01 = P_msg01 +disDateFormat(sFmDt)+ " 24:00 ~ "+disDateFormat(sToDt)+" 24:00 까지는 "+sAgeSpec+" 누구나 운전<br>";
				    			cnt++;
				    		}else if(sFmDt <= eDate && sToDt >= eDate){
				    			//P_msg01 = P_msg01 +disDateFormat(sFmDt)+ " 24:00 ~ "+disDateFormat(sToDt)+" 24:00 까지는 "+sAgeSpec+" 누구나 운전<br>";
				    			cnt++;
				    		}
				    		
				    		
				   	 	}
				    }

				    if(cnt > 0){
				    	openLayer("layer01");

				    	$('#pointC01_01').text(disDateFormat(sDate+"")+" 24:00 ~ "+disDateFormat(eDate+"")+" 24:00");
				    	$('#pointC01_02').text("주민등록상 만"+userAge+"세 이상,"+ specText);
				    	
				    	
				    }else {
				    	//배서 진행 
				        goEndorse();
				    }
			}
		}
	});

}

/**
 * @alias  단기 운전자 변경 배서 진행확인 
 			  청약타입을 E로 두개의 청약을 생성함
 			  배서시기부터 종기까지 청약1, 배서 종기부터 계약종기까지 청약2
 			  getEndorseInfo 배서진행 1단계 
 * 
 * 	
 */
function goEndorse(sSecondInsrdChk){
	
	$("#step02").hide(); 
	$("#step03").show(); 
	var startDate = delSpecialChar("inputCalendar3", "-");
	var endDate = delSpecialChar("inputCalendar4", "-");
	
	var y1 = getAddDate(startDate,-1).substring( 0, 4 );
 	
 	var m1 = getAddDate(startDate,-1).substring( 4, 6 );
 	var d1 = getAddDate(startDate,-1).substring(6, 8 );
 	
 	var y2 = endDate.substring( 0, 4 );
	var m2 = endDate.substring( 4, 6 );
	var d2 = endDate.substring( 6, 8 );
           
    $('#textbox445').text(y1+"."+m1+"."+d1+" 24:00 ~ "+y2+"."+m2+"."+d2+" 24:00");//단기운전자 변경 기간 
    $('#textbox452').text("위 특약은 변경 마지막날 인 "+y2+"."+m2+"."+d2+" 24:00 이후에는 변경 전 특약으로 자동변경 됩니다.");
   
    
    
	var oReqData = {
			sPolicyNo : sPolicyType+sPolicyYM+sPolicySer
		  , sEndorseCode1 : "37A"
		  , nLastEndorseNo : nLastEndorseNo		  
		  , sEndorseFmdtFuture : delSpecialChar("inputCalendar4", "-")
		  , sEndorseFmdt1 : getAddDate(delSpecialChar("inputCalendar3", "-"),-1)
		  , sEndorseFmdt2 : getAddDate(delSpecialChar("inputCalendar3", "-"),-1)
		  , sInputType : "W"
		  , sUserID : "999995"
		  , sInsrdName : sInsrdName
		  , sFamSpecCode : $('#t_sFamSpecCode').val()
		  , sMinAgeDrverID : $("#t_sMinAgeDrverID").val()
		  , sInsrdID : sInsrdID
		  , sDriverName : $("#t_sTargetName").val()
		  , sDriverID : $("#t_sDriverID").val()
		  , sMateNm : $("#t_sSpouseName").val()
		  , sMateID :  $("#t_sMateID").val()
		  , sYoungerName : $("#t_sYoungerName").val()
		  , inputCalendar3 : parseInt(delSpecialChar("inputCalendar3", "-"))
		  , sSpecCode : getSpecAge()
		  , sSecondInsrdChk : sSecondInsrdChk 

		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M05L', {
		xecure:false,
		data : oReqData,
		loadingbar : true,
		callback : {
			success:function(responseObj) {
				$.unblockUI(); //로딩바 제거
				
				var listData = responseObj.data;
				var totalAmt = listData.totalAmt;
				closeLayer('layer01'); //팝업 닫기

				if(listData.sMsg != null && listData.sMsg !=""){//실패 메세지 처리
					if(listData.sMsg =="driver01"){
						 alert("최저연령 운전자의 생년월일보다 기명피보험자의\n생년월일이 늦습니다. 확인하십시요.");
				          fnPrevDriver(1);
				          return false;
					}else if(listData.sMsg =="applySer"){
						alert("보험료 산출을 실패했습니다.");
			    		fnPrevDriver(1); //이전단계 로  
			    		return ;
					}else{
						if(listData.sSecondInsrdID != null  && listData.sSecondInsrdID !=""){
							var specText = fnSpecText();
							openLayer("layer02");
							$("#pointC02_01").text(listData.sSecondInsrdNm+"님(만"+ageCalculation3(listData.sSecondInsrdID.substring(0,6),sCurrDate,"N")+"세)이 등록되어있습니다.");
							$("#pointC02_02").text("변경하시려는 조건("+y1+"."+m1+"."+d1+". 24:00 ~ "+y2+"."+m2+"."+d2+".24:00 "+ userAge+" "+specText+")은");
							return ;
						}
						 
					}
					
				}else{ //성공
					closeLayer('layer02'); //종피보험자 팝업 닫기
					
					if(listData.chgPOLCA03Vt1Cnt > 0){
						var sSpecLongName = listData.sFamBefCode;

						 if( sSpecLongName != null && ( trimAll(sSpecLongName) =="기본계약" ||  trimAll(sSpecLongName)=="기본계약(누구나)") ){
							 sSpecLongName ="누구나";
						}
						 				
						$("#textbox438").text(sSpecLongName);//현재 운전자 범위
						$("#textbox441").text(listData.sAgeBefCode);//현재 운전자 범위
	
						if(sSpecLongName == null || sSpecLongName ==""){
							$("#textbox438").text($("#textbox439").text());//현재 운전자 범위							
						}
						
						if(listData.sAgeBefCode == null || listData.sAgeBefCode ==""){
							$("#textbox441").text($("#textbox442").text());//현재 운전자 범위						
						}

						
					}else{
						$("#textbox438").text($("#textbox439").text());//현재 운전자 범위
						$("#textbox441").text($("#textbox442").text());//현재 운전자 범위					
					}
					
					if(totalAmt < 0){
						$("#refundText").text("환급 보험료");		    		        	
			    	}else {
			    		$("#refundText").text("추가 납입 보험료");          		
			    	}
					
					$("#textbox449").text(ValueFilter.convert("amtWon",""+totalAmt+""));
					
					nBi1Amt = listData.nBi1Amt;//한급금중 책임액
					v_totalAmt = totalAmt;	//추가 납입 보험료
					
					//배서 확정시 필요한 정보
					pola001InfoList = listData.pola001InfoList;
					polma03InfoList = listData.polma03InfoList;
					polab05InfoList = listData.polab05InfoList;
					resultTotInfoList = listData.resultTotInfoList;
					
					sApplyNoFutureEndorseAcc = pola001InfoList[0].sApplyNoFutureEndorseAcc ; //공동물건이면서 추징시
					
					if(totalAmt < 0){	//결재 금액이 0 보다 작으면 환급
						realTimeBankList(""); //환급할 은행목록 조회 
			        }else{
			        	realTimeBankList("true");
			        }
					
				}
				
			},
			failure:function(data) {		
				alert('단기운전자 변경이 실패하엿습니다.');
				fnPrevDriver(1); //이전단계 로
				return;
		 	}
		}
	});

   
   
}


/**
 * @alias  변경 운전자 연령 범위 	
 */
function getSpecAge(){
		var sSpecCode="";
		
	   if(parseInt(userAge)<21){
			 sSpecCode = SPEC_AGE_ALL;
			 $("#textbox442").text("전연령");
       }else if(parseInt(userAge)>=21&&parseInt(userAge)<24){
      	 sSpecCode = SPEC_AGE_21;
      	 $("#textbox442").text("만21세 이상");
       }else if(parseInt(userAge)>=24&&parseInt(userAge)<26){
      	 sSpecCode = SPEC_AGE_24;
      	 $("#textbox442").text("만24세 이상");
       }else if(parseInt(userAge)>=26&&parseInt(userAge)<30){
      	 sSpecCode = SPEC_AGE_26;
      	 $("#textbox442").text("만26세 이상");
       }else if(parseInt(userAge)>=30&&parseInt(userAge)<35){
      	 sSpecCode = SPEC_AGE_30;
      	 $("#textbox442").text("만30세 이상");
       }else if(parseInt(userAge)>=35&&parseInt(userAge)<43){
      	 sSpecCode = SPEC_AGE_35;
      	 $("#textbox442").text("만35세 이상");
       }else if(parseInt(userAge)>=43&&parseInt(userAge)<48){
      	 sSpecCode = SPEC_AGE_43;
      	 $("#textbox442").text("만43세 이상");
       }else {
      	 sSpecCode = SPEC_AGE_48;
      	 $("#textbox442").text("만48세 이상");
       }

		return sSpecCode;

}


/**
 * @alias  넘어온 문자열들의 포함된 모든 공백을 없앤 문자열을 리턴한다.
 */
function trimAll(strText)
{
var r, re;
re = /\s/g;
r = strText.replace(re, "");
return(r);
} 

/**
 * @alias 배서 확정일 
 */
function disDateFormat(str){   	
	var	ret	= str.substring(0, 4)+"."+str.substring(4, 6)+"."+str.substring(6, 8);
	return ret;
}

/**
 * @alias 단기 운전자 변경 이전단계 - 
 */
function fnPrevDriver(gubun){

	if(gubun == 1){
		closeLayer('layer02');
		$("#step03").hide();	//입력정보 확인 
		$("#step02").show();	//운전자 범위 및 연령입력    		
	}else if(gubun == 2){
		$("#step04").hide(); //카드,실시간결재
		$("#step03_02").hide(); //환급급
		$("#step03").show(); //입력정보 확인	
	}else if(gubun ==3){
		$("#step01_02").hide(); //이전내용 리스트
		$("#step01").show(); //이전내용이 있으면 신규 ,수정신청 화면 
	}else if(gubun ==4){   	
		$("#step01_03").hide();
		$("#step01_02").show();
	}else if(gubun ==5){ //contract06_step05 새로 추가된 운전자 범위선택 화면에서 이전단계 클릭 - 김택수, 2015.01.13
		$("#step02").hide();	//운전자 범위 및 연령입력  
		$("#step01_04").show();//변경정보 입력
	}else if(gubun ==6){ 	//변경내역에서 운전자 범위 및 연령입력 ==> 이전 단계로 갈경우
		$("#step02").hide();	//운전자 범위 및 연령입력  
		$("#step01_03").show();//단기 운전자 변경 내역 변경 신청 확인 내용
		
	}
	
}



/**
 * @alias  단기 운전자 변경 다음단계 - 결재전 팝업 확인 
 */
function fnNextDriver0301_chk(){

	//현재 운전자범위 와 연령범위가 변경신청내용과 같은경우 배서를 진행하지 않느다 2015.05.11 - 한성환
	if(trimAll($("#textbox438").text()) == trimAll($("#textbox439").text()) && trimAll($("#textbox441").text()) == trimAll( $("#textbox442").text()) ){
		var sMsg = "현재 보험 계약과 변경 신청 내용이 동일하여 계약 변경\n처리를 할수 없습니다.\n"
			       +"변경 기준일자나 운전자 범위를 다시 선택하시려면 이전\n단계를 클릭해 주십시오.\n"
			       +"전화를 통한 계약변경은 고객센터(1577-1001 \n평일 09시~19시, 토요일 09시~13시)를 이용해 주십시오.";
		alert(sMsg);				
		return false;	
	}
	
	if(v_totalAmt == 0){
		var sMsg = "현재 변경 보험료가 0 원입니다 계약 변경\n처리를 할수 없습니다.\n"
		       +"변경 기준일자나 운전자 범위를 다시 선택하시려면 이전\n단계를 클릭해 주십시오.\n"
		       +"전화를 통한 계약변경은 고객센터(1577-1001 \n평일 09시~19시, 토요일 09시~13시)를 이용해 주십시오.";
		alert(sMsg);				
		return false;
	}
	
	//카드 ,계좌이체 리셋
	//fnPayReset_step02();
	
	//환급
	$("#instmbankAccNo").val("");
	$("#t_refundBankList").val("");
	
	var ageText = $("#textbox442").text();    		
		
	//꼭 알아두실 사항 팝업
	$("#pointC03_01").text("["+ageText+"], ["+ $("#textbox439").text()+"]");
	openLayer("layer03");

	
} 

/**
 * @alias  단기 운전자 변경 다음단계 - 결재 
 */
function fnNextDriver0301(){
	closeLayer('layer03');//곡확인해야할사항 팝업닫기
	
	fnCustInfo(); //고객전화번호 및 이메일 정보 조회
	
	if(v_totalAmt < 0 ){	//환급
		
		$("#step03").hide(); 
		$("#step03_02").show();
		
		//$("#t_refundHolder").val();
		
		
		
		//환급  금액
		$("#t_refundHolder").text(sPolHolderName + ' (계약자) '); //환급계좌 예금주명 세팅 
		$("#textbox490").text(ValueFilter.convert("amtWon", ""+v_totalAmt+""));
    			
	}else if(v_totalAmt == 0){	//변경 보험료 없는경우 
		contract06_step02.hide();
		contract06_step0401.show();
		            		
		//textbox4213.setLabel(comma(v_totRectAmt)+"원");//이전 납부보험료
		//textbox4214.setLabel(comma(v_totRectAmt)+"원");//변경납부보험료
	}else{					//결재

		$("#step03").hide(); 
    	$("#step04").show(); 
    	
    	//결재 금액
    	$("#textbox481").text(ValueFilter.convert("amtWon", ""+ v_totalAmt +""));
    	
    	$("#t_payHolder").text(sPolHolderName + ' (계약자) '); //결제계좌 예금주명 세팅
    	
    	$("#t_sCardPayMentTag02").css("display","block");
    	$("#t_sTransferPayMentTag02").css("display","none");
    	
    	radio14[0].checked = true; 
    	
	}
	alert('평생계좌는 단기운전자 특약 계좌이체시, 사용이 불가합니다.');
} 


/**
 * @alias  현재 체크되어 있는 운전자 범위 텍스트를 리턴한다
 */
function fnDriverText(){
	var p_sFamSpecCode     = $("#t_sFamSpecCode").val();  //보험자 범위
	var returnValue = "";
    
    if(p_sFamSpecCode == SPEC_FAM_ONE){
    	returnValue = "피보험자 "+sInsrdName+"님 이외";
    }else if(p_sFamSpecCode == SPEC_FAM_ONEPLUS){
    	returnValue = "피보험자"+sInsrdName+"님과 지정인 "+ t_sTargetName.getValue()+"님이외";
    }else if(p_sFamSpecCode == SPEC_FAM_PLUS){
    	returnValue = "지정인 "+ t_sTargetName.getValue()+"님 이외";
    }else if(p_sFamSpecCode == SPEC_FAM_COUPLE){
    	returnValue = "피보험자와 배우자님 이외";
    }else if(p_sFamSpecCode == SPEC_FAM_COUPLEPAR){
    	returnValue = "피보험자 "+sInsrdName+"님 부부와 부모님 이외";
    }else if(p_sFamSpecCode == SPEC_FAM_COUPLECHI){
    	returnValue = "피보험자 "+sInsrdName+"님 부부와 자녀이외";
    }else if(p_sFamSpecCode == SPEC_FAM_COUPLEPLUS){
    	returnValue = "피보험자 "+sInsrdName+"님 부부와 지정인 "+ t_sTargetName.getValue()+"님이외";
    }else if(p_sFamSpecCode == SPEC_FAM_LIMIT){
    	returnValue = "피보험자 "+sInsrdName+"님의 가족 (형제 자매 제외) 이외";
    }else if(p_sFamSpecCode == SPEC_FAM_FAMPLUS){
    	returnValue = "피보험자 "+sInsrdName+"님의 가족(형제 자매 제외)과 지정인 "+ t_sTargetName.getValue()+"님 이외";
    }else if(p_sFamSpecCode == SPEC_FAM_BROTHER){
    	returnValue = "";
    }else if(p_sFamSpecCode == SPEC_FAM_UNLIMIT){
    	returnValue = "피보험자 "+sInsrdName+"님 이외";
    }

    return returnValue;
	
}


  /**
   * @alias  단기 운전자 변경 - 배서 확정 
   */
    function goDemandEndorse() {
    	
  	   var oReqData = {
  				pola001InfoList : pola001InfoList
  			  , polma03InfoList : polma03InfoList
  			  , polab05InfoList : polab05InfoList
  			  , resultTotInfoList : resultTotInfoList
  			};	
  		
  		HiJS.svr.doRequestAjax('DHMY0130M07L', {
  			xecure:false,
  			data : oReqData,
  			loadingbar : false,
  			callback : {
  				success:function(responseObj) {
  					var lstData = responseObj.data;
  					
  					if(v_totalAmt == 0){	//결재 금액이 0 이면 결과 화면 
  			   			fnDriverUserStep04();
  			   			fnSendEndoAgeEmail('96_11');//이메일 발송
  			   		}else{   		
  			   			//마지막  청약번호 조회
  			   			fnLastApplyNo();       
  			        }
  					
  				}
  			}
  		});
  		
    }
    
    /**
     * @alias  마지막 청약번호 조회 
     */
      function fnLastApplyNo() {
    		var oReqData = {
    				sApplyType : pola001InfoList[0].sApplyType
    			  , sApplyYM : pola001InfoList[0].sApplyYM
    			  , sApplySer : pola001InfoList[0].sApplySer
    			  , sInputType : "W"
    			};	
    		
    		HiJS.svr.doRequestAjax('DHMY0130M08L', {
    			xecure:false,
    			data : oReqData,
    			loadingbar : false,
    			callback : {
    				success:function(responseObj) {
    					var lstData = responseObj.data;
    					
    				  	var sLastApplyNo =   lstData.sApplyType + lstData.sApplyYM + lstData.sApplySer;
    				  	pola001InfoList[0].sLastApplyNo = sLastApplyNo;
						
						sApplyNo = sLastApplyNo;
						
						
						
						if(v_totalAmt < 0){
								VerifyCARD("REFUND");	//환급
						}else if(v_totalAmt > 0){	//결재 금액이 0 보다 크면    			
								
							    if ( document.all.t_payRadioBtn.value == 0 ){   	
									VerifyCARD("CARD"); //카드 결제
								}else{
						           VerifyCARD("BANK"); //실시간 계좌이체   
								}       
						}
    					
    				}
    			}
    		});
    		
      }
      
  /**
   * @alias 단기 운전자 신규 신청 
   */
	function fnEndorCreate(){
		
		fnTextReset_step01();//설정값 리셋
		
		$('#step01_04').show();
		$('#step01_02').hide();
	
	}
	
	/**
	   * @alias 설정 값 리셋
	   */
	 function fnTextReset_step01(){					 
	    	//설정 값 리셋
		 	$("#inputCalendar3").val("");//변경시작일자
		 	$("#inputCalendar4").val("");//변경 종료일자
		 	$("#t_sYoungerYear").val("");//생년
		 	$("#t_sYoungerMonth").val("");//월
		 	$("#t_sYoungerDay").val("");//일
		 	$("#textbox553").val("");//보험계약의 효력기간
	 }
	 
/**
 * @alias 단기운전자변경 즉시결제 처리
 * 
 */
function fnProcAcnoPay(){

	var oReqData = {
		     nTryCount                         :    nTryCount                         
			, sApplyNo                          :    sApplyNo                          
			, nReqAmt                           :    nReqAmt                           
			, nContactSerial                    :    nContactSerial                    
			, nUsePoint                         :    nUsePoint                         
			, sPolHolderID                      :    sPolHolderID                      
			, sPolHolderName                    :    sPolHolderName 
			, sBeginDate                        :    sBeginDate
			, sEmail                            :    sEmail                            
			, sTel0Part1                        :    sTel0Part1                        
			, sTel0Part2                        :    sTel0Part2                        
			, sTel0Part3                        :    sTel0Part3                        
			, nTryCount                         :    nTryCount                         
			, sPaymentType                      :    sPaymentType                      
			, sSpcType                          :    sSpcType                          
			, sApplyNoFutureEndorseAcc          :    sApplyNoFutureEndorseAcc          
			, specialYak                        :    specialYak                        
			, sDealBankCode                     :    sDealBankCode                     
			, sAcctNo                           :    sAcctNo  
			, sUserId : sUserId
			, remoteAddr : remoteAddr
			, sDepartCode : sDepartCode
		};	
	
	
	
	HiJS.svr.doRequestAjax('DHMY0130M10I', {
		xecure:false,
		data : oReqData,
		loadingbar : true,
		callback : {
			success:function(responseObj) {
				var lstData = responseObj.data;
			
				
				if ( lstData.sRspCode == "0000" ){
					
					$("#step04").hide();  //결제화면
					$("#step03_02").hide();  //환급화면
				
					sSmsMsg = sPolHolderName + "님의 단기운전자변경 금액 " +  ValueFilter.convert("amtWon",""+ nReqAmt+"" ) + "원이 결제 되었습니다. <현대해상 하이카다이렉트> ";
					//sendEndorseSms(); 
					
			     	var yyyy = sCurrDate.substring( 0, 4 );
					var mm   = sCurrDate.substring( 4, 6 );
					var dd    = sCurrDate.substring( 6, 8 );
					
					$("#textbox214").text($("#textbox439").text()) ; //운전자범위
					$("#textbox4217").text($("#textbox442").text()); //운전자연령범위
					$("#textbox228").text($("#textbox445").text()); //단기운전자변경기간
					
					if ( v_totalAmt >0 ) {
						$("#textbox230").text(ValueFilter.convert("amtWon", ""+v_totalAmt+"") + ' / 실시간 계좌이체 납부');
					} else {
						$("#textbox230").text(ValueFilter.convert("amtWon", ""+v_totalAmt+"")  + ' / 보험료 환급');
					}
						
					$("#textbox232").text(yyyy+ "년 " + mm + '월 ' + dd + '일') ;
					
					fnSendEndoAgeEmail('96_10');//즉시이체 완료 이메일 발송
					fnSendEndoAgeEmail('96_11');//배서완료 이메일 발송
					
					$('#step05').show(); //배서완료 화면
				}	else {
					
					//alert(lstData.sReason);
					alert('즉시이체가 정상적으로 처리되지 않았습니다. 은행명, 계좌번호, 예금주를 확인 해주세요.');
					//alert( '즉시결제가 정상적으로 처리되지 않았습니다. 동일한 문제가 반복되는 경우 1577-1001로 문의해주세요.');
					return; 
				}
				
			}
		}
	});

}



/**
 * @alias 단기운전자변경 카드결제 처리
 * 
 */
function fnProcCardPay(){

	var oReqData = {
		    sApplyNo : sApplyNo                          
			, nReqAmt :    nReqAmt 
		    , nCardNo : nCardNo
		    , sValidThruYYYY : sValidThruYYYY
		    , sValidThruMM : sValidThruMM
		    , nInstall : nInstall
		    , passwd : passwd
		    , sPolHolderID : sPolHolderID
		    , sBeginDate : sBeginDate
		    , sUserId : sUserId
		    , sCampaignId : sCampaignId
		    , sInpath1 : sInpath1
		    , sInpath2 : sInpath2
		    , sTel0Part1 : sTel0Part1
		    , sTel0Part2 : sTel0Part2
		    , sTel0Part3 : sTel0Part3
		    , nContactSerial : nContactSerial           
		    , sEmail : sEmail                   
		    , sSpcType  : sSpcType                 
		    , sApplyNoFutureEndorseAcc : sApplyNoFutureEndorseAcc 
		    , nTryCount : nTryCount                
		    , specialYak : specialYak                            
		    , encSign : encSign                        
		    , remoteAddr : remoteAddr
		    , sDepartCode : sDepartCode 
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M11I', {
		xecure:false,
		data : oReqData,
		loadingbar : true,
		callback : {
			success:function(responseObj) {
				//$.unblockUI();
				//$.blockUI();
				var lstData = responseObj.data;
				
				if ( lstData.sRspCode == "0000" ){
					$("#step04").hide();  //결제화면
					$("#step03_02").hide();  //환급화면
					
					sSmsMsg = sPolHolderName + "님의 단기운전자변경 금액 " +  nReqAmt + "원이 결제 되었습니다. <현대해상 하이카다이렉트> ";
					//sendEndorseSms(); 
					
					sApvNo = lstData.sAdmitNo ; 
					sDealBankNm = lstData.sCardName;
					
			     	var yyyy = sCurrDate.substring( 0, 4 );
					var mm   = sCurrDate.substring( 4, 6 );
					var dd    = sCurrDate.substring( 6, 8 );
					$("#textbox214").text($("#textbox439").text()) ; //운전자범위
					$("#textbox4217").text($("#textbox442").text()); //운전자연령범위
					$("#textbox228").text($("#textbox445").text()); //단기운전자변경기간
					$("#textbox230").text($("#textbox481").text() + ' / 카드결제 납부');
					$("#textbox232").text(yyyy+ "년 " + mm + '월 ' + dd + '일') ;
					
					fnSendEndoAgeEmail('96_9');//카드결제 완료 이메일 발송
					fnSendEndoAgeEmail('96_11');//배서 완료 이메일 발송
					
					$('#step05').show(); //배서완료 화면
					
					
					
				} else {
					alert(lstData.sReason);
					
					//alert( '카드결제가 정상적으로 처리되지 않았습니다. 동일한 문제가 반복되는 경우 1577-1001로 문의해주세요.');
					return; 
					
				}
			}
		}
	});

}


/**
 * @alias 단기운전자변경 결제/환급 은행조회

 */
function realTimeBankList(isWeb){
	var oReqData = {
			isWeb : isWeb        
			, sCodeType : sCodeType 
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M10L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				//$.unblockUI();
				//$.blockUI();
				
				var b_lst = responseObj.data.realBankList;
				var rb_lst = responseObj.data.refundBankList;
				
				if ( isWeb == 'true') {
					
					for(var i = 0; i <  b_lst.length; i++) {		
						
						var sBankCode  = b_lst[i].sBankCode ;
						var sBankName = b_lst[i].sBankName ;
						var data = 
							"<option value=" + sBankCode  + ">" + sBankName + "</option>" ;
						
						
						$("#ptyKorNmLname2").append(data);
					}
				}else {
					
					var opt = "";
					for(var i = 0; i < rb_lst.length; i++) {		
						
						//alert("sMainCode==>" + rb_lst[rb_cnt].sMainCode  );
						
						var sMainCode  = rb_lst[i].sMainCode ;
						var sShortName = rb_lst[i].sShortName ;
						var data = 
							"<option value=" + sMainCode  + ">" + sShortName + "</option>" ;
						
						
						$("#ptyKorNmL3").append(data);
						
					}
				}
			}
		}
	});

}





/**
 * @alias 단기운전자변경 SMS 발송 - 사용안함. 필요시 수정 후 테스트 해서 사용해야함.

 */
function sendEndorseSms(){

	//alert("sTel0Part==>"+ sTel0Part1 + sTel0Part2 + sTel0Part3  );
	
	var oReqData = {
			sTel0Part1 : sTel0Part1
	     ,  sTel0Part2 : sTel0Part2
	     ,  sTel0Part3 : sTel0Part3
	     ,  sSmsMsg : sSmsMsg
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M11L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				
			}
		}
	});

}


/**
 * @alias 단기운전자변경 이메일 발송

 */
function fnSendEndoAgeEmail(value){

	var oReqData = {
			    sEmailCd            : value 
			  , sEmail                : sEmail          
			  , sPolHolderName  : sPolHolderName  
			  , sPolHolderID      :  sPolHolderID
			  , sInsrdName         : sInsrdName    
			  
			  , sCarNo              : pola001InfoList[0].sPlateNo          
			  , sInsuTerm           : (pola001InfoList[0].sFmdt).substring(0,4) + '.' + (pola001InfoList[0].sFmdt).substring(4,6) + '.' + (pola001InfoList[0].sFmdt).substring(6,8)  + ' ~ ' +  (pola001InfoList[0].sTodt).substring(0,4) + '.' + (pola001InfoList[0].sTodt).substring(4,6) + '.' + (pola001InfoList[0].sTodt).substring(6,8)         
			  , nReqAmt             : ValueFilter.convert("amtWon", ""+nReqAmt+"")          
			  , sDealBankNm      : sDealBankNm     
			  
			  , sCardNo             : nCardNo.substring(0 , nCardNo.length-4)   + '****'         
			  , sApvNo              : sApvNo
			  , sAcnt               :  sAcctNo.substring(0 , sAcctNo.length-6)  + '******'           
			  , sDptrNm            : sPolHolderName         
			  , sChgDt             : sCurrDate.substring(0,4) + '.' + sCurrDate.substring(4,6) + '.' + sCurrDate.substring(6,8)
			  , sChgScope       : $("#textbox439").text()       
			  , sChgAgeScope  : $("#textbox442").text()    
			  , sChgTerm         : $("#textbox445").text() 
		};	
	
	
	
	HiJS.svr.doRequestAjax('DHMY0130M12L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				//alert("메일발송성공"); 
				
			}
		}
	});

}





/**
 * @alias 단기운전자변경 연락처조회

 */
function fnCustInfo(){

	var oReqData = {
			ptyRegNo : regNo 
		};	
	
	HiJS.svr.doRequestAjax('DHMY0130M13L', {
		xecure:false,
		data : oReqData,
		loadingbar : false,
		callback : {
			success:function(responseObj) {
				var lst = responseObj.data.cipm0026VO;
				
				var tel = lst.tcntTelAraNoHphn1 + lst.tcntTelTxNoHphn1 + lst.tcntTelSeqNoHphn1 ; 
				var eMail = lst.tcntElecAddr + '@' +  lst.tcntElecAddrDomain  ; 
				
				
				 sTel0Part1 =  lst.tcntTelAraNoHphn1;   //전화번호 - SMS 전송시 사용
				 sTel0Part2 =  lst.tcntTelTxNoHphn1;   //전화번호 - SMS 전송시 사용
				 sTel0Part3 =  lst.tcntTelSeqNoHphn1;   //전화번호 - SMS 전송시 사용
				 sEmail =  lst.tcntElecAddr + '@' +  lst.tcntElecAddrDomain  ; 
				 
				 
				 //alert('전화==>'+ sTel0Part1 + sTel0Part2+ sTel0Part3 );
				 //alert('이메일==>'+ sEmail);
				 
				 //sEmail = "idktw01@naver.com";
				 
				 //alert('이메일 변경==>'+ sEmail);
				 
				 
				 //alert("연락처조회 성공"); 
			}
		}
	});
}


/**
 * @alias 키보드의 숫자만 받도록처리
 */
function onlyNumber(){
	var code = window.event.keyCode;
	if ((code > 34 && code < 41) || (code > 47 && code < 58) 
	      || (code > 95 && code < 106) || code == 8 
	      || code == 9 || code == 13 || code == 46){
	  window.event.returnValue = true;
	  return;
	}
	window.event.returnValue = false;
}



/*
 * @function :fnMaxNumChk()
 * @desc    :  카드번호 Max 값 체크
 * @param  :  
 * @return  : 
 * @cdate :2013.09.11
 * @author:한성환
 * @ucont :수정내용
 * @udate :수정일
 * @modifer:수정자
 */           
  function fnMaxNumChk(objName){
      
	  var getName = document.getElementsByName(objName)[0];

      if(objName == "card_num_in1"){
          if(getName.value.length == 4){                  
               //document.getElementById("card_num_in2").focus();
               document.getElementsByName("card_num_in2")[0].focus();
          }
      }else if(objName == "card_num_in2"){
          if(getName.value.length == 4){                  
               document.getElementsByName("card_num_in3")[0].focus();
          }
      }else if(objName == "card_num_in3"){
          if(getName.value.length == 4){                  
               document.getElementsByName("card_num_in4")[0].focus();
          }
      }
  } 
  

  
  


  /*
  * @function  :  fnChangeRadio14()
  * @desc      :  결제 단계 신용카드 ,계좌이체 선택시 이벤트 
  * @param     :  
  * @return     :  
  * @cdate     :  2015.09.14
  * @author    :  김태원
  * @ucont     : 
  * @udate     :
  * @modifer   : 
  */  
 function fnChangeRadio14(value){
 	
	 	if(value == 0){
 			
 			//즉시이체 설정값 초기화
 			$('#ptyKorNmLname2').val('');  //결제은행코드
 			$('#ptyKorNmL2').val(''); //계좌번호
 			
 			document.getElementById("t_sCardPayMentTag02").style.display="block"; //즉시결제 화면 숨김 
 			document.getElementById("t_sTransferPayMentTag02").style.display="none"; //카드결제 화면 보임
 			document.all.t_payRadioBtn.value = 0 ; 
 		}else{
 			
 			if ( curTime >= "0900" && curTime <= "2200" ){
 				
 			} else {
 				//alert("curTime111===>"+ curTime);
 				alert("09~22시까지만 즉시이체가 가능합니다.");
 				//document.getElementById("t_sCardPayMentTag02").style.display="block"; //즉시결제 화면 숨김 
 	 			//document.getElementById("t_sTransferPayMentTag02").style.display="none"; //카드결제 화면 보임
 	 			//document.all.t_payRadioBtn.value = 0 ; 
 				//document.getElementById("radio14_01").index = 0 ; 
 	 			//$('#radio14_01').checked = true; 
 				radio14[0].checked = true; 
 	 			//alert($('#radio14_01').checked);
 				return; 
 			}
 			
 			//카드 설정값 초기화
 		    $('#card_num_in1').val(''); //카드번호1
 		    $('#card_num_in2').val(''); //카드번호2
 		    $('#card_num_in3').val(''); //카드번호3
 		    $('#card_num_in4').val(''); //카드번호4
 			$('#regNo2L').val(''); //카드년도
 			$('#regNo1L').val('');  //카드월
 			$('#carddvide').val('0'); //할부개월수
 			
 		    
 			document.getElementById("t_sCardPayMentTag02").style.display="none"; //카드결제 화면 숨김 
 			document.getElementById("t_sTransferPayMentTag02").style.display="block"; //즉시결제 화면 보임
 			document.all.t_payRadioBtn.value =  1 ;  
 		}
 		
 }
 
	/**
	 * @alias 평생계좌 제외
	 * @param bnkCd : 은행코드 
	 * @param actNo : 계좌번호
	 */
	function checkAllLifeActNo(bnkCd, actNo) {
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
		}
		return true;
	}

	