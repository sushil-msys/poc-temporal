import express from 'express';
import dotenv from "dotenv";
const cors = require('cors');
import bodyParser from 'body-parser'
import http from 'http';
import  routes  from './routes';

dotenv.config();
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
app.use('/', routes);

const port = process.env.PORT;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);