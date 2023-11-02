var express = require('express');
var router = express.Router();

const {store, index, patchOrder, destroy}  = require('./../controllers/order.controller')


router.get('/',index)
router.post('/',store);
router.put('/:id', patchOrder);
router.delete('/:id',destroy);



module.exports = router;
