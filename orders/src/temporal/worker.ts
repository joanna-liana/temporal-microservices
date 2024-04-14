import { Worker } from '@temporalio/worker';

import * as activities from './activities';
import { placeOrderQueue } from './workflows';

async function run(): Promise<void> {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: placeOrderQueue,
    activities
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
