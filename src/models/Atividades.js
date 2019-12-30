const {Model, DataTypes} = require('sequelize')

class Atividades extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            tipo_atividade: DataTypes.STRING,
            data: DataTypes.DATE,
            paga: DataTypes.BOOLEAN,
            valor: DataTypes.DOUBLE,
            ministrante_id: DataTypes.INTEGER
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsToMany(models.Participantes, {foreignKey: 'atividade_id', through: 'atividades_participantes', as: 'suas_atividades'})
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
    }
}

module.exports = Atividades