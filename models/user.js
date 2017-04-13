var mongoose = require('mongoose')

// creates user schema
var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  // location: {type: [Number], required: true},
  chats: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

// add bcrypt hashing to model (works on a password field)!
userSchema.plugin(require('mongoose-bcrypt'))

// Add a "transformation" to the model's toJson function that
// stops the password field (even in digest format) from being
// returned in any response.
// transformation does not return user's password,
// this function (anytime .toJSON is called) deletes password from returned object
userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password
    return returnedObject
  }
}

// sets variable for model
var User = mongoose.model('User', userSchema)

// exports module
module.exports = User
