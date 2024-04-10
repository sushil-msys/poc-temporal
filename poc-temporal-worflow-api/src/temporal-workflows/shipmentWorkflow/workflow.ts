import { proxyActivities, sleep, log } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities/notify-shipment';


const { notifyShipmentActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});


export async function notifyShipment(orderData:any,baseurl:any): Promise<any> {
  log.info('shipmentWorkflow initiated');
  const data = await notifyShipmentActivity(orderData,baseurl);
  await sleep(100);
  return {"message":`The request is registred!`,data}
}