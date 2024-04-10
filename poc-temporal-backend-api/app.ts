// #!/usr/bin/env node
import express from 'express';
const cors = require('cors');
import bodyParser from 'body-parser'
import  router  from './routes';

import http from 'http';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
app.use(cors());
app.use('/', router);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "x-access-token,Content-Type");
//   res.header("Access-Control-Expose-Headers", "x-access-token,Content-Type");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Content-Type", 'application/json');
//   next();
// });
const port = 4000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);