function index (req, res) {
  res.render('home/index');
};

function setup (router, passport) {
  router.get('/', index);
};

module.exports = setup;
