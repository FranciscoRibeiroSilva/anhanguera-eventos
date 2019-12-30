'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('atividades_participantes', { 
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
        participante_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'participantes', key: 'id'},
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
