const express = require('express');
const { body } = require('express-validator');
const authController = require('./../controllers/auth');

const router = express.Router();

router.post('/register',[
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Veuillez fournir une email valide!")
        .normalizeEmail(),
    body("password").trim().isLength({min:3})
], authController.register);

router.post('/login',[
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Veuillez fournir une email valide!")
        .normalizeEmail(),
    body("password").trim().isLength({min:3})
], authController.login);

module.exports = router;