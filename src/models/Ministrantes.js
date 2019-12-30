const {Model, DataTypes} = require('sequelize')

class Ministrantes extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            contato: DataTypes.STRING,
            email: DataTypes.STRING,
            papel: DataTypes.STRING
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
    }
}

module.exports = Ministrantes