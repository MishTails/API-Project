'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: 'Lyco Group',
        about: 'Lycoris Recoil Anime Watchers',
        type: 'Online',
        private: true,
        city: 'Ontario',
        state: 'CA',

      },
      {
        organizerId: 2,
        name: 'TFT',
        about: 'LAN competition for best tactician',
        type: 'In person',
        private: false,
        city: 'San Francisco',
        state: 'CA'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ['Lyco Group', 'TFT'] }
    }, {});

  }
};
