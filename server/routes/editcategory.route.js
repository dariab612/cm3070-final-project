const route = require('express').Router();
const { Category } = require('../db/models');
const path = require('path');

route.put('/', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const { id } = req.body;
  const { name } = req.body;
  const pictureFile = req.files.picture;
  const uploadPath = path.join(__dirname, '../..', 'client', 'public', 'images', pictureFile.name);

  pictureFile.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      // eslint-disable-next-line no-unused-vars
      await Category.update({ name, picture: `/images/${pictureFile.name}` }, { where: { id }, raw: true });
      const changed1 = await Category.findOne({ where: { id }, raw: true });
      return res.json({ changed1 });
    } catch (error) {
      console.error(error);
  
      return res.status(401).json({ status: false });
    }
  })
});
module.exports = route;
