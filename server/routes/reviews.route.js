const route = require('express').Router();
const { Review } = require('../db/models');

route.get('/', (req, res) => {
  Review.findAll()

    .then((reviews) => res.json(reviews))
    .catch((error) => console.log(error));
});

route.post('/', (req, res) => {
  console.log('POST REVIEW')
  Review.create(req.body.obj)
    .then((newReview) => res.status(201).json(newReview))
    .catch((error) => res.status(500).json(error));
});

route.delete('/:id', async (req, res) => {
  const { params } = req;
  const { id } = params;
  try {
    // eslint-disable-next-line no-unused-vars
    await Review.destroy({ where: { id }, raw: true });
    return res.json({ deleted: true, id });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ deleted: false });
  }
});

route.put('/:id', async (req, res) => {
  const { params } = req;
  const { id } = params;
  try {
    // eslint-disable-next-line no-unused-vars
    await Review.update({ isValid: 'true' }, { where: { id }, raw: true });
    return res.json({ changed: true, id });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ changed: false });
  }
});

route.put('/:name', async (req, res) => {
  const { params } = req;
  const { id } = req.body.obj;
  const { name } = params;
  const { text } = req.body.obj;
  try {
    // eslint-disable-next-line no-unused-vars
    const changed = await Review.update({ name, text, isValid: 'true' }, { where: { id }, raw: true });
    return res.json({ changed });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ status: false });
  }
});
module.exports = route;
