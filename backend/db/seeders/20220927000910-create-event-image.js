'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 1,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 2,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 2,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 3,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 3,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 4,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 4,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 5,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 5,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 6,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 6,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 7,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 7,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
      {
        eventId: 8,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-alexa-style-blog-pokemon-inspired-charmander-daily-8.png',
        preview: true,
      },
      {
        eventId: 8,
        url: 'https://www.freepnglogos.com/uploads/pokeball-png/pokeball-pokemon-theme-team-ideas-for-pokemon-sun-and-moon-24.png',
        preview: false,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("EventImages", null, {})
  }
};
