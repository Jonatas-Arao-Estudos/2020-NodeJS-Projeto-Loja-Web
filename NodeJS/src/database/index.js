const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');

const Categoria = require('../models/Categoria');
const Foto = require('../models/Foto');
const Produto = require('../models/Produto');

const connection = new Sequelize(dbConfig);

Categoria.init(connection);
Produto.init(connection);
Foto.init(connection);

Categoria.associate(connection.models);
Produto.associate(connection.models);
Foto.associate(connection.models);

module.exports = connection;