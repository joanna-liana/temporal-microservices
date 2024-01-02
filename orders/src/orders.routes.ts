import { Router } from 'express';

import { OrdersController } from './orders.controller';

export const ordersRoutes = (controller: OrdersController): Router => {
  const router = Router();

  router.get('/:orderId', controller.get.bind(controller));
  router.delete('/:orderId', controller.cancel.bind(controller));
  router.post('', controller.create.bind(controller));

  return router;
};
