const Produto = require('../../models/Produto');
const Foto = require('../../models/Foto');

module.exports = {
  async listarFotos(id_produto) {
    const fotos = await Foto.findAll({ where: { id_produto } });

    return fotos;
  }
};