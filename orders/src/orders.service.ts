import { wrap } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

import { Order, OrderStatus } from './order.entity';

export type CreateOrderDto = {
  products: string[];
  createdBy: string;
};

export class OrdersService {
  constructor(private readonly entityManager: EntityManager) {}

  private get ordersRepository(): EntityRepository<Order> {
    return this.entityManager.fork().getRepository(Order);
  }

  async cancel(orderId: Order['id']): Promise<void> {
    const order = await this.ordersRepository.findOneOrFail({
      id: orderId
    });

    wrap(order).assign({
      id: orderId,
      status: OrderStatus.Cancelled
    });

    await this.ordersRepository.upsert(order);
    await this.entityManager!.flush();
  }

  async get(orderId: Order['id']): Promise<Order> {
    const order = await this.ordersRepository.findOneOrFail({
      id: orderId
    });

    return order;

  }

  async create(input: CreateOrderDto): Promise<Order> {
    const repo = this.ordersRepository;
    const orderToCreate = repo.create(input);

    return repo.upsert(orderToCreate);
  }
}
