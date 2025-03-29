const seekCircle = document.getElementById("seekCircle");
let pos = 0
setInterval(() => {
    seekCircle.style.left=`${pos}%`
    pos+=10
}, 2000);
