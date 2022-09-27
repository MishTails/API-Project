'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: "Active"
      },
      {
        userId: 1,
        groupId: 2,
        status: "Active"
      },
      {
        userId: 2,
        groupId: 1,
        status: "Inactive"
      }
    ], {});
  },

  async down (queryInterface, Sequelize)  {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships');
  }
};
