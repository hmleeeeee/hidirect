
function fn_lt_HpChange(el){
	var hp = el.value;	
	if(hp.length > 9){
		if(hp.length == 10){
			$("#telNo1").val(hp.substring(0,3));
			$("#telNo2").val(hp.substring(3,6));
			$("#telNo3").val(hp.substring(6,10));
		}else if(hp.length == 11){
			$("#telNo1").val(hp.substring(0,3));
			$("#telNo2").val(hp.substring(3,7));
			$("#telNo3").val(hp.substring(7,11));
		}
	}
}