const Categoria = require('../../models/Categoria');

module.exports = {
  async listarTodos() {
    const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

    return categorias;
  }
};