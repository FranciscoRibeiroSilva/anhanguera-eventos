/*const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const Administradores = require('../models/Administradores')
const Cupons = require('../models/Cupons')
const Eventos = require('../models/Eventos')
const Ministrantes = require('../models/Ministrantes')
const Participantes = require('../models/Participantes')
const Atividades = require('../models/Atividades')
const EventosAdministradores = require('../models/EventosAdministradores')
const connection = new Sequelize(dbConfig)

//iniciando models
Administradores.init(connection)
Eventos.init(connection)
Cupons.init(connection)
Ministrantes.init(connection)
Participantes.init(connection)
Atividades.init(connection)

//associação de models
Eventos.associate(connection.models)
Administradores.associate(connection.models)
Cupons.associate(connection.models)
Ministrantes.associate(connection.models)
Participantes.associate(connection.models)
Atividades.associate(connection.models)
*/

module.exports = connection

/*
npx sequelize db:create (criar banco de dados)
npx sequelize migration:generate --name nome-da-migrate (gera arquivo de migração)
npx sequelize db:migrate (realiza a migração)
*/