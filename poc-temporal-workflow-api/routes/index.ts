
import { Client } from '@temporalio/client';
import { placeOrder } from '../src/temporal-workflows/placeOrderWorkflow';
const client = new Client();
import express from 'express';
const routes = express.Router();
import {healthCheck} from './healthcheck'

//healthcheck
routes.get('/workflow-api/healthcheck',healthCheck);

// Order Module API
routes.post('/workflow-api/order', async function (req:any, res:any): Promise<void> {
    let orderData = req.body;
    await client.workflow.execute(placeOrder, {
      taskQueue: 'order-taskQueue',
      workflowId: 'Order-' + orderData.order_id, // TODO: remember to replace this with a meaningful business ID
      args: [orderData,process.env], // data need to pass args: [data object/string]
    });
    res.json({"message":"Your request has been registerd","orderId":orderData.order_id});
  });

export default routes;