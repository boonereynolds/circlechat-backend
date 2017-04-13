// require chat model in this
var Message = require('../models/message'),
    Chat    = require('../models/chat')

// create message
function createMessage(req, res){


  // find the chat by its id
  Chat.findById(req.params.id, function(err, chat){
    if(err) throw err
    // create message using req.body
    var message = new Message(req.body)
    // push message into chat.messages
    chat.messages.push(message)
    // save chat
    chat.save(function (err, chat){
        if (err) res.status(500).send(err)
        res.json(chat)
    })
  })
}

// exports module
module.exports = {
  createMessage: createMessage
}
