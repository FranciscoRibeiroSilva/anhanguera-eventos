'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('atividades', { 
        id:{
          type: Sequelize.INTEGER,
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
        ministrante_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {model: 'ministrantes', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false
        },
        tipo_atividade: {
          type: Sequelize.STRING,
          allowNull: false
        },
        paga: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        valor: {
          type: Sequelize.DOUBLE,
          allowNull: true
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};