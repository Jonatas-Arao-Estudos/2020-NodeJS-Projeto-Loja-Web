const Categoria = require('../../models/Categoria');

module.exports = {
  async listarTodos() {
    const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });

    return categorias;
  },

  async cadastrar(req){

    try {
      const { categoriaNome } = req.body;
      await Categoria.create({ nome: categoriaNome });
    } catch (e) {
      return { error: 'Erro ao cadastrar' };
    }

    return { success: 'Cadastrado com sucesso' };

  },

  async deletar(req){
    const { excluirIDcategoria } = req.body;

    const verifica = await Categoria.findByPk(excluirIDcategoria);

    if (!verifica) {
      return { error: 'Categoria não encontrada' };
    }

    try {
      await Categoria.destroy({
        where: {
          id: excluirIDcategoria
        }
      });
    } catch (e){
      return { error: 'Erro ao deletar' };
    }

    return { success: 'Categoria Deletada' };

  },

  async atualizar(req){

    const { categoriaNome, categoriaId } = req.body;

    const verifica = await Categoria.findByPk(categoriaId);

    if (!verifica) {
      return { error: 'Categoria não encontrada' };
    }

    try {
      await Categoria.update({
        nome: categoriaNome
      }, {
        where: {
          id: categoriaId
        }
      });
    } catch (error) {
      return { error: 'Erro ao atualizar' };
    }

    return { success: 'Categoria Atualizada' };

  }
};