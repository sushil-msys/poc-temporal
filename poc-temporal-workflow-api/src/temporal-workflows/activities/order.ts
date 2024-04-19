
import { log } from '@temporalio/activity';
import axios from 'axios';
export async function notifyShipmentActivity(orderData: any,baseurl:string) {
  const res = await axios.post(baseurl+'/order',orderData);
  log.info('data from notifyShipment', { res });
  return `${res}!`;
}

export async function rollbackNotifyShipmentActivity(orderData: any,baseurl:string) {
  const res = await axios.delete(baseurl+'/order',orderData);
  log.info('data from notifyShipment', { res });
  return `${res}!`;
}
export async function notifyVendorActivity(orderData: any,baseurl:string) {
  const res = await axios.post(baseurl+'/order',orderData);
  log.info('data from notifyVendor', { res });
  return `${res}!`;
}

export async function rollbackNotifyVendorActivity(orderData: any,baseurl:string) {
  const res = await axios.delete(baseurl+'/order',orderData);
  log.info('data from notifyVendor', { res });
  return `${res}!`;
}