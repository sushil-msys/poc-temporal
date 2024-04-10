"use strict";
import {createOrder } from './controller'
import axios from 'axios';
//import * as temporalClient from '../../temporal-client'
import logger from '../../utils/logger';
/* With temporal client
export const create_order = async (req:any, res:any) => {
      return createOrder(req.body).then((results) => {
      if (results) {
        logger.info('api  | order | createOrder');
        try {
          const result =  temporalClient.runWorkflow(results)
          .catch((err: Error) => {
          console.error(err);
          process.exit(1);
        });
        return res.status(200).json({
          success: true,
          results:results
        });
      } catch (err) {
        res.status(500).send(err);
      } 
    }
    }).catch((error:any) => {
      logger.error('api  | order | createOrder | ::', error);
      return res.status(400).json({
        success: false,
        error: {
          message: "Internal server error"
        }
      });
    });
};
*/ 
//With temporal routes
const temporalUrl = "http://localhost:3130/api/orders";
export const create_order = async (req:any, res:any) => {
      return createOrder(req.body).then(async(results) => {
      if (results) {
        logger.info('api  | order | createOrder');
        const response = await axios.post(temporalUrl+'/create-order',results);
        return res.status(200).json(response.data);
      }
  })
};

