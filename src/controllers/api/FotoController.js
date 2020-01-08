const Foto = require('../../models/Foto');

module.exports = {
  async listarFotos(req, res) {
    const { id_produto } = req.params;
    const fotos = await Foto.findAll({ where: { id_produto } });

    return res.json(fotos);
  }
};