const express = require('express');
const router = express.Router();

const rezoUserCtrl = require('../controllers/rezoUser');

router.post('/signup', rezoUserCtrl.signup);
router.post('/login', rezoUserCtrl.login);
router.get('/:id', rezoUserCtrl.getUserbyId)

module.exports = router;