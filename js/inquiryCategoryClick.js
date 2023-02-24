var link1 = document.getElementById('c5Sub1');
var link2 = document.getElementById('c5Sub2');

var department = document.getElementById('c5SubSub1');
var connect = document.getElementById('c5SubSub2');


link1.addEventListener('click', e=> {
    department.style.display='block';
    connect.style.display='none';
});

link2.addEventListener('click', e=> {
    department.style.display='none';
    connect.style.display='block';
});

header.addEventListener('mouseleave', e=> {
    department.style.display='none';
    connect.style.display='none';
});