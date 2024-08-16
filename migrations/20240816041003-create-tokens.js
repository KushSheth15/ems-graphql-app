'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      token: {
        type: Sequelize.STRING
      },
      token_type:{
        type:Sequelize.ENUM('ACCESS','RESET'),
        allowNull:false
      },
      expiresAt: {
        type: Sequelize.DATE
      },
      userId:{
        type:Sequelize.UUID,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tokens');
  }
};