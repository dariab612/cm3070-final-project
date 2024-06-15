const router = require('express').Router();
const { CourseContent } = require('../db/models');
const { Course } = require('../db/models');

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
  })
.put( async (req, res) => {
  const { id } = req.body.obj;
  const { title } = req.body.obj;
  const { link } = req.body.obj;
  const { courseName } = req.body.obj;

  try {
    const course = await Course.findOne({where: {name: courseName}})

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
  
    // eslint-disable-next-line no-unused-vars
    await CourseContent.update({ 
      title, 
      courseId: course.id,
      link
    }, { where: { id }, raw: true });
    const changed1 = await CourseContent.findOne({ where: { id }, raw: true });
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
    await CourseContent.destroy({
      where: {
        id,
      },
      raw: true,
    })

    return res.json({ deleted: true, id });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ deleted: false });
  }
})
router.route('/')
.get((req, res) => {
  CourseContent.findAll({
    raw: true,
  })
    .then((allCourseContent) => {
      res.json(allCourseContent);
    })
    .catch((error) => console.log(error));
})
.post(async (req, res) => {
  const { title } = req.body.obj;
  const { link } = req.body.obj;
  const { courseName } = req.body.obj;

  const course = await Course.findOne({where: {name: courseName}})

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  await CourseContent.create({
    title,
    link,
    courseId: course.id,
  })
  .then((newCourseContent) => res.status(201).json(newCourseContent))
  .catch((error) => res.status(500).json(error));
})

module.exports = router;
