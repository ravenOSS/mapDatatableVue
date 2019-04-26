const express = require('express');
const router = express.Router();

const apiController = require('../api_controllers/apiControllers');

/* POST location data */
router.post('/geoProfile', apiController.geopostCtrlr);

/* GET locations data. Source for populating /location-map */
router.get('/locations', apiController.locationsDataCtrlr);

/* GET locations data. Source for populating /location-map */
router.get('/vueData', apiController.vueDataCtrlr);

module.exports = router;
