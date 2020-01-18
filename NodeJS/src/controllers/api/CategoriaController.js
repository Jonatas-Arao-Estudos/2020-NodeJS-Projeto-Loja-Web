const Categoria = require('../../models/Categoria');

module.exports = {
  async listarTodos(req, res) {
    const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

    return res.json(categorias);
  },

  async mostrarCategoria(req, res) {
    const { id_categoria } = req.params;
    const categoria = await Categoria.findByPk(id_categoria);

    if (!categoria) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    return res.json(categoria);
  },

  async cadastrar(req, res){
    const { nome } = req.body;

    const categoria = await Categoria.create({ nome });

    return res.json(categoria);
  },

  async deletar(req, res){
    const { id } = req.body;

    const verifica = await Categoria.findByPk(id);

    if (!verifica) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const categoria = await Categoria.destroy({
      where: {
        id
      }
    });

    return res.json({ success: 'Categoria Deletada'});
  },

  async atualizar(req, res){
    const { id, nome } = req.body;

    const verifica = await Categoria.findByPk(id);

    if (!verifica) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const categoria = await Categoria.update({
      nome
    }, {
      where: {
        id
      }
    });

    return res.json({ success: 'Categoria Atualizada'});
  }
};