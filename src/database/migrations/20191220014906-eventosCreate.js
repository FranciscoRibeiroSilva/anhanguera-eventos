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
        administrado_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'administradores', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        participantes_esp: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        tipo_evento: {
          type: Sequelize.STRING,
          allowNull: false
        },
        quant_salas: {
          type: Sequelize.INTEGER,
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
