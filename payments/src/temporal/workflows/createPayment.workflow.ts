import { proxyActivities } from '@temporalio/workflow';

import type * as activities from '../activities';

const { createPendingPayment } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '10 seconds',
});

export async function CreatePaymentWorkflow(args: unknown): Promise<string> {
  console.log('CreatePaymentWorkflow workflow args', args);

  await createPendingPayment();

  return 'PAYMENT CREATED!';
}

// export const createPaymentQueue = 'create-payment-taskqueue';
