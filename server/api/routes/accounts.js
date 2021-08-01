const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const accountController = require('../controllers/accounts')

router.get("/", accountController.account_get_all);
router.delete('/:accountId', accountController.accounts_delete_one);

module.exports = router