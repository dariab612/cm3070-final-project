const router = require('express').Router();
const { Discussion } = require('../db/models');
const { Client } = require('../db/models');

router.route('/')
.get(async (req, res) => {
    try {
        const discussions = await Discussion.findAll();
        res.json(discussions);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving discussions.');
    }
});
router.route('/:id/update-answers')
.put(async (req, res) => {
    const { discussionId, answer } = req.body.obj;

    let client;
    if (req.session && req.session.user) {
      client = await Client.findOne({
        where: {
          telephone: req.session.user.telephone,
        },
        raw: true
      });
    }

    if (!(client && client.login && client.telephone)) {
        return res.status(404).send('Client not found');
    }
    
    try {
        const discussion = await Discussion.findOne({ where: { id: discussionId } });

        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
    } catch(error) {
        console.error(error);
        return res.status(401).json({ deleted: false });
    }
});

module.exports = router;
