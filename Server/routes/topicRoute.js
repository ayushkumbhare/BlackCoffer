
const express = require('express');
const dashBoardContoller = require('../controller/dashBoardController')
const router = express.Router();

router.get('/', dashBoardContoller.showByTopics);

module.exports = router;
