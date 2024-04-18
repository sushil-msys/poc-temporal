import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';
import { healthCheck } from './healthcheck';

//healthcheck
router.get('/backend-api/healthcheck',healthCheck);

// Order Module API
router.post('/backend-api/order', validations.token,api.create_order);
export default router;