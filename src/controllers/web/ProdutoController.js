const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;
const Categoria = require('../../models/Categoria');
const Produto = require('../../models/Produto');

module.exports = {
  async listarTodos(page) {
    const options = {
      page,
      paginate: 8,
      order: [['nome', 'ASC']]
    }
    const { docs, pages, total } = await Produto.paginate(options)

    produtos = { 
      docs,
      "current": page,
      pages,
      total
    };

    return produtos;
  },

  async mostrarProduto(id_produto) {
    const produto = await Produto.findByPk(id_produto);

    if (!produto) {
      return { error: 'Produto não encontrado' };
    }

    return produto;
  },

  async listarProdutoCategoria(page, id_categoria) {
    const options = {
      page,
      paginate: 8,
      order: [['nome', 'ASC']],
      where: { id_categoria } 
    }
    const { docs, pages, total } = await Produto.paginate(options)

    produtos = { 
      docs,
      "current": page,
      pages,
      total
    };

    return produtos;
  },

  async listarProdutoPesquisa(page, pesquisa) {
    const options = {
      page,
      paginate: 8,
      order: [['nome', 'ASC']],
      where: { nome: { [Op.like]: '%'+pesquisa+'%'} } 
    }
    const { docs, pages, total } = await Produto.paginate(options)

    produtos = { 
      docs,
      "current": page,
      pages,
      total
    };

    return produtos;
  }
};