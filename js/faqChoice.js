var contents1 = document.getElementById("accordion1");
var contents2 = document.getElementById("accordion2");
var contents3 = document.getElementById("accordion3");
var contents4 = document.getElementById("accordion4");
var contents5 = document.getElementById("accordion5");

function toggleBtn1(){
    contents1.style.display="block";
    contents2.style.display="none";
    contents3.style.display="none";
    contents4.style.display="none";
    contents5.style.display="none";
}
function toggleBtn2(){
    contents2.style.display="block";
    contents1.style.display="none";
    contents3.style.display="none";
    contents4.style.display="none";
    contents5.style.display="none";
}
function toggleBtn3(){
    contents3.style.display="block";
    contents2.style.display="none";
    contents4.style.display="none";
    contents5.style.display="none";
    contents1.style.display="none";
}
function toggleBtn4(){
    contents4.style.display="block";
    contents1.style.display="none";
    contents2.style.display="none";
    contents3.style.display="none";
    contents5.style.display="none";
}
function toggleBtn5(){
    contents5.style.display="block";
    contents1.style.display="none";
    contents2.style.display="none";
    contents3.style.display="none";
    contents4.style.display="none";
}

// 페이지가 새로 리로드 될때만 실행
var top_space = 0;
if ($('#header').length) {
  top_space = $('#header').outerHeight();
}  //해더에 바가 있는 경우 오프셋 하는 경우 필요


var hash = window.location.hash;
if (hash && document.getElementById(hash.slice(1))) { // #값이 있을때만 실행됨
  var $this = $(hash);
  $('html, body').animate({
    scrollTop: $this.offset().top - top_space
  }, 1000, 'easeInOutExpo', function () {
    window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
  });
}

