var {createUser, updateUser, deleteUser, me} = require('../controllers/users_controller.js'),
    express = require('express'),
    router = express.Router(),
    token = require('./token_auth.js'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override')

// /api/users routes:
router.route('/users')
  .post(createUser)

router.route('/token')
  .post(token.create)

// /api/users/:id routes:
// router.route('/:id')
//   .get(showUser)
//   .patch(updateUser)
//   .delete(deleteUser)

router.route('/me')
  .get(token.authenticate, me)
  .patch(token.authenticate, updateUser)
  .delete(token.authenticate, deleteUser)

// exports module
module.exports = router
