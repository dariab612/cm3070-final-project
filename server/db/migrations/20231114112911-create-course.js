module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      picture: {
        type: Sequelize.TEXT,
      },
      numberOfVideos: {
        type: Sequelize.INTEGER,
      },
      certificate: {
        type: Sequelize.TEXT,
      },
      isCertified : {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      viewersCounter : {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      viewers: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },
      ratings: {
        type: Sequelize.JSONB,
        defaultValue: [],
        allowNull: false,
      },
      ratingsCounter : {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      averageRating : {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  },
};
