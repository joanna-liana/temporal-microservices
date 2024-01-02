import { Request, Response } from 'express';

import { Order } from './order.entity';
import { OrdersService } from './orders.service';

export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.ordersService.create(req.body);

    res.status(201).send(order);
  }

  async get(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.ordersService.get(
      req.params.orderId as Order['id']
    );

    res.status(200).send(order);
  }

  async cancel(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.ordersService.cancel(
      req.params.orderId as Order['id']
    );

    res.status(204).send(order);
  }
}