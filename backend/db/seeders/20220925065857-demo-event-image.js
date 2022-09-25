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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
