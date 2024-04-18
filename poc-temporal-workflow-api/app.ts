import { Client } from '@temporalio/client';
import { placeOrder } from './src/temporal-workflows/placeOrderWorkflow';
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
  await client.workflow.execute(placeOrder, {
    taskQueue: 'order-taskQueue',
    workflowId: 'Order-' + orderData.order_id, // TODO: remember to replace this with a meaningful business ID
    args: [orderData,process.env], // data need to pass args: [data object/string]
  });
  res.json({"message":"Your request has been registerd","orderId":orderData.order_id});
});

const port = process.env.PORT;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);