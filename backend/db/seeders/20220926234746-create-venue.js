'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: '134 Fulton St',
        city: 'San Francisco',
        state: 'CA',
        lat: 142.5,
        lng: 234.1
      },
      {
        groupId: 2,
        address: '777 Evil Dr',
        city: 'Seattle',
        state: 'WA',
        lat: 39.4,
        lng: 321.1
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {

     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('Venues', {
       address: { [Op.in]: ['134 Fulton St', '777 Evil Dr'] }
     }, {});
  }
};
