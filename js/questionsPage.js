var buttons = document.querySelectorAll("div[class='qnaCategoryDiv'] > button");
var qnaInfos = document.querySelectorAll("div[class='qnaInfo']")


//로드 이벤트
buttons[0].style.backgroundColor = 'white'
buttons[0].style.border = '1px solid black'
buttons[0].style.color = '#9f9f9f'


const btnClick = (n) => {
    for (let i=0; i<buttons.length; i++) {
        if (i == n) {
            buttons[n].style.backgroundColor = 'white'
            buttons[n].style.border = '1px solid black'
            buttons[n].style.color = '#9f9f9f' 
        } 
        else {
            buttons[i].style.backgroundColor = '#9f9f9f'
            buttons[i].style.border = '1px solid #9f9f9f'
            buttons[i].style.color = 'white'     
        } 
    }
}


const infoClick = (n) => {
    for (let i=0; i<qnaInfos.length; i++) {
        if (i == n) {
            qnaInfos[n].style.height = '200px'
        }
        else {
            qnaInfos[i].style.height = ''
        }
    }
}