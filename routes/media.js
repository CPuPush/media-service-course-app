const express = require('express');
const router = express.Router();
const mediaController = require('../controller/mediaController');

router.post('/', mediaController.postMedia);
router.get('/', mediaController.getMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
