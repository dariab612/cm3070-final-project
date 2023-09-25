const route = require('express').Router();
const { Review } = require('../db/models');

route.put('/', async (req, res) => {
  const { id } = req.body.obj;
  const { name } = req.body.obj;
  const { text } = req.body.obj;
  try {
    // eslint-disable-next-line no-unused-vars
    const changed = await Review.update({ name, text, isValid: 'true' }, { where: { id }, raw: true });
    const changed1 = await Review.findOne({ where: { id }, raw: true });
    return res.json({ changed1 });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ status: false });
  }
});
module.exports = route;
