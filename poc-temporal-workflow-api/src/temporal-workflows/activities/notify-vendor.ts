import { log } from '@temporalio/activity';
import axios from 'axios';

export async function notifyVendorActivity(orderData: any,baseurl:string) {
  const res = await axios.post(baseurl+'/order',orderData);
  log.info('data received from notifyVendor', { res });
  return `${'data received from notify Vendor'}!`;
}

export async function rollbackNotifyVendorActivity(orderData: any,baseurl:string) {
  const res = await axios.delete(baseurl+'/order',orderData);
  log.info('delete from notifyVendor', { res });
  return `${'delete from notifyVendor'}!`;
}