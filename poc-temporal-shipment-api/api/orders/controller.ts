import logger from '../../utils/logger';
export const  createOrder   = async (data:any) =>{
    logger.info('router | api  | orders | controller | createOrder', data);
    return data;
}