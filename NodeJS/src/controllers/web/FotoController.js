const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const Produto = require('../../models/Produto');
const Foto = require('../../models/Foto');

module.exports = {
  async listarFotos(req, res, next) {
    const { produtos } = res.locals;

    const produtosFotos = await produtos.docs.map(async function( produto ) {
      consulta = await Foto.findAll({ where: { id_produto: produto.id } });
      var foto = consulta;
      try{
        return { url: foto[0].foto, id: produto.id } ;
      }
      catch{
        return { url: "https://www.layoutit.com/img/people-q-c-600-200-1.jpg", id: produto.id } ;
      }
    });

    await Promise.all(produtosFotos).then(function(values) {
      res.locals.fotos = values;
    });

    next();
  },

  async cadastrar(req, res, next){
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if(files.produtoFoto.type.startsWith('image')){
        const { nomeFotoId } = fields;

        if(nomeFotoId){
          const produto = await Produto.findByPk(nomeFotoId);

          if (!produto) {
            res.locals.resposta = 'Produto não encontrado';
          }

          try{
            var oldpath = files.produtoFoto.path;
            var newdir = path.join(__dirname, '../..') + "/public/img/" + produto.id + "/";
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
            res.locals.resposta = 'Erro ao cadastrar';
          }

          res.locals.resposta = 'Foto Cadastrada';
        }else{
          res.locals.resposta = 'Formato Inválido';
        }
      }
    });

    next();
  }
};