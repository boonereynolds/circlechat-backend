var mongoose = require('mongoose'),
    Message = require('./message')

// creates chat schema
var chatSchema = new mongoose.Schema({
  name: {type: String, required: true},
  // location: {type: [Number], required: true},
  messages: [Message.schema]
})

// creates variable for model
var Chat = mongoose.model('Chat', chatSchema)

// exports module
module.exports = Chat
