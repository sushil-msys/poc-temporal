
import { log } from '@temporalio/activity';
import axios from 'axios';
export async function notifyShipmentActivity(orderData: any) {
  const res = await axios.post('http://localhost:3402/api/shipment/create-order',orderData);
  log.info('data from notifyShipment', { res });
  return `${res}!`;
}