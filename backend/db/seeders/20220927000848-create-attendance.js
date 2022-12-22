'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      {
        eventId: 1,
        userId: 1,
        status: 'member',
      },
      {
        eventId: 2,
        userId: 2,
        status: "member",
      },
      {
        eventId: 2,
        userId: 3,
        status: "pending",
      },
      {
        eventId: 1,
        userId: 4,
        status: "pending",
      },
      {
        eventId: 1,
        userId: 5,
        status: "member",
      },
      {
        eventId: 1,
        userId: 6,
        status: "member",
      },
      {
        eventId: 3,
        userId: 6,
        status: "member",
      },
      {
        eventId: 4,
        userId: 5,
        status: "member",
      },
      {
        eventId: 1,
        userId: 6,
        status: "member",
      },
      {
        eventId: 4,
        userId: 4,
        status: "member",
      },
      {
        eventId: 3,
        userId: 3,
        status: "member",
      },
      {
        eventId: 5,
        userId: 5,
        status: "member",
      },
      {
        eventId: 6,
        userId: 6,
        status: "member",
      },
      {
        eventId: 7,
        userId: 7,
        status: "member",
      },
      {
        eventId: 8,
        userId: 8,
        status: "member",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Attendances');
  }
};
