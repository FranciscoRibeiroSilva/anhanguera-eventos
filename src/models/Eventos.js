const {Model, DataTypes} = require('sequelize')

class Eventos extends Model{
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING,
            participantes_esperados: DataTypes.INTEGER,
            quantidade_salas: DataTypes.INTEGER,
            local_evento: DataTypes.STRING,
            data_inicio: DataTypes.DATE,
            data_termino: DataTypes.DATE,
            pago: DataTypes.BOOLEAN,
            valor_evento: DataTypes.DOUBLE
        },{
            sequelize
            //tableName: 'eventos'
        })
    }
    static associate(models){
        this.belongsTo(models.Usuarios, {foreignKey: 'usuario_id', as: 'usuario'})
        this.hasMany(models.EventosUsuarios, {foreignKey: 'evento_id', as: 'inscritos'})
        //this.belongsToMany(models.Usuarios, {foreignKey: 'evento_id', through: 'eventos_usuarios', as: 'seus_inscritos'})
        //this.hasMany(models.Cupons, {foreignKey: 'evento_id', as: 'seus_cupons'})
        //this.hasMany(models.Atividades, {foreignKey: 'evento_id', as: 'suas_atividades'})
        //this.hasMany(models.Participantes, {foreignKey: 'evento_id', as: 'seus_participantes'})
        //this.hasMany(models.Ministrantes, {foreignKey: 'evento_id', as: 'seus_ministrantes'})
    }
}

module.exports = Eventos