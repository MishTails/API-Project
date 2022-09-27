'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {

        venueId: 1,
        groupId: 1,
        name: "The Park",
        description: "Relaxing place to chill",
        type: 'In-Person',
        capacity: 200,
        price: 20,
        startDate: '6/29/23',
        endDate: '8/8/23'
      },
      {
        venueId: 2,
        groupId: 1,
        name: 'Little Henrys',
        description: 'Mediocure Italian',
        type: "Online",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Events', {
       name: { [Op.in]: ['The Park', 'Little Henrys'] }
     }, {});
  }
};
