const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rezoUserSchema = mongoose.Schema({
    email: { type: String },
    identifier: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    ppUrl: { type: String, default: "http://localhost:3000/images/pp.jpeg" },
    pDescription: { type: String }
});

rezoUserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('RezoUser', rezoUserSchema);