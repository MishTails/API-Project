'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {

        firstName: 'Demo',
        lastName: 'Lition',
        username: 'Demo-lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jarrod',
        lastName: 'Mishima',
        username: 'C9Tails',
        email: 'mishimajam@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Red',
        lastName: 'Kanto',
        username: 'Pikaboy',
        email: 'pallettown@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Gold',
        lastName: 'Johto',
        username: 'elmfan1234',
        email: 'silverwho@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ruby',
        lastName: 'Hoenn',
        username: 'jirachiWisher',
        email: 'normannson@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Pearl',
        lastName: 'Sinnoh',
        username: 'itsDawn',
        email: 'piplupfour@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'White',
        lastName: 'Unova',
        username: 'changeIsComing',
        email: 'vforvictory@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Moon',
        lastName: 'Alola',
        username: 'nebbyInDaBag',
        email: 'kahuna@gmail.com',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
