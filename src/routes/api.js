const express = require('express');

const CategoriaController = require('../controllers/api/CategoriaController');
const ProdutoController = require('../controllers/api/ProdutoController');
const FotoController = require('../controllers/api/FotoController');

const routes = express.Router();

//API

//Rotas Categoria
routes.get('/categoria', CategoriaController.listarTodos);
routes.get('/categoria/id/:id_categoria', CategoriaController.mostrarCategoria);
routes.post('/categoria/cadastrar', CategoriaController.cadastrar);
routes.delete('/categoria/deletar', CategoriaController.deletar);
routes.put('/categoria/atualizar', CategoriaController.atualizar);

//Rotas Produto
routes.get('/produto', ProdutoController.listarTodos);
routes.get('/produto/id/:id_produto', ProdutoController.mostrarProduto);
routes.get('/produto/categoria/:id_categoria', ProdutoController.listarProdutoCategoria);
routes.post('/produto/cadastrar', ProdutoController.cadastrar);
routes.delete('/produto/deletar', ProdutoController.deletar);
routes.put('/produto/atualizar', ProdutoController.atualizar);

//Rotas Foto
routes.get('/produto/fotos/:id_produto', FotoController.listarFotos);
routes.post('/produto/fotos/cadastrar', FotoController.cadastrar);
routes.delete('/produto/fotos/deletar', FotoController.deletar);
routes.put('/produto/fotos/atualizar', FotoController.atualizar);

module.exports = routes;