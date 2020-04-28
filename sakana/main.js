const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900, 
        height: 600, 
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

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    console.log(path)
    console.log(app.getPath('exe'))

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