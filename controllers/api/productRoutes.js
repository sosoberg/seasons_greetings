const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async(req, res) => {
    try {
        const productData = await Product.findAll({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(productData);
      } catch (err) {
        res.status(400).json(err);
      }
});
  
router.get('/:id', withAuth, async(req, res) => {
    try {
        const productData = await Product.findByPk({
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        });
    
        if (!productData) {
          res.status(404).json({ message: 'No project found with this id!' });
          return;
        }
    
        res.status(200).json(productData);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const projectData = await Product.create({
          ...req.body,
          user_id: req.session.user_id,
        });
    
        res.status(200).json(projectData);
      } catch (err) {
        res.status(400).json(err);
      }
    });
  
module.exports = router;