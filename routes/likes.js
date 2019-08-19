const express = require('express');
const router = express.Router();
const likesController = require('../app/api/controllers/likes');

router.get('/', likesController.find);
router.post('/:itemId', likesController.addLike);
router.delete('/:itemId', likesController.deleteLike);

module.exports = router;