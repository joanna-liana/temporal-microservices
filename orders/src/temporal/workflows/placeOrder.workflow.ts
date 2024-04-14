import { proxyActivities } from '@temporalio/workflow';

import type * as activities from '../activities';

const {
  reserveItems,
  saveOrder,
} = proxyActivities<
  typeof activities & { createPendingPayment: () => Promise<void> }
    >({
      startToCloseTimeout: '30 seconds',
    });

const { createPendingPayment } = proxyActivities({
  startToCloseTimeout: '10 seconds',
  taskQueue: 'create-payment-taskqueue'
});

export async function PlaceOrderWorkflow(args: unknown): Promise<string> {
  console.log('PlaceOrderWorkflow workflow args', args);

  await reserveItems();
  await saveOrder();
  await createPendingPayment();

  return 'ORDER PLACED!';
}

export const placeOrderQueue = 'place-order-taskqueue';
