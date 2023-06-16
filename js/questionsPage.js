var div = document.querySelectorAll(".qnaInfoListDiv");
var buttons = document.querySelectorAll(".qnaCategoryDiv > button");
var qnaInfos0 = document.querySelectorAll(".enterQna > .qnaInfo > p");
var qnaInfos1 = document.querySelectorAll(".CNFTQna > .qnaInfo > p");
var qnaInfos2 = document.querySelectorAll(".adaQna > .qnaInfo > p");
var qnaInfos3 = document.querySelectorAll(".brokerageQna > .qnaInfo > p");
var qnaInfos4 = document.querySelectorAll(".subscribeQna > .qnaInfo > p");


//로드 이벤트
buttons[0].style.backgroundColor = 'white'
buttons[0].style.border = '1px solid black'
buttons[0].style.color = '#9f9f9f'
div[0].style.display = 'block';


const btnClick = (n) => {
    for (let i=0; i<buttons.length; i++) { 
        if (i == n) {
            buttons[n].style.backgroundColor = 'white'
            buttons[n].style.border = '1px solid black'
            buttons[n].style.color = '#9f9f9f' 
            div[n].style.display = 'block';
        } 
        else {
            buttons[i].style.backgroundColor = '#9f9f9f'
            buttons[i].style.border = '1px solid #9f9f9f'
            buttons[i].style.color = 'white'    
            div[i].style.display = 'none'; 
        } 
    }
}

//기업
const infoClick0 = (n) => {
    for (let i=0; i<qnaInfos0.length; i++) {
        if (i == n) {
            qnaInfos0[n].style.display = 'block'
        }
        else {
            qnaInfos0[i].style.display = 'none'
        }
    }
}

//CNFT
const infoClick1 = (n) => {
    for (let i=0; i<qnaInfos1.length; i++) {
        if (i == n) {
            qnaInfos1[n].style.display = 'block'
        }
        else {
            qnaInfos1[i].style.display = 'none'
        }
    }
}

//에이다
const infoClick2 = (n) => {
    for (let i=0; i<qnaInfos2.length; i++) {
        if (i == n) {
            qnaInfos2[n].style.display = 'block'
        }
        else {
            qnaInfos2[i].style.display = 'noene'
        }
    }
}

//브로커리지
const infoClick3 = (n) => {
    for (let i=0; i<qnaInfos3.length; i++) {
        if (i == n) {
            qnaInfos3[n].style.display = 'block'
        }
        else {
            qnaInfos3[i].style.display = 'none'
        }
    }
}

//구독
const infoClick4 = (n) => {
    for (let i=0; i<qnaInfos4.length; i++) {
        if (i == n) {
            qnaInfos4[n].style.display = 'block'
        }
        else {
            qnaInfos4[i].style.display = 'none'
        }
    }
}