'use strict';

var mongoose = require('mongoose');
var choiceSchema = new mongoose.Schema({ 
    text: String,
    votes: Number
});
var Poll = new mongoose.Schema({
    question: { type: String, required: true },
    creator: String,
    choices: [choiceSchema]
});
module.exports = mongoose.model('Poll', Poll);
