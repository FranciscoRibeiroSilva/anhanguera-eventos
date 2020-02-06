const {Model, DataTypes} = require('sequelize')

class Cupons extends Model{
    static init(connection){
        super.init({
            codigo: DataTypes.STRING,
            desconto: DataTypes.DOUBLE,
            quantidade: DataTypes.INTEGER,
            validade: DataTypes.DATE
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
    }
}


module.exports = Cupons