module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Haircut course', picture: '/images/haircut.png', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Hair staining course', picture: '/images/staining.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Hair Styling course', picture: 'images/styling.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Complex hairstyles', picture: 'images/hairstyles.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Manicure', picture: 'images/manicure.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Eyebrows and eyelashes', picture: 'images/eye.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Makeup', picture: 'images/makeup.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Piercing', picture: 'images/piercing.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Tatoo', picture: 'images/tatoo2.jpg', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories');
  },
};
