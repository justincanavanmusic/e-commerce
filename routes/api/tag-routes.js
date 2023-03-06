const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// get all Tags from the seeds once they are implemented. with the include, we are also including the associated Tag object(s).
//once we have all of the information, it's stored in the allTagData object and then displayed as a json object on the browser

router.get('/', (req, res) => {
  Tag.findAll(
    {
    include: [{ model: Product }]
  }
  ).then((allTagData) => {
    console.log(typeof allTagData)
    res.json(allTagData);
  });
});

// allows us to access one Tag by searching for the associated id number, using the :id parameter and the findOne method
//the where statement tells us that if the id in the endpoint matches an id in the database to display that matching Tag in the response as a json object

router.get('/:id', (req, res) => {
  Tag.findOne(
    {
      where: { 
        id: req.params.id 
      },
      include: 
      [{ model: Product }]
    }
  ).then((tagData) => {
    res.json(tagData);
  });
});
// this post request gives the criteria to make a new Tag object. if the correct criteria is given, create a new Tag object and send a json object with the new Tag as a response

router.post('/', async (req, res) => {
 
  try {
    const tagData = await Tag.create({
      tag_name : req.body.tag_name
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//this PUT request allows us to update a Tag based on the id given in the parameter. if the parameter given in the endpoint matches an id in the database it will allow you to edit the information in that specific Tag. if there is not a match for the :id parameter typed into the endpoint, it will send a 404 response w/ a message. if there is a match it will send a 200 response with a json object containing your newly updated Tag

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
  const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  console.log(tagData) 

  if (!tagData[0]) {
    res.status(404).json({ message: 'No tag with this id!' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

//find a Tag by its id.. if it the id number in the parameter matches something in the database, .destroy will delete that object and its associated information. 
// if the given id does not exist (!tagData), send a 404 message. if there is a match, send a json object containing tagData in the response. 

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
