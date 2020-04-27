//tool-bar

const{remote} = require('electron');
const dialog = require('electron').remote.dialog;

const fs = require("fs");

let currentFile = '';

let savedata = '';

let title_name = 'new.txt';//txt name

//right
document.getElementById('close').addEventListener('click',closeWindow);
document.getElementById('minimize').addEventListener('click',minimizeWindow);
document.getElementById('maximize').addEventListener('click',maximizeWindow);

//left
document.getElementById('load').addEventListener('click',fileOpen);
document.getElementById('save').addEventListener('click',saveFile);

function closeWindow(){
    var window = remote.getCurrentWindow()
    if (savedata != getData()){
      dialog.showMessageBox(
        window, 
        {
          title: ' U dont save this file',
          type: 'info',
          buttons: ['save','dont save' ,'Cancel'],
          detail: 'Do you want to save your changes?'
        })
        .then(result => {
          if (result.response === 0) {
              saveFile().then( () =>
                {
                  window.close()
                }
              );
          }else if(result.response === 1){
            window.close()
          }else{
          }
        }
      );
    }else{
      window.close()
    }
}

function minimizeWindow(){
    var window = remote.getCurrentWindow()
    window.minimize()
}

function maximizeWindow(){
    var window = remote.getCurrentWindow()
    window.isMaximized() ? window.unmaximize() : window.maximize()
}

function fileOpen(){

    const options = {
        title: 'Select a text file',
        defaultPath: '.',
        filters: [
            { name: 'Text File', extensions: ['txt', 'md']},
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
    };
    
    dialog.showOpenDialog(options)
    .then(({ filePaths: fileNames , canceled : cancel_bool}) => {
      if (!cancel_bool){
        if (fileNames) {
        currentFile = fileNames[0];
        
        readFile(currentFile);}
      }
      });
}

function readFile(path){
    fs.readFile(path, (error, text) => {
        title_name = get_extension(currentFile);
        if(error!=null){
            alert("error : " + error);
            return;
        }
        let txt = text.toString();
        let txt_list = txt.split(/\n/);
        let load_file ='<p><a id="_0">'+"#"+title_name+'</a></p>';
        for(let i = 0; i<txt_list.length;i++){
            load_file += "<p>"+txt_list[i]+"</p>"
        }
        document.getElementById("input").innerHTML = load_file;

        updateValue()
        savedata=getData();
    });
    
}

function saveFile() {
    if (currentFile === '') {
        saveNewFile();
        return;
    }
    var window = remote.getCurrentWindow();

    dialog.showMessageBox(
      window, 
      {
        title: 'overwrite',
        type: 'info',
        buttons: ['Ok', 'Cancel'],
        detail: 'Do you really want to save it?'
      })
      .then(result => {
        if (result.response === 0) {
            let data = getData2();
            title_name = get_extension(currentFile);
            writeFile(currentFile, data);
            updateValue()
            savedata=getData();
        }
      }
    );

  }

function writeFile(path, data) {
  savedata = data;
  
  
  fs.writeFile(path, data, error => {
    if (error != null) {
      alert("error : " + error);
    }
  });
}

function saveNewFile() {

  var window = remote.getCurrentWindow();
  dialog.showSaveDialog(
    window,
    {
      defaultPath:'new',
      properties: ['openFile'],
      title: 'Create a text file',
      filters: [
        { name: 'Text File', extensions: ['txt', 'md']},
        { name: 'All Files', extensions: ['*'] }
      ]
    })
    .then(({ filePath: fileName }) => {
      if (fileName) {
            let data = getData2();
            currentFile = fileName;
            title_name = get_extension(currentFile);
            writeFile(currentFile, data);
            updateValue()
            savedata=getData();
      }
    });
}

function getData(){
    var text = document.getElementById("input").getElementsByTagName("a")
    var save_text =""
    for(var i=0; i<text.length; i++ ){
        save_text += text[i].innerHTML +  '\n'
    }
    return save_text;
}

function getData2(){
    var text = document.getElementById("input").getElementsByTagName("a")
    var save_text =""
    for(var i=1; i<text.length; i++ ){
        save_text += text[i].innerHTML +  '\n'
    }
    return save_text;
}

function get_extension(path) {
  var basename = path.split(/[\\/]/).pop()
  if (basename === ''){
    return "";        
  }             
  return basename;        
}
