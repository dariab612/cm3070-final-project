const router = require('express').Router();
const { Course } = require('../db/models');
const { Category } = require('../db/models');
const { CourseContent } = require('../db/models');
const { Client } = require('../db/models');
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
    const { isCertified } = req.body;
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
        isCertified,
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
  const { isCertified } = req.body;
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
        description,
        isCertified
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
router.route('/:id/number-of-viewers').put( async (req, res) => {
  const { courseId } = req.body.obj;

  let client;
  if (req.session && req.session.user) {
    client = await Client.findOne({
      where: {
        telephone: req.session.user.telephone,
      },
      raw: true
    });
  }

  if (!(client && client.login && client.telephone)) {
    return res.status(404).send('Client not found');
  }
  
  try {
    const course = await Course.findOne({where: {id: courseId}})
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.viewers.includes(client.telephone)) {
      course.viewers.push(client.telephone);
      const newViewersCounter = course.viewersCounter + 1;

      await Course.update({
        viewersCounter: newViewersCounter,
        viewers: course.viewers,
      }, { where: { id: course.id }, raw: true });
    }

    const updatedCourse = await Course.findOne({ where: { id: course.id }, raw: true });
    return res.json({ updatedCourse });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ deleted: false });
  }
})
router.route('/:id/rating-and-review').put( async (req, res) => {
  const { courseId, rating } = req.body.obj;

  let client;
  if (req.session && req.session.user) {
    client = await Client.findOne({
      where: {
        telephone: req.session.user.telephone,
      },
      raw: true
    });
  }

  if (!(client && client.login && client.telephone)) {
    return res.status(404).send('Client not found');
  }

  try {
    const course = await Course.findOne({where: {id: courseId}})
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const currentRatings = Array.isArray(course.ratings) ? {} : course.ratings;
    // Check if the client's telephone is already a key in the ratings
    if (currentRatings.hasOwnProperty(client.telephone)) {
      return res.status(400).json({ message: 'Rating already exists for this client' });
    }

    currentRatings[client.telephone] = Number(rating);

    const newRatingsCounter = course.ratingsCounter + 1;

    // Calculate average rating from course.ratings
    const ratingValues = Object.values(currentRatings);
    const averageRating = ratingValues.length 
      ? ratingValues.reduce((acc, val) => acc + val, 0) / ratingValues.length
      : 0;

    await Course.update({
      ratings: currentRatings,
      ratingsCounter: newRatingsCounter,
      averageRating: averageRating
    }, { where: { id: course.id }, raw: true });

    const updatedCourse = await Course.findOne({ where: { id: course.id }, raw: true });

    return res.json({ updatedCourse });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ deleted: false });
  }
})

module.exports = router;
