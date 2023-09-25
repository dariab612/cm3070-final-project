module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ViewedVideos', [
      {
        clientNumber: '+79210000000', courseContentId: '1',  createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '2', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '4', createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ViewedVideos');
  },
};
