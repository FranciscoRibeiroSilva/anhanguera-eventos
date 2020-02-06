'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('atividades_administradores', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        atividade_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'atividades', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        administrador_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'administradores', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
