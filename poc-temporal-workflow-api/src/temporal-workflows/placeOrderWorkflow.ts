import { proxyActivities, sleep, log } from '@temporalio/workflow';
import type * as activities from './activities/order';


const { notifyShipmentActivity,notifyVendorActivity } = proxyActivities<typeof activities>({
//scheduleToCloseTimeout: '5m',//maximum amount of time allowed for the overall Activity Execution.
//scheduleToStartTimeout: "60s",//maximum amount of time that is allowed from when an Activity Task is scheduled to when a Worker starts that Activity Task
  startToCloseTimeout: '30s', // recommended,is the maximum time allowed for a single Activity Task Execution.
  retry: {
    initialInterval: '1s',
    backoffCoefficient: 2,
    maximumAttempts: Infinity,
    maximumInterval: '10s',
    nonRetryableErrorTypes: [],
  },
});

//placeOrder Workflow
export  async function placeOrder(orderData:any,baseurl:any):Promise<any> {
  log.info('placeOrderWorkflow initiated');
  const vendor =  await notifyVendorActivity(orderData,baseurl.VENDOR_API_URL);
  const shipment = await notifyShipmentActivity(orderData,baseurl.SHIPMENT_API_URL);
}