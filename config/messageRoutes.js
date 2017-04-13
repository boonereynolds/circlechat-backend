var {createMessage} = require('../controllers/messages_controller.js'),
    express = require('express'),
    router  = express.Router()

// /api/messages routes:
router.route('/')
  .post(createMessage)

module.exports = router
