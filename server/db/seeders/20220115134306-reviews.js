module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
      {
        name: 'DarkMoon', text: 'This platform offers a diverse array of beauty courses, including hairdressing, nail art, and makeup tutorials. I found hairdressing courses especially helpful.', isValid: true, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'NightFuri', text: 'Good interface, courses presented in a wonderful and accessible language.', isValid: true, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'TheBitingFly', text: 'Thanks to your courses, I was able to get a job at a nail salon near my home.', isValid: true, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'MichaelexahYJ', text: 'Both the website and the courses are made with passion by people truly dedicated to their craft!', isValid: true, createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews');
  },
};
