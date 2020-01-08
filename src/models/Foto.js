const { Model, DataTypes } = require('sequelize');

class Foto extends Model {
    static init(sequelize) {
      super.init({
        foto: DataTypes.STRING(120),
      }, {
        sequelize, modelName: 'Foto'
      })
    }
  
    static associate(models) {
        this.belongsTo(models.Produto, { foreignKey: 'id_produto', as: 'produto' });
    }
  }
  
  module.exports = Foto;