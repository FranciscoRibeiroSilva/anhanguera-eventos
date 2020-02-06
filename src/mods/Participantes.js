const {Model, DataTypes} = require('sequelize')

class Participantes extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            papel: DataTypes.STRING
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsToMany(models.Atividades, {foreignKey: 'participante_id', through: 'atividades_participantes', as: 'seus_participantes'})
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
    }
}

module.exports = Participantes