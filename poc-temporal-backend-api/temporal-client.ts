import { Connection, Client } from '@temporalio/client';
import { notifyShipment, notifyVendor } from '../poc-temporal-server/src/temporal-workflows/all-workflows';



export async function runWorkflow(orderData:any): Promise<string> {
  const connection = await Connection.connect(); // Connect to localhost with default ConnectionOptions.
  const client = new Client({
    connection,
  });
  const result = await client.workflow.execute(notifyShipment, {
    taskQueue: 'order-taskQueue',
    workflowId: 'notify-shipment-' + orderData.order_id, // TODO: remember to replace this with a meaningful business ID
    args: [orderData], // data need to pass args: [data object/string]
  });
  // Starts the `vendor-workflow` , don't wait for it to complete
  await client.workflow.start(notifyVendor, {
    taskQueue: 'order-taskQueue',
    workflowId: 'notify-vendor-' + orderData.order_id, 
    args: [orderData], // data need to pass args: [data object/string]
  });
  console.log(result); 
  return result;
}