const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');

router.post('/', auth, messageCtrl.createMessage);
router.get('/:id', auth, messageCtrl.getOneMessage);
router.get('/', auth, messageCtrl.getMessages);

module.exports = router;