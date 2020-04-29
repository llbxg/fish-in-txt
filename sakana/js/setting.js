const ipc = require('electron').ipcRenderer;

ipc.on('path', (event, message) => {
    let config_path = message + '/config.json';

    if(check(config_path)){
        var config_data = fs.readFileSync(config_path, 'utf8');
        config_data = JSON.parse(config_data);
        let font_size = config_data.font_size
        document.documentElement.style.setProperty('--fsz', font_size);
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