'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Groups', [
    {
      organizerId: 1,
      name: "Lyco Group",
      about: "People watching Lycoris Recoil",
      type: "type1",
      private: true,
      city: "Ontario",
      state: "CA",
    },
    {
      organizerId: 2,
      name: "TFT",
      about: "Tacticians for Rito Games",
      type: "type2",
      private: false,
      city: "Irvine",
      state: "CA",
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    return queryInterface.bulkDelete("Groups", {
      name: { [Op.in]: ["Lyco Group", "TFT"]}
    }, {})
  }
};
