const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    fs.readFile(module.exports.backgroundImageFile, (err, fileData) => {
      if (err) {
        res.writeHead(404);
      } else {
        res.writeHead(200, {
          'Content-Type': 'image/jepg',
          'Content-Length': fileData.length
        });
        res.write(fileData, 'binary');
      }
      res.end();
      next();
    });
  }
  
  // if (req.method === 'GET') {
  //   res.writeHead(200, headers);
  //   res.end(messageQueue.toString());
  //   for(var i = 0; i < messageQueue.length; i++) {
  //     messages.dequeue();
  //   }
  // }

  if (req.method === 'GET') {
    res.writeHead(200, headers);
    var command = messages.dequeue();
    if (command) {
      console.log('Responding with:', command);
      res.end(command);
    } else {
      res.end();
    }
  }
  // let commands = ['up', 'down', 'left', 'right'];
  // let randomCommand = commands[Math.floor(Math.random()*4)];

  next(); // invoke next() at the end of a request to help with testing!
}; 