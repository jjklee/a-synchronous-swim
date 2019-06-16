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

  if (req.url === '/background.jpg') {
    console.log('init');
    fs.readFile(module.exports.backgroundImageFile, (err, fileData) => {
      console.log(fileData);
      if (err) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.write(fileData, 'binary');
        
      }
      res.end();
      next();
    });
  } 
  // else if (req.method === 'GET') {
  //   res.writeHead(200, headers);
  //   res.write(messagesQueue.toString())
    // for (var i = 0; i < messageQueue.length; i++) {
    //   messages.dequeue();
    // }
  //   end();
  // } 
  else if (req.method === 'GET') {
    res.writeHead(200, headers);
    var command = messageQueue.dequeue();
    if (command) {
      console.log('Responding with:', command);
      res.write(command)
      res.end();
    }
  }

  
  // let commands = ['up', 'down', 'left', 'right'];
  // let randomCommand = commands[Math.floor(Math.random()*4)];

  next(); // invoke next() at the end of a request to help with testing!
}; 