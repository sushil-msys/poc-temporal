import { log } from '@temporalio/activity';
import axios from 'axios';
export async function notifyVendorActivity(orderData: any) {
  const res = await axios.post('http://localhost:3401/api/vendor/create-order',orderData);
  log.info('data from notifyVendor', { res });
  return `${res}!`;
}