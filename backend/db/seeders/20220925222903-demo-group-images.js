'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupImages', [
      {
        eventId: 1,
        url: 'bread/url',
        preview: true,
      },
      {
        eventId: 1,
        url: 'water/url',
        preview: false,
      },
      {
        eventId: 2,
        url: 'discord.com',
        preview: true,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) =>{
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("GroupImages", {
      url: { [Op.in]: ["bread/url", "water/url", "discord.com"]}
    }, {})
  }
};
