/* GET 'home' page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find a place to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cale or a pint? Let Loc8r help ypu find the place you're looking for.",
    locations: [
      {
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '100m'
      },
      {
        name: 'Cafe Hero',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '200m'
      },
      {
        name: 'Burger Queen',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 2,
        facilities: ['Food', 'Premium wifi'],
        distance: '250m'
      }
    ]
  });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', {
    title: 'Starcups',
    pageHeader: {
      title: 'Starcups'
    },
    location: {
      name: 'Starcups',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '100m'
    },
    openingHours: ["Monday - Friday: 7:00am - 7:00pm", "Saturday: 8:00am - 5:00pm", "Sunday: closed"],
    customerReviews: [
      {
        rating: 5,
        author: "Mick Jagger",
        timestamp: "09 December 2016",
        comment: "What a great place. I can't say enough good things about"
      },
      {
        rating: 3,
        author: "Jim Morrison",
        timestamp: "09 December 2016",
        comment: "It was okay. Coffee wasn't great, but the wifi was fast."
      }
    ],
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
