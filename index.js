//const http = require('http');
//const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 5000;

// pure node js
//server.listen(PORT,() => console.log(`Server running on port ${PORT}`));

// using express js
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));