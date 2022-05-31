var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload')
var productRouter = require('./routes/route.product');
var usersRouter = require('./routes/route.categorie');
var categorieRouter =  require("./routes/route.categorie");
var orderRouter = require('./routes/route.order');
const cors = require('cors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const db = require("./models");
app.listen(3003)
app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: true
  })
)
app.get('/Upload/*:filename*', (req, res) => {
  console.log(__dirname)
  res.sendFile(
    path.join(__dirname, './Upload', req.path.substring(8, req.path.length))
  )
})

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Methods",
     "GET, POST, OPTIONS, PUT, DELETE , PATCH"
   );
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

app.use("/products",productRouter)
app.use("/categories",categorieRouter)
app.use("/order",orderRouter)
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
module.exports = app;
