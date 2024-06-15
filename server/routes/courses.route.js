const router = require('express').Router();
const { Course } = require('../db/models');
const { Category } = require('../db/models');

router.route('/')
  .get((req, res) => {
    Course.findAll()
      .then((courses) => res.json(courses))
      .catch((error) => console.log(error));
  })
  .post(async (req, res) => {
    const { name } = req.body.obj;
    const { pictureName } = req.body.obj;
    const { categoryName } = req.body.obj;
    const { description } = req.body.obj;

    const category = await Category.findOne({where: {name: categoryName}})

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Course.create({
      name,
      picture: `/images/${pictureName}.jpg`,
      categoryId: category.id,
      description,
      numberOfVideos: 0,
    })
    .then((newCourse) => res.status(201).json(newCourse))
    .catch((error) => res.status(500).json(error));
  })
router.route('/:id').put( async (req, res) => {
  const { id } = req.body.obj;
  const { name } = req.body.obj;
  const { pictureName } = req.body.obj;
  const { categoryName } = req.body.obj;
  const { description } = req.body.obj;
  try {
    const category = await Category.findOne({where: {name: categoryName}})

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
  
    // eslint-disable-next-line no-unused-vars
    await Course.update({ 
      name, 
      picture: `/images/${pictureName}.jpg`,
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
    // добавь удаление нужных курсов
    return res.json({ deleted: true, id });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ deleted: false });
  }
})
  
module.exports = router;
