'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {

        venueId: 1,
        groupId: 1,
        name: 'Beachside Lapras Watch',
        description:'Come Walk Along the beach and hunt the elusive Transport Pokemon, Lapras',
        type: 'In-Person',
        capacity: 200,
        price: 20,
        startDate: '6/29/23',
        endDate: '8/8/23'
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Charmander Smore Making',
        description: 'Hike in the woods, and then settle down at night and cook smores with a friendly Charmander',
        type: "Online",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
      {
        venueId: 2,
        groupId: 3,
        name: 'Eevee Petting Zoo',
        description: 'Eevee is super cute!!',
        type: "In-Person",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
      {
        venueId: 1,
        groupId: 4,
        name: 'Mysterious Virus',
        description: 'Catch the hidden Porygon as it ventures through cyberspace',
        type: "Online",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
      {
        venueId: 2,
        groupId: 5,
        name: 'Hisuian Legends',
        description: 'Out of the blue, Pokemon from the ancient Hisui have appeared.  Join up with your friends to catch these rare creatures',
        type: "Online",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
      {
        venueId: 2,
        groupId: 6,
        name: 'Celebi Watch',
        description: 'Venture into the forest and find the rare time traveling Pokemon',
        type: "Online",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
      {
        venueId: 2,
        groupId: 7,
        name: 'Oshawott stroll',
        description: 'Take a beachside stroll with cute Oshawotts',
        type: "In Person",
        capacity: 200,
        price: 20,
        startDate: '3/21/23',
        endDate: '8/10/23'
      },
      {
        venueId: 2,
        groupId: 8,
        name: 'Bird!!!',
        description: 'Many Bird Pokemon creatures in sky',
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
     return queryInterface.bulkDelete('Events', null, {});
  }
};
