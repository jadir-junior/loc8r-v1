const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

module.exports.locationsListByDistance = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.locationsCreate = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.locationsReadOne = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.locationsUpdateOne = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.locationsDeleteOne = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}
