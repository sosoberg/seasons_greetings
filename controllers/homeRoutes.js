const router = require('express').Router();
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth');
const { Product } = require('../models');
// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });
    const users = userData.map((user) => user.get({ plain: true }));
    const productData = await Product.findAll({
      order: [['name', 'ASC']],
    });
    const products = productData.map((product) => product.get({ plain: true }));
    res.render('homepage', {
      users,
      products,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});
router.get('/profile', withAuth, async (req, res) => {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
      include: [{ model: Recipe, attributes: ['id', 'name', 'ingredients', 'description', 'pictureurl','user_id'] }],
    });
    let user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      ...user.recipes,
      logged_in: true
    });
});
// renders the community page to authorized clients and sends user data
router.get('/community', withAuth, async (req, res) => {
  const userData = await User.findAll({
    attributes: { exclude: ['password'] },
    order: [['name', 'ASC']],
  });
  const users = userData.map((project) => project.get({ plain: true }));
  res.render('community', {
    users,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    userName : req.session.username
  });
});
module.exports = router;