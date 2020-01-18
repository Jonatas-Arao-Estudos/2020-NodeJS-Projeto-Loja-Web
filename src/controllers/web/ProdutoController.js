const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
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
  },

  async cadastrar(req){
    const { produtoNome, produtoDescricao, produtoValor, produtoFabricante, produtoCategoria } = req.body;

    const categoria = await Categoria.findByPk(produtoCategoria);

    if (!categoria) {
      return { error: 'Categoria não encontrada' };
    }

    try {
      const produto = await Produto.create({
        nome: produtoNome,
        descricao: produtoDescricao,
        valor: produtoValor,
        fabricante: produtoFabricante,
        id_categoria: produtoCategoria
      });
      const dir = path.join(__dirname, '../..') + "\\public\\img\\" + produto.id;
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
    } catch (e){
      return { error: 'Erro ao cadastrar' };
    }

    return { success: 'Produto Cadastrado' };

  },

  async deletar(req){
    const { excluirIDproduto } = req.body;

    const produto = await Produto.findByPk(excluirIDproduto);

    if (!produto) {
      return { error: 'Produto não encontrado' };
    }
      
    try {
      const dir = path.join(__dirname, '../..') + "\\public\\img\\" + produto.id;
      if (fs.existsSync(dir)){
        fs.readdir(dir, function(err, files){
            files.forEach(file => {
              fs.unlinkSync(dir + "\\" + file);
            });
            fs.rmdirSync(dir);
        });
      }
      await Produto.destroy({
        where: {
          id: excluirIDproduto
        }
      });
    } catch (e){
      return { error: 'Erro ao deletar' };
    }

    return { success: 'Produto Deletado' };
  },

  async atualizar(req){
    const { produtoId, produtoNome, produtoDescricao, produtoValor, produtoFabricante, produtoCategoria } = req.body;

    const verifica = await Produto.findByPk(produtoId);

    if (!verifica) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    try {
      await Produto.update({
        nome: produtoNome,
        descricao: produtoDescricao,
        valor: produtoValor,
        fabricante: produtoFabricante,
        id_categoria: produtoCategoria 
      }, {
        where: {
          id: produtoId
        }
      });
    } catch (e){
      return { error: 'Erro ao atualizar' };
    }

    return { success: 'Produto Atualizado'};
  }
};