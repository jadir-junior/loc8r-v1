module.exports.reviewsCreate = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.reviewsReadOne = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.reviewsUpdateOne = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

module.exports.reviewsDeleteOne = (req, res) => {
  sendJsonResponse(res, 200, {"status": "success"});
}

const sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}
