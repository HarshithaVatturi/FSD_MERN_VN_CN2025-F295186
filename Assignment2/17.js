/*Write a function downloadFile(filename, callback) that prints 
"Downloading [filename]..." after 2 seconds, then uses a callback to print 
"Download complete!".*/

function downloadFile(filename, callback) {
    setTimeout(() => {
        console.log(`Downloading ${filename}...`);
        callback(); 
    }, 2000);
}

function onComplete() {
    console.log("Download complete!");
}


downloadFile("movie.mp4", onComplete);
