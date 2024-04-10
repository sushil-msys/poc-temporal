import  express  from 'express';
const router = express.Router();
import api from '../api';
import validations from '../middleware';

router.get('/backend-api/order', async function (req:any, res:any): Promise<void> {
    res.send("i am get /backend-api/order");
  })

// Order Module API
router.post('/backend-api/order', validations.token,api.create_order);
export default router;