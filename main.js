document.onmousemove = mouseHandler;
function mouseHandler(event){
    var block;
    block = document.getElementById("test");
    block.style.top = event.pageY + "px";
    block.style.left = event.pageX + "px";
}

