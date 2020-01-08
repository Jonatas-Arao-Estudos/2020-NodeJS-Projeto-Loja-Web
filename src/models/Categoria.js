const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
    static init(sequelize) {
      super.init({
        nome: DataTypes.STRING(100)
      }, {
        sequelize , modelName: 'Categoria'
      })
    }
  
    static associate(models) {
        this.hasMany(models.Produto, { foreignKey: 'id_categoria', as: 'categorias' });
    }
  }
  
  module.exports = Categoria;