module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CourseContents', [
      {
        title: "Lesson 1: Long Haircut tutorial", picture: "images/woman_hair_preview_1.jpg", link: 'https://www.youtube.com/watch?v=857xMQMf-KQ', courseId: '1', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 2: How to cut a Basic Square Layered Haircut", picture: "images/woman_hair_preview_2.jpg", link: 'https://www.youtube.com/watch?v=i1fCoZnbHIo', courseId: '1', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 3: Best Layered Haircut For Fine Hair", picture: "images/woman_hair_preview_3.jpg", link: 'https://www.youtube.com/watch?v=ET3Tpxgr2vs', courseId: '1', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 1: Basic Mens Haircut", picture: "images/lesson_1_men_haircut.jpg", link: 'https://www.youtube.com/watch?v=B9UjXAeXn-Y', courseId: '2', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 2: Master Barber Tutorial: The Art of a 15-Minute Everyday Cut", picture: "images/lesson_2_men_haircut.jpg",  link: 'https://www.youtube.com/watch?v=FWilMCxEzh0', courseId: '2', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 3: Simple Step by Step - How To Make Men's Haircut With Scissors", picture: "images/lesson_3_men_haircut.jpg",  link: 'https://www.youtube.com/watch?v=rmHaFBiX4ds', courseId: '2', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 4: The Best TUTORIAL Classic Medium Men's Haircut With Scissors", picture: "images/lesson_4_men_haircut.jpg", link: 'https://www.youtube.com/watch?v=h6de0db_6pI', courseId: '2', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CourseContents');
  },
};
