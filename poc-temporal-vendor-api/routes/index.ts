import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';


router.get('/vendor-api/order', async function (req:any, res:any): Promise<void> {
    res.send("i am get /vendor-api/order");
  })
// Order Module API
router.post('/vendor-api/order', validations.token, api.orders.create_order);


export default router;