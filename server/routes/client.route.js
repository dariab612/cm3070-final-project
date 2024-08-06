const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Client } = require('../db/models');

router.route('/')
  .post(async (req, res) => {
    const { name, lastname, password, telephone, login } = req.body.obj;
    const checkClient = await Client.findOne({
      where: {
        telephone,
      },
    });

    if (checkClient) {
      return res
        .status(409)
        .json({ clientExist: true, message: 'Such a user is already registered', clientCreated: false });
    } else {
      const hash = await bcrypt.hash(password, 10);
      await Client.create({
        name,
        lastname,
        login,
        password: hash,
        telephone,
        isAdmin: false,
      });
      return res.json({ clientExist: false, message: 'Successful registration', clientCreated: true });
    }
  });
module.exports = router;
