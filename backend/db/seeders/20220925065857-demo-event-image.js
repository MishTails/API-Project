'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'test/url',
        preview: true,
      },
      {
        eventId: 1,
        url: 'private/url',
        preview: false,
      },
      {
        eventId: 2,
        url: 'sleepy.com',
        preview: true,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) =>{
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("EventImages", {
      url: { [Op.in]: ["test/url", "private/url", "sleepy.com"]}
    }, {})
  }
};
