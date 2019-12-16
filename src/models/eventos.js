const { Model, DataTypes } = require('sequelize')

class Eventos extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            participante_es: DataTypes.STRING,
            tipo_evento: DataTypes.STRING,
            quant_salas: DataTypes.INTEGER,
            nome_adm: DataTypes.STRING,
            evento_tipo: DataTypes.STRING,
            valor_evento: DataTypes.DOUBLE
        }, {
            sequelize: connection
        })
    }

    static associate(models){
        console.log(models)
        this.belongsTo(models.Administradores, {foreignKey: 'administradores_id', as:'administradores'})
    }
}

module.exports = Eventos