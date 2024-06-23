const route = require('express').Router();
const { ViewedVideos } = require('../db/models');

route.post('/', async (req, res) => {
  const { courseContentId, progress } = req.body.obj;
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
        { playedSeconds: progress },
        {
          where: {
            courseContentId,
            clientNumber
          }
        }
      );
      viewedVideo.playedSeconds = progress;
    } else {
      viewedVideo = await ViewedVideos.create({
        courseContentId,
        playedSeconds: progress,
        clientNumber
      });
    }
    console.log(viewedVideo, 'viewedVideo')
    return res.status(200).json(viewedVideo);
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = route;
