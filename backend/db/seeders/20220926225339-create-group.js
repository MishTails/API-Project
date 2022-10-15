'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: 'Cerulean City Surfers',
        about: "Water Pokemon Enthusiests",
        type: 'In person',
        private: true,
        city: 'Ontario',
        state: 'CA',

      },
      {
        organizerId: 2,
        name: 'Kanto Campers',
        about: 'Hikers looking for the best spots',
        type: 'In person',
        private: false,
        city: 'Muir Woods',
        state: 'CA'
      },
      {
        organizerId: 3,
        name: 'Evo Tamers',
        about: 'We like pokemon evolution a lot',
        type: 'In person',
        private: false,
        city: 'New York City',
        state: 'NY'
      },
      {
        organizerId: 4,
        name: 'Bill Hack Inc',
        about: 'redacted',
        type: 'Online',
        private: true,
        city: 'Online',
        state: 'WEB'
      },
      {
        organizerId: 5,
        name: 'Sinnoh Historians',
        about: 'Experienced and curious archaeologists searching through the ancient past of the Pokemon world',
        type: 'In person',
        private: true,
        city: 'Osaka',
        state: 'JP'
      },
      {
        organizerId: 6,
        name: 'Team Galctic',
        about: "looking to revolutionize the world",
        type: 'In person',
        private: true,
        city: 'Kyoto',
        state: 'JP'
      },
      {
        organizerId: 7,
        name: 'N Fan Club',
        about: 'Looking for mysterious Green Haired man',
        type: 'In person',
        private: true,
        city: 'Los Angeles',
        state: 'CA'
      },
      {
        organizerId: 8,
        name: 'Gen 9 waiting room',
        about: 'Dedicated to hunting for the time traveling pokemon',
        type: 'In person',
        private: true,
        city: 'Salt Lake City',
        state: 'UT'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', null, {});

  }
};
