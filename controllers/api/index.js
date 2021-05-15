const router = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;