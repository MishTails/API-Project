'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: "1234 Hush Street",
        city: "Chicago",
        state: "IL",
        lat: 120.8,
        lng: 90.7,
      },
      {
        groupId: 2,
        address: "5678 California Street",
        city: "San Francisco",
        state: "CA",
        lat: 30.8,
        lng: 80.7,
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) =>{
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("Venues", {
      city: { [Op.in]: ["Chicago", "San Francisco"]}
    }, {})
  }
};
