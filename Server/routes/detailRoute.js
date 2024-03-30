
const express = require('express');
const detailController = require('../controller/detailController')
const router = express.Router();

router.get('/latest', detailController.latestPublishedData);

module.exports = router;
