const route = require('express').Router();
const { ViewedVideos } = require('../db/models');

route.post('/', async (req, res) => {
  const { courseContentId, totalSeconds } = req.body.obj;
  if (req.session && req.session.user) {
    const clientNumber = req.session.user.telephone;

    let viewedVideo = await ViewedVideos.findOne({
      where: {
        courseContentId,
        clientNumber
      }
    });

    if (viewedVideo) {
      await ViewedVideos.update(
        { totalSeconds: totalSeconds },
        {
          where: {
            courseContentId,
            clientNumber
          }
        }
      );
      viewedVideo.totalSeconds = totalSeconds;
    } else {
      viewedVideo = await ViewedVideos.create({
        courseContentId,
        totalSeconds: totalSeconds,
        clientNumber
      });
    }
    return res.status(200).json(viewedVideo);
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = route;
