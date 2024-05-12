'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ViewedVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientNumber: {
        type: Sequelize.STRING,
      },
      courseContentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'CourseContents',
          key: 'id',
        },
      },
      playedSeconds: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      maxPlayedSeconds: {
        allowNull: true,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ViewedVideos');
  }
};
