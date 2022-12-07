const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RezoUser = require('../models/RezoUser');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const rezoUser = new RezoUser({
            email: req.body.email,
            identifier: req.body.identifier,
            password: hash
        });
        return rezoUser.save()
        .then(() => {
            const message = "Utilisateur enregistré";
            res.status(201).json({message});
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    RezoUser.findOne({ identifier: req.body.identifier })
    .then(rezoUser => {
        if (rezoUser == null) {
            const error = "Paire identifiant/mot de passe invalide";
            res.status(401).json({ error });
        } else {
            return bcrypt.compare(req.body.password, rezoUser.password)
            .then(valid => {
                if (!valid) {
                    const error = "Paire identifiant/mot de passe invalide";
                    res.status(401).json({ error });                    
                } else {
                    res.status(200).json({
                        userId: rezoUser._id,
                        token: jwt.sign(
                            { userId: rezoUser._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                }
            });
        }
    })
    .catch(error => res.status(500).json({ error }));
};