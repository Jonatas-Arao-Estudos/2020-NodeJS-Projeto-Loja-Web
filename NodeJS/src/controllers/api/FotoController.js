const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const Produto = require('../../models/Produto');
const Foto = require('../../models/Foto');

module.exports = {
  async listarFotos(req, res) {
    const { id_produto } = req.params;

    const produto = await Produto.findByPk(id_produto);

    if (!produto) {
      return res.status(400).json({ error: 'Produto não encontrado' });
    }

    const fotos = await Foto.findAll({ where: { id_produto } });

    if(fotos.length == 0){
      return res.json([{
        "foto": "https://www.layoutit.com/img/people-q-c-600-200-1.jpg"
      }]);
    }

    return res.json(fotos);
  },

  async cadastrar(req, res){

    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if(files.foto.type.startsWith('image')){
        const { id_produto } = fields;

        const produto = await Produto.findByPk(id_produto);
    
        if (!produto) {
          return res.status(400).json({ error: 'Produto não encontrado' });
        }

        var oldpath = files.foto.path;
        var newdir = path.join(__dirname, '../..') + "/public/img/" + produto.id + "/";
        var newpath = newdir + files.foto.name;
        if (!fs.existsSync(newdir)){
          fs.mkdirSync(newdir);
        }
        fs.rename(oldpath, newpath, async function (err) {
          if (err) throw err;
          const foto = "img/"+ produto.id + "/" + files.foto.name;  
          const fotos = await Foto.create({
            foto, id_produto
          });  
          return res.json(fotos);
        });
      }
    });
  }
};