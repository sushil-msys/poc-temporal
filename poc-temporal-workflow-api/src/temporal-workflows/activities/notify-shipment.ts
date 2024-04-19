import { log } from '@temporalio/activity';
import axios from 'axios';
export async function notifyShipmentActivity(orderData: any,baseurl:string) {
  const res = await axios.post(baseurl+'/order',orderData);
  log.info('data from notifyShipment', { res });
  return `${'data received from notifyShipment'}!`;
}

export async function rollbackNotifyShipmentActivity(orderData: any,baseurl:string) {
  const res = await axios.delete(baseurl+'/order',orderData);
  log.info('data delete from notifyShipment', { res });
  return `${'data delete from notifyShipment'}!`;
}