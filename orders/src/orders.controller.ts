import { Client, WorkflowIdReusePolicy } from '@temporalio/client';
import { Request, Response } from 'express';

import { Order } from './order.entity';
import { CreateOrderDto, OrdersService } from './orders.service';
import { placeOrderQueue, PlaceOrderWorkflow } from './temporal/workflows';

export class OrdersController {
  constructor(
    private readonly temporalClient: Client,
    private readonly ordersService: OrdersService
  ) {}

  async create(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { orderId } = req.body as CreateOrderDto;

    const handle = await this.temporalClient.workflow.start(
      PlaceOrderWorkflow,
      {
        args: [req.body],
        taskQueue: placeOrderQueue,
        workflowId: `place-order-${orderId}`,
        workflowIdReusePolicy:
        // eslint-disable-next-line max-len
        WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
      }
    );

    const order = await handle.result();

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
