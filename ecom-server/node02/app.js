var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var { errorHandler } = require('./middleware/error-handler')

//doteenv we use to make port dynamic
require('dotenv').config();
const authJwt = require('./middleware/auth-jwt')

var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var ordersRouter = require('./routes/orders')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authJwt());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler)

const version = process.env.VERSION

app.use(`${version}/products`, productsRouter);
app.use(`${version}/users`, usersRouter);
app.use(`${version}/categories`,categoriesRouter)
app.use(`${version}/orders`,ordersRouter)




module.exports = app;
