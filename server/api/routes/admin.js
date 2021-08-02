const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const adminController = require('../controllers/admin')

router.get("/users", adminController.get_all_users);

module.exports = router