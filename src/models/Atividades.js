const {Model, DataTypes} = require('sequelize')

class Atividades extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            data: DataTypes.DATE,
            hora_inicio: DataTypes.DATE,
            duracao: DataTypes.STRING,
            tipo_atividade: DataTypes.STRING,
            carga_horaria: DataTypes.STRING,
            vagas: DataTypes.INTEGER,
            paga: DataTypes.BOOLEAN,
            valor: DataTypes.DOUBLE,
            ministrante_id: DataTypes.INTEGER
        },{
            sequelize: connection
        })
    }
    static associate(models){
        this.belongsToMany(models.Administradores, {foreignKey: 'atividade_id', through: 'atividades_administradores', as: 'seus_participantes'})
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
    }
}

module.exports = Atividades