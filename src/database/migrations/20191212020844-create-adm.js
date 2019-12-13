'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('administrador', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIcrement: true,
          allowNull: false
        },
        name:{
          type: Sequelize.STRING,
          allowNull: false
        },
        email:{
          type: Sequelize.STRING,
          allowNull: false
        },
        senha:{
          type: Sequelize.STRING,
          allowNull: false
        },
        estado:{
          type: Sequelize.STRING,
          allowNull: false
        },
        create_at:{
          type: Sequelize.STRING,
          allowNull: false
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
