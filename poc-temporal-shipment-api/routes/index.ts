import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';
import {healthCheck} from './healthcheck'

//healthcheck
router.get('/shipment-api/healthcheck',healthCheck);

// Order Module API
router.post('/shipment-api/order', validations.token, api.orders.create_order);


export default router;