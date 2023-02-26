var ADACheck = false;
var NEWSCheck = false;
var noticeCheck = false;

var ADASection = document.getElementById('ADASection');

var news1 = document.querySelector("div[name='CNFTNews1']");
var news2 = document.querySelector("div[name='CNFTNews2']");
var news3 = document.querySelector("div[name='CNFTNews3']");

var notice1 = document.querySelector("div[name='CNFTNotice1']");
var notice2 = document.querySelector("div[name='CNFTNotice2']");
var notice3 = document.querySelector("div[name='CNFTNotice3']");








$(window).on('scroll',function() {
    if (checkVisible(document.querySelector('.mainADADiv'))&&!ADACheck) {

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


    if (checkVisible(notice1)&&!noticeCheck) {

        notice1.animate({
            marginLeft : ['-50%', '0%'],
            opacity : [0, 1]
        }, {
            duration: 1500,
            easing: "ease"
        });

        notice2.animate({
            marginLeft : ['50%', '0%'],
            opacity : [0, 1]
        }, {
            duration: 1500,
            delay: 300,
            easing: "ease"
        });

        notice3.animate({
            marginLeft : ['-50%', '0%'],
            opacity : [0, 1]
        }, {
            duration: 1500,
            delay: 600,
            easing: "ease"
        });


        
        notice1.style.opacity='1';
        setTimeout(function() {
            notice2.style.opacity='1';
        }, 300);
        setTimeout(function() {
            notice3.style.opacity='1';
        }, 600);

        noticeCheck=true;
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


























//스크롤 시 한 세션씩 이동

var mHtml = $("html");
var page = 1;

window.addEventListener("wheel", function(e) {
    e.preventDefault();
} ,{passive : false});

mHtml.animate({scrollTop : 0},10);


$(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if (page == 1) {
            window.scrollTo(0, 900);
        }
        if (page == 2) {
            window.scrollTo(0, 1650);
        }
        if (page == 3) {
            window.scrollTo(0, 2450);
        }
        if (page == 4) {
            window.scrollTo(0, 3400);
        }
        if (page == 5) {
            window.scrollTo(0, 3900);
        }
        if (page == 6) {
            window.scrollTo(0, 50000);
            return;
        }
        page++;
    } else if(e.originalEvent.deltaY < 0) {
        if (page == 1) {
            window.scrollTo(0, 000);
            return;
        }
        if (page == 2) {
            window.scrollTo(0, 900);
        }
        if (page == 3) {
            window.scrollTo(0, 1650);
        }
        if (page == 4) {
            window.scrollTo(0, 2450);
        }
        if (page == 5) {
            window.scrollTo(0, 3400);
        }
        if (page == 6) {
            window.scrollTo(0, 3900);
        }
        page--;
    }
    
})



