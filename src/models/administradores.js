const { Model, DataTypes } = require('sequelize')

class Administradores extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            estado: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = Administradores