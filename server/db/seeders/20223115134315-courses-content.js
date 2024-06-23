module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CourseContents', [
      {
        title: "Lesson 1: Long Haircut tutorial", picture: "images/woman_hair_preview_1.jpg", link: 'https://www.youtube.com/embed/tp-hzy0mi1g?si=0qTu8wl2oATfh89a', courseId: '1', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 2: How to cut a Basic Square Layered Haircut", picture: "images/woman_hair_preview_2.jpg", link: 'https://www.youtube.com/embed/i1fCoZnbHIo?si=mAjRu7S9JNo9AFVp', courseId: '1', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 3: Best Layered Haircut For Fine Hair", picture: "images/woman_hair_preview_3.jpg", link: 'https://www.youtube.com/embed/ET3Tpxgr2vs?si=2Z0Pirv5C74XpWvo', courseId: '1', createdAt: new Date(), updatedAt: new Date(),
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
      {
        title: "Lesson 1: Long One Length Haircut Tutorial Plus Face Frame", picture: "", link: 'https://www.youtube.com/watch?v=wB9TtaXiO_g', courseId: '23', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 2: How To Cut The Perfect Face Frame Haircut Everytime", picture: "", link: 'https://www.youtube.com/watch?v=nMQdmEqoC84', courseId: '23', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        title: "Lesson 3: Shaggy Long Bob Haircut Tutorial", picture: "", link: 'https://www.youtube.com/watch?v=k2DcWkHLuGI', courseId: '23', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CourseContents');
  },
};
