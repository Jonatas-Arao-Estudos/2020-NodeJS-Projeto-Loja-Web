const express = require('express');
const formidable = require('formidable');

const CategoriaController = require('../controllers/web/CategoriaController');
const ProdutoController = require('../controllers/web/ProdutoController');
const FotoController = require('../controllers/web/FotoController');

const routes = express.Router();

//Web

routes.post('/', async function (req, res, next){
  const { categoriaId, categoriaNome, excluirIDcategoria, produtoId, produtoNome, excluirIDproduto } = req.body;

  if(categoriaId){
    const atualizarCategoria = await CategoriaController.atualizar(req);
    if(atualizarCategoria.success){
      res.locals.resposta = atualizarCategoria.success;
    }else{
      res.locals.resposta = atualizarCategoria.error;
    }
  }
  else if(categoriaNome){
    const cadastrarCategoria = await CategoriaController.cadastrar(req);
    if(cadastrarCategoria.success){
      res.locals.resposta = cadastrarCategoria.success;
    }else{
      res.locals.resposta = cadastrarCategoria.error;
    }
  }
  else if(excluirIDcategoria){
    const deletarCategoria = await CategoriaController.deletar(req);
    if(deletarCategoria.success){
      res.locals.resposta = deletarCategoria.success;
    }else{
      res.locals.resposta = deletarCategoria.error;
    }
  }

  if(produtoId){
    const atualizarProduto = await ProdutoController.atualizar(req);
    if(atualizarProduto.success){
      res.locals.resposta = atualizarProduto.success;
    }else{
      res.locals.resposta = atualizarProduto.error;
    }
  }
  else if(produtoNome){
    const cadastrarProduto = await ProdutoController.cadastrar(req);
    if(cadastrarProduto.success){
      res.locals.resposta = cadastrarProduto.success;
    }else{
      res.locals.resposta = cadastrarProduto.error;
    }
  }
  else if(excluirIDproduto){
    const deletarProduto = await ProdutoController.deletar(req);
    if(deletarProduto.success){
      res.locals.resposta = deletarProduto.success;
    }else{
      res.locals.resposta = deletarProduto.error;
    }
  }

  var form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {

    const { nomeFotoId } = fields;

    if(nomeFotoId){
      const cadastrarFoto = await FotoController.cadastrar(err, fields, files);
      if(cadastrarFoto.success){
        res.locals.resposta = cadastrarFoto.success;
      }else{
        res.locals.resposta = cadastrarFoto.error;
      }
    }

  });

  next();
});

routes.all('/', async function (req, res) {

  //Recuperando dados do banco para a página  
  const { page = 1, categoria, pesquisa } = req.query;
  categorias = await CategoriaController.listarTodos();
  if(categoria){
    produtos = await ProdutoController.listarProdutoCategoria(page,categoria);
  }else if(pesquisa){
    produtos = await ProdutoController.listarProdutoPesquisa(page,pesquisa);
  }else{
    produtos = await ProdutoController.listarTodos(page);
  }
  
  var fotos = await produtos.docs.map(async function( produto ) {
    var foto = await FotoController.listarFotos(produto.id);
    try{
      return { url: foto[0].foto, id: produto.id } ;
    }
    catch{
      return { url: "https://www.layoutit.com/img/people-q-c-600-200-1.jpg", id: produto.id } ;
    }
  });
  await Promise.all(fotos).then(function(values) {
    fotos = values;
  });

  //Renderização da Página
  res.render('index', {
      tituloPagina: "Todos os Produtos",
      pesquisa,
      categorias,
      categoriaAtual: categoria,
      produtos: produtos.docs,
      qtdPaginas: produtos.pages,
      paginaAtual: produtos.current,
      fotos, 
      resposta: res.locals.resposta
    });
});

module.exports = routes;