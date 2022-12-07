const Message = require('../models/Message');

exports.createMessage = (req, res, next) => {
    delete _id;
    delete userId;
    const message = new Message({
        ...req.body,
        userId: req.auth.userId
    });
    message.save()
    .then(() => {
        res.status(200).json("message envoyé")
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getMessages = (req, res, next) => {
    Message.find()
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(500).json({ error }));
};