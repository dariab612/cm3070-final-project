const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Client } = require('../db/models');

router.route('/')
  .post(async (req, res) => {
    const {
      oldPass, newPass, newPass2,
    } = req.body;

    const admin = await Client.findOne({
      where: {
        login: 'Admin',
      },
    });

    const isCorrectPassword = await bcrypt.compare(oldPass, admin.password);
    if (newPass !== newPass2) {
      res.json({
        message: 'The entered passwords do not match',
      });
      return;
    }

    if (isCorrectPassword) {
      const hashPass = await bcrypt.hash(newPass, 8);

      const changePass = await Client.update(
        {
          password: hashPass,
        },
        {
          where: {
            login: 'Admin',
          },
        },
      );
      res.json({
        message: 'Password changed successfully',
      });
    } else {
      res.json({
        message: 'Invalid password',
      });
    }
  });

module.exports = router;

