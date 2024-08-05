const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Category
    }) {
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      // define association here
    }

    // define association here
  }

  Course.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
    },
    categoryId: {
      type: DataTypes.TEXT,
      references: {
        model: 'Categories',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    picture: {
      type: DataTypes.TEXT,
    },
    numberOfVideos: {
      type: DataTypes.INTEGER,
    },
    certificate: {
      type: DataTypes.TEXT,
    },
    isCertified : {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viewersCounter : {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    viewers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
