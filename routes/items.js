const express = require('express');
const router = express.Router();
const itemsController = require('../app/api/controllers/items');

router.get('/', itemsController.find);

module.exports = router;