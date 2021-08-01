const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const accountController = require('../controllers/auth')

router.post('/register', accountController.accounts_register);
router.post('/login', accountController.accounts_login);

module.exports = router