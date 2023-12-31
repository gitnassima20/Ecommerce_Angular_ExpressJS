var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const{ validateProduct } = require('./../middleware/product.middleware');
const {show, products, store, updateAll, updateSome, remove, search, uploadImages}  = require('./../controllers/product.controller')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const ALLOWED_IMAGE = {
            'image/png':'png',
            'image/jpeg':'jpeg',
            'image/jpg':'jpg',
        }
        error = null;
        
        if(!ALLOWED_IMAGE[file.mimetype]){
            error = new Error('FileError')
        }
      cb(error, `${__dirname}/../public/images`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })


/* GET home page. */
router.get('/',products);
/* SEARCH product */
router.get('/search',search)
/*GET only product*/ 
router.get('/:id',show);
/*POST product*/
router.post('/',[upload.single('thumbnail'),validateProduct],store);
router.put('/:id/images',[upload.array('image'),validateProduct],uploadImages);
/*UPDATE product */
router.put('/:id',updateAll)
router.patch('/:id',[upload.single('thumbnail')],updateSome)
/*DELETE product*/
router.delete('/:id',remove)


module.exports = router;
