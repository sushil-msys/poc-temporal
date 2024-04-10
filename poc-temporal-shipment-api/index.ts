import express, { Request, Response } from "express";
import dotenv from "dotenv";
import  cookieParser  from 'cookie-parser';
import  cors  from 'cors';
import logger from './utils/logger';
import  routes  from './routes';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT;

/*
    Add to avoid cross origin access.
    Access-Control-Allow-Origin is set to '*' so that server REST APIs are accessible for all the domains.
    By setting domain name to some value, the API access can be restricted to only the mentioned domain.
    Eg, Access-Control-Allow-Origin: 'mywebsite.com'
*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-access-token,Content-Type");
  res.header("Access-Control-Expose-Headers", "x-access-token,Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Content-Type", 'application/json');
  next();
});

// catch 404 and forward to error handler
app.use('/', function (err:any, req:any, res:any, next:any) {
  res.status(err.status || 404).json({
    success: false,
    error: {
      message: "URL not found"
    }
  })
});

app.use(function (err:any, req:any, res:any, next:any) {
  logger.error("[app.ts] [error-handler]", err);
  res.status(500).json({
    success: false,
    error: {
      message: err.message
    }
  })
})
app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});


