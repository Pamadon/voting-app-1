'use strict';

var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    title: String,
    creator: String,
    choices: [String],
    votes: [Number]
});
mongoose.model('Poll', pollSchema);
