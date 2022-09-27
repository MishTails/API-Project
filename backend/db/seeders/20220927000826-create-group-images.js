'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'bread/url',
        preview: true,
      },
      {
        groupId: 1,
        url: 'water/url',
        preview: false,
      },
      {
        groupId: 2,
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
