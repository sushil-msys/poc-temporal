import {createOrder } from './controller'
import axios from 'axios';
import logger from '../../utils/logger';


export const create_order = async (req:any, res:any) => {
      return createOrder(req.body).then(async(results) => {
      if (results) {
        logger.info('api  | order | createOrder');
        const response = await axios.post(process.env.TEMPORAL_BASE_URL+'/order',results);
        return res.status(200).json(response.data);
      }
  })
};