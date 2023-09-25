const router = require('express').Router();
const { CourseContent } = require('../db/models');

router.route('/:id')
  .get((req, res) => {
    const { params } = req;
    const { id } = params;
    CourseContent.findAll({
      where: {
        courseId: id,
      },
      raw: true,
    })
      .then((allCourseContent) => {
        res.json(allCourseContent);
      })
      .catch((error) => console.log(error));
  });
module.exports = router;
