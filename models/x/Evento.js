const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    nome: {
        type: String
    },
    tipo: {
        type: String
    },
    participantes: {
        type: String
    },
    nomeAdm: {
        type: String
    },
    emailAdm: {
        type: String
    }  
})

mongoose.model("eventos", eventoSchema)