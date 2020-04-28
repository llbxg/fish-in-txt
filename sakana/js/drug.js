document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      currentFile = f.path
      title_name = get_extension(currentFile)
      readFile(currentFile)
    }
  });
  
document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

