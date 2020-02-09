const path = require('path');
const fs = require('fs');
const Categoria = require('../../models/Categoria');
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

    if (!produto) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

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
  },

  async cadastrar(req, res){
    const { nome, descricao, valor, fabricante, id_categoria } = req.body;

    const categoria = await Categoria.findByPk(id_categoria);

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const produto = await Produto.create({
      nome, descricao, valor, fabricante, id_categoria
    });
    const dir = path.join(__dirname, '../..') + "/public/img/" + produto.id;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

    return res.json(produto);
  },

  async deletar(req, res){
    const { id } = req.body;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    const dir = path.join(__dirname, '../..') + "/public/img/" + produto.id;
    if (fs.existsSync(dir)){
      fs.readdir(dir, function(err, files){
          files.forEach(file => {
            fs.unlinkSync(dir + "/" + file);
          });
          fs.rmdirSync(dir);
      });
    }

    await Produto.destroy({
      where: {
        id
      }
    });

    return res.json({ success: 'Produto Deletado'});
  },

  async atualizar(req, res){
    const { id, nome, descricao, valor, fabricante, id_categoria } = req.body;

    const verifica = await Produto.findByPk(id);

    if (!verifica) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    const produto = await Produto.update({
      nome, descricao, valor, fabricante, id_categoria
    }, {
      where: {
        id
      }
    });

    return res.json({ success: 'Produto Atualizado'});
  }
};