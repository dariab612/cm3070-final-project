const router = require('express').Router();
const { ViewedVideos } = require('../db/models');
const { CourseContent } = require('../db/models');
const { Course } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const viewedVideos = await ViewedVideos.findAll({
        where: {
          clientNumber: req.session.user.telephone,
        },
      });
      const courses = await Course.findAll();
      
      const coursesContent = await CourseContent.findAll();
      
      const courseMap = new Map(courses.map(course => [course.id, course]));
      const viewedVideosCountMap = new Map();
      viewedVideos.forEach(video => {
        const content = coursesContent.find(content => content.id === video.courseContentId);
        if (content) {
          const courseId = content.courseId;
          if (!viewedVideosCountMap.has(courseId)) {
            viewedVideosCountMap.set(courseId, 0);
          }
          viewedVideosCountMap.set(courseId, viewedVideosCountMap.get(courseId) + 1);
        }
      });

      const updatedCoursesContent = coursesContent.map(content => {
        const courseDetails = courseMap.get(content.courseId);

        const viewedVideosCourseContent = viewedVideos.find(video => video.courseContentId === content.id);
        
        return {
          ...content,
          dataValues: {
            ...content.dataValues,
            courseTitle: courseDetails.name,
            numberOfVideos: courseDetails.numberOfVideos,
            viewedVideoCount: viewedVideosCountMap.get(content.courseId) || 0,
            viewedVideosCourseContent,
          }
        };
      });

      const recreatedCoursesContent = updatedCoursesContent.map(content => {
        const recreatedContent = new CourseContent();
        Object.assign(recreatedContent, content);

        return recreatedContent;
      });

      res.json({ viewedVideos, coursesContent: recreatedCoursesContent });
    } catch (error) {
      res.json({ message: error.message });
    }
  });

module.exports = router;
