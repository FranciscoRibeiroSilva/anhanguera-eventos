const {Model, DataTypes} = require('sequelize')

class EventosAdministradores extends Model{
    static init(sequelize){
        super.init({
            administrador_id: DataTypes.INTEGER,
            evento_id: DataTypes.INTEGER,
        },{
            sequelize

        })
    }
    static associate(models){
        this.belongsTo(models.Administradores, {foreignKey: 'administrador_id', as: 'participante'})
        this.belongsTo(models.Administradores, {foreignKey: 'evento_id', as: 'evento'})
    }
}