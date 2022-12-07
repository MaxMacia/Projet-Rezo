const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const RezoUser = require('./models/RezoUser');
const rezoUserRoutes = require('./routes/rezoUser');
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

app.use('/api/auth', rezoUserRoutes);



module.exports = app;