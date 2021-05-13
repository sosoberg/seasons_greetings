const router = require('express').Router();
const { Product } = require('../../models');

router.get('/', async(req, res) => {
    try {
        const productData = await Product.findAll();
        res.status(200).json(productData);
      } catch (err) {
        res.status(400).json(err);
      }
});
  
router.get('/:id', async(req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id);
    
        if (!productData) {
          res.status(404).json({ message: 'No project found with this id!' });
          return;
        }
        res.status(200).json(productData);
      } catch (err) {
        res.status(500).json(err);
      }
});
  
module.exports = router;