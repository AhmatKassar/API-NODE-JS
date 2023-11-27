const express = require('express');
const userController = require('../controllers/user');
const checkIsConnected = require('./../middleware/is-connected');

const router = express.Router();

router.get('/users', checkIsConnected, userController.getUsers);

module.exports = router;