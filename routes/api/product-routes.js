const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//imports these Classes from the /models folder. We de-structured so we are able to access each model individually and assign them to a variable.

// get all Products from the seeds once they are implemented. with the include, we are also including the associated Category and Tag objects.
//once we have all of the information, it's stored in allProductData and then displayed as a json object on the browser
router.get('/', (req, res) => {
 
  Product.findAll(
    {
    include: [
     { model: Category },
     { model: Tag }
    ]
  }
  ).then((allProductData) => {
    // console.log(typeof allProductData)
    res.json(allProductData);
  });
});

// allows us to access one product by searching for the associated id number, using the :id parameter and the findOne method
//the where statement tells us that if the id in the endpoint matches an id in the database to display that matching product in the response as a json object
router.get('/:id', (req, res) => {
  Product.findOne(
    {
      where: { 
        id: req.params.id 
      },
    }
  ).then((productData) => {
    // console.log(typeof productData);
    res.json(productData);
  });
});

// this post request gives the criteria to make a new Product object. if the correct criteria is given, create a new Product object and send a json object with the new Product as a response

router.post('/', async (req, res) => {

  try {
    const productData = await Product.create({
      
      product_name : req.body.product_name,
      price : req.body.price,
      stock : req.body.stock,
      
    });
    console.log(productData)
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//find a Product by its id.. if it the id number in the parameter matches something in the database, .destroy will delete that object and its associated information. 
// if the given id does not exist (!productData), send a 404 message. if there is a match, send a json object containing productData in the response. 
router.delete('/:id', async (req, res) => {

  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
