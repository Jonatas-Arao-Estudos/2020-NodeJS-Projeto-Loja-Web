const express = require('express');

const CategoriaController = require('./controllers/api/CategoriaController');
const ProdutoController = require('./controllers/api/ProdutoController');
const FotoController = require('./controllers/api/FotoController');

const routes = express.Router();

//API

//Rotas Categoria
routes.get('/api/categoria', CategoriaController.listarTodos);
routes.post('/api/categoria/cadastrar', CategoriaController.cadastrar);
routes.post('/api/categoria/deletar', CategoriaController.deletar);

//Rotas Produto
routes.get('/api/produto', ProdutoController.listarTodos);
routes.get('/api/produto/id/:id_produto', ProdutoController.mostrarProduto);
routes.get('/api/produto/categoria/:id_categoria', ProdutoController.listarProdutoCategoria);

//Rotas Foto
routes.get('/api/produto/fotos/:id_produto', FotoController.listarFotos);

module.exports = routes;