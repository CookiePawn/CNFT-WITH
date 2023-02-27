window.addEventListener('load', e=> {
    function Mobile(){
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);}
        
        if (Mobile()){// 모바일일 경우
            location.href='/adaInfo';
        } else {// 모바일 외 
    }
    console.log(Mobile());
});

