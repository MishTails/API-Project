'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {

        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
<<<<<<< HEAD
        firstName: 'Demo',
        lastName: 'Lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Fake',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'One',
        lastName: 'Two',
        hashedPassword: bcrypt.hashSync('password3')
      }
=======
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tails',
        lastName: 'Mish',
        username: 'Laplace',
        email: 'jkmish@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
>>>>>>> dev
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1'] }
    }, {});
  }
};
