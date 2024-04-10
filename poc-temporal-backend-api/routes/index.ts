import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';



// Order Module API
router.post('/api/orders/create-order', validations.token,api.create_order);
export default router;