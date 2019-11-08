const mongoose = require("mongoose");


//Conectando e configurando mongoDB
mongoose.connect("mongodb://localhost/teste2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conexão ao mongo feita com sucesso")
}).catch((err)=>{
    console.log("Erro ao conectar "+err)
})

//Definindo model - Administradores
const admSchema = mongoose.Schema({
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

mongoose.model("administradores", admSchema)

const newAdm = mongoose.model("administradores")
new newAdm({
    nome: "eita",
    email: "eita@gmail.com",
    senha: "12345",
    estado: "sengoku"
}).save().then(()=>{
    console.log("Criado")
}).catch((err)=>{
    console.log("Bugo"+err)
})