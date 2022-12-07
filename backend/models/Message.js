const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required:true },
    likes: { type: Number, default: 0 },
    usersLiked: [{ type: String, default: [] }]
});

module.exports = mongoose.model('Message', messageSchema);