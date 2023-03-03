const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const {Media} = require('../models');
const fs = require('fs');

class mediaController{
  static postMedia(req, res){
    try {
      const { image } = req.body;
      if(!isBase64(image, {mimeRequired: true})){
        return res.status(400).json({
          status: 'error',
          message: 'invalid base64'
        })
      }

      base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
        if(err){
          return res.status(400).json({
            status: 'error',
            message: err.message
          })
        }
        // pisahkan public\images\<nama file> menjadi ['public', 'images','<nama file>']. selanjutnya di pop() artinya menghapus array terahir dan yang di return adalah array yang dihapus
        console.log(filepath);
        const filename = filepath.split("\\").pop();

        const media = await Media.create({
          image: `images/${filename}`
        });


        return res.status(201).json({
          status: 'success',
          data: {
            id: media.id,
            image: `${req.get('host')}/images/${filename}`
          }
        })
      })
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getMedia (req, res){
    try {
      const media = await Media.findAll({
        attributes: ['id', 'image']
      });
      const mappedMedia = media.map((m) => {
        m.image = `${req.get('host')}/${m.image}`
        return m;
      });

      return res.status(200).json({
        status: 'success',
        data: mappedMedia
      })
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async deleteMedia (req, res) {
    try {
      const {id} = req.params;
      const mediaId = await Media.findByPk(id);
      if(!mediaId){
        return res.status(404).json({
          status: 'failed',
          message: 'media not found'
        })
      }
      fs.unlink(`./public/${mediaId.image}`, async (err) => {
        if(err){
          return res.status(400).json({
            status: 'error',
            message: err.message
          })
        }
      })
      await Media.destroy({
        where:{
          id
        }
      })
      return res.status(200).json({
        status: 'success',
        message: 'Delete successfully'
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = mediaController;