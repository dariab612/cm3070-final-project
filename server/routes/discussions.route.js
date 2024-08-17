const router = require('express').Router();
const { Discussion } = require('../db/models');

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

module.exports = router;
