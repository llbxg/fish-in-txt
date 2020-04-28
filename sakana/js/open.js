var argv = remote.process.argv;

currentFile = argv[1]

if (currentFile !="."){
    readFile(currentFile);
    updateValue();
    savedata=getData();
}