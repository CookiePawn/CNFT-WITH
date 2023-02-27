var text = document.querySelector('input[name="postSearch"]');
var label = document.querySelector('.postToolDiv > form > div > label');
var div = document.querySelector('.postToolDiv > form > div');
var body = document.querySelector('body');



body.addEventListener('click', function(e) {
    var target = e.target;
    
    if(target == text) {
        label.innerHTML = '제목 검색';
        label.style.transform = 'translate(20px, -7px)';
        div.style.border = '2px solid lightskyblue';
    }
    else if (target != text && text.value == '') {
        label.innerHTML = '검색하고 싶은 게시글을 검색하세요';
        label.style.transform = 'translate(52px, 13px)';
        div.style.border = '2px solid rgba(0, 0, 0, 0.3)';
    }
});