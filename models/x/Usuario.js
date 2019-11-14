const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nome: {
        type: String
    },
    cpf: {
        type: String
    },
    email: {
        type: String
    },
    senha:{
        type: String
    }
})

mongoose.model("usuario", usuarioSchema)