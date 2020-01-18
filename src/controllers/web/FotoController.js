const path = require('path');
const fs = require('fs');
const Produto = require('../../models/Produto');
const Foto = require('../../models/Foto');

module.exports = {
  async listarFotos(id_produto) {
    const fotos = await Foto.findAll({ where: { id_produto } });

    return fotos;
  },

  async cadastrar(err, fields, files){
    if(files.produtoFoto.type.startsWith('image')){

      const { nomeFotoId } = fields;

      const produto = await Produto.findByPk(nomeFotoId);

      if (!produto) {
        return { error: 'Produto não encontrado' };
      }

      try{
        var oldpath = files.produtoFoto.path;
        var newdir = path.join(__dirname, '../..') + "\\public\\img\\" + produto.id + "\\";
        var newpath = newdir + files.produtoFoto.name;
        if (!fs.existsSync(newdir)){
          fs.mkdirSync(newdir);
        }
        fs.rename(oldpath, newpath, async function (err) {
          if (err) throw err;
          const dir = "img/"+ produto.id + "/" + files.produtoFoto.name;
          await Foto.create({
            foto: dir,
            id_produto: produto.id
          });
        });
      } catch (e){
        return { error: 'Erro ao cadastrar' };
      }

      return { success: 'Foto Cadastrada' };
    }else{
      return { error: 'Formato Inválido' };
    }

  },

  async deletar(req){
    const { id } = req.body;

    const verifica = await Foto.findByPk(id);

    if (!verifica) {
      return { error: 'Foto não encontrada' };
    }

    try{
      const foto = await Foto.destroy({
        where: {
          id
        }
      });
    } catch (e){
      return { error: 'Erro ao deletar' };
    }

    return { success: 'Foto Deletada'};
  }
};