'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
   nbrClicks: {
      clicks: Number
   }
});
mongoose.model('User', userSchema);
