const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const api = require('./src/server/routes/api');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', api);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const port = process.env.PORT || '3000';
app.set('port', port);
var privateKey = fs.readFileSync( 'smartsdkitesm.key.pem' );
var certificate = fs.readFileSync( 'smartsdkitesm.crt.pem' );
const server = https.createServer({
  key: privateKey,
  cert: certificate
}, app);
server.listen(port, function(){console.log('API running on localhost:${port}')});
