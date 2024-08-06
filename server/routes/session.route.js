const router = require('express').Router();

router.route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      if (req.session.user.isAdmin) {
        res.json({ authClient: true, isAdmin: true, login: req.session.user.login });
      } else {
        res.json({ authClient: true, isAdmin: false,  login: req.session.user.login});
      }
    } else {
      res.json({ authClient: false });
    }
  });

module.exports = router;
