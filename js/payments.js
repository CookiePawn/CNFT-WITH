let day;
let today;
var paymentDiv = document.querySelector('.paymentDiv');
var payResultDiv = document.querySelector('.payResultDiv');
var payErrorDiv = document.querySelector('.payErrorDiv');
var paySuccessDay = document.querySelector(".paySuccessDay");
var paySuccessPayment = document.querySelector(".paySuccessPayment");
var paySuccessTotal = document.querySelector(".paySuccessTotal");
var paySuccessCard = document.querySelector(".paySuccessCard");
var payErrorText = document.querySelector(".payErrorText");
var payID = document.getElementById("payID");
var termsCheckBox = document.getElementById('termsCheckBox');






var IMP = window.IMP; 
IMP.init('imp35844342'); 

function tossPay() {
    getTime();
    if (termsCheckBox.checked == false) {
        alert('약관 동의를 해주세요!')
        return;
    }

    IMP.request_pay({
        pg : 'tosspay.tosstest',
        pay_method : 'card',
        merchant_uid: `${day}`, 
        name : '백지환',
        amount : 9900,
        buyer_email : 'Iamport@chai.finance',
        buyer_name : '아임포트 기술지원팀',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456'
    }, function (rsp) { // callback
        if (rsp.success) {
            //paySuccessText2.textContent = `상점 거래ID : ${rsp.merchant_uid}`;
            paySuccessDay.textContent = today;
            paySuccessPayment.textContent = '토스 페이'
            paySuccessTotal.textContent = `${rsp.paid_amount}원`;
            paySuccessCard.textContent = rsp.apply_num;
            payID.setAttribute('value', rsp.merchant_uid);

            paymentDiv.style.display = 'none';
            payResultDiv.style.display = 'block';
        } else { 
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            payErrorText.textContent = rsp.error_msg;
            paymentDiv.style.display = 'none';
            payErrorDiv.style.display = 'block';
        }
        
    });
}

function kakaoPay() {
    getTime();
    if (termsCheckBox.checked == false) {
        alert('약관 동의를 해주세요!')
        return;
    }

    IMP.request_pay({
        pg : 'kakaopay.TC0ONETIME',
        pay_method : 'card',
        merchant_uid: `${day}`, 
        name : '백지환',
        amount : 9900,
        buyer_email : 'Iamport@chai.finance',
        buyer_name : '아임포트 기술지원팀',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456'
    }, function (rsp) { // callback
        if (rsp.success) {
            //paySuccessText2.textContent = `상점 거래ID : ${rsp.merchant_uid}`;
            paySuccessDay.textContent = today;
            paySuccessPayment.textContent = '카카오 페이'
            paySuccessTotal.textContent = `${rsp.paid_amount}원`;
            paySuccessCard.textContent = rsp.apply_num;
            payID.setAttribute('value', rsp.merchant_uid);

            paymentDiv.style.display = 'none';
            payResultDiv.style.display = 'block';
        } else { 
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            payErrorText.textContent = rsp.error;
            paymentDiv.style.display = 'none';
            payErrorDiv.style.display = 'block';
        }
        
    });
}



function getTime() {
    const date = new Date()
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let days = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2); 
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2); 

    day = `${year}${month}${days}-${hour}${minutes}${seconds}`
    today = `${year}년 ${month}월 ${days}일`
}
