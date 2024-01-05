import { Router } from 'express';

import { asyncWrapper } from './common/middleware/asyncWrapper';
import { PaymentsController } from './payments.controller';

export const paymentsRoutes = (controller: PaymentsController): Router => {
  const router = Router();

  router.post('', asyncWrapper(controller.create.bind(controller)));
  router.patch(
    '/:paymentId/pay',
    asyncWrapper(controller.pay.bind(controller))
  );
  router.patch(
    '/:paymentId/reject',
    asyncWrapper(controller.reject.bind(controller))
  );
  router.patch(
    '/:paymentId/cancel',
    asyncWrapper(controller.cancel.bind(controller))
  );
  router.patch(
    '/:paymentId/refund',
    asyncWrapper(controller.refund.bind(controller))
  );

  return router;
};
