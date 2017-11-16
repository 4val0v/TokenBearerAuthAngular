const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require('crypto');

// var con = mysql.createConnection({
//   host: "us-cdbr-iron-east-05.cleardb.net",
//   user: "b3717d46696035",
//   password: "a6633917",
//   database: "heroku_af893d92145d99c"
// });
const pool = mysql.createPool({
  connectionLimit : 5,
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b3717d46696035",
  password: "a6633917",
  database: "heroku_af893d92145d99c"
});



const storage = multer.diskStorage(
  {
      destination: './dist/uploads/',
      filename: function ( req, file, cb ) {
          //req.body is empty... here is where req.body.new_file_name doesn't exists
          cb( null, file.originalname );
      }
  }
);

var DIR = './dist/uploads/';
var upload = multer({ storage: storage }).single('photo');
// declare axios for making http requests


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts

router.post('/authenticate', function(request, response) {
  console.log('/api/authenticate');
  console.log(request.body);
  var token = jwt.sign({
    data: request.body
  }, 'secret', { expiresIn: '1h' });
  try {
    var decoded = jwt.verify(token, 'secret');
    console.log(decoded);
  } catch(err) {
    console.log(err);
  } 
  // if(decoded.exp < dateNow.getTime()) 
  // {
  //   response.send({ status: 'Expired', token: '' });
  // }
  let password = crypto.createHash('md5').update(request.body.password).digest('hex');
  let user = request.body.username;

  //response.send({ status: 'True', token: token });
  try {
    pool.getConnection(function(err, connection) {
      // Use the connection
      console.log("SELECT * from users where email ='" + user + "' and password = '" + password + "'");
      connection.query( "SELECT * from users where email ='" + user + "' and password = '" + password + "'", function(err, rows) {
        // Always release the connection back to the pool after the (last) query.
        connection.release();
        console.log(rows.length);
        if (rows.length == 1) {
          response.send({ status: 'Valid', token: token });
        } else {
          response.send({ status: 'InValid', token: '' });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/validatetoken', function(request, response) {
  console.log('/api/validatetoken');
  console.log(request.body);
  
  try {
    var decoded = jwt.verify(request.body.token, 'secret');
    console.log(decoded);
  } catch(err) {
    console.log(err);
    response.send({ status: 'Expired', token: '' });
  } 
  if(decoded.exp < new Date().getTime()) 
  {
    console.log('valid');
    response.send({ status: 'Valid' });
  } else {
    console.log('expired');
    response.send({ status: 'Expired' });
  }
});

///api/authenticate

router.get('/products', (request, response) => {
  console.log('/products');
  try {
    pool.getConnection(function(err, connection) {
      // Use the connection
      connection.query( 'SELECT * from products', function(err, rows) {
        console.log('/products before release');
        // Always release the connection back to the pool after the (last) query.
        connection.release();
        console.log('/products after release');
        // Don't use the connection here, it has been returned to the pool.
        if (err) {
          console.log('/products error');
          console.log('error: ', err);
          throw err;
        }
        // con.end();
        console.log('/products send');
        // console.log(rows);
        response.send(rows);

      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get('/products/:id', (request, response) => {
  try {
    pool.getConnection(function(err, connection) {
      connection.query( 'SELECT * from productsdata where link = "' + request.params.id +  '"' , function(err, rows) {
        connection.release();
        if (err) {
          throw err;
        }
        response.send(rows);

      });
    });
  } catch (err) {
  }
});
router.get('/news', (request, response) => {
  try {
    pool.getConnection(function(err, connection) {
      connection.query( 'SELECT * from newsdata order by data desc limit 16' , function(err, rows) {
        connection.release();
        if (err) {
          throw err;
        }
        response.send(rows);
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/upload', function (req, res, next) {
  // req.file.filename = req.file.originalname;
  // req.file.path = req.file.destination + req.file.originalname;
  // console.log(req);
  // console.log(res);
    console.log('upload start');
    var path = '';
    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }  
      // No error occured.
      path = req.file.path;
      console.log('upload completed');
      return res.send("Upload Completed for "+path); 
    });     
})
module.exports = router;