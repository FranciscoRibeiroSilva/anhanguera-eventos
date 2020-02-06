const {Model, DataTypes} = require('sequelize')

class Administradores extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            estado: DataTypes.STRING
        },{
            sequelize: connection,
            //tableName: 'administratores'
        })
    }
    static associate(models){
        //this.belongsToMany(models.Atividades, {foreignKey: 'administrador_id', through: 'atividades_administradores', as: 'suas_atividades'})
        this.belongsToMany(models.Eventos, {foreignKey: 'administrador_id', through: 'eventos_administradores', as: 'inscrito_em'})
        //this.hasMany(models.Eventos, {foreignKey: 'administrado_id', as: 'seus_eventos'})
    }
}


module.exports = Administradores