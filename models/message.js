var mongoose = require('mongoose')

// creates message schema
var messageSchema = new mongoose.Schema({
  body: {type: String, required: true},
  // location: {type: [Number], required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

// creates variable for model
var Message = mongoose.model('Message', messageSchema)

// exports module
module.exports = Message
