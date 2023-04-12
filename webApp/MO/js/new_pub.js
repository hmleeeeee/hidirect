/**
 * [MO] ui.common.js
 * --------------------------------------
 * Start : 2023/02/02
 * Modify: 2023/02/02
 */ 




/**
* Test Script
* -----------------------------------------
*/
$(document).ready(function() {
	//Sidebar
	$('.btn_sidebar_open').on('click', function(){
		UI.sidebar.open(); 
		$('.sidebar_content').scrollTop(0);
	});
	$('.btn_sidebar_close').on('click', function(){
		UI.sidebar.close();
	});


	//[4/3] ui.common.js로 이동: form.setFocus();
	// $input = $('input[type=text],input[type=password],input[type=number],select,.btn_select');
	// $input.focus(function(){
	// 	$(this).parents('.form_wrap, .card_wrap').addClass('focus');
	// })
	// $input.blur(function(){
	// 	$(this).parents('.form_wrap,.card_wrap').removeClass('focus');
	// })


	$("select").change(function () {
		if($(this).val() == "placeholder")
		 $(this).addClass("placeholder");
		else $(this).removeClass("placeholder")
	});
	$("select").change();


	// $(".btn_tooltip").on("click", function(){
	// 	var _targetLeft = $(this).offset().left;
	// 	$("tooltip").removeClass("active")
	// 	$(this).parent().toggleClass("active");
	// 	$(this).parent().find(".tooltip_wrap").css("left",-_targetLeft+20);
	// });


	//toggle Btn;
	$('a.btn.toggle').on('click', function(){
		$(this).toggleClass('on')
	})
});









/**
* Guide Script
* -----------------------------------------
*/
function guideTab(){
	var $tabNav = $('.tab_scroll[data-tab="GuideTab"]');
	var $tabCon = $('.tab_content[data-tab="GuideTab"]');
	var lastItem = $tabNav.find('li').length -1;

	//View All
	UI.tab('GuideTab', lastItem, function($this, i){
		if(i == lastItem) {
			$tabCon.show();
			$tabCon.addClass('hr mtb');
			$tabCon.eq(0).removeClass('hr mtb')
		}else{
			$tabCon.removeClass('hr mtb')
		}
	});
}

//Guide 사용
function guideLayout(){
	if($('body').hasClass('layoutBody') || $('body').find('.layoutBody').length < 1){
			$('body').removeClass('layoutBody').wrapInner('<div class="layoutBody"></div>');
	}
	$('.layoutBody').each(function(){
		var idx = 0;
		$(this).attr('data-depth', idx);

		$(this).find('div').each(function(){
			var $this = $(this);
			var idStr = $this.attr('id');
			var classStr = $this.attr('class');

			if(!!idStr) $this.attr('data-id', idStr).removeAttr('id');
			if(!!classStr) $this.attr('data-class', classStr).removeAttr('class');

			if($this.siblings('div').attr('data-depth') != undefined) idx = parseInt($this.siblings('div').attr('data-depth'));
			else idx = parseInt($this.parent('div').attr('data-depth')) + 1;

			if(idx % 2) $this.css({'background' : '#fff', 'box-shadow' : '4px 4px 4px 0 rgba(0,0,0,0.'+Math.ceil(idx/1.5)+')'});
			else $this.css({'background' : '#efefef', 'box-shadow' : '4px 4px 4px 0 rgba(0,0,0,0.'+Math.ceil(idx/1.5)+')'});

			$this.attr('data-depth', idx);

			if(idStr){
				if(classStr) $this.prepend('<div class="label">#'+idStr+'.'+classStr+'</div>');
				else $this.prepend('<div class="label">#'+idStr+'</div>');
			}else $this.prepend('<div class="label">.'+classStr+'</div>');

		});

		$(this).prepend('<div class="label">body</div>');
	});
}

