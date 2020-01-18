const { Model, DataTypes } = require('sequelize');
const sequelizePaginate = require('sequelize-paginate');


class Produto extends Model {
    static init(sequelize) {
      super.init({
        nome: DataTypes.STRING(100),
        descricao: DataTypes.TEXT,
        valor: DataTypes.DECIMAL(10,2),
        fabricante: DataTypes.STRING(100)
      }, {
        sequelize, modelName: 'Produto'
      })
    }
  
    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'id_produto', as: 'produto' });
        this.belongsTo(models.Categoria, { foreignKey: 'id_categoria', as: 'categoria' });
    }
  }

  sequelizePaginate.paginate(Produto);
  
  module.exports = Produto;