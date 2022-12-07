const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RezoUser = require('./models/RezoUser');
const app = express();

dotenv.config();

mongoose.connect(
    `mongodb+srv://${process.env.SECRET_MONGOOSE}.ib5vpwf.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => console.log("Connexion à MongoDB réussie!"))
.catch(() => console.log("Connexion à MongoDB à échoué!"));

RezoUser.watch().on('change', data => console.log(new Date(), data));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/auth/signup', (req, res, next) => {
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
});

app.post('/api/auth/login', (req, res, next) => {
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
});



module.exports = app;