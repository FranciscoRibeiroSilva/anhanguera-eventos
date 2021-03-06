const dbConfig = require('../config/database')
const Sequelize = require('sequelize')
const Usuarios = require('../models/Usuarios')
const Eventos = require('../models/Eventos')
const EventosUsuarios = require('../models/EventosUsuarios')
const Ministrantes = require('../models/Ministrantes')
const Atividades = require('../models/Atividades')
const AtividadesUsuarios = require('../models/AtividadesUsuarios')
const connection = new Sequelize(dbConfig)
const Cupons = require('../models/Cupons')
/*
const Ministrantes = require('../models/Ministrantes')
const Participantes = require('../models/Participantes')
const EventosAdministradores = require('../models/EventosAdministradores')
*/

//iniciando models
Usuarios.init(connection)
Eventos.init(connection)
EventosUsuarios.init(connection)
Ministrantes.init(connection)
Atividades.init(connection)
AtividadesUsuarios.init(connection)
Cupons.init(connection)
/*
Participantes.init(connection)
*/

//associação de models
Usuarios.associate(connection.models)
Eventos.associate(connection.models)
EventosUsuarios.associate(connection.models)
Ministrantes.associate(connection.models)
Atividades.associate(connection.models)
AtividadesUsuarios.associate(connection.models)
Cupons.associate(connection.models)
/*
Participantes.associate(connection.models)
*/

module.exports = connection

/*
npx sequelize db:create (criar banco de dados)
npx sequelize migration:generate --name nome-da-migrate (gera arquivo de migração)
npx sequelize db:migrate (realiza a migração)
*/