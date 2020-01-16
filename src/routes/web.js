const express = require('express');

const CategoriaController = require('../controllers/web/CategoriaController');
const ProdutoController = require('../controllers/web/ProdutoController');
const FotoController = require('../controllers/web/FotoController');

const routes = express.Router();

//Web

routes.get('/', async function (req, res) {
  const { page = 1 } = req.query;
  categorias = await CategoriaController.listarTodos();
  produtos = await ProdutoController.listarTodos(page);
  
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

  res.render('index', {
      tituloPagina: "Todos os Produtos",
      categorias,
      produtos: produtos.docs,
      qtdPaginas: produtos.pages,
      paginaAtual: produtos.current,
      fotos
    })
});

module.exports = routes;