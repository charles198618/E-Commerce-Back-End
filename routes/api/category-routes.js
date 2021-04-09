const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
  // res.end();
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
 
  try{
    const categories = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!categories){
       
      res.status(404).json({ message: "No Category Found."})
      return;
    }
    res.status(200).json(categories)
  } catch (err) {
    res.status(500).json(err
      )
  }
});

router.post('/', (req, res) => {
  // create a new category
  // we need data that looks like:
  // {
  //   category_name: "some string"
  // }
  Category.create(req.body)
    .then(newCategory => {
      res.status(200).json(newCategory)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updated => {
    res.status(200).json(updated)
  }).catch(err=> {
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deleted => {
    res.status(200).json(deleted)
  }).catch(err => {
    res.status(400).json(err)
  })
});

module.exports = router;
