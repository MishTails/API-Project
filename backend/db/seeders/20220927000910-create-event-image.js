'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'testurl',
        preview: true
      },
      {
        eventId: 1,
        url: 'privateurl',
        preview: false
      },
      {
        eventId: 2,
        url: 'sleepycom',
        preview: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("EventImages", {
      url: { [Op.in]: ["testurl", "privateurl", "sleepycom"]}
    }, {})
  }
};
