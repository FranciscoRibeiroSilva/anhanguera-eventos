const {Model, DataTypes} = require('sequelize')

class AtividadesUsuarios extends Model{
    static init(sequelize){
        super.init({
            atividade_id: DataTypes.INTEGER,
            usuario_id: DataTypes.INTEGER
        },{
            sequelize
            //tableName: 'eventos'
        })
    }
    static associate(models){
        this.belongsTo(models.Atividades, {foreignKey: 'atividade_id', as: 'evento'})
        this.belongsTo(models.Usuarios, {foreignKey: 'usuario_id', as: 'usuario'})
        //this.belongsToMany(models.Usuarios, {foreignKey: 'evento_id', through: 'eventos_usuarios', as: 'seus_inscritos'})
        //this.hasMany(models.Cupons, {foreignKey: 'evento_id', as: 'seus_cupons'})
        //this.hasMany(models.Atividades, {foreignKey: 'evento_id', as: 'suas_atividades'})
        //this.hasMany(models.Participantes, {foreignKey: 'evento_id', as: 'seus_participantes'})
        //this.hasMany(models.Ministrantes, {foreignKey: 'evento_id', as: 'seus_ministrantes'})
    }
}

module.exports = AtividadesUsuarios