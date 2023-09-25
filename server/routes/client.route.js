const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Client } = require('../db/models');

router.route('/')
  .post(async (req, res) => {
    const { password, telephone, login } = req.body;
    const checkClient = await Client.findOne({
      where: {
        telephone,
      },
    });


    if (checkClient) {
      res
        .status(409)
        .json({ clientExist: true, message: 'Such a user is already registered' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      await Client.create({
        login,
        password: hash,
        telephone,
        isAdmin: false,
      });

      res.json({ clientExist: false, message: 'Successful registration' });
    }
  });

module.exports = router;
