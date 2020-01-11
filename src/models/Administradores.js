const {Model, DataTypes} = require('sequelize')

class Administradores extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            estado: DataTypes.STRING
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.hasMany(models.Eventos, {foreignKey: 'administrado_id', as: 'seus_eventos'})
    }
}


module.exports = Administradores