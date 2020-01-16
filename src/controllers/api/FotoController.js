const Produto = require('../../models/Produto');
const Foto = require('../../models/Foto');

module.exports = {
  async listarFotos(req, res) {
    const { id_produto } = req.params;
    const fotos = await Foto.findAll({ where: { id_produto } });

    if(fotos.length == 0){
      return res.json([{
        "foto": "https://www.layoutit.com/img/people-q-c-600-200-1.jpg"
      }]);
    }

    return res.json(fotos);
  },

  async cadastrar(req, res){
    const { foto, id_produto } = req.body;

    const produto = await Produto.findByPk(id_produto);

    if (!produto) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    const fotos = await Foto.create({
      foto, id_produto
    });

    return res.json(fotos);
  },

  async deletar(req, res){
    const { id } = req.body;

    const verifica = await Foto.findByPk(id);

    if (!verifica) {
      return res.status(400).json({ error: 'Foto não encontrada' });
    }

    const foto = await Foto.destroy({
      where: {
        id
      }
    });

    return res.json({ success: 'Foto Deletada'});
  },

  async atualizar(req, res){
    const { id, foto, id_produto } = req.body;

    const verifica = await Foto.findByPk(id);

    if (!verifica) {
      return res.status(400).json({ error: 'Foto não encontrada' });
    }

    const produto = await Produto.findByPk(id_produto);

    if (!produto) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    const fotos = await Foto.update({
      foto, id_produto
    }, {
      where: {
        id
      }
    });

    return res.json({ success: 'Foto Atualizada'});
  }
};