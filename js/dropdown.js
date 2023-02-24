var header = document.querySelector('.mainHeader');
var dimmed = document.querySelector('.dimmed');
var scrollBar = document.querySelector('progress-container');

var li1 = document.querySelector('.li.c1 > span');
var li2 = document.querySelector('.li.c2 > span');
var li3 = document.querySelector('.li.c3 > span');
var li4 = document.querySelector('.li.c4 > span');
var li5 = document.querySelector('.li.c5 > span');
var li6 = document.querySelector('.li.c6 > span');

var sub1 = document.querySelector('.c1Sub');
var sub2 = document.querySelector('.c2Sub');
var sub3 = document.querySelector('.c3Sub');
var sub4 = document.querySelector('.c4Sub');
var sub5 = document.querySelector('.c5Sub');
var sub6 = document.querySelector('.c6Sub');


function dropdownOpen() {
    header.style.height = "400px";
    dimmed.style.display = "flex";
}

function dropdownClose() {
    header.style.height = "100px";
    dimmed.style.display = "none";
}

function lineClose() {
    li1.style.boxShadow = "none";
    li2.style.boxShadow = "none";
    li3.style.boxShadow = "none";
    li4.style.boxShadow = "none";
    li5.style.boxShadow = "none";
    li6.style.boxShadow = "none";
}

function subListClose() {
    sub1.style.display = "none";
    sub2.style.display = "none";
    sub3.style.display = "none";
    sub4.style.display = "none";
    sub5.style.display = "none";
    sub6.style.display = "none";
}







li1.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    li1.style.boxShadow = "inset 0 -8px 0 lightblue";
    sub1.style.display = "table";
    dropdownOpen();
});

li2.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    li2.style.boxShadow = "inset 0 -8px 0 lightblue";
    sub2.style.display = "table";
    dropdownOpen();
});

li3.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    li3.style.boxShadow = "inset 0 -8px 0 lightblue";
    sub3.style.display = "table";
    dropdownOpen();
});

li4.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    li4.style.boxShadow = "inset 0 -8px 0 lightblue";
    sub4.style.display = "table";
    dropdownOpen();
});

li5.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    li5.style.boxShadow = "inset 0 -8px 0 lightblue";
    sub5.style.display = "table";
    dropdownOpen();
});

li6.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    li6.style.boxShadow = "inset 0 -8px 0 lightblue";
    sub6.style.display = "table";
    dropdownOpen();
});








dimmed.addEventListener('mouseenter', e=> {
    lineClose();
    subListClose();
    dropdownClose();
});