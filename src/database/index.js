const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

const Administrador = require('../models/Administrador')

const connection = new Sequelize(dbConfig);

Administrador.init(connection)

module.exports = connection;

//npx sequelize db:create (criar database)
//npx sequelize migration:generate --name nome-da-migration (cria arquivo de migração)
//npx sequelize db:migrate (cria tabela)