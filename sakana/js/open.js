var argv = remote.process.argv;

if(argv.length != 1 && currentFile !="."){
    currentFile = argv[1]
    readFile(currentFile);
    updateValue();
    savedata=getData();
}