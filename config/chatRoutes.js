var {chatIndex, createChat, showChat} = require('../controllers/chats_controller.js'),
    {createMessage} = require('../controllers/messages_controller.js'),
    express = require('express'),
    router  = express.Router()

// /api/chats routes:
router.route('/')
  .get(chatIndex)
  .post(createChat)

// /api/chats/:id routes:
router.route('/:id')
  .get(showChat)

router.route('/:id/addMessage')
  .post(createMessage)

module.exports = router
