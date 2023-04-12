// height 100% 
$(document).ready(sizeContent);
$(window).resize(sizeContent);
function sizeContent() {
	var newHeight=$("html").height() - $("header").height() + "px";
	$('#popContent').css("height", newHeight);
    layerPosition(); // fuz 업무지원 추가 스크립트
}

/* fuz 업무지원 추가 스크립트*/

//레이어 가운데 정렬
function layerPosition(){
    var layerH = $(".layerWrap").height();
    var layerMt = -(layerH/2)
    $(".layerWrap").css({
        marginTop:layerMt
    })
}


$(function(){
	if($('.toggleWrap').length){
		$('.toggleWrap .toggleTitle a').click(function(e){
			if($(this).parent().parent().hasClass('open') == true) {
				$(this).parent().parent().removeClass('open');
			} else {
				$(this).parent().parent().parent().find('div').removeClass('open');
				$(this).parent().parent().addClass('open');
			}
		});
	}
    if($('.carBaner .basic').length){
        $('.carBaner .basic').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false
        });
    }
  

})