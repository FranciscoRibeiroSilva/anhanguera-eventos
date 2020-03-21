const {Model, DataTypes} = require('sequelize')

class Cupons extends Model{
    static init(sequelize){
        super.init({
            codigo: DataTypes.STRING,
            desconto: DataTypes.DOUBLE,
            quantidade: DataTypes.INTEGER,
            validade: DataTypes.DATE,
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Eventos, {foreignKey: 'evento_id', as: 'evento'})
        //this.belongsToMany(models.Usuarios, {foreignKey: 'evento_id', through: 'eventos_usuarios', as: 'seus_inscritos'})
        //this.hasMany(models.Cupons, {foreignKey: 'evento_id', as: 'seus_cupons'})
        //this.hasMany(models.Participantes, {foreignKey: 'evento_id', as: 'seus_participantes'})
    }
}

module.exports = Cupons