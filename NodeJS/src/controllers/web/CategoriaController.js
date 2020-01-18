const Categoria = require('../../models/Categoria');

module.exports = {
  async listarTodos(req, res, next) {
    const categorias = await Categoria.findAll({ order: [['nome', 'ASC']] });
    res.locals.categorias = categorias;
    next();
  },

  async cadastrar(req, res, next){
    const { categoriaId, categoriaNome, excluirIDcategoria} = req.body;

    if(!categoriaId && categoriaNome && !excluirIDcategoria){

    try {
      const { categoriaNome } = req.body;
      await Categoria.create({ nome: categoriaNome });
    } catch (e) {
      res.locals.resposta = 'Erro ao cadastrar';
    }

    res.locals.resposta = 'Cadastrado com sucesso' ;

    }
    next();

  },

  async deletar(req, res, next){
    const { categoriaId, categoriaNome, excluirIDcategoria} = req.body;

    if(!categoriaId && !categoriaNome && excluirIDcategoria){
      const verifica = await Categoria.findByPk(excluirIDcategoria);

      if (!verifica) {
        res.locals.resposta = 'Categoria não encontrada';

      }

      try {
        await Categoria.destroy({
          where: {
            id: excluirIDcategoria
          }
        });
      } catch (e){
        res.locals.resposta = 'Erro ao deletar';

      }

      res.locals.resposta = 'Categoria Deletada';
    }
    next();

  },

  async atualizar(req, res, next){
    const { categoriaId, categoriaNome, excluirIDcategoria} = req.body;

    if(categoriaId && categoriaNome && !excluirIDcategoria){
      const verifica = await Categoria.findByPk(categoriaId);

      if (!verifica) {
        res.locals.resposta = 'Categoria não encontrada';

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
        res.locals.resposta = 'Erro ao atualizar';

      }

      res.locals.resposta = 'Categoria Atualizada';
    }
    next();

  }
};