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

// NEED TO WRITE CONDITION TO FILTER BETWEEN IMAGE OR MESSAGE COMMAND
module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'POST') {
    // fs.readFile('', function(err, contents) {
    //   // console.log('file name', req.data.name)
    //   console.log('contents',contents);
      res.writeHead(200, headers);

      req.on('data', (chunk) => {
        console.log(chunk);
      })
      res.end();
    // });
    
  }
  
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    // res.write(messageQueue);
    res.end(messageQueue.toString());
    for(var i = 0; i < messageQueue.length; i++) {
      messages.dequeue();
    }
  }
  // let commands = ['up', 'down', 'left', 'right'];
  // let randomCommand = commands[Math.floor(Math.random()*4)];

  next(); // invoke next() at the end of a request to help with testing!
}; 