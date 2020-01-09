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
routes.post('/api/categoria/atualizar', CategoriaController.atualizar);

//Rotas Produto
routes.get('/api/produto', ProdutoController.listarTodos);
routes.get('/api/produto/id/:id_produto', ProdutoController.mostrarProduto);
routes.get('/api/produto/categoria/:id_categoria', ProdutoController.listarProdutoCategoria);
routes.post('/api/produto/cadastrar', ProdutoController.cadastrar);
routes.post('/api/produto/deletar', ProdutoController.deletar);
routes.post('/api/produto/atualizar', ProdutoController.atualizar);

//Rotas Foto
routes.get('/api/produto/fotos/:id_produto', FotoController.listarFotos);
routes.post('/api/produto/fotos/cadastrar', FotoController.cadastrar);
routes.post('/api/produto/fotos/deletar', FotoController.deletar);
routes.post('/api/produto/fotos/atualizar', FotoController.atualizar);

module.exports = routes;