
function CreateWindow(position = [0,0], options) {
    // Pos = [x,y]
    var top = position[0] + "px", left = position[1] + "px";
    /* Options = 
    [
        0 parent = parent id || required
        1 movable = bool || default true
        2 resizable = bool || default true
        3 text = string || placeholder || optional
    ]
    */

    // Default variables
    options[1] = (typeof options[1] !== 'undefined') ? options[1] : true
    options[2] = (typeof options[2] !== 'undefined') ? options[2] : true
    options[3] = (typeof options[3] !== 'undefined') ? options[3] : ""

    // Variables
    var pos1=0, pos2=0, pos3=0, pos4=0, x=0, y=0;
    // Create window
    var Window = document.createElement("div");
    Window.classList.add("window");
    document.getElementById(options[0]).appendChild(Window);
    Window.style.cursor = "move";
    Window.style.top = top;
    Window.style.left = left;
    var p = document.createElement("p");
    p.classList.add("noselect");
    p.textContent = options[3]
    Window.appendChild(p);
    var resizeaction = document.createElement("div");
    resizeaction.classList.add("resize");
    Window.appendChild(resizeaction);
    // Catch the mouse and redirect it
    if (options[1] != false) {
    Window.onmousedown = function(event){catchmousedown(event, 1)};
    }
    if (options[2] != false) {
    resizeaction.onmousedown = function(event){catchmousedown(event, 2)};
    }
    function catchmousedown(event, status){
        if (status == 1) {
            pos3 = event.pageX;
            pos4 = event.pageY;
            document.onmousemove = function(event){mouseHandler(event, 1)};
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        } else if (status == 2) {
            event.stopPropagation();
            x = event.pageX;
            y = event.pageY;
            startwidth = Window.offsetWidth;
            startheight = Window.offsetHeight;
            document.onmousemove = function(event){mouseHandler(event, 2)};
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };    
        }
    }
    function mouseHandler(event, status){
        if (status == 1) {
            // Window Movement
            pos1 = pos3 - event.pageX;
            pos2 = pos4 - event.pageY;
            pos3 = event.pageX;
            pos4 = event.pageY;
            Window.style.top = (Window.offsetTop - pos2) + "px";
            Window.style.left = (Window.offsetLeft - pos1) + "px";
        } else if (status == 2) {
            // Window Resize
            if (Window.offsetWidth > Window.offsetHeight) {
                p.style.fontSize = Window.offsetHeight/3 + "px";
            } else {
                p.style.fontSize = Window.offsetWidth/3 + "px";
            }
            
            Window.style.height = startheight + event.pageY - y + "px";
            Window.style.width = startwidth + event.pageX - x + "px";
        }
    }
}



window.addEventListener('load', function () {
    CreateWindow([15, 15], ["canvas", true, true])
})