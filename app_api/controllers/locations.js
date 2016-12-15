const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const theDistance = (function() {
  const getMetersFromKms = kms => {
    return parseFloat(kms * 1000);
  };

  const getKmsFromMeters = meters => {
    return parseFloat(meters / 1000);
  };

  return {
    getMetersFromKms: getMetersFromKms,
    getKmsFromMeters: getKmsFromMeters
  };
})();

module.exports.locationsListByDistance = (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    spherical: true,
    maxDistance: theDistance.getMetersFromKms(20),
    num: 10
  };
  if((!lng && lng!==0) || (!lat && lat!==0)) {
    sendJsonResponse(res, 404, {
      "message": "lng and lat query parametes are required"
    });
    return;
  }
  Loc.geoNear(point, geoOptions, (err, results, stats) => {
    let locations = [];
    results.forEach(doc => {
      locations.push({
        distance: theDistance.getKmsFromMeters(doc.dis),
        name: doc.obj.name,
        address: doc.obj.address,
        rating: doc.obj.rating,
        facilities: doc.obj.facilities,
        _id: doc.obj._id
      });
    });
    sendJsonResponse(res, 200, locations);
  });
}

module.exports.locationsCreate = (req, res) => {
  Loc.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.split(", "),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [
      {
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },
      {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }
    ]
  }, (err, location) => {
    if(err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 200, location);
    }
  });
};

module.exports.locationsReadOne = (req, res) => {
  if(req.params && req.params.locationid) {
    Loc
    .findById(req.params.locationid)
    .exec((err, location) => {
      if(!location) {
        sendJsonResponse(res, 404, {
          "message": "location id not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, location);
    });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No location id in request"
    });
  }
};

module.exports.locationsUpdateOne = (req, res) => {
  if (!req.params.locationid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, location id is required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('-reviews -rating')
    .exec((err, location) => {
      if (!location) {
        sendJsonResponse(res, 404, {
          "message": "location id not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      location.name = req.body.name;
      location.address = req.body.address;
      location.facilities = req.body.facilities.split(", ");
      location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
      location.openingTimes = [
        {
          days: req.body.days1,
          opening: req.body.opening1,
          closing: req.body.closing1,
          closed: req.body.closed1,
        },
        {
          days: req.body.days2,
          opening: req.body.opening2,
          closing: req.body.closing2,
          closed: req.body.closed2,
        },
      ];
      location.save((err, location) => {
        if (err) {
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, location);
        }
      });
    });
};

module.exports.locationsDeleteOne = (req, res) => {
  const locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findByIdAndRemove((locationid) => {
        if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        sendJsonResponse(res, 204, null);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "No location id"
    });
  }
};

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}
