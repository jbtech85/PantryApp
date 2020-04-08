const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

const server = http.createServer((req,res) => {
    // Buil file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Get extension of the file
    let extName = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check the extension and set content type
    switch(extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png': 
            contentType = 'image/png';
            break;
        case '.jgp':
            contentType = 'image/jpg';
            break;
    }

    // Read the file !
    fs.readFile(filePath,(err,content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content) => {
                    res.writeHead(200, { 'Content-Type':'text/html' });
                    res.end(content,'utf8');
                });
            } else {
                // Server error of some sort
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`); // <<< do more to this later
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type':'text/html' });
            res.end(content,'utf8');
        }
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT,() => console.log(`Server running on port ${PORT}`));