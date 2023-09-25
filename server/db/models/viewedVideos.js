const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ViewedVideos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      CourseContent
    }) {
      this.belongsTo(CourseContent, { foreignKey: 'courseContentId' });
      // define association here
    }

    // define association here
  }

  ViewedVideos.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    clientNumber: {
      type: DataTypes.STRING,
    },
    courseContentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CourseContents',
        key: 'id',
      },
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
    modelName: 'ViewedVideos',
  });
  return ViewedVideos;
};
