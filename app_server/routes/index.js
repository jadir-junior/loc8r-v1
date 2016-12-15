var express = require('express');
var router = express.Router();
var crtlLocations = require('../controllers/locations');
var crtlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', crtlOthers.angularApp);
// router.get('/', crtlLocations.homelist);
// router.get('/location/:locationid', crtlLocations.locationInfo);
// router.get('/location/:locationid/reviews/new', crtlLocations.addReview);
// router.post('/location/:locationid/reviews/new', crtlLocations.doAddReview);

/* Other pages */
// router.get('/about', crtlOthers.about);

module.exports = router;
