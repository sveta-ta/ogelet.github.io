;

$(document).ready(function(){
	$('.preloader_wrapper').delay(100).fadeOut(500);


if ($(window).width() > 600) {
    	$('.item_has_submenu').hover(function () {
    	 $(this).find('.main_nav_submenu').slideToggle(300);
    	});
	} else {
    	$('.item_has_submenu').click(function () {
     	$(this).find('.main_nav_submenu').toggleClass('show');
    });
}




    $(".mobile_menu_toggler").click(function () {
     $(this).toggleClass('active');
     $('.header_nav').toggleClass('active');
    });
});