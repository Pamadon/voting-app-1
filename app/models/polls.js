'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new mongoose.Schema({
    title: { type: String, required: true },
    creator: String,
    choices: [String],
    votes: [Number]
});
module.exports = mongoose.model('Poll', Poll);
