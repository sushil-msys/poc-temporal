'use strict';
import  path  from 'path';
import logger from '../utils/logger';
export const token   = (req:any, res:any, next:any) =>{
  console.log(" I am Middleware");
  next();
    /*
    let urlPath,
        authorization;
    if(req.headers && req.headers.authorization){
      authorization = req.headers.authorization;
    }
    else{
      logger.error(` middleware | auth | token | verifyToken | Invalid authorization header ${urlPath}`);
        return res.status(400).send({
          success: false,
          error: {
            code: unauthorizedCode,
            message: "Invalid authorization header"
          }
        });
     }
   */  
}
