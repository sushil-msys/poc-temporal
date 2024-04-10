import { log } from '@temporalio/activity';
import axios from 'axios';

export async function notifyVendorActivity(orderData: any,baseurl:string) {
  const res = await axios.post(baseurl+'/order',orderData);
  log.info('data from notifyVendor', { res });
  return `${res}!`;
}