import { Worker } from '@temporalio/worker';

import { setUpORM } from '../app';
import { OrdersService } from '../orders.service';
import * as activities from './activities';
import { placeOrderQueue } from './workflows';

async function run(): Promise<void> {
  const orm = await setUpORM();
  const ordersService = new OrdersService(orm.em);


  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: placeOrderQueue,
    activities: activities.createActivities(ordersService)
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
