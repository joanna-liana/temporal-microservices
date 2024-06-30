import { proxyActivities } from '@temporalio/workflow';

import { CreateOrderDto } from '../../orders.service';
import type { createActivities } from '../activities';

const {
  reserveItems,
  saveOrder,
} = proxyActivities<
  ReturnType<typeof createActivities> &
  { createPendingPayment: () => Promise<void> }
    >({
      startToCloseTimeout: '30 seconds',
      retry: {
        maximumAttempts: 3
      }
    });

const { createPendingPayment } = proxyActivities({
  startToCloseTimeout: '10 seconds',
  taskQueue: 'create-payment-taskqueue'
});

export async function PlaceOrderWorkflow(
  args: CreateOrderDto
): Promise<string> {
  console.log('PlaceOrderWorkflow workflow args', args);

  await reserveItems();
  await saveOrder(args);
  await createPendingPayment();

  return 'ORDER PLACED!';
}

export const placeOrderQueue = 'place-order-taskqueue';
