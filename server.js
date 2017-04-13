var express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    userRoutes = require('./config/userRoutes.js'),
    chatRoutes = require('./config/chatRoutes.js'),
    messageRoutes = require('./config/messageRoutes.js'),
    port = process.env.PORT || 3000

// Use a .env file to hide sensitive environment variables.
require('dotenv').config()

//establish connection to mongo database
// mongoose.connect('mongodb://localhost:27017/circlechat')
var db = process.env.MONGODB_URI || 'mongodb://localhost:27017/circlechat'

//log requests made to the app
app.use(logger('dev'))

//make json objects available in requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// mount circleRoutes at /api/circlechat
app.use('/', function(req, res){
  res.json({message: 'hi fam'})})
app.use('/api/chats', chatRoutes)
app.use('/api', userRoutes)
app.use('/api/messages', messageRoutes)


//run the web server
app.listen(port, function(){
	console.log('Server started on', port)
})

// Validate Content Type
app.use(validateContentType)
app.use(userRoutes)
// Failed Auth Header
app.use(addFailedAuthHeader)

//plumbing that check content type of packets coming into the server, not required but helpful to keep silent errors from happeneing
//dont need to know how to write this, we copy it into our projects
function validateContentType(req, res, next) {
  var methods = ['PUT', 'PATCH', 'POST']
  if (                                    // If the request is
    methods.indexOf(req.method) !== -1 && // one of PUT, PATCH or POST, and
    Object.keys(req.body).length !== 0 && // has a body that is not empty, and
    !req.is('json')                       // does not have an application/json
  ) {                                     // Content-Type header, then …
    var message = 'Content-Type header must be application/json.'
    res.status(400).json(message)
  } else {
    next()
  }
}

// When there is a 401 Unauthorized, the repsonse shall include a header
// WWW-Authenticate that tells the client how they must authenticate
// their requests.
//get response that says you need to sign in if you try to access what you are not supposed to
function addFailedAuthHeader(err, req, res, next) {
  //js object is getting created and saved into variable called header
  var header = {'WWW-Authenticate': 'Bearer'}
  if (err.status === 401) {
    if (err.realm) header['WWW-Authenticate'] += ` realm="${err.realm}"`
    res.set(header)
  }
  next(err)
}
