
function CreateWindow(position = {x:0,y:0}, options) {
    // Pos = {x,y}
    var top = position.x + "px", left = position.y + "px";
    console.log(options)
    /* Options = 
    {
        0 parentid = parent id || default body
        1 movable = bool || default true
        2 resizable = bool || default true
        3 text = string || default ""
        4 dragArea = option || full or title || default full
        5 title = string || default ""
        6 titleColor = hex || default #AEC6CF
    }
    */

    // Default variables
    options.movable = (typeof options.movable !== 'undefined') ? options.movable : true
    options.resizable = (typeof options.resizable !== 'undefined') ? options.resizable : true
    options.text = (typeof options.text !== 'undefined') ? options.text : ""
    options.dragArea = (typeof options.dragArea !== 'undefined') ? options.dragArea : "full"
    options.title = (typeof options.title !== 'undefined') ? options.title : ""
    console.log(options)
    // Variables
    var pos1=0, pos2=0, pos3=0, pos4=0, x=0, y=0;

    // Create window
    var Window = document.createElement("div");
    Window.classList.add("window");
    (typeof options.parentid !== 'undefined') ? document.getElementById(options.parentid).appendChild(Window) : document.body.appendChild(Window)
    Window.style.top = top;
    Window.style.left = left;

    // Make the title bar
    var title = document.createElement("div");
    Window.appendChild(title);
    title.classList.add("title");
    title.style.width = Window.offsetWidth+"px";
    title.style.height = Window.offsetHeight / 16 +"px";
    

    // Assign the title bar paragraph text node
    var titleText = document.createElement("p");
    titleText.classList.add("noselect");
    titleText.textContent = options.title;
    titleText.style.fontSize = Window.offsetHeight/20 + "px";
    title.appendChild(titleText);

    // Assign body paragraph text node
    var bodyText = document.createElement("p");
    bodyText.classList.add("noselect");
    bodyText.id = "bodyID";
    bodyText.textContent = options.text;
    Window.appendChild(bodyText);

    // Create resize action in corner#
    if (options.resizable != false) {
    var resizeaction = document.createElement("div");
    resizeaction.classList.add("resize");
    Window.appendChild(resizeaction);
    }

    // Event functions
    if (options.dragArea !== "title") 
    {
        dragTriggerArea = Window
        Window.style.cursor = "move"
    } else {
        dragTriggerArea = title
        title.style.cursor = "move"
    }

    // Catch the mouse and redirect it
    if (options.movable != false) {
    dragTriggerArea.onmousedown = function(event){catchmousedown(event, 1)};
    }
    if (options.resizable != false) {
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
                bodyText.style.fontSize = Window.offsetHeight/3 + "px";
                titleText.style.fontSize = Window.offsetHeight/20 + "px";
            } else {
                bodyText.style.fontSize = Window.offsetWidth/3 + "px";
            }
            Window.style.height = startheight + event.pageY - y + "px";
            Window.style.width = startwidth + event.pageX - x + "px";
            title.style.width = Window.offsetWidth+"px";
            title.style.height = Window.offsetHeight / 16 +"px";
        }
    }
}


// Testing window creator
window.addEventListener('load', function () {
    CreateWindow({x:200,y:550}, {parentid:"canvas",resizable:true,movable:true, title:"Window", dragArea:"title"})
})