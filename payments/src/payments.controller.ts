import { Request, Response } from 'express';

import { Payment } from './payment.entity';
import { PaymentsService } from './payments.service';

export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.paymentsService.create(req.body);

    res.status(201).send(order);
  }

  async pay(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.paymentsService.pay(
      req.params.orderId as Payment['id']
    );

    res.status(204).send(order);
  }

  async cancel(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.paymentsService.cancel(
      req.params.orderId as Payment['id']
    );

    res.status(204).send(order);
  }

  async reject(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.paymentsService.reject(
      req.params.orderId as Payment['id']
    );

    res.status(204).send(order);
  }

  async refund(
    req: Request,
    res: Response,
  ): Promise<void> {
    const order = await this.paymentsService.refund(
      req.params.orderId as Payment['id']
    );

    res.status(204).send(order);
  }
}
