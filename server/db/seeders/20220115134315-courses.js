module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [
      {
        name: "Women's haircut", picture: 'images/womanhaircut.png', categoryId: '1', description: '',  numberOfVideos: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: "Men's haircut", picture: 'images/man.jpg', categoryId: 1, description: '', numberOfVideos: 4, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Clipper haircut', picture: 'images/clipper.jpg', categoryId: '1', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: "Children's haircut", picture: 'images/children.jpg', categoryId: '1', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: "Coloring short hair", picture: 'images/color_short_hair.jpg', categoryId: '2', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: "Coloring long hair", picture: 'images/color_long_hair.jpg', categoryId: 2, description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Complex coloring', picture: 'images/complicated_color.jpg', categoryId: '2', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: "Styling for short hair", picture: 'images/style_short_hair.jpg', categoryId: '3', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: "Styling for long hair", picture: 'images/style_long_hair.jpg', categoryId: '3', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Complex Hairstyle', picture: 'images/complex_hairstyle.jpg', categoryId: '4', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Complex hairstyle with the use of decorative elements.', picture: 'images/complex_hair_dec.jpg', categoryId: '4', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Nail care without coating', picture: 'images/nail_coat.jpg', categoryId: '5', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Gel nail polish', picture: 'images/gel_nail_ponish.jpg', categoryId: '5', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Creative nail design', picture: 'images/creative_nails.jpg', categoryId: '5', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Eyebrow coloring', picture: 'images/eyebrow_coloring.jpg', categoryId: '6', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Eyebrow styling', picture: 'images/eyebrow_styling.jpg', categoryId: '6', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Eyelash coloring', picture: 'images/eyelash_coloring.jpg', categoryId: '6', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Eyelash extension', picture: 'images/eyelash_extentions.png', categoryId: '6', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Creative eye makeup', picture: 'images/creative_eye_makeup.jpg', categoryId: '7', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Creative lip makeup', picture: 'images/lip_makeup.jpg', categoryId: '7', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Helix piercing', picture: 'images/helix.jpg', categoryId: '8', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Industrial piercing', picture: 'images/industrial.jpg', categoryId: '8', description: '', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'General haircut', picture: 'images/generalhaircut.jpg', categoryId: '1', description: '', certificate: 'image/certificate.png', createdAt: new Date(), updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses');
  },
};
