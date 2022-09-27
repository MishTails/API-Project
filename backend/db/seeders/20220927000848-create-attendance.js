'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      {
        eventId: 1,
        userId: 1,
        status: 'Active',
      },
      {
        eventId: 2,
        userId: 1,
        status: "Inactive",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Attendances');
  }
};
