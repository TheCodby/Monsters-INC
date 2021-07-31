const express = require("express");
const morgan = require('morgan')
const bodyParser = require("body-parser");
const app = express();

const employeesRoutes = require("./api/routes/employees");
const accRoutes = require("./api/routes/accounts");


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS")
    {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).json({})
    }
    next();
});

//Routes
app.use('/employees', employeesRoutes)
app.use('/account', accRoutes)

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})
/*app.use(async(req, res, next) => {
    db = DBconnection.getDb()
    let monostersData = await db.collection( 'employees' ).find({}).toArray((err, r) => {
      res.header("Content-Type",'application/json');
      res.status(200).json(r);
    })
  })*/
module.exports = app;