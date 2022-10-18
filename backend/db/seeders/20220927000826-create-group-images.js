'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 1,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 2,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 2,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 3,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 3,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 4,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 4,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 5,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 5,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 6,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 6,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 7,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 7,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        groupId: 8,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        groupId: 8,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) =>{
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("GroupImages", null, {})
  }
};
