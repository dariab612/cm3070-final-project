const router = require('express').Router();
const { Category } = require('../db/models');
const { Course } = require('../db/models');

router.route('/')
  .get((req, res) => {
    Category.findAll()
      .then((categories) => res.json(categories))
      .catch((error) => console.log(error));
  })
  .post(async (req, res) => {
    const { name } = req.body.obj;
    const { pictureName } = req.body.obj;
  
    await Category.create({
      name, 
      picture: `/images/${pictureName}.jpg`
    })    
    .then((newCategory) => res.status(201).json(newCategory))
    .catch((error) => res.status(500).json(error));
  });
router.route('/:id')
  .get((req, res) => {
    const { params } = req;
    const { id } = params;
    Course.findAll({
      where: {
        categoryId: id,
      },
      raw: true,
    })
      .then((allCourses) => {
        res.json(allCourses);
      })
      .catch((error) => console.log(error));
  })
  .delete(async (req, res) => {
    const { params } = req;
    const { id } = params;

    try {
      // eslint-disable-next-line no-unused-vars
      await Category.destroy({
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
