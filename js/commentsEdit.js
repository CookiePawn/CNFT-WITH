var form = document.comPostForm;
var tmp;

var target1 = document.getElementById("emailID");

let observer1 = new MutationObserver((mutations) => {
    tmp = target1.getAttribute('value');
})
let option1 = {
    attributes: true,
    childList: true,
    characterData: true
};
observer1.observe(target1, option1);



function comPost() {
    if(form.comContent.value.length <= 0) {
        alert('댓글을 입력해주세요!');
        return false;
    }

    if(tmp != null) {
        return true;
    } 
    else if (tmp == null){
        alert('비정상적인 접근입니다!\n다시 로그인 해주세요.');
        location.href='/';
        return false;
    }


}







function comEditClick(i) {
    document.getElementById(`comEditID2${i}`).style.display="none";
    document.getElementById(`comEditID${i}`).style.display="block";
    document.getElementById(`comDeleteID${i}`).style.display="none";
    document.getElementById(`comDeleteID2${i}`).style.display="block";

    document.getElementById(`p${i}`).style.display="none";
    document.getElementById(`textarea${i}`).style.display="block";
}

function comEscClick(i) {
    document.getElementById(`comEditID2${i}`).style.display="block";
    document.getElementById(`comEditID${i}`).style.display="none";
    document.getElementById(`comDeleteID${i}`).style.display="block";
    document.getElementById(`comDeleteID2${i}`).style.display="none";

    document.getElementById(`p${i}`).style.display="block";
    document.getElementById(`textarea${i}`).style.display="none";
}



