const router = require('express').Router();
const { Client } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    Client.findAll()

    .then((clients) => res.json(clients))
    .catch((error) => console.log(error));
});
module.exports = router;
