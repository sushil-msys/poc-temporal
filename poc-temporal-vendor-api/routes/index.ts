import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';
import { healthCheck } from './healthcheck';

//healthcheck
router.get('/vendor-api/healthcheck',healthCheck);

// Order Module API
router.post('/vendor-api/order', validations.token, api.orders.create_order);


export default router;