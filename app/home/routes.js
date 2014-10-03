function index (req, res) {
  res.render('home/index');
}

function init (router) {
  router.get('/', index);
}

module.exports = init;
