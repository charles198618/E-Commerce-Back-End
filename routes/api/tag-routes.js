const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
});

//get one tag
router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tags){
       
      res.status(404).json({ message: "No Tag Found."})
      return;
    }
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err
      )
  }
});

router.post('/', (req, res) => {
  // create a new tag
  
  Tag.create(req.body)
    .then(newTag => {
      res.status(200).json(newTag)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    })
});

router.put('/:id', (req, res) => {
 // update a tag's name by its `id` value
  Tag.update(req.body, {
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
  // delete on tag by its `id` value
  Tag.destroy({
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







