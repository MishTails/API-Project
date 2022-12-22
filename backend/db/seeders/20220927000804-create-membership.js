'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: "member"
      },
      {
        userId: 1,
        groupId: 2,
        status: "pending"
      },
      {
        userId: 2,
        groupId: 1,
        status: "co-host"
      },
      {
        userId: 2,
        groupId: 2,
        status: "member"
      },
      {
        userId: 3,
        groupId: 3,
        status: "member"
      },
      {
        userId: 4,
        groupId: 4,
        status: "member"
      },
      {
        userId: 5,
        groupId: 5,
        status: "member"
      },
      {
        userId: 6,
        groupId: 6,
        status: "member"
      },
      {
        userId: 7,
        groupId: 7,
        status: "member"
      },
      {
        userId: 8,
        groupId: 8,
        status: "member"
      },

    ], {});
  },

  async down (queryInterface, Sequelize)  {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships');
  }
};
