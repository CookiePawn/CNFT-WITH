var text = document.querySelector('textarea[name="comContent"]');
var div = document.querySelector('div[name="comPosting"]');
var body = document.querySelector('body');



body.addEventListener('click', function(e) {
    var target = e.target;
    
    if(target == text) {
        div.style.border = '2px solid lightskyblue';
    }
    else if (target != text) {
        div.style.border = '2px solid #1111';
    }
});