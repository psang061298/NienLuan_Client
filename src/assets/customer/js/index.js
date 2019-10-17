//
//$(function() {
//    var pull        = $('#pull');
//        menu        = $('nav ul');
//        menuHeight  = menu.height();
// 
//    $(pull).on('click', function(e) {
//        e.preventDefault();
//        menu.slideToggle();
//    });
//});
//
//$(window).resize(function(){
//    var w = $(window).width();
//    if(w > 768 && menu.is(':hidden')) {
//        menu.removeAttr('style');
//    }
//});
//
clickshow = false;
function shownav(){
	this.clickshow = !clickshow;
	if(clickshow){
		document.getElementById("navbar").style.top="0";
	}
	else{
	document.getElementById("navbar").style.top="-200px";
	}	
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("btntop").style.display = "block";
  } else {
    document.getElementById("btntop").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
//  document.body.scrollTop = 0;
//  document.documentElement.scrollTop = 0;
	$("body,html").animate({scrollTop: 0}, "slow");
}

var slideIndex = 0;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function load(n){
//	plusSlides(n);
	showMenu(n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
	var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

function menu(n){
	showMenu(n);
}

function showMenu(n){
	var i;
  	// var slides = document.getElementsByClassName("content_price");
	var dots = document.getElementsByClassName("navbar-brand");
  	// for (i = 0; i < slides.length; i++){
    //   slides[i].style.display = "none";  
  	// }
	for (i = 0; i < dots.length; i++) {
	dots[i].className = dots[i].className.replace(" active", "");
	}
  	// slides[n-1].style.display = "flex"; 
	dots[n-1].className += " active";
}

$(document).ready(function() {
    $('.list-group-item').click(function() {
        $('.list-group-item').removeClass('active');
        $(this).closest('.list-group-item').addClass('active')
    });
});



