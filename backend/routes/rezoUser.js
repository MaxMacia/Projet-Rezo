const express = require('express');
const router = express.Router();

const rezoUserCtrl = require('../controllers/rezoUser');
const auth = require('../middleware/auth');

router.post('/signup', rezoUserCtrl.signup);
router.post('/login', rezoUserCtrl.login);
router.get('/:id', auth, rezoUserCtrl.getUserbyId)

module.exports = router;