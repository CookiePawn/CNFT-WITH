var form = document.postingForm;

function postingCheck() {
    if(form.postTitle.value.length <= 0) {
        alert('제목을 입력해주세요!');
        return false;
    }

    if(form.postContent.value.length <= 0) {
        alert('본문을 입력해주세요!');
        return false;
    }
    return true;
}