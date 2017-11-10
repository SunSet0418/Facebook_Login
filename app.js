var express = require('express')
var bodyParser = require('body-parser')
var passport = require('passport')
var AppFacebookStrategy = require('passport-facebook-token')
var WebFacebookStrategy = require('passport-facebook')
var PORT = process.env.PORT || 3000
var logger = require('morgan')
var app = express()

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(logger('dev'))

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, (err)=>{
    if(err){
        console.log('Server Error')
    }
    else {
        console.log('Server Running At '+PORT+' Port!')
    }
})

require('./routes/AppFacebook')(app, passport, AppFacebookStrategy)
require('./routes/WebFacebook')(app, passport, WebFacebookStrategy)
