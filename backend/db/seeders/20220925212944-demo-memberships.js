'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: "Active"
      },
      {
        userId: 2,
        groupId: 1,
        status: "Active"
      },
      {
        userId: 3,
        groupId: 1,
        status: "Inactive"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships', {
      groupId: { [Op.eq]: 1 }
    }, {});
  }
};
