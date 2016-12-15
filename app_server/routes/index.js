var express = require('express');
var router = express.Router();
var crtlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', crtlLocations.homelist);
router.get('/location/:locationid', crtlLocations.locationInfo);
router.get('/location/review/new', crtlLocations.addReview);

/* Other pages */
router.get('/about', crtlOthers.about);

module.exports = router;
