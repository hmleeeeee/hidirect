var timerchecker=null;var initTime=1800;function setTimeExpire(){HiJS.svr.doRequestAjax("DHCO0099M14S",{data:{Expire:true},xecure:false,callback:{success:function(a){if(a.header.responseCode=="OK"){}else{alert("세션체크 실패")}}}})}function setTimeReset(){showCountdown(initTime,2)}function clearCountdownTimeOut(){if(timerchecker!=null){clearTimeout(timerchecker)}timerchecker=null}function setTimeStr(b){var a=b+"";if(a.length<2){a="0"+a}return a}function showCountdown(a,f){var h=0;var c=0;var d=0;var e=0;var g=0;var b="";var i=a-1;if(i>=0){h=Math.floor(i/(3600*24));g=i%(24*3600);c=Math.floor(g/3600);g=g%3600;d=Math.floor(g/60);e=g%60;b=(h>0)?h+"일 ":"";b=(c>0)?b+c+"시간 ":(b.length>0)?b+"시간":b;b=(d>0)?b+setTimeStr(d)+"분 ":(b.length>0)?b+setTimeStr(d)+"분":b;b=b+setTimeStr(e)+"초"}if(d<=0||d==""){b="00분 "+b}if(d!=""&&d>=20){e=0;b="20분 00초"}if((e<=0&&b=="00초")||(b=="")){b="00분 00초"}if(i==0){lpOpener("certificateEndLayer");setTimeExpire();return}if(b!="0"){if(f==1){timerchecker=setTimeout("showCountdown("+i+", 1)",1000)}else{if(f==2){clearCountdownTimeOut();showCountdown(initTime,1)}}}};