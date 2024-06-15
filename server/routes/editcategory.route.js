const route = require('express').Router();
const { Category } = require('../db/models');

route.put('/', async (req, res) => {
  const { id } = req.body.obj;
  const { name } = req.body.obj;
  const { picture } = req.body.obj;
  try {
    // eslint-disable-next-line no-unused-vars
    await Category.update({ name, picture: `/images/${picture}.jpg` }, { where: { id }, raw: true });
    const changed1 = await Category.findOne({ where: { id }, raw: true });
    return res.json({ changed1 });
  } catch (error) {
    console.error(error);

    return res.status(401).json({ status: false });
  }
});
module.exports = route;
