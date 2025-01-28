'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const products = require('../db/products.json').map((product) => {
    product.createdAt = new Date()
    product.updatedAt = new Date()
    delete product.id
    return product
  })
  await queryInterface.bulkInsert('Products', products, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
  })
  }
};
