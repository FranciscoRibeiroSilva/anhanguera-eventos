'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cupons', { 
        id: {
          type:  Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        evento_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'eventos', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        codigo: {
          type: Sequelize.STRING,
          allowNull: false
        },
        desconto: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        quantidade: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        validade: {
          type: Sequelize.DATE,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      //return queryInterface.dropTable('administradores');
  }
};