const {Model, DataTypes} = require('sequelize')

class Usuarios extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            estado: DataTypes.STRING
        },{
            sequelize: connection,
            //tableName: 'usuarios'
        })
    }
    static associate(models){
        //this.belongsToMany(models.Atividades, {foreignKey: 'administrador_id', through: 'atividades_administradores', as: 'suas_atividades'})
        this.belongsToMany(models.Eventos, {foreignKey: 'usuario_id', through: 'eventos_usuarios', as: 'inscrito_em'})
        //this.hasMany(models.Eventos, {foreignKey: 'administrado_id', as: 'seus_eventos'})
    }
}


module.exports = Usuarios