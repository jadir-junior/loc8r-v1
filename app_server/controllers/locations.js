const request = require('request');
const apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://loc8r-v1.herokuapp.com/"
}

const renderHomepage = (req, res, responseBody) => {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find a place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cale or a pint? Let Loc8r help ypu find the place you're looking for.",
    locations: responseBody
  });
}

/* GET 'home' page */
module.exports.homelist = function(req, res) {
  const path = '/api/locations';
  const requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {
      lng:-46.9118265,
      lat:-23.1652508,
      maxDistance: 20
    }
  };
  request(requestOptions, (err, response, body) => {
    renderHomepage(req, res, body);
  })
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', {
    title: 'Starcups',
    location: {
      name: 'Starcups',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      coords: {lat: 51.455041, lng: -0.9690884},
      openingTimes: [
        {
          days: 'Monday - Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
        },
        {
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
        },
        {
          days: 'Sunday',
          closed: true
        }
      ],
      reviews: [
        {
          rating: 5,
          author: "Mick Jagger",
          timestamp: "09 December 2016",
          reviewText: "What a great place. I can't say enough good things about"
        },
        {
          rating: 3,
          author: "Jim Morrison",
          timestamp: "09 December 2016",
          reviewText: "It was okay. Coffee wasn't great, but the wifi was fast."
        }
      ]
    },
    sidebar: [
      "Simon's cafe is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
      "If you've been and you like it - or if you don't - please leave a review to help other people just like you"
    ]
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  res.render('location-review-form', { title: 'Add review' });
};
