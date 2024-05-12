const route = require('express').Router();
const { ViewedVideos } = require('../db/models');

route.post('/', async (req, res) => {
  const { courseContentId, maxProgress } = req.body.obj;
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
        { maxPlayedSeconds: maxProgress },
        {
          where: {
            courseContentId,
            clientNumber
          }
        }
      );
      viewedVideo.maxPlayedSeconds = maxProgress;
    } else {
      viewedVideo = await ViewedVideos.create({
        courseContentId,
        maxPlayedSeconds: maxProgress,
        clientNumber
      });
    }
    return res.status(200).json(viewedVideo);
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = route;
