'use strict';
require('dotenv').load();
var express = require("express");
var router = express.Router();
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var mongoose = require("mongoose");
var Poll = mongoose.model('Poll');
var passport = require("passport");



	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	router.route('/')
		.get(isLoggedIn, function (req, res) {
			
			//console.log(display-name.profile-value);
			res.render(path + '/public/index.jade');
		});

	router.route('/mypolls')
		.get( function (req, res) {
			
			
			
			var name = 'creator1';
			Poll.where('creator').equals('creator1').exec(function(err, mypolls) {
				if (err) return console.error(err);
					console.log(mypolls);
			})
			
			res.render(path + '/public/mypolls.jade');
		});
		
		
	router.route('/polls')
		.get(function(req, res) {
			
		   
		Poll.find(function (err, polls) {
		if (err) return console.error(err);
			console.log(polls);
		});
		    
		    res.render(path + '/public/polls.jade');
		});
		
		
	router.route('/newpoll')
		.get(isLoggedIn, function(req, res) {
		    res.render(path + '/public/newpoll.jade');
		})
	
	
    	.post(function(req, res){
			console.log(req.body);
        	var poll = new Poll();
        	poll.title = req.body.title;
        	poll.choices = req.body.choices;
        	poll.votes = req.body.votes;
        	poll.creator = req.body.created_by;
        
        	
		     poll.save(function(err, post) {
        	    if (err){
            	    return res.status(500).send(err);
            	}
            	console.log('success');
            	return res.send(post);
        	});
    	});

	router.route('/login')
		.get(function (req, res) {
			res.render(path + '/public/login.jade');
		});

	router.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	router.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.render(path + '/public/profile.jade');
		});

	router.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	router.route('/auth/github')
		.get(passport.authenticate('github'));

	router.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	router.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);

module.exports = router;