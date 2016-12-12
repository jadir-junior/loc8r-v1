/* GET home page */
module.exports.about = function(req, res) {
  res.render('generic-text', {
    title: 'About',
    pageHeader: {
      title: 'About'
    },
    contents: [
      "Loc8r was created to help people find places to sit down and get a bit of work done.",
      "Lorem ipsum dolor sit amet"
    ]
  });
};
