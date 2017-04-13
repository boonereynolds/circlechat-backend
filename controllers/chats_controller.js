var Chat = require('../models/chat')
// res.json instead of res.status


// index function to show all chats
function chatIndex(req, res){
  Chat.find({}, function(err, chats){
    if (err) res.status(404).send(err)
    res.status(200).send(chats)
  })
}

// create chat
function createChat(req, res){
  var chat = new Chat(req.body)

  chat.save(function(err, chat){
    if (err) res.status(500).send(err)
    res.status(201).send(chat)
  })
}

// show function to show a single chat with the messages
function showChat(req, res){
  Chat.find({_id: req.params.id}, function(err, chat){
    if (err) res.status(404).send(err)
    res.status(200).send(chat)
  })
}

// exports module
module.exports = {
  chatIndex: chatIndex,
  createChat: createChat,
  showChat: showChat
}
