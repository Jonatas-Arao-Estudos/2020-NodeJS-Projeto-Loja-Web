const express = require('express');

const CategoriaController = require('../controllers/web/CategoriaController');
const ProdutoController = require('../controllers/web/ProdutoController');
const FotoController = require('../controllers/web/FotoController');

const routes = express.Router();

//Web

routes.post('/', async function (req, res, next){
  const { categoriaId, categoriaNome, excluirIDcategoria } = req.body;

  if(categoriaId){
    atualizarCategoria = await CategoriaController.atualizar(req);
    if(atualizarCategoria.success){
      res.locals.resposta = atualizarCategoria.success;
    }else{
      res.locals.resposta = atualizarCategoria.error;
    }
  }
  else if(categoriaNome){
    cadastrarCategoria = await CategoriaController.cadastrar(req);
    if(cadastrarCategoria.success){
      res.locals.resposta = cadastrarCategoria.success;
    }else{
      res.locals.resposta = cadastrarCategoria.error;
    }
  }
  else if(excluirIDcategoria){
    deletarCategoria = await CategoriaController.deletar(req);
    if(deletarCategoria.success){
      res.locals.resposta = deletarCategoria.success;
    }else{
      res.locals.resposta = deletarCategoria.error;
    }
  }

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