const {Model, DataTypes} = require('sequelize')

class Atividades extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            data: DataTypes.DATE,
            tipo_atividade: DataTypes.STRING,
            paga: DataTypes.BOOLEAN,
            valor: DataTypes.DOUBLE,
            //ministrante_id: DataTypes.INTEGER
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
        this.belongsTo(models.Ministrantes, {foreignKey : 'ministrante_id', as: 'ministrante'})
        //this.belongsToMany(models.Administradores, {foreignKey: 'atividade_id', through: 'atividades_administradores', as: 'seus_participantes'})
    }
}

module.exports = Atividades