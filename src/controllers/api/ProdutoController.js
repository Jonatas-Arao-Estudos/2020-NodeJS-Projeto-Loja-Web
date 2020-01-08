const Produto = require('../../models/Produto');

module.exports = {
  async listarTodos(req, res) {
    const { page = 1 } = req.query;
    const options = {
      page,
      paginate: 10,
      order: [['nome', 'ASC']]
    }
    const { docs, pages, total } = await Produto.paginate(options)

    produtos = { 
      docs,
      "current": page,
      pages,
      total
    };

    return res.json(produtos);
  },

  async mostrarProduto(req, res) {
    const { id_produto } = req.params;
    const produto = await Produto.findByPk(id_produto);

    return res.json(produto);
  },
  
  async listarProdutoCategoria(req, res) {
    const { page = 1 } = req.query;
    const { id_categoria } = req.params;
    const options = {
      page,
      paginate: 10,
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

    return res.json(produtos);
  }
};