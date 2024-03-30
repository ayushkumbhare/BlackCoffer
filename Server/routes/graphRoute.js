
const express = require('express');
const graphController = require('../controller/graphController')
const router = express.Router();

router.get('/endyears', graphController.getEndYearGraphData);
router.get('/startyears', graphController.getStartYearGraphData);
router.get('/countries', graphController.getCountryGraphData);
router.get('/regions', graphController.getRegionGraphData);
router.get('/sectors', graphController.getSectorGraphData);
router.get('/topics', graphController.getTopicGraphData);
router.get('/pestles', graphController.getPestleGraphData);

module.exports = router;
