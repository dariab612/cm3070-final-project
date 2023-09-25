const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CourseContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Course
    }) {
      this.belongsTo(Course, { foreignKey: 'courseId' });
      // define association here
    }

    // define association here
  }

  CourseContent.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.TEXT,
    },
    picture: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.TEXT,
    },
    courseId: {
      type: DataTypes.TEXT,
      references: {
        model: 'Courses',
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
    modelName: 'CourseContent',
  });
  return CourseContent;
};
