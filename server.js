'use strict';

var express = require('express');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var mongoose = require('mongoose');
require("./app/models/polls");
require("./app/models/users");


var routes = require('./app/routes/index.js');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

//mongoose.connect('mongodb://'+process.env.USER+':'+process.env.PW+'@ds011735.mlab.com:11735/ecommerce');

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//receive encoded body info from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/', routes)

/*app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();

});*/

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});