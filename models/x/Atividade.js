const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const atividadeSchema = new Schema({
    nome: {
        type: String
    },
    tipo: {
        type: String
    },
    responsavel: {
        type: String
    },
    hora: {
        type: String
    },
    data: {
        type: String
    },
    sala: {
        type: String
    },
    numeroDePartic: {
        type: String
    },
    cargaHoraria: {
        type: String
    },
    tipoInscricao: {
        type: String
    },
    valor: {
        type: String
    },
    cupons: {
        type: String
    }

})

mongoose.model("atividades", atividadeSchema)