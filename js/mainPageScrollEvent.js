var ADACheck = false;
var NEWSCheck = false;

var ADASection = document.getElementById('ADASection');

var news1 = document.querySelector("div[name='CNFTNews1']");
var news2 = document.querySelector("div[name='CNFTNews2']");
var news3 = document.querySelector("div[name='CNFTNews3']");



$(window).on('scroll',function() {
    if (checkVisible($('#ADASection'))&&!ADACheck) {

        ADASection.animate({
            marginLeft : ['50%', '0%'],
            opacity : [0, 1]
        }, {
            duration: 1500,
            easing: "ease"
        });
        
        ADASection.style.opacity='1';
        ADACheck=true;
    }

    if (checkVisible(news1)&&!NEWSCheck) {

        news1.animate({
            transform : ['translateY(300px)', 'translateY(0px)'],
            opacity : [0, 1]
        }, {
            duration: 1000,
            easing: "ease"
        });

        news2.animate({
            transform : ['translateY(300px)', 'translateY(0px)'],
            opacity : [0, 1]
        }, {
            duration: 1000,
            delay : 300,
            easing: "ease"
        });

        news3.animate({
            transform : ['translateY(300px)', 'translateY(0px)'],
            opacity : [0, 1]
        }, {
            duration: 1000,
            delay : 600,
            easing: "ease"
        });

        
        news1.style.opacity='1';
        setTimeout(function() {
            news2.style.opacity='1';
        }, 300);
        setTimeout(function() {
            news3.style.opacity='1';
        }, 600);


        NEWSCheck=true;
    }


});



















function checkVisible( elm, eval ) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();   
    
    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}