const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const administradorSchema = new Schema({
    nome: {
        type: String
    },
    email: {
        type: String
    },
    senha: {
        type: String
    },
    estado: {
        type: String
    }
})

mongoose.model("administrador", administradorSchema)