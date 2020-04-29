var argv = remote.process.argv;

if(argv.length >= 2){
    currentFile = argv[1]
    if(currentFile !="."){
        readFile(currentFile);
    updateValue();
    savedata=getData();
    }
}