import {createOrder } from './controller'
import logger from '../../utils/logger';

export const create_order = async (req:any, res:any) => {
      return createOrder(req.body).then((result:any) => {
      if (result) {
        logger.info('router | api  | order | createOrder ');
        return res.status(200).json({
          success: true,
          data:result
        });
      }
    }).catch((error:any) => {
      logger.error('router | api  | order | createOrder | ::', error);
      return res.status(400).json({
        success: false,
        error: {
          message: "Internal server error"
        }
      });
    });
};