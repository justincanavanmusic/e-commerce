const router = require('express').Router();
const { Category, Product } = require('../../models');

//imports these Classes from the /models folder. We de-structured so we are able to access each model individually and assign them to a variable.

router.get('/', (req, res) => {
// get all Categories from the seeds once they are implemented. with the include, we are also including the associated Product object(s).
//once we have all of the information, it's stored in allCategoryData and then displayed as a json object on the browser
  Category.findAll(
    {
    include: [{ model: Product }]
  }
  ).then((allCategoryData) => {
    // console.log(allCategoryData);
    res.json(allCategoryData);
  });
});

// allows us to access one Category by searching for the associated id number, using the :id parameter and the findOne method
//the where statement tells us that if the id in the endpoint matches an id in the database to display that matching Product in the response as a json object

router.get('/:id', (req, res) => {
  Category.findOne(
    {
      where: { 
        id: req.params.id 
      },
      include: [{model: Product }]
    }
  ).then((categoryDataId) => {
    res.json(categoryDataId);
  });

});
// this post request gives the criteria to make a new Category object. if the correct criteria is given, create a new Category object and send a json object with the new Category as a response

router.post('/', async (req, res) => {
  // c
  try {
    const categoryData = await Category.create({
      category_name : req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


//this PUT request allows us to update a Category based on the id given in the parameter. if the parameter given in the endpoint matches an id in the database it will allow you to edit the information in that specific Category. if there is not a match for the :id parameter typed into the endpoint, it will send a 404 response w/ a message. if there is a match it will send a 200 response with a json object containing your newly updated Category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(categoryData)
    if (!categoryData[0]) { 
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//find a Category by its id.. if it the id number in the parameter matches something in the database, .destroy will delete that object and its associated information. 
// if the given id does not exist (!categoryData), send a 404 message. if there is a match, send a json object containing categoryData in the response. 

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
