module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ViewedVideos', [
      {
        clientNumber: '+79210000000', courseContentId: '1', playedSeconds: null,  createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '2', playedSeconds: null, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '4', playedSeconds: null, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '8', playedSeconds: null, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '9', playedSeconds: null, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        clientNumber: '+79210000000', courseContentId: '10', playedSeconds: null, createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ViewedVideos');
  },
};
