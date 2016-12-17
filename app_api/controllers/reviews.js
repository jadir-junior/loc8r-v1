const mongoose = require('mongoose');
const Loc = mongoose.model('Location');
const User = mongoose.model('User');

module.exports.reviewsCreate = (req, res) => {
  const locationid = req.params.locationid;
  getAuthor(req, res, function(req, res, userName){
    if (locationid) {
      Loc
        .findById(locationid)
        .select('reviews')
        .exec((err, location) => {
          if (err) {
            sendJsonResponse(res, 400, err);
          } else {
            doAddReview(req, res, location, userName);
          }
        });
    } else {
      sendJsonResponse(res, 404, {
        "message": "Not found, location id required"
      });
    }
  });
};

module.exports.reviewsReadOne = (req, res) => {
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec((err, location) => {
        let response, review;
        if(!location) {
          sendJsonResponse(res, 404, {
            "message": "location id not found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        if(location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewid);
          if(!review) {
            sendJsonResponse(res, 404, {
              "message": "review id not found"
            });
          } else {
            response = {
              location: {
                name: location.name,
                id: req.params.locationid
              },
              review: review
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {
            "message": "No reviews found"
          });
        }
      })
  } else {
    sendJsonResponse(res, 404, {
      "message": "Not found, location id and review id are both required"
    });
  }
};

module.exports.reviewsUpdateOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, location id and review id are both required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec((err, location) => {
      let thisReview;
      if (!location) {
        sendJsonResponse(res, 404, {
          "message": "location id not found"
        });
        return;
      } else if (err) {
        sendJsonResponse(res, 400, err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        thisReview = location.reviews.id(req.params.reviewid);
        if (!thisReview) {
          sendJsonResponse(res, 404, {
            "message": "review id not found"
          });
          return;
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save((err, location) => {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
              updateAverageRating(location._id);
              sendJsonResponse(res, 200, thisReview);
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, {
          "message": "No review to update"
        });
      }
    });
};

module.exports.reviewsDeleteOne = (req, res) => {
  if (!req.params.locationid || !req.params.reviewid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, location id and review id are both required"
    });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
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
      if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(req.params.reviewid)) {
          sendJsonResponse(res, 404, {
            "message": "reviewid not found"
          });
        } else {
          location.reviews.id(req.params.reviewid).remove();
          location.save(err => {
            if (err) {
              sendJsonResponse(res, 404, err);
            } else {
              updateAverageRating(location._id);
              sendJsonResponse(res, 204, null);
            }
          });
        }
      } else {
        sendJsonResponse(res, 404, {
          "message": "No review to delete"
        });
      }
    });
};

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}

const doAddReview = (req, res, location, author) => {
  if (!location) {
    sendJsonResponse(res, 404, {
      "message": "location id not found"
    });
  } else {
    location.reviews.push({
      author: author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save((err, location) => {
      let thisReview;
      if (err) {
        sendJsonResponse(res, 400, err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJsonResponse(res, 201, thisReview);
      }
    });
  }
};

const updateAverageRating = (locationid) => {
  Loc
    .findById(locationid)
    .select('rating reviews')
    .exec((err, location) => {
      if(!err) {
        doSetAverageRating(location);
      }
    });
};

const doSetAverageRating = location => {
  let i, reviewCount, ratingAverage, ratingTotal;
  if(location.reviews && location.reviews.length > 0) {
    reviewCount = location.reviews.length;
    ratingTotal = 0;
    for(i = 0; i < reviewCount; i++ ) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

const getAuthor = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User
      .findOne({ email: req.payload.email })
      .exec((err, user) => {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
        callback(req, res, user.name);
      });
  } else {
    sendJsonResponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};
