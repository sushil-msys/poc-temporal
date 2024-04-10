"use strict";
import { IFullOrder,Iorder } from '../../interface';
import logger from '../../utils/logger';
export const  createOrder   = async (data:IFullOrder) =>{
    logger.info('web | router | api  | orders | controller | createOrder');
    let randomInt = Math.floor(Math.random() * 1000000);
    data.order_id = "ORDER-"+randomInt;   
    return data;
}