const bcrypt = require('bcrypt');

const generateHashPass = (password) => bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [
      {
        login: 'Admin', password: generateHashPass('123456789'), telephone: '+79162834244', isAdmin: true, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Daria', lastname: 'Sukonnova', login: 'Daria', password: generateHashPass('00000'), telephone: '+79210000000', isAdmin: false, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Kirill', lastname: 'Gordievich', login: 'Kirill', password: generateHashPass('00000'), telephone: '+79210000001', isAdmin: false, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Diana', lastname: 'Vinogradova', login: 'Diana', password: generateHashPass('00000'), telephone: '+79210000002', isAdmin: false, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Sasha', lastname: 'Sukonnova', login: 'Sasha', password: generateHashPass('00000'), telephone: '+79210000003', isAdmin: false, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        name: 'Masha', lastname: 'Kukonnova', login: 'Masha', password: generateHashPass('00000'), telephone: '+79210000004', isAdmin: false, createdAt: new Date(), updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients');
  },
};
