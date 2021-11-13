const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  try {
     const tags = await Tag.findAll();
     res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).jsson(error);
  }
  // be sure to include its associated Product data
});
// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    let tag = await Tag.findOne({
      where:{
        id: req.params.id,
      }
    });
    res.status(200).json(tag);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  // be sure to include its associated Product data
});
// create a new tag
router.post('/', (req, res) => {
/* req.body should look like this...
    {
      tag_name: "Camping",
      productIds: [1, 2, 3, 4]
    }
  */
//  first create new tag
  Tag.create(req.body)
  .then((newTag) => {
    //then, if there are product ids in the productIds array, create tag_id pairings to populate the ProductTag model
    if(req.body.productIds.length){
      // create new array of objects witn product_id and tag_id pairings, where the product_id is obtained from the productIds array passed in the request body
      let productTagIdArr = req.body.productIds.map((productId) =>{
        return {
          product_id: productId,
          tag_id: newTag.id,
        }
      })
      // populate ProductTag model
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // If no productIds array, then just send the object of the created tag
    res.status(200).json(newTag);
  })
  .then((productTagIds) => res.status(200).json(productTagIds) )
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});
// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  
});
// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  
});

module.exports = router;
