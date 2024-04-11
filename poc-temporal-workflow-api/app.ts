import { Client } from '@temporalio/client';
import { notifyShipment, notifyVendor } from './src/temporal-workflows/all-workflows';
const client = new Client();
import express from 'express';
import dotenv from "dotenv";
const cors = require('cors');
import bodyParser from 'body-parser'
import http from 'http';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
app.use(cors());

app.get('/workflow-api/order', async function (req:any, res:any): Promise<void> {
  res.send("i am /workflow-api/order");
})
app.post('/workflow-api/order', async function (req:any, res:any): Promise<void> {
  let orderData = req.body;
  await client.workflow.execute(notifyShipment, {
    taskQueue: 'order-taskQueue',
    workflowId: 'notify-shipment-' + orderData.order_id, // TODO: remember to replace this with a meaningful business ID
    args: [orderData,process.env.SHIPMENT_API_URL], // data need to pass args: [data object/string]
  });
  // Starts the `vendor-workflow` , don't wait for it to complete
  await client.workflow.start(notifyVendor, {
    taskQueue: 'order-taskQueue',
    workflowId: 'notify-vendor-' + orderData.order_id, 
    args: [orderData,process.env.VENDOR_API_URL], // data need to pass args: [data object/string]
  });
  res.json({"message":"Your request has been registerd","payload":orderData});
});

const port = process.env.PORT;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);