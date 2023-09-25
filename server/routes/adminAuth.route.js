const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Client } = require('../db/models');

router.route('/')
  .post(async (req, res) => {
    const { login, password } = req.body;
    const findAdmin = await Client.findOne({
      where: {
        login,
      },
    });

    if (findAdmin) {
      const isCorrectPassword = await bcrypt.compare(password, findAdmin.password);
      if (isCorrectPassword) {
        req.session.user = {
          id: findAdmin.id,
          login: findAdmin.login,
          telephone: findAdmin.telephone,
          signedUp: true,
          isAdmin: true,
        };
        return res.json({
          authClient: true,
          isAdmin: true,
        });
      } else {
        return res.json({
          answer: true,
          checked: true,
          checkAdmin: true,
          checkPass: false,
          message: 'Incorrect password',
        });
      }
    }

    return res.json({
      answer: true,
      checked: true,
      checkAdmin: false,
      checkPass: false,
      message: 'Incorrect user',
    });
  });

module.exports = router;


module.exports = router;
