import { Router } from 'express';

import { asyncWrapper } from './common/middleware/asyncWrapper';
import { OrdersController } from './orders.controller';

export const ordersRoutes = (controller: OrdersController): Router => {
  const router = Router();

  router.get('/:orderId', asyncWrapper(controller.get.bind(controller)));
  router.delete('/:orderId', asyncWrapper(controller.cancel.bind(controller)));
  router.post('', asyncWrapper(controller.create.bind(controller)));

  return router;
};
