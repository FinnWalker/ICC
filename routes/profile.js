const express = require('express');
const router = express.Router();
const profileController = require('../app/api/controllers/profile');

router.get('/', profileController.getProfile);

module.exports = router;