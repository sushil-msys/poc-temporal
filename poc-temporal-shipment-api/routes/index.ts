import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';

router.get('/shipment-api/order', async function (req:any, res:any): Promise<void> {
    res.send("i am get /shipment-api/order");
  })
// Order Module API
router.post('/shipment-api/order', validations.token, api.orders.create_order);


export default router;