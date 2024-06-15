const router = require('express').Router();
const { Category } = require('../db/models');
const { Course } = require('../db/models');
const path = require('path');

router.route('/')
  .get((req, res) => {
    Category.findAll()
      .then((categories) => res.json(categories))
      .catch((error) => console.log(error));
  })
  .post(async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const { name } = req.body;
    const pictureFile = req.files.picture;
    const uploadPath = path.join(__dirname, '../..', 'client', 'public', 'images', pictureFile.name);

    pictureFile.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      try {
        const newCategory = await Category.create({
          name,
          picture: `/images/${pictureFile.name}`
        });
        res.status(201).json(newCategory);
      } catch (error) {
        res.status(500).json(error);
      }
    });
  })
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
