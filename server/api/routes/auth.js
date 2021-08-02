const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const authController = require('../controllers/auth')

router.post('/register', authController.user_register);
router.post('/login', authController.user_login);

module.exports = router