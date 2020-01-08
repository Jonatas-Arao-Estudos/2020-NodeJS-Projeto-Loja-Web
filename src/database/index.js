const Sequelize = require('sequelize');
const dbConfig = require('../../config/database');

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(() => {
    console.log('Conexão Estabelecida com o Banco de dados.');
  })
  .catch(err => {
    console.error('Não foi possivel se conectar:', err);
  });

module.exports = connection;