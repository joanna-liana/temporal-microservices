import { Router } from 'express';

import { PaymentsController } from './payments.controller';

export const paymentsRoutes = (controller: PaymentsController): Router => {
  const router = Router();

  router.post('', controller.create.bind(controller));
  router.patch('/:paymentId/pay', controller.pay.bind(controller));
  router.patch('/:paymentId/reject', controller.reject.bind(controller));
  router.patch('/:paymentId/cancel', controller.cancel.bind(controller));
  router.patch('/:paymentId/refund', controller.refund.bind(controller));

  return router;
};
