const router = require('express').Router();
const { Course } = require('../db/models');
const { Category } = require('../db/models');
const { CourseContent } = require('../db/models');
const path = require('path');

router.route('/')
  .get((req, res) => {
    Course.findAll()
      .then((courses) => res.json(courses))
      .catch((error) => console.log(error));
  })
  .post(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const { name } = req.body;
    const pictureFile = req.files.picture;
    const { categoryName } = req.body;
    const { description } = req.body;
    const uploadPath = path.join(__dirname, '../..', 'client', 'public', 'images', pictureFile.name);

    pictureFile.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const category = await Category.findOne({ where: {name: categoryName} })

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      await Course.create({
        name,
        picture: `/images/${pictureFile.name}`,
        categoryId: category.id,
        description,
        numberOfVideos: 0,
      })
      .then((newCourse) => res.status(201).json(newCourse))
      .catch((error) => res.status(500).json(error));
    })
  })
router.route('/:id').put( async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const { id } = req.body;
  const { name } = req.body;
  const pictureFile = req.files.picture;
  const { categoryName } = req.body;
  const { description } = req.body;
  const uploadPath = path.join(__dirname, '../..', 'client', 'public', 'images', pictureFile.name);

  pictureFile.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      const category = await Category.findOne({where: {name: categoryName}})
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
    
      // eslint-disable-next-line no-unused-vars
      await Course.update({ 
        name, 
        picture: `/images/${pictureFile.name}`,
        categoryId: category.id,
        description
      }, { where: { id }, raw: true });
      const changed1 = await Course.findOne({ where: { id }, raw: true });
      return res.json({ changed1 });
    } catch (error) {
      console.error(error);
  
      return res.status(401).json({ status: false });
    }
  })
})
.delete( async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    // eslint-disable-next-line no-unused-vars
    await Course.destroy({
      where: {
        id,
      },
      raw: true,
    })

    await CourseContent.destroy({
      where: {
        courseId: id,
      },
      raw: true,
    })
    return res.json({ deleted: true, id });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ deleted: false });
  }
})
  
module.exports = router;
