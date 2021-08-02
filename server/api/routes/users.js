const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userController = require('../controllers/users')

router.get("/", userController.users_get_all);
router.delete('/:userId', userController.users_delete_one);

module.exports = router