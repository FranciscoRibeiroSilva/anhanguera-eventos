const {Model, DataTypes} = require('sequelize')

class Ministrantes extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            contato: DataTypes.STRING,
            email: DataTypes.STRING,
            papel: DataTypes.STRING
        },{
            sequelize: connection,
            //tableName: 'usuarios'
        })
    }
    static associate(models){
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
        //this.belongsToMany(models.Atividades, {foreignKey: 'administrador_id', through: 'atividades_administradores', as: 'suas_atividades'})
        //this.belongsToMany(models.Eventos, {foreignKey: 'usuario_id', through: 'eventos_usuarios', as: 'inscrito_em'})
        //this.hasMany(models.Eventos, {foreignKey: 'usuario_id', as: 'eventos'})
        //this.hasMany(models.EventosUsuarios, {foreignKey: 'usuario_id', as: 'inscritoEm'})
    }
}


module.exports = Ministrantes