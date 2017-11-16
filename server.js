console.log('node server start');
const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const router = express.Router();
// var forceSsl = require('express-force-ssl');

// var options = {
//   key  : fs.readFileSync('/cert/cert.key'),
//   cert : fs.readFileSync('/cert/cert.crt')
// };
// Get our API routes
const api = require('./api');

const app = express();
app.set('trust proxy', true);

// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({"error": message});
// }

// app.use(function (req, res, next){
//   console.log("https redirect");
//   if (req.headers['x-forwarded-proto'] === 'https') {
//     res.redirect('http://' + req.hostname + req.url);
//   } else {
//     next();
//   }
// });

// app.use(
// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   console.log("https redirect");
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// });
// app.get('/*', function(req, res, next) {
//   console.log("www repalce");
//   if (req.headers.host.match(/^www/) !== null ) {
//     res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
//   } else {
//     next();     
//   }
// })

app.use(function(req, res, next) {
  //set headers to allow cross origin request.
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      // res.header('Access-Control-Allow-Credentials', 'true');
      
      next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes
// app.post("/api/authenticate", function(req, res) {
//   console.log("/api/authenticate");
//   console.log(req.body);
//   res.send({ status: 'SUCCESS' });
// });
app.use('/api', api);
// app.get('/.well-known/acme-challenge/:fileid', function(req, res){
//   console.log('well-known');
//   console.log(req.params);
//   console.log(req.params.fileid);
//   console.log(path.join(__dirname, '.well-known/acme-challenge/'+req.params.fileid));
//   res.sendFile(path.join(__dirname, '.well-known/acme-challenge/'+req.params.fileid));
// })

// app.use('/.well-known/acme-challenge', express.static(__dirname + 'cert'));
// Catch all other routes and return the index file
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
//const server = https.createServer(options, app);
// https.createServer(
//   lex.httpsOptions, 
//   middlewareWrapper(app)
// ).listen(433);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));