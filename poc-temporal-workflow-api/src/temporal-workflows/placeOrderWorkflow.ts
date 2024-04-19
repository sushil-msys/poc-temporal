import { proxyActivities, sleep, log } from '@temporalio/workflow';
import type * as activities from './activities';

const { notifyShipmentActivity,notifyVendorActivity,rollbackNotifyShipmentActivity,rollbackNotifyVendorActivity } = proxyActivities<typeof activities>({
//scheduleToCloseTimeout: '5m',//maximum amount of time allowed for the overall Activity Execution.
//scheduleToStartTimeout: "60s",//maximum amount of time that is allowed from when an Activity Task is scheduled to when a Worker starts that Activity Task
  startToCloseTimeout: '30s', // recommended,is the maximum time allowed for a single Activity Task Execution.
  retry: {
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: 3,//Infinity
    maximumInterval: '10s',
    nonRetryableErrorTypes: [],
  },
});

//placeOrder Workflow
export  async function placeOrderWithoutRollback(orderData:any,baseurl:any):Promise<any> {
  log.info('placeOrderWorkflow initiated');
  const vendor =  await notifyVendorActivity(orderData,baseurl.VENDOR_API_URL);
  const shipment = await notifyShipmentActivity(orderData,baseurl.SHIPMENT_API_URL);
}

const STAGE_VENDOR =  'STAGE_VENDOR';
const STAGE_SHIPMENT =  'STAGE_SHIPMENT';
//placeOrder Workflow with transaction
export  async function placeOrder(orderData:any,baseurl:any):Promise<any> {
  log.info('placeOrderWorkflow initiated');
  try {
     await notifyVendorActivity(orderData,baseurl.VENDOR_API_URL);
  } catch (error) {
    recover(STAGE_VENDOR,orderData,baseurl.VENDOR_API_URL);
    return;
  }
  try {
     await notifyShipmentActivity(orderData,baseurl.SHIPMENT_API_URL);
  } catch (error) {
     recover(STAGE_VENDOR,orderData,baseurl.VENDOR_API_URL);
     recover(STAGE_SHIPMENT,orderData,baseurl.SHIPMENT_API_URL);
  }
}
async function  recover(stage:string,orderData:any,baseUrl:string){
  switch (stage) {
    case 'STAGE_VENDOR':
      return await rollbackNotifyVendorActivity(orderData,baseUrl);
    case 'STAGE_SHIPMENT':
      return await rollbackNotifyShipmentActivity(orderData,baseUrl);
  }
}