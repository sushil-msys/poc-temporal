import { Worker } from '@temporalio/worker';
import * as activities from './temporal-workflows/activities/order';

async function run() {
  // Step 1: Register Workflows and Activities with the Worker and connect to
  // the Temporal server.
  const worker = await Worker.create({
    workflowsPath: require.resolve('./temporal-workflows/placeOrderWorkflow'),
    activities,
    taskQueue: 'order-taskQueue',
  });
  // Worker connects to localhost by default and uses console.error for logging.
  // Customize the Worker by passing more options to create():
  
  // Step 2: Start accepting tasks on the `order-taskQueue` queue
  await worker.run();

  // You may create multiple Workers in a single process in order to poll on multiple task queues.
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});