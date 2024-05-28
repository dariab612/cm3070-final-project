const route = require('express').Router();
const { ViewedVideos } = require('../db/models');

route.post('/', (req, res) => {
  const viewedVideosObj = { ...req.body.obj, clientNumber: req.session.user.telephone}
  ViewedVideos.create(viewedVideosObj)
    .then((newViewedVideo) => res.status(201).json(newViewedVideo))
    .catch((error) => res.status(500).json(error));
});

route.get('/', async (req, res) => {
  const { courseContentId } = req.query;

  const viewedVideos = await ViewedVideos.findAll({ where: { courseContentId, clientNumber: req.session.user.telephone } })
  return res.status(200).json(viewedVideos);
});
module.exports = route;
