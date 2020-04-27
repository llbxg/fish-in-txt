window.addEventListener("keydown", handleKeydown);

let keymemo = 8888 ;

function handleKeydown(event){
    var keyCode = event.keyCode;

    //"ctrl + s" save file
    if (keymemo=='17' & keyCode =='83'){
        saveFile()
    }

    keymemo = keyCode
}