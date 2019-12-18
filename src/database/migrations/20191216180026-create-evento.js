'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('eventos', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        administradores_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {model: 'administradores', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nome:{
          type: Sequelize.STRING,
          allowNull: false
        },
        participante_es:{
          type: Sequelize.STRING,
          allowNull: false
        },
        tipo_evento:{
          type: Sequelize.STRING,
          allowNull: false
        },
        quant_salas:{
          type: Sequelize.INTEGER,
          allowNull: false
        },
        nome_adm: {
          type: Sequelize.STRING,
          allowNull: false
        },
        evento_tipo: {
          type: Sequelize.STRING, 
          allowNull: false
        },
        valor_evento: {
          type: Sequelize.DOUBLE,
          allowNull: true
        },
        created_at:{
          type: Sequelize.STRING,
          allowNull: false
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false
        },
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

