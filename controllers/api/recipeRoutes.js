const router = require('express').Router();
const { Recipe } = require('../../models');
router.get('/', async(req, res) => {
    try {
      const recipeData = await Recipe.findAll();
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.post('/', async(req, res) => {
   /* req.body
    {
      name:,
      ingredients:,
      description: ,
      pictureurl: ,
      user_id:
  */
    try {
      const recipeData = await Recipe.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;









