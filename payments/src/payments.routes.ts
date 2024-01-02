import { Router } from 'express';

import { PaymentsController } from './payments.controller';

export const paymentsRoutes = (controller: PaymentsController): Router => {
  const router = Router();

  router.post('', controller.create.bind(controller));
  router.patch('/:orderId/pay', controller.pay.bind(controller));
  router.patch('/:orderId/reject', controller.reject.bind(controller));
  router.patch('/:orderId/cancel', controller.cancel.bind(controller));
  router.patch('/:orderId/refund', controller.refund.bind(controller));

  return router;
};
