const httpHandler = require('./httpHandler.js')

const messages = []; // the storage unit for messages
module.exports.storage = () => (messages);

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  console.log(`Dequeing message: ${messages[0]}`);
  return messages.shift();
};