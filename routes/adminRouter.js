const express = require('express');
const { createAdmin } = require('../controllers/adminController');

const { memberDataFilter, memberDataFilterHandler } = require('../middlewares/admins/adminValidators');

const router = express.Router();

router.post('/register', memberDataFilter, memberDataFilterHandler, createAdmin);


module.exports = router;
