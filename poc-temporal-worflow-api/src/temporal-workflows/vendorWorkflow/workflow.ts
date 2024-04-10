import { proxyActivities, sleep, log } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities/notify-vendor';

const { notifyVendorActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function notifyVendor(orderData:any,baseurl:any): Promise<any> {
  log.info('vendorWorkflow initiated');
  const data = await notifyVendorActivity(orderData,baseurl);
  await sleep(100);
  return {"message":`The request is registred!`,data}
}