var payPopUp;
function openPayPopUp() {
   let target = document.getElementById("emailID");
   payPopUp = window.open(`/payPage?id=${target.getAttribute('value')}`, '_blank', 'menubar=0, toolbar=0, scrollbars=0, width=550px,height=700px');

}

function closePayPopUp() {
   payPopUp = window.close();
}