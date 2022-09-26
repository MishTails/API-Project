'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Events", [
    {
      venueId: 1,
      groupId: 1,
      name: "Fall Seasonal Kickoff",
      description: "The season is beginning!",
      type: "test1",
      capacity: 200,
      price: 250,
      startDate: "10/29/2022",
      endDate: "10/30/2022"
    },
    {
      venueId: 1,
      groupId: 2,
      name: "Hot Dog Eating Contest",
      description: "nombombom",
      type: "test1",
      capacity: 203,
      price: 150,
      startDate: "11/29/2022",
      endDate: "12/30/2022"
    },
    {
      venueId: 2,
      groupId: 1,
      name: "End of January party",
      description: "woooooo",
      type: "test1",
      capacity: 4,
      price: 15,
      startDate: "1/29/2022",
      endDate: "1/30/2022"
    }
  ], {})

  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      groupId: { [Op.eq]: [1,2] }
    }, {});
  }
};
