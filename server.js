const express = require('express')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var mainRoutes = require('./routes/main')
const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://bhusan:aradhana1@ds251240.mlab.com:51240/node-pagination')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(mainRoutes)

app.set('view engine', 'ejs');

app.listen(8000, () => {
  console.log('server running on 8000');
});

