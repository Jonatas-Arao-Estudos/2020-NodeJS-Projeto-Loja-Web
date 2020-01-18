const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const Op = Sequelize.Op;
const Categoria = require('../../models/Categoria');
const Produto = require('../../models/Produto');

module.exports = {
  async listarTodos(req, res, next) {
    const { page = 1, categoria, pesquisa } = req.query;

    if(!categoria && !pesquisa){
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

      res.locals.produtos = produtos;

      next();
    }else{
      next();
    }
  },

  async mostrarProduto(req, res, next) {
    const { id_produto } = req.params;

    const produto = await Produto.findByPk(id_produto);

    if (!produto) {
      return { error: 'Produto não encontrado' };
    }

    res.locals.produto = produto;

    next();
  },

  async listarProdutoCategoria(req, res, next) {
    const { page = 1, pesquisa, categoria } = req.query;

    if(categoria && !pesquisa){
      const options = {
        page,
        paginate: 8,
        order: [['nome', 'ASC']],
        where: { id_categoria: categoria } 
      }
      const { docs, pages, total } = await Produto.paginate(options)

      produtos = { 
        docs,
        "current": page,
        pages,
        total,
        categoria
      };

      res.locals.produtos = produtos;

      next();
    }else{
      next();
    }
  },

  async listarProdutoPesquisa(req, res, next) {
    const { page = 1, pesquisa, categoria } = req.query;

    if(pesquisa && !categoria){
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
        total,
        pesquisa
      };

      res.locals.produtos = produtos;

      next();
    }else{
      next();
    }

  },

  async cadastrar(req, res, next){
    const { produtoId, produtoNome, produtoDescricao, produtoValor, produtoFabricante, produtoCategoria, excluirIDproduto } = req.body;

    if(!produtoId && produtoNome && !excluirIDproduto){
      const categoria = await Categoria.findByPk(produtoCategoria);

      if (!categoria) {
        res.locals.resposta = 'Categoria não encontrada';
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
        res.locals.resposta = 'Erro ao cadastrar';
      }

      res.locals.resposta = 'Produto Cadastrado';
    }
    next();
  },

  async deletar(req, res, next){
    const { produtoId, produtoNome, produtoDescricao, produtoValor, produtoFabricante, produtoCategoria, excluirIDproduto } = req.body;

    if(!produtoId && !produtoNome && excluirIDproduto){
      const produto = await Produto.findByPk(excluirIDproduto);

      if (!produto) {
        res.locals.resposta = 'Produto não encontrado';
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
        res.locals.resposta = 'Erro ao deletar';
      }

      res.locals.resposta = 'Produto Deletado';
    }
    next();
  },

  async atualizar(req, res, next){
    const { produtoId, produtoNome, produtoDescricao, produtoValor, produtoFabricante, produtoCategoria, excluirIDproduto } = req.body;

    if(produtoId && produtoNome && !excluirIDproduto){
      const verifica = await Produto.findByPk(produtoId);

      if (!verifica) {
        res.locals.resposta = 'Produto não encontrado';
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
        res.locals.resposta = 'Erro ao atualizar';
      }

      res.locals.resposta = 'Produto Atualizado';
    }
    next();
  }
};