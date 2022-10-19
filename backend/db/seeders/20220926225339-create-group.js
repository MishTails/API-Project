'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: 'Cerulean City Surfers',
        about: "Water Pokemon Enthusiests hailing from the town with the original water type gym",
        type: 'In Person',
        private: true,
        city: 'Ontario',
        state: 'CA',

      },
      {
        organizerId: 2,
        name: 'Kanto Campers',
        about: 'Hikers looking for the best spots. Recently hiked around Mt Moon and saw a strange Pokemon near the peak',
        type: 'In Person',
        private: false,
        city: 'Muir Woods',
        state: 'CA'
      },
      {
        organizerId: 3,
        name: 'Evo Tamers',
        about: 'We like pokemon evolution a lot.  Trade Evolutions, Stone Evolutions, Mega Evolutions, We love them all',
        type: 'In Person',
        private: false,
        city: 'New York City',
        state: 'NY'
      },
      {
        organizerId: 4,
        name: 'Rage Lake Hacking Group',
        about: 'Definitely just an Herb store, not looking for individuals seeking to find the secrets of the world',
        type: 'Online',
        private: true,
        city: 'Online',
        state: 'WEB'
      },
      {
        organizerId: 5,
        name: 'Sinnoh Historians',
        about: 'Experienced and curious archaeologists searching through the ancient past of the Pokemon world',
        type: 'In Person',
        private: true,
        city: 'Osaka',
        state: 'JP'
      },
      {
        organizerId: 6,
        name: 'Team Galctic',
        about: "Looking to revolutionize the world, Time and Space will be ours.  Join our hunt for Dialga and Palkia",
        type: 'In Person',
        private: true,
        city: 'Kyoto',
        state: 'JP'
      },
      {
        organizerId: 7,
        name: 'N Fan Club',
        about: 'Looking for mysterious Green Haired man.  Maybe last seen in the wreckage of a castle that fell from the sky',
        type: 'In Person',
        private: true,
        city: 'Los Angeles',
        state: 'CA'
      },
      {
        organizerId: 8,
        name: 'Gen Wunners',
        about: 'Terrestralize who? I dont like any of these zoomers and their wack mechanics.  Waiting for the day Pokemon returns to its roots',
        type: 'In Person',
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
