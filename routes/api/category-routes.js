const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send('Data not found')
  }
  // be sure to include its associated Products
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  
  try {
    const category = await Category.findByPk(req.params.id);
    res.status(200).json(category); 

  } catch (error) {
    console.log(error);
    res.status(500).send(`Category id ${req.params.id} not found`);
  }
  // be sure to include its associated Products
});

 // create a new category
router.post('/', (req, res) => {
 
  // {
  // category_name: "sports", 
  // }

  Category.create(req.body)
  .then((newCategory) => {
    res.status(200).json(newCategory);
  })
  .catch((err)=>{
    console.log(err);
    res.status(400).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => res.json(updatedCategory))
  .catch((err) => {
    res.status(400).json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {  
  Category.destroy({
    where:{
      id: req.params.id,
    },
  })
  .then((deletedCategory) => {
    res.status(200).json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
