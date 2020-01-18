const express = require('express');
const formidable = require('formidable');

const CategoriaController = require('../controllers/web/CategoriaController');
const ProdutoController = require('../controllers/web/ProdutoController');
const FotoController = require('../controllers/web/FotoController');

const routes = express.Router();

//Web

routes.post('/',
  CategoriaController.atualizar,
  CategoriaController.cadastrar,
  CategoriaController.deletar,
  ProdutoController.atualizar,
  ProdutoController.cadastrar,
  ProdutoController.deletar,
  FotoController.cadastrar
);

routes.all('/',
  CategoriaController.listarTodos,
  ProdutoController.listarProdutoCategoria,
  ProdutoController.listarProdutoPesquisa,
  ProdutoController.listarTodos,
  FotoController.listarFotos,
  async function (req, res) {
  //Recuperando dados dos controllers para a página  
    const { categorias, produtos, resposta, fotos } = res.locals;
    const { docs: listaProdutos, pages: qtdPaginas, current: paginaAtual, categoria: categoriaAtual, pesquisa } = produtos;

    //Renderização da Página
    res.render('index', {
        tituloPagina: "Todos os Produtos",
        pesquisa,
        categorias,
        categoriaAtual,
        listaProdutos,
        qtdPaginas,
        paginaAtual,
        fotos, 
        resposta
      });
  });

module.exports = routes;