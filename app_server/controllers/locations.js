const request = require('request');
const apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://loc8r-v1.herokuapp.com/"
}

const _showError = (req, res, status) => {
  let title, content;
  if (status === 404) {
    title = "404, page not foung";
    content = "Oh dear, Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
};

const _formatDistance = distance => {
  let numDistance, unit;
  if (distance > 1) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = ' km';
  } else {
    numDistance = parseInt(distance * 1000,10);
    unit = ' m';
  }
  return numDistance + unit;
}

const renderHomepage = (req, res, responseBody) => {
  let message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby"
    }
  }
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find a place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cale or a pint? Let Loc8r help ypu find the place you're looking for.",
    // comment location and message for angular tests
    // locations: responseBody,
    // message: message
  });
}

const renderDetailPage = (req, res, locDetail) => {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {title: locDetail.name},
    location: locDetail,
    sidebar: [
      "Simon's cafe is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
      "If you've been and you like it - or if you don't - please leave a review to help other people just like you"
    ]
  });
}

const renderReviewForm = (req, res, locDetail) => {
  res.render('location-review-form', {
    title: 'Review ' + locDetail.name + ' on Loc8r',
    pageHeader: { title: 'Review ' + locDetail.name },
    error: req.query.err,
    url: req.originalUrl
  });
}

const getLocationInfo = (req, res, callback) => {
  const path = "/api/locations/" + req.params.locationid;
  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {}
  };
  request(requestOptions, (err, response, body) => {
    let data = body;
    if (response.statusCode === 200) {
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1]
      };
      callback(req, res, data);
    } else {
      _showError(req, res, response.statusCode);
    }
  })
}
/* GET 'home' page */
module.exports.homelist = function(req, res) {
  // const path = '/api/locations';
  // const requestOptions = {
  //   url: apiOptions.server + path,
  //   method: "GET",
  //   json: {},
  //   qs: {
  //     lng:-46.9118265,
  //     lat:-23.1652508,
  //     maxDistance: 20
  //   }
  // };
  // request(requestOptions, (err, response, body) => {
  //   let data = body;
  //   if (response.statusCode === 200 && data.length) {
  //     for( let i = 0; i < data.length; i++ ) {
  //       data[i].distance = _formatDistance(data[i].distance);
  //     }
  //   }
  //   renderHomepage(req, res, data);
  // })

  // comment code above for angular tests
  renderHomepage(req, res);
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  getLocationInfo(req, res, (req, res, responseData) => {
    renderDetailPage(req, res, responseData);
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  getLocationInfo(req, res, (req, res, responseData) => {
    renderReviewForm(req, res, responseData);
  });
};

/* POST 'Add review' page */
module.exports.doAddReview = function(req, res) {
  const locationid = req.params.locationid;
  const path = "/api/locations/" + locationid + "/reviews";
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  const requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(requestOptions, (err, response, body) => {
      if (response.statusCode === 201) {
        res.redirect('/location/' + locationid);
      } else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
        res.redirect('/location/' + locationid + '/reviews/new?err=val');
      } else {
        _showError(req, res, response.statusCode);
      }
    });
  }
};
