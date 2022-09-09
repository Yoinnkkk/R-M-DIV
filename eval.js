// This code runs the executable bar
function execute() {

    var pos = document.getElementById("pos").textContent.split(",").join(":").split(":");
    var opts = document.getElementById("options").textContent.split(",").join(":").split(":");
    var posParam = {}, optionsParam = {};
    for (let i=0; i<pos.length; i+=2) {
        if (pos[i] == "x") posParam.x = parseInt(pos[(i+1)]);
        if (pos[i] == "y") posParam.y = parseInt(pos[(i+1)]);
        
    }
    for (let i=0; i<opts.length; i+=2) {
        if (opts[i].trim() == "parentid") optionsParam.parentid = opts[(i+1)].split("\"")[1];
        if (opts[i].trim() == "movable") optionsParam.movable = (opts[(i+1)] === "true");
        if (opts[i].trim() == "resizable") optionsParam.resizable = (opts[(i+1)] === "true");
        if (opts[i].trim() == "text") optionsParam.text = opts[(i+1)].split("\"")[1];
        if (opts[i].trim() == "dragArea") optionsParam.dragArea = opts[(i+1)].split("\"")[1];
        if (opts[i].trim() == "title") optionsParam.title = opts[(i+1)].split("\"")[1];
        if (opts[i].trim() == "titleColor") optionsParam.titleColor = opts[(i+1)].split("\"")[1];
        console.log(opts[i] + " " + opts[i+1])
    }
    CreateWindow(posParam, optionsParam);
}
