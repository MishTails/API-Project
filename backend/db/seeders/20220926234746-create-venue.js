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
      {
        groupId: 3,
        address: '982 Shake St',
        city: 'Salt Lake City',
        state: 'UT',
        lat: 69.4,
        lng: 221.1
      },
      {
        groupId: 4,
        address: '912 Filmore St',
        city: 'Los Angeles',
        state: 'CA',
        lat: 32.4,
        lng: 181.1
      },
      {
        groupId: 5,
        address: '7437 Popcorn Ave',
        city: 'Spokane',
        state: 'WA',
        lat: 39.4,
        lng: 321.1
      },
      {
        groupId: 6,
        address: '143 Tesla Dr',
        city: 'San Jose',
        state: 'CA',
        lat: 39.4,
        lng: 321.1
      },
      {
        groupId: 7,
        address: '33 Celery Dr',
        city: 'Chicago',
        state: 'IL',
        lat: 39.4,
        lng: 321.1
      },
      {
        groupId: 8,
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
