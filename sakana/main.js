const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const fs = require("fs");

let mainWindow;

var config_path = app.getPath('userData')+'/config.json';
if (check(config_path)){
    var config_data = fs.readFileSync(config_path, 'utf8');
    config_data = JSON.parse(config_data);
    var ws_w = config_data.window_size.width;
    var ws_h = config_data.window_size.height;
}else{
    var ws_w = 900;
    var ws_h = 600;
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: ws_w, 
        height: ws_h, 
        "frame": false, 
        "backgroundColor": "#222",
        webPreferences: {
            nodeIntegration: true
          },
        'icon': 'build/icon.ico',
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    //mainWindow.webContents.openDevTools();
    
    Menu.setApplicationMenu(null);

    mainWindow.on('close', () =>{
        let content =new String();
        let w = mainWindow.webContents.getOwnerBrowserWindow().getBounds().width;
        let h = mainWindow.webContents.getOwnerBrowserWindow().getBounds().height;

        if(check(config_path)){
            content = fs.readFileSync(config_path);
            content = JSON.parse(content);
            content.window_size.width = w;
            content.window_size.height = h;
            writeFile(config_path,JSON.stringify(content,null,'  '));
        }else{
            content = {
                window_size:{
                    "width" : w,
                    "height": h
                },
                font_size:"15px"
            }
            writeFile(config_path,JSON.stringify(content,null,'  '));
        }
    })

    mainWindow.on('closed', () => {
        mainWindow = null;
    });


    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('path', app.getPath('userData'))
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

function check(filePath) {
    let isExist = false;
    try {
        fs.readFileSync(filePath);
        isExist = true;
    } catch(err) {
        isExist = false;
    }
    return isExist;
  }

function writeFile(path, data) {
    fs.writeFile(path, data, function (err) {
      if (err) {
          throw err;
      }
    });
  }