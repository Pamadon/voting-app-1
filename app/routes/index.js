'use strict';
require('dotenv').load();
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.createConnection(process.env.MONGO_URI);
var Poll = require(path + '/app/models/polls.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			
			//console.log(display-name.profile-value);
			res.render(path + '/public/index.jade');
		});

	app.route('/mypolls')
		.get(isLoggedIn, function (req, res) {
			//var db = req.db;
			//var mypolls = db.get('polls');
			
			res.render(path + '/public/mypolls.jade');
		});
		
	app.route('/polls')
		.get(function(req, res) {
		   
		Poll.find(function (err, polls) {
		if (err) return console.error(err);
			console.log(polls);
		}) 
		    
		    
		    
		    
		    res.render(path + '/public/polls.jade');
		})

	app.route('/login')
		.get(function (req, res) {
			res.render(path + '/public/login.jade');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/profile.jade');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
