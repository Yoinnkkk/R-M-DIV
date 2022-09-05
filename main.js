


window.addEventListener('load', function () {
    var pos1=0, pos2=0, pos3=0, pos4=0, x=0, y=0, width=0, height=0;
    var block = document.getElementById("test");
    var resizeaction = document.getElementById("resize");
    var p = block.children[1]
    // Block Movement
    block.onmouseover = catchmouseover;
    block.onmousedown = catchmousedown;
    block.style.cursor = "move";
    function catchmouseover() {
        p.textContent = "Move Me";
        p.style.opacity = 1;
        p.animate(FadeIn, Timing);
        if (block.style.backgroundColor == "#77dd77") {
            block.animate(bFadeInRM, Timing);
            block.style.backgroundColor = "#ff6961";
        } else {
            block.animate(bFadeInM, Timing);
            block.style.backgroundColor = "#ff6961";
        }
        block.onmouseleave = function(){
            p.animate(FadeOut, Timing)
            p.style.opacity = 0;
            block.animate(bFadeOutM, Timing);
            block.style.backgroundColor = "#a7a4a4";
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
        p.textContent = "Resize Me";
        p.style.opacity = 1
        block.animate(bFadeInR, Timing);
        if (block.style.backgroundColor == "#ff6961") {
            block.animate(bFadeInMR, Timing);
            block.style.backgroundColor = "#77dd77";
        } else {
            block.animate(bFadeInR, Timing);
            block.style.backgroundColor = "#77dd77";
        }
        block.onmouseleave = function(){
            p.animate(FadeOut, Timing)
            p.style.opacity = 0
            block.animate(bFadeOutR, Timing);
            block.style.backgroundColor = "#a7a4a4";
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
            p.style.fontSize = block.offsetHeight/3 + "px";
        } else {
            p.style.fontSize = block.offsetWidth/3 + "px";
        }
        
        block.style.height = startheight + event.pageY - y + "px";
        block.style.width = startwidth + event.pageX - x + "px";
    }
    function clearresize() {
        document.onmousemove = null;
        document.onmouseup = null;
    }
})