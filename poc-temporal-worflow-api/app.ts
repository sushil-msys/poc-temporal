import { Client } from '@temporalio/client';
import { notifyShipment, notifyVendor } from './src/temporal-workflows/all-workflows';
const client = new Client();
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post('/api/orders/create-order', async function (req:any, res:any): Promise<void> {
  let orderData = req.body;
  await client.workflow.execute(notifyShipment, {
    taskQueue: 'order-taskQueue',
    workflowId: 'notify-shipment-' + orderData.order_id, // TODO: remember to replace this with a meaningful business ID
    args: [orderData], // data need to pass args: [data object/string]
  });
  // Starts the `vendor-workflow` , don't wait for it to complete
  await client.workflow.start(notifyVendor, {
    taskQueue: 'order-taskQueue',
    workflowId: 'notify-vendor-' + orderData.order_id, 
    args: [orderData], // data need to pass args: [data object/string]
  });
  res.json({"message":"Your request has been registerd","payload":orderData});
  //const handle =  await client.workflow.getHandle('activities-examples1');
  //handle.terminate();
});
app.listen(3130, function () {
  console.log('temporal server running!!');
});