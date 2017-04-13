var User = require('../models/user')

// creates User copied from markdown
function createUser(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send('Missing required fields')
  }
  User
    .create(req.body)
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully created user.',
        data: {
          email: user.email,
          id:    user._id
        }
      })
    }).catch(function(err) {
      if (err.message.match(/E11000/)) {
        err.status = 409
      } else {
        err.status = 422
      }
      next(err)
    })
}

// copied from markdown
// api/me
function me(req, res, next) {
  User
    .findOne({email: req.decoded.email}).exec()
    .then(function(user) {
      res.json({
        success: true,
        message: 'Successfully retrieved user data.',
        data: user
      })
    })
    .catch(function(err) {
      next(err)
    })
}

// shows a single User
// function showUser(req, res){
//   User.find({_id: req.params.id}, function(err, user){
//     if (err) res.status(404).send(err)
//     res.status(200).send(user)
//   })
// }

// update a User
function updateUser(req, res){
  User.findOne({_id: req.decoded._id}).exec()
  .then(function(user, err){
    if (err) res.status(404).send(err)
    console.log('got user info...')
    if(req.body.username) user.username = req.body.username
    if(req.body.email) user.email = req.body.email
    if(req.body.password) user.password = req.body.password
    // if(req.body.location) user.location = req.body.location
    // if(req.body.chats) user.chats = req.body.chats
    console.log('about to save...')
    user.save(function(err, user){
      if (err) res.status(500).send(err)
      res.status(200).send(user)
    })
  })
}

// delete a User
function deleteUser(req, res){
  User.remove({_id: req.decoded._id}, function(err){
    if (err) res.status(500).send(err)
    res.status(200).send({message: "User successfully deleted!"})
  })
}




// exports module
module.exports = {
  createUser: createUser,
  // showUser: showUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  me: me
}
