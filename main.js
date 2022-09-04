window.addEventListener('load', function () {
    var pos1=0, pos2=0, pos3=0, pos4=0, x=0, y=0, width=0, height=0;
    var block = document.getElementById("test");
    var resizeaction = document.getElementById("resize");
    // Block Movement
    block.onmouseover = catchmouseover;
    block.onmousedown = catchmousedown;
    block.style.cursor = "move";
    function catchmouseover() {
        block.children[1].textContent = "Move Me";
        block.onmouseleave = function(){
            block.children[1].textContent = "";
            block.onmouseleave = null;
        }
    }

    function catchmousedown(event){
        pos3 = event.pageX;
        pos4 = event.pageY;
        document.onmousemove = mouseHandler;
        document.onmouseup = clear;
    }
    function mouseHandler(event){
        pos1 = pos3 - event.pageX;
        pos2 = pos4 - event.pageY;
        pos3 = event.pageX;
        pos4 = event.pageY;
        block.style.top = (block.offsetTop - pos2) + "px";
        block.style.left = (block.offsetLeft - pos1) + "px";
        //block.style.top = event.pageX - block.offsetTop + "px";
        //block.style.left = event.pageY - block.offsetLeft + "px";
    }
    function clear(event){
        document.onmousemove = null;
        document.onmouseup = null;
    }

    // Block Resize
    resizeaction.onmousedown = resizemousedown;
    resizeaction.onmouseover = resizemouseover;
    function resizemouseover(event) {
        event.stopPropagation();
        block.children[1].textContent = "Resize Me";
        block.onmouseleave = function(){
            block.children[1].textContent = "";
            block.onmouseleave = null;
        }
    }

    function resizemousedown(event) {
        event.stopPropagation();
        x = event.pageX;
        y = event.pageY;
        startwidth = block.offsetWidth;
        startheight = block.offsetHeight;
        document.onmousemove = resizemousemove;
        document.onmouseup = clearresize;
        
    }
    function resizemousemove(event) {
        if (block.offsetWidth > block.offsetHeight) {
            block.children[1].style.fontSize = block.offsetHeight/3 + "px";
        } else {
            block.children[1].style.fontSize = block.offsetWidth/3 + "px";
        }
        
        block.style.height = startheight + event.pageY - y + "px";
        block.style.width = startwidth + event.pageX - x + "px";
    }
    function clearresize() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
})