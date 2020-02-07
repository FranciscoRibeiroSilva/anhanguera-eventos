'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('eventos', { 
        id: {
          type:  Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'usuarios', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        participantes_esperados: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        quantidade_salas: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        local_evento: {
          type: Sequelize.STRING,
          allowNull: true
        },
        data_inicio: {
          type: Sequelize.DATE,
          allowNull: false
        },
        data_termino: {
          type: Sequelize.DATE,
          allowNull: false
        },
        pago: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        valor_evento:{
          type: Sequelize.DOUBLE,
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