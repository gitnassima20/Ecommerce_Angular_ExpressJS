var express = require('express');
var router = express.Router();

const { validateUser} = require('./../middleware/user.middleware')
//Import method  from user controller
const {index, register, login, getOrders} = require('./../controllers/user.controller')

router.get('/',index);
router.post('/register',validateUser,register)
router.post('/login',login)
router.get('/:id/orders',getOrders)

module.exports = router;
