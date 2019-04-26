const express = require('express');
const router = express.Router();

const ctrlr = require('../controllers/main');
// const apiController = require('../api_controllers/apiControllers');

/* GET home page. */
router.get('/', ctrlr.homepageCtrlr);

/* GET geoProfiler - enter location data */
router.get('/geoProfile', ctrlr.geoprofileCtrlr);

/* GET LocationsBSTable */
router.get('/locationsBSTable', ctrlr.BSTableCtrlr);

/* GET Locations Map. Display leaflet with stored data */
router.get('/branch-map', ctrlr.branchmapCtrlr);

/* POST location data */
router.post('/geoProfile', ctrlr.geoPostCtrlr);


module.exports = router;
