let day;
var payChoice = document.getElementById("subscriptionPaymentsDiv");
var paySuccess = document.querySelector(".paySuccess");
var paySuccessText1 = document.querySelector(".paySuccessText1");
var paySuccessText2 = document.querySelector(".paySuccessText2");
var paySuccessText3 = document.querySelector(".paySuccessText3");
var paySuccessText4 = document.querySelector(".paySuccessText4");
var payID = document.getElementById("payID");



var IMP = window.IMP; 
IMP.init('imp35844342'); 

function tossPay() {
    getTime();

    IMP.request_pay({
        pg : 'tosspay.tosstest',
        pay_method : 'card',
        merchant_uid: `${day}`, 
        name : '당근 10kg',
        amount : 1999999,
        buyer_email : 'Iamport@chai.finance',
        buyer_name : '아임포트 기술지원팀',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456'
    }, function (rsp) { // callback
        if (rsp.success) {
            paySuccessText1.textContent = '결제가 완료되었습니다.';
            paySuccessText2.textContent = `상점 거래ID : ${rsp.merchant_uid}`;
            paySuccessText3.textContent = `결제 금액 : ${rsp.paid_amount}`;
            paySuccessText4.textContent = `카드 승인번호 : ${rsp.apply_num}`;
            payID.setAttribute('value', rsp.merchant_uid);

            payChoice.style.display="none";
            paySuccess.style.display="block";
        } else { 
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
        }
        
    });
}

function kakaoPay() {
    getTime();

    IMP.request_pay({
        pg : 'kakaopay.TC0ONETIME',
        pay_method : 'card',
        merchant_uid: `${day}`, 
        name : '강남 힐스테이트',
        amount : 100000000,
        buyer_email : 'Iamport@chai.finance',
        buyer_name : '아임포트 기술지원팀',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456'
    }, function (rsp) { // callback
        if (rsp.success) {
            paySuccessText1.textContent = '결제가 완료되었습니다.';
            paySuccessText2.textContent = `상점 거래ID : ${rsp.merchant_uid}`;
            paySuccessText3.textContent = `결제 금액 : ${rsp.paid_amount}`;
            paySuccessText4.textContent = `카드 승인번호 : ${rsp.apply_num}`;
            payID.setAttribute('value', rsp.merchant_uid);

            payChoice.style.display="none";
            paySuccess.style.display="block";
        } else { 
            var msg = '결제에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
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
}
