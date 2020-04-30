const ipc = require('electron').ipcRenderer;

ipc.on('path', (event, message) => {
    let config_path = message + '/config.json';
    let theme_path = message + '/theme.json';

    if(check(config_path)){
        let config_data = fs.readFileSync(config_path, 'utf8');
        config_data = JSON.parse(config_data);
        let font_size = config_data.font_size;

        document.documentElement.style.setProperty('--fsz', font_size);
    }

    if(check(theme_path)){ 
        let theme_data = fs.readFileSync(theme_path, 'utf8');
        theme_data = JSON.parse(theme_data);
        let main_c = theme_data.main;
        let sub_c  = theme_data.sub;
        let text_c = theme_data.text;

        document.documentElement.style.setProperty('--bgc',  main_c);
        document.documentElement.style.setProperty('--sttc', sub_c );
        document.documentElement.style.setProperty('--ttc',  text_c);
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