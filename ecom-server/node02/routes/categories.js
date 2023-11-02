var express = require('express');
var router = express.Router();

const {validateCategory} = require('../middleware/category.middleware')
const {show,categories,store,updateAll,updateSome,remove}  = require('./../controllers/category.controller')
/* GET home page. */
router.get('/',categories);

/*GET only product*/ 
router.get('/:id',show);
/*POST product*/
router.post('/',validateCategory,store);
/*UPDATE product */
router.put('/:id',validateCategory,updateAll)
router.patch('/:id',validateCategory,updateSome)
/*DELETE product*/
router.delete('/:id',remove)

module.exports = router;
