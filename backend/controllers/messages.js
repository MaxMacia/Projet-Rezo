const Message = require('../models/Message');

exports.createMessage = (req, res, next) => {
    delete _id;
    delete userId;
    const message = new Message({
        ...req.body,
        userId: req.auth.userId
    });
    message.save()
    .then(message => {
        res.status(200).json(message._id);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(404).json({ error }));
};

exports.getMessages = (req, res, next) => {
    Message.find()
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(500).json({ error }));
};