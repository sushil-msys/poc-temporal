"use strict";
import path from 'path';
import logger from '../../utils/logger';
export const  createOrder   = async (data:any) =>{
  console.log(" I am createOrder Controller");
    logger.info('web | router | api  | orders | controller | createOrder', data);
    return data;
}