import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';



// Order Module API
router.post('/api/shipment/create-order', validations.token, api.orders.create_order);


export default router;